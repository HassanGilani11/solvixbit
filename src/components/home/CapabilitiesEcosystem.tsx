'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { Container } from '../layout';
import { ArrowRight } from '../icons';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';

initGSAP();

interface TechItem {
  name: string;
  role: string;
  tag: string;
  brandColor: string;
  badge: string;
  iconSvg: React.ReactNode;
}

interface CapabilityCluster {
  id: string;
  step: string;
  name: string;
  shortTag: string;
  badge: string;
  accentColor: string;
  outcome: string;
  description: string;
  telemetryMetrics: { label: string; value: string; spec: string; accent: string }[];
  pipeline: { label: string; detail: string }[];
  technologies: TechItem[];
}

const CLUSTERS: CapabilityCluster[] = [
  {
    id: 'frontend',
    step: '01',
    name: 'Frontend & Interactive Web',
    shortTag: 'USER EXPERIENCE',
    badge: 'USER EXPERIENCE & PERFORMANCE',
    accentColor: '#598BFF',
    outcome: 'Sub-second, accessible digital interfaces that convert visitors.',
    description:
      'We engineer reactive, type-safe web applications and headless storefronts delivering fluid 60fps micro-animations, WCAG 2.2 AA-oriented accessibility, and Core Web Vitals optimization across every viewport.',
    telemetryMetrics: [
      { label: 'Core Web Vitals', value: 'Fast FCP', spec: 'Edge-cached SSR target', accent: '#598BFF' },
      { label: 'Type Safety', value: 'Strict TS', spec: 'End-to-end contracts', accent: '#02C415' },
      { label: 'Accessibility Standard', value: 'WCAG 2.2', spec: 'AA-oriented engineering', accent: '#38BDF8' },
    ],
    pipeline: [
      { label: 'Edge CDN', detail: 'Global Anycast Routing' },
      { label: 'Next.js 15 SSR', detail: 'Streaming Server HTML' },
      { label: '60fps Hydration', detail: 'GPU-Accelerated Motion' },
      { label: 'Core Web Vitals', detail: 'Performance-Optimized' },
    ],
    technologies: [
      {
        name: 'Next.js 15',
        role: 'Server Components & Streaming SSR',
        tag: 'CORE FRAMEWORK',
        brandColor: '#FFFFFF',
        badge: 'ACTIVE // v15.5',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 180 180" fill="none">
            <mask height="180" id="cap_mask_next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
              <circle cx="90" cy="90" fill="#000" r="90" />
            </mask>
            <g mask="url(#cap_mask_next)">
              <circle cx="90" cy="90" fill="#000" r="90" />
              <path d="M149.508 157.508L69.14 54H54V125.962H66.8672V69.9678L139.98 164.792C143.344 162.607 146.529 160.168 149.508 157.508Z" fill="url(#cap_paint0_next)" />
              <rect fill="url(#cap_paint1_next)" height="72" width="12.871" x="115.129" y="54" />
            </g>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="cap_paint0_next" x1="109" x2="144.5" y1="116.5" y2="160.5">
                <stop stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="cap_paint1_next" x1="121.564" x2="120.916" y1="54" y2="104.571">
                <stop stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        ),
      },
      {
        name: 'React 19',
        role: 'Concurrent UI Architecture',
        tag: 'UI LIBRARY',
        brandColor: '#00D8FF',
        badge: 'ASYNC TRANSITIONS',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 115.3 100" fill="#00D8FF">
            <path d="M57.65 65.25a15.25 15.25 0 1 0 0-30.5 15.25 15.25 0 0 0 0 30.5zm0-24a8.75 8.75 0 1 1 0 17.5 8.75 8.75 0 0 1 0-17.5zM113.8 38.6C109.9 23.3 98.4 12 83.2 8.1 72.8 5.4 62.1 6.5 52.3 11 41.5 5.5 29.5 4.3 18.2 8.1 3 12-8.5 23.3-12.4 38.6c-4 15.6-1 31.9 8.2 44.4 9.8 13.3 24.6 20.3 40.5 19.3 15.9 1 30.7-6 40.5-19.3 9.2-12.5 12.2-28.8 8.2-44.4zm-14.8 28.5c-7.7 10.4-19.6 15.9-32.6 15.1-4.7-.3-9.4-1.6-13.7-3.9 6.2-7 12.9-15.6 18.5-24.6 9.8 4 19.8 9.3 27.8 13.4zM57.65 14.5c4.7.3 9.4 1.6 13.7 3.9-6.2 7-12.9 15.6-18.5 24.6-9.8-4-19.8-9.3-27.8-13.4 7.7-10.4 19.6-15.9 32.6-15.1zm-39.2 16c6.8 3.5 14.9 7.7 22.9 11.2-3.1 5.4-6.3 11.1-9.5 16.9-8.4-1.9-16.7-5.1-23.7-9.5 2.1-7.1 5.8-13.6 10.3-18.6zm-10.3 36.6c2.1 7.1 5.8 13.6 10.3 18.6 7.7 8.5 18 13.6 29.1 14.2-6.8-3.5-14.9-7.7-22.9-11.2 3.1-5.4 6.3-11.1 9.5-16.9-5.4-1.2-10.8-2.8-16-4.7zm68.3 32.8c-11.1-.6-21.4-5.7-29.1-14.2-4.5-5-8.2-11.5-10.3-18.6 6.8-3.5 14.9-7.7 22.9-11.2 3.1-5.4 6.3-11.1 9.5-16.9 2.5.6 4.9 1.2 7 2zm10.3-18.6c-4.5 5-8.2 11.5-10.3 18.6-6.8-3.5-14.9-7.7-22.9-11.2 3.1-5.4 6.3-11.1 9.5-16.9 8.4 1.9 16.7 5.1 23.7 9.5z" />
          </svg>
        ),
      },
      {
        name: 'TypeScript',
        role: 'Static Type Contracts & Verification',
        tag: 'LANGUAGE',
        brandColor: '#3178C6',
        badge: 'ZERO REGRESSIONS',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 128 128" fill="#3178C6">
            <path d="M1.5 0h125c.8 0 1.5.7 1.5 1.5v125c0 .8-.7 1.5-1.5 1.5H1.5c-.8 0-1.5-.7-1.5-1.5V1.5C0 .7.7 0 1.5 0z" />
            <path fill="#FFF" d="M37.3 54.3v10.6h17.9V112h13.7V64.9h17.9V54.3H37.3zm55.3 22.8c0-3.3 1.2-6 3.5-8.1 2.3-2.1 5.3-3.2 9.1-3.2 4.1 0 7.5 1.1 10.1 3.4 2.6 2.3 4.1 5.4 4.5 9.4h-12.8c-.2-1.3-.7-2.3-1.6-3.1-.9-.8-2-1.2-3.4-1.2-1.3 0-2.3.4-3.1 1.1-.8.7-1.2 1.6-1.2 2.7 0 1 .4 1.8 1.1 2.5.7.7 2 1.4 3.7 2.1l6.1 2.4c4.4 1.7 7.7 3.8 9.9 6.2 2.2 2.4 3.3 5.4 3.3 9 0 3.8-1.4 6.9-4.1 9.3-2.7 2.4-6.3 3.6-10.9 3.6-4.5 0-8.2-1.3-11.1-3.8-2.9-2.5-4.4-6-4.7-10.4h13.2c.2 1.7.8 3 1.8 3.8 1 .8 2.3 1.3 4 1.3 1.5 0 2.7-.4 3.6-1.1.9-.7 1.3-1.7 1.3-2.9 0-1.1-.4-2-1.2-2.7-.8-.7-2.1-1.4-4-2.1l-6-2.4c-4.1-1.6-7.1-3.6-9.1-5.9-1.9-2.5-2.8-5.3-2.8-8.5z" />
          </svg>
        ),
      },
      {
        name: 'Design Tokens',
        role: 'Deterministic Zero-Bloat CSS Architecture',
        tag: 'SYSTEMS',
        brandColor: '#598BFF',
        badge: 'FLUID 60FPS',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#598BFF">
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.8l7 3.5v7.4l-7-3.5V9.8zm9 10.9v-7.4l7-3.5v7.4l-7 3.5z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'ai',
    step: '02',
    name: 'Intelligent Workflows & AI',
    shortTag: 'AI & AUTOMATION',
    badge: 'OPERATIONAL EFFICIENCY & AGENTS',
    accentColor: '#02C415',
    outcome: 'Automate repetitive workflows and unlock actionable decision intelligence.',
    description:
      'We architect private, zero-data-retention AI retrieval and document processing systems. Pairing optical character recognition with deterministic validation pipelines that eradicate administrative drag.',
    telemetryMetrics: [
      { label: 'Grounding Architecture', value: 'Citations', spec: 'Deterministic guardrails', accent: '#02C415' },
      { label: 'Workflow Automation', value: 'HITL Gated', spec: 'Human-in-loop review', accent: '#598BFF' },
      { label: 'Data Isolation', value: 'Private VPC', spec: 'Zero-retention endpoints', accent: '#38BDF8' },
    ],
    pipeline: [
      { label: 'OCR Ingestion', detail: 'Structured Extraction' },
      { label: 'Vector RAG', detail: 'Semantic Retrieval' },
      { label: 'Agentic Logic', detail: 'Deterministic Guardrails' },
      { label: 'Audit Trail', detail: 'Human-in-Loop Signoff' },
    ],
    technologies: [
      {
        name: 'LLM Orchestration',
        role: 'Deterministic Guardrails & Agentic Logic',
        tag: 'INTELLIGENCE CORE',
        brandColor: '#10A37F',
        badge: 'ZERO-RETENTION',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#10A37F">
            <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073z" />
          </svg>
        ),
      },
      {
        name: 'Pinecone Vector DB',
        role: 'High-Dimensional Semantic RAG Indexing',
        tag: 'VECTOR SEARCH',
        brandColor: '#598BFF',
        badge: '<20MS COSINE SEARCH',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#598BFF">
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.2L19.8 7 12 9.8 4.2 7 12 4.2zM4 8.5l7 2.5v8.5l-7-3.5V8.5zm9 11v-8.5l7-2.5v7.5l-7 3.5z" />
          </svg>
        ),
      },
      {
        name: 'Python FastAPI',
        role: 'High-Throughput Async Inference Endpoints',
        tag: 'BACKEND RUNTIME',
        brandColor: '#3776AB',
        badge: 'ASYNC PARALLEL',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#3776AB">
            <path d="M11.91 0c-3.1 0-5.85.5-5.85 2.87v2.16h5.92v.72H3.72C1.34 5.75 0 7.37 0 10.45c0 3.08 1.77 4.54 3.72 4.54h1.72v-2.38c0-1.7 1.44-3.13 3.13-3.13h5.86c1.45 0 2.63-1.18 2.63-2.63V2.87C17.06.49 14.65 0 11.91 0zm-2.4 1.48a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92zM12.09 24c3.1 0 5.85-.5 5.85-2.87v-2.16H12.02v-.72h8.26C22.66 18.25 24 16.63 24 13.55c0-3.08-1.77-4.54-3.72-4.54h-1.72v2.38c0 1.7-1.44 3.13-3.13 3.13H9.57c-1.45 0-2.63 1.18-2.63 2.63v4.02c0 2.38 2.41 2.83 5.15 2.83zm2.4-1.48a.96.96 0 1 1 0-1.92.96.96 0 0 1 0 1.92z" />
          </svg>
        ),
      },
      {
        name: 'Temporal Workflows',
        role: 'Fault-Tolerant State Machine Execution',
        tag: 'ORCHESTRATION',
        brandColor: '#02C415',
        badge: 'AUTOMATIC RETRY',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#02C415">
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.37z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'commerce',
    step: '03',
    name: 'Headless Commerce & Conversion',
    shortTag: 'GLOBAL COMMERCE',
    badge: 'REVENUE & CONVERSION AT SCALE',
    accentColor: '#38BDF8',
    outcome: 'High-velocity storefronts engineered for maximum average order value.',
    description:
      'We decouple legacy monolithic stores into lightning-fast headless frontends featuring custom cart transform functions, localized currency routing, and bespoke 3D WebGL configurators.',
    telemetryMetrics: [
      { label: 'Storefront Architecture', value: 'Headless', spec: 'Decoupled Next.js edge', accent: '#02C415' },
      { label: 'Checkout Resilience', value: 'Idempotent', spec: 'High-concurrency ready', accent: '#598BFF' },
      { label: 'Global Localization', value: 'Multi-Region', spec: 'Currency & tax routing', accent: '#38BDF8' },
    ],
    pipeline: [
      { label: 'Edge Storefront', detail: 'Instant Geo-Localization' },
      { label: 'Storefront API', detail: 'Sub-50ms GraphQL' },
      { label: 'Cart Transforms', detail: 'Dynamic Bundle Rules' },
      { label: 'Global Checkout', detail: 'Multi-Currency Routing' },
    ],
    technologies: [
      {
        name: 'Shopify Plus',
        role: 'Custom Checkout & Cart Transform Functions',
        tag: 'COMMERCE CORE',
        brandColor: '#96BF48',
        badge: 'STOREFRONT GRAPHQL',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#96BF48">
            <path d="M19.5 6.5l-2.4-1.2c-.2-.1-.5 0-.6.2L14.7 9h-5.4L7.5 5.5c-.1-.2-.4-.3-.6-.2L4.5 6.5c-.3.1-.4.4-.3.7l2.8 13.5c.1.3.3.5.6.5h8.8c.3 0 .5-.2.6-.5l2.8-13.5c.1-.3 0-.6-.3-.7z" />
          </svg>
        ),
      },
      {
        name: 'Stripe Payments',
        role: 'Multi-Currency Global Settlements & Webhooks',
        tag: 'PAYMENTS',
        brandColor: '#635BFF',
        badge: 'SUB-50MS IDEMPOTENT',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#635BFF">
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.365.5 6.855.5 3.038 3.521 3.038 8.026c0 4.675 3.992 6.136 7.425 7.415 2.193.817 3.376 1.488 3.376 2.47 0 .979-.844 1.472-2.227 1.472-2.158 0-5.18-.999-7.25-2.21l-.9 5.568c2.194 1.077 5.485 1.759 8.685 1.759 5.869 0 9.873-2.906 9.873-7.534 0-4.665-3.805-6.22-8.044-7.826z" />
          </svg>
        ),
      },
      {
        name: 'Sanity CMS',
        role: 'Real-Time Structured Merchandising Content',
        tag: 'HEADLESS CMS',
        brandColor: '#F03E2F',
        badge: 'INSTANT LIVE PREVIEW',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#F03E2F">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-6h2v6zm0-8h-2V7h2v1z" />
          </svg>
        ),
      },
      {
        name: 'Algolia',
        role: 'Instant Predictive Catalog Search & Filtering',
        tag: 'SEARCH ENGINE',
        brandColor: '#598BFF',
        badge: '<15MS RESPONSE',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#598BFF">
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1 14.93V17a1 1 0 0 1-2 0v-.07A6 6 0 0 1 6.07 12H6a1 1 0 0 1 0-2h.07A6 6 0 0 1 11 4.93V5a1 1 0 0 1 2 0v-.07A6 6 0 0 1 17.93 10H18a1 1 0 0 1 0 2h-.07A6 6 0 0 1 13 16.93z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'cloud',
    step: '04',
    name: 'Cloud Engineering & Reliability',
    shortTag: 'SYSTEM RESILIENCE',
    badge: 'SYSTEM STABILITY & SCALE',
    accentColor: '#A78BFA',
    outcome: 'Resilient infrastructure that scales seamlessly without downtime or cost bloat.',
    description:
      'We architect multi-region cloud clusters on AWS and edge infrastructure with automated CI/CD canary rollouts, containerization, and proactive telemetry observability.',
    telemetryMetrics: [
      { label: 'Resilience Target', value: 'Multi-AZ', spec: 'Automated failover design', accent: '#02C415' },
      { label: 'Infrastructure as Code', value: 'Terraform', spec: 'Versioned cloud state', accent: '#598BFF' },
      { label: 'Compute Efficiency', value: 'Auto-Scale', spec: 'Right-sized containers', accent: '#A78BFA' },
    ],
    pipeline: [
      { label: 'Edge WAF', detail: 'Zero-Trust Filtering' },
      { label: 'AWS ECS / K8s', detail: 'Multi-AZ Auto-Scale' },
      { label: 'Redis Mesh', detail: 'Sub-ms Cache Layer' },
      { label: 'Observability', detail: 'Real-Time Telemetry' },
    ],
    technologies: [
      {
        name: 'Amazon Web Services',
        role: 'Multi-Region Elastic Compute, ECS & S3',
        tag: 'CLOUD PLATFORM',
        brandColor: '#FF9900',
        badge: 'MULTI-AZ CLUSTER',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF9900">
            <path d="M18.8 17.5c-4.6 2.4-10.4 2.5-14.8.4-.2-.1-.4.1-.2.3 3.9 3.2 9.8 3.5 15.2.8.3-.2.1-.6-.2-.5zM20.2 16.2c-.4-.5-2.6-.3-3.6-.1-.3 0-.4.3-.1.5 1.1.7 2.8.5 3.3.1.5-.4.8-1.5.4-.5zM7.3 10.4c-.2-.7-.6-1.3-1.2-1.7-.8-.5-1.8-.7-2.8-.5-.8.2-1.5.7-1.9 1.4-.4.8-.5 1.7-.2 2.6.3.8.9 1.5 1.7 1.8.8.4 1.8.4 2.7.1.6-.2 1.1-.6 1.5-1.1v.9h1.6V8.6H7.3v1.8zm-1.4 2.4c-.4.4-.9.6-1.5.5-.5-.1-1-.4-1.2-.9-.3-.5-.3-1.1-.1-1.6.2-.5.6-.9 1.1-1.1.6-.2 1.2-.1 1.7.3.4.4.6.9.5 1.5-.1.5-.3.9-.5 1.3z" />
          </svg>
        ),
      },
      {
        name: 'Docker & Microservices',
        role: 'Isolated, Self-Healing Container Packaging',
        tag: 'CONTAINERIZATION',
        brandColor: '#2496ED',
        badge: 'REPRODUCIBLE BUILDS',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#2496ED">
            <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186h-2.12a.186.186 0 0 0-.185.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185" />
          </svg>
        ),
      },
      {
        name: 'Kubernetes (K8s)',
        role: 'Automated Container Scheduling & Scaling',
        tag: 'ORCHESTRATION',
        brandColor: '#326CE5',
        badge: 'ZERO DOWNTIME',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#326CE5">
            <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.3l8.4 4.8v9.8L12 21.7 3.6 16.9V7.1L12 2.3zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
          </svg>
        ),
      },
      {
        name: 'Terraform (IaC)',
        role: 'Declarative Cloud Infrastructure as Code',
        tag: 'DEVOPS / IAC',
        brandColor: '#A78BFA',
        badge: 'IMMUTABLE AUDITED',
        iconSvg: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#A78BFA">
            <path d="M1.5 0v7.6l6.6 3.8V3.8L1.5 0zm7.6 11.4v7.6l6.6 3.8v-7.6l-6.6-3.8zm0-7.6v7.6l6.6-3.8V0L9.1 3.8zm7.6 3.8v7.6l6.6-3.8V3.8l-6.6 3.8z" />
          </svg>
        ),
      },
    ],
  },
];

