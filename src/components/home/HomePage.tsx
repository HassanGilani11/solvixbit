'use client';

import React, { useState } from 'react';
import { HeroSection } from './HeroSection';
import { IntroBrandStatement } from './IntroBrandStatement';
import { CapabilitiesEcosystem } from './CapabilitiesEcosystem';
import { HomeServicesSection } from './HomeServicesSection';
import { HomeSolutionsSection } from './HomeSolutionsSection';
import { HomeFeaturedWork } from './HomeFeaturedWork';
import { HomeProcessSection } from './HomeProcessSection';
import { HomeWhyUsSection } from './HomeWhyUsSection';
import { HomeInsightsSection } from './HomeInsightsSection';
import { HomeClosingCTA } from './HomeClosingCTA';
import { Modal, Toast } from '../feedback';
import { Input, Textarea, Select } from '../forms';
import { Button } from '../actions';
import { ArrowRight } from '../icons';

export const HomePage: React.FC = () => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  // Project Inquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'software-development',
    budget: '$5k-$15k',
    description: '',
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          budget: formData.budget,
          message: formData.description,
          website_url_hp: honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsProjectModalOpen(false);
        setToastType('success');
        setToastMessage(
          `Inquiry received [${data.referenceId}]! Our engineering team will connect with you within 24 hours.`
        );
        setFormData({
          name: '',
          email: '',
          service: 'software-development',
          budget: '$5k-$15k',
          description: '',
        });
      } else {
        setToastType('error');
        setToastMessage(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setToastType('error');
      setToastMessage('Network error occurred. Please try again or email hello@solvixbit.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}>
      <main id="main-content">
        {/* 1. HERO SECTION — Signature Experience with 3D Constellation Sculpture */}
        <HeroSection onStartProjectClick={() => setIsProjectModalOpen(true)} />

        {/* 2. INTRODUCTORY BRAND STATEMENT — Strategy + Design + Engineering */}
        <IntroBrandStatement />

        {/* 3. CAPABILITIES & TECHNOLOGY ECOSYSTEM — Interactive Cluster Inspector */}
        <CapabilitiesEcosystem />

        {/* 4. SERVICES — Asymmetrical Editorial Hierarchy & Category Filters */}
        <HomeServicesSection />

        {/* 5. STRATEGIC SOLUTIONS — Interactive Split-Screen 10-Solution Explorer */}
        <HomeSolutionsSection />

        {/* 6. FEATURED WORK — Large Visual Project Panels with Real Metrics */}
        <HomeFeaturedWork />

        {/* 7. DELIVERY PROCESS — 5-Stage Disciplined Journey */}
        <HomeProcessSection />

        {/* 8. WHY SOLVIXBIT — Engineering Differentiators & Credibility */}
        <HomeWhyUsSection />

        {/* 9. EDITORIAL INSIGHTS — Verified Blueprints & Systems Thinking */}
        <HomeInsightsSection />

        {/* 10. CLOSING CTA — Let's solve what's next. */}
        <HomeClosingCTA onStartProjectClick={() => setIsProjectModalOpen(true)} />
      </main>

      {/* PROJECT INQUIRY MODAL (Preserving all production form fields & honeypot) */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title="Start Your Project With SOLVIXBIT"
      >
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <input
            type="text"
            name="website_url_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0 }}
          />
          <Input
            label="Your Name"
            required
            placeholder="e.g. Alex Morgan"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Work Email"
            type="email"
            required
            placeholder="alex@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Select
            label="Primary Service Interest"
            required
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            options={[
              { label: 'Custom Software Development', value: 'software-development' },
              { label: 'AI & Intelligent Automation', value: 'ai-automation' },
              { label: 'SaaS & Web Architecture', value: 'saas-development' },
              { label: 'Connected Systems & API Integration', value: 'connected-systems' },
              { label: 'Cloud Infrastructure & DevOps', value: 'cloud-infrastructure' },
              { label: 'Design Systems & UX Engineering', value: 'ui-ux-engineering' },
              { label: 'Headless Ecommerce & Modern Web', value: 'headless-ecommerce' },
              { label: 'Data Intelligence & Decision Systems', value: 'data-intelligence' },
              { label: 'Application Security & Engineering Quality', value: 'security-quality' },
            ]}
          />
          <Select
            label="Target Budget / Scope"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            options={[
              { label: 'Under $3,000 (Sprint / Consultation)', value: '<$3k' },
              { label: '$3,000 to $5,000 (Starter / MVP Pilot)', value: '$3k-$5k' },
              { label: '$5,000 to $15,000 (Standard Application)', value: '$5k-$15k' },
              { label: '$15,000 to $35,000 (Comprehensive System)', value: '$15k-$35k' },
              { label: '$35,000 to $75,000+ (Enterprise Platform)', value: '$35k-$75k+' },
              { label: 'Monthly Retainer / Ongoing Support', value: 'retainer' },
              { label: 'Prefer to discuss scope first', value: 'discuss' },
            ]}
          />
          <Textarea
            label="Describe What You're Looking to Build or Solve"
            required
            placeholder="Tell us about the project goals, timeline, and current state of your technology..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsProjectModalOpen(false)}
            >
              Cancel
            </Button>
            <button
              type="submit"
              className="sb-btn sb-btn--md sb-btn--primary"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Sending Request...' : 'Submit Project Inquiry'}</span>
              <ArrowRight size={14} className="sb-btn__arrow" />
            </button>
          </div>
        </form>
      </Modal>

      {/* Toast Feedback */}
      <Toast
        isOpen={!!toastMessage}
        message={toastMessage || ''}
        type={toastType}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};
