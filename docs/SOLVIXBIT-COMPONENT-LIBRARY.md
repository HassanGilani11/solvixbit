# SOLVIXBIT — COMPONENT LIBRARY CATALOG
## Reusable UI, Layout, Typography & Animation Components

**System Version:** 1.0.0  
**Phase:** 08 — Reusable Design & Animation System  
**Framework:** Next.js (App Router), React 19, TypeScript, GSAP, Tailwind / CSS Tokens  
**Approved Brand Palette:** `#598BFF` (Blue) • `#02C415` (Green) • `#EFEFEF` (Light Grey) • `#000000` (Black) • `#FFFFFF` (White)  
**Status:** Production-Ready  

---

## 1. Architecture & Import Overview

All components in the SOLVIXBIT Component Library are exported through the central barrel export:

```typescript
import {
  // Layout
  Container,
  Section,
  Grid,
  Stack,

  // Typography
  Display,
  Heading,
  Text,
  Eyebrow,
  SectionHeading,

  // Actions
  Button,
  ButtonGroup,
  Link,

  // Content & Cards
  Badge,
  Card,
  GlassPanel,
  ServiceCard,
  SolutionCard,
  CaseStudyCard,
  ProjectShowcase,
  ArticleCard,
  Testimonial,
  CTASection,

  // Motion & Animation
  ScrollSectionReveal,
  TextSplitReveal,
  ImageMaskReveal,
  Reveal,
  FadeUp,
  ScaleIn,

  // Navigation
  Navbar,
  Footer,
} from '@/components';
```

---

## 2. Layout Components

### 2.1 `Container`
Constrains content to approved layout widths with responsive gutters.

```typescript
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType; // default: 'div'
  className?: string;
}
```
**Example:**
```tsx
<Container>
  <SectionHeading title="Engineering Disciplines" />
</Container>
```

### 2.2 `Section`
Establishes vertical section rhythm with semantic `<section>` element.

```typescript
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: React.ElementType; // default: 'section'
  id?: string;
  className?: string; // use 'sb-section-dark' or 'sb-section-grey' for alternating themes
}
```

### 2.3 `Grid` & `Stack`
Responsive flexbox and grid abstractions.

```tsx
<Grid cols={3} gap="8">
  <ServiceCard ... />
  <ServiceCard ... />
  <ServiceCard ... />
</Grid>

<Stack direction="horizontal" gap="4" align="center">
  <Button variant="primary">Start a Project</Button>
  <Button variant="secondary">Explore Our Work</Button>
</Stack>
```

---

## 3. Typography & Heading Components

### 3.1 `Eyebrow`
Tactical section label with optional pulsing radar beacon.

```typescript
export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'badge' | 'beacon' | 'subtle'; // default: 'beacon'
  color?: 'blue' | 'green' | 'dark' | 'white'; // default: 'blue'
  className?: string;
}
```
**Example:**
```tsx
<Eyebrow variant="beacon" color="blue">
  CREATIVE TECHNOLOGY & DIGITAL ENGINEERING
</Eyebrow>

<Eyebrow variant="subtle" color="green">
  AUTONOMOUS AGENTS & AI ORCHESTRATION
</Eyebrow>
```

### 3.2 `SectionHeading`
Unified editorial header combining eyebrow, fluid H2 title, description, and optional right-aligned CTA or tabs.

```typescript
export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  eyebrow?: React.ReactNode;
  eyebrowVariant?: 'badge' | 'beacon' | 'subtle';
  eyebrowColor?: 'blue' | 'green' | 'dark' | 'white';
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center' | 'split'; // default: 'left'
  rightElement?: React.ReactNode; // renders CTA or tabs when align="split"
  theme?: 'light' | 'dark'; // default: 'light'
  level?: 1 | 2 | 3; // default: 2
  className?: string;
}
```
**Example (Split Layout with CTA):**
```tsx
<SectionHeading
  eyebrow="SPECIALIZED CAPABILITIES"
  title="Engineered for Performance & Scale"
  description="We architect digital platforms capable of sustaining million-user concurrency with sub-100ms response times."
  align="split"
  rightElement={
    <Button variant="secondary" onClick={() => router.push('/services')}>
      All Services →
    </Button>
  }
/>
```

