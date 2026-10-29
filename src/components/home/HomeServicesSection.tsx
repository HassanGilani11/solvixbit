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
  { id: 'all', label: 'All 9 Services' },
  { id: 'engineering', label: 'Software & Architecture' },
  { id: 'ai', label: 'AI & Data Systems' },
  { id: 'experience', label: 'Experience & Commerce' },
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

      gsap.fromTo(
        '.sb-service-card-item',
        { y: 30, opacity: 0 },
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

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        paddingTop: 'clamp(4rem, 7vw, 6.5rem)',
        paddingBottom: 'clamp(4rem, 7vw, 6.5rem)',
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
            marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'inline-flex', marginBottom: '12px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 12px',
                  backgroundColor: '#F3F4F6',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-family-mono)',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary-blue)' }} />
                03 // SPECIALIZED SERVICES
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
              Engineering depth. Digital craft.
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
              We architect, engineer, and support mission-critical digital systems. From ground-up product acceleration to enterprise modernization.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div
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
                  }}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetrical Editorial Services Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {filteredServices.map((service, index) => {
            const isFeatured = index === 0;
            return (
              <div
                key={service.slug}
                className="sb-service-card-item"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(1.75rem, 3vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease',
                  gridColumn: isFeatured ? 'span min(2, auto)' : 'auto',
                }}
              >
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
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: 'var(--color-primary-blue)',
                    }}
                  >
                    0{servicesData.indexOf(service) + 1}
                  </span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-family-mono)',
                      fontWeight: 600,
                      color: '#6B7280',
                      backgroundColor: '#F3F4F6',
                      padding: '4px 10px',
                      borderRadius: '999px',
                    }}
                  >
                    {service.kicker}
                  </span>
                </div>

                {/* Service Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: isFeatured ? 'clamp(1.5rem, 2.5vw, 2rem)' : '1.35rem',
                    fontWeight: 700,
                    lineHeight: 1.25,
                    marginBottom: '12px',
                  }}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    style={{
                      textDecoration: 'none',
                      color: '#000000',
                      transition: 'color 180ms ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#598BFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#000000')}
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
                    flexGrow: 1,
                  }}
                >
                  {service.shortDescription}
                </p>

                {/* Deliverables Preview */}
                <div
                  style={{
                    borderTop: '1px solid #F3F4F6',
                    paddingTop: '16px',
                    marginBottom: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
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
                      {item}
                    </span>
                  ))}
                </div>

                {/* Action Link */}
                <Link
                  href={`/services/${service.slug}`}
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
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
      </Container>
    </section>
  );
};
