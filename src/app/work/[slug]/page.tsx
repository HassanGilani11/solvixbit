import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section } from '../../../components/layout';
import { Reveal, FadeUp } from '../../../components/motion';
import { ArrowRight } from '../../../components/icons';
import { caseStudiesData } from '../../../config/work';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudiesData.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudiesData.find((s) => s.slug === slug);
  if (!study) return { title: 'Case Study Not Found' };

  const url = `https://www.solvixbit.com/work/${study.slug}`;

  return {
    title: `${study.client} Case Study: ${study.title} | SOLVIXBIT`,
    description: study.summary,
    keywords: [study.client, study.title, study.industry, ...(study.techStack || []), 'Case Study', 'SOLVIXBIT'],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${study.client} Case Study: ${study.title} | SOLVIXBIT`,
      description: study.summary,
      url,
      type: 'article',
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudiesData.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#000000' }}>
      {/* Case Study Header */}
      <section
          className="sb-hero-backdrop"
          style={{
            paddingTop: 'clamp(3.5rem, 6vw, 6rem)',
            paddingBottom: 'clamp(3rem, 5vw, 5rem)',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          <Container>
            <div style={{ maxWidth: '880px' }}>
              <FadeUp delayMs={100}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)' }}>
                  <Link
                    href="/work"
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      fontFamily: 'var(--font-family-mono)',
                      color: '#6B7280',
                      textDecoration: 'none',
                    }}
                  >
                    WORK &gt;
                  </Link>
                  <span
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      fontFamily: 'var(--font-family-mono)',
                      fontWeight: 700,
                      color: '#598BFF',
                      textTransform: 'uppercase',
                    }}
                  >
                    {study.industry} • {study.year}
                  </span>
                </div>
              </FadeUp>

              <FadeUp delayMs={200}>
                <h1
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: '#000000',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {study.headline}
                </h1>
              </FadeUp>

              <FadeUp delayMs={300}>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'clamp(1.1rem, 1.35vw, 1.25rem)',
                    lineHeight: 1.65,
                    color: '#4B5563',
                    marginBottom: 'var(--space-8)',
                  }}
                >
                  {study.summary}
                </p>

                {/* Scope Badges */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {study.services.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: '0.75rem',
                        padding: '4px 10px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '999px',
                        color: '#111827',
                        fontWeight: 600,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </FadeUp>
            </div>
          </Container>
        </section>

        {/* Architectural System Visual Showcase */}
        {study.image && (
          <section style={{ backgroundColor: '#070E1A', borderBottom: '1px solid #1E293B', padding: 'clamp(2rem, 4vw, 3.5rem) 0' }}>
            <Container>
              <Reveal>
                <div
                  style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-2xl)',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.65)',
                    aspectRatio: '21 / 9',
                    minHeight: '280px',
                    backgroundImage: `url(${study.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '24px',
                      right: '24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-family-mono)',
                        color: '#FFFFFF',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      ⌖ PRODUCTION ARCHITECTURE // {study.client.toUpperCase()}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-family-mono)',
                        color: '#02C415',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        padding: '6px 14px',
                        borderRadius: '6px',
                        border: '1px solid rgba(2, 196, 21, 0.3)',
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#02C415' }} />
                      DEPLOYED AT SCALE
                    </div>
                  </div>
                </div>
              </Reveal>
            </Container>
          </section>
        )}

        {/* Highlight Key Metrics */}
        <Section style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
          <Container>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-8)',
                textAlign: 'center',
              }}
            >
              {study.metrics.map((m, idx) => (
                <Reveal key={m.label} staggerIndex={(idx + 1) as any}>
                  <div>
                    <div
                      style={{
                        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                        fontWeight: 800,
                        fontFamily: 'var(--font-family-heading)',
                        color: idx === 0 ? '#598BFF' : idx === 1 ? '#02C415' : '#FFFFFF',
                      }}
                    >
                      {m.value}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: '#9CA3AF', marginTop: '6px', fontWeight: 500 }}>
                      {m.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Challenge vs Solution */}
        <Section style={{ backgroundColor: '#FFFFFF' }}>
          <Container>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'var(--space-12)',
              }}
            >
              <Reveal>
                <div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', fontWeight: 700, color: '#EF4444' }}>
                    01 • THE CHALLENGE
                  </span>
                  <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                    System bottlenecks & technical limits
                  </h2>
                  <p style={{ color: '#4B5563', lineHeight: 1.7, fontSize: 'var(--font-size-base)' }}>
                    {study.challenge}
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', fontWeight: 700, color: '#02C415' }}>
                    02 • THE SOLUTION
                  </span>
                  <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, marginTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                    Bespoke architecture & deployment
                  </h2>
                  <p style={{ color: '#4B5563', lineHeight: 1.7, fontSize: 'var(--font-size-base)' }}>
                    {study.solution}
                  </p>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* Architectural Highlights */}
        <Section style={{ backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E7EB' }}>
          <Container>
            <div style={{ maxWidth: '640px', marginBottom: 'var(--space-12)' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)', color: '#598BFF', textTransform: 'uppercase' }}>
                TECHNICAL ARCHITECTURE & SPECIFICATION
              </span>
              <h2 style={{ fontFamily: 'var(--font-family-heading)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, marginTop: 'var(--space-2)' }}>
                How the system was engineered
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
              {study.architectureDetails.map((detail, idx) => (
                <Reveal key={detail} staggerIndex={(idx + 1) as any}>
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-6)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', color: '#598BFF', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                      MODULE {String(idx + 1).padStart(2, '0')}
                    </div>
                    <p style={{ color: '#374151', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                      {detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Verified Client Testimonial */}
        {study.testimonial && (
          <Section style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
            <Container>
              <Reveal>
                <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', color: '#598BFF', lineHeight: 1, marginBottom: 'var(--space-4)' }}>“</div>
                  <blockquote
                    style={{
                      fontFamily: 'var(--font-family-heading)',
                      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                      fontWeight: 600,
                      lineHeight: 1.5,
                      color: '#FFFFFF',
                      margin: '0 0 var(--space-8) 0',
                    }}
                  >
                    {study.testimonial.quote}
                  </blockquote>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
                      {study.testimonial.author}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#9CA3AF', marginTop: '2px' }}>
                      {study.testimonial.role}, {study.testimonial.company}
                    </div>
                  </div>
                </div>
              </Reveal>
            </Container>
          </Section>
        )}

        {/* Closing Next Project CTA */}
        <Section style={{ backgroundColor: '#FFFFFF', textAlign: 'center' }}>
          <Container>
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
              <h2 style={{ fontFamily: 'var(--font-family-heading)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>
                Have a similar challenge?
              </h2>
              <p style={{ color: '#4B5563', lineHeight: 1.6, marginBottom: 'var(--space-8)' }}>
                Let’s schedule an initial architecture deep-dive with our senior partners.
              </p>
              <Link href="/start-a-project" className="sb-btn sb-btn--lg sb-btn--primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span>Start a Project Consultation</span>
                <ArrowRight size={16} className="sb-btn__arrow" />
              </Link>
            </div>
          </Container>
        </Section>
    </main>
  );
}
