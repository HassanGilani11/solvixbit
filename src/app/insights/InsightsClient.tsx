'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/types/content';
import { ArrowRight, ArrowUpRight } from '@/components/icons';

interface InsightsClientProps {
  articles: Article[];
}

const CATEGORIES = [
  'All',
  'AI & Automation',
  'Software Engineering',
  'SaaS & Digital Products',
  'Ecommerce & Digital Experience',
  'Cloud & Architecture',
  'Business & Technology Strategy',
];

export default function InsightsClient({ articles }: InsightsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticle = articles[0];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Featured Article Card */}
      {selectedCategory === 'All' && searchQuery === '' && featuredArticle && (
        <div style={{ marginBottom: '64px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#598BFF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
            FEATURED PERSPECTIVE
          </div>
          <div style={{
            backgroundColor: '#000000',
            borderRadius: '20px',
            overflow: 'hidden',
            padding: 'clamp(32px, 5vw, 56px)',
            color: '#FFFFFF',
            position: 'relative',
          }}>
            <div style={{ maxWidth: '780px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  backgroundColor: '#598BFF',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: '4px',
                }}>
                  {featuredArticle.category}
                </span>
                <span style={{ fontSize: '14px', color: '#9CA3AF' }}>
                  {featuredArticle.readingTime}
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '20px', color: '#FFFFFF' }}>
                <Link href={`/insights/${featuredArticle.slug}`} style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                  {featuredArticle.title}
                </Link>
              </h2>

              <p style={{ fontSize: '17px', color: '#D1D5DB', lineHeight: 1.6, marginBottom: '32px', maxWidth: '680px' }}>
                {featuredArticle.excerpt}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ fontSize: '14px', color: '#9CA3AF' }}>
                  By <strong style={{ color: '#FFFFFF' }}>{featuredArticle.author.name}</strong> • Published {featuredArticle.publishedAt}
                </div>
                <Link
                  href={`/insights/${featuredArticle.slug}`}
                  className="sb-btn sb-btn--primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  Read Full Article
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '40px', paddingBottom: '24px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                border: selectedCategory === cat ? '1px solid #598BFF' : '1px solid #E5E7EB',
                backgroundColor: selectedCategory === cat ? '#598BFF' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : '#374151',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ minWidth: '260px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by topic..."
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid #D1D5DB',
              fontSize: '14px',
            }}
          />
        </div>
      </div>

      {/* Article Grid */}
      {filteredArticles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#F9FAFB', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>No articles match your criteria</h3>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>Try clearing your search query or selecting another category.</p>
          <button
            type="button"
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="sb-btn sb-btn--secondary"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '16px',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backgroundColor: 'rgba(89, 139, 255, 0.1)',
                    color: '#1D4ED8',
                    padding: '4px 8px',
                    borderRadius: '4px',
                  }}>
                    {article.category}
                  </span>
                  <span style={{ fontSize: '13px', color: '#6B7280' }}>
                    {article.readingTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', lineHeight: 1.35, marginBottom: '12px' }}>
                  <Link href={`/insights/${article.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {article.title}
                  </Link>
                </h3>

                <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.6, marginBottom: '20px' }}>
                  {article.excerpt}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                  {article.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} style={{ fontSize: '11px', color: '#6B7280', backgroundColor: '#F3F4F6', padding: '2px 8px', borderRadius: '4px' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #F3F4F6' }}>
                <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
                  {article.publishedAt}
                </span>
                <Link
                  href={`/insights/${article.slug}`}
                  style={{ fontSize: '13px', fontWeight: 600, color: '#598BFF', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                >
                  Read Article
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
