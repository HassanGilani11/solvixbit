'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckIcon } from '@/components/icons';
import { ProjectDiscoveryData, ProjectSubmissionResponse } from '@/types/content';

const OBJECTIVE_OPTIONS = [
  { id: 'custom-software', label: 'Build custom software', desc: 'Bespoke web applications, portals, and core business tools.' },
  { id: 'saas-product', label: 'Develop a SaaS or digital product', desc: 'Zero-to-one product development, MVP to enterprise scale.' },
  { id: 'ai-automation', label: 'Introduce AI or automation', desc: 'LLM workflows, intelligent document triage, and operational pipelines.' },
  { id: 'modernize-systems', label: 'Modernize existing systems', desc: 'Refactoring legacy code, platform migrations, and eliminating tech debt.' },
  { id: 'ecommerce', label: 'Build or improve ecommerce', desc: 'High-speed headless storefronts, commerce APIs, and custom checkouts.' },
  { id: 'api-integration', label: 'Connect business applications', desc: 'CRM, ERP, payment gateways, and bidirectional data sync.' },
  { id: 'data-intelligence', label: 'Transform enterprise data & analytics', desc: 'Modern data warehouses, ingestion pipelines, and executive dashboards.' },
  { id: 'cloud-reliability', label: 'Improve cloud infrastructure or reliability', desc: 'AWS/GCP architectures, DevOps pipelines, and observability.' },
  { id: 'cro-performance', label: 'Improve website performance or conversion', desc: 'Core Web Vitals optimization and conversion-focused UX.' },
  { id: 'other-solution', label: 'Explore a different solution', desc: 'Advisory, feasibility studies, and tailored technology consultations.' },
];

const CHALLENGE_OPTIONS = [
  'Starting a new project',
  'Replacing an outdated system',
  'Improving an existing product',
  'Automating manual processes',
  'Connecting disconnected systems',
  'Improving customer experience',
  'Scaling a growing platform',
  'Exploring opportunities and requirements',
  'Other',
];

const SCOPE_OPTIONS = [
  'Discovery and technical planning',
  'Proof of concept',
  'MVP development',
  'Full product development',
  'Platform modernization',
  'API and systems integration',
  'AI workflow implementation',
  'Ecommerce implementation',
  'Performance and reliability improvements',
  'Ongoing engineering support',
  'Unsure / Need recommendations',
];

const BUDGET_OPTIONS = [
  { id: 'tier-0', label: 'Under $5,000', desc: 'Focused sprint, architecture audit, technical consultation, or discrete feature build' },
  { id: 'tier-1', label: '$5,000 to $15,000', desc: 'Starter build, MVP pilot, specialized automation workflow, or API integration' },
  { id: 'tier-2', label: '$15,000 to $35,000', desc: 'Full-scale custom application, headless storefront, or system rebuild' },
  { id: 'tier-3', label: '$35,000 to $75,000', desc: 'Complex multi-tier platform or multi-system enterprise integration' },
  { id: 'tier-4', label: '$75,000+', desc: 'Comprehensive digital transformation, large-scale portal or infrastructure' },
  { id: 'tier-unsure', label: 'Not sure yet', desc: 'Let us define the scope and provide tailored investment estimates' },
  { id: 'tier-discuss', label: 'Prefer to discuss the budget', desc: 'Review options directly during our technical discovery consultation' },
];

const TIMELINE_OPTIONS = [
  { id: 'asap', label: 'As soon as practical', desc: 'Ready to begin discovery and onboarding immediately' },
  { id: '2-4-weeks', label: 'Within 2 to 4 weeks', desc: 'Finalizing requirements and internal stakeholders' },
  { id: '1-3-months', label: 'Within 1 to 3 months', desc: 'Planned for upcoming quarter or fiscal roadmap' },
  { id: '3-months-plus', label: 'More than 3 months away', desc: 'Advance planning and architectural exploration' },
  { id: 'researching', label: 'Researching and planning', desc: 'Evaluating feasibility, scope, and technical direction' },
];

