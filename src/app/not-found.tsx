import React from 'react';
import Link from 'next/link';
import { Container, Section } from '../components/layout';

export default function NotFound() {
  return (
    <main id="main-content" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <Section style={{ width: '100%', padding: '6rem 0' }}>
        <Container>
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: '0.875rem',
                color: '#598BFF',
                backgroundColor: '#EEF2FF',
                padding: '4px 12px',
                borderRadius: '999px',
                fontWeight: 600,
                display: 'inline-block',
                marginBottom: '1.5rem',
              }}
            >
              ERROR 404 · ROUTE NOT FOUND
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
              }}
            >
              Page Not Located
            </h1>
            <p style={{ color: '#6B7280', fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              The architectural blueprint or page you requested does not exist or has been relocated.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" className="sb-btn sb-btn--md sb-btn--primary">
                Return Home
              </Link>
              <Link href="/contact" className="sb-btn sb-btn--md sb-btn--secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
