'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { HeroSculpture } from './HeroSculpture';
import { ArrowRight } from '../icons';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';

initGSAP();

export interface HeroSectionProps {
  onStartProjectClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartProjectClick }) => {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      const hero = heroRef.current;
      if (!hero) return;

      const tl = gsap.timeline({
        defaults: {
          ease: ANIMATION_CONFIG.ease.brand,
        },
      });

      // 1. Eyebrow badge entrance
      tl.fromTo(
        '.sb-hero-eyebrow',
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, clearProps: 'opacity,transform' }
      );

      // 2. Primary Tagline reveal
      tl.fromTo(
        '.sb-hero-headline-main',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, clearProps: 'opacity,transform' },
        '-=0.25'
      );

      // 3. Supporting headline reveal
      tl.fromTo(
        '.sb-hero-headline-sub',
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, clearProps: 'opacity,transform' },
        '-=0.45'
      );

      // 4. Narrative paragraph
      tl.fromTo(
        '.sb-hero-paragraph',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, clearProps: 'opacity,transform' },
        '-=0.4'
      );

      // 5. Action CTAs
      tl.fromTo(
        '.sb-hero-cta-item',
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          clearProps: 'opacity,transform',
        },
        '-=0.35'
      );

      // 6. Senior Credibility Strip
      tl.fromTo(
        '.sb-hero-credibility-strip',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, clearProps: 'opacity,transform' },
        '-=0.3'
      );

      // 7. Interactive 3D Sculpture Reveal
      tl.fromTo(
        '.sb-hero-sculpture-col',
        { scale: 0.94, y: 28, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.85,
          clearProps: 'opacity,transform,scale',
        },
        '-=0.65'
      );

      return () => {
        tl.kill();
      };
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="sb-hero-backdrop"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'clamp(2.5rem, 5vw, 4.75rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5.25rem)',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(2.25rem, 4.5vw, 4.25rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Authoritative Editorial Typography & Actions */}
          <div style={{ maxWidth: '640px' }}>
            {/* 1. Primary Eyebrow with Active Signal Beacon */}
            <div className="sb-hero-eyebrow" style={{ display: 'inline-flex', marginBottom: '18px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-family-mono)',
                }}
              >
                <span
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    width: '8px',
                    height: '8px',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    className="sb-radar-ping"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary-blue)',
                    }}
                  />
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary-blue)',
                    }}
                  />
                </span>
                CREATIVE TECHNOLOGY &amp; DIGITAL ENGINEERING
              </span>
            </div>

            {/* 2. Main Tagline: Solve What's Next. */}
            <div style={{ overflow: 'hidden', marginBottom: '8px' }}>
              <h1
                className="sb-hero-headline-main"
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontWeight: 800,
                  fontSize: 'clamp(2.85rem, 5.8vw, 4.85rem)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.04em',
                  color: '#000000',
                  margin: 0,
                  willChange: 'transform, opacity',
                }}
              >
                Solve What&apos;s Next.
              </h1>
            </div>

            {/* 3. Supporting Headline: Big ideas deserve better technology. */}
            <h2
              className="sb-hero-headline-sub"
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontWeight: 700,
                fontSize: 'clamp(1.45rem, 2.5vw, 2.2rem)',
                lineHeight: 1.22,
                letterSpacing: '-0.025em',
                color: 'var(--color-primary-blue)',
                margin: '0 0 18px 0',
              }}
            >
              Big ideas deserve better technology.
            </h2>

            {/* 4. Supporting Narrative */}
            <p
              className="sb-hero-paragraph"
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'clamp(1.05rem, 1.25vw, 1.2rem)',
                lineHeight: 1.62,
                color: '#4B5563',
                marginBottom: '30px',
                maxWidth: '560px',
              }}
            >
              We design, engineer, and scale digital products and intelligent systems that help ambitious businesses move forward.
            </p>

            {/* 5. CTAs with Dual Quick-Consultation Modal + Full Project Scoping Support */}
            <div
              style={{
                display: 'flex',
                gap: '14px',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <Link
                href="/start-a-project"
                onClick={(e) => {
                  if (onStartProjectClick) {
                    e.preventDefault();
                    onStartProjectClick();
                  }
                }}
                className="sb-btn sb-btn--lg sb-btn--primary sb-hero-cta-item"
                style={{ textDecoration: 'none' }}
              >
                <span>Start a Project</span>
                <ArrowRight size={16} className="sb-btn__arrow" />
              </Link>

              <Link
                href="/work"
                className="sb-btn sb-btn--lg sb-btn--secondary sb-hero-cta-item"
                style={{ textDecoration: 'none' }}
              >
                Explore Our Work
              </Link>
            </div>

            {/* 6. Senior Engineering Access & Credibility Strip */}
            <div
              className="sb-hero-credibility-strip"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '0.825rem',
                color: '#6B7280',
                flexWrap: 'wrap',
                paddingTop: '18px',
                borderTop: '1px solid #EFEFEF',
                fontFamily: 'var(--font-family-body)',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#111827' }}>
                <span style={{ color: 'var(--color-secondary-green)' }}>✓</span> Full-Cycle Engineering
              </span>
              <span style={{ color: '#D1D5DB' }}>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#111827' }}>
                <span style={{ color: 'var(--color-primary-blue)' }}>✓</span> Direct Senior Partner Access
              </span>
              <span style={{ color: '#D1D5DB' }}>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#111827' }}>
                <span style={{ color: '#000000' }}>✓</span> Zero Vendor Lock-in
              </span>
            </div>
          </div>

          {/* Right Column: Signature 3D Architecture Sculpture (Seamlessly Integrated) */}
          <div className="sb-hero-sculpture-col" style={{ position: 'relative', willChange: 'transform, opacity' }}>
            <HeroSculpture />
          </div>
        </div>
      </Container>
    </section>
  );
};
