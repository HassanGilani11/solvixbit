'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { ArrowRight } from '../icons';
import { caseStudiesData } from '../../config/work';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';

initGSAP();

export const HomeFeaturedWork: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        '.sb-work-header',
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

      const panels = section.querySelectorAll('.sb-featured-project-panel');
      panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: ANIMATION_CONFIG.ease.brand,
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 7rem)',
        position: 'relative',
      }}
    >
      <Container>
        {/* Section Header */}
        <div
          className="sb-work-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 'var(--space-6)',
            marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'inline-flex', marginBottom: '12px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 12px',
                  backgroundColor: '#F3F4F6',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-family-mono)',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary-blue)' }} />
                05 // FEATURED CASE HIGHLIGHTS
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(2rem, 3.5vw, 2.85rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: '#000000',
                margin: '0 0 12px 0',
              }}
            >
              Engineered for impact. Tested in production.
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                lineHeight: 1.6,
                color: '#4B5563',
                margin: 0,
              }}
            >
              A selection of mission-critical systems and digital platforms engineered with rigorous architectural standards.
            </p>
          </div>

          <Link
            href="/work"
            className="sb-btn sb-btn--md sb-btn--secondary"
            style={{ textDecoration: 'none' }}
          >
            <span>Explore All Work</span>
            <ArrowRight size={14} className="sb-btn__arrow" />
          </Link>
        </div>

        {/* Large Format Project Panels */}
        <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 4vw, 3.5rem)' }}>
          {caseStudiesData.map((project, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={project.slug}
                className="sb-featured-project-panel"
                style={{
                  backgroundColor: '#FAFAFA',
                  border: '1px solid #E5E7EB',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'clamp(2rem, 4vw, 3.25rem)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
                  gap: 'clamp(2rem, 4vw, 3.5rem)',
                  alignItems: 'center',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.04)',
                }}
              >
                {/* Content Side */}
                <div style={{ order: isEven ? 2 : 1 }}>
                  {/* Meta Strip */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-family-mono)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--color-primary-blue)',
                      }}
                    >
                      0{index + 1}
                    </span>
                    <span style={{ color: '#D1D5DB' }}>/</span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-family-mono)',
                        fontWeight: 600,
                        color: '#6B7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {project.client}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-family-heading)',
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                      fontWeight: 800,
                      lineHeight: 1.22,
                      letterSpacing: '-0.025em',
                      color: '#000000',
                      marginBottom: '16px',
                    }}
                  >
                    <Link
                      href={`/work/${project.slug}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'color 180ms ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#598BFF')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#000000')}
                    >
                      {project.title}
                    </Link>
                  </h3>

                  {/* Summary Narrative */}
                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#4B5563',
                      lineHeight: 1.65,
                      marginBottom: '24px',
                    }}
                  >
                    {project.summary}
                  </p>

                  {/* Quantifiable Metrics Strip */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '12px',
                      backgroundColor: '#FFFFFF',
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid #E5E7EB',
                      marginBottom: '24px',
                    }}
                  >
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <div
                          style={{
                            fontFamily: 'var(--font-family-heading)',
                            fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
                            fontWeight: 800,
                            color: 'var(--color-primary-blue)',
                          }}
                        >
                          {m.value}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#6B7280', marginTop: '2px', fontWeight: 500 }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <Link
                    href={`/work/${project.slug}`}
                    className="sb-btn sb-btn--md sb-btn--primary"
                    style={{ textDecoration: 'none' }}
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight size={14} className="sb-btn__arrow" />
                  </Link>
                </div>

                {/* Visual / Application Architecture Mockup Side */}
                <div
                  style={{
                    order: isEven ? 1 : 2,
                    backgroundColor: '#000000',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                    color: '#FFFFFF',
                    border: '1px solid #222222',
                    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#02C415' }} />
                    </div>
                    <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-family-mono)', color: '#6B7280' }}>
                      PRODUCTION TELEMETRY
                    </span>
                  </div>

                  <div style={{ backgroundColor: '#111111', padding: '16px', borderRadius: '8px', border: '1px solid #222222' }}>
                    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', color: '#598BFF', marginBottom: '6px' }}>
                      // ARCHITECTURAL DELIVERABLE
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF' }}>
                      {project.title}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-family-mono)', color: '#6B7280', marginBottom: '8px' }}>
                      CORE TECHNOLOGIES:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {(project.techStack || []).map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: '0.75rem',
                            padding: '4px 10px',
                            backgroundColor: '#1A1A1A',
                            border: '1px solid #333333',
                            borderRadius: '999px',
                            color: '#E5E7EB',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
