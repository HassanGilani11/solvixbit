/**
 * SOLVIXBIT — Brand Configuration System
 * Premium Creative Technology & Software Engineering Agency
 */

export interface MessagingPillar {
  readonly id: 'solve' | 'build' | 'automate' | 'scale';
  readonly title: string;
  readonly tag: string;
  readonly description: string;
}

export interface BrandService {
  readonly id: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly category: string;
  readonly number: string;
  readonly deliverables: readonly string[];
}

export interface BrandConfig {
  readonly name: string;
  readonly tagline: string;
  readonly corePrinciple: string;
  readonly positioning: string;
  readonly mission: string;
  readonly vision: string;
  readonly personality: readonly string[];
  readonly messagingPillars: readonly MessagingPillar[];
  readonly services: readonly BrandService[];
}

export const brandConfig: BrandConfig = {
  name: 'SOLVIXBIT',
  tagline: 'Technology That Solves.',
  corePrinciple: 'Solve first. Build with purpose. Scale with confidence.',
  positioning:
    'A creative technology and software engineering partner that helps businesses design, build, automate, and scale digital products and experiences.',
  mission:
    'To help businesses solve meaningful problems through intelligent, scalable and practical technology.',
  vision:
    'To become a globally trusted creative technology partner that transforms complex business challenges into simple, scalable digital solutions.',
  personality: [
    'Creative',
    'Intelligent',
    'Confident',
    'Modern',
    'Reliable',
    'Human',
    'Business-focused',
  ],
  messagingPillars: [
    {
      id: 'solve',
      title: 'Solve',
      tag: '01 / DISCOVERY & STRATEGY',
      description: 'Understanding root commercial challenges and user journeys before writing code to design high-impact digital solutions.',
    },
    {
      id: 'build',
      title: 'Build',
      tag: '02 / DESIGN & ENGINEERING',
      description: 'Crafting standout websites, modern web applications, SaaS platforms, and mobile apps with clean code and high performance.',
    },
    {
      id: 'automate',
      title: 'Automate',
      tag: '03 / AI & WORKFLOWS',
      description: 'Deploying practical AI and workflow automations to eliminate friction, accelerate operational throughput, and unlock capacity.',
    },
    {
      id: 'scale',
      title: 'Scale',
      tag: '04 / INFRASTRUCTURE & EXPANSION',
      description: 'Engineering cloud architecture, integrations, and telemetry built for continuous growth, security, and enterprise reliability.',
    },
  ],
  services: [
    {
      id: 'software-development',
      number: '01',
      title: 'Software Development',
      category: 'Core Engineering',
      shortDescription: 'Custom web platforms, robust backend systems, APIs, and mission-critical applications engineered for speed, security, and longevity.',
      deliverables: ['Custom Web & Backend Platforms', 'Robust API Architectures', 'Legacy System Modernization', 'High-Concurrency Backends'],
    },
    {
      id: 'ai-automation',
      number: '02',
      title: 'AI & Automation',
      category: 'Intelligence & Ops',
      shortDescription: 'Intelligent AI agents, automated workflow pipelines, and custom machine learning integrations that eliminate manual bottlenecks.',
      deliverables: ['Autonomous Workflow Agents', 'Custom LLM & AI Pipelines', 'Business Process Automation', 'Intelligent Data Extraction'],
    },
    {
      id: 'saas-development',
      number: '03',
      title: 'SaaS & Digital Products',
      category: 'Product Engineering',
      shortDescription: 'End-to-end digital product design, multi-tenant SaaS architecture, subscription billing, and high-retention user interfaces.',
      deliverables: ['End-to-End SaaS Platforms', 'Multi-Tenant Cloud Architectures', 'Product UX & UI Design', 'Subscription & Billing Engines'],
    },
    {
      id: 'web-ecommerce',
      number: '04',
      title: 'Web & Ecommerce',
      category: 'Digital Experience',
      shortDescription: 'Fast, high-converting digital storefronts, headless commerce architectures, and bespoke marketing websites with exceptional polish.',
      deliverables: ['Headless Shopify & Commerce', 'High-Performance Web Platforms', 'Editorial Brand Experiences', 'Conversion Rate Optimization'],
    },
    {
      id: 'api-integrations',
      number: '05',
      title: 'Connected Systems & APIs',
      category: 'System Integration',
      shortDescription: 'Secure API gateways, event-driven middleware, and bi-directional synchronizers that unify CRM, ERP, and operational software.',
      deliverables: ['Event-Driven Message Queues', 'ERP & CRM Real-Time Sync', 'Idempotent Webhook Pipelines', 'Dead-Letter Queue Resilience'],
    },
    {
      id: 'cloud-integrations',
      number: '06',
      title: 'Cloud & Infrastructure',
      category: 'Cloud & DevOps',
      shortDescription: 'Scalable cloud infrastructure, DevOps pipelines, microservices orchestration, and seamless third-party API connectivity.',
      deliverables: ['AWS / GCP Cloud Architecture', 'Automated CI/CD Pipelines', 'Microservices & Serverless', 'High-Availability Auto-Scaling'],
    },
    {
      id: 'data-analytics',
      number: '07',
      title: 'Data & Decision Systems',
      category: 'Data Engineering',
      shortDescription: 'Modern data warehouses, automated ingestion pipelines, and executive reporting dashboards providing trusted visibility.',
      deliverables: ['Modern Data Warehousing', 'Automated ETL/ELT Pipelines', 'Executive KPI Dashboards', 'Sub-Second Query Analytics'],
    },
    {
      id: 'security-quality',
      number: '08',
      title: 'Security & Quality Engineering',
      category: 'Security & Hardening',
      shortDescription: 'Comprehensive application security audits, automated vulnerability scanning in CI/CD, and zero-trust access hardening.',
      deliverables: ['OWASP Top 10 Hardening', 'Automated SAST/DAST Testing', 'Zero-Trust Secrets Rotation', 'SOC 2 Readiness Reviews'],
    },
    {
      id: 'mobile-engineering',
      number: '09',
      title: 'Mobile & Cross-Platform Apps',
      category: 'Mobile & Edge Platforms',
      shortDescription: 'High-performance native and cross-platform mobile applications engineered with React Native and Flutter for seamless iOS and Android scale.',
      deliverables: ['React Native & Flutter Apps', 'Offline-First Data Sync', 'Native Hardware & Sensors', 'Automated Store CI/CD Deployments'],
    },
  ],
} as const;

export default brandConfig;
