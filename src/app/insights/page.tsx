import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/config/insights';
import InsightsClient from './InsightsClient';
import { ArrowRight } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Insights & Perspectives on Engineering, AI & Architecture | SOLVIXBIT',
  description: 'Practical perspectives on software engineering, AI, digital products, ecommerce, and the technology decisions shaping modern businesses.',
  openGraph: {
    title: 'Insights & Perspectives | SOLVIXBIT',
    description: 'Practical perspectives on software engineering, AI, digital products, ecommerce, and the technology decisions shaping modern businesses.',
    url: 'https://solvixbit.com/insights',
  },
};

export default function InsightsPage() {
  const publishedArticles = ARTICLES.filter((a) => a.status === 'published');

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* Editorial Hero Header */}
      <section style={{ padding: '80px 24px 60px', backgroundColor: '#FAFAFA', borderBottom: '1px solid #EFEFEF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <span className="sb-badge" style={{ marginBottom: '20px' }}>
            INSIGHTS &amp; IDEAS
          </span>
          <h1 style={{
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#000000',
            lineHeight: 1.15,
            maxWidth: '860px',
            margin: '0 auto 24px',
          }}>
            Ideas for building what comes next.
          </h1>
          <p style={{
            fontSize: 'clamp(17px, 2vw, 20px)',
            color: '#4B5563',
            lineHeight: 1.6,
            maxWidth: '720px',
            margin: '0 auto',
          }}>
            Practical perspectives on software engineering, AI, digital products, ecommerce, and the technology decisions shaping modern businesses.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{ padding: '60px 24px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <InsightsClient articles={publishedArticles} />
      </section>

      {/* Contextual Project Consultation Banner */}
      <section style={{ padding: '80px 24px', backgroundColor: '#000000', color: '#FFFFFF', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#02C415', fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            FROM INSIGHT TO EXECUTION
          </span>
          <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 44px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Ready to translate architectural insights into production systems?
          </h2>
          <p style={{ fontSize: '18px', color: '#9CA3AF', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto 36px' }}>
            Our engineering team designs and delivers tailored software, AI workflows, and cloud platforms built for lasting business outcomes.
          </p>
          <Link href="/start-a-project" className="sb-btn sb-btn--lg sb-btn--on-dark">
            Start a Project Consultation
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