---

## 4. Action & Button Components

### 4.1 `Button`
High-contrast tactile button supporting 4 variants, 3 sizes, full-width mode, and loading state.

```typescript
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; // default: 'primary'
  size?: 'sm' | 'md' | 'lg'; // default: 'md'
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean; // displays spinner & disables clicks
  fullWidth?: boolean;
  className?: string;
}
```
**Visual Variants:**
- **Primary:** High-visibility `#598BFF` background with pure `#FFFFFF` bold typography. Hover lifts with blue glow shadow (`--shadow-glow-blue`).
- **Secondary:** Surface `#EFEFEF` background with `#000000` text. Hover lifts with crisp `#D1D5DB` border.
- **Outline:** Transparent background with fine `1px solid` border. Used on dark sections and secondary modals.
- **Ghost:** Borderless action for inline navigation and footer lists.

**Example:**
```tsx
<Button
  variant="primary"
  size="lg"
  isLoading={isSubmitting}
  iconRight={<ArrowRight size={16} />}
>
  Start a Project
</Button>
```

---

## 5. Cards & Presentation Components

### 5.1 `GlassPanel`
Backdrop-blur frosted glass surface with interactive hover physics.

```typescript
export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'hud' | 'accent'; // default: 'light'
  blur?: 'sm' | 'md' | 'lg'; // default: 'md'
  interactive?: boolean; // default: false
  className?: string;
}
```
**Example (Tactical Telemetry Panel):**
```tsx
<GlassPanel variant="hud" interactive>
  <div className="telemetry-stat">FPS: 60 // P99: 4.2ms</div>
</GlassPanel>
```

### 5.2 `ServiceCard`
Editorial discipline presentation with category pill, number indicator, and action link.

```typescript
export interface ServiceCardProps {
  title: string;
  description: string;
  category?: string;
  number?: string;
  icon?: React.ReactNode;
  tags?: string[];
  className?: string;
  onCtaClick?: () => void;
  href?: string;
}
```
**Example:**
```tsx
<ServiceCard
  number="01"
  category="ARCHITECTURE"
  title="Agentic AI & Neural Systems"
  description="Autonomous reasoning agents, multi-agent workflow pipelines, and low-latency LLM orchestration."
  tags={['LangGraph', 'Python', 'vLLM', 'Zero-Shot Logic']}
  href="/services/ai-automation"
/>
```

### 5.3 `SolutionCard`
Comprehensive solution architecture card displaying deliverables, metrics, and technical scope.

```typescript
export interface SolutionCardProps {
  title: string;
  category?: string;
  description: string;
  deliverables?: string[];
  metrics?: { value: string; label: string };
  tags?: string[];
  href?: string;
  onCtaClick?: () => void;
  className?: string;
}
```
**Example:**
```tsx
<SolutionCard
  category="COMMERCE"
  title="Global Headless Commerce Infrastructure"
  description="High-velocity headless storefronts powered by Next.js and distributed microservices."
  deliverables={[
    'Custom Shopify Plus / Medusa backend integration',
    'Edge-cached multi-currency checkout',
    'Real-time ERP & inventory synchronization',
  ]}
  metrics={{ value: '15k', label: 'Orders / Minute Capacity' }}
  tags={['Next.js', 'Shopify Plus', 'GraphQL', 'Edge CDN']}
  href="/solutions/headless-commerce"
/>
```

### 5.4 `CaseStudyCard` / `ProjectShowcase`
High-impact portfolio showcase card with image preview, key client metric, and tags.

