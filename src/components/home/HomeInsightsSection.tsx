'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Section } from '../layout';
import { ScrollSectionReveal, FadeUp } from '../motion';
import { ArrowRight, ArrowUpRight } from '../icons';
import { ARTICLES } from '@/config/insights';

export const HomeInsightsSection: React.FC = () => {
  // Curate top 3 featured perspectives for the homepage
  const featuredArticles = ARTICLES.slice(0, 3);

  return (
    <Section id="insights" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #EFEFEF', padding: 'clamp(4rem, 7vw, 6.5rem) 0' }}>
      <Container>
        {/* Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}>
          <FadeUp delayMs={100}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(89, 139, 255, 0.08)',
              border: '1px solid rgba(89, 139, 255, 0.2)',
              borderRadius: '9999px',
              padding: '6px 14px',
              marginBottom: '10px',
            }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#598BFF' }} />
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#1D4ED8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                EDITORIAL & ARCHITECTURAL PERSPECTIVES
              </span>
            </div>
          </FadeUp>

          <FadeUp delayMs={200}>
            <h2 style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'clamp(2rem, 3.8vw, 3.25rem)',
              fontWeight: 800,
              color: '#000000',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: '0 0 16px 0',
            }}>
              Insights from the engineering frontier.
            </h2>
          </FadeUp>

          <FadeUp delayMs={300}>
            <p style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: 'clamp(1.05rem, 1.25vw, 1.15rem)',
              color: '#4B5563',
              lineHeight: 1.6,
              margin: 0,
            }}>
              Practical blueprints, systems architecture patterns, and executive technology frameworks written by our practitioners.
            </p>
          </FadeUp>
        </div>

        {/* 3-Column Editorial Grid */}
        <ScrollSectionReveal animation="fade-up" staggerInterval={0.1}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginBottom: '48px',
          }}>
            {featuredArticles.map((article) => (
              <article key={article.slug} className="sb-article-card">
                {/* Visual Cover Image */}
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
                    background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%)',
                    pointerEvents: 'none',
                  }} />

                  {/* Category Pill */}
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

                  {/* Reading Time */}
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

                {/* Card Content */}
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
                      fontFamily: 'var(--font-family-heading)',
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

                  {/* Author Attribution & Read Link */}
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
        </ScrollSectionReveal>

        {/* Section Footer Link */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          textAlign: 'center',
          paddingTop: '8px',
        }}>
          <Link
            href="/insights"
            className="sb-btn sb-btn--lg sb-btn--secondary"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
            }}
          >
            <span>Explore All Insights & Engineering Guides</span>
            <ArrowRight size={16} className="sb-btn__arrow" />
          </Link>
          <span style={{ fontSize: '13px', color: '#6B7280' }}>
            6 in-depth architectural guides, strategy frameworks, and case breakdowns
          </span>
        </div>
      </Container>
    </Section>
  );
};
