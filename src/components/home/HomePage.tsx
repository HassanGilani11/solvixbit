'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container, Section, Stack, Grid } from '../layout';
import { Display, Heading, Text } from '../typography';
import { Button, ButtonGroup } from '../actions';
import { Card, Badge, ServiceCard, CaseStudyCard, Testimonial } from '../content';
import { Input, Textarea, Select } from '../forms';
import { Navbar, Footer } from '../navigation';
import { Modal, Toast } from '../feedback';
import { Reveal, FadeUp, ScrollSectionReveal, TextSplitReveal } from '../motion';
import { HeroSection } from './HeroSection';
import { HorizontalPortfolio } from './HorizontalPortfolio';
import { TechLogoMarquee } from './TechLogoMarquee';
import { TechnologyMatrix } from './TechnologyMatrix';
import { HomeInsightsSection } from './HomeInsightsSection';
import { ArrowRight } from '../icons';
import { brandConfig } from '../../config/brand';
import { caseStudiesData } from '../../config/work';

export const HomePage: React.FC = () => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('all');
  const [honeypot, setHoneypot] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'software-development',
    budget: '$5k-$15k',
    description: '',
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          budget: formData.budget,
          message: formData.description,
          website_url_hp: honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsProjectModalOpen(false);
        setToastType('success');
        setToastMessage(`Inquiry received [${data.referenceId}]! Our strategy & engineering team will connect with you within 24 hours.`);
        setFormData({ name: '', email: '', service: 'software-development', budget: '$5k-$15k', description: '' });
      } else {
        setToastType('error');
        setToastMessage(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setToastType('error');
      setToastMessage('Network error occurred. Please try again or email hello@solvixbit.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredServices = selectedService === 'all'
    ? brandConfig.services
    : brandConfig.services.filter((s) => s.id === selectedService);

  return (
    <div style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}>
      <main id="main-content">
        {/* 2. HERO SECTION — Asymmetrical Editorial Agency Composition with Coordinated GSAP Timeline */}
        <HeroSection />

        {/* 3. TRUST & CAPABILITY STRIP — 10 Core Agency Capabilities (Evenly Balanced 5 + 5) */}
        <div
          style={{
            backgroundColor: '#EFEFEF',
            borderBottom: '1px solid #E2E2E2',
            padding: 'clamp(1rem, 2vw, 1.25rem) 0',
          }}
        >
          <Container>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Row 1: 5 Capabilities */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px 16px',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 600,
                  color: '#4B5563',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--color-primary-blue)', fontSize: '0.7em' }}>●</span>
                  Full-Stack Software Engineering
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--color-primary-blue)', fontSize: '0.7em' }}>●</span>
                  AI &amp; Autonomous Workflows
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--color-primary-blue)', fontSize: '0.7em' }}>●</span>
                  SaaS Product Architecture
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--color-primary-blue)', fontSize: '0.7em' }}>●</span>
                  Headless Web &amp; Ecommerce
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--color-primary-blue)', fontSize: '0.7em' }}>●</span>
                  Connected Systems &amp; APIs
                </span>
              </div>

              {/* Row 2: 5 Capabilities */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px 16px',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 600,
                  color: '#4B5563',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--color-secondary-green)', fontSize: '0.7em' }}>●</span>
                  Cloud &amp; Platform Reliability
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--color-secondary-green)', fontSize: '0.7em' }}>●</span>
                  Data &amp; Decision Systems
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--color-secondary-green)', fontSize: '0.7em' }}>●</span>
                  Security &amp; Quality Hardening
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--color-secondary-green)', fontSize: '0.7em' }}>●</span>
                  Mobile &amp; Cross-Platform Apps
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--color-secondary-green)', fontSize: '0.7em' }}>●</span>
                  UI/UX &amp; Design Systems
                </span>
              </div>
            </div>
          </Container>
        </div>

        {/* 3.5 CONTINUOUS TECHNOLOGY STACK MARQUEE (LEFT & RIGHT ROTATION) */}
        <TechLogoMarquee />

        {/* 4. SERVICES SECTION — Distinctive Editorial Grid */}
        <Section id="services" style={{ backgroundColor: '#FAFAFA' }}>
          <Container>
            <div style={{ maxWidth: '720px', marginBottom: '32px' }}>
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
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#111827',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary-blue)' }} />
                    OUR CORE CAPABILITIES
                  </span>
                </div>
              </FadeUp>

              <FadeUp delayMs={200}>
                <h2
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.15,
                    color: '#000000',
                    margin: '0 0 12px 0',
                  }}
                >
                  Engineering capability meets digital craft.
                </h2>
              </FadeUp>

              <FadeUp delayMs={300}>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                    lineHeight: 1.6,
                    color: '#4B5563',
                    margin: 0,
                  }}
                >
                  We partner with ambitious brands and forward-thinking companies to architect, design, and engineer transformative digital solutions that scale.
                </p>
              </FadeUp>
            </div>

            <ScrollSectionReveal animation="fade-up" staggerInterval={0.08}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 'var(--space-8)',
                }}
              >
                {brandConfig.services.map((svc) => (
                  <div key={svc.id} className="sb-service-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                      <span className="sb-service-card__num">{svc.number}</span>
                      <span
                        style={{
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 600,
                          color: '#6B7280',
                          backgroundColor: '#EFEFEF',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                        }}
                      >
                        {svc.category}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-family-heading)',
                        fontWeight: 700,
                        fontSize: 'var(--font-size-2xl)',
                        color: '#000000',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      <Link
                        href={`/services/${svc.id}`}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          transition: 'color 180ms ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#598BFF')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#000000')}
                      >
                        {svc.title}
                      </Link>
                    </h3>

                    <p
                      style={{
                        fontFamily: 'var(--font-family-body)',
                        fontSize: 'var(--font-size-base)',
                        color: '#4B5563',
                        lineHeight: 1.6,
                        marginBottom: 'var(--space-6)',
                        flexGrow: 1,
                      }}
                    >
                      {svc.shortDescription}
                    </p>

                    <div style={{ borderTop: '1px solid #EFEFEF', paddingTop: 'var(--space-4)' }}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          marginBottom: 'var(--space-4)',
                        }}
                      >
                        {svc.deliverables.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            style={{
                              fontSize: 'var(--font-size-xs)',
                              color: '#374151',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <span style={{ color: 'var(--color-primary-blue)', fontWeight: 'bold' }}>✓</span> {item}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/services/${svc.id}`}
                        style={{
                          fontFamily: 'var(--font-family-body)',
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: 600,
                          color: 'var(--color-primary-blue)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          textDecoration: 'none',
                        }}
                        className="sb-link-arrow"
                      >
                        <span>Explore {svc.title}</span>
                        <ArrowRight size={13} className="sb-btn__arrow" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollSectionReveal>
          </Container>
        </Section>

        {/* 4.5 DEDICATED TECHNOLOGY STACK & ARCHITECTURE MATRIX */}
        <TechnologyMatrix />

        {/* 5. FEATURED WORK / HORIZONTAL PORTFOLIO STORYTELLING (GSAP Pinned Gallery on Desktop) */}
        <HorizontalPortfolio />

        {/* 6. APPROACH / PROCESS SECTION */}
        <Section id="process" style={{ backgroundColor: '#FAFAFA', borderTop: '1px solid #EFEFEF' }}>
          <Container>
            <div style={{ maxWidth: '720px', marginBottom: '32px' }}>
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
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#111827',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary-blue)' }} />
                    OUR APPROACH
                  </span>
                </div>
              </FadeUp>

              <FadeUp delayMs={200}>
                <h2
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.15,
                    color: '#000000',
                    margin: '0 0 12px 0',
                  }}
                >
                  How we bring digital solutions to life.
                </h2>
              </FadeUp>

              <FadeUp delayMs={300}>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                    lineHeight: 1.6,
                    color: '#4B5563',
                    margin: 0,
                  }}
                >
                  A disciplined, collaborative 5-stage delivery model designed for velocity, technical precision, and measurable outcomes.
                </p>
              </FadeUp>
            </div>

            {/* Horizontal 5-Step Process Progression */}
            <ScrollSectionReveal animation="fade-up" staggerInterval={0.07}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                  gap: 'var(--space-6)',
                }}
              >
                {[
                  {
                    step: '01',
                    name: 'Discover',
                    desc: 'Uncovering root operational bottlenecks, business objectives, user journeys, and technical constraints.',
                  },
                  {
                    step: '02',
                    name: 'Design',
                    desc: 'Architecting intuitive user flows, bespoke interface polish, and robust system schematics.',
                  },
                  {
                    step: '03',
                    name: 'Build',
                    desc: 'Clean, test-driven software engineering with strict type safety, modern frameworks, and modular scalability.',
                  },
                  {
                    step: '04',
                    name: 'Launch',
                    desc: 'Zero-downtime deployment, automated CI/CD pipelines, security validation, and smooth data migration.',
                  },
                  {
                    step: '05',
                    name: 'Scale',
                    desc: 'Continuous performance telemetry, proactive optimization, and strategic feature expansion as you grow.',
                  },
                ].map((proc) => (
                  <div
                    key={proc.step}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: 'var(--radius-md)',
                      padding: 'var(--space-6)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-family-mono)',
                        fontSize: 'var(--font-size-2xl)',
                        fontWeight: 800,
                        color: 'var(--color-primary-blue)',
                        marginBottom: 'var(--space-3)',
                      }}
                    >
                      {proc.step}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-family-heading)',
                        fontSize: 'var(--font-size-xl)',
                        fontWeight: 700,
                        color: '#000000',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      {proc.name}
                    </h3>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                      {proc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollSectionReveal>
          </Container>
        </Section>

        {/* 7. WHY SOLVIXBIT — High-Contrast Editorial Section */}
        <Section id="why-us" className="sb-section-dark">
          <Container>
            <div style={{ maxWidth: '720px', marginBottom: '32px' }}>
              <FadeUp delayMs={100}>
                <div style={{ display: 'inline-flex', marginBottom: '12px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '5px 12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary-blue)' }} />
                    THE SOLVIXBIT ADVANTAGE
                  </span>
                </div>
              </FadeUp>

              <FadeUp delayMs={200}>
                <h2
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.15,
                    color: '#FFFFFF',
                    margin: '0 0 12px 0',
                  }}
                >
                  Why ambitious teams partner with SOLVIXBIT.
                </h2>
              </FadeUp>

              <FadeUp delayMs={300}>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                    lineHeight: 1.6,
                    color: '#9E9E9E',
                    margin: 0,
                  }}
                >
                  We combine the creative craft of a digital agency with the architectural rigor of an enterprise software engineering firm.
                </p>
              </FadeUp>
            </div>

            <ScrollSectionReveal animation="fade-up" staggerInterval={0.07}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: 'var(--space-6)',
                }}
              >
                {[
                  {
                    title: 'Problem-first thinking',
                    description: 'We diagnose root challenges and understand your commercial goals before selecting technology stacks or writing code.',
                  },
                  {
                    title: 'Thoughtful design & engineering',
                    description: 'We bridge exceptional visual aesthetics with clean, resilient codebases engineered for performance.',
                  },
                  {
                    title: 'Practical AI & automation',
                    description: 'We implement intelligent automations that solve real operational friction and create measurable ROI.',
                  },
                  {
                    title: 'Scalable, maintainable solutions',
                    description: 'Zero technical debt or locked-in black boxes. Every architecture is built for long-term independence and scale.',
                  },
                  {
                    title: 'Direct senior partner access',
                    description: 'Collaborate directly with principal architects and strategists without non-technical middle management layers.',
                  },
                  {
                    title: 'Velocity with architectural rigor',
                    description: 'Rapid sprint-based prototype-to-production cadence backed by continuous integration, unit tests, and peer audits.',
                  },
                  {
                    title: 'Enterprise security & hardening',
                    description: 'OWASP compliance, strict data isolation, zero-trust secrets management, and robust infrastructure resilience.',
                  },
                  {
                    title: 'Long-term partnership & SLA',
                    description: 'We act as an extension of your leadership and product teams with proactive engineering advisory and support.',
                  },
                ].map((item, idx) => (
                  <div
                    key={item.title}
                    style={{
                      backgroundColor: '#111111',
                      border: '1px solid #222222',
                      borderRadius: 'var(--radius-md)',
                      padding: 'var(--space-6)',
                      height: '100%',
                    }}
                  >
                    <div style={{ color: 'var(--color-primary-blue)', fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>
                      0{idx + 1}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-family-heading)',
                        fontSize: 'var(--font-size-lg)',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: '#A0A0A0', lineHeight: 1.6, margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollSectionReveal>
          </Container>
        </Section>

        {/* 8. EDITORIAL & INSIGHTS / BLOGS SECTION */}
        <HomeInsightsSection />

        {/* 9. CLOSING CTA SECTION */}
        <Section id="contact" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #EFEFEF' }}>
          <Container>
            <ScrollSectionReveal animation="scale-up">
              <div
                style={{
                  backgroundColor: '#EFEFEF',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid #E2E2E2',
                  padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(1.5rem, 4vw, 3.5rem)',
                  textAlign: 'center',
                  maxWidth: '880px',
                  margin: '0 auto',
                }}
              >
                <span
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 700,
                    color: 'var(--color-primary-blue)',
                    letterSpacing: 'var(--letter-spacing-wider)',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  START A CONVERSATION
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                    fontWeight: 800,
                    color: '#000000',
                    lineHeight: 1.15,
                    margin: '0 0 var(--space-4) 0',
                  }}
                >
                  Have something worth building?
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)',
                    color: '#4B5563',
                    maxWidth: '620px',
                    margin: '0 auto var(--space-8) auto',
                    lineHeight: 1.6,
                  }}
                >
                  Let’s turn your next challenge into a digital solution that moves your business forward.
                </p>
                <Link
                  href="/contact"
                  className="sb-btn sb-btn--lg sb-btn--primary"
                  style={{ minWidth: '200px', textDecoration: 'none' }}
                >
                  <span>Let's Talk</span>
                  <ArrowRight size={16} className="sb-btn__arrow" />
                </Link>
              </div>
            </ScrollSectionReveal>
          </Container>
        </Section>
      </main>

      {/* PROJECT INQUIRY MODAL */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title="Start Your Project With SOLVIXBIT"
      >
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Honeypot Spam Protection Field */}
          <input
            type="text"
            name="website_url_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0 }}
          />
          <Input
            label="Your Name"
            required
            placeholder="e.g. Alex Morgan"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Work Email"
            type="email"
            required
            placeholder="alex@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Select
            label="Primary Service Interest"
            required
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            options={[
              { label: 'Custom Software Development', value: 'software-development' },
              { label: 'AI & Intelligent Automation', value: 'ai-automation' },
              { label: 'SaaS & Web Architecture', value: 'saas-development' },
              { label: 'Connected Systems & API Integration', value: 'connected-systems' },
              { label: 'Cloud Infrastructure & DevOps', value: 'cloud-infrastructure' },
              { label: 'Design Systems & UX Engineering', value: 'ui-ux-engineering' },
            ]}
          />
          <Select
            label="Target Budget / Scope"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            options={[
              { label: 'Under $3,000 (Sprint / Consultation)', value: '<$3k' },
              { label: '$3,000 to $5,000 (Starter / MVP Pilot)', value: '$3k-$5k' },
              { label: '$5,000 to $15,000 (Standard Application)', value: '$5k-$15k' },
              { label: '$15,000 to $35,000 (Comprehensive System)', value: '$15k-$35k' },
              { label: '$35,000 to $75,000+ (Enterprise Platform)', value: '$35k-$75k+' },
              { label: 'Monthly Retainer / Ongoing Support', value: 'retainer' },
              { label: 'Prefer to discuss scope first', value: 'discuss' },
            ]}
          />
          <Textarea
            label="Describe What You're Looking to Build or Solve"
            required
            placeholder="Tell us about the project goals, timeline, and current state of your technology..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsProjectModalOpen(false)}
            >
              Cancel
            </Button>
            <button
              type="submit"
              className="sb-btn sb-btn--md sb-btn--primary"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Sending Request...' : 'Submit Project Inquiry'}</span>
              <ArrowRight size={14} className="sb-btn__arrow" />
            </button>
          </div>
        </form>
      </Modal>

      {/* TOAST NOTIFICATION */}
      <Toast
        isOpen={!!toastMessage}
        message={toastMessage || ''}
        type={toastType}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};