export const CapabilitiesEcosystem: React.FC = () => {
  const [activeCluster, setActiveCluster] = useState<string>('frontend');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [activePipeStep, setActivePipeStep] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selected = CLUSTERS.find((c) => c.id === activeCluster) || CLUSTERS[0];

  // Auto-advance the live pipeline signal every 2.2s so the architecture feels alive
  useEffect(() => {
    if (checkPrefersReducedMotion()) return;
    setActivePipeStep(0);
    const interval = setInterval(() => {
      setActivePipeStep((prev) => (prev + 1) % 4);
    }, 2200);
    return () => clearInterval(interval);
  }, [activeCluster]);

  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        '.sb-cap-header',
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
        '.sb-cap-dock',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
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

  // Smooth Interactive Tab Transition on Cluster Switch
  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;
      const { gsap } = initGSAP();
      const panel = panelRef.current;
      if (!panel) return;

      gsap.fromTo(
        panel,
        { opacity: 0.55, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.34,
          ease: ANIMATION_CONFIG.ease.smooth,
          clearProps: 'opacity,transform',
        }
      );
    },
    { scope: sectionRef, dependencies: [activeCluster] }
  );

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (index + 1) % CLUSTERS.length;
      setActiveCluster(CLUSTERS[nextIdx].id);
      document.getElementById(`tab-${CLUSTERS[nextIdx].id}`)?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (index - 1 + CLUSTERS.length) % CLUSTERS.length;
      setActiveCluster(CLUSTERS[prevIdx].id);
      document.getElementById(`tab-${CLUSTERS[prevIdx].id}`)?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveCluster(CLUSTERS[0].id);
      document.getElementById(`tab-${CLUSTERS[0].id}`)?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveCluster(CLUSTERS[CLUSTERS.length - 1].id);
      document.getElementById(`tab-${CLUSTERS[CLUSTERS.length - 1].id}`)?.focus();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      style={{
        backgroundColor: '#050A14',
        color: '#FFFFFF',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(4.5rem, 8vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Engineering Dot-Matrix Grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.14) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, black 35%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, black 35%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Dynamic Accent Ambient Glow that shifts with selected cluster */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-60px',
          right: '8%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${selected.accentColor}26 0%, transparent 65%)`,
          filter: 'blur(72px)',
          transition: 'background 500ms ease',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-80px',
          left: '4%',
          width: '440px',
          height: '440px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(2, 196, 21, 0.12) 0%, transparent 65%)',
          filter: 'blur(72px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div
          className="sb-cap-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: 'clamp(2rem, 3.5vw, 3rem)',
          }}
        >
          <div style={{ maxWidth: '760px' }}>
            <div style={{ display: 'inline-flex', marginBottom: '14px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  backgroundColor: 'rgba(89, 139, 255, 0.1)',
                  border: '1px solid rgba(89, 139, 255, 0.28)',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
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
                02 // CAPABILITIES &amp; ARCHITECTURE
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(2.15rem, 4vw, 3.25rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
                color: '#FFFFFF',
                margin: '0 0 14px 0',
              }}
            >
              Connected engineering choices.{' '}
              <span
                style={{
                  background: 'linear-gradient(120deg, #598BFF 0%, #38BDF8 50%, #02C415 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Measurable outcomes.
              </span>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                lineHeight: 1.65,
                color: '#94A3B8',
                margin: 0,
              }}
            >
              Explore our four core engineering layers—each architected for zero vendor lock-in, sub-second speed, and
              commercial impact.
            </p>
          </div>
        </div>

        {/* Sleek Interactive Cluster Selector Tabs */}
        <div
          className="sb-cap-dock"
          role="tablist"
          aria-label="Engineering Capability Clusters"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          {CLUSTERS.map((cluster, idx) => {
            const isActive = cluster.id === activeCluster;
            return (
              <button
                key={cluster.id}
                role="tab"
                id={`tab-${cluster.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${cluster.id}`}
                tabIndex={isActive ? 0 : -1}
                type="button"
                onClick={() => setActiveCluster(cluster.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                style={{
                  position: 'relative',
                  padding: '16px 20px',
                  borderRadius: '14px',
                  background: isActive
                    ? `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.78) 100%)`
                    : 'rgba(15, 23, 42, 0.45)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  border: isActive
                    ? `1px solid ${cluster.accentColor}`
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  boxShadow: isActive
                    ? `0 12px 30px -10px ${cluster.accentColor}55, inset 0 1px 0 rgba(255, 255, 255, 0.12)`
                    : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-family-mono)',
                      color: isActive ? cluster.accentColor : '#64748B',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {cluster.step} // {cluster.shortTag}
                  </span>
                  {isActive && (
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        backgroundColor: '#02C415',
                        boxShadow: '0 0 8px #02C415',
                      }}
                    />
                  )}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-family-heading)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    lineHeight: 1.25,
                    color: isActive ? '#FFFFFF' : '#CBD5E1',
                  }}
                >
                  {cluster.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Open Glassmorphic Architectural Showcase (No heavy nested boxes) */}
        <div
          ref={panelRef}
          role="tabpanel"
          id={`panel-${selected.id}`}
          aria-labelledby={`tab-${selected.id}`}
          className="sb-glass-capability"
          style={{
            borderRadius: '22px',
            padding: 'clamp(1.75rem, 3.8vw, 3.25rem)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(2.25rem, 4.5vw, 4rem)',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Narrative + High-Contrast Metrics + Action */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-family-mono)',
                  color: selected.accentColor,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                <span
                  style={{
                    width: '18px',
                    height: '2px',
                    backgroundColor: selected.accentColor,
                    display: 'inline-block',
                  }}
                />
                {selected.badge}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'clamp(1.65rem, 2.5vw, 2.25rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.18,
                  color: '#FFFFFF',
                  margin: '0 0 14px 0',
                }}
              >
                {selected.outcome}
              </h3>

              <p
                style={{
                  fontSize: '1rem',
                  color: '#94A3B8',
                  lineHeight: 1.68,
                  margin: '0 0 28px 0',
                }}
              >
                {selected.description}
              </p>

              {/* Clean Metric Highlights with Left Accent Bars */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
                  gap: '16px',
                  marginBottom: '30px',
                  paddingTop: '20px',
                  paddingBottom: '20px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {selected.telemetryMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    style={{
                      paddingLeft: '14px',
                      borderLeft: `2px solid ${metric.accent}`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-family-heading)',
                        fontSize: 'clamp(1.35rem, 2vw, 1.65rem)',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        lineHeight: 1.1,
                        marginBottom: '4px',
                      }}
                    >
                      {metric.value}
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#E2E8F0', lineHeight: 1.3 }}>
                      {metric.label}
                    </div>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        color: '#64748B',
                        marginTop: '3px',
                        fontFamily: 'var(--font-family-mono)',
                      }}
                    >
                      {metric.spec}
                    </div>
                  </div>
                ))}
              </div>

              {/* High-Contrast CTA Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
                <Link
                  href="/start-a-project"
                  className="sb-btn sb-btn--md"
                  style={{
                    textDecoration: 'none',
                    backgroundColor: '#598BFF',
                    color: '#FFFFFF',
                    border: '1px solid rgba(147, 197, 253, 0.45)',
                    boxShadow: '0 10px 28px -6px rgba(89, 139, 255, 0.55)',
                  }}
                >
                  <span>Discuss Your Architecture</span>
                  <ArrowRight size={14} className="sb-btn__arrow" />
                </Link>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.78rem',
                    color: '#CBD5E1',
                    fontFamily: 'var(--font-family-mono)',
                  }}
                >
                  <span style={{ color: '#02C415', fontWeight: 700 }}>✓</span> Direct Senior Architect Access
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Bento Stack + Live Animated Data Flow */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* 2x2 Interactive Tech Cards with Brand Spotlight */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                  gap: '14px',
                }}
              >
                {selected.technologies.map((tech) => {
                  const isHovered = hoveredTech === tech.name;
                  return (
                    <div
                      key={tech.name}
                      onMouseEnter={() => setHoveredTech(tech.name)}
                      onMouseLeave={() => setHoveredTech(null)}
                      style={{
                        background: isHovered
                          ? `linear-gradient(145deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)`
                          : 'rgba(15, 23, 42, 0.55)',
                        borderRadius: '16px',
                        border: isHovered
                          ? `1px solid ${tech.brandColor === '#FFFFFF' ? '#598BFF' : tech.brandColor}`
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '142px',
                        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                        boxShadow: isHovered
                          ? `0 16px 32px -12px ${tech.brandColor === '#FFFFFF' ? 'rgba(89, 139, 255, 0.35)' : `${tech.brandColor}44`}`
                          : '0 4px 16px rgba(0, 0, 0, 0.25)',
                        transition: 'all 240ms cubic-bezier(0.16, 1, 0.3, 1)',
                        cursor: 'default',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '12px',
                          }}
                        >
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '10px',
                              backgroundColor: 'rgba(255, 255, 255, 0.06)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {tech.iconSvg}
                          </div>
                          <span
                            style={{
                              fontSize: '0.62rem',
                              fontFamily: 'var(--font-family-mono)',
                              color: '#94A3B8',
                              fontWeight: 700,
                              letterSpacing: '0.05em',
                            }}
                          >
                            {tech.tag}
                          </span>
                        </div>

                        <div
                          style={{
                            fontSize: '1.02rem',
                            fontWeight: 800,
                            color: '#FFFFFF',
                            marginBottom: '4px',
                            letterSpacing: '-0.015em',
                          }}
                        >
                          {tech.name}
                        </div>

                        <div
                          style={{
                            fontSize: '0.78rem',
                            color: '#94A3B8',
                            lineHeight: 1.45,
                          }}
                        >
                          {tech.role}
                        </div>
                      </div>

                      <div
                        style={{
                          marginTop: '12px',
                          paddingTop: '10px',
                          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.64rem',
                            fontFamily: 'var(--font-family-mono)',
                            color: selected.accentColor,
                            fontWeight: 700,
                          }}
                        >
                          {tech.badge}
                        </span>
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: isHovered ? '#02C415' : 'rgba(148, 163, 184, 0.35)',
                            boxShadow: isHovered ? '0 0 8px #02C415' : 'none',
                            transition: 'all 200ms ease',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Interactive Data Flow Visualizer */}
              <div
                style={{
                  backgroundColor: 'rgba(10, 15, 29, 0.72)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '16px 18px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-family-mono)',
                      color: '#94A3B8',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                    }}
                  >
                    LIVE EXECUTION PIPELINE
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.65rem',
                      fontFamily: 'var(--font-family-mono)',
                      color: '#02C415',
                      fontWeight: 700,
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#02C415',
                        boxShadow: '0 0 8px #02C415',
                      }}
                    />
                    STAGE 0{activePipeStep + 1} ACTIVE
                  </span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                    gap: '10px',
                  }}
                >
                  {selected.pipeline.map((step, idx) => {
                    const isStepActive = idx === activePipeStep;
                    return (
                      <button
                        key={step.label}
                        type="button"
                        onClick={() => setActivePipeStep(idx)}
                        style={{
                          textAlign: 'left',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          backgroundColor: isStepActive ? 'rgba(89, 139, 255, 0.14)' : 'rgba(255, 255, 255, 0.03)',
                          border: isStepActive
                            ? `1px solid ${selected.accentColor}`
                            : '1px solid rgba(255, 255, 255, 0.06)',
                          transition: 'all 250ms ease',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.62rem',
                            fontFamily: 'var(--font-family-mono)',
                            color: isStepActive ? selected.accentColor : '#64748B',
                            fontWeight: 700,
                            marginBottom: '3px',
                          }}
                        >
                          0{idx + 1}
                        </div>
                        <div
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: isStepActive ? '#FFFFFF' : '#CBD5E1',
                            lineHeight: 1.25,
                          }}
                        >
                          {step.label}
                        </div>
                        <div
                          style={{
                            fontSize: '0.66rem',
                            color: isStepActive ? '#BFDBFE' : '#64748B',
                            marginTop: '2px',
                            lineHeight: 1.3,
                          }}
                        >
                          {step.detail}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
