'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { ArrowRight, ArrowUpRight } from '../icons';
import { ARTICLES } from '../../config/insights';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';

initGSAP();

export const HomeInsightsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredArticles = ARTICLES.slice(0, 3);

  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        '.sb-insights-header',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: ANIMATION_CONFIG.ease.brand,
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
          },
        }
      );

      const cards = section.querySelectorAll('.sb-insight-card');
      gsap.fromTo(
        cards,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.65,
          ease: ANIMATION_CONFIG.ease.brand,
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="insights"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #EFEFEF',
        borderBottom: '1px solid #EFEFEF',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container>
        {/* Section Header */}
        <div className="sb-insights-header" style={{ maxWidth: '800px', marginBottom: 'clamp(2.5rem, 4.5vw, 4rem)' }}>
          <div style={{ display: 'inline-flex', marginBottom: '14px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: 'rgba(89, 139, 255, 0.08)',
                border: '1px solid rgba(89, 139, 255, 0.2)',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-primary-blue)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary-blue)' }} />
              08 // EDITORIAL PERSPECTIVES
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'clamp(2.1rem, 3.8vw, 3.25rem)',
              fontWeight: 800,
              color: '#000000',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              margin: '0 0 14px 0',
            }}
          >
            Insights from the engineering frontier.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
              color: '#4B5563',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Practical blueprints, systems architecture patterns, and executive technology frameworks written by our practitioners.
          </p>
        </div>

        {/* 3-Column Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))',
            gap: '28px',
            marginBottom: '48px',
          }}
        >
          {featuredArticles.map((article) => (
            <article
              key={article.slug}
              className="sb-insight-card"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#598BFF';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 32px -8px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
              }}
            >
              {/* Visual Cover Image */}
              <Link
                href={`/insights/${article.slug}`}
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  position: 'relative',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  backgroundColor: '#111827',
                }}
              >
                <Image
                  src={article.coverImage || '/images/insights/ai-automation-roadmap.jpg'}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover', transition: 'transform 400ms ease' }}
                  className="sb-insight-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Category Pill */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      backdropFilter: 'blur(6px)',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      fontFamily: 'var(--font-family-mono)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {article.category}
                  </span>
                </div>

                {/* Reading Time */}
                <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 2 }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      backdropFilter: 'blur(6px)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-family-mono)',
                    }}
                  >
                    {article.readingTime}
                  </span>
                </div>
              </Link>

              {/* Card Content */}
              <div
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: '#6B7280',
                      marginBottom: '10px',
                      fontFamily: 'var(--font-family-mono)',
                    }}
                  >
                    Published {article.publishedAt}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-family-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      lineHeight: 1.3,
                      marginBottom: '10px',
                    }}
                  >
                    <Link
                      href={`/insights/${article.slug}`}
                      style={{
                        textDecoration: 'none',
                        color: '#111827',
                        transition: 'color 160ms ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#598BFF')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#111827')}
                    >
                      {article.title}
                    </Link>
                  </h3>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: '#4B5563',
                      lineHeight: 1.55,
                      marginBottom: '18px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {article.excerpt}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {article.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.72rem',
                          color: '#4B5563',
                          backgroundColor: '#F3F4F6',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-family-mono)',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author Attribution & Read Link */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '16px',
                    borderTop: '1px solid #F3F4F6',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        position: 'relative',
                        border: '1px solid #E5E7EB',
                        backgroundColor: '#E5E7EB',
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={article.author.avatar || '/images/avatar-editorial.png'}
                        alt={article.author.name}
                        fill
                        sizes="28px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>
                      {article.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/insights/${article.slug}`}
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: 'var(--color-primary-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Read</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Section Footer Link */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            textAlign: 'center',
          }}
        >
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
          <span style={{ fontSize: '0.8125rem', color: '#6B7280', fontFamily: 'var(--font-family-mono)' }}>
            6 in-depth architectural guides, strategy frameworks, and case breakdowns
          </span>
        </div>
      </Container>
    </section>
  );
};
