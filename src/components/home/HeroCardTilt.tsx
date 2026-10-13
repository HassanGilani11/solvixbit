'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

export const HeroCardTilt: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'product' | 'stack' | 'metrics'>('product');

  // Mouse offset relative to card center (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics configuration for snappy tracking & natural return
  const springConfig = { damping: 22, stiffness: 260 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Max ±5 degrees tilt on X and Y axes
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  // Subtle ambient glow translation parallax
  const glowX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-24, 24]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (event.clientY - rect.top) / rect.height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        perspective: '1200px',
        width: '100%',
        maxWidth: '580px',
        margin: '0 auto',
      }}
    >
      {/* 1. Ambient blurred background glow (#598BFF + #02C415) */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-30px',
          background:
            'radial-gradient(circle at 30% 30%, rgba(89, 139, 255, 0.35) 0%, rgba(89, 139, 255, 0.12) 50%, transparent 75%), radial-gradient(circle at 80% 80%, rgba(2, 196, 21, 0.20) 0%, transparent 60%)',
          borderRadius: 'var(--radius-2xl)',
          filter: 'blur(40px)',
          zIndex: 0,
          pointerEvents: 'none',
          x: glowX,
          y: glowY,
        }}
      />

      {/* 2. Floating Top Badge: Code Quality / SLA */}
      <div
        className="sb-float-1"
        style={{
          position: 'absolute',
          top: '-18px',
          right: '12px',
          zIndex: 10,
          backgroundColor: '#000000',
          color: '#FFFFFF',
          padding: '6px 14px',
          borderRadius: '999px',
          border: '1px solid rgba(89, 139, 255, 0.4)',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#02C415' }} />
        <span>45+ Shipped Digital Products</span>
      </div>

      {/* 3. Floating Bottom Badge: 99.9% Uptime & Speed */}
      <div
        className="sb-float-2"
        style={{
          position: 'absolute',
          bottom: '-16px',
          left: '12px',
          zIndex: 10,
          backgroundColor: '#FFFFFF',
          color: '#000000',
          padding: '6px 14px',
          borderRadius: '999px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 12px 28px -6px rgba(0, 0, 0, 0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.75rem',
          fontWeight: 700,
        }}
      >
        <span style={{ color: '#598BFF' }}>⚡</span>
        <span>Sub-second Latency & Scalability</span>
      </div>

      {/* 4. 3D Tilted Card Container */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 2,
          borderRadius: 'var(--radius-xl)',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E7EB',
          boxShadow:
            '0 24px 48px -12px rgba(0, 0, 0, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
          padding: 'clamp(1.5rem, 3vw, 2.25rem)',
          overflow: 'hidden',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Studio Card Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #EFEFEF',
            paddingBottom: 'var(--space-4)',
            marginBottom: 'var(--space-5)',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#000000',
              }}
            />
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#598BFF',
              }}
            />
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#02C415',
              }}
            />
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                fontFamily: 'var(--font-family-mono)',
                color: '#6B7280',
                marginLeft: '6px',
                fontWeight: 600,
              }}
            >
              solvixbit.com // live_preview
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: '#02C415',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  width: '8px',
                  height: '8px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  className="sb-radar-ping"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundColor: '#02C415',
                  }}
                />
                <span
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#02C415',
                  }}
                />
              </span>
              Available for Projects
            </span>
          </div>
        </div>

        {/* Interactive Tab Switcher */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            backgroundColor: '#F3F4F6',
            padding: '4px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 'var(--space-4)',
          }}
        >
          {(['product', 'stack', 'metrics'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '6px 12px',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === tab ? '#000000' : 'transparent',
                color: activeTab === tab ? '#FFFFFF' : '#4B5563',
                transition: 'all 200ms ease',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {tab === 'product' && 'Architecture'}
              {tab === 'stack' && 'Modern Stack'}
              {tab === 'metrics' && 'Impact'}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'product' && (
            <motion.div
              key="product"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
            >
              {/* Product Release Banner */}
              <div
                style={{
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-6)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      fontFamily: 'var(--font-family-mono)',
                      color: '#598BFF',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    DIGITAL PRODUCT RELEASE
                  </span>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: '#9E9E9E' }}>
                    v2.4 Production
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 700,
                  }}
                >
                  High-Performance Web & Application Systems
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--space-2)',
                    flexWrap: 'wrap',
                    marginTop: 'var(--space-1)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      padding: '3px 10px',
                      backgroundColor: '#1C1C1C',
                      borderRadius: '999px',
                      color: '#E0E0E0',
                      border: '1px solid #333333',
                    }}
                  >
                    React / Next.js
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      padding: '3px 10px',
                      backgroundColor: '#1C1C1C',
                      borderRadius: '999px',
                      color: '#E0E0E0',
                      border: '1px solid #333333',
                    }}
                  >
                    AI Automation
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      padding: '3px 10px',
                      backgroundColor: '#1C1C1C',
                      borderRadius: '999px',
                      color: '#E0E0E0',
                      border: '1px solid #333333',
                    }}
                  >
                    Headless Commerce
                  </span>
                </div>
              </div>

              {/* Dual Modules: Design Tokens & Engineering Delivery */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: 'var(--space-4)',
                }}
              >
                <div
                  className="sb-hero-nested-card"
                  style={{
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #E5E7EB',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      color: '#598BFF',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    DESIGN SYSTEMS
                  </span>
                  <div
                    style={{
                      fontSize: 'var(--font-size-base)',
                      fontWeight: 700,
                      color: '#000000',
                      marginTop: '4px',
                    }}
                  >
                    Bespoke Digital Polish
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      color: '#6B7280',
                      marginTop: '4px',
                    }}
                  >
                    Modern typography, fluid motion & accessible UI
                  </div>
                </div>

                <div
                  className="sb-hero-nested-card"
                  style={{
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #E5E7EB',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      color: '#02C415',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    ENGINEERING
                  </span>
                  <div
                    style={{
                      fontSize: 'var(--font-size-base)',
                      fontWeight: 700,
                      color: '#000000',
                      marginTop: '4px',
                    }}
                  >
                    Resilient Codebases
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      color: '#6B7280',
                      marginTop: '4px',
                    }}
                  >
                    Scalable cloud, test-driven logic & sub-second speed
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'stack' && (
            <motion.div
              key="stack"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              style={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)', color: '#598BFF' }}>
                  CORE_TECHNOLOGY_STACK
                </span>
                <span style={{ fontSize: 'var(--font-size-xs)', color: '#02C415' }}>● 100% Production Ready</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div style={{ backgroundColor: '#111111', padding: '12px', borderRadius: '8px', border: '1px solid #222222' }}>
                  <div style={{ fontSize: '0.75rem', color: '#9E9E9E' }}>Frontend & Web</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '2px', color: '#FFFFFF' }}>Next.js 15 + React 19</div>
                </div>
                <div style={{ backgroundColor: '#111111', padding: '12px', borderRadius: '8px', border: '1px solid #222222' }}>
                  <div style={{ fontSize: '0.75rem', color: '#9E9E9E' }}>Intelligence & AI</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '2px', color: '#598BFF' }}>LLM Workflows & RAG</div>
                </div>
                <div style={{ backgroundColor: '#111111', padding: '12px', borderRadius: '8px', border: '1px solid #222222' }}>
                  <div style={{ fontSize: '0.75rem', color: '#9E9E9E' }}>Commerce Engine</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '2px', color: '#02C415' }}>Shopify Plus / Headless</div>
                </div>
                <div style={{ backgroundColor: '#111111', padding: '12px', borderRadius: '8px', border: '1px solid #222222' }}>
                  <div style={{ fontSize: '0.75rem', color: '#9E9E9E' }}>Cloud & API</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '2px', color: '#FFFFFF' }}>AWS & Edge Microservices</div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'metrics' && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              style={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)', color: '#02C415' }}>
                  MEASURED_BUSINESS_IMPACT
                </span>
                <span style={{ fontSize: 'var(--font-size-xs)', color: '#9E9E9E' }}>Verified Client Audits</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
                <div style={{ backgroundColor: '#111111', padding: '14px 8px', borderRadius: '8px', border: '1px solid #222222' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#598BFF' }}>99.9%</div>
                  <div style={{ fontSize: '0.7rem', color: '#9E9E9E', marginTop: '2px' }}>System Uptime</div>
                </div>
                <div style={{ backgroundColor: '#111111', padding: '14px 8px', borderRadius: '8px', border: '1px solid #222222' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#02C415' }}>3.2x</div>
                  <div style={{ fontSize: '0.7rem', color: '#9E9E9E', marginTop: '2px' }}>Faster Delivery</div>
                </div>
                <div style={{ backgroundColor: '#111111', padding: '14px 8px', borderRadius: '8px', border: '1px solid #222222' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>100/100</div>
                  <div style={{ fontSize: '0.7rem', color: '#9E9E9E', marginTop: '2px' }}>Lighthouse SEO</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
