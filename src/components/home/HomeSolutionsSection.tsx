'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
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
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Drag-to-scroll state
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeftStart = useRef<number>(0);

  // Compute filtered solutions based on selected category tab
  const filteredSolutions = useMemo(() => {
    const allowedSlugs = CATEGORY_MAP[activeCategory];
    return solutionsData.filter((s) => allowedSlugs.includes(s.slug));
  }, [activeCategory]);

  // When category changes, reset scroll position smoothly
  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category);
    setActiveCardIndex(1);
    setScrollProgress(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Track horizontal scroll progress and active card indicator
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      setActiveCardIndex(1);
      return;
    }

    const currentScroll = track.scrollLeft;
    const progress = Math.min(100, Math.max(0, (currentScroll / maxScroll) * 100));
    setScrollProgress(progress);

    // Approximate active card index based on card width
    const cardElement = track.querySelector('.sb-solutions-hcard') as HTMLElement | null;
    const cardWidth = cardElement ? cardElement.offsetWidth + 22 : 360;
    const calculatedIndex = Math.min(
      filteredSolutions.length,
      Math.max(1, Math.round(currentScroll / cardWidth) + 1)
    );
    setActiveCardIndex(calculatedIndex);
  }, [filteredSolutions.length]);

  // Mouse wheel horizontal mapping: rolling mouse wheel glides horizontally
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    // Ignore horizontal trackpad swipes (allow native handling)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    if (Math.abs(e.deltaY) < 6) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;

    const currentScroll = track.scrollLeft;

    // Scrolling down (move track right)
    if (e.deltaY > 0) {
      if (currentScroll < maxScroll - 8) {
        e.preventDefault();
        track.scrollLeft += e.deltaY * 1.15;
      }
      // If at rightmost edge, allow normal page scroll down
    } else {
      // Scrolling up (move track left)
      if (currentScroll > 8) {
        e.preventDefault();
        track.scrollLeft += e.deltaY * 1.15;
      }
      // If at leftmost edge, allow normal page scroll up
    }
  };

  // Mouse Drag to scroll
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    isDragging.current = true;
    startX.current = e.pageX - track.offsetLeft;
    scrollLeftStart.current = track.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    trackRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Stepper Buttons
  const scrollStep = (direction: 'prev' | 'next') => {
    const track = trackRef.current;
    if (!track) return;

    const cardElement = track.querySelector('.sb-solutions-hcard') as HTMLElement | null;
    const scrollAmount = cardElement ? cardElement.offsetWidth + 22 : 380;

    track.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

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

        {/* Top Control Bar: Category Filters & Stepper Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          {/* Domain Filter Pills */}
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
                      fontSize: '0.72rem',
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

          {/* Stepper Controls & Counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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
              <span className="sb-hide-mobile">Scroll mouse wheel or drag</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-family-mono)',
                  color: '#9CA3AF',
                  fontWeight: 700,
                  marginRight: '4px',
                }}
              >
                {String(activeCardIndex).padStart(2, '0')} / {String(filteredSolutions.length).padStart(2, '0')}
              </span>

              <button
                type="button"
                onClick={() => scrollStep('prev')}
                disabled={activeCardIndex <= 1}
                className="sb-solutions-nav-btn"
                title="Scroll previous cards"
                aria-label="Previous cards"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollStep('next')}
                disabled={activeCardIndex >= filteredSolutions.length}
                className="sb-solutions-nav-btn"
                title="Scroll next cards"
                aria-label="Next cards"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Luminous Horizontal Scroll Progress Track */}
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '999px',
            marginBottom: '28px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.max(8, scrollProgress)}%`,
              backgroundColor: 'var(--color-primary-blue)',
              boxShadow: '0 0 10px rgba(89, 139, 255, 0.8)',
              transition: 'width 140ms ease-out',
            }}
          />
        </div>

        {/* Horizontal Card Stream Track with Smooth Mouse-Wheel Glide */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="sb-solutions-hstream"
        >
          {filteredSolutions.map((sol) => {
            const globalIndex = solutionsData.findIndex((s) => s.slug === sol.slug);

            return (
              <article
                key={sol.slug}
                className="sb-solutions-hcard"
              >
                {/* Top Section: Telemetry, Domain, and Headline */}
                <div>
                  {/* Top Status Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-family-mono)',
                          fontSize: '0.85rem',
                          fontWeight: 800,
                          color: 'var(--color-primary-blue)',
                          backgroundColor: 'rgba(89, 139, 255, 0.12)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: '1px solid rgba(89, 139, 255, 0.25)',
                        }}
                      >
                        {String(globalIndex + 1).padStart(2, '0')}
                      </span>

                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: '#9CA3AF',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        {sol.category}
                      </span>
                    </div>

                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <span className="sb-solutions-beacon" />
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-family-mono)',
                          color: '#02C415',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                        }}
                      >
                        DEPLOYABLE
                      </span>
                    </div>
                  </div>

                  {/* Kicker */}
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-family-mono)',
                      color: 'var(--color-primary-blue)',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    {sol.kicker}
                  </div>

                  {/* Solution Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-family-heading)',
                      fontSize: 'clamp(1.2rem, 1.8vw, 1.45rem)',
                      fontWeight: 700,
                      lineHeight: 1.25,
                      color: '#FFFFFF',
                      marginBottom: '10px',
                    }}
                  >
                    {sol.title}
                  </h3>

                  {/* Architectural Headline */}
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#D1D5DB',
                      lineHeight: 1.5,
                      marginBottom: '16px',
                    }}
                  >
                    {sol.headline}
                  </p>

                  {/* Operational Friction Callout */}
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      borderLeft: '3px solid #F59E0B',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      marginBottom: '16px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-family-mono)',
                        color: '#F59E0B',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        marginBottom: '3px',
                      }}
                    >
                      OPERATIONAL FRICTION
                    </div>
                    <div
                      style={{
                        fontSize: '0.8rem',
                        color: '#9CA3AF',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {sol.problemStatement}
                    </div>
                  </div>

                  {/* Measurable Enterprise Outcomes Ribbon */}
                  {sol.outcomes && sol.outcomes.length > 0 && (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '8px',
                        marginBottom: '16px',
                      }}
                    >
                      {sol.outcomes.slice(0, 2).map((outcome) => (
                        <div
                          key={outcome.label}
                          style={{
                            backgroundColor: 'rgba(89, 139, 255, 0.05)',
                            border: '1px solid rgba(89, 139, 255, 0.18)',
                            borderRadius: '8px',
                            padding: '8px 10px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '1.1rem',
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
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              color: '#FFFFFF',
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em',
                              marginTop: '2px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {outcome.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Capabilities Tags */}
                  <div style={{ marginBottom: '18px' }}>
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
                      KEY CAPABILITIES:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {sol.capabilities.slice(0, 3).map((cap) => (
                        <span
                          key={cap.title}
                          style={{
                            fontSize: '0.72rem',
                            color: '#D1D5DB',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          {cap.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Action Footer */}
                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="sb-btn sb-btn--sm sb-btn--primary"
                    style={{ textDecoration: 'none', width: '100%', justifyContent: 'center' }}
                  >
                    <span>View Architectural Solution</span>
                    <ArrowRight size={13} className="sb-btn__arrow" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Global Bottom Link */}
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
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
          >
            <span>Explore All 10 Solutions in Architecture Index</span>
            <span>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
};
