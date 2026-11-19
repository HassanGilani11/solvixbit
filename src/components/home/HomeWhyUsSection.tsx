'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';

initGSAP();

interface Advantage {
  num: string;
  title: string;
  desc: string;
  tag: string;
}

const ADVANTAGES: Advantage[] = [
  {
    num: '01',
    title: 'Problem-First Engineering',
    desc: 'We diagnose operational bottlenecks and commercial objectives before committing to technology stacks or writing code.',
    tag: 'DIAGNOSTIC FIRST',
  },
  {
    num: '02',
    title: 'Design Craft Meets Technical Rigor',
    desc: 'We bridge fluid, accessible user interfaces with strictly typed, maintainable software architectures that scale.',
    tag: 'PRECISION CRAFT',
  },
  {
    num: '03',
    title: 'Pragmatic AI & Real Automation',
    desc: 'Deterministic pipelines and grounded AI models that remove real operational friction without hallucination risks.',
    tag: 'DETERMINISTIC AI',
  },
  {
    num: '04',
    title: 'Zero Vendor Lock-in',
    desc: 'Clean codebases, modular components, and comprehensive documentation so your internal team retains full ownership.',
    tag: '100% IP TRANSFER',
  },
  {
    num: '05',
    title: 'Direct Senior Partner Access',
    desc: 'Work directly with principal engineers and product architects without non-technical administrative layers or juniors.',
    tag: 'PRINCIPAL LEVEL',
  },
  {
    num: '06',
    title: 'Enterprise Hardening & Security',
    desc: 'Zero-trust architecture, automated security audits, OWASP compliance, and sub-second edge availability.',
    tag: 'ENTERPRISE GRADE',
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
        borderBottom: '1px solid #1F2937',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container>
        {/* Asymmetrical Editorial Composition: Left Sticky Thesis + Right Differentiator Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 'clamp(2.5rem, 5vw, 4.5rem)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Thesis & Senior Partner Commitment Card */}
          <div className="sb-why-header">
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
                fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: '#FFFFFF',
                margin: '0 0 16px 0',
              }}
            >
              Built for companies that value engineering credibility over buzzwords.
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                lineHeight: 1.6,
                color: '#9CA3AF',
                marginBottom: '32px',
              }}
            >
              We operate as an elite engineering partner, bringing clarity, craft, and accountability to every digital initiative. No generic templates, no junior handoffs.
            </p>

            {/* Direct Partner Access Guarantee Box */}
            <div
              style={{
                backgroundColor: 'rgba(89, 139, 255, 0.05)',
                border: '1px solid rgba(89, 139, 255, 0.2)',
                borderRadius: '16px',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#02C415',
                    boxShadow: '0 0 8px #02C415',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-family-mono)',
                    color: '#02C415',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  GUARANTEED OPERATIONAL STANDARD
                </span>
              </div>

              <div
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                }}
              >
                Direct Principal Engineer Engagement
              </div>

              <p
                style={{
                  fontSize: '0.85rem',
                  color: '#9CA3AF',
                  lineHeight: 1.55,
                  margin: '0 0 18px 0',
                }}
              >
                No account managers playing telephone. You collaborate directly with senior architects who write production code and own system delivery.
              </p>

              {/* Credibility Telemetry Strip */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  borderTop: '1px solid rgba(89, 139, 255, 0.15)',
                  paddingTop: '14px',
                }}
              >
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#598BFF', fontFamily: 'var(--font-family-mono)' }}>
                    &lt;24h
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#6B7280', textTransform: 'uppercase', fontFamily: 'var(--font-family-mono)' }}>
                    Response SLA
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#598BFF', fontFamily: 'var(--font-family-mono)' }}>
                    100%
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#6B7280', textTransform: 'uppercase', fontFamily: 'var(--font-family-mono)' }}>
                    IP Ownership
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#02C415', fontFamily: 'var(--font-family-mono)' }}>
                    0%
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#6B7280', textTransform: 'uppercase', fontFamily: 'var(--font-family-mono)' }}>
                    Vendor Lock-in
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Differentiator Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {ADVANTAGES.map((adv) => (
              <div
                key={adv.num}
                className="sb-why-item"
                style={{
                  backgroundColor: '#0B0F19',
                  border: '1px solid #1E283D',
                  borderRadius: '14px',
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 200ms ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#598BFF';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#1E283D';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: 'var(--color-primary-blue)',
                    }}
                  >
                    // {adv.num}
                  </span>

                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'var(--font-family-mono)',
                      color: '#6B7280',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {adv.tag}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}
                >
                  {adv.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: '#9CA3AF',
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
