'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<{ scroll: (pos?: number) => number } | null>(null);

  const filteredSolutions = useMemo(() => {
    const allowedSlugs = CATEGORY_MAP[activeCategory];
    return solutionsData.filter((s) => allowedSlugs.includes(s.slug));
  }, [activeCategory]);

  // Reset active card on category change
  useEffect(() => {
    setActiveCardIdx(0);
    setScrollProgress(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeCategory]);

  // GSAP Horizontal ScrollTrigger on desktop (>= 1024px)
  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap, ScrollTrigger } = initGSAP();
      const pinWrapper = pinWrapperRef.current;
      const track = trackRef.current;
      if (!pinWrapper || !track) return;

      // Header reveal
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
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        gsap.set(track, { x: 0 });
        const getScrollAmount = () => {
          const distance = track.scrollWidth - window.innerWidth + 120;
          return Math.max(0, distance);
        };

        const totalDist = getScrollAmount();
        if (totalDist <= 0) return;

        const tween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinWrapper,
            pin: true,
            scrub: 0.85,
            start: 'top 76px',
            end: () => `+=${getScrollAmount()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
              const idx = Math.min(
                filteredSolutions.length - 1,
                Math.floor(self.progress * filteredSolutions.length)
              );
              setActiveCardIdx(Math.max(0, idx));
            },
          },
        });

        scrollTriggerRef.current = tween.scrollTrigger as unknown as { scroll: (pos?: number) => number };

        return () => {
          tween.kill();
          scrollTriggerRef.current = null;
        };
      });

      return () => {
        mm.revert();
        ScrollTrigger?.refresh();
      };
    },
    { scope: sectionRef, dependencies: [activeCategory, filteredSolutions.length] }
  );

  // Mobile/Tablet native horizontal scroll listener
  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track || window.innerWidth >= 1024) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;
    const prog = track.scrollLeft / maxScroll;
    setScrollProgress(prog);
    const idx = Math.min(
      filteredSolutions.length - 1,
      Math.floor(prog * filteredSolutions.length)
    );
    setActiveCardIdx(Math.max(0, idx));
  };

  const handleStep = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const targetIdx = Math.max(0, Math.min(filteredSolutions.length - 1, activeCardIdx + direction));
    const ratio = filteredSolutions.length > 1 ? targetIdx / (filteredSolutions.length - 1) : 0;

    if (window.innerWidth >= 1024 && scrollTriggerRef.current) {
      const st = scrollTriggerRef.current as unknown as { start: number; end: number };
      if (typeof st.start === 'number' && typeof st.end === 'number') {
        const targetScroll = st.start + (st.end - st.start) * ratio;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        return;
      }
    }

    const maxScroll = track.scrollWidth - track.clientWidth;
    track.scrollTo({ left: maxScroll * ratio, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="solutions"
      style={{
        backgroundColor: '#050A14',
        color: '#FFFFFF',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Ambient Radial Glows */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '8%',
          left: '10%',
          width: '460px',
          height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(89, 139, 255, 0.12) 0%, transparent 65%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '8%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(2, 196, 21, 0.08) 0%, transparent 65%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Pinned Wrapper for Desktop Horizontal Scroll */}
      <div
        ref={pinWrapperRef}
        style={{
          minHeight: 'calc(100vh - 76px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'clamp(1.75rem, 3vw, 2.5rem)',
          paddingBottom: 'clamp(1.5rem, 2.5vw, 2.25rem)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container>
          {/* Section Header */}
          <div
            className="sb-solutions-header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            <div style={{ maxWidth: '760px' }}>
              <div style={{ display: 'inline-flex', marginBottom: '8px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '5px 12px',
                    backgroundColor: 'rgba(89, 139, 255, 0.1)',
                    border: '1px solid rgba(89, 139, 255, 0.28)',
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#BFDBFE',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-family-mono)',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#598BFF',
                      boxShadow: '0 0 8px #598BFF',
                    }}
                  />
                  04 // STRATEGIC BUSINESS SOLUTIONS
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'clamp(1.75rem, 3.1vw, 2.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.12,
                  color: '#FFFFFF',
                  margin: '0 0 6px 0',
                }}
              >
                Turning operational friction into{' '}
                <span
                  style={{
                    background: 'linear-gradient(120deg, #598BFF 0%, #38BDF8 55%, #02C415 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  competitive advantage.
                </span>
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-family-body)',
                  fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                  lineHeight: 1.5,
                  color: '#94A3B8',
                  margin: 0,
                }}
              >
                Scroll or swipe horizontally to explore how we map deep engineering to 10 strategic business domains.
              </p>
            </div>

            <Link
              href="/solutions"
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#CBD5E1',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                transition: 'all 180ms ease',
              }}
            >
              <span>Explore All 10 Solutions</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Category Filters + Stepper Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              marginBottom: '16px',
              flexWrap: 'wrap',
            }}
          >
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
                    onClick={() => setActiveCategory(opt.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 180ms ease',
                      border: isSelected ? '1px solid #598BFF' : '1px solid rgba(255, 255, 255, 0.12)',
                      backgroundColor: isSelected ? 'rgba(89, 139, 255, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                      color: isSelected ? '#FFFFFF' : '#94A3B8',
                    }}
                  >
                    <span>{opt.label}</span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-family-mono)',
                        color: isSelected ? '#93C5FD' : '#64748B',
                      }}
                    >
                      ({opt.count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Progress Counter & Stepper Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  fontSize: '0.76rem',
                  fontFamily: 'var(--font-family-mono)',
                  color: '#94A3B8',
                  fontWeight: 700,
                }}
              >
                {String(activeCardIdx + 1).padStart(2, '0')} / {String(filteredSolutions.length).padStart(2, '0')}
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => handleStep(-1)}
                  disabled={activeCardIdx <= 0}
                  aria-label="Previous solution"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: activeCardIdx <= 0 ? 'rgba(255, 255, 255, 0.25)' : '#FFFFFF',
                    cursor: activeCardIdx <= 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => handleStep(1)}
                  disabled={activeCardIdx >= filteredSolutions.length - 1}
                  aria-label="Next solution"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: activeCardIdx >= filteredSolutions.length - 1 ? 'rgba(255, 255, 255, 0.25)' : '#FFFFFF',
                    cursor: activeCardIdx >= filteredSolutions.length - 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </Container>

        {/* Horizontal Scroll Card Track */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            ref={trackRef}
            onScroll={handleTrackScroll}
            className="sb-solutions-horizontal-track"
            style={{
              display: 'flex',
              gap: '24px',
              paddingLeft: 'max(24px, calc((100vw - 1280px) / 2 + 24px))',
              paddingRight: '48px',
              paddingTop: '8px',
              paddingBottom: '16px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x proximity',
              willChange: 'transform',
            }}
          >
            {filteredSolutions.map((sol) => {
              const gIdx = solutionsData.findIndex((s) => s.slug === sol.slug);
              const isHovered = hoveredSlug === sol.slug;

              return (
                <article
                  key={sol.slug}
                  onMouseEnter={() => setHoveredSlug(sol.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  className={isHovered ? 'sb-glass-solution sb-glass-solution--active' : 'sb-glass-solution'}
                  style={{
                    flex: '0 0 auto',
                    width: 'clamp(330px, 40vw, 490px)',
                    scrollSnapAlign: 'start',
                    borderRadius: '18px',
                    padding: 'clamp(1.15rem, 1.8vw, 1.5rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div>
                    {/* Top Meta Bar */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-family-mono)',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            color: '#598BFF',
                            backgroundColor: 'rgba(89, 139, 255, 0.14)',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: '1px solid rgba(89, 139, 255, 0.3)',
                          }}
                        >
                          SPEC // {String(gIdx + 1).padStart(2, '0')}
                        </span>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            color: '#94A3B8',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          {sol.category}
                        </span>
                      </div>

                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          backgroundColor: '#02C415',
                          boxShadow: '0 0 8px #02C415',
                        }}
                      />
                    </div>

                    {/* Kicker & Title */}
                    <div
                      style={{
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-family-mono)',
                        color: '#598BFF',
                        fontWeight: 700,
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                      }}
                    >
                      {sol.kicker}
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-family-heading)',
                        fontSize: 'clamp(1.15rem, 1.5vw, 1.38rem)',
                        fontWeight: 800,
                        lineHeight: 1.2,
                        color: '#FFFFFF',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {sol.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.86rem',
                        color: '#CBD5E1',
                        lineHeight: 1.48,
                        margin: '0 0 12px 0',
                      }}
                    >
                      {sol.headline}
                    </p>

                    {/* Friction -> Architecture Callout */}
                    <div
                      style={{
                        backgroundColor: 'rgba(245, 158, 11, 0.06)',
                        border: '1px solid rgba(245, 158, 11, 0.22)',
                        borderLeft: '3px solid #F59E0B',
                        borderRadius: '8px',
                        padding: '8px 11px',
                        marginBottom: '12px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.62rem',
                          fontFamily: 'var(--font-family-mono)',
                          color: '#F59E0B',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          marginBottom: '2px',
                        }}
                      >
                        FRICTION DIAGNOSED
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#E2E8F0', lineHeight: 1.4 }}>
                        {sol.problemStatement}
                      </div>
                    </div>

                    {/* Target Outcomes */}
                    {sol.outcomes && sol.outcomes.length > 0 && (
                      <div
                        style={{
                          marginBottom: '12px',
                          paddingTop: '10px',
                          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.58rem',
                            fontFamily: 'var(--font-family-mono)',
                            fontWeight: 700,
                            color: '#64748B',
                            letterSpacing: '0.07em',
                            textTransform: 'uppercase',
                            marginBottom: '6px',
                          }}
                        >
                          TARGET ENGINEERING OUTCOMES
                        </div>
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '8px',
                          }}
                        >
                          {sol.outcomes.slice(0, 3).map((outcome) => (
                            <div
                              key={outcome.label}
                              style={{
                                paddingLeft: '10px',
                                borderLeft: '2px solid #598BFF',
                              }}
                            >
                              <div
                                style={{
                                  fontSize: '1.05rem',
                                  fontWeight: 800,
                                  color: '#FFFFFF',
                                  fontFamily: 'var(--font-family-mono)',
                                  lineHeight: 1.1,
                                }}
                              >
                                {outcome.value}
                              </div>
                              <div
                                style={{
                                  fontSize: '0.66rem',
                                  fontWeight: 700,
                                  color: '#94A3B8',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.03em',
                                  marginTop: '3px',
                                  lineHeight: 1.25,
                                }}
                              >
                                {outcome.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Capabilities + High-Contrast CTA */}
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      {sol.capabilities.slice(0, 3).map((cap) => (
                        <span
                          key={cap.title}
                          style={{
                            fontSize: '0.7rem',
                            color: '#CBD5E1',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.09)',
                            padding: '4px 9px',
                            borderRadius: '6px',
                          }}
                        >
                          {cap.title}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/solutions/${sol.slug}`}
                      className="sb-btn sb-btn--md"
                      style={{
                        width: '100%',
                        justifyContent: 'space-between',
                        textDecoration: 'none',
                        backgroundColor: '#598BFF',
                        color: '#FFFFFF',
                        border: '1px solid rgba(147, 197, 253, 0.45)',
                        boxShadow: '0 8px 24px -6px rgba(89, 139, 255, 0.45)',
                      }}
                    >
                      <span>View Architectural Solution</span>
                      <ArrowRight size={14} className="sb-btn__arrow" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Live Horizontal Progress Bar */}
        <Container>
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                flex: 1,
                height: '3px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '999px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${Math.max(10, scrollProgress * 100)}%`,
                  background: 'linear-gradient(90deg, #598BFF 0%, #02C415 100%)',
                  borderRadius: '999px',
                  transition: 'width 120ms ease-out',
                }}
              />
            </div>
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: 'var(--font-family-mono)',
                color: '#64748B',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              SCROLL TO EXPLORE
            </span>
          </div>
        </Container>
      </div>
    </section>
  );
};
