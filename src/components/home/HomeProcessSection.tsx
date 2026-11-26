'use client';

import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';

initGSAP();

interface ProcessStage {
  step: string;
  name: string;
  subtitle: string;
  description: string;
  duration: string;
  deliverables: string[];
  keyOutcome: string;
}

const STAGES: ProcessStage[] = [
  {
    step: '01',
    name: 'Discover',
    subtitle: 'System & Problem Diagnosis',
    description: 'We audit root technical constraints, existing data flows, and commercial goals before prescribing solutions.',
    duration: 'Week 1-2',
    deliverables: ['Technical Dependency Map', 'Architecture Health Audit', 'Scope & Milestone Roadmap'],
    keyOutcome: 'Zero architectural assumptions; verified risk profile.',
  },
  {
    step: '02',
    name: 'Design',
    subtitle: 'Interface Craft & Schema Modeling',
    description: 'We design high-fidelity user experiences and system data schemas in parallel so design and engineering align seamlessly.',
    duration: 'Week 2-4',
    deliverables: ['Design System Tokens', 'Clickable Prototype', 'Database & API Contracts'],
    keyOutcome: 'Type-safe contracts and validated user workflows.',
  },
  {
    step: '03',
    name: 'Build',
    subtitle: 'Rigorous Software Engineering',
    description: 'Disciplined sprint-based development with strict type-safety, automated tests, clean component boundaries, and peer code reviews.',
    duration: 'Sprints (2-wk cycles)',
    deliverables: ['Type-Safe Codebase', 'Automated Test Suites', 'Staging Testbed & Preview Deploys'],
    keyOutcome: 'Production-ready code with automated regression coverage.',
  },
  {
    step: '04',
    name: 'Launch',
    subtitle: 'Zero-Downtime Deployment',
    description: 'Automated CI/CD pipelines, security hardening, canary traffic releases, and live telemetry observability.',
    duration: 'Launch Sprint',
    deliverables: ['CI/CD Pipeline', 'Security & OWASP Audit', 'Live Production Cutover'],
    keyOutcome: 'Seamless cutover without business interruption.',
  },
  {
    step: '05',
    name: 'Scale',
    subtitle: 'Continuous Telemetry & Expansion',
    description: 'Proactive performance monitoring, latency reduction, and iterative feature development as business volume grows.',
    duration: 'Ongoing Retainer',
    deliverables: ['Telemetry Dashboards', 'Performance Optimization', 'Ongoing Architectural Advisory'],
    keyOutcome: 'Low-latency performance and sustained system reliability.',
  },
];

