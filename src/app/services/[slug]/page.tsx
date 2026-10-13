import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar, Footer } from '../../../components/navigation';
import { Container, Section } from '../../../components/layout';
import { Reveal, FadeUp } from '../../../components/motion';
import { ArrowRight } from '../../../components/icons';
import { servicesData } from '../../../config/services';
import { caseStudiesData } from '../../../config/work';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} | SOLVIXBIT Engineering`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedCaseStudy = service.featuredCaseStudySlug
    ? caseStudiesData.find((c) => c.slug === service.featuredCaseStudySlug)
    : null;

  const navItems = [
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#000000' }}>
      {/* Service Hero */}
      <section
          className="sb-hero-backdrop"
          style={{
            paddingTop: 'clamp(3.5rem, 6vw, 6rem)',
            paddingBottom: 'clamp(3rem, 5vw, 5rem)',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          <Container>
            <div style={{ maxWidth: '840px' }}>
              <FadeUp delayMs={100}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)' }}>
                  <a
                    href="/services"
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      fontFamily: 'var(--font-family-mono)',
                      color: '#6B7280',
                      textDecoration: 'none',
                    }}
                  >
                    SERVICES &gt;
                  </a>
                  <span
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      fontFamily: 'var(--font-family-mono)',
                      fontWeight: 700,
                      color: '#598BFF',
                    }}
                  >
                    {service.kicker}
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
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  {service.headline}
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
                  {service.fullDescription}
                </p>

                <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                  <a href="/contact" className="sb-btn sb-btn--lg sb-btn--primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span>Book Architecture Consultation</span>
                    <ArrowRight size={16} className="sb-btn__arrow" />
                  </a>
                  <a href="/work" className="sb-btn sb-btn--lg sb-btn--secondary" style={{ textDecoration: 'none' }}>
                    View Client Case Studies
                  </a>
                </div>
              </FadeUp>
            </div>
          </Container>
        </section>

        {/* Commercial ROI & Key Benefits */}
        <Section style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
          <Container>
            <Reveal>
              <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto var(--space-12) auto' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)', color: '#02C415', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  MEASURABLE ROI & BUSINESS IMPACT
                </span>
                <h2 style={{ fontFamily: 'var(--font-family-heading)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, marginTop: 'var(--space-2)' }}>
                  Engineered for tangible commercial advantage
                </h2>
              </div>
            </Reveal>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--space-8)',
              }}
            >
              {service.benefits.map((benefit, idx) => (
                <Reveal key={benefit.title} staggerIndex={(idx + 1) as any}>
                  <div
                    style={{
                      backgroundColor: '#111111',
                      border: '1px solid #222222',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-6)',
                      height: '100%',
                    }}
                  >
                    {benefit.metric && (
                      <div
                        style={{
                          fontSize: '2rem',
                          fontWeight: 800,
                          fontFamily: 'var(--font-family-mono)',
                          color: '#598BFF',
                          marginBottom: 'var(--space-3)',
                        }}
                      >
                        {benefit.metric}
                      </div>
                    )}
                    <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, color: '#FFFFFF', marginBottom: 'var(--space-2)' }}>
                      {benefit.title}
                    </h3>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: '#9CA3AF', lineHeight: 1.6, margin: 0 }}>
                      {benefit.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Detailed Capabilities Matrix */}
        <Section style={{ backgroundColor: '#FFFFFF' }}>
          <Container>
            <div style={{ maxWidth: '640px', marginBottom: 'var(--space-12)' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)', color: '#598BFF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                TECHNICAL SCOPE & DELIVERABLES
              </span>
              <h2 style={{ fontFamily: 'var(--font-family-heading)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, marginTop: 'var(--space-2)' }}>
                Core Capabilities & Architecture
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'var(--space-6)',
              }}
            >
              {service.capabilities.map((cap, idx) => (
                <Reveal key={cap.title} staggerIndex={(idx + 1) as any}>
                  <div
                    style={{
                      backgroundColor: '#FAFAFA',
                      border: '1px solid #E5E7EB',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-6)',
                      height: '100%',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-family-mono)',
                        color: '#4B5563',
                        backgroundColor: '#E5E7EB',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontWeight: 600,
                        display: 'inline-block',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      {cap.tag}
                    </span>
                    <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: '#000000', marginBottom: 'var(--space-2)' }}>
                      {cap.title}
                    </h3>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                      {cap.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Featured Case Study Anchor */}
        {relatedCaseStudy && (
          <Section style={{ backgroundColor: '#F3F4F6', borderTop: '1px solid #E5E7EB' }}>
            <Container>
              <Reveal>
                <div
                  style={{
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'clamp(2rem, 5vw, 4rem)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'var(--space-8)',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)', color: '#02C415' }}>
                      FEATURED CASE STUDY • {relatedCaseStudy.industry.toUpperCase()}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-family-heading)',
                        fontSize: 'var(--font-size-2xl)',
                        fontWeight: 700,
                        marginTop: 'var(--space-3)',
                        marginBottom: 'var(--space-4)',
                      }}
                    >
                      {relatedCaseStudy.client}: {relatedCaseStudy.title}
                    </h3>
                    <p style={{ color: '#D1D5DB', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
                      {relatedCaseStudy.summary}
                    </p>
                    <a
                      href={`/work/${relatedCaseStudy.slug}`}
                      className="sb-btn sb-btn--md sb-btn--white"
                      style={{
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span>Read Full Architecture Case Study</span>
                      <ArrowRight size={14} className="sb-btn__arrow" />
                    </a>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
                    {relatedCaseStudy.metrics.map((m) => (
                      <div
                        key={m.label}
                        style={{
                          backgroundColor: '#111111',
                          border: '1px solid #222222',
                          borderRadius: 'var(--radius-md)',
                          padding: 'var(--space-4)',
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#598BFF' }}>{m.value}</div>
                        <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </Container>
          </Section>
        )}

        {/* Closing CTA */}
        <Section style={{ backgroundColor: '#FFFFFF', textAlign: 'center' }}>
          <Container>
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 800,
                  color: '#000000',
                  marginBottom: 'var(--space-4)',
                }}
              >
                Ready to engineer your {service.title}?
              </h2>
              <p style={{ color: '#4B5563', lineHeight: 1.6, marginBottom: 'var(--space-8)' }}>
                Let’s analyze your current architecture and deliver a concrete implementation plan.
              </p>
              <a href={`/start-a-project?service=${service.slug}`} className="sb-btn sb-btn--lg sb-btn--primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span>Start a Project Consultation</span>
                <ArrowRight size={16} className="sb-btn__arrow" />
              </a>
            </div>
          </Container>
        </Section>
    </main>
  );
}
