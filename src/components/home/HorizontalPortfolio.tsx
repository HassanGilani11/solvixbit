'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { ArrowRight } from '../icons';
import { caseStudiesData } from '../../config/work';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';

initGSAP();

interface HorizontalPortfolioProps {
  onInquireClick?: () => void;
}

export const HorizontalPortfolio: React.FC<HorizontalPortfolioProps> = ({ onInquireClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      const grid = gridRef.current;
      if (!grid) return;

      const cards = grid.querySelectorAll('.sb-portfolio-card');
      if (cards.length === 0) return;

      // Refined GSAP staggered entrance on scroll without any mouse scroll-jacking
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.75,
        stagger: 0.14,
        ease: ANIMATION_CONFIG.ease.brand,
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  const cardThemes = [
    { bg: '#000000', accent: '#598BFF', glow: 'rgba(89, 139, 255, 0.15)' },
    { bg: '#070E1A', accent: '#02C415', glow: 'rgba(2, 196, 21, 0.12)' },
    { bg: '#100D28', accent: '#818CF8', glow: 'rgba(129, 140, 248, 0.15)' },
  ];

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #EFEFEF',
        position: 'relative',
        paddingTop: 'clamp(4rem, 7vw, 6rem)',
        paddingBottom: 'clamp(4rem, 7vw, 6rem)',
      }}
    >
      <Container>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 'var(--space-6)',
            marginBottom: '32px',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'inline-flex', marginBottom: '12px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 12px',
                  backgroundColor: '#F3F4F6',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary-blue)' }} />
                FEATURED WORK &amp; CASE HIGHLIGHTS
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                fontWeight: 800,
                color: '#000000',
                margin: '0 0 12px 0',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
              }}
            >
              Digital products engineered for impact.
            </h2>
            <p style={{ fontFamily: 'var(--font-family-body)', fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', color: '#4B5563', margin: 0, lineHeight: 1.6 }}>
              A curated selection of high-concurrency payment engines, headless commerce platforms, and clinical AI copilots.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href="/work"
              className="sb-btn sb-btn--md sb-btn--secondary"
              style={{ textDecoration: 'none' }}
            >
              Explore Full Portfolio Showcase
            </Link>
            <Link
              href="/start-a-project"
              className="sb-btn sb-btn--md sb-btn--primary"
              style={{ textDecoration: 'none' }}
            >
              <span>Inquire About a Project</span>
              <ArrowRight size={14} className="sb-btn__arrow" />
            </Link>
          </div>
        </div>

        {/* 3-Column Responsive Editorial Grid: 100% visible, zero scroll-jacking, fully readable */}
        <div
          ref={gridRef}
          className="sb-portfolio-grid"
        >
          {caseStudiesData.map((study, idx) => {
            const theme = cardThemes[idx % cardThemes.length];

            return (
              <div
                key={study.slug}
                className="sb-portfolio-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1px solid #E5E7EB',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                  width: '100%',
                  minWidth: 0,
                  boxSizing: 'border-box',
                }}
              >
                <div>
                  {/* Top Visual Header with Graphic Artwork & Human Telemetry */}
                  <div
                    className="sb-card-visual-header"
                    style={{
                      height: '210px',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: theme.bg,
                    }}
                  >
                    {/* Background Artwork Graphic */}
                    {study.image && (
                      <div
                        className="sb-card-visual-img"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url(${study.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), filter 500ms ease',
                          filter: 'brightness(0.85) contrast(1.05)',
                        }}
                      />
                    )}

                    {/* Gradient & blueprint overlay for readability & human craft */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.3) 45%, rgba(0, 0, 0, 0.92) 100%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Architectural blueprint grid overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                        opacity: 0.35,
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Content inside visual header */}
                    <div
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        padding: '18px 22px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                        boxSizing: 'border-box',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontFamily: 'var(--font-family-mono)',
                            color: theme.accent,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            backgroundColor: 'rgba(0, 0, 0, 0.72)',
                            backdropFilter: 'blur(8px)',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                          }}
                        >
                          {study.industry}
                        </span>

                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-family-mono)',
                            color: '#FFFFFF',
                            backgroundColor: 'rgba(0, 0, 0, 0.72)',
                            backdropFilter: 'blur(8px)',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            fontWeight: 600,
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--color-secondary-green)',
                              boxShadow: '0 0 8px var(--color-secondary-green)',
                            }}
                          />
                          {study.year} • VERIFIED
                        </span>
                      </div>

                      {/* Client & Title */}
                      <div>
                        <div
                          style={{
                            fontSize: '0.68rem',
                            fontFamily: 'var(--font-family-mono)',
                            color: '#9CA3AF',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            marginBottom: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <span style={{ color: theme.accent }}>⌖</span> {study.client.toUpperCase()}
                        </div>
                        <h3
                          style={{
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-family-heading)',
                            fontWeight: 800,
                            fontSize: '1.35rem',
                            margin: '0 0 4px',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.25,
                            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                          }}
                        >
                          {study.title}
                        </h3>
                        <p style={{ color: '#D1D5DB', fontSize: '0.8rem', margin: 0, lineHeight: 1.35 }}>
                          {study.headline}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Body Info */}
                  <div style={{ padding: '22px 24px' }}>
                    {/* Challenge & Solution Section */}
                    <div style={{ marginBottom: '18px' }}>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-family-mono)',
                          fontWeight: 700,
                          color: '#111827',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          marginBottom: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span style={{ color: 'var(--color-primary-blue)', fontSize: '0.85rem' }}>■</span> Challenge &amp; Solution:
                      </div>
                      <p style={{ fontSize: '0.86rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                        {study.summary}
                      </p>
                    </div>

                    {/* Key Metrics Banner */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '10px',
                        marginBottom: '18px',
                        padding: '12px 14px',
                        backgroundColor: '#F9FAFB',
                        borderRadius: '12px',
                        border: '1px solid #E5E7EB',
                      }}
                    >
                      {study.metrics.slice(0, 2).map((m) => (
                        <div key={m.label}>
                          <div
                            style={{
                              fontSize: '1.35rem',
                              fontWeight: 800,
                              fontFamily: 'var(--font-family-heading)',
                              color: '#111827',
                              lineHeight: 1.1,
                            }}
                          >
                            {m.value}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#6B7280', fontWeight: 600, marginTop: '3px' }}>
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Badges */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {study.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: '0.72rem',
                            padding: '4px 9px',
                            backgroundColor: '#F3F4F6',
                            borderRadius: '6px',
                            color: '#374151',
                            fontWeight: 600,
                            border: '1px solid #E5E7EB',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA Link */}
                <div style={{ padding: '0 24px 22px' }}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="sb-btn sb-btn--md sb-btn--primary"
                    style={{
                      width: '100%',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>View Architecture &amp; Case Study</span>
                    <ArrowRight size={14} className="sb-btn__arrow" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
