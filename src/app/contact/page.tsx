'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container, Section } from '../../components/layout';
import { Reveal, FadeUp } from '../../components/motion';
import { Input, Textarea, Select } from '../../components/forms';
import { Toast } from '../../components/feedback';
import { ArrowRight } from '../../components/icons';

export default function ContactPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: 'software-development',
    budget: '$5k-$15k',
    timeline: '1-2 Months',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          website_url_hp: honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setToastType('success');
        setToastMessage(`Inquiry received [${data.referenceId}]. A senior partner will contact you within 24 hours with an initial architecture scope.`);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: 'software-development',
          budget: '$5k-$15k',
          timeline: '1-2 Months',
          message: '',
        });
      } else {
        setToastType('error');
        setToastMessage(data.error || 'Failed to submit inquiry. Please try again or email hello@solvixbit.com.');
      }
    } catch (err) {
      setToastType('error');
      setToastMessage('Network error occurred. Please try again or email hello@solvixbit.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@solvixbit.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#000000' }}>
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Contact Hero */}
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
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#02C415' }} />
                    PROJECT INTAKE & DIRECT PARTNER ACCESS
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
                  Let’s engineer your <span style={{ color: 'var(--color-primary-blue)' }}>next breakthrough.</span>
                </h1>
              </FadeUp>

              <FadeUp delayMs={300}>
                <p
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 'clamp(1.1rem, 1.3vw, 1.25rem)',
                    lineHeight: 1.6,
                    color: '#4B5563',
                    maxWidth: '680px',
                    margin: 0,
                  }}
                >
                  Specify your project parameters below. You will receive an architectural scope analysis and a dedicated discovery session directly with our senior partners.
                </p>
              </FadeUp>
            </div>
          </Container>
        </section>

        {/* Form and Contact Information Grid */}
        <Section style={{ backgroundColor: '#F9FAFB', padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
          <Container>
            <div className="sb-contact-layout">
              {/* Left Column: Intake Form */}
              <Reveal>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-2xl)',
                    border: '1px solid #E5E7EB',
                    padding: 'clamp(1.75rem, 4.5vw, 3rem)',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div style={{ marginBottom: '28px' }}>
                    <h2
                      style={{
                        fontFamily: 'var(--font-family-heading)',
                        fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        color: '#000000',
                        margin: '0 0 8px 0',
                        lineHeight: 1.25,
                      }}
                    >
                      Project Parameters
                    </h2>
                    <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: '#6B7280', lineHeight: 1.5 }}>
                      Please provide details on your requirements, tech stack, and goals.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                    {/* Row 1: Name & Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px 24px' }}>
                      <Input
                        label="Your Full Name"
                        required
                        placeholder="Alex Morgan"
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
                    </div>

                    {/* Row 2: Company & Phone */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px 24px' }}>
                      <Input
                        label="Company / Organization"
                        placeholder="Acme Corp, Inc."
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                      <Input
                        label="Phone / Direct Channel (Optional)"
                        placeholder="+1 (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    {/* Row 3: Service & Budget */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px 24px' }}>
                      <Select
                        label="Primary Service Interest"
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        options={[
                          { label: 'Custom Software Development', value: 'software-development' },
                          { label: 'Web Application Architecture', value: 'web-architecture' },
                          { label: 'Cloud Infrastructure & DevOps', value: 'cloud-infrastructure' },
                          { label: 'Connected Systems & API Integration', value: 'connected-systems' },
                          { label: 'AI & Intelligent Automation', value: 'intelligent-automation' },
                          { label: 'Enterprise System Modernization', value: 'system-modernization' },
                          { label: 'Data Engineering & Decision Systems', value: 'data-systems' },
                          { label: 'Design Systems & UX Engineering', value: 'ui-ux-engineering' },
                        ]}
                      />

                      <Select
                        label="Estimated Budget Scope"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        options={[
                          { label: 'Under $3,000 (Sprint / Consultation)', value: '<$3k' },
                          { label: '$3,000 to $5,000 (Starter / MVP Pilot)', value: '$3k-$5k' },
                          { label: '$5,000 to $15,000 (Standard Build)', value: '$5k-$15k' },
                          { label: '$15,000 to $35,000 (Full-Scale Application)', value: '$15k-$35k' },
                          { label: '$35,000 to $75,000+ (Enterprise Platform)', value: '$35k-$75k+' },
                          { label: 'Monthly Retainer / Advisory', value: 'retainer' },
                          { label: 'Prefer to discuss scope first', value: 'discuss' },
                        ]}
                      />
                    </div>

                    {/* Row 4: Timeline */}
                    <Select
                      label="Target Launch Timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      options={[
                        { label: 'Immediate (Next 30 Days)', value: 'Immediate' },
                        { label: 'Within 1 to 2 Months', value: '1-2 Months' },
                        { label: 'Next Quarter (Q3 / Q4)', value: 'Next Quarter' },
                        { label: 'Exploratory / Feasibility Stage', value: 'Exploratory' },
                      ]}
                    />

                    {/* Row 5: Message */}
                    <Textarea
                      label="Project Summary & Objectives"
                      required
                      placeholder="Tell us about the challenges, required integrations, target audience, or current tech stack..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />

                    {/* Submit Action */}
                    <div style={{ marginTop: 'var(--space-2)' }}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="sb-btn sb-btn--lg sb-btn--primary"
                        style={{ width: '100%', height: '54px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      >
                        <span>{isSubmitting ? 'Transmitting Scope...' : 'Submit Inquiry & Request Partner Call'}</span>
                        <ArrowRight size={16} className="sb-btn__arrow" />
                      </button>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '16px',
                          marginTop: 'var(--space-3)',
                          fontSize: '0.8125rem',
                          color: '#6B7280',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#02C415', fontSize: '0.9rem' }}>✓</span> Mutual NDA Protected
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#02C415', fontSize: '0.9rem' }}>✓</span> 24-Hour Review SLA
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#02C415', fontSize: '0.9rem' }}>✓</span> Direct Partner Access
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </Reveal>

              {/* Right Column: Direct Info & Guarantees */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {/* Dark Partner Access Card */}
                <Reveal>
                  <div
                    style={{
                      backgroundColor: '#000000',
                      color: '#FFFFFF',
                      borderRadius: 'var(--radius-2xl)',
                      padding: 'clamp(2rem, 4vw, 2.75rem)',
                      border: '1px solid #1F2937',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)',
                    }}
                  >
                    {/* Background glow accent */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '-30%',
                        right: '-30%',
                        width: '240px',
                        height: '240px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(89, 139, 255, 0.15) 0%, rgba(0,0,0,0) 70%)',
                        pointerEvents: 'none',
                      }}
                    />

                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#02C415', display: 'inline-block' }} />
                      <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', color: '#02C415', letterSpacing: '0.06em', fontWeight: 600 }}>
                        DIRECT SENIOR ENGAGEMENT
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-family-heading)',
                        fontSize: 'clamp(1.35rem, 2vw, 1.6rem)',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        margin: '0 0 12px 0',
                        lineHeight: 1.25,
                      }}
                    >
                      Direct Senior Partner Access
                    </h3>
                    <p style={{ color: '#9CA3AF', fontSize: 'var(--font-size-sm)', lineHeight: 1.6, margin: '0 0 24px 0' }}>
                      You communicate directly with senior software architects and creative directors who design systems and write production code.
                    </p>

                    {/* Email Box */}
                    <div
                      style={{
                        backgroundColor: '#0D1117',
                        border: '1px solid #21262D',
                        borderRadius: '12px',
                        padding: '16px 18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        marginBottom: '24px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8125rem', color: '#8B949E', fontWeight: 500 }}>Direct Partner Email</span>
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          style={{
                            background: '#161B22',
                            border: '1px solid #30363D',
                            borderRadius: '6px',
                            padding: '4px 10px',
                            color: copiedEmail ? '#02C415' : '#D1D5DB',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 200ms ease',
                          }}
                        >
                          {copiedEmail ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                      <a
                        href="mailto:hello@solvixbit.com"
                        style={{
                          color: '#598BFF',
                          textDecoration: 'none',
                          fontWeight: 700,
                          fontSize: '1.25rem',
                          letterSpacing: '-0.01em',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        hello@solvixbit.com
                        <span style={{ fontSize: '1rem' }}>↗</span>
                      </a>
                    </div>

                    {/* Metrics Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '16px',
                        paddingTop: '20px',
                        borderTop: '1px solid #1F2937',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Response SLA</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF', marginTop: '6px' }}>&lt; 24 Hours</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Timezone</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF', marginTop: '6px' }}>Global (US / EU / APAC)</div>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* What Happens Next Roadmap Card */}
                <Reveal>
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: 'var(--radius-2xl)',
                      padding: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: 'var(--font-family-heading)',
                        fontSize: 'var(--font-size-base)',
                        fontWeight: 700,
                        color: '#000000',
                        marginBottom: 'var(--space-4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: '#EFEFEF',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: '#000000',
                        }}
                      >
                        ?
                      </span>
                      What Happens Next?
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-family-mono)',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: '#598BFF',
                            backgroundColor: '#EEF2FF',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            marginTop: '2px',
                          }}
                        >
                          01
                        </span>
                        <div>
                          <strong style={{ fontSize: '0.875rem', color: '#111827', display: 'block' }}>
                            24-Hour Architecture Review
                          </strong>
                          <span style={{ fontSize: '0.8125rem', color: '#6B7280', lineHeight: 1.5, display: 'block', marginTop: '2px' }}>
                            A partner analyzes your scope, architecture requirements, and technical feasibility.
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-family-mono)',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: '#598BFF',
                            backgroundColor: '#EEF2FF',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            marginTop: '2px',
                          }}
                        >
                          02
                        </span>
                        <div>
                          <strong style={{ fontSize: '0.875rem', color: '#111827', display: 'block' }}>
                            Discovery Strategy Call
                          </strong>
                          <span style={{ fontSize: '0.8125rem', color: '#6B7280', lineHeight: 1.5, display: 'block', marginTop: '2px' }}>
                            A 30-minute technical consultation to clarify integrations, milestones, and stack.
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-family-mono)',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: '#598BFF',
                            backgroundColor: '#EEF2FF',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            marginTop: '2px',
                          }}
                        >
                          03
                        </span>
                        <div>
                          <strong style={{ fontSize: '0.875rem', color: '#111827', display: 'block' }}>
                            Fixed Sprint Proposal
                          </strong>
                          <span style={{ fontSize: '0.8125rem', color: '#6B7280', lineHeight: 1.5, display: 'block', marginTop: '2px' }}>
                            Clear deliverables, fixed sprint timeline, team allocation, and transparent pricing.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </Section>
    </main>
  );
}
