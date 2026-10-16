import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SOLUTIONS } from '@/config/solutions';
import { ArrowRight, ArrowUpRight, CheckIcon } from '@/components/icons';
import { Container } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Business Technology Solutions | SOLVIXBIT',
  description:
    'Outcome-driven technology solutions engineered around real business challenges: enterprise modernization, AI automation, product acceleration, headless commerce, and cloud reliability.',
  keywords: [
    'Business Technology Solutions',
    'Enterprise Modernization',
    'AI Process Automation',
    'Startup MVP Development',
    'Headless Global Commerce',
    'Cloud Reliability Engineering',
  ],
  alternates: {
    canonical: 'https://www.solvixbit.com/solutions',
  },
  openGraph: {
    title: 'Business Technology Solutions | SOLVIXBIT',
    description:
      'Outcome-driven technology solutions engineered around real business challenges: enterprise modernization, AI automation, product acceleration, headless commerce, and cloud reliability.',
    url: 'https://www.solvixbit.com/solutions',
  },
};

export default function SolutionsOverviewPage() {
  const featuredSolutions = SOLUTIONS.filter(s => s.featured || ['operational-automation', 'startup-mvp', 'enterprise-scale', 'high-conversion-commerce'].includes(s.slug));

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* Hero Section */}
      <section style={{ padding: 'clamp(3.5rem, 6vw, 5.5rem) 0 60px', borderBottom: '1px solid #EFEFEF', backgroundColor: '#FAFAFA' }}>
        <Container>
          <div style={{ textAlign: 'center' }}>
          <span className="sb-badge" style={{ marginBottom: '20px' }}>
            BUSINESS SOLUTIONS
          </span>
          <h1 style={{
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#000000',
            lineHeight: 1.15,
            maxWidth: '900px',
            margin: '0 auto 24px',
          }}>
            Technology built around your business challenges.
          </h1>
          <p style={{
            fontSize: 'clamp(17px, 2vw, 20px)',
            color: '#4B5563',
            lineHeight: 1.6,
            maxWidth: '740px',
            margin: '0 auto 36px',
          }}>
            From modernizing critical systems to launching digital products and automating operations, we design practical technology solutions around the outcomes your business needs.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/start-a-project" className="sb-btn sb-btn--primary">
              Discuss Your Project
              <ArrowRight size={18} />
            </Link>
            <a href="#all-solutions" className="sb-btn sb-btn--secondary">
              Explore Solutions
            </a>
          </div>
          </div>
        </Container>
      </section>

      {/* Featured Strategic Solutions */}
      <section style={{ padding: '80px 0' }}>
        <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#598BFF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Core Focus Areas
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#000000', letterSpacing: '-0.02em', marginTop: '6px' }}>
              Featured Solution Frameworks
            </h2>
          </div>
          <p style={{ color: '#6B7280', fontSize: '16px', maxWidth: '440px', margin: 0 }}>
            Proven engineering strategies designed to de-risk high-stakes initiatives and accelerate delivery.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '32px' }}>
          {featuredSolutions.slice(0, 4).map((solution) => (
            <div
              key={solution.slug}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '16px',
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backgroundColor: 'rgba(89, 139, 255, 0.1)',
                    color: '#1D4ED8',
                    padding: '4px 10px',
                    borderRadius: '6px',
                  }}>
                    {solution.category}
                  </span>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    aria-label={`View ${solution.title}`}
                    style={{ color: '#9CA3AF' }}
                  >
                    <ArrowUpRight size={22} />
                  </Link>
                </div>

                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '12px', letterSpacing: '-0.01em' }}>
                  <Link href={`/solutions/${solution.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {solution.title}
                  </Link>
                </h3>

                <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.6, marginBottom: '24px' }}>
                  {solution.summary}
                </p>

                <div style={{ marginBottom: '28px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>
                    Key Outcomes:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {solution.outcomes?.slice(0, 3).map((outcome, idx) => {
                      const text = typeof outcome === 'string' ? outcome : (outcome.description || outcome.label || '');
                      return (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: '#4B5563' }}>
                          <span style={{ color: '#02C415', marginTop: '2px', flexShrink: 0 }}>
                            <CheckIcon size={14} color="#02C415" />
                          </span>
                          <span>{text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #F3F4F6' }}>
                <Link href={`/solutions/${solution.slug}`} className="sb-btn sb-btn--secondary" style={{ flex: 1, textAlign: 'center', fontSize: '14px', padding: '10px 16px', minHeight: '40px' }}>
                  Learn More
                </Link>
                <Link
                  href={`/start-a-project?solution=${solution.slug}`}
                  className="sb-btn sb-btn--primary"
                  style={{ flex: 1, textAlign: 'center', fontSize: '14px', padding: '10px 16px', minHeight: '40px' }}
                >
                  Discuss
                </Link>
              </div>
            </div>
          ))}
        </div>
        </Container>
      </section>

      {/* Complete Solutions Grid */}
      <section id="all-solutions" style={{ padding: '80px 0', backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E7EB' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="sb-badge" style={{ marginBottom: '16px' }}>
              COMPLETE CATALOG
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#000000', letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Explore All 10 Solutions
            </h2>
            <p style={{ color: '#6B7280', fontSize: '17px', maxWidth: '640px', margin: '0 auto' }}>
              Comprehensive engineering and architectural consulting mapped to the distinct stages of your technical evolution.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '24px' }}>
            {SOLUTIONS.map((solution, idx) => {
              const problemDesc = solution.problemStatement || solution.problem || '';
              return (
                <div
                  key={solution.slug}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '14px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '13px', color: '#9CA3AF' }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563', backgroundColor: '#F3F4F6', padding: '3px 8px', borderRadius: '4px' }}>
                        {solution.category}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                      <Link href={`/solutions/${solution.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {solution.title}
                      </Link>
                    </h3>

                    <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.55, marginBottom: '20px' }}>
                      {solution.summary}
                    </p>

                    {problemDesc && (
                      <div style={{ fontSize: '13px', color: '#374151', marginBottom: '20px' }}>
                        <strong>Addresses:</strong> {problemDesc.length > 110 ? `${problemDesc.substring(0, 110)}...` : problemDesc}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
                    <Link
                      href={`/solutions/${solution.slug}`}
                      style={{ fontSize: '14px', fontWeight: 600, color: '#598BFF', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                    >
                      View Scope & Approach →
                    </Link>
                    <Link
                      href={`/start-a-project?solution=${solution.slug}`}
                      style={{ fontSize: '13px', fontWeight: 600, color: '#4B5563', textDecoration: 'underline' }}
                    >
                      Discuss
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Consultation Banner CTA */}
      <section style={{ padding: '80px 0', backgroundColor: '#000000', color: '#FFFFFF' }}>
        <Container>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: '#02C415', fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            ENGINEERED FOR MEASURABLE IMPACT
          </span>
          <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '20px', color: '#FFFFFF' }}>
            Not sure which solution fits your current roadmap?
          </h2>
          <p style={{ fontSize: '18px', color: '#9CA3AF', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto 36px' }}>
            Schedule a technical discovery call with a principal engineer to review your requirements, evaluate architecture options, and identify the most pragmatic path forward.
          </p>
          <Link href="/start-a-project" className="sb-btn sb-btn--lg sb-btn--on-dark">
            Start a Project Consultation
            <ArrowRight size={18} />
          </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
