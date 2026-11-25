'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { ArrowRight } from '../icons';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';

initGSAP();

interface BrandPillar {
  num: string;
  title: string;
  subtitle: string;
  accentColor: string;
  description: string;
  deliverables: string[];
}

const PILLARS: BrandPillar[] = [
  {
    num: '01',
    title: 'Strategic Architecture',
    subtitle: 'Solve before you build',
    accentColor: '#598BFF',
    description:
      'We clarify technical trade-offs, eradicate architectural debt, and design software topologies aligned directly with commercial milestones before writing code.',
    deliverables: ['System Boundary Modeling', 'Cloud Topology Design', 'Cost & Latency Forecasting'],
  },
  {
    num: '02',
    title: 'Bespoke Digital Craft',
    subtitle: 'Interfaces that convert and endure',
    accentColor: '#02C415',
    description:
      'Fluid micro-interactions, responsive design systems, and strict WCAG 2.2 AA accessibility. We build software experiences that feel alive, intuitive, and elevated.',
    deliverables: ['Design System Tokens', '60fps Micro-Interactions', 'Type-Safe UI Contracts'],
  },
  {
    num: '03',
    title: 'Resilient Engineering',
    subtitle: 'Tested under real-world load',
    accentColor: '#000000',
    description:
      'Type-safe codebases, automated integration test suites, zero-downtime CI/CD pipelines, and cloud environments hardened for sub-second global performance.',
    deliverables: ['Zero-Downtime Releases', 'OWASP Security Hardening', 'Automated Integration Testing'],
  },
];

export const IntroBrandStatement: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [activePillar, setActivePillar] = useState<number>(0);

  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      const section = sectionRef.current;
      const textBlock = textRef.current;
      if (!section || !textBlock) return;

      const lines = textBlock.querySelectorAll('.sb-intro-line');

      gsap.fromTo(
        lines,
        { y: 28, opacity: 0.15 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.16,
          duration: 0.8,
          ease: ANIMATION_CONFIG.ease.brand,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
          },
        }
      );

      const cards = section.querySelectorAll('.sb-intro-pillar-card');
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: ANIMATION_CONFIG.ease.brand,
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Highlight the active pillar as the right column scrolls up past the sticky left column
      cards.forEach((card, idx) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 55%',
            end: 'bottom 45%',
            onEnter: () => setActivePillar(idx),
            onEnterBack: () => setActivePillar(idx),
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 7rem)',
        position: 'relative',
      }}
    >
      <Container>
        {/* Editorial Section Eyebrow */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
            borderBottom: '1px solid #EFEFEF',
            paddingBottom: '18px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-blue)',
              }}
            />
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 700,
                color: '#111827',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              01 // THE SOLVIXBIT STANDARD
            </span>
          </div>

          <div
            style={{
              fontSize: 'var(--font-size-xs)',
              color: '#6B7280',
              fontFamily: 'var(--font-family-mono)',
              letterSpacing: '0.06em',
            }}
          >
            STRATEGY + DESIGN + DIGITAL ENGINEERING
          </div>
        </div>

        {/* Asymmetrical Editorial Composition: Big Anchor Statement + Layered Progressive Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Sticky Expressive Statement & Studio Manifesto */}
          <div ref={textRef} className="sb-intro-sticky-col" style={{ maxWidth: '640px' }}>
            <h2
              className="sb-intro-line"
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(2.15rem, 4vw, 3.4rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.035em',
                color: '#000000',
                margin: '0 0 20px 0',
              }}
            >
              We bridge the gap between creative ambition and technical execution.
            </h2>

            <p
              className="sb-intro-line"
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'clamp(1.1rem, 1.4vw, 1.25rem)',
                fontWeight: 400,
                lineHeight: 1.65,
                color: '#4B5563',
                margin: '0 0 32px 0',
              }}
            >
              By unifying strategic architecture, bespoke user experience, and resilient software engineering, we help companies move from ambiguous challenges to production-grade digital systems that drive measurable commercial value.
            </p>

            {/* Studio Engineering Principles Card */}
            <div
              className="sb-intro-line"
              style={{
                backgroundColor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-family-mono)', fontWeight: 700, color: 'var(--color-primary-blue)', letterSpacing: '0.06em' }}>
                  // METHODOLOGY DIRECTIVE
                </span>
                <span style={{ fontSize: '0.7rem', color: '#02C415', fontFamily: 'var(--font-family-mono)', fontWeight: 600 }}>
                  VERIFIED AUDIT
                </span>
              </div>
              <div style={{ fontSize: '0.92rem', color: '#111827', fontWeight: 600, lineHeight: 1.5 }}>
                Every engagement begins with problem diagnosis, type contracts, and SLA definitions before writing a line of production code.
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '6px' }}>
                <span style={{ fontSize: '0.72rem', padding: '4px 10px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '999px', color: '#4B5563' }}>
                  ✓ Type-Safe Contracts
                </span>
                <span style={{ fontSize: '0.72rem', padding: '4px 10px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '999px', color: '#4B5563' }}>
                  ✓ Zero Vendor Lock-in
                </span>
                <span style={{ fontSize: '0.72rem', padding: '4px 10px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '999px', color: '#4B5563' }}>
                  ✓ Sub-second p95 Latency
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Progressive Interactive Three Pillars (Non-Repetitive Stack) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {PILLARS.map((pillar, idx) => {
              const isActive = activePillar === idx;
              return (
                <div
                  key={pillar.num}
                  className="sb-intro-pillar-card"
                  onClick={() => setActivePillar(idx)}
                  onMouseEnter={() => setActivePillar(idx)}
                  style={{
                    backgroundColor: isActive ? '#000000' : '#FAFAFA',
                    color: isActive ? '#FFFFFF' : '#111827',
                    border: isActive ? `1px solid ${pillar.accentColor}` : '1px solid #E5E7EB',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                    cursor: 'pointer',
                    transition: 'all 280ms cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isActive
                      ? '0 20px 40px -12px rgba(0, 0, 0, 0.28), 0 0 1px 1px rgba(0, 0, 0, 0.05)'
                      : '0 2px 6px rgba(0, 0, 0, 0.02)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top Bar with Number and Subtitle */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-family-mono)',
                          fontSize: '0.85rem',
                          fontWeight: 800,
                          color: pillar.accentColor,
                        }}
                      >
                        PILLAR {pillar.num}
                      </span>
                      <span style={{ color: isActive ? '#4B5563' : '#D1D5DB' }}>/</span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-family-mono)',
                          color: isActive ? '#9CA3AF' : '#6B7280',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {pillar.subtitle}
                      </span>
                    </div>

                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? pillar.accentColor : '#D1D5DB',
                        transition: 'background-color 200ms ease',
                      }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-family-heading)',
                      fontSize: 'clamp(1.35rem, 2vw, 1.65rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      margin: '0 0 10px 0',
                      color: isActive ? '#FFFFFF' : '#000000',
                    }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: isActive ? '#D1D5DB' : '#4B5563',
                      lineHeight: 1.62,
                      margin: '0 0 18px 0',
                    }}
                  >
                    {pillar.description}
                  </p>

                  {/* Progressive Deliverables List */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      paddingTop: '14px',
                      borderTop: isActive ? '1px solid #222222' : '1px solid #EFEFEF',
                    }}
                  >
                    {pillar.deliverables.map((del) => (
                      <span
                        key={del}
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-family-mono)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: isActive ? '#1A1A1A' : '#FFFFFF',
                          color: isActive ? '#E5E7EB' : '#374151',
                          border: isActive ? '1px solid #333333' : '1px solid #E5E7EB',
                        }}
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
