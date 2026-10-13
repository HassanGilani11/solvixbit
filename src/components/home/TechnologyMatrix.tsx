'use client';

import React, { useState } from 'react';
import { Container } from '../layout';
import { FadeUp } from '../motion';
import { ArrowRight } from '../icons';
import Link from 'next/link';

interface TechItem {
  name: string;
  role: string;
  brandColor: string;
  iconSvg: React.ReactNode;
  tag: string;
}

interface TechTabCategory {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  badge: string;
  headline: string;
  description: string;
  metrics: string[];
  techs: TechItem[];
}

const CATEGORIES: TechTabCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend & Modern Web',
    shortName: 'Frontend',
    icon: '⚡',
    badge: 'USER EXPERIENCE & PERFORMANCE',
    headline: 'Sub-second, responsive digital interfaces with reactive architecture.',
    description: 'We build reactive, type-safe frontend web applications and headless storefronts with fluid 60fps micro-animations and perfect accessibility scores.',
    metrics: ['Sub-800ms First Contentful Paint', '100% Strict TypeScript Type Safety', 'WCAG 2.1 AA Accessibility'],
    techs: [
      {
        name: 'Next.js 15',
        role: 'Server Components & Edge SSR',
        brandColor: '#000000',
        tag: 'Framework',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 180 180" fill="none">
            <mask height="180" id="mask0_next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
              <circle cx="90" cy="90" fill="#000" r="90" />
            </mask>
            <g mask="url(#mask0_next)">
              <circle cx="90" cy="90" fill="#000" r="90" />
              <path d="M149.508 157.508L69.14 54H54V125.962H66.8672V69.9678L139.98 164.792C143.344 162.607 146.529 160.168 149.508 157.508Z" fill="url(#paint0_linear_next)" />
              <rect fill="url(#paint1_linear_next)" height="72" width="12.871" x="115.129" y="54" />
            </g>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_next" x1="109" x2="144.5" y1="116.5" y2="160.5">
                <stop stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_next" x1="121.564" x2="120.916" y1="54" y2="104.571">
                <stop stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        ),
      },
      {
        name: 'React 19',
        role: 'Declarative Component Core',
        brandColor: '#00D8FF',
        tag: 'UI Library',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 115.3 100" fill="#00D8FF">
            <path d="M57.65 65.25a15.25 15.25 0 1 0 0-30.5 15.25 15.25 0 0 0 0 30.5zm0-24a8.75 8.75 0 1 1 0 17.5 8.75 8.75 0 0 1 0-17.5zM113.8 38.6C109.9 23.3 98.4 12 83.2 8.1 72.8 5.4 62.1 6.5 52.3 11 41.5 5.5 29.5 4.3 18.2 8.1 3 12-8.5 23.3-12.4 38.6c-4 15.6-1 31.9 8.2 44.4 9.8 13.3 24.6 20.3 40.5 19.3 15.9 1 30.7-6 40.5-19.3 9.2-12.5 12.2-28.8 8.2-44.4zm-14.8 28.5c-7.7 10.4-19.6 15.9-32.6 15.1-4.7-.3-9.4-1.6-13.7-3.9 6.2-7 12.9-15.6 18.5-24.6 9.8 4 19.8 9.3 27.8 13.4zM57.65 14.5c4.7.3 9.4 1.6 13.7 3.9-6.2 7-12.9 15.6-18.5 24.6-9.8-4-19.8-9.3-27.8-13.4 7.7-10.4 19.6-15.9 32.6-15.1zm-39.2 16c6.8 3.5 14.9 7.7 22.9 11.2-3.1 5.4-6.3 11.1-9.5 16.9-8.4-1.9-16.7-5.1-23.7-9.5 2.1-7.1 5.8-13.6 10.3-18.6zm-10.3 36.6c2.1 7.1 5.8 13.6 10.3 18.6 7.7 8.5 18 13.6 29.1 14.2-6.8-3.5-14.9-7.7-22.9-11.2 3.1-5.4 6.3-11.1 9.5-16.9-5.4-1.2-10.8-2.8-16-4.7zm68.3 32.8c-11.1-.6-21.4-5.7-29.1-14.2-4.5-5-8.2-11.5-10.3-18.6 6.8-3.5 14.9-7.7 22.9-11.2 3.1 5.4 6.3 11.1 9.5 16.9 2.5.6 4.9 1.2 7 2zm10.3-18.6c-4.5 5-8.2 11.5-10.3 18.6-6.8-3.5-14.9-7.7-22.9-11.2 3.1-5.4 6.3-11.1 9.5-16.9 8.4 1.9 16.7 5.1 23.7 9.5z" />
          </svg>
        ),
      },
      {
        name: 'TypeScript',
        role: 'Static Type-Safe Architecture',
        brandColor: '#3178C6',
        tag: 'Language',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 128 128" fill="#3178C6">
            <path d="M1.5 0h125c.8 0 1.5.7 1.5 1.5v125c0 .8-.7 1.5-1.5 1.5H1.5c-.8 0-1.5-.7-1.5-1.5V1.5C0 .7.7 0 1.5 0z" />
            <path fill="#FFF" d="M37.3 54.3v10.6h17.9V112h13.7V64.9h17.9V54.3H37.3zm55.3 22.8c0-3.3 1.2-6 3.5-8.1 2.3-2.1 5.3-3.2 9.1-3.2 4.1 0 7.5 1.1 10.1 3.4 2.6 2.3 4.1 5.4 4.5 9.4h-12.8c-.2-1.3-.7-2.3-1.6-3.1-.9-.8-2-1.2-3.4-1.2-1.3 0-2.3.4-3.1 1.1-.8.7-1.2 1.6-1.2 2.7 0 1 .4 1.8 1.1 2.5.7.7 2 1.4 3.7 2.1l6.1 2.4c4.4 1.7 7.7 3.8 9.9 6.2 2.2 2.4 3.3 5.4 3.3 9 0 3.8-1.4 6.9-4.1 9.3-2.7 2.4-6.3 3.6-10.9 3.6-4.5 0-8.2-1.3-11.1-3.8-2.9-2.5-4.4-6-4.7-10.4h13.2c.2 1.7.8 3 1.8 3.8 1 .8 2.3 1.3 4 1.3 1.5 0 2.7-.4 3.6-1.1.9-.7 1.3-1.7 1.3-2.9 0-1.1-.4-2-1.2-2.7-.8-.7-2.1-1.4-4-2.1l-6-2.4c-4.1-1.6-7.1-3.6-9.1-5.9-1.9-2.5-2.8-5.3-2.8-8.5z" />
          </svg>
        ),
      },
      {
        name: 'Tailwind CSS',
        role: 'Scalable Utility Design System',
        brandColor: '#38BDF8',
        tag: 'Styling',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#38BDF8">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
          </svg>
        ),
      },
      {
        name: 'Framer Motion',
        role: 'GPU-Accelerated Smooth Motion',
        brandColor: '#EA4C89',
        tag: 'Animation',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#EA4C89">
            <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
          </svg>
        ),
      },
      {
        name: 'Vue.js / Nuxt',
        role: 'Component Engine Alternative',
        brandColor: '#42B883',
        tag: 'Framework',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#42B883">
            <path d="M24 1.61H14.06L12 5.16 9.94 1.61H0L12 22.39 24 1.61z" />
            <path fill="#35495E" d="M18.8 1.61H14.06L12 5.16 9.94 1.61H5.2L12 13.36 18.8 1.61z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & Distributed Systems',
    shortName: 'Backend',
    icon: '⚙️',
    badge: 'CORE COMPUTATION & SCALE',
    headline: 'High-throughput microservices, API gateways, and asynchronous event streams.',
    description: 'We engineer fault-tolerant, horizontally auto-scaling server runtimes capable of handling high concurrency with sub-50ms latency.',
    metrics: ['Sub-50ms API Latency (p95)', 'Zero-Downtime Blue/Green Releases', 'Stateless Auto-Scaling'],
    techs: [
      {
        name: 'Node.js & NestJS',
        role: 'High-Concurrency Server Framework',
        brandColor: '#339933',
        tag: 'Runtime',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#339933">
            <path d="M12 0l11 6.35v11.3L12 24 1 17.65V6.35L12 0zm0 2.22L3.11 7.35v9.3L12 21.78l8.89-5.13v-9.3L12 2.22z" />
          </svg>
        ),
      },
      {
        name: 'Python (FastAPI)',
        role: 'Async REST & Microservices',
        brandColor: '#3776AB',
        tag: 'Language',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#3776AB">
            <path d="M11.91 0c-3.1 0-5.85.5-5.85 2.87v2.16h5.92v.72H3.72C1.34 5.75 0 7.37 0 10.45c0 3.08 1.77 4.54 3.72 4.54h1.72v-2.38c0-1.7 1.44-3.13 3.13-3.13h5.86c1.45 0 2.63-1.18 2.63-2.63V2.87C17.06.49 14.65 0 11.91 0zm-2.4 1.48a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92zM12.09 24c3.1 0 5.85-.5 5.85-2.87v-2.16H12.02v-.72h8.26C22.66 18.25 24 16.63 24 13.55c0-3.08-1.77-4.54-3.72-4.54h-1.72v2.38c0 1.7-1.44 3.13-3.13 3.13H9.57c-1.45 0-2.63 1.18-2.63 2.63v4.02c0 2.38 2.41 2.83 5.15 2.83zm2.4-1.48a.96.96 0 1 1 0-1.92.96.96 0 0 1 0 1.92z" />
          </svg>
        ),
      },
      {
        name: 'Go (Golang)',
        role: 'High-Performance Distributed Services',
        brandColor: '#00ADD8',
        tag: 'Language',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#00ADD8">
            <path d="M1.98 9.54c.26-.95.83-1.79 1.62-2.38 1.25-.94 2.84-1.28 4.38-.96 1.05.22 2.01.8 2.72 1.6.43.48.74 1.05.9 1.67h-2.13c-.15-.35-.38-.66-.69-.88-.5-.36-1.12-.49-1.73-.39-.77.13-1.43.68-1.68 1.42-.35 1.03-.02 2.21.82 2.92.65.55 1.55.7 2.37.4.45-.16.83-.48 1.08-.9h-2.68v-1.8h4.81v3.75c-.75 1.05-1.9 1.76-3.19 1.98-1.67.29-3.41-.18-4.66-1.32-1.1-1.01-1.7-2.52-1.55-4.01z" />
            <path d="M15.42 16.3c-1.44 0-2.82-.57-3.84-1.59-1.02-1.02-1.59-2.4-1.59-3.84s.57-2.82 1.59-3.84c1.02-1.02 2.4-1.59 3.84-1.59s2.82.57 3.84 1.59c1.02 1.02 1.59 2.4 1.59 3.84s-.57 2.82-1.59 3.84c-1.02 1.02-2.4 1.59-3.84 1.59zm0-2c.9 0 1.77-.36 2.41-1 .64-.64 1-1.51 1-2.41s-.36-1.77-1-2.41c-.64-.64-1.51-1-2.41-1s-1.77.36-2.41 1c-.64.64-1 1.51-1 2.41s.36 1.77 1 2.41c.64.64 1.51 1 2.41 1z" />
          </svg>
        ),
      },
      {
        name: 'GraphQL',
        role: 'Declarative Unified API Gateway',
        brandColor: '#E10098',
        tag: 'API Protocol',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#E10098">
            <path d="M12 0l10.39 6v12L12 24 1.61 18V6L12 0zm0 2.31L3.61 7.15v9.7L12 21.69l8.39-4.84v-9.7L12 2.31zM12 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm-6 10a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm12 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
          </svg>
        ),
      },
      {
        name: 'gRPC & Protobuf',
        role: 'Low-Latency Service IPC',
        brandColor: '#244c5a',
        tag: 'Protocol',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#244c5a">
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.8l7 3.5v7.4l-7-3.5V9.8zm9 10.9v-7.4l7-3.5v7.4l-7 3.5z" />
          </svg>
        ),
      },
      {
        name: 'Rust',
        role: 'Memory-Safe Native Acceleration',
        brandColor: '#DEA584',
        tag: 'Native',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000">
            <path d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1zm0 20a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9z" />
            <path d="M9 7h6a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4v4H9zm2 4h4V9h-4z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'database',
    name: 'Databases & Data Stores',
    shortName: 'Databases',
    icon: '🗄️',
    badge: 'STORAGE & INTEGRITY',
    headline: 'ACID-compliant schemas, in-memory caching, and real-time data sync.',
    description: 'We structure relational and document models optimized for concurrent queries, multi-region replication, and zero-data-loss failover.',
    metrics: ['ACID Transactional Guarantees', 'Automated Daily Snapshot Backups', 'Sub-5ms In-Memory Cache Reads'],
    techs: [
      {
        name: 'PostgreSQL',
        role: 'Relational ACID Data Core',
        brandColor: '#4169E1',
        tag: 'SQL Core',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#4169E1">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.31 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        ),
      },
      {
        name: 'Redis',
        role: 'In-Memory Caching & Pub/Sub',
        brandColor: '#DC382D',
        tag: 'Caching',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#DC382D">
            <path d="M12 0L1 6.35v11.3L12 24l11-6.35V6.35L12 0zm0 2.22l8.89 5.13-3.66 2.11L8.34 4.33 12 2.22zM3.11 7.35l3.66 2.11-3.66 2.11V7.35zm8.89 4.14l3.66-2.11 3.66 2.11-3.66 2.11-3.66-2.11zm-7.32 3.69l3.66-2.11 3.66 2.11-3.66 2.11-3.66-2.11zm16.21 2.47l-3.66-2.11 3.66-2.11v4.22zm-8.89 4.13l-3.66-2.11 3.66-2.11 3.66 2.11-3.66 2.11z" />
          </svg>
        ),
      },
      {
        name: 'Supabase',
        role: 'Realtime Backend & Auth',
        brandColor: '#3ECF8E',
        tag: 'BaaS / SQL',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#3ECF8E">
            <path d="M13.4 24a.8.8 0 0 1-.78-.97L15 13.8H2.8a.8.8 0 0 1-.6-1.32L14.6.14a.8.8 0 0 1 1.38.7l-2.38 9.23h12.2a.8.8 0 0 1 .6 1.32L14.2 23.86a.8.8 0 0 1-.8.14z" />
          </svg>
        ),
      },
      {
        name: 'ClickHouse',
        role: 'High-Volume Analytics Engine',
        brandColor: '#F7C325',
        tag: 'OLAP',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#F7C325">
            <path d="M2 4h3v16H2zm5 3h3v10H7zm5-4h3v18h-3zm5 2h3v14h-3zm5 4h3v6h-3z" />
          </svg>
        ),
      },
      {
        name: 'MongoDB',
        role: 'Flexible JSON Document Store',
        brandColor: '#47A248',
        tag: 'NoSQL',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#47A248">
            <path d="M12.001 0c-.394 0-.756.208-.946.544C9.5 3.2 5 10.3 5 15.5 5 19.642 8.134 23 12 23c.4 0 .79-.04 1.16-.11.45.69 1.13 1.11 1.84 1.11.23 0 .47-.04.69-.13.72-.28 1.2-1.04 1.14-1.87-.83-5.2-4.83-17-4.83-21.46C12 0 12.001 0 12.001 0z" />
          </svg>
        ),
      },
      {
        name: 'Prisma & Drizzle',
        role: 'Type-Safe ORM & Migrations',
        brandColor: '#2D3748',
        tag: 'ORM Tool',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#2D3748">
            <path d="M12 2L2 22h20L12 2zm0 4.2l6.2 12.4H5.8L12 6.2z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'ai',
    name: 'AI & Autonomous Workflows',
    shortName: 'AI & Automation',
    icon: '🤖',
    badge: 'ENTERPRISE COGNITIVE PIPELINES',
    headline: 'Deterministic LLM pipelines, vector search, and autonomous business workflows.',
    description: 'We embed generative models into your core business operations with schema guardrails to prevent hallucinations and automate complex manual processing.',
    metrics: ['Zero Training Data Retention', 'Deterministic Schema Guardrails', 'Sub-second Vector Search'],
    techs: [
      {
        name: 'OpenAI API (GPT-4o)',
        role: 'Multimodal Cognitive Extraction',
        brandColor: '#10A37F',
        tag: 'Foundation LLM',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#10A37F">
            <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073z" />
          </svg>
        ),
      },
      {
        name: 'Anthropic Claude',
        role: 'Deep Contextual Analysis',
        brandColor: '#D97706',
        tag: 'LLM Engine',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#D97706">
            <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
          </svg>
        ),
      },
      {
        name: 'LangChain & LlamaIndex',
        role: 'Agentic Pipeline Orchestration',
        brandColor: '#1C3C3C',
        tag: 'Framework',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#1C3C3C">
            <path d="M8 4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H8zm0 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
          </svg>
        ),
      },
      {
        name: 'Pinecone / Vector DBs',
        role: 'High-Dimensional Semantic Search',
        brandColor: '#000000',
        tag: 'Vector Store',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000">
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.2L19.8 7 12 9.8 4.2 7 12 4.2zM4 8.5l7 2.5v8.5l-7-3.5V8.5zm9 11v-8.5l7-2.5v7.5l-7 3.5z" />
          </svg>
        ),
      },
      {
        name: 'Temporal.io & Celery',
        role: 'Durable Asynchronous Execution',
        brandColor: '#111827',
        tag: 'Workflows',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#111827">
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.37z" />
          </svg>
        ),
      },
      {
        name: 'n8n Enterprise',
        role: 'Autonomous Integration Automation',
        brandColor: '#EA4B71',
        tag: 'Automation',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#EA4B71">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V17a1 1 0 0 1-2 0v-.07A6 6 0 0 1 6.07 12H6a1 1 0 0 1 0-2h.07A6 6 0 0 1 11 4.93V5a1 1 0 0 1 2 0v-.07A6 6 0 0 1 17.93 10H18a1 1 0 0 1 0 2h-.07A6 6 0 0 1 13 16.93z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud, DevOps & SRE',
    shortName: 'Cloud & DevOps',
    icon: '☁️',
    badge: 'INFRASTRUCTURE & RELIABILITY',
    headline: 'Reproducible Terraform IaC, Kubernetes clusters, and automated CI/CD.',
    description: 'We architect immutable cloud environments across AWS, GCP, and Azure with automated security scanning and zero-downtime deployment pipelines.',
    metrics: ['99.99% Infrastructure Uptime', '100% Infrastructure as Code', 'Automated Vulnerability Gateways'],
    techs: [
      {
        name: 'Amazon Web Services',
        role: 'Enterprise Cloud Infrastructure',
        brandColor: '#FF9900',
        tag: 'Cloud Host',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF9900">
            <path d="M18.8 17.5c-4.6 2.4-10.4 2.5-14.8.4-.2-.1-.4.1-.2.3 3.9 3.2 9.8 3.5 15.2.8.3-.2.1-.6-.2-.5zM20.2 16.2c-.4-.5-2.6-.3-3.6-.1-.3 0-.4.3-.1.5 1.1.7 2.8.5 3.3.1.5-.4.8-1.5.4-.5zM7.3 10.4c-.2-.7-.6-1.3-1.2-1.7-.8-.5-1.8-.7-2.8-.5-.8.2-1.5.7-1.9 1.4-.4.8-.5 1.7-.2 2.6.3.8.9 1.5 1.7 1.8.8.4 1.8.4 2.7.1.6-.2 1.1-.6 1.5-1.1v.9h1.6V8.6H7.3v1.8zm-1.4 2.4c-.4.4-.9.6-1.5.5-.5-.1-1-.4-1.2-.9-.3-.5-.3-1.1-.1-1.6.2-.5.6-.9 1.1-1.1.6-.2 1.2-.1 1.7.3.4.4.6.9.5 1.5-.1.5-.3.9-.5 1.3z" />
          </svg>
        ),
      },
      {
        name: 'Docker',
        role: 'Containerized Service Packaging',
        brandColor: '#2496ED',
        tag: 'Containers',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#2496ED">
            <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186h-2.12a.186.186 0 0 0-.185.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185" />
          </svg>
        ),
      },
      {
        name: 'Kubernetes',
        role: 'Orchestration & Self-Healing',
        brandColor: '#326CE5',
        tag: 'K8s Cluster',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#326CE5">
            <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.3l8.4 4.8v9.8L12 21.7 3.6 16.9V7.1L12 2.3zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
          </svg>
        ),
      },
      {
        name: 'Terraform',
        role: 'Infrastructure as Code (IaC)',
        brandColor: '#7B42BC',
        tag: 'IaC Core',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#7B42BC">
            <path d="M1.5 0v7.6l6.6 3.8V3.8L1.5 0zm7.6 11.4v7.6l6.6 3.8v-7.6l-6.6-3.8zm0-7.6v7.6l6.6-3.8V0L9.1 3.8zm7.6 3.8v7.6l6.6-3.8V3.8l-6.6 3.8z" />
          </svg>
        ),
      },
      {
        name: 'GitHub Actions',
        role: 'Continuous Integration & Delivery',
        brandColor: '#2088FF',
        tag: 'CI/CD',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#2088FF">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.31 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        ),
      },
      {
        name: 'Cloudflare Edge',
        role: 'Global CDN, WAF & Serverless',
        brandColor: '#F38020',
        tag: 'Edge / WAF',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#F38020">
            <path d="M19.4 12.8c-.3-.9-.9-1.6-1.7-2-.8-.4-1.7-.5-2.6-.2-.6-.9-1.5-1.6-2.5-1.9-1.1-.3-2.2-.2-3.2.3-.9.5-1.7 1.3-2.1 2.3-.7 0-1.5.3-2.1.7-.6.4-1 1.1-1.2 1.8-.2.8 0 1.6.4 2.3.4.6 1 1.1 1.8 1.3.3.1.6.1.9.1h11.8c.8 0 1.6-.3 2.2-.9.6-.6 1-1.4.9-2.2-.1-.7-.5-1.3-1-1.6h-.6z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'integrations',
    name: 'Connected Systems & APIs',
    shortName: 'APIs & Integrations',
    icon: '🔗',
    badge: 'ECOSYSTEM UNIFICATION',
    headline: 'Bi-directional data bridges unifying CRM, ERP, commerce, and finance.',
    description: 'We eliminate manual data entry with resilient API connectors, idempotent webhooks, and real-time enterprise event sync.',
    metrics: ['Idempotent Webhook Processing', 'Dead-Letter Queue Buffering', 'Sub-second Data Sync'],
    techs: [
      {
        name: 'Stripe Payments',
        role: 'Monetization & Webhook Ingestion',
        brandColor: '#635BFF',
        tag: 'Billing Core',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#635BFF">
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.365.5 6.855.5 3.038 3.521 3.038 8.026c0 4.675 3.992 6.136 7.425 7.415 2.193.817 3.376 1.488 3.376 2.47 0 .979-.844 1.472-2.227 1.472-2.158 0-5.18-.999-7.25-2.21l-.9 5.568c2.194 1.077 5.485 1.759 8.685 1.759 5.869 0 9.873-2.906 9.873-7.534 0-4.665-3.805-6.22-8.044-7.826z" />
          </svg>
        ),
      },
      {
        name: 'Shopify Plus',
        role: 'Headless Commerce & Storefront API',
        brandColor: '#96BF48',
        tag: 'Ecommerce',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#96BF48">
            <path d="M19.5 6.5l-2.4-1.2c-.2-.1-.5 0-.6.2L14.7 9h-5.4L7.5 5.5c-.1-.2-.4-.3-.6-.2L4.5 6.5c-.3.1-.4.4-.3.7l2.8 13.5c.1.3.3.5.6.5h8.8c.3 0 .5-.2.6-.5l2.8-13.5c.1-.3 0-.6-.3-.7z" />
          </svg>
        ),
      },
      {
        name: 'Salesforce CRM',
        role: 'Enterprise Pipeline & Account Sync',
        brandColor: '#00A1E0',
        tag: 'CRM Hub',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#00A1E0">
            <path d="M19.4 9.4c-.6-.7-1.4-1.2-2.3-1.4-.4-1.7-1.5-3.1-3-3.9-1.5-.8-3.3-.9-4.9-.3-1.5.6-2.8 1.9-3.4 3.4-.8-.2-1.7-.1-2.4.3-.8.4-1.4 1-1.7 1.8-.4.8-.4 1.7-.2 2.6.3.8.8 1.5 1.5 2 .7.4 1.6.6 2.5.5h13.8c.9 0 1.8-.4 2.4-1 .6-.7 1-1.6 1-2.5 0-.9-.4-1.8-1-2.4-.7-.6-1.5-.9-2.3-1.1z" />
          </svg>
        ),
      },
      {
        name: 'NetSuite & ERP',
        role: 'Inventory & Financial Ledger Bridge',
        brandColor: '#1A365D',
        tag: 'ERP',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#1A365D">
            <path d="M3 3h18v18H3V3zm4 4v10h10V7H7zm2 2h6v6H9V9z" />
          </svg>
        ),
      },
      {
        name: 'Apache Kafka',
        role: 'Distributed Real-Time Event Bus',
        brandColor: '#231F20',
        tag: 'Event Mesh',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#231F20">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V17a1 1 0 0 1-2 0v-.07A6 6 0 0 1 6.07 12H6a1 1 0 0 1 0-2h.07A6 6 0 0 1 11 4.93V5a1 1 0 0 1 2 0v-.07A6 6 0 0 1 17.93 10H18a1 1 0 0 1 0 2h-.07A6 6 0 0 1 13 16.93z" />
          </svg>
        ),
      },
      {
        name: 'Custom Webhooks',
        role: 'Resilient Microservice Adapters',
        brandColor: '#598BFF',
        tag: 'Middleware',
        iconSvg: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#598BFF">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" />
          </svg>
        ),
      },
    ],
  },
];

