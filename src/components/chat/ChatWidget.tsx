'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

const STARTER_CHIPS = [
  { label: '⚡ MVP & Pricing Tiers', query: 'What are your pricing tiers for building a startup MVP or custom platform?' },
  { label: '🛠️ Legacy Modernization', query: 'How does Solvixbit modernize legacy monolithic applications with zero downtime?' },
  { label: '🤖 AI & Automation', query: 'What AI workflow automation and custom LLM agent services do you provide?' },
  { label: '🛍️ Headless Commerce', query: 'Can you build a high-performance headless Shopify storefront with Next.js?' },
  { label: '📅 Partner Discovery Call', query: 'How does direct senior partner access work, and how can we schedule a consultation?' },
];

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello! I am Solvixbit's AI Solutions Architect.\n\nAsk me anything about our 9 engineering disciplines, architecture modernizations, headless ecommerce, custom AI workflows, or project pricing.\n\nHow can we help engineer your next breakthrough?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isSending) return;

    setInput('');
    const userMsgId = `user-${Date.now()}`;
    const botMsgId = `bot-${Date.now()}`;

    const newMessages: Message[] = [
      ...messages,
      { id: userMsgId, role: 'user', content: text },
      { id: botMsgId, role: 'assistant', content: '', isStreaming: true },
    ];

    setMessages(newMessages);
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.slice(0, -1).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        streamedContent += chunk;

        setMessages((prev) =>
          prev.map((m) => (m.id === botMsgId ? { ...m, content: streamedContent, isStreaming: true } : m))
        );
      }

      // Mark streaming done
      setMessages((prev) =>
        prev.map((m) => (m.id === botMsgId ? { ...m, content: streamedContent, isStreaming: false } : m))
      );
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId
            ? {
                ...m,
                content:
                  "I apologize, but our network connection momentarily timed out. Please try sending your message again, or feel free to email our senior partners directly at [hello@solvixbit.com](mailto:hello@solvixbit.com) or submit your scope at [/contact](/contact).",
                isStreaming: false,
              }
            : m
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content:
          "Conversation reset.\n\nAsk me about our engineering capabilities, solution architectures, deliverables, or project scopes.",
      },
    ]);
  };

  /**
   * Pre-cleans raw markdown to ensure zero raw asterisks or raw markdown hashes leak into view
   */
  const cleanMarkdownText = (raw: string): string => {
    let text = raw;
    // Strip bold asterisks around markdown links: **[Title](/path)** -> [Title](/path)
    text = text.replace(/\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/g, '[$1]($2)');
    text = text.replace(/\*\[([^\]]+)\]\(([^)]+)\)\*/g, '[$1]($2)');

    // Strip bold asterisks around bare paths: **/start-a-project** -> /start-a-project
    text = text.replace(/\*\*(\/(?:start-a-project|contact|services(?:\/[a-z0-9-]+)?|solutions(?:\/[a-z0-9-]+)?|work(?:\/[a-z0-9-]+)?))\*\*/g, '$1');

    // Strip asterisks around bold words or phrases: **Word** -> Word
    text = text.replace(/\*\*([^*]+)\*\*/g, '$1');

    // Strip any lingering double or single asterisks that might have been left unclosed
    text = text.replace(/\*\*/g, '');

    return text;
  };

  /**
   * Simple markdown parser that converts clean text, lists, and [links](url) into React elements
   */
  const renderFormattedContent = (content: string) => {
    // Strip raw asterisks and clean format
    const cleaned = cleanMarkdownText(content);
    const paragraphs = cleaned.split('\n\n');

    return paragraphs.map((para, pIdx) => {
      const trimmed = para.trim();

      // Check if it's a markdown heading like "### Heading" or "## Heading"
      if (/^#{1,6}\s+/.test(trimmed)) {
        const headingText = trimmed.replace(/^#{1,6}\s+/, '');
        return (
          <div
            key={pIdx}
            style={{
              fontWeight: 700,
              fontSize: '0.9375rem',
              color: '#0A0F1D',
              marginTop: pIdx === 0 ? 0 : '10px',
              marginBottom: '6px',
              letterSpacing: '-0.01em',
            }}
          >
            {parseInlineMarkdown(headingText)}
          </div>
        );
      }

      // Check if it's a bulleted list
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
        const items = para.split('\n').filter((l) => l.trim().length > 0);
        return (
          <ul key={pIdx}>
            {items.map((item, iIdx) => {
              const cleanItem = item.replace(/^[-*•]\s+/, '');
              return <li key={iIdx}>{parseInlineMarkdown(cleanItem)}</li>;
            })}
          </ul>
        );
      }

      // Regular paragraph
      const lines = para.split('\n');
      return (
        <p key={pIdx}>
          {lines.map((line, lIdx) => (
            <React.Fragment key={lIdx}>
              {parseInlineMarkdown(line)}
              {lIdx < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      );
    });
  };

  /**
   * Parses [markdown](links), emails, and inline paths into interactive Next.js links
   */
  const parseInlineMarkdown = (text: string) => {
    const parts: React.ReactNode[] = [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(parsePlainInline(text.slice(lastIndex, match.index), `txt-${lastIndex}`));
      }

      const label = match[1];
      const href = match[2];
      const isInternal = href.startsWith('/');

      if (isInternal) {
        parts.push(
          <Link
            key={`link-${match.index}`}
            href={href}
            onClick={() => {
              if (window.innerWidth < 768) {
                setIsOpen(false);
              }
            }}
          >
            {label}
          </Link>
        );
      } else {
        parts.push(
          <a key={`link-${match.index}`} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      }

      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(parsePlainInline(text.slice(lastIndex), `txt-${lastIndex}`));
    }

    return parts;
  };

  /**
   * Auto-links bare paths (/start-a-project, /contact) and email addresses
   */
  const parsePlainInline = (text: string, keyPrefix: string): React.ReactNode => {
    const emailOrPathRegex = /(hello@solvixbit\.com|\/(?:start-a-project|contact|services(?:\/[a-z0-9-]+)?|solutions(?:\/[a-z0-9-]+)?|work(?:\/[a-z0-9-]+)?))/g;
    const parts: React.ReactNode[] = [];
    let lastIdx = 0;
    let m: RegExpExecArray | null;

    while ((m = emailOrPathRegex.exec(text)) !== null) {
      if (m.index > lastIdx) {
        parts.push(text.slice(lastIdx, m.index));
      }

      const matchText = m[1];
      if (matchText === 'hello@solvixbit.com') {
        parts.push(
          <a key={`${keyPrefix}-mail-${m.index}`} href="mailto:hello@solvixbit.com">
            hello@solvixbit.com
          </a>
        );
      } else {
        parts.push(
          <Link
            key={`${keyPrefix}-path-${m.index}`}
            href={matchText}
            onClick={() => {
              if (window.innerWidth < 768) {
                setIsOpen(false);
              }
            }}
          >
            {matchText}
          </Link>
        );
      }

      lastIdx = emailOrPathRegex.lastIndex;
    }

    if (lastIdx < text.length) {
      parts.push(text.slice(lastIdx));
    }

    return parts.length > 0 ? parts : text;
  };

  /**
   * Detects if an assistant message mentions key action destinations
   */
  const extractRecommendationCards = (content: string) => {
    const cards: { title: string; desc: string; link: string; btnText: string }[] = [];

    if (content.includes('/solutions/enterprise-scale') || content.includes('/solutions/legacy-modernization')) {
      cards.push({
        title: 'Enterprise Architecture & Modernization',
        desc: 'Deconstruct technical debt with Strangler Fig zero-downtime cutover.',
        link: '/solutions/enterprise-scale',
        btnText: 'Explore Solution',
      });
    }

    if (content.includes('/services/software-development')) {
      cards.push({
        title: 'Custom Software Development',
        desc: 'High-throughput APIs, cloud backends, and robust web applications.',
        link: '/services/software-development',
        btnText: 'View Discipline',
      });
    }

    if (content.includes('/services/ai-automation')) {
      cards.push({
        title: 'AI & Workflow Automation',
        desc: 'Autonomous agents, custom LLM pipelines, and process elimination.',
        link: '/services/ai-automation',
        btnText: 'View AI Solutions',
      });
    }

    if (content.includes('/services/web-ecommerce') || content.includes('/solutions/high-concurrency-commerce')) {
      cards.push({
        title: 'High-Concurrency Web & Ecommerce',
        desc: 'Headless Next.js storefronts built for sub-second conversions.',
        link: '/services/web-ecommerce',
        btnText: 'View Ecommerce',
      });
    }

    if (content.includes('/start-a-project')) {
      cards.push({
        title: 'Architectural Scope Questionnaire',
        desc: 'Specify your tech stack, timeline, and goals for 24h partner review.',
        link: '/start-a-project',
        btnText: 'Start a Project',
      });
    }

    return cards;
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          className="sb-chat-launcher"
          onClick={() => setIsOpen(true)}
          aria-label="Ask Solvixbit AI Solutions Architect"
        >
          <span className="sb-chat-launcher__beacon" />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#598BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Ask AI Architect</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="sb-chat-modal" role="dialog" aria-modal="true" aria-label="Solvixbit AI Assistant">
          {/* Header */}
          <div className="sb-chat-header">
            <div className="sb-chat-header__info">
              <div className="sb-chat-header__avatar">SB</div>
              <div>
                <h3 className="sb-chat-header__title">
                  SOLVIXBIT <span style={{ color: '#598BFF', fontSize: '0.75rem' }}>AI</span>
                </h3>
                <div className="sb-chat-header__subtitle">
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#02C415' }} />
                  <span>Solutions Architect · Online</span>
                </div>
              </div>
            </div>

            <div className="sb-chat-header__actions">
              <button
                type="button"
                className="sb-chat-btn-icon"
                onClick={handleClearChat}
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              <button
                type="button"
                className="sb-chat-btn-icon"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="sb-chat-messages">
            {messages.map((msg) => {
              const recCards = msg.role === 'assistant' ? extractRecommendationCards(msg.content) : [];

              return (
                <div key={msg.id} className={`sb-chat-msg sb-chat-msg--${msg.role}`}>
                  <div className="sb-chat-bubble">
                    {renderFormattedContent(msg.content)}
                    {msg.isStreaming && <span className="sb-chat-cursor" />}
                  </div>

                  {/* Rich Recommendation Cards if referenced */}
                  {recCards.length > 0 && !msg.isStreaming && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                      {recCards.slice(0, 2).map((card, cIdx) => (
                        <div key={cIdx} className="sb-chat-card">
                          <div className="sb-chat-card__title">
                            <span>{card.title}</span>
                            <span style={{ fontSize: '0.8rem' }}>↗</span>
                          </div>
                          <p className="sb-chat-card__desc">{card.desc}</p>
                          <div className="sb-chat-card__actions">
                            <Link
                              href={card.link}
                              className="sb-chat-card__btn sb-chat-card__btn--primary"
                              onClick={() => {
                                if (window.innerWidth < 768) setIsOpen(false);
                              }}
                            >
                              <span>{card.btnText}</span>
                              <span>→</span>
                            </Link>
                            <Link
                              href="/start-a-project"
                              className="sb-chat-card__btn sb-chat-card__btn--secondary"
                              onClick={() => {
                                if (window.innerWidth < 768) setIsOpen(false);
                              }}
                            >
                              Scope Project
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quick Starter Chips on initial welcome */}
            {messages.length === 1 && !isSending && (
              <div style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', display: 'block', marginBottom: '6px' }}>
                  Suggested Questions:
                </span>
                <div className="sb-chat-suggestions">
                  {STARTER_CHIPS.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="sb-chat-chip"
                      onClick={() => handleSendMessage(chip.query)}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div className="sb-chat-footer">
            <form
              className="sb-chat-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                ref={inputRef}
                type="text"
                className="sb-chat-input"
                placeholder="Ask about services, tech stack, pricing..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isSending}
              />
              <button
                type="submit"
                className="sb-chat-submit"
                disabled={!input.trim() || isSending}
                title="Send inquiry"
                aria-label="Send inquiry"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
            </form>
            <p className="sb-chat-footer__note">
              <span style={{ color: '#02C415' }}>●</span> Grounded in Solvixbit services · 24h review SLA
            </p>
          </div>
        </div>
      )}
    </>
  );
};
