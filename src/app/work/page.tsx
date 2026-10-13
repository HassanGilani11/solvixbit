import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section } from '../../components/layout';
import { Reveal, FadeUp } from '../../components/motion';
import { ArrowRight } from '../../components/icons';
import { caseStudiesData } from '../../config/work';
import { servicesData } from '../../config/services';

export const metadata: Metadata = {
  title: 'Selected Work & Engineering Case Studies',
  description:
    'Explore verified case studies and production outcomes delivered by SOLVIXBIT across FinTech, Luxury Commerce, and Healthcare.',
};

export default function WorkPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#000000' }}>
      {/* Work Hero */}
      <section
          className="sb-hero-backdrop"
          style={{
            paddingTop: 'clamp(3.5rem, 6vw, 6rem)',
            paddingBottom: 'clamp(3rem, 5vw, 5rem)',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          <Container>
            <div style={{ maxWidth: '800px' }}>
              <FadeUp delayMs={100}>
                <div style={{ display: 'inline-flex', marginBottom: '12px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '5px 12px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#000000',
                      letterSpacing: '0.06em',
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#02C415' }} />
                    PROVEN PRODUCTION OUTCOMES
                  </span>
                </div>
              </FadeUp>

              <FadeUp delayMs={200}>
                <h1
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 800,
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    color: '#000000',
                    margin: '0 0 12px 0',
                  }}
                >
                  Selected work that drives <span style={{ color: 'var(--color-primary-blue)' }}>measurable scale.</span>
                </h1>
              </FadeUp>

              <FadeUp delayMs={300}>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'clamp(1.1rem, 1.3vw, 1.25rem)',
                    lineHeight: 1.6,
                    color: '#4B5563',
                    margin: 0,
                    maxWidth: '680px',
                  }}
                >
                  Explore real-world software architecture, AI automation, and headless commerce platforms engineered by our partner squads for leading brands and venture-backed innovators.
                </p>
              </FadeUp>
            </div>
          </Container>
        </section>

        {/* Case Studies Showcase List */}
        <Section style={{ backgroundColor: '#FAFAFA' }}>
          <Container>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
              {caseStudiesData.map((study, idx) => (
                <Reveal key={study.slug} staggerIndex={(idx + 1) as any}>
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-2xl)',
                      border: '1px solid #E5E7EB',
                      padding: 'clamp(2rem, 5vw, 3.5rem)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: 'var(--space-8)',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-3)' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-family-mono)',
                            fontWeight: 700,
                            color: '#598BFF',
                            textTransform: 'uppercase',
                          }}
                        >
                          {study.industry}
                        </span>
                        <span style={{ color: '#D1D5DB' }}>•</span>
                        <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>{study.year}</span>
                      </div>

                      <h2
                        style={{
                          fontFamily: 'var(--font-family-heading)',
                          fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                          fontWeight: 800,
                          color: '#000000',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        {study.client}
                      </h2>

                      <p style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, color: '#111827', marginBottom: 'var(--space-4)' }}>
                        {study.title}
                      </p>

                      <p style={{ color: '#4B5563', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
                        {study.summary}
                      </p>

                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
                        {study.services.map((s) => (
                          <span
                            key={s}
                            style={{
                              fontSize: '0.75rem',
                              padding: '4px 10px',
                              backgroundColor: '#F3F4F6',
                              borderRadius: '4px',
                              color: '#374151',
                              fontWeight: 500,
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/work/${study.slug}`}
                        className="sb-btn sb-btn--md sb-btn--primary"
                        style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                      >
                        <span>View Architecture & Case Study</span>
                        <ArrowRight size={14} className="sb-btn__arrow" />
                      </Link>
                    </div>

                    {/* Visual Artwork & Metrics Callout Grid */}
                    <div
                      style={{
                        position: 'relative',
                        borderRadius: 'var(--radius-xl)',
                        overflow: 'hidden',
                        padding: 'var(--space-8)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 'var(--space-6)',
                        minHeight: '260px',
                        alignContent: 'center',
                        backgroundColor: '#000000',
                      }}
                    >
                      {/* Background Artwork Graphic */}
                      {study.image && (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url(${study.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'brightness(0.35) contrast(1.15)',
                          }}
                        />
                      )}

                      {/* Blueprint grid texture */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                          backgroundSize: '24px 24px',
                          opacity: 0.35,
                          pointerEvents: 'none',
                        }}
                      />

                      {/* Live System Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-family-mono)',
                          color: '#FFFFFF',
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          backdropFilter: 'blur(8px)',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          fontWeight: 600,
                          zIndex: 2,
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#02C415',
                            boxShadow: '0 0 8px #02C415',
                          }}
                        />
                        PRODUCTION TELEMETRY
                      </div>

                      {study.metrics.map((m, mIdx) => (
                        <div key={m.label} style={{ position: 'relative', zIndex: 2 }}>
                          <div
                            style={{
                              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                              fontWeight: 800,
                              fontFamily: 'var(--font-family-heading)',
                              color: mIdx === 0 ? '#598BFF' : mIdx === 1 ? '#02C415' : '#FFFFFF',
                              textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)',
                            }}
                          >
                            {m.value}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#D1D5DB', marginTop: '4px', fontWeight: 600, textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)' }}>
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
    </main>
  );
}
