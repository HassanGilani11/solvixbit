'use client';

import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { ArrowRight } from '../icons';
import { solutionsData } from '../../config/solutions';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';

initGSAP();

type CategoryFilter = 'all' | 'architecture' | 'ai-data' | 'product-commerce';

interface FilterOption {
  id: CategoryFilter;
  label: string;
  count: number;
}

const CATEGORY_MAP: Record<CategoryFilter, string[]> = {
  all: solutionsData.map((s) => s.slug),
  architecture: [
    'enterprise-scale',
    'connected-systems-api-integration',
    'cloud-engineering-reliability',
    'application-security-quality',
  ],
  'ai-data': [
    'operational-automation',
    'data-intelligence-decision-systems',
  ],
  'product-commerce': [
    'startup-mvp',
    'high-conversion-commerce',
    'digital-experience-conversion',
    'b2b-portals-workflow-platforms',
  ],
};

const filterOptions: FilterOption[] = [
  { id: 'all', label: 'All Solutions', count: 10 },
  { id: 'architecture', label: 'Architecture & Cloud', count: 4 },
  { id: 'ai-data', label: 'AI & Data Intelligence', count: 2 },
  { id: 'product-commerce', label: 'Product & Commerce', count: 4 },
];

export const HomeSolutionsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedSlug, setSelectedSlug] = useState<string>(solutionsData[0].slug);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Compute filtered solutions based on selected category tab
  const filteredSolutions = useMemo(() => {
    const allowedSlugs = CATEGORY_MAP[activeCategory];
    return solutionsData.filter((s) => allowedSlugs.includes(s.slug));
  }, [activeCategory]);

  // If currently selected solution is not in the filtered category, auto-select the first one
  useEffect(() => {
    if (!filteredSolutions.some((s) => s.slug === selectedSlug)) {
      if (filteredSolutions.length > 0) {
        setSelectedSlug(filteredSolutions[0].slug);
      }
    }
  }, [filteredSolutions, selectedSlug]);

  const activeSolution = useMemo(() => {
    return solutionsData.find((s) => s.slug === selectedSlug) || filteredSolutions[0] || solutionsData[0];
  }, [selectedSlug, filteredSolutions]);

  const activeIndex = useMemo(() => {
    return filteredSolutions.findIndex((s) => s.slug === activeSolution.slug);
  }, [filteredSolutions, activeSolution.slug]);

  const globalIndex = useMemo(() => {
    return solutionsData.findIndex((s) => s.slug === activeSolution.slug);
  }, [activeSolution.slug]);

  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category);
    const newFiltered = solutionsData.filter((s) => CATEGORY_MAP[category].includes(s.slug));
    if (newFiltered.length > 0) {
      setSelectedSlug(newFiltered[0].slug);
    }
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevSolution = useCallback(() => {
    if (activeIndex > 0) {
      setSelectedSlug(filteredSolutions[activeIndex - 1].slug);
    }
  }, [activeIndex, filteredSolutions]);

  const handleNextSolution = useCallback(() => {
    if (activeIndex < filteredSolutions.length - 1) {
      setSelectedSlug(filteredSolutions[activeIndex + 1].slug);
    }
  }, [activeIndex, filteredSolutions]);

  // GSAP Entrance
  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        '.sb-solutions-header',
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

      gsap.fromTo(
        '.sb-solutions-navigator',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
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

  // Smooth Interactive Transition when Solution Selection changes
  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;
      const { gsap } = initGSAP();
      const section = sectionRef.current;
      if (!section) return;

      const detailCard = section.querySelector('.sb-solutions-detail-card');
      if (detailCard) {
        gsap.fromTo(
          detailCard,
          { opacity: 0.65, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.28,
            ease: ANIMATION_CONFIG.ease.smooth,
            clearProps: 'opacity,transform',
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [selectedSlug] }
  );

  return (
    <section
      ref={sectionRef}
      id="solutions"
      style={{
        backgroundColor: '#090D16',
        color: '#FFFFFF',
        borderBottom: '1px solid #1A2234',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container>
        {/* Section Header */}
        <div className="sb-solutions-header" style={{ maxWidth: '820px', marginBottom: 'clamp(2rem, 3.5vw, 3rem)' }}>
          <div style={{ display: 'inline-flex', marginBottom: '14px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: 'rgba(89, 139, 255, 0.1)',
                border: '1px solid rgba(89, 139, 255, 0.25)',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary-blue)' }} />
              05 // STRATEGIC BUSINESS SOLUTIONS
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'clamp(2rem, 3.8vw, 3.1rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: '#FFFFFF',
              margin: '0 0 14px 0',
            }}
          >
            Turning operational friction into competitive advantage.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              lineHeight: 1.6,
              color: '#9CA3AF',
              margin: 0,
            }}
          >
            Explore how we map deep engineering capabilities directly to real-world business challenges across 10 strategic domains.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}
        >
          {/* Filter Pills */}
          <div
            role="tablist"
            aria-label="Solution Categories"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}
          >
            {filterOptions.map((opt) => {
              const isSelected = activeCategory === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCategoryChange(opt.id)}
                  className={`sb-solutions-pill-filter ${isSelected ? 'is-active' : ''}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '999px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 180ms ease',
                    border: isSelected ? '1px solid #598BFF' : '1px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: isSelected ? 'rgba(89, 139, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    color: isSelected ? '#FFFFFF' : '#9CA3AF',
                  }}
                >
                  <span>{opt.label}</span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-family-mono)',
                      opacity: isSelected ? 1 : 0.6,
                      color: isSelected ? '#598BFF' : 'inherit',
                    }}
                  >
                    ({opt.count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stepper Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontFamily: 'var(--font-family-mono)',
                color: '#8A93A0',
                fontWeight: 700,
              }}
            >
              {String(activeIndex + 1).padStart(2, '0')} / {String(filteredSolutions.length).padStart(2, '0')}
            </span>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={handlePrevSolution}
                disabled={activeIndex <= 0}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: activeIndex <= 0 ? 'rgba(255, 255, 255, 0.25)' : '#FFFFFF',
                  cursor: activeIndex <= 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  transition: 'background-color 150ms ease',
                }}
                title="Previous solution"
                aria-label="Previous solution"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNextSolution}
                disabled={activeIndex >= filteredSolutions.length - 1}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: activeIndex >= filteredSolutions.length - 1 ? 'rgba(255, 255, 255, 0.25)' : '#FFFFFF',
                  cursor: activeIndex >= filteredSolutions.length - 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  transition: 'background-color 150ms ease',
                }}
                title="Next solution"
                aria-label="Next solution"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Split-Screen Solution Architecture Navigator */}
        <div
          className="sb-solutions-navigator"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 380px) 1fr',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Solution Selector Rail */}
          <div
            ref={listRef}
            style={{
              backgroundColor: '#0F1524',
              border: '1px solid #1E283D',
              borderRadius: '16px',
              padding: '12px',
              maxHeight: '620px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {filteredSolutions.map((sol) => {
              const isCurrent = sol.slug === activeSolution.slug;
              const gIdx = solutionsData.findIndex((s) => s.slug === sol.slug);

              return (
                <button
                  key={sol.slug}
                  type="button"
                  onClick={() => setSelectedSlug(sol.slug)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: isCurrent ? '1px solid rgba(89, 139, 255, 0.5)' : '1px solid transparent',
                    backgroundColor: isCurrent ? 'rgba(89, 139, 255, 0.12)' : 'transparent',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 160ms ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {isCurrent && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '0',
                        top: '12px',
                        bottom: '12px',
                        width: '3px',
                        backgroundColor: '#598BFF',
                        borderRadius: '0 4px 4px 0',
                        boxShadow: '0 0 8px #598BFF',
                      }}
                    />
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-family-mono)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: isCurrent ? '#598BFF' : '#6B7280',
                        }}
                      >
                        {String(gIdx + 1).padStart(2, '0')}
                      </span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-family-mono)',
                          color: isCurrent ? '#93C5FD' : '#9CA3AF',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {sol.kicker}
                      </span>
                    </div>

                    {isCurrent && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#02C415',
                          boxShadow: '0 0 6px #02C415',
                        }}
                      />
                    )}
                  </div>

                  <div
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: isCurrent ? 700 : 600,
                      color: isCurrent ? '#FFFFFF' : '#D1D5DB',
                      lineHeight: 1.3,
                    }}
                  >
                    {sol.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Architectural Blueprint Detail Card */}
          <div
            className="sb-solutions-detail-card"
            style={{
              backgroundColor: '#0D1321',
              border: '1px solid #1E283D',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ambient Background Accent */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(89, 139, 255, 0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Top Meta Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '18px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: '#598BFF',
                    backgroundColor: 'rgba(89, 139, 255, 0.12)',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(89, 139, 255, 0.25)',
                  }}
                >
                  SPEC // {String(globalIndex + 1).padStart(2, '0')}
                </span>

                <span
                  style={{
                    fontSize: '0.72rem',
                    color: '#9CA3AF',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    padding: '3px 12px',
                    borderRadius: '999px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {activeSolution.category}
                </span>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#02C415',
                    boxShadow: '0 0 8px #02C415',
                    animation: 'sb-beacon-pulse 2s infinite ease-in-out',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-family-mono)',
                    color: '#02C415',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}
                >
                  ACTIVE ARCHITECTURE
                </span>
              </div>
            </div>

            {/* Kicker */}
            <div
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-family-mono)',
                color: '#598BFF',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '8px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {activeSolution.kicker}
            </div>

            {/* Solution Title */}
            <h3
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                color: '#FFFFFF',
                marginBottom: '12px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {activeSolution.title}
            </h3>

            {/* Headline */}
            <p
              style={{
                fontSize: '1rem',
                color: '#D1D5DB',
                lineHeight: 1.55,
                marginBottom: '20px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {activeSolution.headline}
            </p>

            {/* Problem Statement / Operational Friction Box */}
            <div
              style={{
                backgroundColor: 'rgba(245, 158, 11, 0.06)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderLeft: '4px solid #F59E0B',
                borderRadius: '8px',
                padding: '14px 16px',
                marginBottom: '20px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-family-mono)',
                  color: '#F59E0B',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                OPERATIONAL FRICTION DIAGNOSED
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  color: '#E5E7EB',
                  lineHeight: 1.5,
                }}
              >
                {activeSolution.problemStatement}
              </div>
            </div>

            {/* Engineering Approach */}
            <div style={{ marginBottom: '20px', position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-family-mono)',
                  color: '#598BFF',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                ENGINEERING ARCHITECTURE & METHODOLOGY
              </div>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#9CA3AF',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {activeSolution.approach}
              </p>
            </div>

            {/* Measurable Enterprise Outcomes Ribbon */}
            {activeSolution.outcomes && activeSolution.outcomes.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '12px',
                  marginBottom: '22px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {activeSolution.outcomes.slice(0, 3).map((outcome) => (
                  <div
                    key={outcome.label}
                    style={{
                      backgroundColor: 'rgba(89, 139, 255, 0.06)',
                      border: '1px solid rgba(89, 139, 255, 0.18)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: '#598BFF',
                        fontFamily: 'var(--font-family-mono)',
                        lineHeight: 1.1,
                      }}
                    >
                      {outcome.value}
                    </div>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        marginTop: '3px',
                      }}
                    >
                      {outcome.label}
                    </div>
                    {outcome.description && (
                      <div
                        style={{
                          fontSize: '0.68rem',
                          color: '#9CA3AF',
                          marginTop: '2px',
                          lineHeight: 1.3,
                        }}
                      >
                        {outcome.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Core Capabilities */}
            <div style={{ marginBottom: '24px', position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-family-mono)',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '8px',
                }}
              >
                DEPLOYABLE CAPABILITIES:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {activeSolution.capabilities.map((cap) => (
                  <span
                    key={cap.title}
                    style={{
                      fontSize: '0.75rem',
                      color: '#E5E7EB',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                    }}
                  >
                    {cap.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div
              style={{
                borderTop: '1px solid #1E283D',
                paddingTop: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Link
                href={`/solutions/${activeSolution.slug}`}
                className="sb-btn sb-btn--md sb-btn--primary"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>View Full Architectural Solution & Case Study</span>
                <ArrowRight size={14} className="sb-btn__arrow" />
              </Link>

              <Link
                href="/solutions"
                style={{
                  fontSize: '0.85rem',
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color 180ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#598BFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
              >
                <span>Explore All 10 Solutions</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
