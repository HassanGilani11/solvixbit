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

      tl.fromTo(
        '.sb-hero-eyebrow',
        { y: -14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, clearProps: 'opacity,transform' }
      )
        .fromTo(
          '.sb-hero-headline-line',
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            clearProps: 'opacity,transform',
          },
          '-=0.25'
        )
        .fromTo(
          '.sb-hero-paragraph',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, clearProps: 'opacity,transform' },
          '-=0.35'
        )
        .fromTo(
          '.sb-hero-cta-item',
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            clearProps: 'opacity,transform',
          },
          '-=0.3'
        )
        .fromTo(
          '.sb-hero-sculpture-col',
          { scale: 0.92, y: 24, opacity: 0 },
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
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#040C1E',
        minHeight: 'clamp(560px, 82vh, 760px)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(3.25rem, 6vw, 5.5rem)',
        paddingBottom: 'clamp(3.5rem, 6.5vw, 5.75rem)',
        borderBottom: '1px solid rgba(89, 139, 255, 0.16)',
      }}
    >
      {/* Atmospheric Twilight Landscape Backdrop with Lightweight Ambient Drift */}
      <div
        aria-hidden="true"
        className="sb-hero-bg-drift"
        style={{
          position: 'absolute',
          inset: '-3%',
          backgroundImage: "url('/images/hero-twilight-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* Lightweight Ambient Aurora & Mist Shimmer */}
      <div
        aria-hidden="true"
        className="sb-hero-aurora"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 65% 45% at 72% 35%, rgba(89, 139, 255, 0.16) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 30% 75%, rgba(2, 196, 21, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          willChange: 'opacity, transform',
        }}
      />

      {/* Contrast & Depth Gradient Scrim */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(95deg, rgba(3, 9, 24, 0.86) 0%, rgba(3, 9, 24, 0.56) 46%, rgba(3, 9, 24, 0.2) 100%), linear-gradient(180deg, rgba(3, 9, 24, 0.38) 0%, transparent 28%, transparent 78%, rgba(3, 9, 24, 0.6) 100%)',
          pointerEvents: 'none',
        }}
      />

      <Container style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Futuristic Display Typography & Actions */}
          <div style={{ maxWidth: '610px' }}>
            {/* Eyebrow */}
            <p
              className="sb-hero-eyebrow"
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'clamp(0.68rem, 0.85vw, 0.78rem)',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(220, 234, 255, 0.88)',
                margin: '0 0 16px 0',
              }}
            >
              CREATIVE TECHNOLOGY &amp; SOFTWARE ENGINEERING
            </p>

            {/* Main Display Headline */}
            <h1
              style={{
                fontFamily: "'Orbitron', var(--font-family-heading)",
                fontWeight: 800,
                fontSize: 'clamp(2.25rem, 4.4vw, 3.85rem)',
                lineHeight: 1.06,
                letterSpacing: '0.015em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                margin: '0 0 22px 0',
              }}
            >
              <span className="sb-hero-headline-line" style={{ display: 'block', willChange: 'transform, opacity' }}>
                WE TURN
              </span>
              <span className="sb-hero-headline-line" style={{ display: 'block', willChange: 'transform, opacity' }}>
                BOLD
              </span>
              <span className="sb-hero-headline-line" style={{ display: 'block', willChange: 'transform, opacity' }}>
                <span style={{ color: '#598BFF' }}>IDEAS</span>{' '}
                <span style={{ color: '#02C415' }}>INTO</span>
              </span>
              <span className="sb-hero-headline-line" style={{ display: 'block', willChange: 'transform, opacity' }}>
                DIGITAL
              </span>
              <span className="sb-hero-headline-line" style={{ display: 'block', willChange: 'transform, opacity' }}>
                EXPERIENCES.
              </span>
            </h1>

            {/* Supporting Narrative */}
            <p
              className="sb-hero-paragraph"
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'clamp(0.98rem, 1.15vw, 1.12rem)',
                lineHeight: 1.65,
                color: 'rgba(226, 235, 248, 0.88)',
                margin: '0 0 30px 0',
                maxWidth: '520px',
              }}
            >
              We design, engineer, and scale digital products that solve real business problems, from standout
              websites and ecommerce platforms to intelligent software and automation.
            </p>

            {/* Primary & Secondary CTAs */}
            <div
              style={{
                display: 'flex',
                gap: '14px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <Link
                href="/start-a-project"
                className="sb-btn sb-btn--lg sb-hero-cta-item"
                style={{
                  textDecoration: 'none',
                  backgroundColor: '#598BFF',
                  color: '#FFFFFF',
                  border: '1px solid rgba(130, 170, 255, 0.5)',
                  boxShadow: '0 8px 28px rgba(89, 139, 255, 0.35)',
                }}
              >
                <span>Start a Project</span>
                <ArrowRight size={16} className="sb-btn__arrow" />
              </Link>

              <Link
                href="/work"
                className="sb-btn sb-btn--lg sb-hero-cta-item"
                style={{
                  textDecoration: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.24)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Explore Our Work
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive 3D Glossy </> Code Emblem */}
          <div
            className="sb-hero-sculpture-col"
            style={{ position: 'relative', willChange: 'transform, opacity' }}
          >
            <HeroSculpture />
          </div>
        </div>
      </Container>
    </section>
  );
};
