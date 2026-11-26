'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { ArrowRight } from '../icons';
import { servicesData } from '../../config/services';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';

initGSAP();

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All 9 Disciplines', count: 9 },
  { id: 'engineering', label: 'Software & Architecture', count: 5 },
  { id: 'ai', label: 'AI & Data Systems', count: 2 },
  { id: 'experience', label: 'Experience & Commerce', count: 2 },
];

export const HomeServicesSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        '.sb-services-header',
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

      const items = section.querySelectorAll('.sb-service-card-item');
      gsap.fromTo(
        items,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
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

  // Smooth Interactive Filter Transition on Category Switch
  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;
      const { gsap } = initGSAP();
      const section = sectionRef.current;
      if (!section) return;

      const items = section.querySelectorAll('.sb-service-card-item');
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0.5, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.28,
            stagger: 0.04,
            ease: ANIMATION_CONFIG.ease.smooth,
            clearProps: 'opacity,transform',
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [selectedFilter] }
  );

  const filteredServices = servicesData.filter((service) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'engineering') {
      return ['software-development', 'saas-development', 'cloud-integrations', 'api-integrations', 'security-quality'].includes(service.slug);
    }
    if (selectedFilter === 'ai') {
      return ['ai-automation', 'data-analytics'].includes(service.slug);
    }
    if (selectedFilter === 'experience') {
      return ['web-ecommerce', 'mobile-engineering'].includes(service.slug);
    }
    return true;
  });

  // Flagship featured service (e.g., Software Development or first in category)
  const flagshipService = filteredServices[0];
  const regularServices = filteredServices.slice(1);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 7rem)',
        position: 'relative',
      }}
    >
      <Container>
        {/* Editorial Section Header */}
        <div
          className="sb-services-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 'var(--space-6)',
            marginBottom: 'clamp(2.5rem, 4.5vw, 4rem)',
          }}
        >
          <div style={{ maxWidth: '700px' }}>
            <div style={{ display: 'inline-flex', marginBottom: '14px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  backgroundColor: '#F3F4F6',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-family-mono)',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary-blue)' }} />
                03 // SPECIALIZED DISCIPLINES
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(2.15rem, 3.8vw, 3.2rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: '#000000',
                margin: '0 0 14px 0',
              }}
            >
              Engineering depth. Digital craft.
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
                lineHeight: 1.62,
                color: '#4B5563',
                margin: 0,
              }}
            >
              We architect, engineer, and support mission-critical digital systems. From zero-to-one product acceleration to enterprise modernization.
            </p>
          </div>

          {/* Accessible Filter Pills with Counts */}
          <div
            role="radiogroup"
            aria-label="Filter Services By Category"
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            {CATEGORY_FILTERS.map((filter) => {
              const isSelected = selectedFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedFilter(filter.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '999px',
                    border: isSelected ? '1px solid #000000' : '1px solid #E5E7EB',
                    backgroundColor: isSelected ? '#000000' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#4B5563',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{filter.label}</span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-family-mono)',
                      color: isSelected ? 'var(--color-primary-blue)' : '#9CA3AF',
                    }}
                  >
                    ({filter.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetrical Varied Composition Grid */}
        <div ref={gridRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 1. Flagship Anchor Card (High-Impact Hero Format) */}
          {flagshipService && (
            <div
              className="sb-service-card-item"
              style={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid #1E293B',
                padding: 'clamp(2rem, 4vw, 3.5rem)',
                boxShadow: '0 24px 60px -15px rgba(0, 0, 0, 0.25)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
                gap: 'clamp(2rem, 4vw, 3.5rem)',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle Ambient Radial Lighting */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '320px',
                  height: '320px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(89, 139, 255, 0.2) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  pointerEvents: 'none',
                }}
              />

              {/* Left Column: Flagship Narrative */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: 'var(--color-primary-blue)',
                    }}
                  >
                    01 // FLAGSHIP ENGINEERING
                  </span>
                  <span style={{ color: '#475569' }}>•</span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-family-mono)',
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {flagshipService.kicker}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: 'clamp(1.75rem, 3vw, 2.45rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.2,
                    marginBottom: '14px',
                    color: '#FFFFFF',
                  }}
                >
                  <Link
                    href={`/services/${flagshipService.slug}`}
                    style={{ textDecoration: 'none', color: '#FFFFFF', transition: 'color 180ms ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#598BFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  >
                    {flagshipService.title}
                  </Link>
                </h3>

                <p
                  style={{
                    fontSize: '1.05rem',
                    color: '#94A3B8',
                    lineHeight: 1.65,
                    marginBottom: '28px',
                    maxWidth: '560px',
                  }}
                >
                  {flagshipService.shortDescription}
                </p>

                <Link
                  href={`/services/${flagshipService.slug}`}
                  className="sb-btn sb-btn--md sb-btn--primary"
                  style={{ textDecoration: 'none', width: 'fit-content' }}
                >
                  <span>Explore Architecture &amp; Methodology</span>
                  <ArrowRight size={14} className="sb-btn__arrow" />
                </Link>
              </div>

              {/* Right Column: Architectural Deliverables Matrix */}
              <div
                style={{
                  backgroundColor: 'rgba(10, 15, 29, 0.72)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(89, 139, 255, 0.22)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-family-mono)', color: 'var(--color-primary-blue)', fontWeight: 700 }}>
                    // CORE DELIVERABLES
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-secondary-green)', fontFamily: 'var(--font-family-mono)', fontWeight: 600 }}>
                    PRODUCTION READY
                  </span>
                </div>

                {flagshipService.deliverables.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.875rem',
                      color: '#E2E8F0',
                      padding: '8px 12px',
                      backgroundColor: '#0F172A',
                      borderRadius: '8px',
                      border: '1px solid #1E293B',
                    }}
                  >
                    <span style={{ color: 'var(--color-secondary-green)', fontWeight: 'bold' }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Varied Asymmetric Grid for Remaining Disciplines */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '20px',
            }}
          >
            {regularServices.map((service, index) => {
              const globalIndex = servicesData.indexOf(service) + 1;
              const useSubtleGlass = index % 3 === 0 || index % 3 === 2;
              const accentColor = index % 2 === 0 ? '#598BFF' : '#02C415';

              return (
                <div
                  key={service.slug}
                  className={`sb-service-card-item ${useSubtleGlass ? 'sb-glass-service' : ''}`}
                  style={{
                    backgroundColor: useSubtleGlass ? undefined : '#FAFAFA',
                    border: useSubtleGlass ? undefined : '1px solid #E5E7EB',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = accentColor;
                    if (!useSubtleGlass) {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }
                    e.currentTarget.style.boxShadow =
                      accentColor === '#02C415'
                        ? '0 16px 36px -10px rgba(2, 196, 21, 0.14)'
                        : '0 16px 36px -10px rgba(89, 139, 255, 0.16)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = useSubtleGlass ? 'rgba(15, 23, 42, 0.08)' : '#E5E7EB';
                    if (!useSubtleGlass) {
                      e.currentTarget.style.backgroundColor = '#FAFAFA';
                    }
                    e.currentTarget.style.boxShadow = useSubtleGlass
                      ? '0 8px 24px -10px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.85)'
                      : 'none';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <div>
                    {/* Header: Number and Kicker */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-family-mono)',
                          fontSize: '0.85rem',
                          fontWeight: 800,
                          color: accentColor === '#02C415' ? '#048A10' : 'var(--color-primary-blue)',
                        }}
                      >
                        0{globalIndex}
                      </span>
                      <span
                        className="sb-glass-meta--light"
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-family-mono)',
                          fontWeight: 600,
                          color: '#374151',
                          padding: '3px 10px',
                          borderRadius: '999px',
                        }}
                      >
                        {service.kicker}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-family-heading)',
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        lineHeight: 1.25,
                        marginBottom: '10px',
                      }}
                    >
                      <Link
                        href={`/services/${service.slug}`}
                        style={{
                          textDecoration: 'none',
                          color: '#000000',
                          transition: 'color 180ms ease',
                        }}
                      >
                        {service.title}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '0.925rem',
                        color: '#4B5563',
                        lineHeight: 1.6,
                        marginBottom: '20px',
                      }}
                    >
                      {service.shortDescription}
                    </p>

                    {/* Deliverables Preview Tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        marginBottom: '22px',
                        paddingTop: '14px',
                        borderTop: '1px solid #EFEFEF',
                      }}
                    >
                      {service.deliverables.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          style={{
                            fontSize: '0.8rem',
                            color: '#374151',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <span style={{ color: 'var(--color-secondary-green)', fontWeight: 'bold' }}>✓</span>
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <Link
                    href={`/services/${service.slug}`}
                    style={{
                      fontFamily: 'var(--font-family-body)',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: 'var(--color-primary-blue)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      textDecoration: 'none',
                    }}
                    className="sb-link-arrow"
                  >
                    <span>Explore Architecture &amp; Scope</span>
                    <ArrowRight size={14} className="sb-btn__arrow" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
