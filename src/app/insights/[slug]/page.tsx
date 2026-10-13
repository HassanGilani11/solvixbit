import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ARTICLES } from '@/config/insights';
import { ArrowRight, ArrowUpRight } from '@/components/icons';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found | SOLVIXBIT',
    };
  }

  return {
    title: `${article.seoTitle || article.title}`,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      tags: article.tags,
      url: `https://solvixbit.com/insights/${article.slug}`,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Related articles
  const relatedArticles = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  // Structured Data (Schema.org BlogPosting)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Organization',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SOLVIXBIT',
      url: 'https://solvixbit.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://solvixbit.com/insights/${article.slug}`,
    },
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header & Breadcrumbs */}
      <header style={{ padding: '60px 24px 40px', backgroundColor: '#FAFAFA', borderBottom: '1px solid #EFEFEF' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
            <Link href="/" style={{ color: '#6B7280', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/insights" style={{ color: '#6B7280', textDecoration: 'none' }}>Insights</Link>
            <span>/</span>
            <span style={{ color: '#111827', fontWeight: 600 }}>{article.category}</span>
          </nav>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              backgroundColor: 'rgba(89, 139, 255, 0.1)',
              color: '#1D4ED8',
              padding: '4px 10px',
              borderRadius: '4px',
            }}>
              {article.category}
            </span>
            <span style={{ fontSize: '14px', color: '#6B7280' }}>
              {article.readingTime}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 4.5vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#000000',
            lineHeight: 1.2,
            marginBottom: '20px',
          }}>
            {article.title}
          </h1>

          <p style={{
            fontSize: 'clamp(18px, 2vw, 21px)',
            color: '#4B5563',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}>
            {article.excerpt}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#6B7280', borderTop: '1px solid #E5E7EB', paddingTop: '16px' }}>
            <span>By <strong style={{ color: '#111827' }}>{article.author.name}</strong></span>
            <span>•</span>
            <span>Published on {article.publishedAt}</span>
          </div>
        </div>
      </header>

      {/* Main Article Body Layout */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '60px 24px 100px' }}>
        {/* Table of Contents */}
        {article.tableOfContents && article.tableOfContents.length > 0 && (
          <nav aria-label="Table of Contents" style={{
            backgroundColor: '#F9FAFB',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '24px 28px',
            marginBottom: '48px',
          }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              Table of Contents
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {article.tableOfContents.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    style={{
                      fontSize: '15px',
                      color: '#598BFF',
                      textDecoration: 'none',
                      display: 'inline-block',
                    }}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Sections Content */}
        <article style={{ lineHeight: 1.8, fontSize: '18px', color: '#27272A' }}>
          {article.sections.map((sec) => (
            <section key={sec.id} id={sec.id} style={{ marginBottom: '44px', scrollMarginTop: '100px' }}>
              <h2 style={{
                fontSize: '26px',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: '#111827',
                marginTop: '36px',
                marginBottom: '16px',
              }}>
                {sec.heading}
              </h2>

              <div style={{ whiteSpace: 'pre-line' }}>
                {sec.content}
              </div>
            </section>
          ))}
        </article>

        {/* Article Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '24px 0', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB', margin: '48px 0' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280', alignSelf: 'center', marginRight: '8px' }}>
            Tags:
          </span>
          {article.tags.map((tag, idx) => (
            <span key={idx} style={{ fontSize: '13px', color: '#4B5563', backgroundColor: '#F3F4F6', padding: '4px 10px', borderRadius: '6px' }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Contextual Solution CTA Box */}
        {article.relatedSolutionSlug && article.relatedSolutionTitle && (
          <div style={{
            backgroundColor: '#000000',
            borderRadius: '16px',
            padding: '36px 32px',
            color: '#FFFFFF',
            marginBottom: '64px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <span style={{ color: '#02C415', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              RELEVANT SOLUTION DISCIPLINE
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              Applying {article.relatedSolutionTitle} to your organization
            </h3>
            <p style={{ fontSize: '15px', color: '#9CA3AF', lineHeight: 1.6, margin: 0 }}>
              Interested in implementing these architectural patterns? Our engineering team works alongside your stakeholders to evaluate technical debt, architect scalable solutions, and accelerate deployment.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '8px' }}>
              <Link
                href={`/start-a-project?solution=${article.relatedSolutionSlug}`}
                className="sb-btn sb-btn--primary"
                style={{ fontSize: '14px', padding: '10px 20px', minHeight: '42px' }}
              >
                Discuss This Solution
                <ArrowRight size={16} />
              </Link>
              <Link
                href={`/solutions/${article.relatedSolutionSlug}`}
                className="sb-btn sb-btn--white"
                style={{ fontSize: '14px', padding: '10px 20px', minHeight: '42px' }}
              >
                View Solution Scope
              </Link>
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: 0 }}>
                More Perspectives
              </h3>
              <Link href="/insights" style={{ fontSize: '14px', fontWeight: 600, color: '#598BFF', textDecoration: 'none' }}>
                All Insights →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {relatedArticles.map((rel) => (
                <div
                  key={rel.slug}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#598BFF', textTransform: 'uppercase' }}>
                      {rel.category}
                    </span>
                    <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', margin: '8px 0' }}>
                      <Link href={`/insights/${rel.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {rel.title}
                      </Link>
                    </h4>
                    <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.5, marginBottom: '16px' }}>
                      {rel.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/insights/${rel.slug}`}
                    style={{ fontSize: '13px', fontWeight: 600, color: '#598BFF', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                  >
                    Read Perspective
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <Link href="/insights" className="sb-btn sb-btn--secondary">
            ← Back to All Insights
          </Link>
        </div>
      </div>
    </main>
  );
}
