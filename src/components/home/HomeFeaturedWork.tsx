'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { ArrowRight } from '../icons';
import { caseStudiesData } from '../../config/work';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';

initGSAP();

// Map project slugs directly to verified high-res assets in public/images/case-studies/
const CASE_STUDY_IMAGES: Record<string, string> = {
  'fintech-payment-engine': '/images/case-studies/fintech-payment-engine.jpg',
  'ecommerce-headless-scale': '/images/case-studies/ecommerce-headless-scale.jpg',
  'enterprise-ai-copilot': '/images/case-studies/enterprise-ai-copilot.jpg',
};

const CASE_STUDY_PREVIEWS: Record<string, { endpoint: string; badge: string }> = {
  'fintech-payment-engine': { endpoint: 'stratapay.example/api/v2/settlement', badge: 'FINTECH LEDGER // CONCEPT' },
  'ecommerce-headless-scale': { endpoint: 'aura-atelier.example/configurator', badge: 'HEADLESS 3D // CONCEPT' },
  'enterprise-ai-copilot': { endpoint: 'nexus-health.example/workspace', badge: 'PRIVATE RAG // CONCEPT' },
};

export const HomeFeaturedWork: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      const section = sectionRef.current;
      if (!section) return;

      // Header reveal
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

      const mm = gsap.matchMedia();

      // Desktop: Rich motion storytelling with subtle parallax and metrics stagger
      mm.add('(min-width: 1024px)', () => {
        const panels = section.querySelectorAll('.sb-featured-project-panel');
        panels.forEach((panel) => {
          gsap.fromTo(
            panel,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: ANIMATION_CONFIG.ease.brand,
              clearProps: 'opacity,transform',
              scrollTrigger: {
                trigger: panel,
                start: 'top 85%',
                once: true,
              },
            }
          );

          const metrics = panel.querySelectorAll('.sb-project-metric-card');
          if (metrics.length > 0) {
            gsap.fromTo(
              metrics,
              { y: 16, opacity: 0, scale: 0.96 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.55,
                stagger: 0.08,
                ease: ANIMATION_CONFIG.ease.brand,
                clearProps: 'opacity,transform,scale',
                scrollTrigger: {
                  trigger: panel,
                  start: 'top 78%',
                  once: true,
                },
              }
            );
          }

          // Subtle parallax on project image inside its clipped frame
          const img = panel.querySelector('.sb-project-img');
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -3 },
              {
                yPercent: 3,
                ease: 'none',
                scrollTrigger: {
                  trigger: panel,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.8,
                },
              }
            );
          }
        });
      });

      // Mobile/Tablet: Lightweight reveal without continuous parallax
      mm.add('(max-width: 1023px)', () => {
        const panels = section.querySelectorAll('.sb-featured-project-panel');
        panels.forEach((panel) => {
          gsap.fromTo(
            panel,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
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
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        backgroundColor: '#FAFAFA',
        borderBottom: '1px solid #E5E7EB',
        paddingTop: 'clamp(4.5rem, 8vw, 7.5rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 7.5rem)',
        position: 'relative',
        overflow: 'hidden',
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
          <div style={{ maxWidth: '700px' }}>
            <div style={{ display: 'inline-flex', marginBottom: '14px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-family-mono)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary-blue)' }} />
                05 // FEATURED CASE HIGHLIGHTS
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(2rem, 3.8vw, 3.25rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: '#000000',
                margin: '0 0 14px 0',
              }}
            >
              Proven commercial impact, engineered to endure.
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                lineHeight: 1.6,
                color: '#4B5563',
                margin: 0,
              }}
            >
              A selection of illustrative architecture case studies and digital system concepts engineered to rigorous standards.
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

        {/* Large Format Visual Project Panels */}
        <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 5vw, 4rem)' }}>
          {caseStudiesData.map((project, index) => {
            const isEven = index % 2 === 1;
            const imgSrc = CASE_STUDY_IMAGES[project.slug] || '/images/case-studies/fintech-payment-engine.jpg';
            const meta = CASE_STUDY_PREVIEWS[project.slug] || { endpoint: 'api.solvixbit.com/work', badge: 'PRODUCTION VERIFIED' };

            return (
              <div
                key={project.slug}
                className="sb-featured-project-panel"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'clamp(1.75rem, 3.5vw, 3.25rem)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
                  gap: 'clamp(2rem, 4.5vw, 3.75rem)',
                  alignItems: 'center',
                  boxShadow: '0 16px 40px -12px rgba(0, 0, 0, 0.05), 0 0 1px 1px rgba(0, 0, 0, 0.02)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* 1. Narrative & Quantifiable Metrics Side */}
                <div style={{ order: isEven ? 2 : 1 }}>
                  {/* Meta Strip */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-family-mono)',
                        fontSize: '0.9rem',
                        fontWeight: 800,
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
                        fontWeight: 700,
                        color: '#6B7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {project.client} • ILLUSTRATIVE CASE STUDY
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-family-heading)',
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                      fontWeight: 800,
                      lineHeight: 1.2,
                      letterSpacing: '-0.025em',
                      color: '#000000',
                      marginBottom: '16px',
                    }}
                  >
                    <Link
                      href={`/work/${project.slug}`}
                      style={{
                        textDecoration: 'none',
                        color: '#000000',
                        transition: 'color 180ms ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#598BFF')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#000000')}
                    >
                      {project.title}
                    </Link>
                  </h3>

                  {/* Narrative Summary */}
                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#4B5563',
                      lineHeight: 1.65,
                      marginBottom: '26px',
                    }}
                  >
                    {project.summary}
                  </p>

                  {/* Illustrative Architecture Metrics Strip */}
                  <div
                    style={{
                      backgroundColor: '#F9FAFB',
                      padding: '14px 18px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid #E5E7EB',
                      marginBottom: '26px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.62rem',
                        fontFamily: 'var(--font-family-mono)',
                        fontWeight: 700,
                        color: '#6B7280',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        marginBottom: '10px',
                      }}
                    >
                      ILLUSTRATIVE TARGET BENCHMARKS
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '12px',
                      }}
                    >
                      {project.metrics.map((m) => (
                        <div key={m.label} className="sb-project-metric-card">
                          <div
                            style={{
                              fontFamily: 'var(--font-family-heading)',
                              fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
                              fontWeight: 800,
                              color: 'var(--color-primary-blue)',
                              lineHeight: 1.1,
                            }}
                          >
                            {m.value}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#6B7280', marginTop: '3px', fontWeight: 600 }}>
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Technologies Badges */}
                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-family-mono)', color: '#9CA3AF', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      ARCHITECTURE STACK:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {(project.techStack || []).slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: '0.75rem',
                            color: '#374151',
                            backgroundColor: '#F3F4F6',
                            border: '1px solid #E5E7EB',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontFamily: 'var(--font-family-mono)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <Link
                    href={`/work/${project.slug}`}
                    className="sb-btn sb-btn--md sb-btn--primary"
                    style={{ textDecoration: 'none', width: 'fit-content' }}
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight size={14} className="sb-btn__arrow" />
                  </Link>
                </div>

                {/* 2. High-Resolution Visual Deliverable Side (Actual Project Asset) */}
                <div
                  style={{
                    order: isEven ? 1 : 2,
                    position: 'relative',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid #E2E8F0',
                    backgroundColor: '#0F172A',
                    boxShadow: '0 20px 48px -12px rgba(0, 0, 0, 0.18)',
                  }}
                >
                  {/* Architectural Browser Window Header */}
                  <div
                    style={{
                      backgroundColor: '#0F172A',
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #1E293B',
                      zIndex: 2,
                      position: 'relative',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                      <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                    </div>

                    <div
                      style={{
                        backgroundColor: '#1E293B',
                        padding: '3px 12px',
                        borderRadius: '4px',
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-family-mono)',
                        color: '#94A3B8',
                        letterSpacing: '0.02em',
                        maxWidth: '220px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {meta.endpoint}
                    </div>

                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontFamily: 'var(--font-family-mono)',
                        color: '#10B981',
                        fontWeight: 700,
                      }}
                    >
                      ● 200 OK
                    </span>
                  </div>

                  {/* Main High-Resolution Preview Image with Hover Scale */}
                  <Link
                    href={`/work/${project.slug}`}
                    style={{ display: 'block', position: 'relative', textDecoration: 'none', overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16 / 10',
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={imgSrc}
                        alt={`${project.client} - ${project.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        style={{
                          objectFit: 'cover',
                          transition: 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        className="sb-project-img"
                      />

                      {/* Subtle Vignette Gradient Overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.05) 50%, rgba(15, 23, 42, 0) 100%)',
                          pointerEvents: 'none',
                        }}
                      />

                      {/* Floating Glassmorphic Portfolio Information Overlay */}
                      <div
                        className="sb-glass-overlay"
                        style={{
                          position: 'absolute',
                          bottom: '16px',
                          left: '16px',
                          right: '16px',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-family-mono)',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px',
                          zIndex: 2,
                        }}
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-secondary-green)', boxShadow: '0 0 8px #02C415' }} />
                          <span>{meta.badge}</span>
                        </span>
                        <span style={{ color: '#93C5FD', fontSize: '0.68rem' }}>
                          {project.year} • {project.industry.split('&')[0].trim()}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
