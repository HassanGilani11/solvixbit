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
  deliverables: string[];
}

const STAGES: ProcessStage[] = [
  {
    step: '01',
    name: 'Discover',
    subtitle: 'System & Problem Diagnosis',
    description: 'We audit root technical constraints, existing data flows, and commercial goals before prescribing solutions.',
    deliverables: ['Technical Dependency Map', 'Architecture Health Audit', 'Scope & Milestone Roadmap'],
  },
  {
    step: '02',
    name: 'Design',
    subtitle: 'Interface Craft & Schema Modeling',
    description: 'We design high-fidelity user experiences and system data schemas in parallel so design and engineering align seamlessly.',
    deliverables: ['Design System Tokens', 'Clickable Prototype', 'Database & API Contracts'],
  },
  {
    step: '03',
    name: 'Build',
    subtitle: 'Rigorous Software Engineering',
    description: 'Disciplined sprint-based development with strict type-safety, automated tests, clean component boundaries, and peer code reviews.',
    deliverables: ['Type-Safe Codebase', 'Automated Test Suites', 'Staging Testbed & Preview Deploys'],
  },
  {
    step: '04',
    name: 'Launch',
    subtitle: 'Zero-Downtime Deployment',
    description: 'Automated CI/CD pipelines, security hardening, canary traffic releases, and live telemetry observability.',
    deliverables: ['CI/CD Pipeline', 'Security & OWASP Audit', 'Live Production Cutover'],
  },
  {
    step: '05',
    name: 'Scale',
    subtitle: 'Continuous Telemetry & Expansion',
    description: 'Proactive performance monitoring, latency reduction, and iterative feature development as business volume grows.',
    deliverables: ['Telemetry Dashboards', 'Sub-Second Optimization', 'Ongoing Architectural Advisory'],
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
            start: 'top 85%',
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

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
      }}
    >
      <Container>
        {/* Section Header */}
        <div className="sb-process-header" style={{ maxWidth: '780px', marginBottom: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
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
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-secondary-green)' }} />
              06 // DELIVERY DISCIPLINE
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'clamp(2rem, 3.5vw, 2.85rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: '#000000',
              margin: '0 0 12px 0',
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
            Predictable sprint delivery without bureaucratic overhead. We keep stakeholders directly connected to architecture and product execution.
          </p>
        </div>

        {/* Connected Visual Journey Progression */}
        <div
          className="sb-process-timeline-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: 'var(--space-6)',
            position: 'relative',
          }}
        >
          {STAGES.map((stage, idx) => {
            const isCurrent = idx === activeStep;
            return (
              <div
                key={stage.step}
                className="sb-process-step-card"
                onClick={() => setActiveStep(idx)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: isCurrent ? '2px solid var(--color-primary-blue)' : '1px solid #E5E7EB',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  position: 'relative',
                  boxShadow: isCurrent ? '0 12px 28px -6px rgba(89, 139, 255, 0.2)' : '0 2px 6px rgba(0, 0, 0, 0.02)',
                }}
              >
                {/* Step indicator */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '14px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: isCurrent ? 'var(--color-primary-blue)' : '#9E9E9E',
                    }}
                  >
                    {stage.step}
                  </span>
                  {idx < STAGES.length - 1 && (
                    <span style={{ color: '#D1D5DB', fontSize: '1rem' }}>→</span>
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#000000',
                    marginBottom: '4px',
                  }}
                >
                  {stage.name}
                </h3>

                <div
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-family-mono)',
                    color: 'var(--color-primary-blue)',
                    marginBottom: '10px',
                    fontWeight: 600,
                  }}
                >
                  {stage.subtitle}
                </div>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: '#4B5563',
                    lineHeight: 1.55,
                    marginBottom: '16px',
                    flexGrow: 1,
                  }}
                >
                  {stage.description}
                </p>

                {/* Key Deliverables */}
                <div
                  style={{
                    borderTop: '1px solid #F3F4F6',
                    paddingTop: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  {stage.deliverables.map((item) => (
                    <span
                      key={item}
                      style={{
                        fontSize: '0.72rem',
                        color: '#6B7280',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span style={{ color: 'var(--color-secondary-green)' }}>✓</span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
