import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { servicesData } from '../../config/services';
import { ArrowRight, CheckIcon, ArrowUpRight } from '../../components/icons';
import { TechnologyMatrix } from '../../components/home/TechnologyMatrix';

export const metadata: Metadata = {
  title: 'Engineering Services | SOLVIXBIT',
  description:
    'Comprehensive software engineering, autonomous AI workflows, SaaS product architecture, headless ecommerce, API integration, and resilient cloud systems built to enterprise standards.',
  openGraph: {
    title: 'Engineering Services | SOLVIXBIT',
    description:
      'Explore SOLVIXBIT core engineering capabilities designed for scale, durability, and business impact.',
    url: 'https://solvixbit.com/services',
  },
};

export default function ServicesPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* 1. SERVICES HERO */}
      <section
        style={{
          padding: '80px 24px 64px',
          backgroundColor: '#FAFAFA',
          borderBottom: '1px solid #EFEFEF',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
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
                color: '#111827',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary-blue)' }} />
              ENGINEERING CAPABILITIES
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(36px, 5.5vw, 60px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#000000',
              lineHeight: 1.15,
              maxWidth: '900px',
              margin: '0 auto 12px',
            }}
          >
            Specialized engineering services built with <span style={{ color: '#598BFF' }}>uncompromising standards.</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(17px, 2vw, 20px)',
              color: '#4B5563',
              lineHeight: 1.6,
              maxWidth: '740px',
              margin: '0 auto 24px',
            }}
          >
            We design and engineer bespoke software systems, autonomous AI pipelines, and resilient cloud platforms that eliminate technical debt and accelerate commercial scale.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/start-a-project" className="sb-btn sb-btn--primary">
              Discuss Your Project
              <ArrowRight size={18} />
            </Link>
            <a href="#services-matrix" className="sb-btn sb-btn--secondary">
              Browse All 9 Services
            </a>
          </div>

          {/* Trust Metrics Strip */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 'clamp(20px, 4vw, 48px)',
              marginTop: '56px',
              paddingTop: '32px',
              borderTop: '1px solid #E5E7EB',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#000000' }}>99.99%</div>
              <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}>Architecture SLA</div>
            </div>
            <div style={{ width: '1px', height: '32px', backgroundColor: '#E5E7EB' }} />
            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#598BFF' }}>Zero-Debt</div>
              <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}>Modular Foundations</div>
            </div>
            <div style={{ width: '1px', height: '32px', backgroundColor: '#E5E7EB' }} />
            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#02C415' }}>SOC 2 Ready</div>
              <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}>Security Compliance</div>
            </div>
            <div style={{ width: '1px', height: '32px', backgroundColor: '#E5E7EB' }} />
            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#000000' }}>Direct Senior</div>
              <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}>Partner Engineering</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES CATALOG GRID */}
      <section id="services-matrix" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#598BFF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              PRACTICE AREAS
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#000000', letterSpacing: '-0.02em', marginTop: '6px' }}>
              8 Core Engineering Practices
            </h2>
          </div>
          <p style={{ color: '#6B7280', fontSize: '16px', maxWidth: '460px', margin: 0 }}>
            Every discipline is led by senior full-stack architects with direct accountability for production delivery.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '32px' }}>
          {servicesData.map((service, index) => (
            <div
              key={service.slug}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '16px',
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
              }}
              className="sb-service-card-hover"
            >
              <div>
                {/* Header info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '28px' }}>{service.icon}</span>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      fontFamily: 'monospace',
                      color: '#598BFF',
                      backgroundColor: 'rgba(89, 139, 255, 0.08)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                    }}>
                      0{index + 1} // {service.kicker}
                    </span>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    aria-label={`View ${service.title}`}
                    style={{ color: '#9CA3AF' }}
                  >
                    <ArrowUpRight size={22} />
                  </Link>
                </div>

                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', marginBottom: '12px', letterSpacing: '-0.01em' }}>
                  <Link href={`/services/${service.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {service.title}
                  </Link>
                </h3>

                <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.6, marginBottom: '24px' }}>
                  {service.shortDescription}
                </p>

                {/* Key Deliverables */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                    Core Deliverables
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {service.deliverables.slice(0, 3).map((item, dIdx) => (
                      <li key={dIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: '#374151' }}>
                        <span style={{ color: '#02C415', marginTop: '2px', flexShrink: 0 }}>
                          <CheckIcon size={14} color="#02C415" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
                  {service.techStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: '12px',
                        padding: '4px 10px',
                        backgroundColor: '#F3F4F6',
                        borderRadius: '6px',
                        color: '#374151',
                        fontWeight: 600,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #F3F4F6' }}>
                <Link
                  href={`/services/${service.slug}`}
                  className="sb-btn sb-btn--secondary"
                  style={{ flex: 1, textAlign: 'center', fontSize: '14px', padding: '10px 16px', minHeight: '40px' }}
                >
                  View Scope &amp; ROI
                </Link>
                <Link
                  href={`/start-a-project?service=${service.slug}`}
                  className="sb-btn sb-btn--primary"
                  style={{ flex: 1, textAlign: 'center', fontSize: '14px', padding: '10px 16px', minHeight: '40px' }}
                >
                  Start Project
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2.5 COMPREHENSIVE TECHNOLOGY ARCHITECTURE MATRIX */}
      <TechnologyMatrix />

      {/* 3. ENGINEERING STANDARDS */}
      <section style={{ padding: '80px 24px', backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="sb-badge" style={{ marginBottom: '16px' }}>
              HOW WE DELIVER
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#000000', letterSpacing: '-0.02em', marginBottom: '16px' }}>
              The SOLVIXBIT Engineering Standard
            </h2>
            <p style={{ color: '#6B7280', fontSize: '17px', maxWidth: '640px', margin: '0 auto' }}>
              A disciplined, transparent delivery framework engineered to eliminate surprises and de-risk high-stakes initiatives.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '28px 24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#598BFF', letterSpacing: '0.1em', marginBottom: '8px' }}>
                PHASE 01
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                Technical Discovery
              </h3>
              <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                Audit legacy systems, define strict API contracts, map data models, and establish quantifiable ROI benchmarks before coding.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '28px 24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#598BFF', letterSpacing: '0.1em', marginBottom: '8px' }}>
                PHASE 02
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                Architecture &amp; Proof-of-Concept
              </h3>
              <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                Build rapid clickable prototypes and isolated microservice spikes to validate throughput, edge cases, and user flow.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '28px 24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#598BFF', letterSpacing: '0.1em', marginBottom: '8px' }}>
                PHASE 03
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                Iterative Production Build
              </h3>
              <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                Bi-weekly sprint releases with continuous CI/CD automated test suites, staging environments, and transparent progress reports.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '28px 24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#598BFF', letterSpacing: '0.1em', marginBottom: '8px' }}>
                PHASE 04
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                Zero-Downtime Launch &amp; SLA
              </h3>
              <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                Canary cutovers, telemetry monitoring (Datadog/Sentry), full IP handover, and ongoing high-availability engineering support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM CONSULTATION BANNER */}
      <section style={{ padding: '80px 24px', backgroundColor: '#000000', color: '#FFFFFF', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#02C415', fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            ENGINEERED TO SOLVE
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Ready to engineer your next platform?
          </h2>
          <p style={{ fontSize: '18px', color: '#9CA3AF', lineHeight: 1.6, marginBottom: '36px' }}>
            Start a project discovery consultation to review your technical requirements with a principal engineer.
          </p>
          <Link href="/start-a-project" className="sb-btn sb-btn--lg sb-btn--on-dark">
            Start a Project Consultation
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
