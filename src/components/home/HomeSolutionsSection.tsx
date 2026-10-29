'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { ArrowRight } from '../icons';
import { solutionsData } from '../../config/solutions';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';

initGSAP();

export const HomeSolutionsSection: React.FC = () => {
  const [activeSlug, setActiveSlug] = useState<string>(solutionsData[0]?.slug || 'enterprise-scale');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        '.sb-solutions-header',
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
    },
    { scope: sectionRef }
  );

  const activeSolution = solutionsData.find((s) => s.slug === activeSlug) || solutionsData[0];

  return (
    <section
      ref={sectionRef}
      id="solutions"
      style={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        borderBottom: '1px solid #222222',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 7rem)',
        position: 'relative',
      }}
    >
      <Container>
        {/* Section Header */}
        <div className="sb-solutions-header" style={{ maxWidth: '780px', marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}>
          <div style={{ display: 'inline-flex', marginBottom: '14px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary-blue)' }} />
              04 // STRATEGIC BUSINESS SOLUTIONS
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'clamp(2rem, 3.8vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: '#FFFFFF',
              margin: '0 0 14px 0',
            }}
          >
            Turning operational friction into competitive advantage.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
              lineHeight: 1.6,
              color: '#A0A0A0',
              margin: 0,
            }}
          >
            Explore how we map deep engineering capabilities directly to real-world business challenges across 10 strategic domains.
          </p>
        </div>

        {/* Interactive Split-Screen Solution Explorer */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: 10 Solution Selector Tabs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              maxHeight: '620px',
              overflowY: 'auto',
              paddingRight: '6px',
            }}
          >
            {solutionsData.map((sol, index) => {
              const isActive = sol.slug === activeSlug;
              return (
                <button
                  key={sol.slug}
                  type="button"
                  onClick={() => setActiveSlug(sol.slug)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isActive ? 'rgba(89, 139, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: isActive ? '1px solid var(--color-primary-blue)' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#FFFFFF',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-family-mono)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: isActive ? 'var(--color-primary-blue)' : '#6B7280',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          color: isActive ? '#FFFFFF' : '#D1D5DB',
                        }}
                      >
                        {sol.title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.72rem',
                          color: '#6B7280',
                          fontFamily: 'var(--font-family-mono)',
                          marginTop: '2px',
                        }}
                      >
                        {sol.kicker}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      color: isActive ? 'var(--color-primary-blue)' : '#4B5563',
                      fontSize: '1rem',
                      transform: isActive ? 'translateX(4px)' : 'none',
                      transition: 'transform 200ms ease',
                    }}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Architecture Details Panel */}
          <div
            style={{
              backgroundColor: '#111111',
              border: '1px solid #222222',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(2rem, 3.5vw, 2.75rem)',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Tag & Category */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-family-mono)',
                  color: 'var(--color-primary-blue)',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {activeSolution.kicker}
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  color: '#9E9E9E',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  padding: '4px 10px',
                  borderRadius: '999px',
                }}
              >
                {activeSolution.category}
              </span>
            </div>

            {/* Headline */}
            <h3
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(1.5rem, 2.5vw, 1.85rem)',
                fontWeight: 700,
                lineHeight: 1.25,
                color: '#FFFFFF',
                marginBottom: '14px',
              }}
            >
              {activeSolution.headline}
            </h3>

            {/* Problem Statement */}
            <p
              style={{
                fontSize: '0.95rem',
                color: '#A0A0A0',
                lineHeight: 1.6,
                marginBottom: '24px',
              }}
            >
              {activeSolution.problemStatement}
            </p>

            {/* Core Capabilities */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-family-mono)',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '12px',
                }}
              >
                ENGINEERING CAPABILITIES IN THIS SOLUTION:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {activeSolution.capabilities.slice(0, 4).map((cap) => (
                  <div
                    key={cap.title}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      padding: '12px',
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                      {cap.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#9E9E9E', lineHeight: 1.4 }}>
                      {cap.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Link */}
            <div style={{ borderTop: '1px solid #222222', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link
                href={`/solutions/${activeSolution.slug}`}
                className="sb-btn sb-btn--md sb-btn--primary"
                style={{ textDecoration: 'none' }}
              >
                <span>View Full Architectural Solution</span>
                <ArrowRight size={14} className="sb-btn__arrow" />
              </Link>

              <Link
                href="/solutions"
                style={{
                  fontSize: '0.825rem',
                  color: '#A0A0A0',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>All Solutions Index</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
