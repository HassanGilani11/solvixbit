'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { Container } from '../layout';
import { Logo } from '../brand/Logo';
import { servicesData } from '../../config/services';
import { solutionsData } from '../../config/solutions';
import { caseStudiesData } from '../../config/work';
import { ChevronDown, ArrowRight } from '../icons';

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavbarProps {
  brandName?: string;
  tagline?: string;
  items?: NavItem[];
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  brandName = 'SOLVIXBIT',
  tagline = 'Technology That Solves.',
  ctaText = 'Start a Project',
  onCtaClick,
  className,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menuKey: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  return (
    <header className={cn('sb-navbar', className)} onMouseLeave={handleMouseLeave}>
      <Container>
        <div className="sb-navbar__inner">
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <Logo height={50} />
          </Link>

          {/* Desktop Navigation with Dropdowns */}
          <nav className="sb-navbar__nav" aria-label="Main Navigation">
            {/* 1. Services with Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => handleMouseEnter('services')}
            >
              <Link
                href="/services"
                className={cn('sb-navbar__link', activeDropdown === 'services' && 'sb-navbar__link--active')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <span>Services</span>
                <ChevronDown
                  size={12}
                  style={{
                    transform: activeDropdown === 'services' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: 0.7,
                  }}
                />
              </Link>

              {activeDropdown === 'services' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-20px',
                    width: '560px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
                    padding: '20px',
                    zIndex: 150,
                    animation: 'sb-fade-in 180ms ease forwards',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-family-mono)', color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>
                    SPECIALIZED ENGINEERING DISCIPLINES
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {servicesData.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          padding: '10px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          color: '#000000',
                          transition: 'background-color 150ms ease',
                        }}
                        className="sb-dropdown-item"
                      >
                        <span style={{ fontSize: '1.25rem' }}>{service.icon}</span>
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827' }}>
                            {service.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '2px' }}>
                            {service.kicker}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div style={{ borderTop: '1px solid #F3F4F6', marginTop: '14px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/services" onClick={() => setActiveDropdown(null)} style={{ fontSize: '0.8rem', fontWeight: 600, color: '#598BFF', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }} className="sb-link-arrow">
                      <span>Explore All 9 Engineering Services</span>
                      <ArrowRight size={13} className="sb-btn__arrow" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Solutions with Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => handleMouseEnter('solutions')}
            >
              <Link
                href="/solutions"
                className={cn('sb-navbar__link', activeDropdown === 'solutions' && 'sb-navbar__link--active')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <span>Solutions</span>
                <ChevronDown
                  size={12}
                  style={{
                    transform: activeDropdown === 'solutions' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: 0.7,
                  }}
                />
              </Link>

              {activeDropdown === 'solutions' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-20px',
                    width: '480px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
                    padding: '20px',
                    zIndex: 150,
                    animation: 'sb-fade-in 180ms ease forwards',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-family-mono)', color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>
                    STRATEGIC PROBLEM DOMAINS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {solutionsData.slice(0, 4).map((sol) => (
                      <Link
                        key={sol.slug}
                        href={`/solutions/${sol.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          display: 'block',
                          padding: '10px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          color: '#000000',
                          transition: 'background-color 150ms ease',
                        }}
                        className="sb-dropdown-item"
                      >
                        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827' }}>
                          {sol.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '2px' }}>
                          {sol.summary.slice(0, 75)}...
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div style={{ borderTop: '1px solid #F3F4F6', marginTop: '12px', paddingTop: '10px' }}>
                    <Link href="/solutions" onClick={() => setActiveDropdown(null)} style={{ fontSize: '0.8rem', fontWeight: 600, color: '#598BFF', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }} className="sb-link-arrow">
                      <span>Explore All 10 Solutions</span>
                      <ArrowRight size={13} className="sb-btn__arrow" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Work with Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => handleMouseEnter('work')}
            >
              <Link
                href="/work"
                className={cn('sb-navbar__link', activeDropdown === 'work' && 'sb-navbar__link--active')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                <span>Work</span>
                <ChevronDown
                  size={12}
                  style={{
                    transform: activeDropdown === 'work' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: 0.7,
                  }}
                />
              </Link>

              {activeDropdown === 'work' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-20px',
                    width: '460px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
                    padding: '20px',
                    zIndex: 150,
                    animation: 'sb-fade-in 180ms ease forwards',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-family-mono)', color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>
                    VERIFIED CLIENT CASE STUDIES
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {caseStudiesData.map((caseStudy) => (
                      <Link
                        key={caseStudy.slug}
                        href={`/work/${caseStudy.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          display: 'block',
                          padding: '10px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          color: '#000000',
                          transition: 'background-color 150ms ease',
                        }}
                        className="sb-dropdown-item"
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827' }}>
                            {caseStudy.client}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: '#598BFF', fontWeight: 600 }}>
                            {caseStudy.metrics[0]?.value}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '2px' }}>
                          {caseStudy.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div style={{ borderTop: '1px solid #F3F4F6', marginTop: '12px', paddingTop: '10px' }}>
                    <Link href="/work" onClick={() => setActiveDropdown(null)} style={{ fontSize: '0.8rem', fontWeight: 600, color: '#598BFF', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }} className="sb-link-arrow">
                      <span>Explore Full Portfolio Showcase</span>
                      <ArrowRight size={13} className="sb-btn__arrow" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Insights */}
            <Link href="/insights" className="sb-navbar__link">
              Insights
            </Link>

            {/* 5. About */}
            <Link href="/about" className="sb-navbar__link">
              About
            </Link>

            {/* 6. Contact */}
            <Link href="/contact" className="sb-navbar__link">
              Contact
            </Link>
          </nav>

          {/* Right Header Action Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Link
              href="/start-a-project"
              onClick={onCtaClick ? (e) => { e.preventDefault(); onCtaClick(); } : undefined}
              className="sb-btn sb-btn--sm sb-btn--primary"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>{ctaText}</span>
              <ArrowRight size={14} className="sb-btn__arrow" />
            </Link>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="sb-btn sb-btn--outline sb-btn--sm sb-mobile-toggle"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div
          style={{
            borderTop: '1px solid #E5E7EB',
            backgroundColor: '#FFFFFF',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link
              href="/services"
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: '1.1rem', fontWeight: 700, color: '#000000', textDecoration: 'none', padding: '6px 0' }}
            >
              Services (9 Disciplines)
            </Link>
            <Link
              href="/solutions"
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: '1.1rem', fontWeight: 700, color: '#000000', textDecoration: 'none', padding: '6px 0' }}
            >
              Solutions (10 Disciplines)
            </Link>
            <Link
              href="/work"
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: '1.1rem', fontWeight: 700, color: '#000000', textDecoration: 'none', padding: '6px 0' }}
            >
              Case Studies
            </Link>
            <Link
              href="/insights"
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: '1.1rem', fontWeight: 700, color: '#000000', textDecoration: 'none', padding: '6px 0' }}
            >
              Insights &amp; Blog
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: '1.1rem', fontWeight: 700, color: '#000000', textDecoration: 'none', padding: '6px 0' }}
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: '1.1rem', fontWeight: 700, color: '#000000', textDecoration: 'none', padding: '6px 0' }}
            >
              Contact
            </Link>
          </nav>
          <Link
            href="/start-a-project"
            onClick={() => setMobileOpen(false)}
            className="sb-btn sb-btn--lg sb-btn--primary"
            style={{ width: '100%', textDecoration: 'none', marginTop: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <span>Start a Project</span>
            <ArrowRight size={16} className="sb-btn__arrow" />
          </Link>
        </div>
      )}
    </header>
  );
};

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps {
  brandName?: string;
  tagline?: string;
  columns?: FooterColumn[];
  copyrightYear?: number;
  className?: string;
}

const defaultFooterColumns: FooterColumn[] = [
  {
    title: 'Services',
    links: [
      { label: 'Software Development', href: '/services/software-development' },
      { label: 'AI & Automation', href: '/services/ai-automation' },
      { label: 'SaaS & Digital Products', href: '/services/saas-development' },
      { label: 'Headless Web & Ecommerce', href: '/services/web-ecommerce' },
      { label: 'Connected Systems & APIs', href: '/services/api-integrations' },
      { label: 'Cloud & Infrastructure', href: '/services/cloud-integrations' },
      { label: 'Data & Decision Systems', href: '/services/data-analytics' },
      { label: 'Security & Quality', href: '/services/security-quality' },
      { label: 'Mobile & Cross-Platform', href: '/services/mobile-engineering' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Enterprise Modernization', href: '/solutions/enterprise-scale' },
      { label: 'AI & Process Automation', href: '/solutions/operational-automation' },
      { label: 'Zero-to-One Startup MVP', href: '/solutions/startup-mvp' },
      { label: 'Headless Global Commerce', href: '/solutions/high-conversion-commerce' },
      { label: 'Connected Systems & APIs', href: '/solutions/connected-systems-api-integration' },
      { label: 'Data Intelligence Systems', href: '/solutions/data-intelligence-decision-systems' },
    ],
  },
  {
    title: 'Insights & Company',
    links: [
      { label: 'Insights & Blog', href: '/insights' },
      { label: 'Where to Start with AI', href: '/insights/where-should-your-business-start-with-ai-automation' },
      { label: 'MVP to Scalable SaaS', href: '/insights/from-mvp-to-scalable-saas-what-to-build-first' },
      { label: 'Selected Client Work', href: '/work' },
      { label: 'About SOLVIXBIT', href: '/about' },
    ],
  },
  {
    title: 'Project Discovery',
    links: [
      { label: 'Start a Project Consultation', href: '/start-a-project' },
      { label: 'hello@solvixbit.com', href: 'mailto:hello@solvixbit.com' },
      { label: 'Contact Hub', href: '/contact' },
      { label: 'Engineering SLA: < 24h', href: '/start-a-project' },
    ],
  },
];

export const Footer: React.FC<FooterProps> = ({
  brandName = 'SOLVIXBIT',
  tagline = 'Technology That Solves.',
  columns,
  copyrightYear = 2026,
  className,
}) => {
  const activeColumns = columns && columns.length > 0 ? columns : defaultFooterColumns;

  return (
    <footer className={cn('sb-footer', className)}>
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'start',
          }}
        >
          {/* Brand Intro Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '340px' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <Logo height={55} theme="dark" />
            </Link>
            <p style={{ color: '#9CA3AF', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              Creative technology & engineering partner. We build bespoke digital products, AI workflows, and high-performance web systems that solve real business problems.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                backgroundColor: '#111827',
                border: '1px solid #1F2937',
                borderRadius: '999px',
                width: 'fit-content',
                marginTop: '4px',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#02C415', display: 'inline-block' }} />
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-family-mono)', color: '#E5E7EB', fontWeight: 500 }}>
                Available for Project Bookings
              </span>
            </div>
          </div>

          {/* Structured Link Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              gridColumn: 'span 2',
            }}
          >
            {activeColumns.map((col) => (
              <div key={col.title}>
                <div className="sb-footer__title">{col.title}</div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {col.links.map((link) => {
                    const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto:');
                    return (
                      <li key={`${link.label}-${link.href}`}>
                        {isExternal ? (
                          <a href={link.href} className="sb-footer__link">
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.href} className="sb-footer__link">
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid #1F2937',
            marginTop: 'clamp(2.5rem, 5vw, 4rem)',
            paddingTop: 'var(--space-6)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            fontSize: 'var(--font-size-xs)',
            color: '#6B7280',
          }}
        >
          <div>
            &copy; {copyrightYear} {brandName}. All rights reserved. Technology that solves.
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/services" style={{ color: '#9CA3AF', textDecoration: 'none' }}>
              Services
            </Link>
            <span style={{ color: '#374151' }}>·</span>
            <Link href="/solutions" style={{ color: '#9CA3AF', textDecoration: 'none' }}>
              Solutions
            </Link>
            <span style={{ color: '#374151' }}>·</span>
            <Link href="/work" style={{ color: '#9CA3AF', textDecoration: 'none' }}>
              Work
            </Link>
            <span style={{ color: '#374151' }}>·</span>
            <Link href="/about" style={{ color: '#9CA3AF', textDecoration: 'none' }}>
              About
            </Link>
            <span style={{ color: '#374151' }}>·</span>
            <Link
              href="/contact"
              style={{
                color: '#598BFF',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>Get in Touch</span>
              <ArrowRight size={12} className="sb-btn__arrow" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
