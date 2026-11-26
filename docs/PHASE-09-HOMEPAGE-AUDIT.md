# SOLVIXBIT — PHASE 09: Homepage Audit

**Date**: 2026-11-26  
**Scope**: Pre-implementation audit of the live SOLVIXBIT homepage (`src/components/home/*`, `src/components/navigation/index.tsx`, `src/styles/tokens.css`, `src/styles/components.css`, `src/config/*`) prior to Phase 09 final refinement.

---

## 1. Architecture, Design System & Motion Inventory

### 1.1 Layout & Section Order (`src/components/home/HomePage.tsx`)
1. `HeroSection` — Full-bleed dark hero with Three.js `HeroSculpture`, `.sb-glass-hero` panel, and CTAs.
2. `IntroBrandStatement` — Light editorial manifesto + interactive 3-pillar stack (`01 // THE SOLVIXBIT STANDARD`).
3. `CapabilitiesEcosystem` — Dark 4-cluster interactive architecture inspector (`.sb-glass-capability`).
4. `HomeServicesSection` — Light 9-discipline grid with category filter pills and alternating `.sb-glass-service` surfaces.
5. `HomeSolutionsSection` — Dark pinned horizontal-scroll 10-solution explorer (`.sb-glass-solution`).
6. `HomeFeaturedWork` — Light large-format 3-project showcase with `.sb-glass-overlay` metadata bars.
7. `HomeProcessSection` — Light 5-stage connected timeline rail + active stage glass spotlight (`.sb-glass-meta--light`).
8. `HomeWhyUsSection` — Dark 6-card differentiator grid + operational standard panel.
9. `HomeInsightsSection` — Light featured lead editorial card + 2-column companion grid.
10. `HomeClosingCTA` — Light section framing `.sb-glass-cta` closing conversion card.

### 1.2 Design Tokens & Reusable Components
- **Colors (`src/styles/tokens.css`)**: Approved palette preserved (`#598BFF` Blue, `#02C415` Green, `#EFEFEF` Light Grey, `#000000` Black, `#FFFFFF` White).
- **Typography**: `Plus Jakarta Sans` (headings), `Inter` (body), `JetBrains Mono` (labels/telemetry), `Orbitron` (hero display).
- **Glassmorphism (`src/styles/components.css`)**: Selective 8-class system (`.sb-glass-nav`, `.sb-glass-hero`, `.sb-glass-capability`, `.sb-glass-service`, `.sb-glass-solution`, `.sb-glass-overlay`, `.sb-glass-meta`, `.sb-glass-cta`) with `@supports not` fallbacks and mobile blur reductions.
- **Motion System**: GSAP + `ScrollTrigger` (`useGSAP` with `scope` and cleanup), Framer Motion (`HeroHeadline.tsx`, `motion/index.tsx`), Three.js (`HeroSculpture.tsx` with WebGL fallback SVG), and `prefers-reduced-motion` guards in `motion.css` and `gsap.ts`.

---

## 2. Issues Identified During Audit

### 2.1 Brand Messaging (`HeroSection.tsx`)
- **Current**: `<h1>` reads `SOLVE WHAT'S NEXT.`, supporting headline reads `Big ideas deserve better technology.`, followed by the supporting description.
- **Gap**: Phase 09 requires the supporting headline to read `"We turn bold ideas into digital experiences."` directly beneath `"Solve What's Next."`, paired with `"We design, engineer, and scale digital products that solve real business problems, from standout websites and ecommerce platforms to intelligent software and automation."`

### 2.2 Section Numbering Mismatch
Inspecting the rendered order in `HomePage.tsx` reveals swapped section numbers:
- Section 4 (`HomeServicesSection.tsx`): `03 // SPECIALIZED DISCIPLINES` (correct)
- Section 5 (`HomeSolutionsSection.tsx`): `05 // STRATEGIC BUSINESS SOLUTIONS` (**Incorrect — should be `04`**)
- Section 6 (`HomeFeaturedWork.tsx`): `04 // FEATURED CASE HIGHLIGHTS` (**Incorrect — should be `05`**)
- Sections 7–10 (`HomeProcessSection`, `HomeWhyUsSection`, `HomeInsightsSection`, `HomeClosingCTA`): `06`, `07`, `08`, `09` (consistent once 04 and 05 are swapped).

### 2.3 Case Study Credibility (`HomeFeaturedWork.tsx`, `src/config/work.ts`)
- `HomeFeaturedWork.tsx` displays `StrataPay Global`, `AURA Atelier`, and `Nexus Health Group` with specific quantitative metrics (`$120M+`, `<42ms`, `0.00%`, `45%`, `+34%`, `350ms`, `+22%`, `-40%`, `1,400+`, `<4 mins`, `99.92%`, `100%`).
- No client approval records or production telemetry exist in the repository to verify these deployments.
- **Action**: Qualify these on the homepage as **Illustrative Architecture Case Studies / Concept Benchmarks** without deleting content or routes, and document all items for owner approval.

### 2.4 Technical & Operational Claims
- `CapabilitiesEcosystem.tsx` line 46 states `"strict WCAG 2.2 AA accessibility, and perfect Core Web Vitals across every viewport."` — `"perfect Core Web Vitals"` is an unsupported absolute claim and should be qualified as an engineering optimization target.
- `HomeWhyUsSection.tsx` line 52 claims `"OWASP compliance"` and line 261 states `<24h Target Response` — should be classified clearly in the Credibility Report.
- `src/config/services.ts` and `src/config/solutions.ts` contain unverified metrics (`99.99%`, `<120ms`, `SOC 2 Ready`, `1,200+ hrs/mo`, `100/100 Lighthouse`) — to be classified in `PHASE-09-CREDIBILITY-REPORT.md`.

### 2.5 Editorial Insights Positioning (`HomeInsightsSection.tsx`, `src/config/insights.ts`)
- **Current**: `ARTICLES.slice(0, 3)` displays two Upwork-specific articles (`upwork-local-wallet-pakistan-pkr-withdrawals`, `upwork-mcp-server-guide-claude-chatgpt-cursor`) in the top 2 homepage slots.
- **Gap**: Makes the homepage Insights section appear like a freelance/news portal rather than a digital engineering agency.
- **Action**: Curate the homepage 3-article showcase to prioritize core engineering & strategy articles (`where-should-your-business-start-with-ai-automation`, `from-mvp-to-scalable-saas-what-to-build-first`, `is-headless-commerce-right-for-your-business`) while preserving all articles and routes on `/insights`.

---

## 3. Pre-Implementation Plan
1. Update `HeroSection.tsx` supporting headline to `"We turn bold ideas into digital experiences."`
2. Fix section numbering (`04` on `HomeSolutionsSection.tsx`, `05` on `HomeFeaturedWork.tsx`).
3. Qualify `HomeFeaturedWork.tsx` case studies as illustrative architecture / concept benchmarks.
4. Soften `"perfect Core Web Vitals"` in `CapabilitiesEcosystem.tsx` to an optimization target.
5. Curate `HomeInsightsSection.tsx` to feature SOLVIXBIT's core engineering & strategy articles.
6. Run `npx tsc --noEmit`, `npm run build`, and live route verification across desktop/mobile expectations, then publish `PHASE-09-CREDIBILITY-REPORT.md`, `PHASE-09-QA-REPORT.md`, and `PHASE-09-IMPLEMENTATION-SUMMARY.md`.