interface DiscoveryFormState {
  objectives: string[];
  challenges: string[];
  customChallenge: string;
  scopeDeliverables: string[];
  budgetRange: string;
  timeline: string;
  fullName: string;
  email: string;
  companyName: string;
  website: string;
  projectTitle: string;
  projectDescription: string;
  preferredContact: 'email' | 'video' | 'phone';
  additionalNotes: string;
}

function DiscoveryForm() {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Form State
  const [formData, setFormData] = useState<DiscoveryFormState>({
    objectives: [],
    challenges: [],
    customChallenge: '',
    scopeDeliverables: [],
    budgetRange: '',
    timeline: '',
    fullName: '',
    email: '',
    companyName: '',
    website: '',
    projectTitle: '',
    projectDescription: '',
    preferredContact: 'email',
    additionalNotes: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<ProjectSubmissionResponse | null>(null);

  // Handle URL Preselections (e.g. ?solution=operational-automation)
  useEffect(() => {
    const solutionParam = searchParams.get('solution');
    const serviceParam = searchParams.get('service');
    const target = solutionParam || serviceParam;

    if (target) {
      let matchedObjective = '';
      if (target.includes('automation') || target.includes('ai')) matchedObjective = 'Introduce AI or automation';
      else if (target.includes('startup') || target.includes('saas') || target.includes('mvp')) matchedObjective = 'Develop a SaaS or digital product';
      else if (target.includes('commerce') || target.includes('ecommerce')) matchedObjective = 'Build or improve ecommerce';
      else if (target.includes('moderniz') || target.includes('enterprise')) matchedObjective = 'Modernize existing systems';
      else if (target.includes('api') || target.includes('connected') || target.includes('integration')) matchedObjective = 'Connect business applications';
      else if (target.includes('cloud') || target.includes('reliability')) matchedObjective = 'Improve cloud infrastructure or reliability';
      else if (target.includes('conversion') || target.includes('experience')) matchedObjective = 'Improve website performance or conversion';
      else if (target.includes('software') || target.includes('portal')) matchedObjective = 'Build custom software';

      if (matchedObjective && !formData.objectives.includes(matchedObjective)) {
        setFormData((prev) => ({
          ...prev,
          objectives: [matchedObjective],
          projectTitle: `Project Consultation: ${target.replace(/-/g, ' ').toUpperCase()}`,
        }));
      }
    }
  }, [searchParams]);

  // Validation logic per step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (formData.objectives.length === 0) {
        newErrors.objectives = 'Please select at least one objective to continue.';
      }
    } else if (step === 2) {
      if (formData.challenges.length === 0) {
        newErrors.challenges = 'Please select a challenge that describes your situation.';
      }
      if (formData.challenges.includes('Other') && (!formData.customChallenge || formData.customChallenge.trim().length < 3)) {
        newErrors.customChallenge = 'Please describe your specific challenge.';
      }
    } else if (step === 3) {
      if (formData.scopeDeliverables.length === 0) {
        newErrors.scopeDeliverables = 'Please select at least one scope option or choose "Unsure / Need recommendations".';
      }
    } else if (step === 4) {
      if (!formData.budgetRange) {
        newErrors.budgetRange = 'Please select a budget range or select "Not sure yet".';
      }
    } else if (step === 5) {
      if (!formData.timeline) {
        newErrors.timeline = 'Please select your planned timeframe.';
      }
    } else if (step === 6) {
      if (!formData.fullName || formData.fullName.trim().length < 2) {
        newErrors.fullName = 'Full name is required.';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        newErrors.email = 'A valid work email is required.';
      }
      if (!formData.companyName || formData.companyName.trim().length < 2) {
        newErrors.companyName = 'Company name is required.';
      }
      if (!formData.projectDescription || formData.projectDescription.trim().length < 15) {
        newErrors.projectDescription = 'Please provide a brief description of your project (min 15 characters).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setErrors({});
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleObjective = (label: string) => {
    setFormData((prev) => {
      const exists = prev.objectives.includes(label);
      const updated = exists ? prev.objectives.filter((o) => o !== label) : [...prev.objectives, label];
      return { ...prev, objectives: updated };
    });
    if (errors.objectives) setErrors((prev) => ({ ...prev, objectives: '' }));
  };

  const toggleChallenge = (val: string) => {
    setFormData((prev) => {
      const exists = prev.challenges.includes(val);
      const updated = exists ? prev.challenges.filter((c) => c !== val) : [...prev.challenges, val];
      return { ...prev, challenges: updated };
    });
    if (errors.challenges) setErrors((prev) => ({ ...prev, challenges: '' }));
  };

  const toggleScope = (val: string) => {
    setFormData((prev) => {
      const exists = prev.scopeDeliverables.includes(val);
      const updated = exists ? prev.scopeDeliverables.filter((s) => s !== val) : [...prev.scopeDeliverables, val];
      return { ...prev, scopeDeliverables: updated };
    });
    if (errors.scopeDeliverables) setErrors((prev) => ({ ...prev, scopeDeliverables: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(6)) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/start-a-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          website_url_hp: honeypot,
        }),
      });

      const result: ProjectSubmissionResponse = await response.json();

      if (response.ok && result.success) {
        setSubmissionResult(result);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        if (result.validationErrors) {
          setErrors(result.validationErrors);
        } else {
          setErrors({ form: result.error || 'Failed to submit discovery brief. Please try again.' });
        }
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrors({ form: 'A network error occurred. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (submissionResult?.success) {
    return (
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '60px 24px 100px', textAlign: 'center' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'rgba(2, 196, 21, 0.1)',
          border: '2px solid #02C415',
          color: '#02C415',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <CheckIcon size={36} color="#02C415" />
        </div>

        <div className="sb-badge" style={{ marginBottom: '16px', background: 'rgba(2, 196, 21, 0.1)', color: '#02C415', border: '1px solid rgba(2, 196, 21, 0.3)' }}>
          BRIEF SUBMITTED SUCCESSFULLY
        </div>

        <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px', color: '#000000' }}>
          Thank You, {formData.fullName.split(' ')[0]}.
        </h1>

        <p style={{ fontSize: '18px', color: '#4B5563', lineHeight: 1.6, marginBottom: '32px' }}>
          Your project discovery brief has been safely received. Our senior engineering and strategy team is reviewing your requirements to prepare a tailored architectural discussion.
        </p>

        <div style={{
          background: '#F9FAFB',
          border: '1px solid #E5E7EB',
          borderRadius: '16px',
          padding: '24px 32px',
          textAlign: 'left',
          marginBottom: '40px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB', paddingBottom: '16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: 600 }}>REFERENCE IDENTIFIER</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '16px', color: '#598BFF' }}>
              {submissionResult.referenceId}
            </span>
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: '#111827' }}>What happens next?</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: '#374151' }}>
              <span style={{ color: '#02C415', fontWeight: 'bold' }}>1.</span>
              <span><strong>Requirements Analysis:</strong> We inspect your objective, timeline, and technical constraints.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: '#374151' }}>
              <span style={{ color: '#02C415', fontWeight: 'bold' }}>2.</span>
              <span><strong>Direct Outreach:</strong> We will reach out via your preferred channel (<strong>{formData.email}</strong>) with initial scoping insights.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: '#374151' }}>
              <span style={{ color: '#02C415', fontWeight: 'bold' }}>3.</span>
              <span><strong>Discovery Session:</strong> A focused 30-minute technical roadmap call with a principal engineer.</span>
            </li>
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/solutions" className="sb-btn sb-btn--primary">
            Explore Solutions
          </Link>
          <Link href="/insights" className="sb-btn sb-btn--secondary">
            Read Engineering Insights
          </Link>
        </div>
      </div>
    );
  }

  if (!isMounted) {
    return (
      <div style={{ maxWidth: '840px', margin: '0 auto', padding: '40px 24px 100px', textAlign: 'center' }} suppressHydrationWarning>
        <div style={{ height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>
          Loading discovery questionnaire...
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '40px 24px 100px' }} suppressHydrationWarning>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }} suppressHydrationWarning>
        <span className="sb-badge" style={{ marginBottom: '16px' }}>LET&apos;S BUILD SOMETHING MEANINGFUL</span>
        <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#000000', marginBottom: '16px' }}>
          What can we help you solve?
        </h1>
        <p style={{ fontSize: '18px', color: '#4B5563', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
          Tell us about your business, your challenge, and what you want to achieve. We&apos;ll use your answers to understand the project and identify a suitable next step.
        </p>
      </div>

      {/* Progress & Time Estimate */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '14px', fontWeight: 600, color: '#6B7280' }}>
          <span>Step {currentStep} of {totalSteps}: {
            currentStep === 1 ? 'Project Objective' :
            currentStep === 2 ? 'Business Challenge' :
            currentStep === 3 ? 'Scope & Deliverables' :
            currentStep === 4 ? 'Investment Range' :
            currentStep === 5 ? 'Target Timeline' :
            'Project Brief & Contact'
          }</span>
          <span>~{Math.max(1, 4 - Math.floor(currentStep / 2))} min remaining</span>
        </div>
        <div style={{ height: '6px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${(currentStep / totalSteps) * 100}%`,
              background: '#598BFF',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* STEP 1: OBJECTIVE */}
      {currentStep === 1 && (
        <section aria-labelledby="step-1-heading">
          <h2 id="step-1-heading" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: '#111827' }}>
            What are you looking to achieve?
          </h2>
          <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '24px' }}>
            Select one or more goals that align with your immediate or long-term vision.
          </p>

          {errors.objectives && (
            <div style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #F87171', color: '#B91C1C', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
              {errors.objectives}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {OBJECTIVE_OPTIONS.map((opt) => {
              const selected = formData.objectives.includes(opt.label);
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => toggleObjective(opt.label)}
                  style={{
                    textAlign: 'left',
                    padding: '20px',
                    borderRadius: '12px',
                    border: selected ? '2px solid #598BFF' : '1px solid #E5E7EB',
                    background: selected ? '#F0F5FF' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: selected ? '0 4px 12px rgba(89, 139, 255, 0.12)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '16px', color: selected ? '#1D4ED8' : '#111827' }}>
                      {opt.label}
                    </span>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '4px',
                      border: selected ? 'none' : '2px solid #D1D5DB',
                      backgroundColor: selected ? '#598BFF' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {selected && <CheckIcon size={14} color="#FFFFFF" />}
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>
                    {opt.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* STEP 2: BUSINESS CHALLENGE */}
      {currentStep === 2 && (
        <section aria-labelledby="step-2-heading">
          <h2 id="step-2-heading" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: '#111827' }}>
            Which situation best describes your challenge?
          </h2>
          <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '24px' }}>
            Select the primary operational or technical driver behind your initiative.
          </p>

          {errors.challenges && (
            <div style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #F87171', color: '#B91C1C', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
              {errors.challenges}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {CHALLENGE_OPTIONS.map((c) => {
              const selected = formData.challenges.includes(c);
              return (
                <button
                  type="button"
                  key={c}
                  onClick={() => toggleChallenge(c)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: '10px',
                    border: selected ? '2px solid #598BFF' : '1px solid #E5E7EB',
                    background: selected ? '#F0F5FF' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: '15px', color: selected ? '#1D4ED8' : '#1F2937' }}>
                    {c}
                  </span>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: selected ? 'none' : '2px solid #D1D5DB',
                    backgroundColor: selected ? '#598BFF' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {selected && <CheckIcon size={14} color="#FFFFFF" />}
                  </div>
                </button>
              );
            })}
          </div>

          {formData.challenges.includes('Other') && (
            <div style={{ marginTop: '16px', marginBottom: '24px' }}>
              <label htmlFor="customChallenge" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                Please explain your specific situation:
              </label>
              <textarea
                id="customChallenge"
                value={formData.customChallenge}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, customChallenge: e.target.value }));
                  if (errors.customChallenge) setErrors((prev) => ({ ...prev, customChallenge: '' }));
                }}
                rows={3}
                placeholder="Briefly describe what friction or requirement your business is addressing..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: errors.customChallenge ? '1px solid #EF4444' : '1px solid #D1D5DB',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                }}
              />
              {errors.customChallenge && (
                <p style={{ color: '#EF4444', fontSize: '13px', marginTop: '4px' }}>{errors.customChallenge}</p>
              )}
            </div>
          )}
        </section>
      )}

      {/* STEP 3: SCOPE & DELIVERABLES */}
      {currentStep === 3 && (
        <section aria-labelledby="step-3-heading">
          <h2 id="step-3-heading" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: '#111827' }}>
            What scope and deliverables do you anticipate?
          </h2>
          <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '24px' }}>
            Select the services and deliverables you are considering. (You can choose multiple).
          </p>

          {errors.scopeDeliverables && (
            <div style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #F87171', color: '#B91C1C', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
              {errors.scopeDeliverables}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '32px' }}>
            {SCOPE_OPTIONS.map((item) => {
              const selected = formData.scopeDeliverables.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleScope(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: '10px',
                    border: selected ? '2px solid #598BFF' : '1px solid #E5E7EB',
                    background: selected ? '#F0F5FF' : '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: '14px', color: selected ? '#1D4ED8' : '#374151' }}>
                    {item}
                  </span>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: selected ? 'none' : '2px solid #D1D5DB',
                    backgroundColor: selected ? '#598BFF' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginLeft: '8px',
                  }}>
                    {selected && <CheckIcon size={12} color="#FFFFFF" />}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* STEP 4: BUDGET */}
      {currentStep === 4 && (
        <section aria-labelledby="step-4-heading">
          <h2 id="step-4-heading" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: '#111827' }}>
            What investment range have you planned?
          </h2>
          <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '8px' }}>
            Providing an estimated range helps us recommend realistic architectural patterns and delivery models.
          </p>
          <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '24px', fontStyle: 'italic' }}>
            * This is for scoping guidance only. No pricing commitments are finalized until formal requirements are reviewed.
          </p>

          {errors.budgetRange && (
            <div style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #F87171', color: '#B91C1C', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
              {errors.budgetRange}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {BUDGET_OPTIONS.map((b) => {
              const selected = formData.budgetRange === b.label;
              return (
                <button
                  type="button"
                  key={b.id}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, budgetRange: b.label }));
                    if (errors.budgetRange) setErrors((prev) => ({ ...prev, budgetRange: '' }));
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '20px',
                    borderRadius: '12px',
                    border: selected ? '2px solid #598BFF' : '1px solid #E5E7EB',
                    background: selected ? '#F0F5FF' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '16px', color: selected ? '#1D4ED8' : '#111827' }}>
                      {b.label}
                    </span>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: selected ? '5px solid #598BFF' : '2px solid #D1D5DB',
                      backgroundColor: '#FFFFFF',
                    }} />
                  </div>
                  <p style={{ fontSize: '13px', color: '#6B7280', margin: 0, lineHeight: 1.4 }}>
                    {b.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* STEP 5: TIMELINE */}
      {currentStep === 5 && (
        <section aria-labelledby="step-5-heading">
          <h2 id="step-5-heading" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: '#111827' }}>
            When would you like to get started?
          </h2>
          <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '24px' }}>
            Help us understand your scheduling and team availability.
          </p>

          {errors.timeline && (
            <div style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #F87171', color: '#B91C1C', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
              {errors.timeline}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
            {TIMELINE_OPTIONS.map((t) => {
              const selected = formData.timeline === t.label;
              return (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, timeline: t.label }));
                    if (errors.timeline) setErrors((prev) => ({ ...prev, timeline: '' }));
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '18px 24px',
                    borderRadius: '12px',
                    border: selected ? '2px solid #598BFF' : '1px solid #E5E7EB',
                    background: selected ? '#F0F5FF' : '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '15px', color: selected ? '#1D4ED8' : '#111827', display: 'block', marginBottom: '2px' }}>
                      {t.label}
                    </span>
                    <span style={{ fontSize: '13px', color: '#6B7280' }}>
                      {t.desc}
                    </span>
                  </div>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: selected ? '5px solid #598BFF' : '2px solid #D1D5DB',
                    backgroundColor: '#FFFFFF',
                    flexShrink: 0,
                  }} />
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* STEP 6: CONTACT & PROJECT BRIEF */}
      {currentStep === 6 && (
        <section aria-labelledby="step-6-heading">
          <h2 id="step-6-heading" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: '#111827' }}>
            Contact Details & Project Brief
          </h2>
          <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '24px' }}>
            Please tell us who to connect with and share any additional technical context.
          </p>

          {errors.form && (
            <div style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #F87171', color: '#B91C1C', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
              {errors.form}
            </div>
          )}

          {/* Review Summary of Prior Steps */}
          <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '16px 20px', marginBottom: '28px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
              Selected Consultation Summary
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '13px' }}>
              <div>
                <span style={{ color: '#6B7280' }}>Objectives:</span>{' '}
                <strong style={{ color: '#111827' }}>{formData.objectives.join(', ') || 'None selected'}</strong>
              </div>
              <div>
                <span style={{ color: '#6B7280' }}>Challenge:</span>{' '}
                <strong style={{ color: '#111827' }}>{formData.challenges.join(', ') || 'None selected'}</strong>
              </div>
              <div>
                <span style={{ color: '#6B7280' }}>Budget Range:</span>{' '}
                <strong style={{ color: '#111827' }}>{formData.budgetRange || 'Unspecified'}</strong>
              </div>
              <div>
                <span style={{ color: '#6B7280' }}>Timeline:</span>{' '}
                <strong style={{ color: '#111827' }}>{formData.timeline || 'Unspecified'}</strong>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Honeypot field (hidden from real users) */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <label htmlFor="website_url_hp">Leave empty</label>
              <input
                type="text"
                id="website_url_hp"
                name="website_url_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label htmlFor="fullName" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  placeholder="e.g. Jane Doe"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: errors.fullName ? '1px solid #EF4444' : '1px solid #D1D5DB',
                    fontSize: '15px',
                  }}
                />
                {errors.fullName && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Work Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="jane@company.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: errors.email ? '1px solid #EF4444' : '1px solid #D1D5DB',
                    fontSize: '15px',
                  }}
                />
                {errors.email && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label htmlFor="companyName" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                  placeholder="e.g. Acme Corp"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: errors.companyName ? '1px solid #EF4444' : '1px solid #D1D5DB',
                    fontSize: '15px',
                  }}
                />
                {errors.companyName && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.companyName}</p>}
              </div>

              <div>
                <label htmlFor="website" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Current Website (Optional)
                </label>
                <input
                  type="text"
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                  placeholder="https://company.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '15px',
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="projectDescription" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Project Description & Goals *
              </label>
              <textarea
                id="projectDescription"
                rows={4}
                value={formData.projectDescription}
                onChange={(e) => setFormData((prev) => ({ ...prev, projectDescription: e.target.value }))}
                placeholder="Describe your current system, what you are looking to build or optimize, and any critical technical requirements..."
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: errors.projectDescription ? '1px solid #EF4444' : '1px solid #D1D5DB',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                }}
              />
              {errors.projectDescription && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.projectDescription}</p>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <label htmlFor="preferredContact" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Preferred Contact Method
                </label>
                <select
                  id="preferredContact"
                  value={formData.preferredContact}
                  onChange={(e) => setFormData((prev) => ({ ...prev, preferredContact: e.target.value as any }))}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '15px',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <option value="email">Email Consultation</option>
                  <option value="video">Video Call (Google Meet / Zoom)</option>
                  <option value="phone">Phone Discussion</option>
                </select>
              </div>

              <div>
                <label htmlFor="additionalNotes" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Anything else we should know?
                </label>
                <input
                  type="text"
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                  placeholder="e.g. Existing GitHub repo, NDA required, RFP deadline"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '15px',
                  }}
                />
              </div>
            </div>
          </form>
        </section>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #E5E7EB' }}>
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="sb-btn sb-btn--secondary"
            disabled={isSubmitting}
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={handleNext}
            className="sb-btn sb-btn--primary"
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="sb-btn sb-btn--primary"
            style={{ minWidth: '200px' }}
          >
            {isSubmitting ? 'Submitting Discovery Brief...' : 'Submit Project Brief'}
          </button>
        )}
      </div>
    </div>
  );
}

export default function StartAProjectPage() {
  return (
    <main style={{ minHeight: '80vh', backgroundColor: '#FFFFFF', paddingTop: '40px' }}>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px 20px', color: '#6B7280' }}>Loading discovery questionnaire...</div>}>
        <DiscoveryForm />
      </Suspense>
    </main>
  );
}
