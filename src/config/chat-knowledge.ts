/**
 * SOLVIXBIT AI Knowledge Base & Grounding Context
 * Aggregates all brand pillars, services, solutions, case studies, pricing, and workflows
 */

export interface KnowledgeItem {
  id: string;
  type: 'service' | 'solution' | 'case-study' | 'company' | 'pricing';
  title: string;
  slug?: string;
  url: string;
  tagline: string;
  summary: string;
  techStack?: string[];
  deliverables?: string[];
  pricing?: string;
}

export const SOLVIXBIT_KNOWLEDGE = {
  company: {
    name: 'SOLVIXBIT',
    tagline: 'Technology That Solves.',
    corePrinciple: 'Solve first. Build with purpose. Scale with confidence.',
    positioning: 'A creative technology and software engineering partner that helps businesses design, build, automate, and scale digital products and experiences.',
    mission: 'To help businesses solve meaningful problems through intelligent, scalable and practical technology.',
    engagementModel: 'Direct Senior Partner Access. Clients communicate directly with senior software architects and creative directors who design systems and write production code—no junior account managers or offshore handoffs.',
    sla: '24-hour architectural review turnaround. Mutual NDA protected.',
    directEmail: 'hello@solvixbit.com',
    links: {
      home: '/',
      about: '/about',
      contact: '/contact',
      startProject: '/start-a-project',
      services: '/services',
      solutions: '/solutions',
      work: '/work',
      insights: '/insights',
    },
  },

  pricingTiers: [
    {
      scope: 'Starter / MVP Pilot',
      budget: '$3,000 – $5,000',
      timeline: '4 to 6 Weeks',
      bestFor: 'Startups, feasibility validation, proof-of-concept builds, single-discipline tools.',
      deliverables: ['Clickable MVP Prototype', 'Core Database & Auth', 'Production Next.js / Cloud Deployment', 'Automated CI/CD'],
    },
    {
      scope: 'Standard Application Build',
      budget: '$5,000 – $15,000',
      timeline: '1 to 2 Months',
      bestFor: 'Growing businesses, high-converting platforms, full-stack SaaS apps, custom CRM/portal tools.',
      deliverables: ['Full-Stack Architecture', 'Multi-Tenant RBAC & Auth', 'Custom Dashboard & Analytics', 'REST / GraphQL API', 'Payment Integration'],
    },
    {
      scope: 'Full-Scale Platform & Enterprise',
      budget: '$15,000 – $35,000+',
      timeline: '2 to 4 Months',
      bestFor: 'Enterprise modernization, high-concurrency commerce, microservices decoupling, automated AI pipelines.',
      deliverables: ['Distributed Microservices', 'Event-Driven Message Queues', 'Zero-Downtime Migration', 'SOC 2 Ready Hardening', 'SLA Support'],
    },
    {
      scope: 'Monthly Advisory & Engineering Retainer',
      budget: 'Custom Monthly Scope',
      timeline: 'Ongoing / Dedicated Sprints',
      bestFor: 'Continuous feature engineering, dedicated fractional CTO / lead architect capacity, automated optimization.',
      deliverables: ['Dedicated Senior Architect Hours', 'Weekly Sprint Deliverables', 'Priority Bug / Feature SLAs'],
    },
  ],

  services: [
    {
      title: 'Custom Software Development',
      url: '/services/software-development',
      tagline: 'Enterprise & Cloud Systems',
      summary: 'High-performance software built for durability, security, and exponential scale. Bespoke web apps, APIs, and enterprise infrastructure.',
      techStack: ['TypeScript', 'Next.js 15', 'Node.js', 'Go', 'PostgreSQL', 'Redis', 'Docker', 'AWS ECS'],
      deliverables: ['Full-Stack Architecture', 'High-Throughput APIs', 'Custom Web Portals', 'Automated CI/CD', 'Zero-Downtime Migration'],
    },
    {
      title: 'AI & Automation',
      url: '/services/ai-automation',
      tagline: 'Intelligence & Ops',
      summary: 'Autonomous AI agents, automated workflow pipelines, and custom machine learning integrations that eliminate manual bottlenecks and repetitive human overhead.',
      techStack: ['Python', 'OpenAI / Gemini LLMs', 'LangChain', 'FastAPI', 'Vector DBs (Pinecone/pgvector)', 'Docker'],
      deliverables: ['Autonomous Workflow Agents', 'Custom LLM Pipelines', 'Intelligent Document Extraction', 'AI Customer Support Agents'],
    },
    {
      title: 'SaaS & Digital Products',
      url: '/services/saas-development',
      tagline: 'Product Engineering',
      summary: 'End-to-end digital product design, multi-tenant SaaS architecture, subscription billing, and high-retention user interfaces.',
      techStack: ['Next.js 15 App Router', 'TypeScript', 'Tailwind / Vanilla CSS', 'Stripe Billing', 'PostgreSQL (Prisma/Drizzle)', 'Supabase'],
      deliverables: ['Multi-Tenant Cloud Architectures', 'Product UX & UI Design', 'Subscription & Metered Billing', 'Onboarding & Retention Engines'],
    },
    {
      title: 'Web & Ecommerce',
      url: '/services/web-ecommerce',
      tagline: 'Digital Experience',
      summary: 'Fast, high-converting digital storefronts, headless commerce architectures, and bespoke marketing websites with sub-second page loads.',
      techStack: ['Next.js 15', 'Shopify Storefront API', 'Headless Commerce', 'Tailwind CSS', 'Vercel Edge', 'Sanity / Strapi CMS'],
      deliverables: ['Headless Shopify Storefronts', 'Sub-second Web Platforms', 'Conversion Rate Optimization', 'Custom Checkout Extensions'],
    },
    {
      title: 'Connected Systems & APIs',
      url: '/services/api-integrations',
      tagline: 'System Integration',
      summary: 'Secure API gateways, event-driven middleware, and bi-directional synchronizers that unify CRM, ERP, payment, and inventory tools.',
      techStack: ['Go', 'Node.js', 'Kafka', 'RabbitMQ', 'Redis Pub/Sub', 'REST / GraphQL', 'OpenAPI Specs'],
      deliverables: ['Event-Driven Message Queues', 'ERP & CRM Real-Time Sync', 'Idempotent Webhooks', 'Dead-Letter Queue Resilience'],
    },
    {
      title: 'Cloud & Infrastructure',
      url: '/services/cloud-integrations',
      tagline: 'Cloud & DevOps',
      summary: 'Scalable cloud infrastructure, DevOps pipelines, container orchestration, and high-availability auto-scaling.',
      techStack: ['AWS (ECS, Lambda, S3, RDS)', 'Google Cloud Platform', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions CI/CD'],
      deliverables: ['Infrastructure as Code (IaC)', 'Automated CI/CD Pipelines', 'Microservices Orchestration', '24/7 Monitoring & Telemetry'],
    },
    {
      title: 'Data & Decision Systems',
      url: '/services/data-analytics',
      tagline: 'Data Engineering',
      summary: 'Modern data warehouses, automated ETL pipelines, and executive KPI reporting dashboards providing trusted commercial visibility.',
      techStack: ['PostgreSQL', 'Snowflake', 'BigQuery', 'dbt', 'Python', 'ClickHouse', 'Apache Airflow'],
      deliverables: ['Automated ETL/ELT Pipelines', 'Modern Data Warehousing', 'Executive KPI Dashboards', 'Sub-Second Query Analytics'],
    },
    {
      title: 'Security & Quality Engineering',
      url: '/services/security-quality',
      tagline: 'Security & Hardening',
      summary: 'Comprehensive application security audits, automated vulnerability scanning in CI/CD, and zero-trust access hardening.',
      techStack: ['OWASP ZAP', 'Snyk', 'SonarQube', 'Vault', 'mTLS', 'OAuth2 / OIDC'],
      deliverables: ['OWASP Top 10 Hardening', 'Automated SAST/DAST Testing', 'Zero-Trust Secrets Rotation', 'SOC 2 Readiness Reviews'],
    },
    {
      title: 'Mobile & Cross-Platform Apps',
      url: '/services/mobile-engineering',
      tagline: 'Mobile & Edge Platforms',
      summary: 'High-performance native and cross-platform mobile applications engineered with React Native and Flutter for iOS and Android scale.',
      techStack: ['React Native', 'Flutter', 'TypeScript', 'Swift', 'Kotlin', 'Firebase', 'Fastlane'],
      deliverables: ['iOS & Android Production Apps', 'Offline-First Data Sync', 'Native Sensors & Camera Integration', 'Automated App Store Deployments'],
    },
  ],

  solutions: [
    {
      title: 'Enterprise Architecture & Modernization',
      url: '/solutions/enterprise-scale',
      tagline: 'Modernize & Scale',
      summary: 'Deconstruct monolithic technical debt without interrupting live business revenue using Strangler Fig decoupling and event buses.',
    },
    {
      title: 'Operational Automation & AI Agents',
      url: '/solutions/operational-automation',
      tagline: 'Eliminate Operational Bottlenecks',
      summary: 'Autonomous agentic workflows that replace error-prone manual spreadsheets, approval chains, and document ingestion.',
    },
    {
      title: 'Startup MVP & Rapid Venture Launch',
      url: '/solutions/startup-mvp',
      tagline: 'Concept to Market in 30 Days',
      summary: 'Production-ready MVP builds for visionary founders. High-fidelity UX, rock-solid auth, billing, and scalable cloud foundation.',
    },
    {
      title: 'SaaS Platform Acceleration',
      url: '/solutions/saas-acceleration',
      tagline: 'Scale B2B SaaS',
      summary: 'Multi-tenant database isolation, metered Stripe billing, team seat permissions, and enterprise onboarding engines.',
    },
    {
      title: 'Legacy System Modernization',
      url: '/solutions/legacy-modernization',
      tagline: 'Zero-Downtime Migration',
      summary: 'Refactoring fragile PHP, .NET, or legacy codebases into modern TypeScript/Go microservices with zero downtime.',
    },
    {
      title: 'Cloud-Native Distributed Systems',
      url: '/solutions/cloud-native-systems',
      tagline: 'High-Throughput Infrastructure',
      summary: 'Serverless and containerized clusters built for 99.99% availability, auto-scaling traffic surges, and regional failover.',
    },
    {
      title: 'API Integration Ecosystem',
      url: '/solutions/api-integration-ecosystem',
      tagline: 'Connected Commercial Operations',
      summary: 'Unified data conduits connecting Salesforce, NetSuite, SAP, Shopify, and custom databases with guaranteed delivery.',
    },
    {
      title: 'Intelligent Workflows & Machine Learning',
      url: '/solutions/intelligent-workflows',
      tagline: 'Custom ML & RAG Pipelines',
      summary: 'Enterprise LLM deployments, semantic retrieval systems, and predictive algorithms trained on your proprietary data.',
    },
    {
      title: 'High-Concurrency Commerce',
      url: '/solutions/high-concurrency-commerce',
      tagline: 'Headless Scale & Performance',
      summary: 'Ultra-fast headless checkout architectures designed to withstand flash sales, black Friday traffic, and global load.',
    },
    {
      title: 'Security Compliance Architecture',
      url: '/solutions/security-compliance-architecture',
      tagline: 'Zero-Trust & Compliance Hardening',
      summary: 'Audit-ready architecture engineered for SOC 2, ISO 27001, HIPAA, and GDPR compliance from the ground up.',
    },
  ],

  caseStudies: [
    {
      title: 'Fintech Payment Engine',
      url: '/work/fintech-payment-engine',
      metric: '99.999% Reliability | <40ms Latency',
      summary: 'Engineered a PCI-DSS compliant microservices payment orchestration engine capable of processing 12,000 transactions per second.',
    },
    {
      title: 'Ecommerce Headless Scale',
      url: '/work/ecommerce-headless-scale',
      metric: '3.4x Conversion Increase | 0.8s Load',
      summary: 'Migrated an omnichannel retail brand to Headless Next.js 15 and Shopify Plus, reducing load times to 800ms worldwide.',
    },
    {
      title: 'Enterprise AI Copilot',
      url: '/work/enterprise-ai-copilot',
      metric: '78% Ticket Reduction | Zero Hallucination',
      summary: 'Deployed a secure internal RAG knowledge assistant connecting Jira, Notion, and GitHub with fine-tuned domain models.',
    },
  ],
};

/**
 * Builds the comprehensive prompt injection for Gemini
 */
export function buildSolvixbitSystemPrompt(): string {
  return `
You are a Senior Solutions Architect and Partner at SOLVIXBIT (https://solvixbit.com).
Company Tagline: "Technology That Solves."
Core Philosophy: "Solve first. Build with purpose. Scale with confidence."

CRITICAL FORMATTING & HUMAN TONE RULES:
1. NEVER use double asterisks (**) or single asterisks (*) to bold text in your answers. Do NOT write **word**. Write plain, natural sentences.
2. NEVER use markdown heading hashes (#, ##, ###). Do NOT write "### Next Steps" or similar. Use natural sentence transitions instead.
3. Write with an authentic human touch. Speak warmly, intelligently, and consultatively, like a senior engineering partner writing a direct, high-value email to a client. Avoid robotic AI openers like "Certainly!", "I would be happy to help", or "In conclusion". Get straight to the point with technical substance.
4. When citing website pages, use clean markdown links: [Page Title](/path). NEVER wrap links in asterisks (do NOT write **[Link](/path)**).
5. When presenting multiple points or steps, use clean bullet points starting with a dash or bullet (e.g. - or •). Keep each point concise and readable.

YOUR MISSION:
1. Provide prospective clients with clear, authoritative, and direct architectural insight.
2. Deeply understand what the client wants to achieve (e.g. building an MVP, modernizing legacy systems, automating workflows with AI, building an ecommerce platform).
3. Connect their project directly to Solvixbit's offerings and provide clickable markdown links for next steps.

SOLVIXBIT OFFERINGS CATALOG (Always cite exact links):
SERVICES:
- Custom Software Development: [Custom Software Development](/services/software-development) (Next.js 15, Go, Node, Postgres, AWS ECS)
- AI & Automation: [AI & Automation](/services/ai-automation) (Autonomous agents, custom LLMs, document extraction)
- SaaS & Digital Products: [SaaS & Digital Products](/services/saas-development) (Multi-tenant architecture, Stripe billing, MVP to scale)
- Web & Ecommerce: [Web & Ecommerce](/services/web-ecommerce) (Headless Shopify, ultra-fast storefronts, sub-second load)
- Connected Systems & APIs: [Connected Systems & APIs](/services/api-integrations) (Event-driven Kafka/RabbitMQ, ERP/CRM real-time sync)
- Cloud & Infrastructure: [Cloud & Infrastructure](/services/cloud-integrations) (AWS/GCP, Docker, Terraform, CI/CD, auto-scaling)
- Data & Decision Systems: [Data & Decision Systems](/services/data-analytics) (Data warehousing, ETL pipelines, KPI dashboards)
- Security & Quality Engineering: [Security & Quality Engineering](/services/security-quality) (OWASP hardening, SOC 2 readiness, SAST/DAST)
- Mobile & Cross-Platform Apps: [Mobile & Cross-Platform Apps](/services/mobile-engineering) (React Native, Flutter, offline-first sync)

KEY SOLUTIONS:
- Enterprise Modernization: [Enterprise Architecture & Modernization](/solutions/enterprise-scale) & [Legacy System Modernization](/solutions/legacy-modernization)
- Startup MVP & Rapid Launch: [Startup MVP & Rapid Launch](/solutions/startup-mvp) (30-day concept to launch)
- Operational AI & Automation: [Operational Automation](/solutions/operational-automation) & [Intelligent Workflows](/solutions/intelligent-workflows)
- High-Concurrency Commerce: [High-Concurrency Commerce](/solutions/high-concurrency-commerce)
- SaaS Acceleration: [SaaS Acceleration](/solutions/saas-acceleration)

RELEVANT CASE STUDIES:
- Fintech Payment Engine (99.999% uptime): [Fintech Payment Engine](/work/fintech-payment-engine)
- Ecommerce Headless Scale (3.4x conversions): [Ecommerce Headless Scale](/work/ecommerce-headless-scale)
- Enterprise AI Copilot (78% manual ticket reduction): [Enterprise AI Copilot](/work/enterprise-ai-copilot)

COMMERCIAL PARAMETERS & PRICING:
- Starter MVP Pilots: $3,000 – $5,000 (typical 4 to 6 weeks)
- Standard Full-Stack Builds: $5,000 – $15,000 (1 to 2 months)
- Full-Scale Platforms: $15,000 – $35,000+
- Engagement Structure: Direct Senior Partner Access. Clients communicate directly with senior software architects and creative directors who design systems and write production code—no junior middle managers.
- Next Steps / Calls to Action:
  - Submit scope for 24h review: [Contact Us](/contact)
  - Interactive Project Questionnaire: [Start a Project](/start-a-project)
  - Direct Partner Email: hello@solvixbit.com

GUARDRAILS:
- You only represent Solvixbit's creative technology, engineering, cloud, and digital product services.
- If asked about unrelated matters, politely guide the conversation back to how Solvixbit can engineer their next digital breakthrough.
`.trim();
}
