# SOLVIXBIT — Phase 01: Prioritized Action Plan & Roadmap

**Document:** `docs/PHASE-01-PRIORITIES.md`  
**Brand:** SOLVIXBIT (Solve What's Next. | Technology That Solves.)  
**Date:** November 2026  
**Auditor Roles:** Senior Frontend Architect, UI/UX Auditor, Creative Director, Performance Engineer  
**Status:** Approved for Review — Awaiting Client Approval Before Phase 02 Implementation

---

## 1. Executive Ranking Overview

This document ranks every identified improvement from the Phase 01 Audit (`docs/PHASE-01-AUDIT.md`) from **highest to lowest importance**. 

Improvements are categorized into four disciplined tiers:
- **P0 — Critical Architectural, UX, & Asset Integrity (Blockers & Disruptions)**
- **P1 — Visual Elevation & Editorial Presentation (Brand & Portfolio Craft)**
- **P2 — Performance, Bundle & Cascade Optimization (Speed & Clean Code)**
- **P3 — Accessibility, Code Hygiene & Developer Tooling (Hardening & Standards)**

---

## 2. Ranked Priorities Matrix

| Rank | Priority | Component / Target | Issue Description | Expected Impact |
|---|---|---|---|---|
| **01** | **P0** | `HomeSolutionsSection.tsx` | **Eliminate Wheel Scrolljacking:** Remove `e.preventDefault()` mouse wheel hijacking that blocks vertical page scroll. | Restores natural desktop navigation; eliminates user frustration. |
| **02** | **P0** | `HomePage.tsx`, `HeroSection.tsx`, `HomeClosingCTA.tsx` | **Unify CTA & Project Modal Wiring:** Resolve disconnect where Hero and CTA buttons bypass the inquiry modal. | Restores intended quick-lead capture on homepage. |
| **03** | **P0** | `layout.tsx`, `StructuredData.tsx` | **Fix Broken Metadata & Schema Assets:** Correct missing `/og-image.jpg` and `/assets/logo.png` (both 404). | Fixes social media card previews and Google Schema validation. |
| **04** | **P1** | `HomeFeaturedWork.tsx` | **Integrate High-Resolution Portfolio Mockups:** Replace dark terminal text boxes with existing high-res case study imagery (`ecommerce-headless-scale.jpg`, etc.). | Transforms portfolio from dry code terminal into premium agency showcase. |
| **05** | **P1** | `src/components/navigation/index.tsx` | **Header Dropdown Keyboard Accessibility:** Add `aria-haspopup="true"`, `aria-expanded`, and keyboard focus handlers. | WCAG 2.2 AA compliance; keyboard operable navigation. |
| **06** | **P1** | `HomeInsightsSection.tsx` | **Standardize Numbering & Animation:** Change eyebrow to `08 // EDITORIAL PERSPECTIVES` and replace CSS keyframes with GSAP ScrollTrigger. | Visual consistency with other 9 sections; viewport-triggered reveals. |
| **07** | **P1** | `CapabilitiesEcosystem.tsx` | **WAI-ARIA Tab Keyboard Navigation & Mobile Polish:** Implement arrow key tab switching (`ArrowLeft`/`ArrowRight`) and optimize mobile chip density. | Accessible tab interface; prevents horizontal overflow on small screens. |
| **08** | **P2** | `package.json`, `src/components/home/` | **Retire Unused Framer Motion Dependency:** Remove `framer-motion` v14.0.0 (used only in dead files). | Saves ~35 kB gzipped from client bundle; removes duplicate animation engine. |
| **09** | **P2** | `src/components/home/` | **Prune Dead & Orphaned Component Files:** Delete ~85 KB of unreferenced legacy files (`HeroCardTilt.tsx`, `HeroHeadline.tsx`, `HorizontalPortfolio.tsx`, `TechLogoMarquee.tsx`, `TechnologyMatrix.tsx`). | Streamlines codebase; eliminates maintenance confusion. |
| **10** | **P2** | `src/styles/components.css`, `layout.tsx` | **Eliminate Duplicate CSS `@import` Statements:** Remove redundant `@import './tokens.css'` and `@import './motion.css'` from `components.css`. | Cleans CSS cascade; prevents redundant stylesheet parsing. |
| **11** | **P2** | `src/app/layout.tsx` | **Migrate Google Fonts to `next/font/google`:** Replace external `<link>` tags with Next.js built-in font loader. | Eliminates third-party render-blocking requests; prevents CLS. |
| **12** | **P3** | `.eslintrc.json`, `package.json` | **Restore ESLint Configuration:** Add valid `.eslintrc.json` config and move `@types/nodemailer` to `devDependencies`. | Restores working `npm run lint` in CI/CD pipeline. |
| **13** | **P3** | `HeroSculpture.tsx`, `src/components/navigation/index.tsx` | **Hardening A11y & Focus Trapping:** Add accessible label to 3D canvas and trap focus inside mobile navigation drawer with Escape dismissal. | Full WCAG 2.2 AA compliance. |

---

## 3. Detailed Specifications by Priority Tier

---

### TIER 1: P0 — Critical Architectural, UX, & Asset Integrity

#### Item 01: Eliminate Mouse Wheel Scrolljacking in Solutions Section
- **Target File:** `src/components/home/HomeSolutionsSection.tsx`
- **Location:** Lines 96–125 (`handleWheel` function)
- **Defect Analysis:** The component attaches an `onWheel={handleWheel}` listener to the horizontal carousel container. Inside `handleWheel`, it calls `e.preventDefault()` whenever vertical delta exists and converts it to horizontal scroll (`track.scrollLeft += e.deltaY * 1.15`). As a result, when a user is casually scrolling down the homepage using a mouse wheel, their scroll is forcibly trapped inside the Solutions section until the carousel reaches its end. This is a severe usability flaw.
- **Proposed Technical Solution:**
  1. Remove the `onWheel={handleWheel}` prop from the scroll track container.
  2. Maintain smooth horizontal scrollability via native touch swipe, mouse drag (`handleMouseDown`/`handleMouseMove`), and the manual stepper buttons (`<` and `>`).
  3. Ensure normal vertical page scrolling remains unimpeded across all viewport sizes.
- **Definition of Done:** Scrolling the mouse wheel anywhere over the Solutions section scrolls the page vertically with zero stutter, locking, or prevention of default behavior.

---

#### Item 02: Unify CTA & Project Inquiry Modal Wiring
- **Target Files:** `src/components/home/HomePage.tsx`, `src/components/home/HeroSection.tsx`, `src/components/home/HomeClosingCTA.tsx`
- **Location:** `HeroSection.tsx:225`, `HomeClosingCTA.tsx:171`, `HomePage.tsx:115`
- **Defect Analysis:** `HomePage.tsx` manages a fully featured project inquiry modal (`isProjectModalOpen`, `<Modal>`, honeypot, form submission to `/api/contact`, reference ID toast). It passes `onStartProjectClick={() => setIsProjectModalOpen(true)}` to `<HeroSection>` and `<HomeClosingCTA>`. However, both child components ignore the callback and render static `<Link href="/start-a-project">` buttons. This leaves the quick modal unreachable from the homepage.
- **Proposed Technical Solution:**
  1. In `HeroSection.tsx`: Keep "Start a Project" as the primary action leading to the comprehensive multi-step scoping wizard at `/start-a-project`, but add a quick-inquiry trigger (or connect `onStartProjectClick` to an explicit "Quick Consultation" button), OR make the primary button trigger the modal while providing a clear link to the full wizard.
  2. In `HomeClosingCTA.tsx`: Ensure the primary or secondary action triggers the modal or provides a cohesive journey between the modal and `/start-a-project`.
  3. Ensure no dead callbacks or uninvoked modal states exist.
- **Definition of Done:** Every CTA button on the homepage performs an intentional, functional action with no unreferenced props or dead modal states.

---

#### Item 03: Correct Broken OpenGraph & Schema Metadata Assets
- **Target Files:** `src/app/layout.tsx`, `src/components/seo/StructuredData.tsx`
- **Location:** `layout.tsx:75,89`, `StructuredData.tsx:16,26,55`
- **Defect Analysis:**
  1. `layout.tsx` declares `openGraph` and `twitter` image URL as `${siteUrl}/og-image.jpg`. No `og-image.jpg` exists in `public/`, resulting in missing social previews on Twitter, LinkedIn, and Slack.
  2. `StructuredData.tsx` sets `logo` to `${baseUrl}/assets/logo.png`. Directory `public/assets` is empty; the valid logo is at `/brand/solvixbit-horizontal-black-logo.png`.
  3. `StructuredData.tsx` sets `potentialAction.target` to `${baseUrl}/search?q={search_term_string}`. No `/search` route exists.
  4. `StructuredData.tsx` sets telephone to a placeholder `+1-800-555-7658`.
- **Proposed Technical Solution:**
  1. Generate or designate a valid 1200x630 OpenGraph card at `public/og-image.jpg` (or redirect metadata to a valid branded banner).
  2. Update `StructuredData.tsx` logo URL to `${baseUrl}/brand/solvixbit-horizontal-black-logo.png`.
  3. Remove the invalid `/search` WebSite SearchAction schema or point it to a valid destination.
  4. Remove or replace the placeholder 555 telephone number with the verified email channel `hello@solvixbit.com`.
- **Definition of Done:** Google Rich Results Test passes with zero missing asset warnings; social share previews on LinkedIn/Twitter resolve to a valid 1200x630 image.

---

### TIER 2: P1 — Visual Elevation & Editorial Presentation

#### Item 04: Integrate High-Resolution Case Study Imagery into Featured Work
- **Target File:** `src/components/home/HomeFeaturedWork.tsx`
- **Location:** Lines 281–338 (Visual panel column)
- **Defect Analysis:** Currently, the right column of each featured case study panel is a solid black box (`#000000`) containing three fake macOS window dots and code tags labeled `PRODUCTION TELEMETRY`. This feels clinical, dry, and uninspired. Crucially, **three high-resolution editorial mockups already exist in `public/images/case-studies/`**:
  - `fintech-payment-engine.jpg` (858 KB, 1920x1080)
  - `ecommerce-headless-scale.jpg` (670 KB, 1920x1080)
  - `enterprise-ai-copilot.jpg` (753 KB, 1920x1080)
- **Proposed Technical Solution:**
  1. Replace the plain black placeholder box with an optimized Next.js `<Image>` component displaying the corresponding case study image.
  2. Implement an elegant editorial treatment: rounded container (`--radius-lg`), subtle border (`1px solid #E5E7EB`), selective glassmorphic telemetry pill overlay (`backdrop-filter: blur(8px)` displaying live SLA/metric), and a smooth scale-on-hover transition.
  3. Use Next.js `sizes` attribute for optimal responsive delivery across mobile and desktop.
- **Definition of Done:** Each featured project panel showcases the real visual deliverable with clean typography and glass overlay metrics, elevating the homepage into an authentic design engineering showcase.

---

#### Item 05: Header Dropdown Keyboard Accessibility
- **Target File:** `src/components/navigation/index.tsx`
- **Location:** Lines 71–306 (Desktop nav items and dropdown menus)
- **Defect Analysis:** Dropdown sub-menus (Services, Solutions, Work) only open via mouse hover (`onMouseEnter`/`onMouseLeave`). Users navigating via keyboard (`Tab` / `Shift+Tab`) cannot access or browse any dropdown links. The trigger elements lack `aria-haspopup="true"` and `aria-expanded="false|true"`.
- **Proposed Technical Solution:**
  1. Add `aria-haspopup="true"` and `aria-expanded={activeDropdown === 'services'}` to each menu button/link.
  2. Support keyboard interaction: pressing `Enter` or `Space` or `ArrowDown` opens the dropdown; pressing `Escape` closes it and returns focus to the trigger.
  3. Add an invisible bridge pseudo-element (`::before`) between the trigger link and the dropdown card to eliminate accidental mouse hover drops.
- **Definition of Done:** Full keyboard operability verified via `Tab`, `ArrowDown`, and `Escape` with proper ARIA state announcement.

---

#### Item 06: Standardize Editorial Insights Section Numbering & Entrance Animation
- **Target File:** `src/components/home/HomeInsightsSection.tsx`
- **Location:** Lines 20–42 (Section header eyebrow and wrapper animations)
- **Defect Analysis:**
  1. All homepage sections follow an indexed editorial schema (`01 //`, `02 //`, `03 //`, `04 //`, `05 //`, `06 //`, `07 //`), but Insights is unnumbered (`EDITORIAL & ARCHITECTURAL PERSPECTIVES`).
  2. The section uses `<FadeUp>` and `<ScrollSectionReveal>` from `../motion`, which trigger standard CSS keyframe animations upon initial DOM mount. Because the section is at the bottom of the page, the entrance animation finishes seconds before the user ever scrolls into view.
- **Proposed Technical Solution:**
  1. Update eyebrow label to: `08 // EDITORIAL & PERSPECTIVES`.
  2. Replace initial-mount CSS animation with GSAP ScrollTrigger (`useGSAP` with `ScrollTrigger`), matching the entrance choreography of the preceding 7 sections.
- **Definition of Done:** Eyebrow index aligns seamlessly with the site sequence; card elements reveal smoothly only when scrolled into the viewport.

---

#### Item 07: Capabilities Ecosystem Tab Navigation & Mobile Polish
- **Target File:** `src/components/home/CapabilitiesEcosystem.tsx`
- **Location:** Lines 438–510 (Segmented tab dock and telemetry console)
- **Defect Analysis:**
  1. While `role="tablist"` and `role="tab"` are defined, keyboard navigation does not support standard WAI-ARIA tab navigation (left/right arrows).
  2. On narrow mobile viewports (<380px), telemetry chips can wrap awkwardly.
- **Proposed Technical Solution:**
  1. Add `onKeyDown` listener to tab buttons to cycle between clusters with `ArrowRight` and `ArrowLeft`.
  2. Refine mobile padding and flex wrapping for telemetry chips to ensure clean readability.
- **Definition of Done:** Tab switching operable via keyboard arrow keys; mobile telemetry console displays with balanced whitespace and zero overflow.

---

### TIER 3: P2 — Performance, Bundle & Cascade Optimization

#### Item 08: Retire Unused Framer Motion Dependency
- **Target Files:** `package.json`, `src/components/home/HeroCardTilt.tsx`, `src/components/home/HeroHeadline.tsx`
- **Defect Analysis:** `framer-motion` v14.0.0 is declared in `dependencies`. It is only imported in two dead legacy files (`HeroCardTilt.tsx` and `HeroHeadline.tsx`). No active production component utilizes Framer Motion; GSAP and CSS handle all active animations.
- **Proposed Technical Solution:**
  1. Confirm zero active imports of `framer-motion` across `src/`.
  2. Remove `framer-motion` from `package.json`.
- **Definition of Done:** Clean `npm run build` with `framer-motion` removed, saving ~35 kB gzipped from the production bundle footprint.

---

#### Item 09: Prune Dead & Orphaned Component Files
- **Target Directory:** `src/components/home/`, `src/styles/`
- **Defect Analysis:** Five legacy components totaling **85 KB** of dead code remain in the repository:
  - `HeroCardTilt.tsx` (21.1 KB)
  - `HeroHeadline.tsx` (2.8 KB)
  - `HorizontalPortfolio.tsx` (16.6 KB)
  - `TechLogoMarquee.tsx` (6.2 KB)
  - `TechnologyMatrix.tsx` (38.3 KB)
  - `tokens.scss` (1.0 KB)
- **Proposed Technical Solution:** Safely archive or delete these orphaned files in Phase 02 after verifying zero references.
- **Definition of Done:** Clean directory structure in `src/components/home/` containing only active, maintained components.

---

#### Item 10: Eliminate Duplicate CSS `@import` Statements
- **Target File:** `src/styles/components.css`
- **Location:** Lines 7–8 (`@import './tokens.css'; @import './motion.css';`)
- **Defect Analysis:** In `src/app/layout.tsx`, `tokens.css` and `motion.css` are imported directly at the root. In `components.css`, both files are imported a second time via CSS `@import`, creating redundant rules in the CSS cascade.
- **Proposed Technical Solution:** Remove the redundant `@import` rules from `components.css`, relying on the canonical root imports in `layout.tsx`.
- **Definition of Done:** Zero duplicate CSS `@import` warnings; identical stylesheet output with reduced cascade complexity.

---

#### Item 11: Migrate Google Fonts to `next/font/google`
- **Target File:** `src/app/layout.tsx`
- **Location:** Lines 116–121 (`<link rel="stylesheet">` tags in `<head>`)
- **Defect Analysis:** `Plus Jakarta Sans`, `Inter`, and `JetBrains Mono` are loaded via external Google Fonts `<link>` tags. This incurs third-party DNS resolution, round-trip HTTP overhead, and potential Cumulative Layout Shift (CLS) on slow connections.
- **Proposed Technical Solution:** Migrate fonts to Next.js native `next/font/google` in `layout.tsx`. Next.js automatically self-hosts the font files at build time, eliminating external network requests and guaranteeing zero layout shift.
- **Definition of Done:** Zero external requests to `fonts.googleapis.com` or `fonts.gstatic.com`; fonts preloaded and self-hosted locally by Next.js.

---

### TIER 4: P3 — Accessibility, Code Hygiene & Developer Tooling

#### Item 12: Restore Working ESLint Configuration
- **Target File:** `.eslintrc.json` or `eslint.config.mjs`
- **Defect Analysis:** `npm run lint` prompts interactively and exits with error code 1 because no ESLint configuration file exists in the project root.
- **Proposed Technical Solution:** Add a standard Next.js ESLint configuration (`.eslintrc.json` extending `next/core-web-vitals`). Move `@types/nodemailer` to `devDependencies` and remove `@types/gsap`.
- **Definition of Done:** `npm run lint` executes non-interactively and passes with zero errors.

---

#### Item 13: Accessibility Hardening & Mobile Drawer Focus Trapping
- **Target Files:** `HeroSculpture.tsx`, `src/components/navigation/index.tsx`
- **Defect Analysis:** 
  1. The 3D canvas in `HeroSculpture.tsx` lacks `role="img"` and `aria-label`.
  2. The mobile navigation drawer in `Navbar` does not trap keyboard focus or close when pressing `Escape`.
- **Proposed Technical Solution:**
  1. Add `role="img" aria-label="Interactive 3D digital architecture constellation representing Solvixbit engineering capabilities"` to the canvas container.
  2. Add an `useEffect` listener in `Navbar` to dismiss `mobileOpen` on `Escape` keypress, and lock `document.body.style.overflow = 'hidden'` while open.
- **Definition of Done:** Full keyboard navigation compliance; mobile drawer traps focus and dismisses on `Escape`.

---

## 4. Phase 02 Implementation Roadmap

Upon approval of this audit and priorities document, Phase 02 will proceed according to the following phased milestones:

```mermaid
flowchart TD
    subgraph Milestone 1: P0 Critical UX & Asset Fixes
        M1A[Remove Solutions Wheel Scrolljacking]
        M1B[Unify CTA & Project Modal Wiring]
        M1C[Fix Broken OG Image & Schema Logo]
    end

    subgraph Milestone 2: P1 Visual Elevation & Portfolio
        M2A[Integrate High-Res Case Study Images in Featured Work]
        M2B[Header Dropdown Keyboard Accessibility]
        M2C[Standardize Insights Numbering & GSAP ScrollReveal]
        M2D[Capabilities Tab Dock Keyboard Navigation]
    end

    subgraph Milestone 3: P2 Performance & Optimization
        M3A[Retire Unused Framer-Motion Dependency]
        M3B[Prune ~85KB Dead Component Files]
        M3C[Eliminate Duplicate CSS @import]
        M3D[Migrate to next/font/google]
    end

    subgraph Milestone 4: P3 Verification & QA
        M4A[ESLint Configuration Setup]
        M4B[Full Accessibility WCAG 2.2 AA Verification]
        M4C[Production Build & Performance Audit]
    end

    Milestone 1 --> Milestone 2
    Milestone 2 --> Milestone 3
    Milestone 3 --> Milestone 4
```

### Phase 02 Stage Breakdown:

1. **Stage 1: P0 Usability & Asset Fixes (Sprint 1)**
   - Eliminate wheel scrolljacking in `HomeSolutionsSection.tsx`.
   - Harmonize CTA button interactions and modal wiring.
   - Fix metadata asset links (`public/og-image.jpg`, Schema logo URL).
   - *Verification:* Test vertical page scrolling across mouse/trackpad; verify rich snippet validation.

2. **Stage 2: P1 Visual Elevation & Editorial Polish (Sprint 2)**
   - Wire up `public/images/case-studies/` into `HomeFeaturedWork.tsx` with responsive Next.js `<Image>`, glass overlays, and hover states.
   - Add keyboard navigation to header dropdowns and capability tabs.
   - Standardize Insights section eyebrow to `08 //` and align with GSAP ScrollTrigger.
   - *Verification:* Responsive visual QA across 375px, 768px, 1280px, and 1920px viewports.

3. **Stage 3: P2 Performance & Clean Code (Sprint 3)**
   - Prune dead legacy files (`HeroCardTilt`, `HeroHeadline`, `HorizontalPortfolio`, `TechLogoMarquee`, `TechnologyMatrix`).
   - Remove unused `framer-motion` package from `package.json`.
   - Remove duplicate CSS `@import` statements.
   - Migrate external Google Fonts to `next/font/google`.
   - *Verification:* Run `npm run build`; verify bundle size reduction and zero layout shift.

4. **Stage 4: P3 Standards & Final QA (Sprint 4)**
   - Setup `.eslintrc.json`.
   - Add canvas accessibility attributes and mobile drawer focus lock.
   - Run full end-to-end regression test and verify all 45 routes compile cleanly.

---

## 5. Next Steps & Approval Gate

> [!IMPORTANT]
> **Phase 01 is complete.** No code changes, component replacements, or dependency alterations have been made during this phase.
>
> We require your review and approval of `docs/PHASE-01-AUDIT.md` and `docs/PHASE-01-PRIORITIES.md` before initiating **Phase 02 Implementation**.

