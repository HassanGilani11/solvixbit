import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ARTICLES } from '@/config/insights';
import { ArrowRight, ArrowUpRight } from '@/components/icons';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found | SOLVIXBIT',
    };
  }

  const url = `https://www.solvixbit.com/insights/${article.slug}`;

  return {
    title: `${article.seoTitle || article.title}`,
    description: article.seoDescription || article.excerpt,
    keywords: [...(article.tags || []), article.category, 'SOLVIXBIT Insights'],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      tags: article.tags,
      url,
    },
  };
}

function renderInlineText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+?\*\*|`[^`]+?`|\*[^*]+?\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const plainText = text.substring(lastIndex, match.index).replace(/\*\*/g, '');
      if (plainText) {
        parts.push(plainText);
      }
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      const boldContent = token.slice(2, -2).replace(/\*\*/g, '');
      parts.push(
        <strong key={`b-${match.index}`} style={{ fontWeight: 700, color: '#111827' }}>
          {boldContent}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      const codeContent = token.slice(1, -1);
      parts.push(
        <code
          key={`c-${match.index}`}
          style={{
            backgroundColor: '#F3F4F6',
            color: '#111827',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.88em',
            fontFamily: 'monospace',
          }}
        >
          {codeContent}
        </code>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      const italicContent = token.slice(1, -1).replace(/\*\*/g, '');
      parts.push(
        <em key={`i-${match.index}`} style={{ fontStyle: 'italic', color: '#374151' }}>
          {italicContent}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    const trailingText = text.substring(lastIndex).replace(/\*\*/g, '');
    if (trailingText) {
      parts.push(trailingText);
    }
  }

  return parts;
}

interface ContentBlock {
  type: 'p' | 'ol' | 'ul';
  items?: string[];
  text?: string;
}

function renderFormattedContent(rawContent: string | string[]): React.ReactNode {
  const contentString = Array.isArray(rawContent) ? rawContent.join('\n\n') : rawContent;
  const normalized = contentString.replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');

  const blocks: ContentBlock[] = [];
  let currentBlock: ContentBlock | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      continue;
    }

    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    const bulletMatch = trimmed.match(/^[*•-]\s+(.*)$/);

    if (numMatch) {
      if (!currentBlock || currentBlock.type !== 'ol') {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = { type: 'ol', items: [] };
      }
      currentBlock.items?.push(numMatch[2]);
    } else if (bulletMatch) {
      if (!currentBlock || currentBlock.type !== 'ul') {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = { type: 'ul', items: [] };
      }
      currentBlock.items?.push(bulletMatch[1]);
    } else {
      if (!currentBlock || currentBlock.type !== 'p') {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = { type: 'p', text: trimmed };
      } else {
        currentBlock.text += ' ' + trimmed;
      }
    }
  }

  if (currentBlock) {
    blocks.push(currentBlock);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {blocks.map((block, idx) => {
        if (block.type === 'ol') {
          return (
            <ol
              key={idx}
              style={{
                margin: '8px 0 16px 0',
                paddingLeft: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                listStyleType: 'decimal',
              }}
            >
              {block.items?.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  style={{
                    lineHeight: 1.75,
                    color: '#374151',
                    paddingLeft: '4px',
                  }}
                >
                  {renderInlineText(item)}
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === 'ul') {
          return (
            <ul
              key={idx}
              style={{
                margin: '8px 0 16px 0',
                paddingLeft: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                listStyleType: 'disc',
              }}
            >
              {block.items?.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  style={{
                    lineHeight: 1.75,
                    color: '#374151',
                    paddingLeft: '4px',
                  }}
                >
                  {renderInlineText(item)}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p
            key={idx}
            style={{
              margin: 0,
              lineHeight: 1.8,
              color: '#374151',
            }}
          >
            {renderInlineText(block.text || '')}
          </p>
        );
      })}
    </div>
  );
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Related articles
  const relatedArticles = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  // Structured Data (Schema.org BlogPosting)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Organization',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SOLVIXBIT',
      url: 'https://www.solvixbit.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.solvixbit.com/insights/${article.slug}`,
    },
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header & Breadcrumbs */}
      <header style={{ padding: '60px 24px 40px', backgroundColor: '#FAFAFA', borderBottom: '1px solid #EFEFEF' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
            <Link href="/" style={{ color: '#6B7280', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/insights" style={{ color: '#6B7280', textDecoration: 'none' }}>Insights</Link>
            <span>/</span>
            <span style={{ color: '#111827', fontWeight: 600 }}>{article.category}</span>
          </nav>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              backgroundColor: 'rgba(89, 139, 255, 0.1)',
              color: '#1D4ED8',
              padding: '4px 10px',
              borderRadius: '4px',
            }}>
              {article.category}
            </span>
            <span style={{ fontSize: '14px', color: '#6B7280' }}>
              {article.readingTime}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 4.5vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#000000',
            lineHeight: 1.2,
            marginBottom: '20px',
          }}>
            {article.title}
          </h1>

          <p style={{
            fontSize: 'clamp(18px, 2vw, 21px)',
            color: '#4B5563',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}>
            {article.excerpt}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: '1px solid #E5E7EB', paddingTop: '20px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              border: '2px solid #E5E7EB',
              backgroundColor: '#F3F4F6',
              flexShrink: 0,
            }}>
              <Image
                src={article.author.avatar || '/images/avatar-editorial.png'}
                alt={article.author.name}
                fill
                sizes="44px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>
                {article.author.name}
              </div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>
                {article.author.role} • Published {article.publishedAt}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Article Body Layout */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px 100px' }}>
        {/* Editorial Cover Image */}
        {article.coverImage && (
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '48px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
            backgroundColor: '#0F172A',
          }}>
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 860px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        {/* Table of Contents */}
        {article.tableOfContents && article.tableOfContents.length > 0 && (
          <nav aria-label="Table of Contents" style={{
            backgroundColor: '#F9FAFB',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '24px 28px',
            marginBottom: '48px',
          }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              Table of Contents
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {article.tableOfContents.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    style={{
                      fontSize: '15px',
                      color: '#598BFF',
                      textDecoration: 'none',
                      display: 'inline-block',
                    }}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Sections Content */}
        <article style={{ lineHeight: 1.8, fontSize: '18px', color: '#27272A' }}>
          {article.sections.map((sec) => (
            <section key={sec.id} id={sec.id} style={{ marginBottom: '44px', scrollMarginTop: '100px' }}>
              <h2 style={{
                fontSize: '26px',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: '#111827',
                marginTop: '36px',
                marginBottom: '16px',
              }}>
                {sec.heading}
              </h2>

              {renderFormattedContent(sec.content)}
            </section>
          ))}
        </article>

        {/* Article Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '24px 0', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB', margin: '48px 0' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280', alignSelf: 'center', marginRight: '8px' }}>
            Tags:
          </span>
          {article.tags.map((tag, idx) => (
            <span key={idx} style={{ fontSize: '13px', color: '#4B5563', backgroundColor: '#F3F4F6', padding: '4px 10px', borderRadius: '6px' }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Contextual Solution CTA Box */}
        {article.relatedSolutionSlug && article.relatedSolutionTitle && (
          <div style={{
            backgroundColor: '#000000',
            borderRadius: '16px',
            padding: '36px 32px',
            color: '#FFFFFF',
            marginBottom: '64px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <span style={{ color: '#02C415', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              RELEVANT SOLUTION DISCIPLINE
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              Applying {article.relatedSolutionTitle} to your organization
            </h3>
            <p style={{ fontSize: '15px', color: '#9CA3AF', lineHeight: 1.6, margin: 0 }}>
              Interested in implementing these architectural patterns? Our engineering team works alongside your stakeholders to evaluate technical debt, architect scalable solutions, and accelerate deployment.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
              <Link
                href={`/start-a-project?solution=${article.relatedSolutionSlug}`}
                className="sb-btn sb-btn--on-dark"
                style={{ fontSize: '14px', padding: '10px 20px', minHeight: '42px' }}
              >
                Discuss This Solution
                <ArrowRight size={16} />
              </Link>
              <Link
                href={`/solutions/${article.relatedSolutionSlug}`}
                className="sb-btn sb-btn--white"
                style={{ fontSize: '14px', padding: '10px 20px', minHeight: '42px' }}
              >
                View Solution Scope
              </Link>
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: 0 }}>
                More Perspectives
              </h3>
              <Link href="/insights" style={{ fontSize: '14px', fontWeight: 600, color: '#598BFF', textDecoration: 'none' }}>
                All Insights →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {relatedArticles.map((rel) => (
                <div
                  key={rel.slug}
                  className="sb-article-card"
                  style={{ borderRadius: '14px' }}
                >
                  {rel.coverImage && (
                    <Link
                      href={`/insights/${rel.slug}`}
                      className="sb-article-card__img-wrap"
                      style={{ aspectRatio: '16/10', display: 'block', textDecoration: 'none' }}
                    >
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="sb-article-card__img"
                      />
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        zIndex: 2,
                      }}>
                        <span className="sb-article-pill sb-article-pill--overlay" style={{ fontSize: '10px', padding: '3px 8px' }}>
                          {rel.category}
                        </span>
                      </div>
                    </Link>
                  )}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px 0', lineHeight: 1.4 }}>
                        <Link href={`/insights/${rel.slug}`} className="sb-article-card__title" style={{ textDecoration: 'none' }}>
                          {rel.title}
                        </Link>
                      </h4>
                      <p style={{
                        fontSize: '13px',
                        color: '#6B7280',
                        lineHeight: 1.5,
                        marginBottom: '16px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {rel.excerpt}
                      </p>
                    </div>
                    <Link
                      href={`/insights/${rel.slug}`}
                      style={{ fontSize: '13px', fontWeight: 600, color: '#598BFF', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                    >
                      Read Perspective
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <Link href="/insights" className="sb-btn sb-btn--secondary">
            ← Back to All Insights
          </Link>
        </div>
      </div>
    </main>
  );
}
