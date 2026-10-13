import { SolutionDetail } from '../types/content';

export const solutionsData: SolutionDetail[] = [
  {
    slug: 'enterprise-scale',
    title: 'Enterprise Architecture & Modernization',
    kicker: 'MODERNIZE & SCALE',
    category: 'Architecture & Engineering',
    headline: 'Deconstruct monolithic technical debt without interrupting live business revenue.',
    summary: 'We help enterprise engineering teams transition brittle legacy applications into modular, cloud-native services with zero downtime and strict security compliance.',
    problemStatement: 'Legacy monolithic architectures and aging codebases slow down feature releases, increase cloud infrastructure waste, and introduce severe stability risks as transaction volumes surge.',
    challengeDetails: [
      {
        title: 'Monolithic Bottlenecks & High Blast Radius',
        description: 'Single-tier codebases make small deployments risky, resulting in infrequent release cycles and fear-driven development.',
      },
      {
        title: 'Escalating Maintenance & Cloud Overhead',
        description: 'Over-provisioned legacy servers and inefficient queries drive up hosting bills without improving throughput.',
      },
      {
        title: 'Knowledge Drain & Obsolete Stacks',
        description: 'Core logic locked in undocumented legacy frameworks creates high operational dependency and hiring friction.',
      },
    ],
    capabilities: [
      { title: 'Strangler Fig Decoupling', description: 'Incrementally extracting mission-critical domains into microservices with zero downtime.' },
      { title: 'Event-Driven Messaging', description: 'Asynchronous event buses (Kafka/RabbitMQ) for decoupled, resilient service communication.' },
      { title: 'Database Refactoring & Sharding', description: 'Migrating legacy relational databases to optimized transactional and analytical stores.' },
      { title: 'API Gateway & Zero-Trust Mesh', description: 'Centralized authentication, rate limiting, and mTLS service-to-service communication.' },
    ],
    scopeBoundaries: [
      'Focuses on software architecture, cloud platforms, and data layer modernization.',
      'Hardware on-premises rack maintenance is coordinated through your datacenter provider.',
    ],
    approach: 'We apply the Strangler Fig migration pattern, systematically isolating business domains into decoupled microservices while maintaining continuous bi-directional data synchronization.',
    phases: [
      {
        phase: '01',
        title: 'Discovery & Dependency Audit',
        description: 'Mapping system bottlenecks, data flows, domain boundaries, and compliance constraints.',
        deliverables: ['System Dependency Map', 'Architectural Health Report', 'Migration Risk Assessment'],
      },
      {
        phase: '02',
        title: 'Domain Isolation & Interface Contract',
        description: 'Establishing API contracts and bi-directional synchronizers between legacy and new services.',
        deliverables: ['OpenAPI Specifications', 'Data Sync Middleware', 'Staging Testbed'],
      },
      {
        phase: '03',
        title: 'Microservices Build & Traffic Routing',
        description: 'Developing containerized microservices and routing incremental live traffic via smart proxying.',
        deliverables: ['Production Microservices', 'Canary Release Pipelines', 'Automated Integration Tests'],
      },
      {
        phase: '04',
        title: 'Zero-Downtime Cutover',
        description: 'Executing final data cutover with automated rollback plans and real-time observability.',
        deliverables: ['Cutover Runbook', 'Telemetry Dashboards', 'Failover Drills'],
      },
      {
        phase: '05',
        title: 'Post-Launch Optimization',
        description: 'Fine-tuning memory footprints, database indexing, caching strategies, and auto-scaling rules.',
        deliverables: ['Performance Benchmarks', 'Runbook Documentation', 'Staff Handover Training'],
      },
    ],
    outcomes: [
      { label: 'Cloud Efficiency', value: '30-45%', description: 'Typical reduction in cloud compute waste after containerization' },
      { label: 'Deployment Agility', value: 'Daily', description: 'Transition from monthly manual releases to automated daily deploys' },
      { label: 'Fault Isolation', value: '100%', description: 'Failures in one domain no longer crash unrelated business functions' },
    ],
    targetAudience: {
      businessTypes: ['Mid-Market Enterprises', 'High-Growth Tech Scaleups', 'Financial Institutions'],
      teams: ['CTOs & VP of Engineering', 'Enterprise Architects', 'Product Engineering Directors'],
      useCases: ['Monolith to Microservices Transition', 'Multi-tenant SaaS Migration', 'Legacy Stack Upgrade'],
    },
    engagementModels: [
      {
        title: 'Architectural Discovery & Blueprint',
        duration: '2 to 3 Weeks',
        description: 'Deep-dive code audit, dependency mapping, and comprehensive migration roadmap.',
        bestFor: 'Organizations needing clear technical clarity before committing budget.',
      },
      {
        title: 'Targeted Domain Migration Sprint',
        duration: '6 to 12 Weeks',
        description: 'End-to-end extraction of a single high-priority business capability into production.',
        bestFor: 'Teams wanting rapid proof of value on a high-friction legacy module.',
      },
      {
        title: 'Full Platform Transformation',
        duration: '3 to 6 Months',
        description: 'Dedicated embedded engineering pod executing end-to-end modernization.',
        bestFor: 'Comprehensive system overhauls requiring sustained senior architectural firepower.',
      },
      {
        title: 'Ongoing Architecture Advisory',
        duration: 'Monthly Retainer',
        description: 'Fractional principal architect guidance, code reviews, and governance.',
        bestFor: 'In-house teams executing modernization seeking expert oversight.',
      },
    ],
    faqs: [
      {
        question: 'How do you guarantee zero downtime during the migration?',
        answer: 'We deploy dual-write and event-mirroring proxies so both legacy and modern systems stay synchronized in real time. Traffic is shifted incrementally (1%, 5%, 50%, 100%) with automated rollbacks on any error budget breach.',
      },
      {
        question: 'Do our internal engineers need to stop feature development during modernization?',
        answer: 'No. Modernization is designed to run in parallel. By establishing clear interface boundaries, your internal team continues delivering product features while we modernize core infrastructure.',
      },
      {
        question: 'Who owns the intellectual property and code produced?',
        answer: 'You retain 100% full intellectual property and repository ownership. All code, infrastructure scripts, and documentation are committed directly to your organization’s private repositories.',
      },
      {
        question: 'What happens after the project is completed?',
        answer: 'We conduct comprehensive handover sessions, recorded architecture walkthroughs, and automated runbooks for your team, with optional ongoing advisory support.',
      },
    ],
    useCases: [
      {
        title: 'Core Banking Ledger Refactor',
        scenario: 'A regional financial firm running on monolithic Java experiencing high API latencies and deployment freezes.',
        resolution: 'Refactored transactional ledger into event-driven Go microservices with sub-50ms execution and automated CI/CD.',
      },
      {
        title: 'ERP & Customer Record Unification',
        scenario: 'Fragmented customer records scattered across disparate legacy internal software tools.',
        resolution: 'Engineered a unified GraphQL data middleware bridging internal databases with zero downtime.',
      },
    ],
    servicesIncluded: ['Custom Software Development', 'Cloud Infrastructure & DevOps', 'AI & Automation'],
    relatedSolutionSlugs: ['cloud-engineering-reliability', 'connected-systems-api-integration', 'application-security-quality'],
  },
  {
    slug: 'operational-automation',
    title: 'Intelligent Process & AI Automation',
    kicker: 'EFFICIENCY & ACCURACY',
    category: 'AI & Automation',
    headline: 'Eliminate manual operational bottlenecks with custom AI agents and deterministic pipelines.',
    summary: 'Transform repetitive manual tasks, unstructured document processing, and multi-system data reconciliation into autonomous, self-healing digital workflows.',
    problemStatement: 'Knowledge workers spend extensive weekly hours copy-pasting data between disconnected software tools, reviewing PDFs manually, and reconciling operational exceptions.',
    challengeDetails: [
      {
        title: 'Manual Data Triage & Document Processing',
        description: 'Invoices, insurance claims, and legal agreements stuck in human review queues for days.',
      },
      {
        title: 'High Human Error in Repetitive Reconciliations',
        description: 'Fatigue-induced errors in manual data entry leading to compliance and accounting issues.',
      },
      {
        title: 'Brittle Legacy RPA Tools',
        description: 'Fragile screen-scraping bots that break whenever underlying UI elements change.',
      },
    ],
    capabilities: [
      { title: 'Intelligent Document Processing', description: 'Extracting structured entities from PDFs, scans, and emails with OCR and LLMs.' },
      { title: 'Deterministic Guardrails', description: 'Rule-based verification ensuring zero hallucinations in regulated workflows.' },
      { title: 'Multi-Agent Workflow Orchestration', description: 'Autonomous agents handling complex conditional business processes.' },
      { title: 'Human-in-the-Loop Fallbacks', description: 'Clean review queues for edge-case exceptions requiring human oversight.' },
    ],
    scopeBoundaries: [
      'Tailored for operational data workflows, documents, and business system orchestration.',
      'Does not replace core business judgment; focuses on eliminating repetitive mechanical steps.',
    ],
    approach: 'We design custom AI pipelines pairing state-of-the-art LLMs with deterministic validation rules to ensure 100% data fidelity before executing actions across your software stack.',
    phases: [
      {
        phase: '01',
        title: 'Process Discovery & Feasibility Study',
        description: 'Auditing high-volume operational bottlenecks and defining automation criteria.',
        deliverables: ['Workflow Audit Matrix', 'Data Sampling Analysis', 'Feasibility Blueprint'],
      },
      {
        phase: '02',
        title: 'Pipeline Architecture & Guardrail Design',
        description: 'Establishing LLM prompts, deterministic parsers, and schema validation rules.',
        deliverables: ['Prompt Architecture Specs', 'Deterministic Validator Suite', 'Test Dataset'],
      },
      {
        phase: '03',
        title: 'Integration & Human-in-the-Loop UI',
        description: 'Connecting upstream APIs, building exception review queues, and automating actions.',
        deliverables: ['Reviewer Dashboard', 'API Connectors', 'End-to-End Orchestrator'],
      },
      {
        phase: '04',
        title: 'Shadow Run & Accuracy Validation',
        description: 'Running pipelines in shadow mode alongside human teams to verify 99%+ accuracy.',
        deliverables: ['Accuracy Benchmark Report', 'Discrepancy Log', 'Go-Live Readiness Sign-off'],
      },
      {
        phase: '05',
        title: 'Deployment & Continuous Learning',
        description: 'Activating live processing with automated monitoring and drift detection.',
        deliverables: ['Production Monitoring', 'Telemetry Dashboard', 'Operator Playbooks'],
      },
    ],
    outcomes: [
      { label: 'Turnaround Time', value: 'Minutes', description: 'From 48-hour manual queues to near-instant automated processing' },
      { label: 'Process Accuracy', value: '99%+', description: 'Deterministic guardrails eliminate LLM hallucinations' },
      { label: 'Operational Capacity', value: '5x to 10x', description: 'Scale transaction volume without linear headcount growth' },
    ],
    targetAudience: {
      businessTypes: ['Logistics & Supply Chain', 'Financial & Professional Services', 'Healthcare & Insurance Providers'],
      teams: ['Chief Operating Officers', 'Head of Operations & Automation', 'Finance & Compliance Directors'],
      useCases: ['Automated Invoice & Claims Processing', 'CRM/ERP Sync Workflows', 'Customer Support Triage'],
    },
    engagementModels: [
      {
        title: 'Automation Assessment & POC',
        duration: '2 Weeks',
        description: 'Rapid proof-of-concept on your actual document samples to prove accuracy.',
        bestFor: 'Teams evaluating ROI before organizational rollout.',
      },
      {
        title: 'Single-Workflow Production Automation',
        duration: '4 to 8 Weeks',
        description: 'Complete end-to-end automation of one core business process.',
        bestFor: 'Businesses with one immediate, high-volume manual bottleneck.',
      },
      {
        title: 'Enterprise Automation Engine',
        duration: '3 to 5 Months',
        description: 'Multi-department workflow platform connecting ERP, CRM, and custom agents.',
        bestFor: 'Organizations aiming for broad operational automation.',
      },
      {
        title: 'Model Monitoring & Maintenance',
        duration: 'Monthly Retainer',
        description: 'Continuous prompt tuning, API monitoring, and edge-case handling.',
        bestFor: 'Ensuring long-term stability and adapting to evolving document formats.',
      },
    ],
    faqs: [
      {
        question: 'How do you prevent AI hallucinations in critical financial/legal workflows?',
        answer: 'We implement strict deterministic schema validation. The LLM extracts data, but structured validators (regex, cross-field balance checks, database foreign-key lookups) enforce correctness. If confidence falls below 98%, it routes to a human reviewer.',
      },
      {
        question: 'Is our sensitive company and customer data kept private?',
        answer: 'Yes. We utilize enterprise private endpoints with zero data retention for training, or self-hosted open-weight models on your private cloud infrastructure.',
      },
      {
        question: 'What happens when documents arrive in unexpected formats?',
        answer: 'Our pipelines flag unrecognized formats and route them to an intuitive human-in-the-loop triage interface with pre-filled recommendations.',
      },
      {
        question: 'Can this integrate with our legacy on-prem software?',
        answer: 'Yes, we build secure bridge adapters and webhooks that interface with legacy SQL databases, FTP servers, and REST APIs.',
      },
    ],
    useCases: [
      {
        title: 'Automated Invoice & Claims Intake',
        scenario: 'Insurance provider handling 5,000+ monthly unstructured claim documents manually.',
        resolution: 'Implemented multi-modal OCR + LLM triage engine extracting 42 structured data fields in seconds with audit trails.',
      },
      {
        title: 'Cross-App CRM & Billing Orchestration',
        scenario: 'Sales operations team manually duplicating contract details from DocuSign to billing databases.',
        resolution: 'Automated webhook workflow triggering instant tenant provisioning and invoice generation upon signature.',
      },
    ],
    servicesIncluded: ['AI & Automation', 'Custom Software Development', 'Cloud Infrastructure & DevOps'],
    relatedSolutionSlugs: ['connected-systems-api-integration', 'data-intelligence-decision-systems', 'b2b-portals-workflow-platforms'],
  },
  {
    slug: 'startup-mvp',
    title: 'Zero-to-One Product Acceleration',
    kicker: 'VENTURE VELOCITY',
    category: 'Product Engineering',
    headline: 'Go from technical concept to venture-ready, production-grade MVP in 8 weeks.',
    summary: 'We partner with funded founders and corporate venture arms to design, architect, and launch scalable digital products engineered to win customers and impress investors.',
    problemStatement: 'Hiring an in-house engineering team takes 3 to 6 months and substantial capital before a single line of code is written, risking market timing and burning runway.',
    challengeDetails: [
      {
        title: 'Protracted Hiring Timelines',
        description: 'Sourcing, vetting, and onboarding technical leads eats away crucial pre-seed runway.',
      },
      {
        title: 'Scrappy Prototypes with Disastrous Tech Debt',
        description: 'No-code or poorly engineered MVPs often need complete rewrites once early traction hits.',
      },
      {
        title: 'Misaligned Product Architecture',
        description: 'Over-engineering or choosing the wrong tech stack causes sluggish pivot cycles.',
      },
    ],
    capabilities: [
      { title: 'Rapid Prototyping & Figma Systems', description: 'Production-ready design tokens and interactive prototypes within 10 days.' },
      { title: 'Modular SaaS Foundations', description: 'Pre-vetted authentication, RBAC, tenant isolation, and billing integrations.' },
      { title: 'Full-Stack Modern Engineering', description: 'Next.js, TypeScript, PostgreSQL/Supabase, and scalable edge deployment.' },
      { title: 'SOC 2 & Privacy Compliance Prep', description: 'Architecting for enterprise procurement from the very first commit.' },
    ],
    scopeBoundaries: [
      'Engineered for 0-to-1 greenfield products or complete rebuilds of early prototypes.',
      'Post-launch marketing and user acquisition are handled by your growth team.',
    ],
    approach: 'We provide an integrated SWAT team of senior architects, product designers, and full-stack engineers deploying pre-tested SaaS scaffolding to deliver rapid velocity without technical debt.',
    phases: [
      {
        phase: '01',
        title: 'Product Scope & Technical Architecture',
        description: 'Defining core value proposition, cutting non-essential scope, and drafting technical architecture.',
        deliverables: ['MVP Feature Spec', 'Data Model Schema', 'Wireframe Architecture'],
      },
      {
        phase: '02',
        title: 'UI/UX Design System & Clickable Prototype',
        description: 'Crafting high-fidelity UI screens, interactive design components, and user flows.',
        deliverables: ['Figma Design System', 'Interactive Prototype', 'Design Tokens'],
      },
      {
        phase: '03',
        title: 'Core Engine & Frontend Engineering',
        description: 'Building the core business logic, database layer, authentication, and responsive views.',
        deliverables: ['Staging Deployment', 'Database Migrations', 'Core User Journeys'],
      },
      {
        phase: '04',
        title: 'Billing, Integrations & Security Hardening',
        description: 'Integrating Stripe/payment gateways, email services, webhooks, and security headers.',
        deliverables: ['Payment Flow Validation', 'Email Notification Suite', 'Security Audit'],
      },
      {
        phase: '05',
        title: 'Production Launch & Founder Handover',
        description: 'Deploying to production, configuring telemetry, and conducting codebase walkthroughs.',
        deliverables: ['Production Release', 'Documentation Hub', 'Engineering Handover'],
      },
    ],
    outcomes: [
      { label: 'Time-to-Market', value: '8 Weeks', description: 'Kickoff to live production deployment with real paying users' },
      { label: 'Engineering Quality', value: '100%', description: 'Type-safe TypeScript and scalable relational architecture' },
      { label: 'Full IP Assignment', value: 'Complete', description: 'Clean git history, 100% IP ownership assigned directly to your company' },
    ],
    targetAudience: {
      businessTypes: ['Funded Startup Founders (Pre-seed / Seed / Series A)', 'Corporate Innovation Labs', 'Bootstrapped Tech Innovators'],
      teams: ['Founders & CEOs', 'Heads of Product', 'Corporate Venture Directors'],
      useCases: ['B2B SaaS Platform Launch', 'AI-First Product MVP', 'Marketplace & Booking Engine'],
    },
    engagementModels: [
      {
        title: 'Technical Sprint Blueprint',
        duration: '1 to 2 Weeks',
        description: 'Architecture design, data modeling, wireframing, and fixed-sprint estimation.',
        bestFor: 'Founders wanting validated technical planning before development.',
      },
      {
        title: '8-Week Production MVP Build',
        duration: '8 Weeks',
        description: 'Full-stack engineering sprint from design to live production deployment.',
        bestFor: 'Funded teams ready to build and launch their core product.',
      },
      {
        title: 'Post-Launch Iteration Pod',
        duration: 'Monthly Sprint Cycles',
        description: 'Continuous feature engineering, telemetry analysis, and user feedback iterations.',
        bestFor: 'Maintaining engineering velocity while hiring an internal team.',
      },
    ],
    faqs: [
      {
        question: 'What tech stack do you recommend for SaaS MVPs?',
        answer: 'We typically build with Next.js (React), TypeScript, TailwindCSS, Node.js/Go, PostgreSQL (Supabase/Neon), Redis, and Stripe. This stack provides extreme developer velocity, low hosting costs, and effortless scalability to millions of requests.',
      },
      {
        question: 'How do you handle scope creep during an 8-week build?',
        answer: 'We establish an uncompromised "Must-Have" MVP definition in Phase 1. Secondary features are documented in a post-launch Phase 2 backlog so the launch date is never compromised.',
      },
      {
        question: 'Can you help us transition the code to our internal hires later?',
        answer: 'Yes. We write comprehensive documentation, maintain clean PRs, and conduct video walkthroughs with your new engineering hires to ensure seamless onboarding.',
      },
      {
        question: 'Do you take equity in exchange for development?',
        answer: 'We operate as a fee-for-service engineering partner. This ensures 100% alignment, predictable sprint delivery, and allows you to keep full equity for investors and employees.',
      },
    ],
    useCases: [
      {
        title: 'B2B Compliance SaaS MVP',
        scenario: 'Seed-funded founder needing enterprise-ready multi-tenant application with Stripe billing and RBAC.',
        resolution: 'Delivered full product with SOC 2 compliant architecture, self-serve onboarding, and analytics in 7 weeks.',
      },
      {
        title: 'Specialized Logistics Marketplace',
        scenario: 'Industry veteran building a double-sided booking platform for freight logistics.',
        resolution: 'Architected real-time scheduling engine with automated payout split logic and live map tracking.',
      },
    ],
    servicesIncluded: ['SaaS & Digital Products', 'Custom Software Development', 'Mobile Applications'],
    relatedSolutionSlugs: ['digital-experience-conversion', 'connected-systems-api-integration', 'b2b-portals-workflow-platforms'],
  },
  {
    slug: 'high-conversion-commerce',
    title: 'High-Velocity Headless Commerce',
    kicker: 'COMMERCE ENGINE',
    category: 'Ecommerce & Digital',
    headline: 'Sub-second page speeds, bespoke product builders, and global checkout scale.',
    summary: 'Elevate high-growth D2C and B2B brands with headless Shopify Plus architectures that maximize average order value (AOV) and eliminate checkout friction.',
    problemStatement: 'Monolithic storefront templates suffer from slow mobile load times, rigid theme limitations, and high cart abandonment during peak seasonal traffic spikes.',
    challengeDetails: [
      {
        title: 'Sluggish Page Loads & Core Web Vitals Failure',
        description: 'App bloat and third-party scripts drop conversion rates on mobile devices.',
      },
      {
        title: 'Theme Limitations for Complex Products',
        description: 'Standard Shopify Liquid templates struggle to support dynamic bundling, subscriptions, or custom 3D configurators.',
      },
      {
        title: 'Global Multi-Currency Friction',
        description: 'Fragmented checkout experiences across localized international markets.',
      },
    ],
    capabilities: [
      { title: 'Next.js Edge Storefronts', description: 'Sub-second page loads with static generation and incremental cache revalidation.' },
      { title: 'Shopify Storefront GraphQL & Cart APIs', description: 'Deep integration with Shopify Plus checkout, Shop Pay, and inventory systems.' },
      { title: 'Custom Bundles & Upsell Logic', description: 'Tailored cart transformation rules and AI-powered product recommendations.' },
      { title: 'Headless CMS for Editorial Content', description: 'Sanity/Contentful CMS integration empowering marketing teams to publish dynamic landings.' },
    ],
    scopeBoundaries: [
      'Focuses on custom frontend architecture, commerce APIs, and conversion optimization.',
      'Inventory warehousing and physical fulfillment remain managed in your ERP/Shopify backend.',
    ],
    approach: 'We decouple your commerce engine, pairing Shopify Plus backend reliability with an ultra-fast Next.js edge-rendered frontend, custom cart transformation rules, and intelligent search.',
    phases: [
      {
        phase: '01',
        title: 'Commerce Audit & Data Architecture',
        description: 'Auditing product variants, metafields, 3rd party apps, and conversion funnel drop-offs.',
        deliverables: ['Core Web Vitals Audit', 'Metafield Schema Map', 'App Dependency Plan'],
      },
      {
        phase: '02',
        title: 'UI/UX Craft & Checkout Flow Design',
        description: 'Designing bespoke product detail pages, mini-cart slideouts, and high-conversion UX.',
        deliverables: ['Figma Commerce System', 'Cart UX Prototype', 'Mobile-First Layouts'],
      },
      {
        phase: '03',
        title: 'Edge Frontend & Headless CMS Build',
        description: 'Developing Next.js storefront, connecting Storefront GraphQL APIs, and configuring CMS.',
        deliverables: ['Edge Storefront Codebase', 'CMS Schema Setup', 'Algolia/Search Integration'],
      },
      {
        phase: '04',
        title: 'Cart Transformation & Load Testing',
        description: 'Implementing custom discount rules, bundle logic, and simulating peak flash-sale loads.',
        deliverables: ['Custom Shopify Functions', 'Load Test Benchmark', 'SEO Redirect Map'],
      },
      {
        phase: '05',
        title: 'Launch & Conversion Monitoring',
        description: 'Executing seamless DNS switch with continuous analytics tracking and real-time monitoring.',
        deliverables: ['Production Storefront', 'Analytics Telemetry', 'Post-Launch Optimization Plan'],
      },
    ],
    outcomes: [
      { label: 'Mobile Page Speed', value: '< 800ms', description: 'Instantaneous product navigation and sub-second Largest Contentful Paint' },
      { label: 'Conversion Lift', value: '+20-35%', description: 'Typical improvement following headless speed and UX optimization' },
      { label: 'Peak Concurrency', value: '50k+', description: 'Effortlessly handle flash-sale surges without server throttling' },
    ],
    targetAudience: {
      businessTypes: ['High-Volume D2C Brands ($3M+ ARR)', 'Omnichannel Retailers', 'B2B Wholesale Merchants'],
      teams: ['Chief Marketing Officers', 'VP of Ecommerce', 'Direct-to-Consumer Directors'],
      useCases: ['Headless Storefront Migration', 'Custom Product Configurator', 'Global Multi-Storefront Consolidation'],
    },
    engagementModels: [
      {
        title: 'Headless Feasibility & Architecture Audit',
        duration: '2 Weeks',
        description: 'In-depth audit of Shopify app dependencies, performance, and headless ROI roadmap.',
        bestFor: 'Brands evaluating whether headless architecture is the right commercial decision.',
      },
      {
        title: 'Full Headless Storefront Build',
        duration: '8 to 12 Weeks',
        description: 'Bespoke design, Next.js engineering, CMS setup, and zero-downtime migration.',
        bestFor: 'High-growth brands ready to scale beyond standard theme limitations.',
      },
      {
        title: 'Conversion Rate & Performance Retainer',
        duration: 'Monthly Retainer',
        description: 'Continuous A/B testing, speed optimization, landing page production, and feature development.',
        bestFor: 'Established stores requiring ongoing technical optimization.',
      },
    ],
    faqs: [
      {
        question: 'Will our marketing team still be able to edit product pages and banners?',
        answer: 'Yes. We integrate visual headless CMS platforms like Sanity or Contentful, giving non-technical marketing teams drag-and-drop landing page builders without touching code.',
      },
      {
        question: 'Does headless commerce break existing Shopify apps like Klaviyo or Gorgias?',
        answer: 'Standard marketing integrations (Klaviyo, Gorgias, Yotpo, Postscript) connect cleanly via modern Javascript SDKs and server-side webhooks without slowing down initial page render.',
      },
      {
        question: 'How does headless improve SEO?',
        answer: 'Next.js pre-renders every product and collection page at the edge into clean HTML. This ensures perfect Google crawlability, 100/100 Lighthouse performance scores, and rich schema markup.',
      },
      {
        question: 'Can we retain Shopify checkout and Shop Pay?',
        answer: 'Yes. The checkout journey seamlessly transitions into Shopify Plus checkout with native Shop Pay, Apple Pay, and Google Pay support.',
      },
    ],
    useCases: [
      {
        title: 'Luxury Fashion Global Storefront',
        scenario: 'Luxury apparel brand struggling with slow image load times and high international bounce rates on standard Shopify themes.',
        resolution: 'Re-platformed to Next.js edge storefront with dynamic multi-currency routing, boosting mobile conversion and eliminating latency.',
      },
      {
        title: 'Custom Subscription Bundle Builder',
        scenario: 'Supplement brand requiring a custom multi-step "Build Your Box" subscription experience.',
        resolution: 'Built an interactive 3D bundle configurator with custom Shopify Functions cart transformation rules.',
      },
    ],
    servicesIncluded: ['Web & Ecommerce', 'Custom Software Development', 'Digital Experience & UI/UX'],
    relatedSolutionSlugs: ['digital-experience-conversion', 'connected-systems-api-integration', 'cloud-engineering-reliability'],
  },
  {
    slug: 'connected-systems-api-integration',
    title: 'Connected Systems & API Integration',
    kicker: 'DATA ORCHESTRATION',
    category: 'Architecture & Engineering',
    headline: 'Eliminate operational silos by connecting your ERP, CRM, and bespoke business tools.',
    summary: 'We architect enterprise API middleware, reliable webhook pipelines, and bi-directional data synchronizers that unify your fragmented tech stack into an integrated engine.',
    problemStatement: 'Disjointed software applications force teams into manual data re-entry, cause inventory and accounting discrepancies, and prevent real-time operational visibility.',
    challengeDetails: [
      {
        title: 'Data Silos & Disjointed System Records',
        description: 'Customer, order, and inventory data out of sync across Salesforce, NetSuite, and custom databases.',
      },
      {
        title: 'Fragile Point-to-Point Integrations',
        description: 'Ad-hoc Zapier/webhook setups that fail silently under high concurrency without retry logic.',
      },
      {
        title: 'Rate Limit Throttling & API Latency',
        description: 'Third-party SaaS rate limits causing failed customer transactions during peak traffic.',
      },
    ],
    capabilities: [
      { title: 'Unified API Middleware & GraphQL', description: 'Single unified data query layer abstracting legacy ERPs and third-party APIs.' },
      { title: 'Resilient Event Streaming', description: 'Kafka and RabbitMQ message queues with dead-letter handling and exponential backoff.' },
      { title: 'Bi-Directional Sync Pipelines', description: 'Real-time state synchronization ensuring 100% parity across platforms.' },
      { title: 'Integration Observability & Alerts', description: 'Centralized telemetry logging and instant Slack/PagerDuty alerts for failed payloads.' },
    ],
    scopeBoundaries: [
      'Focuses on backend integration architecture, API middleware, and automated data pipelines.',
      'Third-party software license agreements are managed directly by your organization.',
    ],
    approach: 'We design decoupled integration middleware with idempotent message processing, durable queues, and structured schemas, ensuring zero data loss and automated failover.',
    phases: [
      {
        phase: '01',
        title: 'Integration Audit & Data Mapping',
        description: 'Auditing API schemas, rate limits, data schemas, and frequency requirements across all systems.',
        deliverables: ['Data Flow Architecture Map', 'Schema Alignment Matrix', 'Rate Limit Strategy'],
      },
      {
        phase: '02',
        title: 'Middleware & Queue Architecture',
        description: 'Setting up message broker infrastructure, schema validators, and encryption in transit.',
        deliverables: ['Event Broker Configuration', 'Schema Validation Engine', 'Security Specifications'],
      },
      {
        phase: '03',
        title: 'Connector Engineering & Idempotency',
        description: 'Building custom microservice adapters with automated retry policies and duplicate prevention.',
        deliverables: ['System Connectors', 'Idempotent Sync Handlers', 'Dead-Letter Queues'],
      },
      {
        phase: '04',
        title: 'End-to-End Stress Testing',
        description: 'Simulating network failures, API outages, and high payload spikes to verify resilience.',
        deliverables: ['Resilience Test Report', 'Chaos Testing Sign-off', 'Failover Runbooks'],
      },
      {
        phase: '05',
        title: 'Production Cutover & Monitoring',
        description: 'Deploying live sync pipelines with real-time health dashboards and telemetry.',
        deliverables: ['Live Production Pipeline', 'Telemetry Dashboard', 'Support Playbook'],
      },
    ],
    outcomes: [
      { label: 'Data Parity', value: '100%', description: 'Real-time synchronization across CRM, ERP, and proprietary systems' },
      { label: 'Sync Latency', value: '< 2s', description: 'From batch nightly updates to instantaneous event-driven sync' },
      { label: 'Payload Failure Rate', value: '0.00%', description: 'Automated retries and dead-letter queues prevent data drops' },
    ],
    targetAudience: {
      businessTypes: ['Enterprise Logistics', 'Wholesale Distributors', 'Multi-Brand Holding Groups'],
      teams: ['Chief Information Officers', 'IT Directors', 'Lead Systems Architects'],
      useCases: ['Salesforce to ERP Real-Time Sync', 'Custom Core Database to Commerce Sync', 'Multi-Partner B2B EDI Modernization'],
    },
    engagementModels: [
      {
        title: 'Integration Architecture Assessment',
        duration: '2 Weeks',
        description: 'Comprehensive review of your data flows, API constraints, and recommended integration architecture.',
        bestFor: 'Organizations planning large multi-system modernization.',
      },
      {
        title: 'Targeted System Connector Sprint',
        duration: '4 to 8 Weeks',
        description: 'Engineering resilient, scalable bi-directional sync between 2 to 3 core business applications.',
        bestFor: 'Teams needing to eliminate a specific high-friction manual data bridge.',
      },
      {
        title: 'Enterprise Integration Mesh',
        duration: '3 to 6 Months',
        description: 'Building a centralized event-driven API gateway connecting all internal and external tools.',
        bestFor: 'Enterprises managing complex ecosystem data exchanges.',
      },
    ],
    faqs: [
      {
        question: 'How do you handle third-party API outages or rate limits?',
        answer: 'We build durable message queues (e.g. AWS SQS, Redis Streams, Kafka). If a downstream API experiences an outage or hits rate limits, incoming payloads are safely buffered and retried with exponential backoff without data loss.',
      },
      {
        question: 'Can you integrate with custom internal systems without public API docs?',
        answer: 'Yes. We inspect database schemas, database triggers, message queues, or write custom API adapter layers for legacy on-premise systems.',
      },
      {
        question: 'How do we know when an integration encounters a malformed payload?',
        answer: 'Malformed payloads are routed to a Dead-Letter Queue (DLQ), and automated alerts notify your team with full payload context and error details.',
      },
    ],
    useCases: [
      {
        title: 'Automated Multi-Currency Reconciliation Engine',
        scenario: 'Global fintech platform requiring real-time payment reconciliation across 6 bank APIs and internal ledger.',
        resolution: 'Built event-driven microservices processing over $120M in monthly volume with zero discrepancies.',
      },
      {
        title: 'ERP to Warehouse Logistics Bridge',
        scenario: 'Wholesale distributor manually exporting CSV files daily between NetSuite and 3PL warehouse.',
        resolution: 'Architected automated bidirectional sync with real-time stock allocation and tracking updates.',
      },
    ],
    servicesIncluded: ['Cloud Infrastructure & DevOps', 'Custom Software Development', 'AI & Automation'],
    relatedSolutionSlugs: ['enterprise-scale', 'data-intelligence-decision-systems', 'b2b-portals-workflow-platforms'],
  },
  {
    slug: 'data-intelligence-decision-systems',
    title: 'Data Intelligence & Decision Systems',
    kicker: 'ANALYTICAL CLARITY',
    category: 'Data & Analytics',
    headline: 'Turn fragmented data into actionable decision engines and executive dashboards.',
    summary: 'We build modern data pipelines, analytics warehouses, and bespoke executive visualization interfaces that give leadership real-time clarity over operational and financial metrics.',
    problemStatement: 'Leadership and operations teams struggle to make informed decisions due to stale weekly spreadsheets, fragmented reporting tools, and unvalidated data sources.',
    challengeDetails: [
      {
        title: 'Stale & Manual Reporting Spreadsheets',
        description: 'Teams spending hours manually compiling Excel spreadsheets that are outdated the moment they are distributed.',
      },
      {
        title: 'Conflicting Metrics Across Departments',
        description: 'Marketing, sales, and finance reporting conflicting revenue and churn figures due to unaligned definitions.',
      },
      {
        title: 'Slow Query Performance on Transactional Databases',
        description: 'Running heavy analytical queries directly on production databases causing system slowdowns.',
      },
    ],
    capabilities: [
      { title: 'Modern Data Stack & Warehousing', description: 'Snowflake, BigQuery, and ClickHouse setups with dbt data transformations.' },
      { title: 'Real-Time ETL & Streaming Pipelines', description: 'Continuous data ingestion from databases, APIs, and webhooks.' },
      { title: 'Custom Executive Dashboards', description: 'Tailored Next.js / Tremor data visualizations built specifically for your KPIs.' },
      { title: 'Automated Anomaly Detection', description: 'Algorithmic alerting on revenue drops, churn spikes, or operational anomalies.' },
    ],
    scopeBoundaries: [
      'Focuses on data engineering, analytics modeling, and bespoke reporting dashboards.',
      'We do not provide generic third-party BI software reselling; we build custom high-performance data systems.',
    ],
    approach: 'We establish a single source of truth using modern columnar data warehouses, automated dbt modeling, and ultra-fast custom dashboard interfaces.',
    phases: [
      {
        phase: '01',
        title: 'KPI Definition & Source Audit',
        description: 'Defining core business metrics, data schemas, and mapping all disparate data sources.',
        deliverables: ['Metric Dictionary', 'Data Source Audit', 'Target Schema Blueprint'],
      },
      {
        phase: '02',
        title: 'Warehouse & Pipeline Engineering',
        description: 'Setting up automated extraction pipelines and columnar data warehouse storage.',
        deliverables: ['Ingestion Pipelines', 'Data Warehouse Schema', 'Transformation Models (dbt)'],
      },
      {
        phase: '03',
        title: 'Custom Dashboard & Visualization UI',
        description: 'Designing and engineering high-speed custom executive interfaces with sub-second queries.',
        deliverables: ['Custom Web Dashboard', 'Role-Based Access Control', 'Interactive Visualizations'],
      },
      {
        phase: '04',
        title: 'Data Validation & Automated Testing',
        description: 'Implementing automated data quality tests to ensure reporting accuracy.',
        deliverables: ['Data Quality Test Suite', 'Validation Benchmarks', 'Anomaly Alert Rules'],
      },
      {
        phase: '05',
        title: 'Launch & Team Enablement',
        description: 'Deploying dashboard to leadership teams and training analysts on data models.',
        deliverables: ['Production System', 'Data Dictionary Documentation', 'Admin Training'],
      },
    ],
    outcomes: [
      { label: 'Report Latency', value: '< 1s', description: 'Sub-second query performance replacing hours of manual spreadsheet compilation' },
      { label: 'Data Single Source', value: '100%', description: 'Unified data definitions agreed across engineering, finance, and marketing' },
      { label: 'Decision Velocity', value: 'Real-Time', description: 'Live operational insights replacing retrospective monthly reviews' },
    ],
    targetAudience: {
      businessTypes: ['Multi-Location Businesses', 'SaaS & Subscription Platforms', 'FinTech & Wealth Management'],
      teams: ['Chief Executive Officers', 'Chief Financial Officers', 'Head of Business Intelligence'],
      useCases: ['Executive Financial Cockpit', 'Cohort Retention & Churn Analytics', 'Operational Supply Chain Monitoring'],
    },
    engagementModels: [
      {
        title: 'Data Architecture Blueprint',
        duration: '2 Weeks',
        description: 'Mapping current data silos, defining KPIs, and architecting the data pipeline roadmap.',
        bestFor: 'Organizations planning modern data stack investments.',
      },
      {
        title: 'Full Pipeline & Custom Dashboard Sprint',
        duration: '6 to 10 Weeks',
        description: 'End-to-end data pipeline build, warehouse modeling, and bespoke executive web portal.',
        bestFor: 'Companies needing immediate actionable clarity over company performance.',
      },
    ],
    faqs: [
      {
        question: 'Why build a custom dashboard instead of using off-the-shelf PowerBI or Tableau?',
        answer: 'Custom Next.js dashboards offer tailored UX, embed directly into your internal tools, load in sub-seconds on mobile devices, eliminate per-seat licensing costs, and match your brand aesthetic.',
      },
      {
        question: 'How do you keep analytics queries from slowing down our live application?',
        answer: 'We separate transactional databases from analytical stores using read-replicas, change data capture (CDC), and columnar warehouses like ClickHouse or BigQuery.',
      },
    ],
    useCases: [
      {
        title: 'Multi-Tenant SaaS Unit Economics Dashboard',
        scenario: 'SaaS company needing real-time customer acquisition cost, LTV, and net revenue retention tracking.',
        resolution: 'Engineered automated pipeline pulling from Stripe, Segment, and PostgreSQL into a unified dashboard.',
      },
    ],
    servicesIncluded: ['Custom Software Development', 'Cloud Infrastructure & DevOps', 'AI & Automation'],
    relatedSolutionSlugs: ['connected-systems-api-integration', 'operational-automation', 'b2b-portals-workflow-platforms'],
  },
  {
    slug: 'cloud-engineering-reliability',
    title: 'Cloud Engineering & Platform Reliability',
    kicker: 'INFRASTRUCTURE & SRE',
    category: 'Architecture & Engineering',
    headline: 'High-availability infrastructure, automated CI/CD, and rock-solid cloud scalability.',
    summary: 'We architect resilient cloud foundations across AWS, GCP, and Azure using Infrastructure as Code (Terraform), Kubernetes, and automated deployment pipelines engineered for 99.99% availability.',
    problemStatement: 'Manual server management, slow deployment pipelines, and unmonitored infrastructure lead to costly outages, security vulnerabilities, and unpredictable cloud bills.',
    challengeDetails: [
      {
        title: 'Frequent Outages & Single Points of Failure',
        description: 'Infrastructure failing during traffic surges due to unconfigured auto-scaling and database connection limits.',
      },
      {
        title: 'Manual, High-Risk Deployment Processes',
        description: 'Deployment releases that require late-night maintenance windows and rollback panic.',
      },
      {
        title: 'Unchecked Cloud Infrastructure Costs',
        description: 'Forgotten cloud instances, unoptimized egress traffic, and oversized databases driving up monthly bills.',
      },
    ],
    capabilities: [
      { title: 'Infrastructure as Code (Terraform / Pulumi)', description: 'Version-controlled, reproducible cloud environments with zero manual drift.' },
      { title: 'Containerization & Kubernetes (EKS/GKE)', description: 'Orchestrated container workloads with automated self-healing and zero-downtime rolling updates.' },
      { title: 'Automated CI/CD Delivery Pipelines', description: 'GitHub Actions pipelines with automated test suites, linting, and security vulnerability scans.' },
      { title: 'Observability, Logging & SRE Telemetry', description: 'Datadog, Prometheus, Grafana, and OpenTelemetry setup with actionable alert thresholds.' },
    ],
    scopeBoundaries: [
      'Focuses on cloud infrastructure architecture, DevOps automation, and platform reliability engineering.',
      'Cloud provider hosting fees (AWS/GCP/Azure) are billed directly to your corporate cloud accounts.',
    ],
    approach: 'We apply site reliability engineering principles: immutable infrastructure, automated canary deployments, multi-zone redundancy, and proactive observability.',
    phases: [
      {
        phase: '01',
        title: 'Infrastructure Audit & Well-Architected Review',
        description: 'Auditing security posture, single points of failure, resource utilization, and cost bottlenecks.',
        deliverables: ['Cloud Security & Reliability Audit', 'Cost Optimization Report', 'Architecture Target State'],
      },
      {
        phase: '02',
        title: 'Infrastructure as Code & Staging Scaffolding',
        description: 'Codifying all cloud resources into Terraform modules and standing up isolated staging environments.',
        deliverables: ['Terraform Repository', 'Multi-Environment VPCs', 'IAM Least-Privilege Roles'],
      },
      {
        phase: '03',
        title: 'Containerization & CI/CD Pipelines',
        description: 'Containerizing services with Docker/K8s and automating testing and preview deployments.',
        deliverables: ['Optimized Dockerfiles', 'GitHub Actions CI/CD', 'Automated Preview Environments'],
      },
      {
        phase: '04',
        title: 'Observability & Load Testing',
        description: 'Setting up centralized telemetry, error tracking (Sentry), and stress-testing system limits.',
        deliverables: ['Grafana/Datadog Dashboards', 'Alerting Playbooks', 'Load Test Resilience Report'],
      },
      {
        phase: '05',
        title: 'Production Migration & Disaster Recovery Drill',
        description: 'Executing clean production cutover with documented automated disaster recovery protocols.',
        deliverables: ['Disaster Recovery Plan (RTO/RPO)', 'Handover Training', 'Runbook Documentation'],
      },
    ],
    outcomes: [
      { label: 'Uptime Reliability', value: '99.99%', description: 'Eliminated single points of failure across multi-availability zones' },
      { label: 'Release Velocity', value: 'Minutes', description: 'Automated zero-downtime deployments replace manual maintenance windows' },
      { label: 'Infrastructure Savings', value: '25-40%', description: 'Rightsized instances and auto-scaling prevent idle compute waste' },
    ],
    targetAudience: {
      businessTypes: ['High-Traffic SaaS Companies', 'E-Commerce Retailers', 'Enterprise Product Teams'],
      teams: ['VP of Infrastructure', 'DevOps & SRE Leads', 'Chief Technology Officers'],
      useCases: ['AWS/GCP Architecture Overhaul', 'Kubernetes Migration', 'CI/CD Pipeline Automation'],
    },
    engagementModels: [
      {
        title: 'Cloud Infrastructure & SRE Audit',
        duration: '2 Weeks',
        description: 'Deep audit of security, cost waste, reliability gaps, and complete Terraform recommendations.',
        bestFor: 'Teams experiencing stability issues or surging cloud bills.',
      },
      {
        title: 'Infrastructure Modernization Sprint',
        duration: '6 to 10 Weeks',
        description: 'Complete transition to Terraform, Kubernetes, and automated zero-downtime CI/CD pipelines.',
        bestFor: 'Companies seeking enterprise-grade cloud reliability.',
      },
    ],
    faqs: [
      {
        question: 'Which cloud providers do you support?',
        answer: 'We specialize in AWS, Google Cloud Platform (GCP), Microsoft Azure, as well as modern edge platforms like Vercel and Cloudflare.',
      },
      {
        question: 'How do you prevent breaking production during an infrastructure migration?',
        answer: 'We build new infrastructure in parallel using Terraform, validate with automated tests, and migrate traffic gradually with DNS routing and instant rollback capabilities.',
      },
    ],
    useCases: [
      {
        title: 'Healthcare Platform Cloud Hardening',
        scenario: 'HIPAA-compliant healthtech platform requiring automated multi-region backup and zero-downtime updates.',
        resolution: 'Architected automated Terraform infrastructure with isolated VPCs, KMS encryption, and automated CI/CD.',
      },
    ],
    servicesIncluded: ['Cloud Infrastructure & DevOps', 'Custom Software Development'],
    relatedSolutionSlugs: ['enterprise-scale', 'application-security-quality', 'high-conversion-commerce'],
  },
  {
    slug: 'digital-experience-conversion',
    title: 'Digital Experience & Conversion Optimization',
    kicker: 'EXPERIENCE DESIGN',
    category: 'Product Engineering',
    headline: 'Editorial design craft, sub-second performance, and conversion-engineered user journeys.',
    summary: 'We combine world-class visual design, motion ergonomics, and high-performance frontend engineering to build digital web platforms that captivate audiences and drive measurable commercial conversion.',
    problemStatement: 'Generic website templates and sluggish user experiences fail to establish brand authority, driving up customer acquisition costs and causing high bounce rates.',
    challengeDetails: [
      {
        title: 'Generic, Forgettable Brand Interfaces',
        description: 'Websites that look like generic templates fail to build trust with discerning enterprise buyers.',
      },
      {
        title: 'Poor Mobile UX & High Bounce Rates',
        description: 'Clunky navigation, visual clutter, and slow mobile render speeds driving away prospective clients.',
      },
      {
        title: 'Unclear Conversion Paths',
        description: 'Complex navigation and confusing CTAs leading to low inquiry volume.',
      },
    ],
    capabilities: [
      { title: 'Bespoke Brand & UI Design Systems', description: 'Tailored typography, harmonious color palettes, and polished component libraries.' },
      { title: 'Sub-Second Frontend Engineering', description: 'Next.js App Router, SSR, and edge caching for instant page transitions.' },
      { title: 'Micro-Interactions & Framer Motion', description: 'Subtle physics-based animations that reward user interaction without hurting performance.' },
      { title: 'Accessible & WCAG 2.2 AA Compliance', description: 'Keyboard navigable, semantic markup, and high-contrast color verification.' },
    ],
    scopeBoundaries: [
      'Focuses on digital experience design, frontend web engineering, and conversion architecture.',
      'Ongoing ad spend management is coordinated through your digital marketing team.',
    ],
    approach: 'We merge agency-grade creative direction with high-performance software engineering, ensuring every interactive element is designed to convert visitors into qualified inquiries.',
    phases: [
      {
        phase: '01',
        title: 'Brand Discovery & Conversion Strategy',
        description: 'Analyzing target personas, user funnels, competitive landscape, and conversion friction points.',
        deliverables: ['Conversion Audit', 'Information Architecture Sitemap', 'Wireframe Blueprints'],
      },
      {
        phase: '02',
        title: 'Art Direction & High-Fidelity UI',
        description: 'Creating editorial moodboards, component design systems, and responsive desktop/mobile mockups.',
        deliverables: ['Figma Design System', 'Responsive UI Screens', 'Motion Guidelines'],
      },
      {
        phase: '03',
        title: 'Next.js Frontend Build & Motion',
        description: 'Engineering the website in Next.js, implementing accessible components and Framer Motion micro-interactions.',
        deliverables: ['Next.js Codebase', 'Interactive Components', 'SEO Structured Data'],
      },
      {
        phase: '04',
        title: 'Performance Optimization & QA',
        description: 'Benchmarking Core Web Vitals, cross-browser testing, accessibility audit, and form validation checks.',
        deliverables: ['Lighthouse 95+ Audit', 'Cross-Device QA Signoff', 'Accessibility Audit'],
      },
      {
        phase: '05',
        title: 'Launch & Conversion Analytics',
        description: 'Deploying to edge CDN, configuring privacy-friendly analytics, and verifying tracking goals.',
        deliverables: ['Production Release', 'Analytics Telemetry', 'Post-Launch Review'],
      },
    ],
    outcomes: [
      { label: 'Inquiry Conversion', value: '+30-60%', description: 'Significant increase in qualified project intake and form completions' },
      { label: 'Lighthouse Score', value: '95-100', description: 'Near-perfect performance, accessibility, and SEO health ratings' },
      { label: 'Average Session Time', value: '+45%', description: 'Engaging editorial design keeps enterprise buyers exploring longer' },
    ],
    targetAudience: {
      businessTypes: ['B2B Technology Agencies & SaaS', 'Premium Professional Services', 'Venture Capital & Financial Firms'],
      teams: ['Chief Marketing Officers', 'VP of Brand & Growth', 'Product Marketing Directors'],
      useCases: ['Corporate Website Redesign', 'Product Launch Experience', 'High-Converting Landing Page Ecosystem'],
    },
    engagementModels: [
      {
        title: 'Digital Experience Audit & Wireframing',
        duration: '2 Weeks',
        description: 'Comprehensive UX/UI review, conversion audit, and structured wireframe recommendations.',
        bestFor: 'Teams preparing for a major brand and website overhaul.',
      },
      {
        title: 'Full Brand Web Platform Redesign',
        duration: '6 to 10 Weeks',
        description: 'Complete UI/UX design, Next.js engineering, micro-interactions, and CMS integration.',
        bestFor: 'Companies seeking a standout, industry-leading digital presence.',
      },
    ],
    faqs: [
      {
        question: 'How do you ensure smooth animations don’t degrade website performance?',
        answer: 'We use GPU-accelerated CSS properties (transform, opacity) via Framer Motion, avoid heavy script bundles, lazy-load offscreen media, and respect user prefers-reduced-motion settings.',
      },
      {
        question: 'Do you design custom graphics and typography?',
        answer: 'Yes. We curate bespoke typographic pairings, custom SVG icons, and editorial layouts tailored specifically to your company’s brand identity.',
      },
    ],
    useCases: [
      {
        title: 'FinTech Platform Redesign',
        scenario: 'Payment engine needing a trustworthy, high-polish editorial web experience to win enterprise banking contracts.',
        resolution: 'Designed and built an ultra-fast Next.js platform with interactive 3D component showcases and clear intake funnels.',
      },
    ],
    servicesIncluded: ['Custom Software Development', 'Web & Ecommerce', 'Digital Experience & UI/UX'],
    relatedSolutionSlugs: ['startup-mvp', 'high-conversion-commerce', 'b2b-portals-workflow-platforms'],
  },
  {
    slug: 'application-security-quality',
    title: 'Application Security & Engineering Quality',
    kicker: 'SECURITY & HARDENING',
    category: 'Architecture & Engineering',
    headline: 'Proactive vulnerability assessments, automated testing suites, and hardened codebases.',
    summary: 'We fortify application security posture, eliminate vulnerabilities across dependency trees, implement automated test suites, and prepare codebases for SOC 2 and ISO 27001 compliance.',
    problemStatement: 'Fast-moving development teams frequently accumulate security technical debt, unpatched dependencies, and inadequate automated test coverage, creating high vulnerability risks.',
    challengeDetails: [
      {
        title: 'Undetected Code & Dependency Vulnerabilities',
        description: 'Outdated open-source packages and unvetted libraries exposing software to supply-chain attacks.',
      },
      {
        title: 'Inadequate Test Coverage & Regression Fears',
        description: 'Lack of automated end-to-end testing leading to production bugs during routine releases.',
      },
      {
        title: 'Enterprise Procurement Roadblocks',
        description: 'Inability to pass enterprise vendor security questionnaires and SOC 2 audits.',
      },
    ],
    capabilities: [
      { title: 'Static & Dynamic Code Analysis (SAST/DAST)', description: 'Automated code scanning embedded directly into CI/CD workflows.' },
      { title: 'Automated E2E & Integration Testing', description: 'Comprehensive Playwright and Jest test suites covering critical user flows.' },
      { title: 'Authentication Hardening & RBAC', description: 'Multi-factor authentication (MFA), secure session management, and granular permission models.' },
      { title: 'SOC 2 & Compliance Remediation', description: 'Audit logging, data encryption at rest/in transit, and infrastructure hardening.' },
    ],
    scopeBoundaries: [
      'Focuses on application-layer security, automated testing, and secure engineering practices.',
      'Formal third-party compliance certification is issued by your accredited auditing firm.',
    ],
    approach: 'We integrate security directly into the developer workflow (DevSecOps), shifting testing left and establishing automated safeguards at every build step.',
    phases: [
      {
        phase: '01',
        title: 'Security & Code Quality Audit',
        description: 'Comprehensive code review, dependency vulnerability audit, and OWASP Top 10 assessment.',
        deliverables: ['Vulnerability Assessment Report', 'Code Quality Matrix', 'Remediation Roadmap'],
      },
      {
        phase: '02',
        title: 'Vulnerability Remediation & Dependency Upgrades',
        description: 'Patching high-severity vulnerabilities, updating packages, and replacing risky dependencies.',
        deliverables: ['Remediated Codebase', 'Dependency Lockfile Updates', 'Security Verification Tests'],
      },
      {
        phase: '03',
        title: 'Automated Testing Suite Build',
        description: 'Writing unit, integration, and Playwright end-to-end test suites for critical user journeys.',
        deliverables: ['E2E Test Suite (Playwright)', 'Unit Test Coverage (>80%)', 'Mock Service Workers'],
      },
      {
        phase: '04',
        title: 'CI/CD Security Gateways & SAST Scanners',
        description: 'Embedding automated vulnerability scanners (SonarQube, Snyk) into GitHub Actions.',
        deliverables: ['Automated Security Gateways', 'Branch Protection Rules', 'Secret Scanning'],
      },
      {
        phase: '05',
        title: 'Security Runbook & Team Training',
        description: 'Documenting security procedures, incident response runbooks, and developer guidelines.',
        deliverables: ['Security Runbook', 'SOC 2 Evidence Package', 'Staff Security Training'],
      },
    ],
    outcomes: [
      { label: 'Vulnerability Reduction', value: 'Zero High/Crit', description: 'Elimination of all critical and high-severity OWASP vulnerabilities' },
      { label: 'Automated Test Coverage', value: '80%+', description: 'Comprehensive regression safety across all core business journeys' },
      { label: 'Procurement Velocity', value: '3x Faster', description: 'Pass enterprise customer security reviews without delays' },
    ],
    targetAudience: {
      businessTypes: ['B2B SaaS Companies selling to Enterprise', 'FinTech & InsurTech Platforms', 'Healthcare Software'],
      teams: ['Chief Information Security Officers', 'VP of Engineering', 'Compliance Leads'],
      useCases: ['SOC 2 Compliance Prep', 'Pre-Acquisition Technical Due Diligence', 'Post-Breach Code Hardening'],
    },
    engagementModels: [
      {
        title: 'Application Security & Quality Audit',
        duration: '2 Weeks',
        description: 'In-depth code scan, dependency audit, and prioritized security remediation blueprint.',
        bestFor: 'Companies preparing for a security audit or funding round.',
      },
      {
        title: 'Code Hardening & Testing Sprint',
        duration: '4 to 8 Weeks',
        description: 'Hands-on remediation of vulnerabilities and end-to-end automated test implementation.',
        bestFor: 'Teams needing immediate technical hardening before enterprise sales.',
      },
    ],
    faqs: [
      {
        question: 'Does this help us achieve SOC 2 Type II certification?',
        answer: 'Yes. We implement the technical controls required for SOC 2 (MFA, audit logging, least-privilege IAM, encryption at rest, automated testing, and CI/CD controls).',
      },
    ],
    useCases: [
      {
        title: 'Enterprise FinTech Security Hardening',
        scenario: 'Payment processor needing rigorous automated testing and encryption hardening to pass tier-1 bank vendor reviews.',
        resolution: 'Implemented full Playwright test suite, automated SAST scanners in CI/CD, and zero-trust IAM policies.',
      },
    ],
    servicesIncluded: ['Custom Software Development', 'Cloud Infrastructure & DevOps'],
    relatedSolutionSlugs: ['enterprise-scale', 'cloud-engineering-reliability', 'connected-systems-api-integration'],
  },
  {
    slug: 'b2b-portals-workflow-platforms',
    title: 'B2B Portals & Workflow Platforms',
    kicker: 'WORKFLOW PLATFORMS',
    category: 'Product Engineering',
    headline: 'Custom partner portals, approval engines, and digitized B2B business operations.',
    summary: 'We build bespoke B2B customer portals, partner management interfaces, and internal operational software that digitize complex multi-step approvals and eliminate email chains.',
    problemStatement: 'B2B enterprises lose valuable time managing high-value transactions, wholesale orders, and vendor approvals through chaotic email threads and paper forms.',
    challengeDetails: [
      {
        title: 'Chaotic Email & Spreadsheet Approval Chains',
        description: 'High-value partner contracts and purchase orders delayed by manual back-and-forth communication.',
      },
      {
        title: 'Lack of Self-Service for Wholesale Customers',
        description: 'B2B buyers unable to check order status, download invoices, or submit support tickets independently.',
      },
      {
        title: 'Complex Multi-Tier Role Permissions',
        description: 'Difficulty managing granular access controls across internal departments, external vendors, and clients.',
      },
    ],
    capabilities: [
      { title: 'Granular Role-Based Access Control (RBAC)', description: 'Multi-tenant permissions for admins, managers, external partners, and auditors.' },
      { title: 'Multi-Step Approval Workflows', description: 'Configurable approval stages with automated email and Slack notifications.' },
      { title: 'Self-Service Document & Invoice Vault', description: 'Secure storage, e-signature integration, and instant invoice downloads.' },
      { title: 'ERP & Billing Data Integration', description: 'Live sync with NetSuite, QuickBooks, Stripe Billing, and custom databases.' },
    ],
    scopeBoundaries: [
      'Focuses on custom web portal development, workflow orchestration, and user management.',
      'Physical business operations are executed by your internal personnel.',
    ],
    approach: 'We design intuitive, high-speed custom portal applications that mirror your exact business processes while providing enterprise-grade security.',
    phases: [
      {
        phase: '01',
        title: 'Workflow Mapping & Stakeholder Interviews',
        description: 'Mapping current manual approval chains, user roles, document flows, and integration requirements.',
        deliverables: ['Workflow Journey Map', 'Role Permission Matrix', 'Technical Requirements Document'],
      },
      {
        phase: '02',
        title: 'Portal UX/UI Design & Interactive Prototype',
        description: 'Designing intuitive dashboards, approval queues, and document vaults in Figma.',
        deliverables: ['Figma Design System', 'Interactive Portal Prototype', 'Component Library'],
      },
      {
        phase: '03',
        title: 'Full-Stack Portal & RBAC Engineering',
        description: 'Developing secure Next.js portal application, database models, and authentication services.',
        deliverables: ['Next.js Portal Codebase', 'RBAC Permission Engine', 'API Integration Services'],
      },
      {
        phase: '04',
        title: 'Approval Logic & Notification Triggers',
        description: 'Configuring multi-step approval rules, email triggers, and webhook integrations.',
        deliverables: ['Approval Engine', 'Notification System', 'Audit Trail Logging'],
      },
      {
        phase: '05',
        title: 'Pilot Launch & User Training',
        description: 'Deploying portal to pilot partner group and conducting administrator onboarding.',
        deliverables: ['Production Deployment', 'User Onboarding Guides', 'Admin Playbooks'],
      },
    ],
    outcomes: [
      { label: 'Approval Cycle Speed', value: '80% Faster', description: 'From 5-day email delays to same-day automated approvals' },
      { label: 'Self-Service Adoption', value: '90%+', description: 'Partners and clients access invoices and status without calling support' },
      { label: 'Audit Compliance', value: '100%', description: 'Immutable digital logs of every document approval and state transition' },
    ],
    targetAudience: {
      businessTypes: ['B2B Wholesale & Manufacturing', 'Franchise Networks', 'Professional Services & Consulting Firms'],
      teams: ['Chief Operating Officers', 'VP of Customer Success', 'Head of Partner Operations'],
      useCases: ['Customer Self-Service Account Portal', 'Vendor Onboarding & Compliance Platform', 'Internal Capital Expenditure Approval App'],
    },
    engagementModels: [
      {
        title: 'Portal Discovery & Wireframing',
        duration: '2 to 3 Weeks',
        description: 'Complete workflow analysis, role mapping, and interactive UX prototype.',
        bestFor: 'Organizations validating requirements with partners before full development.',
      },
      {
        title: 'Custom Portal Production Build',
        duration: '8 to 12 Weeks',
        description: 'End-to-end design, full-stack engineering, ERP integration, and production launch.',
        bestFor: 'Companies ready to launch a dedicated self-service workflow platform.',
      },
    ],
    faqs: [
      {
        question: 'Can external partners log in with Single Sign-On (SSO)?',
        answer: 'Yes. We support SAML 2.0, Okta, Microsoft Azure AD, Google Workspace SSO, as well as magic link passwordless authentication.',
      },
      {
        question: 'How do you handle audit logging for regulatory compliance?',
        answer: 'Every action (login, document view, approval, rejection, comment) is written to an immutable audit trail with timestamp, user ID, and IP metadata.',
      },
    ],
    useCases: [
      {
        title: 'Global Franchise Operations Portal',
        scenario: 'Franchise network managing 150+ locations using disparate spreadsheets for quarterly supply ordering.',
        resolution: 'Built centralized ordering and approval portal connected directly to NetSuite and automated shipping feeds.',
      },
    ],
    servicesIncluded: ['Custom Software Development', 'SaaS & Digital Products', 'Cloud Infrastructure & DevOps'],
    relatedSolutionSlugs: ['connected-systems-api-integration', 'operational-automation', 'data-intelligence-decision-systems'],
  },
];

export const SOLUTIONS = solutionsData;

export function getSolutionBySlug(slug: string): SolutionDetail | undefined {
  return solutionsData.find((s) => s.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return solutionsData.map((s) => s.slug);
}
