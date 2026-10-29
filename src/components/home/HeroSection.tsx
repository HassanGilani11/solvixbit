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

interface HeroSectionProps {
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
      tl.from('.sb-hero-eyebrow', {
        y: -14,
        opacity: 0,
        duration: 0.5,
      });

      // 2. Headline reveals
      tl.from(
        '.sb-hero-headline-main',
        {
          y: '100%',
          opacity: 0,
          duration: 0.7,
        },
        '-=0.25'
      );

      // 3. Sub-headline
      tl.from(
        '.sb-hero-headline-sub',
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.4'
      );

      // 4. Supporting paragraph
      tl.from(
        '.sb-hero-paragraph',
        {
          y: 18,
          opacity: 0,
          duration: 0.55,
        },
        '-=0.35'
      );

      // 5. CTA buttons
      tl.fromTo(
        '.sb-hero-cta-item',
        {
          y: 16,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          clearProps: 'opacity,transform',
        },
        '-=0.3'
      );

      // 6. Hero 3D Sculpture reveal
      tl.from(
        '.sb-hero-sculpture-col',
        {
          scale: 0.95,
          y: 24,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.6'
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
        paddingTop: 'clamp(2.5rem, 5vw, 4.5rem)',
        paddingBottom: 'clamp(2.5rem, 5vw, 4.5rem)',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Editorial Typography & Actions */}
          <div style={{ maxWidth: '640px' }}>
            {/* Primary Eyebrow */}
            <div className="sb-hero-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
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
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-blue)',
                  }}
                />
                CREATIVE TECHNOLOGY &amp; DIGITAL ENGINEERING
              </span>
            </div>

            {/* Main Headline */}
            <div style={{ overflow: 'hidden', marginBottom: '8px' }}>
              <h1
                className="sb-hero-headline-main"
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontWeight: 800,
                  fontSize: 'clamp(2.75rem, 5.5vw, 4.75rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.04em',
                  color: '#000000',
                  margin: 0,
                  willChange: 'transform, opacity',
                }}
              >
                Solve What&apos;s Next.
              </h1>
            </div>

            {/* Supporting Headline */}
            <h2
              className="sb-hero-headline-sub"
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontWeight: 700,
                fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: 'var(--color-primary-blue)',
                margin: '0 0 16px 0',
              }}
            >
              Big ideas deserve better technology.
            </h2>

            {/* Supporting Copy */}
            <p
              className="sb-hero-paragraph"
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'clamp(1.05rem, 1.25vw, 1.2rem)',
                lineHeight: 1.6,
                color: '#4B5563',
                marginBottom: '28px',
                maxWidth: '560px',
              }}
            >
              We design, engineer, and scale digital products and intelligent systems that help ambitious businesses move forward.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                gap: '14px',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: '28px',
              }}
            >
              <Link
                href="/start-a-project"
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

            {/* Credibility & Senior Access Strip */}
            <div
              className="sb-hero-cta-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '0.825rem',
                color: '#6B7280',
                flexWrap: 'wrap',
                paddingTop: '16px',
                borderTop: '1px solid #EFEFEF',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#111827' }}>
                <span style={{ color: 'var(--color-secondary-green)' }}>✓</span> Full-Cycle Engineering
              </span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#111827' }}>
                <span style={{ color: 'var(--color-primary-blue)' }}>✓</span> Direct Senior Partner Access
              </span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#111827' }}>
                <span style={{ color: '#000000' }}>✓</span> Zero Vendor Lock-in
              </span>
            </div>
          </div>

          {/* Right Column: Signature 3D Constellation Sculpture */}
          <div className="sb-hero-sculpture-col" style={{ willChange: 'transform, opacity' }}>
            <HeroSculpture />
          </div>
        </div>
      </Container>
    </section>
  );
};
