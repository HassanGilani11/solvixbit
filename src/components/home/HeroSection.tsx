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

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const heroRef = useRef<HTMLElement>(null);
  const bgParallaxRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const hero = heroRef.current;
    const bg = bgParallaxRef.current;
    if (!hero || !bg || checkPrefersReducedMotion()) return;
    const rect = hero.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    bg.style.transform = `translate3d(${nx * -18}px, ${ny * -14}px, 0)`;
  };

  const handleMouseLeave = () => {
    const bg = bgParallaxRef.current;
    if (!bg) return;
    bg.style.transform = 'translate3d(0, 0, 0)';
  };

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#040B1A',
        minHeight: 'clamp(560px, 82vh, 760px)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(3.25rem, 6vw, 5.5rem)',
        paddingBottom: 'clamp(3.5rem, 6.5vw, 5.75rem)',
        borderBottom: '1px solid rgba(89, 139, 255, 0.16)',
      }}
    >
      {/* Cursor-Reactive Parallax Wrapper for Agency Studio Backdrop */}
      <div
        ref={bgParallaxRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-4%',
          pointerEvents: 'none',
          transition: 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      >
        <div
          className="sb-hero-bg-drift"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/images/hero-agency-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Subtle Masked Architectural Grid */}
      <div
        aria-hidden="true"
        className="sb-hero-tech-grid"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(89, 139, 255, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(89, 139, 255, 0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 65% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 65% 50%, black 20%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Lightweight Ambient Light Sweep & Floating Orbs */}
      <div
        aria-hidden="true"
        className="sb-hero-light-beam"
        style={{
          position: 'absolute',
          top: '-25%',
          left: '-20%',
          width: '65%',
          height: '150%',
          background:
            'linear-gradient(105deg, transparent 20%, rgba(89, 139, 255, 0.07) 50%, rgba(2, 196, 21, 0.04) 60%, transparent 80%)',
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }}
      />

      <div
        aria-hidden="true"
        className="sb-hero-aurora"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 55% 45% at 75% 40%, rgba(89, 139, 255, 0.14) 0%, transparent 70%), radial-gradient(ellipse 45% 35% at 25% 75%, rgba(2, 196, 21, 0.07) 0%, transparent 70%)',
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
            'linear-gradient(95deg, rgba(4, 11, 26, 0.88) 0%, rgba(4, 11, 26, 0.52) 48%, rgba(4, 11, 26, 0.16) 100%)',
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
            {/* Eyebrow Pill */}
            <div className="sb-hero-eyebrow" style={{ display: 'inline-flex', marginBottom: '18px' }}>
              <span
                className="sb-glass-meta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#DBEAFE',
                  borderColor: 'rgba(89, 139, 255, 0.32)',
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
                SOLVIXBIT // DIGITAL ENGINEERING STUDIO
              </span>
            </div>

            {/* Main Display Headline */}
            <h1
              style={{
                fontFamily: "'Orbitron', var(--font-family-heading)",
                fontWeight: 800,
                fontSize: 'clamp(2.65rem, 5.2vw, 4.5rem)',
                lineHeight: 1.04,
                letterSpacing: '0.01em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                margin: '0 0 18px 0',
              }}
            >
              <span className="sb-hero-headline-line" style={{ display: 'block', willChange: 'transform, opacity' }}>
                SOLVE
              </span>
              <span className="sb-hero-headline-line" style={{ display: 'block', willChange: 'transform, opacity' }}>
                <span style={{ color: '#598BFF' }}>WHAT&apos;S</span>{' '}
                <span style={{ color: '#02C415' }}>NEXT.</span>
              </span>
            </h1>

            {/* Supporting Brand Headline */}
            <p
              className="sb-hero-headline-line"
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(1.2rem, 1.85vw, 1.55rem)',
                fontWeight: 700,
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                margin: '0 0 14px 0',
              }}
            >
              We turn bold ideas into digital experiences.
            </p>

            {/* Supporting Narrative */}
            <p
              className="sb-hero-paragraph"
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'clamp(0.98rem, 1.1vw, 1.08rem)',
                lineHeight: 1.65,
                color: 'rgba(226, 235, 248, 0.86)',
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
                  border: '1px solid rgba(147, 197, 253, 0.5)',
                  boxShadow: '0 10px 30px rgba(89, 139, 255, 0.4)',
                }}
              >
                <span>Start a Project</span>
                <ArrowRight size={16} className="sb-btn__arrow" />
              </Link>

              <Link
                href="/work"
                className="sb-btn sb-btn--lg sb-hero-cta-item sb-glass-meta"
                style={{
                  textDecoration: 'none',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.24)',
                }}
              >
                Explore Our Work
              </Link>
            </div>

            {/* Subtle Agency Capability Strip */}
            <div
              className="sb-hero-cta-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                flexWrap: 'wrap',
                marginTop: '28px',
                paddingTop: '18px',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-family-mono)',
                color: 'rgba(203, 213, 225, 0.85)',
              }}
            >
              <span><span style={{ color: '#02C415' }}>✓</span> Full-Cycle Engineering</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
              <span><span style={{ color: '#598BFF' }}>✓</span> AI &amp; Automation</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
              <span><span style={{ color: '#02C415' }}>✓</span> Full IP Ownership</span>
            </div>
          </div>

          {/* Right Column: Strong Hero Glass Panel Framing 3D Sculpture & Connected Architecture */}
          <div
            className="sb-hero-sculpture-col sb-glass-hero"
            style={{
              position: 'relative',
              willChange: 'transform, opacity',
              borderRadius: '24px',
              padding: 'clamp(14px, 2vw, 22px)',
              overflow: 'hidden',
            }}
          >
            {/* Top Floating Architecture Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                marginBottom: '8px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <span
                className="sb-glass-meta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '5px 11px',
                  borderRadius: '999px',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-family-mono)',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: '#E2E8F0',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#598BFF', boxShadow: '0 0 8px #598BFF' }} />
                CONNECTED ARCHITECTURE
              </span>

              <span
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-family-mono)',
                  color: '#94A3B8',
                  letterSpacing: '0.05em',
                }}
              >
                DRAG TO INSPECT
              </span>
            </div>

            <HeroSculpture />

            {/* Bottom Connected Architecture Nodes Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '8px',
                marginTop: '8px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {[
                { label: '01 / STRATEGY', value: 'System Design', accent: '#598BFF' },
                { label: '02 / BUILD', value: 'Web & SaaS', accent: '#FFFFFF' },
                { label: '03 / SCALE', value: 'AI & Cloud', accent: '#02C415' },
              ].map((node) => (
                <div
                  key={node.label}
                  className="sb-glass-meta"
                  style={{
                    padding: '9px 11px',
                    borderRadius: '12px',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.6rem',
                      fontFamily: 'var(--font-family-mono)',
                      fontWeight: 700,
                      color: node.accent,
                      letterSpacing: '0.05em',
                      marginBottom: '2px',
                    }}
                  >
                    {node.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: '#F8FAFC',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {node.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
