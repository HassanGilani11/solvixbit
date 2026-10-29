'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';

initGSAP();

export const IntroBrandStatement: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
          clearProps: 'transform',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
          },
        }
      );

      const cards = section.querySelectorAll('.sb-intro-pillar');
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
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        paddingTop: 'clamp(4rem, 7vw, 6.5rem)',
        paddingBottom: 'clamp(4rem, 7vw, 6.5rem)',
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
            marginBottom: 'clamp(2rem, 3.5vw, 3rem)',
            borderBottom: '1px solid #EFEFEF',
            paddingBottom: '16px',
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
            }}
          >
            STRATEGY + DESIGN + DIGITAL ENGINEERING
          </div>
        </div>

        {/* Large Expressive Statement */}
        <div ref={textRef} style={{ maxWidth: '980px', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <p
            className="sb-intro-line"
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'clamp(2rem, 3.8vw, 3.25rem)',
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: '-0.03em',
              color: '#000000',
              margin: '0 0 16px 0',
            }}
          >
            We bridge the gap between creative ambition and technical execution.
          </p>
          <p
            className="sb-intro-line"
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
              fontWeight: 500,
              lineHeight: 1.45,
              color: '#4B5563',
              margin: 0,
            }}
          >
            By unifying strategic architecture, bespoke user experience, and resilient software engineering, we help companies move from ambiguous challenges to production-grade digital systems that drive measurable commercial value.
          </p>
        </div>

        {/* Three Complementary Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          <div
            className="sb-intro-pillar"
            style={{
              backgroundColor: '#FAFAFA',
              border: '1px solid #E5E7EB',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-8)',
              position: 'relative',
              transition: 'border-color 200ms ease, box-shadow 200ms ease',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-primary-blue)',
                marginBottom: '12px',
              }}
            >
              PILLAR 01
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: '#000000',
                marginBottom: '10px',
              }}
            >
              Strategic Architecture
            </h3>
            <p style={{ fontSize: '0.925rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
              We clarify technical tradeoffs, eliminate legacy debt, and design systems aligned directly with commercial objectives before writing a line of code.
            </p>
          </div>

          <div
            className="sb-intro-pillar"
            style={{
              backgroundColor: '#FAFAFA',
              border: '1px solid #E5E7EB',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-8)',
              position: 'relative',
              transition: 'border-color 200ms ease, box-shadow 200ms ease',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-secondary-green)',
                marginBottom: '12px',
              }}
            >
              PILLAR 02
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: '#000000',
                marginBottom: '10px',
              }}
            >
              Bespoke Digital Craft
            </h3>
            <p style={{ fontSize: '0.925rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
              Interfaces that feel alive, intuitive, and elevated. Fluid micro-interactions, responsive design systems, and accessible WCAG 2.2 AA compliance.
            </p>
          </div>

          <div
            className="sb-intro-pillar"
            style={{
              backgroundColor: '#FAFAFA',
              border: '1px solid #E5E7EB',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-8)',
              position: 'relative',
              transition: 'border-color 200ms ease, box-shadow 200ms ease',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#000000',
                marginBottom: '12px',
              }}
            >
              PILLAR 03
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: '#000000',
                marginBottom: '10px',
              }}
            >
              Resilient Engineering
            </h3>
            <p style={{ fontSize: '0.925rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
              Type-safe codebases, automated testing, zero-downtime CI/CD pipelines, and cloud environments hardened for sub-second speed and infinite scale.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
