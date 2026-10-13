'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { HeroCardTilt } from './HeroCardTilt';
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
        y: -12,
        opacity: 0,
        duration: 0.45,
      });

      // 2. Headline lines reveal (clean mask roll up)
      tl.from(
        '.sb-hero-headline-line',
        {
          y: '105%',
          opacity: 0,
          duration: 0.65,
          stagger: 0.12,
        },
        '-=0.25'
      );

      // 3. Supporting paragraph
      tl.from(
        '.sb-hero-paragraph',
        {
          y: 16,
          opacity: 0,
          duration: 0.5,
        },
        '-=0.35'
      );

      // 4. CTA buttons and trust indicator (fail-safe fromTo with clearProps)
      tl.fromTo(
        '.sb-hero-cta-item',
        {
          y: 14,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
          clearProps: 'opacity,transform',
        },
        '-=0.3'
      );

      // 5. Hero visual card reveal (gentle scale + rise)
      tl.from(
        '.sb-hero-visual-card',
        {
          scale: 0.96,
          y: 20,
          opacity: 0,
          duration: 0.7,
        },
        '-=0.55'
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
        paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)',
        paddingBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Refined Editorial Typography & CTAs */}
          <div style={{ maxWidth: '720px' }}>
            {/* Eyebrow */}
            <div className="sb-hero-eyebrow" style={{ display: 'inline-flex', marginBottom: '12px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 12px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: '#000000',
                  letterSpacing: 'var(--letter-spacing-wide)',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-secondary-green)',
                  }}
                />
                CREATIVE TECHNOLOGY &amp; SOFTWARE ENGINEERING
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 4.8vw, 4.25rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                color: '#000000',
                marginBottom: '12px',
              }}
            >
              <span
                style={{
                  display: 'block',
                  overflow: 'hidden',
                  paddingBottom: '0.06em',
                }}
              >
                <span
                  className="sb-hero-headline-line"
                  style={{
                    display: 'inline-block',
                    willChange: 'transform, opacity',
                  }}
                >
                  We turn bold ideas into
                </span>
              </span>

              <span
                style={{
                  display: 'block',
                  overflow: 'hidden',
                  paddingBottom: '0.06em',
                }}
              >
                <span
                  className="sb-hero-headline-line"
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #598BFF 0%, #2563EB 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    willChange: 'transform, opacity',
                  }}
                >
                  digital experiences.
                </span>
              </span>
            </h1>

            {/* Paragraph */}
            <p
              className="sb-hero-paragraph"
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                lineHeight: 1.55,
                color: '#4B5563',
                marginBottom: '14px',
                maxWidth: '600px',
              }}
            >
              We design, engineer, and scale digital products that solve real business problems, from standout websites and ecommerce platforms to intelligent software and automation.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                alignItems: 'center',
                marginBottom: '12px',
              }}
            >
              <Link
                href="/start-a-project"
                className="sb-btn sb-btn--md sb-btn--primary sb-hero-cta-item"
                style={{ textDecoration: 'none' }}
              >
                <span>Start a Project</span>
                <ArrowRight size={15} className="sb-btn__arrow" />
              </Link>
              <Link
                href="/work"
                className="sb-btn sb-btn--md sb-btn--secondary sb-hero-cta-item"
                style={{ textDecoration: 'none' }}
              >
                Explore Our Work
              </Link>
            </div>

            {/* Trust indicator */}
            <div
              className="sb-hero-cta-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.8rem',
                color: '#6B7280',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', color: '#F59E0B', fontSize: '0.85rem' }}>
                ★★★★★
              </div>
              <span>Enterprise-Grade Delivery</span>
              <span>•</span>
              <span>Direct Senior Partner Access</span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Agency Visual */}
          <div className="sb-hero-visual-card" style={{ willChange: 'transform, opacity' }}>
            <HeroCardTilt />
          </div>
        </div>
      </Container>
    </section>
  );
};
