import { ServiceDetail } from '../types/content';

export const servicesData: ServiceDetail[] = [
  {
    slug: 'software-development',
    title: 'Custom Software Development',
    kicker: 'ENTERPRISE & CLOUD SYSTEMS',
    headline: 'High-performance software built for durability, security, and exponential scale.',
    shortDescription: 'We architect and engineer robust, mission-critical web applications, backend APIs, and custom software systems tailored to your specific business operations.',
    fullDescription: 'Off-the-shelf software inevitably limits modern businesses. Our engineering teams design and build bespoke software systems engineered from day one for sub-second performance, airtight data security, and seamless integration with your existing enterprise infrastructure.',
    icon: '💻',
    techStack: ['TypeScript', 'Next.js 15', 'Node.js', 'Go', 'PostgreSQL', 'Redis', 'Docker', 'AWS ECS'],
    deliverables: [
      'Full-Stack Architecture & Data Modeling',
      'High-Throughput REST & GraphQL APIs',
      'Custom Enterprise Web Portals',
      'Automated CI/CD Pipelines & Unit Testing',
      'Zero-Downtime Migration & Deployment',
    ],
    benefits: [
      {
        title: 'Zero Technical Debt Architecture',
        description: 'Modern, modular codebases built with strict TypeScript typing and continuous automated testing.',
        metric: '99.99%',
      },
      {
        title: 'Sub-Second Response Times',
        description: 'Edge-rendered interfaces and optimized SQL queries delivering instantaneous user feedback.',
        metric: '<120ms',
      },
      {
        title: 'Enterprise-Grade Security',
        description: 'Role-based access control (RBAC), end-to-end data encryption, and OWASP Top 10 compliance.',
        metric: 'SOC 2 Ready',
      },
    ],
    capabilities: [
      {
        title: 'Cloud-Native Web Applications',
        description: 'Modern, responsive applications built with Next.js App Router and server components for peak speed.',
        tag: 'Frontend / Fullstack',
      },
      {
        title: 'Microservices & Distributed APIs',
        description: 'Scalable service architectures capable of processing millions of requests without degradation.',
        tag: 'Backend Infrastructure',
      },
      {
        title: 'Database Architecture & Optimization',
        description: 'Relational and vector database designs optimized for complex transactional workloads and analytics.',
        tag: 'Data Engineering',
      },
      {
        title: 'Legacy System Modernization',
        description: 'Step-by-step refactoring of monolithic applications into modular, maintainable cloud services.',
        tag: 'Transformation',
      },
    ],
    featuredCaseStudySlug: 'fintech-payment-engine',
  },
  {
    slug: 'ai-automation',
    title: 'AI & Workflow Automation',
    kicker: 'INTELLIGENT BUSINESS PROCESSES',
    headline: 'Autonomous agent workflows and LLM integrations that eliminate operational drag.',
    shortDescription: 'We implement intelligent AI agents, custom retrieval-augmented generation (RAG) pipelines, and robotic process automation that free your team to focus on high-value strategy.',
    fullDescription: 'Move beyond generic chatbot novelties. SOLVIXBIT integrates deterministic AI workflows, proprietary knowledge retrieval systems, and end-to-end process automations directly into your core business tools, saving thousands of manual hours every month.',
    icon: '⚡',
    techStack: ['Python', 'LangChain', 'OpenAI API', 'Anthropic Claude', 'Pinecone', 'FastAPI', 'n8n', 'Zapier Enterprise'],
    deliverables: [
      'Proprietary RAG Knowledge Pipelines',
      'Multi-Step Autonomous Workflow Agents',
      'Automated Document Processing & Extraction',
      'Intelligent Triage & Support Copilots',
      'Data Privacy & Model Governance Guardrails',
    ],
    benefits: [
      {
        title: 'Massive Labor Hours Saved',
        description: 'Automate high-volume data entry, document review, and multi-system reconciliation.',
        metric: '1,200+ hrs/mo',
      },
      {
        title: 'Near-Zero Error Rates',
        description: 'Deterministic validation rules eliminate human oversight mistakes in critical processes.',
        metric: '99.8% Accuracy',
      },
      {
        title: 'Private & Secure AI',
        description: 'Zero data retention policies ensure proprietary business secrets are never leaked or trained upon.',
        metric: '100% Private',
      },
    ],
    capabilities: [
      {
        title: 'Custom RAG & Enterprise Search',
        description: 'Index company wikis, contracts, and databases into searchable, conversational intelligence engines.',
        tag: 'Knowledge Systems',
      },
      {
        title: 'Human-in-the-Loop Pipelines',
        description: 'Confidence-gated workflows routing uncertain extractions to human operators for validation.',
        tag: 'Quality Control',
      },
      {
        title: 'Document OCR & Parsing',
        description: 'Extract structured JSON from PDFs, scanned receipts, freight manifests, and contracts.',
        tag: 'Data Extraction',
      },
      {
        title: 'CRM & ERP Autonomous Sync',
        description: 'AI agents that categorize leads, draft customer updates, and sync records across platforms.',
        tag: 'Operational Efficiency',
      },
    ],
    featuredCaseStudySlug: 'enterprise-ai-copilot',
  },
  {
    slug: 'saas-development',
    title: 'SaaS & Digital Product Engineering',
    kicker: 'ZERO-TO-ONE & SCALE',
    headline: 'From validated concept to venture-scale SaaS with subscription billing and enterprise controls.',
    shortDescription: 'We partner with founders and enterprise innovators to build, launch, and scale multi-tenant SaaS products engineered for rapid adoption, high retention, and effortless monetization.',
    fullDescription: 'Launching a successful SaaS product requires speed without sacrificing security. We engineer multi-tenant platforms complete with automated billing (Stripe), role-based tenant isolation, interactive dashboards, and scalable cloud foundations.',
    icon: '🚀',
    techStack: ['Next.js 15', 'TypeScript', 'Prisma / Drizzle', 'PostgreSQL', 'Stripe Billing', 'Redis', 'AWS', 'Tailwind CSS'],
    deliverables: [
      'Multi-Tenant SaaS Foundation & RBAC',
      'Stripe Subscription Billing & Invoicing',
      'Interactive Analytics Dashboards',
      'Transactional Email & Webhook Infrastructure',
      'Automated Onboarding & Team Workspaces',
    ],
    benefits: [
      {
        title: 'Rapid Time-to-Market',
        description: 'Production-ready MVP architectures deployed in weeks rather than quarters.',
        metric: '6 to 8 Weeks',
      },
      {
        title: 'Enterprise-Ready Architecture',
        description: 'Multi-tenant data isolation, SSO integration, and audit logs that satisfy enterprise procurement.',
        metric: 'SSO & Audit Ready',
      },
      {
        title: 'Monetization Out of the Box',
        description: 'Flawless webhook-driven billing handling trials, tier upgrades, and metered usage.',
        metric: 'Zero Leakage',
      },
    ],
    capabilities: [
      {
        title: 'Multi-Tenant Architecture',
        description: 'Strict logical database segregation ensuring customer data remains completely private and isolated.',
        tag: 'Architecture',
      },
      {
        title: 'Subscription & Usage Billing',
        description: 'Custom pricing tiers, per-seat licensing, and automated dunning management via Stripe.',
        tag: 'Monetization',
      },
      {
        title: 'High-Retention User Experience',
        description: 'Intuitive keyboard shortcuts, responsive data tables, and snappy client-side filtering.',
        tag: 'Product UX',
      },
      {
        title: 'API Developer Platforms',
        description: 'Public REST/GraphQL developer APIs with rate limiting, SDKs, and interactive documentation.',
        tag: 'Extensibility',
      },
    ],
    featuredCaseStudySlug: 'fintech-payment-engine',
  },
  {
    slug: 'web-ecommerce',
    title: 'Headless Web & Ecommerce Platforms',
    kicker: 'HIGH-CONVERSION COMMERCE',
    headline: 'Sub-second headless storefronts and bespoke web systems engineered for maximum conversion.',
    shortDescription: 'We build blazing-fast headless storefronts, custom Shopify Plus themes, and immersive web platforms that elevate your brand and drive measurable revenue.',
    fullDescription: 'Slow page loads and cookie-cutter templates destroy conversion rates. SOLVIXBIT engineers custom headless storefronts and bespoke web platforms designed with editorial visual craft, sub-second load times, and custom checkout flows.',
    icon: '🛍️',
    techStack: ['Shopify Plus', 'Hydrogen', 'Next.js', 'Sanity CMS', 'Tailwind CSS', 'Framer Motion', 'Algolia', 'Klaviyo'],
    deliverables: [
      'Custom Shopify Plus & Headless Storefronts',
      'High-Conversion Checkout Customization',
      'ERP / WMS / CRM Inventory Integrations',
      'SEO-Optimized Editorial CMS Architecture',
      'Sub-Second Global Edge Performance',
    ],
    benefits: [
      {
        title: 'Measurable Conversion Boost',
        description: 'Ultra-fast page loads and tailored mobile checkout experiences directly increase sales.',
        metric: '+35% Avg',
      },
      {
        title: 'Perfect Core Web Vitals',
        description: 'Lighthouse performance scores of 95+ ensuring maximum search visibility and ad efficiency.',
        metric: '98+ Score',
      },
      {
        title: 'Omnichannel Integration',
        description: 'Real-time synchronization across inventory, POS, fulfillment, and customer loyalty systems.',
        metric: 'Real-time',
      },
    ],
    capabilities: [
      {
        title: 'Headless Commerce Architecture',
        description: 'Decoupled frontend experiences powered by Shopify Plus or custom commerce engines.',
        tag: 'Commerce',
      },
      {
        title: 'Custom Product Builders & 3D',
        description: 'Interactive product configurators, bundle builders, and visual sizing calculators.',
        tag: 'Interactivity',
      },
      {
        title: 'ERP & Inventory Synchronization',
        description: 'Bi-directional middleware connecting warehouse management, NetSuite, SAP, and storefronts.',
        tag: 'Integrations',
      },
      {
        title: 'Internationalization & Markets',
        description: 'Multi-currency, localized language routing, and country-specific tax/shipping configurations.',
        tag: 'Global Scale',
      },
    ],
    featuredCaseStudySlug: 'ecommerce-headless-scale',
  },
  {
    slug: 'api-integrations',
    title: 'Connected Systems & API Integration',
    kicker: 'UNIFIED ENTERPRISE CONNECTIVITY',
    headline: 'Eliminate data silos by connecting ERP, CRM, billing, and operational software in real time.',
    shortDescription: 'We design and build secure API gateways, event-driven middleware, and bi-directional synchronizers that unify your disconnected business systems.',
    fullDescription: 'When core operational systems fail to communicate, employees become human middleware. We engineer robust, idempotent API integrations and webhook queues that sync CRM, ERP, warehouse, and financial ledgers with zero data loss.',
    icon: '🔄',
    techStack: ['Node.js', 'TypeScript', 'Kafka', 'RabbitMQ', 'PostgreSQL', 'Redis', 'OpenAPI', 'AWS Lambda'],
    deliverables: [
      'Centralized Event-Driven Integration Middleware',
      'Bi-Directional CRM / ERP / Accounting Sync',
      'Idempotent Webhook Processing Queues',
      'Dead-Letter Queues & Automated Retry Mechanisms',
      'Real-Time Integration Health Dashboards',
    ],
    benefits: [
      {
        title: 'Real-Time Data Consistency',
        description: 'Writes to sales, inventory, or billing propagate across all downstream systems instantaneously.',
        metric: '<500ms Sync',
      },
      {
        title: 'Zero Duplicate Transactions',
        description: 'Cryptographic idempotency keys prevent duplicate orders or double billing during network timeouts.',
        metric: '100% Idempotent',
      },
      {
        title: 'Eliminate Manual Data Entry',
        description: 'Remove tedious CSV exports and cross-platform copy-pasting for operations teams.',
        metric: '100% Automated',
      },
    ],
    capabilities: [
      {
        title: 'Event-Driven Architecture',
        description: 'Pub/sub message buses decoupling core services and allowing asynchronous high-volume throughput.',
        tag: 'Architecture',
      },
      {
        title: 'ERP & Financial Ledger Sync',
        description: 'Direct connectors into NetSuite, SAP, QuickBooks, and Salesforce Enterprise.',
        tag: 'Enterprise Systems',
      },
      {
        title: 'Custom API Gateway & Mesh',
        description: 'Secure token authentication, payload transformation, and rate limiting for external partners.',
        tag: 'API Security',
      },
      {
        title: 'Resilient Dead-Letter Queues',
        description: 'Quarantine and auto-retry mechanisms ensuring no failed external API call is ever lost.',
        tag: 'Reliability',
      },
    ],
    featuredCaseStudySlug: 'fintech-payment-engine',
  },
  {
    slug: 'cloud-integrations',
    title: 'Cloud Infrastructure & Platform Reliability',
    kicker: 'RESILIENT CLOUD ECOSYSTEMS',
    headline: 'Modernize infrastructure, automate deployment pipelines, and ensure 99.99% availability.',
    shortDescription: 'We architect highly available AWS/GCP cloud environments, implement automated DevOps pipelines, and build resilient infrastructure as code.',
    fullDescription: 'Downtime and fragile custom deployments cost businesses millions. We design self-healing cloud architectures, Infrastructure as Code (IaC), containerized microservices, and observability telemetry that allow your systems to scale effortlessly.',
    icon: '☁️',
    techStack: ['AWS', 'Google Cloud', 'Terraform', 'Kubernetes', 'Docker', 'GitHub Actions', 'Datadog', 'Cloudflare'],
    deliverables: [
      'Infrastructure as Code (Terraform / CDK)',
      'Automated Zero-Downtime CI/CD Pipelines',
      'Multi-Region Auto-Scaling & Load Balancing',
      'Real-Time Observability & Monitoring Dashboards',
      'Disaster Recovery & Redundancy Architectures',
    ],
    benefits: [
      {
        title: 'Guaranteed 99.99% Availability',
        description: 'Multi-region failover and auto-scaling prevent unexpected outages during traffic spikes.',
        metric: '99.99% SLA',
      },
      {
        title: 'Cloud Cost Optimization',
        description: 'Right-sizing compute instances and serverless orchestration reducing monthly cloud expenditure.',
        metric: '-30% Spend',
      },
      {
        title: 'Rapid Deployment Velocity',
        description: 'Deploy new features to production in under 5 minutes with automated test verification.',
        metric: '<5min Deploy',
      },
    ],
    capabilities: [
      {
        title: 'Cloud Architecture & Migration',
        description: 'Seamless migration of legacy servers to modern AWS or Google Cloud container services.',
        tag: 'Cloud Strategy',
      },
      {
        title: 'CI/CD & DevOps Automation',
        description: 'Automated linting, security scanning, container builds, and deployment verification.',
        tag: 'DevOps',
      },
      {
        title: 'Multi-Region High Availability',
        description: 'Active-passive and active-active multi-region databases with automated failover routing.',
        tag: 'Reliability',
      },
      {
        title: 'Observability & APM Telemetry',
        description: 'Centralized distributed tracing, log aggregation, and automated incident escalation.',
        tag: 'Observability',
      },
    ],
    featuredCaseStudySlug: 'enterprise-ai-copilot',
  },
  {
    slug: 'data-analytics',
    title: 'Data Intelligence & Decision Systems',
    kicker: 'DATA PLATFORMS & ANALYTICS',
    headline: 'Transform messy operational data into real-time decision intelligence and dashboards.',
    shortDescription: 'We build unified data pipelines, analytical warehouses, and executive reporting dashboards that provide leaders with trusted operational visibility.',
    fullDescription: 'Dispersed, conflicting data across multiple databases obscures critical business insights. We engineer automated ETL/ELT pipelines, centralized modern data warehouses, and interactive reporting dashboards so your leadership can make confident, data-backed decisions.',
    icon: '📊',
    techStack: ['PostgreSQL', 'Snowflake', 'BigQuery', 'dbt', 'Python', 'Apache Superset', 'ClickHouse', 'Metabase'],
    deliverables: [
      'Unified Data Warehouse Architecture',
      'Automated ETL / ELT Ingestion Pipelines',
      'Executive KPI & Performance Dashboards',
      'Data Cleansing & Deduplication Logic',
      'Automated Financial & Cohort Analytics',
    ],
    benefits: [
      {
        title: 'Single Source of Truth',
        description: 'Unify sales, marketing, fulfillment, and financial metrics into a verified centralized schema.',
        metric: '100% Unified',
      },
      {
        title: 'Instant Query Performance',
        description: 'Columnar analytical storage executing complex multi-million row queries in milliseconds.',
        metric: '<200ms Queries',
      },
      {
        title: 'Automated Executive Reports',
        description: 'Daily and weekly automated digest reports delivered directly to Slack or executive email.',
        metric: 'Zero Manual Prep',
      },
    ],
    capabilities: [
      {
        title: 'Data Warehousing & Modeling',
        description: 'Dimensional star-schema models optimized for rapid BI queries and historical analysis.',
        tag: 'Data Architecture',
      },
      {
        title: 'Real-Time Pipeline Engineering',
        description: 'Streaming data ingestion capturing live order, transaction, and event data without delay.',
        tag: 'Data Engineering',
      },
      {
        title: 'Interactive BI Dashboards',
        description: 'Bespoke reporting interfaces with granular role permissions and export capabilities.',
        tag: 'Analytics UX',
      },
      {
        title: 'Data Governance & Hygiene',
        description: 'Automated schema validation, anomaly detection, and data deduplication rules.',
        tag: 'Data Quality',
      },
    ],
    featuredCaseStudySlug: 'fintech-payment-engine',
  },
  {
    slug: 'security-quality',
    title: 'Application Security & Engineering Quality',
    kicker: 'SECURITY & HARDENING',
    headline: 'Harden applications, protect sensitive customer data, and meet strict compliance standards.',
    shortDescription: 'We perform thorough architectural security audits, implement automated security testing in CI/CD, and harden web applications against vulnerabilities.',
    fullDescription: 'Security cannot be an afterthought. We assist growing technology companies and enterprise teams in implementing OWASP Top 10 defenses, dependency vulnerability management, automated SAST/DAST testing, and role-based zero-trust access controls.',
    icon: '🛡️',
    techStack: ['Snyk', 'OWASP ZAP', 'Trivy', 'GitHub Advanced Security', 'Vault', 'TypeScript', 'Docker', 'AWS IAM'],
    deliverables: [
      'Comprehensive Application Security Audit',
      'Automated SAST / DAST Vulnerability Scanners',
      'Zero-Trust Secrets & Credential Management',
      'SOC 2 & ISO 27001 Readiness Reviews',
      'Penetration Testing & Hardening Report',
    ],
    benefits: [
      {
        title: 'Zero Critical Vulnerabilities',
        description: 'Continuous automated scanning of dependencies and container base images.',
        metric: '0 Criticals',
      },
      {
        title: 'Airtight Access Control',
        description: 'Multi-factor authentication, session revocations, and granular RBAC schemas.',
        metric: 'RBAC Enforced',
      },
      {
        title: 'Procurement & Compliance Ready',
        description: 'Security documentation and architecture diagrams that pass rigorous enterprise vendor reviews.',
        metric: 'Enterprise Ready',
      },
    ],
    capabilities: [
      {
        title: 'Static & Dynamic Code Analysis',
        description: 'Automated vulnerability scanning embedded directly inside GitHub Actions pull requests.',
        tag: 'Security CI/CD',
      },
      {
        title: 'Zero-Trust Secrets Management',
        description: 'Centralized cryptographic secret rotation with HashiCorp Vault or AWS Secrets Manager.',
        tag: 'Key Management',
      },
      {
        title: 'API Hardening & WAF Protection',
        description: 'Cloudflare WAF rate limiting, DDoS mitigation, and SQL injection / XSS filters.',
        tag: 'Network Defense',
      },
      {
        title: 'Compliance & Audit Trails',
        description: 'Immutable, timestamped audit logging for sensitive customer transactions and admin actions.',
        tag: 'Compliance',
      },
    ],
    featuredCaseStudySlug: 'fintech-payment-engine',
  },
  {
    slug: 'mobile-engineering',
    title: 'Mobile & Cross-Platform Engineering',
    kicker: 'MOBILE & EDGE PLATFORMS',
    headline: 'Fluid 60fps mobile applications engineered for high engagement and scale.',
    shortDescription: 'We design and engineer bespoke iOS and Android applications built with React Native and Flutter, featuring offline-first data sync and native hardware integration.',
    fullDescription: 'Mobile users demand instantaneous interaction and rock-solid reliability. Our mobile engineering squads craft intuitive, responsive iOS and Android applications utilizing unified cross-platform frameworks, robust state architectures, background synchronizers, and automated App Store delivery pipelines.',
    icon: '📱',
    techStack: ['React Native', 'Flutter', 'TypeScript', 'Expo', 'Swift', 'Kotlin', 'GraphQL', 'Firebase', 'Fastlane'],
    deliverables: [
      'Cross-Platform iOS & Android Codebases',
      'Offline-First Local SQLite / WatermelonDB Sync',
      'Native Push Notification & Telemetry Pipelines',
      'Biometric Authentication & Secure Enclaves',
      'Automated App Store & Play Store CI/CD with Fastlane',
    ],
    benefits: [
      {
        title: 'Unified Codebase Velocity',
        description: 'Single shared TypeScript or Dart codebase cutting mobile maintenance and development costs by 50%.',
        metric: '2x Speed',
      },
      {
        title: 'Native 60fps Performance',
        description: 'Hardware-accelerated animations and gesture handling matching native platform responsiveness.',
        metric: '60fps',
      },
      {
        title: 'Flawless Offline Experience',
        description: 'Optimistic UI updates with background queue reconciliation when connectivity is restored.',
        metric: 'Offline Ready',
      },
    ],
    capabilities: [
      {
        title: 'React Native & Expo Architecture',
        description: 'Type-safe mobile applications utilizing modern Expo continuous updates and native module bridges.',
        tag: 'Cross-Platform',
      },
      {
        title: 'Native Swift & Kotlin Modules',
        description: 'Custom native extensions for low-level Bluetooth, camera vision, and OS background processing.',
        tag: 'Native Engineering',
      },
      {
        title: 'Offline-First Synchronization',
        description: 'Distributed synchronization protocols ensuring seamless operation in remote and offline environments.',
        tag: 'Data Resilience',
      },
      {
        title: 'Continuous Deployment & Over-The-Air Updates',
        description: 'Automated Fastlane build validation with EAS Over-The-Air (OTA) runtime hotfixes.',
        tag: 'DevOps & Releases',
      },
    ],
    featuredCaseStudySlug: 'ecommerce-headless-scale',
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return servicesData.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesData.map((s) => s.slug);
}