export const TechnologyMatrix: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('frontend');

  const activeCategory =
    CATEGORIES.find((c) => c.id === activeTabId) || CATEGORIES[0];

  return (
    <section
      id="technologies"
      aria-label="Technology Stack and Capabilities"
      style={{
        backgroundColor: '#FFFFFF',
        padding: 'clamp(3.5rem, 6vw, 5.5rem) 0',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      <Container>
        {/* Header Title */}
        <div style={{ maxWidth: '780px', marginBottom: '32px' }}>
          <FadeUp delayMs={100}>
            <div style={{ display: 'inline-flex', marginBottom: '12px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  backgroundColor: '#F3F4F6',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary-blue)' }} />
                ENGINEERING ECOSYSTEM &amp; TECH STACK
              </span>
            </div>
          </FadeUp>

          <FadeUp delayMs={200}>
            <h2
              style={{
                fontFamily: 'var(--font-family-heading)',
                fontSize: 'clamp(2rem, 3.2vw, 2.75rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: '#000000',
                margin: '0 0 12px 0',
              }}
            >
              Proven technologies built for <span style={{ color: 'var(--color-primary-blue)' }}>speed, scale, and resilience.</span>
            </h2>
          </FadeUp>

          <FadeUp delayMs={300}>
            <p
              style={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                lineHeight: 1.6,
                color: '#4B5563',
                margin: 0,
              }}
            >
              Explore our core stack by engineering discipline. We select the optimal tools for your architecture to maximize performance, security, and developer velocity.
            </p>
          </FadeUp>
        </div>

        {/* Interactive Discipline Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '28px',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = cat.id === activeTabId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTabId(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 200ms cubic-bezier(0, 0, 0.2, 1)',
                  border: isSelected ? '1px solid #000000' : '1px solid #E5E7EB',
                  backgroundColor: isSelected ? '#000000' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#374151',
                  boxShadow: isSelected ? '0 4px 12px rgba(0, 0, 0, 0.12)' : 'none',
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Active Discipline Showcase Hub */}
        <div
          style={{
            backgroundColor: '#F9FAFB',
            border: '1px solid #E5E7EB',
            borderRadius: '20px',
            padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '32px',
          }}
          className="sb-tech-showcase-grid"
        >
          {/* Left Column: Scope & Guarantees */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--color-primary-blue)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                <span>{activeCategory.icon}</span>
                <span>{activeCategory.badge}</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: 'clamp(1.4rem, 2vw, 1.75rem)',
                  fontWeight: 800,
                  color: '#000000',
                  margin: '0 0 12px 0',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                }}
              >
                {activeCategory.headline}
              </h3>

              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: '#4B5563',
                  margin: '0 0 24px 0',
                }}
              >
                {activeCategory.description}
              </p>

              {/* Guarantees */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginBottom: '28px',
                }}
              >
                {activeCategory.metrics.map((m) => (
                  <div
                    key={m}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#111827',
                    }}
                  >
                    <span style={{ color: '#02C415', fontSize: '1rem', flexShrink: 0 }}>✓</span>
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link
                href="/start-a-project"
                className="sb-btn sb-btn--primary"
                style={{ fontSize: '0.875rem', padding: '10px 18px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>Scope Your {activeCategory.shortName} Project</span>
                <ArrowRight size={14} className="sb-btn__arrow" />
              </Link>
              <Link
                href="/services"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#374151',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>All 9 Services</span>
                <span style={{ fontSize: '1.1rem' }}>›</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Branded Technology Grid */}
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '16px',
              }}
            >
              Mastered Tools &amp; Frameworks ({activeCategory.techs.length})
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '14px',
              }}
            >
              {activeCategory.techs.map((tech) => (
                <div
                  key={tech.name}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    padding: '16px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '110px',
                    boxSizing: 'border-box',
                    transition: 'all 200ms ease',
                  }}
                  className="sb-brand-logo-tile"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        backgroundColor: '#F9FAFB',
                        border: '1px solid #F3F4F6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {tech.iconSvg}
                    </div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-family-mono)',
                        color: '#6B7280',
                        backgroundColor: '#F3F4F6',
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {tech.tag}
                    </span>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '2px', lineHeight: 1.25 }}>
                      {tech.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280', lineHeight: 1.4 }}>
                      {tech.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
