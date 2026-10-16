import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section } from '../../components/layout';
import { Reveal, FadeUp } from '../../components/motion';
import { ArrowRight } from '../../components/icons';
import { teamMembers, companyValues } from '../../config/about';
import { servicesData } from '../../config/services';

export const metadata: Metadata = {
  title: 'About Us & Engineering Philosophy | SOLVIXBIT',
  description:
    'Learn about SOLVIXBIT: A creative technology and software engineering partner helping businesses design, build, automate, and scale digital products.',
  keywords: [
    'About SOLVIXBIT',
    'Software Engineering Firm',
    'Engineering Philosophy',
    'Technology Consulting Leadership',
    'Custom Software Company',
  ],
  alternates: {
    canonical: 'https://www.solvixbit.com/about',
  },
  openGraph: {
    title: 'About Us & Engineering Philosophy | SOLVIXBIT',
    description:
      'Learn about SOLVIXBIT: A creative technology and software engineering partner helping businesses design, build, automate, and scale digital products.',
    url: 'https://www.solvixbit.com/about',
  },
};

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#000000' }}>
      {/* About Hero */}
      <section
          className="sb-hero-backdrop"
          style={{
            paddingTop: 'clamp(3.5rem, 6vw, 6rem)',
            paddingBottom: 'clamp(3rem, 5vw, 5rem)',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          <Container>
            <div style={{ maxWidth: '820px' }}>
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
                    THE SOLVIXBIT PRINCIPLE
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
                  Technology that <span style={{ color: 'var(--color-primary-blue)' }}>solves.</span>
                </h1>
              </FadeUp>

              <FadeUp delayMs={300}>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'clamp(1.1rem, 1.3vw, 1.25rem)',
                    lineHeight: 1.6,
                    color: '#374151',
                    margin: 0,
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  SOLVIXBIT was founded on a simple conviction: modern businesses do not need more bloated agencies or theoretical consultants. They need veteran engineering partners who take direct ownership of outcomes.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: 1.65,
                    color: '#6B7280',
                    margin: 0,
                  }}
                >
                  We combine deep software engineering capability with bespoke digital visual craft to build software, AI workflows, and commerce systems that scale effortlessly.
                </p>
              </FadeUp>
            </div>
          </Container>
        </section>

        {/* Company Operating Values */}
        <Section style={{ backgroundColor: '#FAFAFA' }}>
          <Container>
            <div style={{ maxWidth: '640px', marginBottom: 'var(--space-12)' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)', color: '#598BFF', textTransform: 'uppercase' }}>
                HOW WE OPERATE
              </span>
              <h2 style={{ fontFamily: 'var(--font-family-heading)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, marginTop: 'var(--space-2)' }}>
                Our Core Principles
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-8)' }}>
              {companyValues.map((val, idx) => (
                <Reveal key={val.number} staggerIndex={(idx + 1) as any}>
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-xl)',
                      border: '1px solid #E5E7EB',
                      padding: 'var(--space-8)',
                      height: '100%',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-family-mono)',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: '#598BFF',
                        marginBottom: 'var(--space-4)',
                      }}
                    >
                      {val.number}
                    </div>
                    <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: '#000000', marginBottom: 'var(--space-3)' }}>
                      {val.title}
                    </h3>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: '#4B5563', lineHeight: 1.65, margin: 0 }}>
                      {val.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Leadership & Partner Team */}
        <Section style={{ backgroundColor: '#FFFFFF' }}>
          <Container>
            <div style={{ maxWidth: '640px', marginBottom: 'var(--space-12)' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)', color: '#02C415', textTransform: 'uppercase' }}>
                SENIOR LEADERSHIP
              </span>
              <h2 style={{ fontFamily: 'var(--font-family-heading)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, marginTop: 'var(--space-2)' }}>
                The Partners Behind Every Project
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-8)' }}>
              {teamMembers.map((member, idx) => (
                <Reveal key={member.name} staggerIndex={(idx + 1) as any}>
                  <div
                    style={{
                      backgroundColor: '#FAFAFA',
                      borderRadius: 'var(--radius-xl)',
                      border: '1px solid #E5E7EB',
                      padding: 'var(--space-8)',
                      height: '100%',
                    }}
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: member.avatarColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '1.25rem',
                        marginBottom: 'var(--space-4)',
                      }}
                    >
                      {member.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: '#000000', marginBottom: '4px' }}>
                      {member.name}
                    </h3>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#598BFF', marginBottom: 'var(--space-4)' }}>
                      {member.role}
                    </div>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: '#4B5563', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                      {member.bio}
                    </p>
                    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', color: '#6B7280', borderTop: '1px solid #E5E7EB', paddingTop: 'var(--space-3)' }}>
                      FOCUS: {member.specialty}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Closing CTA */}
        <Section style={{ backgroundColor: '#000000', color: '#FFFFFF', textAlign: 'center' }}>
          <Container>
            <div style={{ maxWidth: '640px', margin: '0 auto' }}>
              <h2 style={{ fontFamily: 'var(--font-family-heading)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>
                Have something ambitious to build?
              </h2>
              <p style={{ color: '#9CA3AF', lineHeight: 1.6, marginBottom: 'var(--space-8)' }}>
                Let’s collaborate to turn your next challenge into a high-performance reality.
              </p>
              <a
                href="/start-a-project"
                className="sb-btn sb-btn--lg sb-btn--on-dark"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>Start a Project Consultation</span>
                <ArrowRight size={16} className="sb-btn__arrow" />
              </a>
            </div>
          </Container>
        </Section>
    </main>
  );
}
