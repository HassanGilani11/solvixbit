'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { ArrowRight } from '../icons';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';

initGSAP();

interface HomeClosingCTAProps {
  onStartProjectClick?: () => void;
}

export const HomeClosingCTA: React.FC<HomeClosingCTAProps> = ({ onStartProjectClick }) => {
  const ctaRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      const cta = ctaRef.current;
      if (!cta) return;

      gsap.fromTo(
        '.sb-closing-card',
        { scale: 0.96, y: 30, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: ANIMATION_CONFIG.ease.brand,
          clearProps: 'opacity,transform,scale',
          scrollTrigger: {
            trigger: cta,
            start: 'top 85%',
            once: true,
          },
        }
      );
    },
    { scope: ctaRef }
  );

  return (
    <section
      ref={ctaRef}
      id="contact-cta"
      style={{
        backgroundColor: '#FFFFFF',
        paddingTop: 'clamp(5rem, 9vw, 8rem)',
        paddingBottom: 'clamp(5rem, 9vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container>
        {/* Layered Architectural Closing Surface */}
        <div
          className="sb-closing-card"
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            padding: 'clamp(3rem, 7vw, 6rem) clamp(2rem, 5vw, 4.5rem)',
            textAlign: 'center',
            overflow: 'hidden',
            boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.4), 0 0 1px 1px rgba(255, 255, 255, 0.1)',
            maxWidth: '1080px',
            margin: '0 auto',
          }}
        >
          {/* Subtle Ambient Brand Glows */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-80px',
              left: '20%',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(89, 139, 255, 0.28) 0%, rgba(89, 139, 255, 0.05) 50%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '-60px',
              right: '25%',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(2, 196, 21, 0.18) 0%, rgba(2, 196, 21, 0.03) 50%, transparent 70%)',
              filter: 'blur(45px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Card Content */}
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px', margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', marginBottom: '16px' }}>
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
                  color: 'var(--color-primary-blue)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-family-mono)',
                }}
              >
                START A CONVERSATION
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                margin: '0 0 20px 0',
              }}
            >
              Let&apos;s solve what&apos;s next.
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                color: '#D1D5DB',
                lineHeight: 1.6,
                maxWidth: '640px',
                margin: '0 auto 36px auto',
              }}
            >
              Tell us what you&apos;re building, what needs to change, or where technology could take your business next.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '14px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <Link
                href="/start-a-project"
                className="sb-btn sb-btn--lg sb-btn--primary"
                style={{ minWidth: '220px', textDecoration: 'none' }}
              >
                <span>Start a Project</span>
                <ArrowRight size={16} className="sb-btn__arrow" />
              </Link>
              <Link
                href="/contact"
                className="sb-btn sb-btn--lg"
                style={{
                  minWidth: '180px',
                  textDecoration: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <span>Direct Contact</span>
              </Link>
            </div>

            <div
              style={{
                marginTop: '32px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'center',
                gap: '24px',
                fontSize: '0.8rem',
                color: '#9E9E9E',
                fontFamily: 'var(--font-family-mono)',
                flexWrap: 'wrap',
              }}
            >
              <span>hello@solvixbit.com</span>
              <span>•</span>
              <span>Response within 24 business hours</span>
              <span>•</span>
              <span>Strict Mutual NDA</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
