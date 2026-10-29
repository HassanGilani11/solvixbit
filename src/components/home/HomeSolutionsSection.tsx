'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
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

export const HomeSolutionsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeSlug, setActiveSlug] = useState<string>(solutionsData[0]?.slug || 'enterprise-scale');
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastWheelTime = useRef<number>(0);

  // Compute filtered solutions based on selected category tab
  const filteredSolutions = useMemo(() => {
    const allowedSlugs = CATEGORY_MAP[activeCategory];
    return solutionsData.filter((s) => allowedSlugs.includes(s.slug));
  }, [activeCategory]);

  // When category changes, ensure activeSlug is valid in this filter
  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category);
    const allowedSlugs = CATEGORY_MAP[category];
    if (!allowedSlugs.includes(activeSlug)) {
      const firstInGroup = solutionsData.find((s) => allowedSlugs.includes(s.slug));
      if (firstInGroup) {
        setActiveSlug(firstInGroup.slug);
      }
    }
  };

  const activeSolution = solutionsData.find((s) => s.slug === activeSlug) || filteredSolutions[0] || solutionsData[0];
  const currentIndex = filteredSolutions.findIndex((s) => s.slug === activeSlug);
  const totalInFilter = filteredSolutions.length;
  const globalIndex = solutionsData.findIndex((s) => s.slug === activeSlug);

  // Auto-scroll active item into comfortable view in the left rail
  useEffect(() => {
    const el = itemRefs.current[activeSlug];
    if (el && listRef.current) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeSlug]);

  // Mouse Wheel navigation: scroll up/down cycles solutions smoothly
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Ignore minor mouse jitter
    if (Math.abs(e.deltaY) < 16) return;

    const now = Date.now();
    const WHEEL_COOLDOWN = 220; // ms

    if (e.deltaY > 0) {
      // Scrolling DOWN
      if (currentIndex < filteredSolutions.length - 1) {
        e.preventDefault();
        if (now - lastWheelTime.current > WHEEL_COOLDOWN) {
          lastWheelTime.current = now;
          setActiveSlug(filteredSolutions[currentIndex + 1].slug);
        }
      }
      // If at last solution, do not preventDefault -> natural page scroll down continues
    } else {
      // Scrolling UP
      if (currentIndex > 0) {
        e.preventDefault();
        if (now - lastWheelTime.current > WHEEL_COOLDOWN) {
          lastWheelTime.current = now;
          setActiveSlug(filteredSolutions[currentIndex - 1].slug);
        }
      }
      // If at first solution, do not preventDefault -> natural page scroll up continues
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      if (currentIndex < filteredSolutions.length - 1) {
        e.preventDefault();
        setActiveSlug(filteredSolutions[currentIndex + 1].slug);
      }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      if (currentIndex > 0) {
        e.preventDefault();
        setActiveSlug(filteredSolutions[currentIndex - 1].slug);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveSlug(filteredSolutions[currentIndex - 1].slug);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredSolutions.length - 1) {
      setActiveSlug(filteredSolutions[currentIndex + 1].slug);
    } else {
      // Loop back to first item if at end
      setActiveSlug(filteredSolutions[0].slug);
    }
  };

  // GSAP entrance animation
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
    },
    { scope: sectionRef }
  );

  const filterOptions: FilterOption[] = [
    { id: 'all', label: 'All Solutions', count: 10 },
    { id: 'architecture', label: 'Architecture & Cloud', count: 4 },
    { id: 'ai-data', label: 'AI & Data Intelligence', count: 2 },
    { id: 'product-commerce', label: 'Product & Commerce', count: 4 },
  ];

  return (
    <section
      ref={sectionRef}
      id="solutions"
      style={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        borderBottom: '1px solid #222222',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 7rem)',
        position: 'relative',
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
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
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
              04 // STRATEGIC BUSINESS SOLUTIONS
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
              color: '#A0A0A0',
              margin: 0,
            }}
          >
            Explore how we map deep engineering capabilities directly to real-world business challenges across 10 strategic domains.
          </p>
        </div>

        {/* Category Filter Pills & Interaction Hint Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap',
          }}
        >
          {/* Domain Filter Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {filterOptions.map((opt) => {
              const isSelected = activeCategory === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleCategoryChange(opt.id)}
                  className={`sb-solutions-pill-filter ${isSelected ? 'is-active' : ''}`}
                >
                  <span>{opt.label}</span>
                  <span
                    style={{
                      marginLeft: '6px',
                      fontSize: '0.7rem',
                      opacity: isSelected ? 1 : 0.6,
                      fontFamily: 'var(--font-family-mono)',
                    }}
                  >
                    ({opt.count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mouse Scroll / Keyboard Hint */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              color: '#8A93A0',
              fontFamily: 'var(--font-family-mono)',
            }}
          >
            <span style={{ color: 'var(--color-primary-blue)' }}>✦</span>
            <span>Scroll mouse wheel or click to navigate</span>
          </div>
        </div>

        {/* Interactive Split-Screen Solution Explorer */}
        <div
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            alignItems: 'start',
            outline: 'none',
          }}
        >
          {/* Left Column: Solution Selector Rail with Custom Smooth Scroll */}
          <div
            ref={listRef}
            className="sb-solutions-scroll-rail"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              maxHeight: '640px',
              overflowY: 'auto',
              paddingRight: '8px',
            }}
          >
            {filteredSolutions.map((sol) => {
              const isActive = sol.slug === activeSlug;
              const globalIdx = solutionsData.findIndex((s) => s.slug === sol.slug);

              return (
                <button
                  key={sol.slug}
                  ref={(el) => {
                    itemRefs.current[sol.slug] = el;
                  }}
                  type="button"
                  onClick={() => setActiveSlug(sol.slug)}
                  className={`sb-solutions-tab-item ${isActive ? 'is-active' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-family-mono)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: isActive ? 'var(--color-primary-blue)' : '#6B7280',
                        flexShrink: 0,
                      }}
                    >
                      {String(globalIdx + 1).padStart(2, '0')}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '0.92rem',
                          fontWeight: 700,
                          color: isActive ? '#FFFFFF' : '#D1D5DB',
                          lineHeight: 1.35,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {sol.title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.72rem',
                          color: isActive ? 'var(--color-primary-blue)' : '#6B7280',
                          fontFamily: 'var(--font-family-mono)',
                          marginTop: '3px',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {sol.kicker}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      color: isActive ? 'var(--color-primary-blue)' : '#4B5563',
                      fontSize: '1rem',
                      transform: isActive ? 'translateX(4px)' : 'none',
                      transition: 'transform 200ms ease, color 200ms ease',
                      flexShrink: 0,
                      marginLeft: '12px',
                    }}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Architecture Details Panel */}
          <div
            className="sb-solutions-card-panel"
            style={{
              padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              position: 'relative',
            }}
          >
            {/* Top Telemetry & Control Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '14px',
              }}
            >
              {/* Domain & Kicker Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-family-mono)',
                    color: 'var(--color-primary-blue)',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {activeSolution.kicker}
                </span>

                <span
                  style={{
                    fontSize: '0.72rem',
                    color: '#9CA3AF',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {activeSolution.category}
                </span>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span className="sb-solutions-beacon" />
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-family-mono)',
                      color: '#02C415',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                    }}
                  >
                    ACTIVE BLUEPRINT
                  </span>
                </div>
              </div>

              {/* Step Navigation Controls & Counter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-family-mono)',
                    color: '#9CA3AF',
                    fontWeight: 700,
                  }}
                >
                  {String(globalIndex + 1).padStart(2, '0')} / {String(solutionsData.length).padStart(2, '0')}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="sb-solutions-nav-btn"
                    title="Previous solution (Arrow Up)"
                    aria-label="Previous solution"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="sb-solutions-nav-btn"
                    title="Next solution (Arrow Down)"
                    aria-label="Next solution"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Glowing Linear Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '999px',
                marginBottom: '20px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${((currentIndex + 1) / totalInFilter) * 100}%`,
                  backgroundColor: 'var(--color-primary-blue)',
                  boxShadow: '0 0 10px rgba(89, 139, 255, 0.8)',
                  transition: 'width 260ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>

            {/* Headline */}
            <h3
              key={`headline-${activeSolution.slug}`}
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                fontWeight: 700,
                lineHeight: 1.25,
                color: '#FFFFFF',
                marginBottom: '14px',
              }}
            >
              {activeSolution.headline}
            </h3>

            {/* Problem Statement Callout */}
            <div
              key={`problem-${activeSolution.slug}`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderLeft: '3px solid #F59E0B',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-family-mono)',
                  color: '#F59E0B',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                OPERATIONAL FRICTION
              </div>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#D1D5DB',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {activeSolution.problemStatement}
              </p>
            </div>

            {/* Strategic Outcomes Metrics Ribbon */}
            {activeSolution.outcomes && activeSolution.outcomes.length > 0 && (
              <div style={{ marginBottom: '22px' }}>
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-family-mono)',
                    color: '#6B7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                  }}
                >
                  MEASURABLE ENTERPRISE OUTCOMES:
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '10px',
                  }}
                >
                  {activeSolution.outcomes.map((outcome) => (
                    <div
                      key={outcome.label}
                      style={{
                        backgroundColor: 'rgba(89, 139, 255, 0.05)',
                        border: '1px solid rgba(89, 139, 255, 0.2)',
                        borderRadius: '10px',
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
                      <div
                        style={{
                          fontSize: '0.7rem',
                          color: '#9CA3AF',
                          marginTop: '2px',
                          lineHeight: 1.3,
                        }}
                      >
                        {outcome.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Capabilities 2x2 Grid */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-family-mono)',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '10px',
                }}
              >
                ENGINEERING CAPABILITIES IN THIS SOLUTION:
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '10px',
                }}
              >
                {activeSolution.capabilities.slice(0, 4).map((cap) => (
                  <div
                    key={cap.title}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      borderRadius: '8px',
                      padding: '12px',
                      transition: 'border-color 180ms ease',
                    }}
                  >
                    <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '3px' }}>
                      {cap.title}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#9CA3AF', lineHeight: 1.4 }}>
                      {cap.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Footer */}
            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <Link
                  href={`/solutions/${activeSolution.slug}`}
                  className="sb-btn sb-btn--md sb-btn--primary"
                  style={{ textDecoration: 'none' }}
                >
                  <span>View Full Architectural Solution</span>
                  <ArrowRight size={14} className="sb-btn__arrow" />
                </Link>

                <button
                  type="button"
                  onClick={handleNext}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.825rem',
                    color: '#D1D5DB',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    cursor: 'pointer',
                    transition: 'all 180ms ease',
                  }}
                >
                  <span>Next Domain</span>
                  <span>→</span>
                </button>
              </div>

              <Link
                href="/solutions"
                style={{
                  fontSize: '0.825rem',
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color 180ms ease',
                }}
              >
                <span>All Solutions Index</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