export const HomeProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        '.sb-process-header',
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

      const rail = section.querySelector('.sb-process-pipeline-rail');
      if (rail) {
        gsap.fromTo(
          rail,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.8,
            ease: ANIMATION_CONFIG.ease.brand,
            clearProps: 'transform',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      const cards = section.querySelectorAll('.sb-process-step-card');
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: ANIMATION_CONFIG.ease.brand,
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const currentStage = STAGES[activeStep];

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        backgroundColor: '#FAFAFA',
        borderBottom: '1px solid #E5E7EB',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container>
        {/* Section Header */}
        <div className="sb-process-header" style={{ maxWidth: '780px', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
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
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-family-mono)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-secondary-green)' }} />
              06 // DELIVERY DISCIPLINE
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'clamp(2rem, 3.8vw, 3.1rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: '#000000',
              margin: '0 0 14px 0',
            }}
          >
            A 5-stage model engineered for velocity and precision.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              lineHeight: 1.6,
              color: '#4B5563',
              margin: 0,
            }}
          >
            Predictable sprint delivery without bureaucratic overhead. We keep stakeholders directly connected to architecture, source code, and live preview environments.
          </p>
        </div>

        {/* Continuous Connected Pipeline Rail (Desktop) */}
        <div
          className="sb-hide-mobile"
          style={{
            position: 'relative',
            marginBottom: '32px',
            padding: '0 20px',
          }}
        >
          {/* Rail Track Line */}
          <div
            className="sb-process-pipeline-rail"
            style={{
              position: 'absolute',
              top: '18px',
              left: '40px',
              right: '40px',
              height: '3px',
              backgroundColor: '#E5E7EB',
              zIndex: 0,
            }}
          >
            {/* Active Progress Fill */}
            <div
              style={{
                height: '100%',
                width: `${(activeStep / (STAGES.length - 1)) * 100}%`,
                backgroundColor: 'var(--color-primary-blue)',
                transition: 'width 280ms cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 0 8px rgba(89, 139, 255, 0.6)',
              }}
            />
          </div>

          {/* Interactive Stage Nodes */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {STAGES.map((stage, idx) => {
              const isSelected = idx === activeStep;
              const isCompleted = idx < activeStep;

              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? 'var(--color-primary-blue)' : isCompleted ? '#111827' : '#FFFFFF',
                      border: isSelected ? '3px solid #BFDBFE' : isCompleted ? '2px solid #111827' : '2px solid #D1D5DB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-family-mono)',
                      fontWeight: 800,
                      color: isSelected || isCompleted ? '#FFFFFF' : '#6B7280',
                      transition: 'all 200ms ease',
                      boxShadow: isSelected ? '0 0 12px rgba(89, 139, 255, 0.4)' : '0 1px 3px rgba(0,0,0,0.05)',
                    }}
                  >
                    {isCompleted ? '✓' : stage.step}
                  </div>
                  <span
                    style={{
                      marginTop: '8px',
                      fontSize: '0.8125rem',
                      fontWeight: isSelected ? 800 : 600,
                      color: isSelected ? '#111827' : '#6B7280',
                      transition: 'color 180ms ease',
                    }}
                  >
                    {stage.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Connected Timeline Selector + Active Stage Spotlight (Avoids Repetitive Cards) */}
        <div
          className="sb-process-timeline-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '24px',
            alignItems: 'stretch',
            marginBottom: '24px',
          }}
        >
          {/* Left: Compact Connected Stage Rail */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              position: 'relative',
            }}
          >
            {STAGES.map((stage, idx) => {
              const isCurrent = idx === activeStep;
              const isPast = idx < activeStep;
              return (
                <button
                  key={stage.step}
                  type="button"
                  className="sb-process-step-card"
                  onClick={() => setActiveStep(idx)}
                  aria-pressed={isCurrent}
                  style={{
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                    padding: '16px 20px',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    backgroundColor: isCurrent ? '#000000' : '#FFFFFF',
                    color: isCurrent ? '#FFFFFF' : '#111827',
                    border: isCurrent
                      ? '1px solid var(--color-primary-blue)'
                      : '1px solid #E5E7EB',
                    boxShadow: isCurrent
                      ? '0 14px 30px -10px rgba(89, 139, 255, 0.28)'
                      : '0 2px 6px rgba(0, 0, 0, 0.02)',
                    transition: 'all 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-family-mono)',
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        backgroundColor: isCurrent
                          ? 'var(--color-primary-blue)'
                          : isPast
                          ? '#02C415'
                          : '#F3F4F6',
                        color: isCurrent || isPast ? '#FFFFFF' : '#4B5563',
                        flexShrink: 0,
                      }}
                    >
                      {isPast ? '✓' : stage.step}
                    </span>
                    <div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.2 }}>
                        {stage.name}
                      </div>
                      <div
                        style={{
                          fontSize: '0.74rem',
                          fontFamily: 'var(--font-family-mono)',
                          color: isCurrent ? '#93C5FD' : '#6B7280',
                          marginTop: '2px',
                        }}
                      >
                        {stage.subtitle}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-family-mono)',
                      fontWeight: 700,
                      color: isCurrent ? '#FFFFFF' : '#6B7280',
                      backgroundColor: isCurrent ? 'rgba(89, 139, 255, 0.22)' : '#F3F4F6',
                      padding: '4px 9px',
                      borderRadius: '6px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {stage.duration}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Active Stage Glass Spotlight Panel */}
          <div
            className="sb-glass-meta--light"
            style={{
              borderRadius: '20px',
              padding: 'clamp(1.75rem, 3.2vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginBottom: '14px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--color-primary-blue)',
                    letterSpacing: '0.06em',
                  }}
                >
                  STAGE {currentStage.step} // {currentStage.subtitle.toUpperCase()}
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-family-mono)',
                    fontWeight: 700,
                    color: '#048A10',
                    backgroundColor: 'rgba(2, 196, 21, 0.1)',
                    padding: '4px 10px',
                    borderRadius: '999px',
                  }}
                >
                  {currentStage.duration}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)',
                  fontWeight: 800,
                  color: '#000000',
                  letterSpacing: '-0.025em',
                  margin: '0 0 12px 0',
                }}
              >
                {currentStage.name}
              </h3>

              <p
                style={{
                  fontSize: '1rem',
                  color: '#4B5563',
                  lineHeight: 1.65,
                  margin: '0 0 22px 0',
                }}
              >
                {currentStage.description}
              </p>

              <div
                style={{
                  borderTop: '1px solid #E5E7EB',
                  paddingTop: '18px',
                }}
              >
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-family-mono)',
                    fontWeight: 700,
                    color: '#6B7280',
                    letterSpacing: '0.06em',
                    marginBottom: '12px',
                  }}
                >
                  STAGE DELIVERABLES
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentStage.deliverables.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '10px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#111827',
                      }}
                    >
                      <span style={{ color: 'var(--color-secondary-green)', fontWeight: 800 }}>✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Deep-Dive Telemetry Strip for Selected Stage */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--color-primary-blue)',
                backgroundColor: 'rgba(89, 139, 255, 0.1)',
                padding: '4px 10px',
                borderRadius: '6px',
              }}
            >
              STAGE {currentStage.step} OUTCOME
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>
              {currentStage.keyOutcome}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', color: '#6B7280' }}>
              Next Phase:
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111827', fontFamily: 'var(--font-family-mono)' }}>
              {STAGES[(activeStep + 1) % STAGES.length].step} {STAGES[(activeStep + 1) % STAGES.length].name} →
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};