```typescript
export interface CaseStudyCardProps {
  title: string;
  client?: string;
  category?: string;
  metric?: string;
  metricLabel?: string;
  description: string;
  tags?: string[];
  imageUrl?: string;
  href?: string;
  featured?: boolean;
  className?: string;
}
```
**Example:**
```tsx
<ProjectShowcase
  client="Fintech Global Scale"
  category="FINTECH CORE"
  title="Real-Time Payment Routing Engine"
  metric="3.2x"
  metricLabel="Throughput Increase at 4ms P99"
  description="Architected distributed ledger and transaction reconciliation system processing $120M in monthly volume."
  imageUrl="/images/work/fintech-routing.jpg"
  tags={['Rust', 'Distributed Cloud', 'Zero-Trust', 'Kafka']}
  href="/work/fintech-payment-engine"
  featured
/>
```

### 5.5 `ArticleCard`
Editorial blog and engineering insight card with metadata, author badge, and hover zoom.

```typescript
export interface ArticleCardProps {
  title: string;
  excerpt: string;
  category?: string;
  readTime?: string;
  date?: string;
  slug: string;
  imageUrl?: string;
  author?: { name: string; avatarUrl?: string };
  className?: string;
}
```
**Example:**
```tsx
<ArticleCard
  category="ENGINEERING PERSPECTIVE"
  date="Nov 2026"
  readTime="6 min read"
  title="Why Monolithic E-Commerce Fails at Scale"
  excerpt="An architectural teardown of headless transitions, checkout latency, and distributed edge caching."
  slug="why-monolithic-ecommerce-fails"
  imageUrl="/images/insights/headless-breakdown.jpg"
  author={{ name: 'Yasir Noor', avatarUrl: '/avatars/yasir.jpg' }}
/>
```

### 5.6 `CTASection`
Full closing call-to-action section with dual buttons and project inquiry modal support.

```typescript
export interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  supporting?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  onStartProjectClick?: () => void;
  theme?: 'light' | 'dark'; // default: 'dark'
  className?: string;
}
```
**Example:**
```tsx
<CTASection
  eyebrow="READY TO BUILD?"
  title="Have a technical challenge in mind?"
  supporting="Direct Senior Partner Access • Production-Ready Systems"
  description="Speak directly with our engineering leadership to scope your system architecture."
  onStartProjectClick={() => setIsModalOpen(true)}
/>
```

---

## 6. Animation & Motion Components

All animation components include automatic `@media (prefers-reduced-motion: reduce)` guards and perform clean GSAP lifecycle teardowns (`context.revert()`).

### 6.1 `ScrollSectionReveal`
ScrollTrigger-driven entrance with stagger support.

```tsx
<ScrollSectionReveal animation="fade-up" staggerInterval={0.12}>
  <div className="card">01</div>
  <div className="card">02</div>
  <div className="card">03</div>
</ScrollSectionReveal>
```

### 6.2 `TextSplitReveal`
Word-by-word headline entrance with brand color word highlighting.

```tsx
<TextSplitReveal
  as="h2"
  text="Big ideas deserve better engineering."
  highlightWords={['better', 'engineering']}
  highlightColor="var(--color-primary-blue)"
/>
```

### 6.3 `ImageMaskReveal`
Editorial clip-path reveal for images and media cards.

```tsx
<ImageMaskReveal direction="clip">
  <img src="/project.jpg" alt="Architecture Diagram" />
</ImageMaskReveal>
```

---

## 7. Subpage Construction Templates

### 7.1 Creating a New Service Page (`/services/[slug]`)
```tsx
import {
  Container,
  Section,
  SectionHeading,
  Grid,
  Button,
  CTASection,
  TextSplitReveal,
} from '@/components';

export default function ServiceSubpage() {
  return (
    <main>
      <Section className="py-20">
        <Container>
          <TextSplitReveal as="h1" text="Scalable SaaS Architecture" />
          <p className="lead-paragraph">...</p>
        </Container>
      </Section>

      <Section className="sb-section-grey py-24">
        <Container>
          <SectionHeading
            eyebrow="CORE DELIVERABLES"
            title="What We Engineer"
            description="Production-grade foundations designed for 10M+ daily active users."
          />
          <Grid cols={3} gap="8">
            {/* Deliverable Cards */}
          </Grid>
        </Container>
      </Section>

      <CTASection />
    </main>
  );
}
```

