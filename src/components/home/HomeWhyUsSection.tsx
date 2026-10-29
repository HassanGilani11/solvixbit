'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';

initGSAP();

const ADVANTAGES = [
  {
    num: '01',
    title: 'Problem-First Engineering',
    desc: 'We diagnose operational bottlenecks and commercial objectives before committing to technology stacks or writing code.',
  },
  {
    num: '02',
    title: 'Design Craft Meets Technical Rigor',
    desc: 'We bridge fluid, accessible user interfaces with strictly typed, maintainable software architectures.',
  },
  {
    num: '03',
    title: 'Pragmatic AI & Real Automation',
    desc: 'Deterministic pipelines and grounded AI models that remove real friction without hallucination risks.',
  },
  {
    num: '04',
    title: 'Zero Vendor Lock-in',
    desc: 'Clean codebases, modular components, and comprehensive documentation so your internal team retains full ownership.',
  },
  {
    num: '05',
    title: 'Direct Senior Partner Access',
    desc: 'Work directly with principal engineers and product architects without non-technical administrative layers.',
  },
  {
    num: '06',
    title: 'Enterprise Hardening & Security',
    desc: 'Zero-trust architecture, automated security audits, OWASP compliance, and sub-second edge availability.',
  },
];

export const HomeWhyUsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        '.sb-why-header',
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

      const items = section.querySelectorAll('.sb-why-item');
      gsap.fromTo(
        items,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
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

  return (
    <section
      ref={sectionRef}
      id="why-us"
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
        <div className="sb-why-header" style={{ maxWidth: '800px', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
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
              07 // THE SOLVIXBIT ADVANTAGE
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
            Built for companies that value engineering credibility over buzzwords.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
              lineHeight: 1.6,
              color: '#9E9E9E',
              margin: 0,
            }}
          >
            We operate as an elite engineering partner, bringing clarity, craft, and accountability to every digital initiative.
          </p>
        </div>

        {/* High-Contrast Asymmetric Grid */}
        <div
          className="sb-why-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {ADVANTAGES.map((adv) => (
            <div
              key={adv.num}
              className="sb-why-item"
              style={{
                backgroundColor: '#111111',
                border: '1px solid #222222',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(1.75rem, 3vw, 2.25rem)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 200ms ease, transform 200ms ease',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--color-primary-blue)',
                  marginBottom: '12px',
                }}
              >
                // {adv.num}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '10px',
                  lineHeight: 1.3,
                }}
              >
                {adv.title}
              </h3>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#A0A0A0',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {adv.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
