'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types/content';
import { ArrowRight, ArrowUpRight } from '@/components/icons';

interface InsightsClientProps {
  articles: Article[];
}

const CATEGORIES = [
  'All',
  'AI & Automation',
  'Software Engineering',
  'SaaS & Digital Products',
  'Ecommerce & Digital Experience',
  'Cloud & Architecture',
  'Business & Technology Strategy',
];

export default function InsightsClient({ articles }: InsightsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticle = articles[0];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Featured Article Card — Split High-Impact Editorial Presentation */}
      {selectedCategory === 'All' && searchQuery === '' && featuredArticle && (
        <div style={{ marginBottom: '64px' }}>
          <div style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#598BFF',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#02C415' }} />
            FEATURED PERSPECTIVE & ARCHITECTURAL BLUEPRINT
          </div>

          <div className="sb-article-featured-card">
            {/* Left Column: Editorial Summary & Actions */}
            <div style={{
              padding: 'clamp(28px, 4vw, 48px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backgroundColor: '#598BFF',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: '4px',
                  }}>
                    {featuredArticle.category}
                  </span>
                  <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
                    {featuredArticle.readingTime}
                  </span>
                  <span style={{ fontSize: '13px', color: '#6B7280' }}>•</span>
                  <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
                    {featuredArticle.publishedAt}
                  </span>
                </div>

                <h2 style={{
                  fontSize: 'clamp(24px, 3.2vw, 36px)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                  margin: '0 0 18px 0',
                  color: '#FFFFFF',
                }}>
                  <Link
                    href={`/insights/${featuredArticle.slug}`}
                    style={{ color: '#FFFFFF', textDecoration: 'none' }}
                  >
                    {featuredArticle.title}
                  </Link>
                </h2>

                <p style={{
                  fontSize: '16px',
                  color: '#D1D5DB',
                  lineHeight: 1.65,
                  marginBottom: '28px',
                }}>
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div>
                {/* Author attribution with avatar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '20px',
                  borderTop: '1px solid #1F2937',
                  marginBottom: '24px',
                }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative',
                    flexShrink: 0,
                    border: '2px solid #374151',
                    backgroundColor: '#1E2229',
                  }}>
                    <Image
                      src={featuredArticle.author.avatar || '/images/avatar-editorial.png'}
                      alt={featuredArticle.author.name}
                      fill
                      sizes="42px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                      {featuredArticle.author.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                      {featuredArticle.author.role}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/insights/${featuredArticle.slug}`}
                  className="sb-btn sb-btn--on-dark"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  Read Full Blueprint
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Cover Showcase */}
            <Link
              href={`/insights/${featuredArticle.slug}`}
              style={{
                position: 'relative',
                minHeight: '340px',
                display: 'block',
                textDecoration: 'none',
                overflow: 'hidden',
                backgroundColor: '#0F172A',
              }}
            >
              <Image
                src={featuredArticle.coverImage || '/images/insights/ai-automation-roadmap.jpg'}
                alt={featuredArticle.title}
                fill
                priority
                sizes="(max-width: 960px) 100vw, 50vw"
                className="sb-article-card__img"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.2) 100%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                color: '#FFFFFF',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.15)',
              }}>
                Cover Story
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Filter & Search Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '40px',
        paddingBottom: '24px',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                border: selectedCategory === cat ? '1px solid #598BFF' : '1px solid #E5E7EB',
                backgroundColor: selectedCategory === cat ? '#598BFF' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : '#374151',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ minWidth: '260px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by topic..."
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid #D1D5DB',
              fontSize: '14px',
            }}
          />
        </div>
      </div>

      {/* Article Grid with High-Quality Human-Touch Editorial Visuals */}
      {filteredArticles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#F9FAFB', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>No articles match your criteria</h3>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>Try clearing your search query or selecting another category.</p>
          <button
            type="button"
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="sb-btn sb-btn--secondary"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
          {filteredArticles.map((article) => (
            <article key={article.slug} className="sb-article-card">
              {/* Cover Image Showcase */}
              <Link
                href={`/insights/${article.slug}`}
                className="sb-article-card__img-wrap"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <Image
                  src={article.coverImage || '/images/insights/ai-automation-roadmap.jpg'}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="sb-article-card__img"
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 60%)',
                  pointerEvents: 'none',
                }} />

                {/* Badges on image */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  zIndex: 2,
                }}>
                  <span className="sb-article-pill sb-article-pill--overlay">
                    {article.category}
                  </span>
                </div>

                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  zIndex: 2,
                }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(6px)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}>
                    {article.readingTime}
                  </span>
                </div>
              </Link>

              {/* Card Body */}
              <div style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '10px' }}>
                    Published {article.publishedAt}
                  </div>

                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    lineHeight: 1.35,
                    marginBottom: '12px',
                  }}>
                    <Link
                      href={`/insights/${article.slug}`}
                      className="sb-article-card__title"
                      style={{ textDecoration: 'none' }}
                    >
                      {article.title}
                    </Link>
                  </h3>

                  <p style={{
                    fontSize: '14px',
                    color: '#4B5563',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {article.excerpt}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                    {article.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '11px',
                          color: '#6B7280',
                          backgroundColor: '#F3F4F6',
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author attribution & Read link */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid #F3F4F6',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      position: 'relative',
                      border: '1px solid #E5E7EB',
                      backgroundColor: '#E5E7EB',
                      flexShrink: 0,
                    }}>
                      <Image
                        src={article.author.avatar || '/images/avatar-editorial.png'}
                        alt={article.author.name}
                        fill
                        sizes="26px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>
                      {article.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/insights/${article.slug}`}
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#598BFF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'none',
                    }}
                  >
                    Read
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

