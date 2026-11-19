# SOLVIXBIT — DESIGN SYSTEM SPECIFICATION
## Reusable Tokens, Foundations & Architectural Standards

**System Version:** 1.0.0  
**Phase:** 08 — Reusable Design & Animation System  
**Approved Brand Palette:** `#598BFF` (Primary Blue) • `#02C415` (Secondary Green) • `#EFEFEF` (Light Grey) • `#000000` (Black) • `#FFFFFF` (White)  
**Status:** Approved & Production-Ready  

---

## 1. Executive Overview

The SOLVIXBIT Design System establishes the single source of truth for all visual tokens, typographic scales, spatial relationships, surface treatments, and motion curves across the agency web platform.

Extracted directly from the approved high-fidelity homepage redesign, this system guarantees that upcoming subpages (Services, Solutions, Portfolio Case Studies, Insights Blog, About, and Contact) maintain visual consistency, premium aesthetic restraint, and accessibility (WCAG 2.2 AA).

```
+-------------------------------------------------------------------------------+
|                         SOLVIXBIT DESIGN FOUNDATION                           |
+-------------------------------------------------------------------------------+
|  TOKENS              CSS Variables (`tokens.css`) & TypeScript (`tokens/`)    |
|  COMPONENTS          Atomic (`actions/`, `typography/`) -> Organisms (`content/`) |
|  MOTION              GSAP Power Curves & Hardware-Accelerated Transforms      |
|  ACCESSIBILITY       WCAG 2.2 AA, High-Contrast Rings, Reduced-Motion Guards  |
+-------------------------------------------------------------------------------+
```

---

## 2. Color System & Color Tokens

### 2.1 Approved Brand Colors

SOLVIXBIT's palette is strictly controlled. Arbitrary purples, cyans, or saturated magentas are forbidden.

| Token Name | Hex Code | Purpose & Semantic Role | Minimum Contrast on Dark |
| :--- | :--- | :--- | :--- |
| `primaryBlue` | `#598BFF` | Primary brand accent, primary CTA background, focus rings, link hovers | **4.9 : 1** (AA) |
| `secondaryGreen` | `#02C415` | Signal beacons, success states, secondary metric accents, live telemetry | **5.6 : 1** (AA) |
| `lightGrey` | `#EFEFEF` | Neutral section alternates, card backdrops, subtle tag surfaces | **18.2 : 1** vs Black |
| `black` | `#000000` | Dark section roots, ultra-high contrast headlines, primary dark text | **21.0 : 1** vs White |
| `white` | `#FFFFFF` | Default page background, crisp editorial panels, dark-section text | **21.0 : 1** vs Black |

### 2.2 Obsidian Deep-Stage Tokens (3D Cockpit & Dark Glass)

Used specifically for the Three.js interactive cockpit, code editors, and telemetry HUD overlays:

```css
--color-obsidian-deep: #03050E;      /* Deepest base viewport background */
--color-obsidian-base: #060A18;      /* Mid-depth cockpit canvas */
--color-obsidian-surface: #0B132B;   /* Radial glow highlight */
--color-obsidian-border: rgba(89, 139, 255, 0.28); /* Laser-etched boundary */
--color-obsidian-highlight: rgba(2, 196, 21, 0.22); /* Emerald signal reticle */
```

### 2.3 Neutral Greyscale Palette

```css
--color-neutral-white: #FFFFFF;
--color-neutral-50:    #FAFAFA;      /* Subtle card surface */
--color-neutral-100:   #EFEFEF;      /* Brand Light Grey */
--color-neutral-200:   #E5E7EB;      /* Fine borders & dividers */
--color-neutral-300:   #D1D5DB;      /* Inactive indicators & bullets */
--color-neutral-400:   #9CA3AF;      /* Low-emphasis placeholders */
--color-neutral-500:   #6B7280;      /* Metadata, timestamps, tags */
--color-neutral-600:   #4B5563;      /* Secondary body text */
--color-neutral-700:   #374151;      /* High-emphasis body copy */
--color-neutral-800:   #1F2937;      /* Dark card borders */
--color-neutral-900:   #111827;      /* Dark surface headings */
--color-neutral-black: #000000;
```

### 2.4 Semantic Status Tokens

```css
--color-semantic-success: #02C415;   /* Active nodes, online badges, validation */
--color-semantic-warning: #D97706;   /* Maintenance alerts, budget cautions */
--color-semantic-error:   #DC2626;   /* Form invalidation, network error */
--color-semantic-info:    #598BFF;   /* Informational banners, documentation */
```

---

## 3. Typography System

The typography pairs an authoritative geometric sans-serif for headlines with a highly legible humanist sans-serif for long-form editorial copy, supplemented by a monospace font for technical telemetry.

### 3.1 Font Families

- **Display & Headings:** `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif`
  - *Weights:* 700 (Bold), 800 (Extrabold)
  - *Tracking:* `-0.035em` to `-0.02em`
- **Body & Editorial:** `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
  - *Weights:* 400 (Regular), 500 (Medium), 600 (Semibold)
  - *Line Height:* 1.5 to 1.65
- **Monospace Telemetry & Code:** `'JetBrains Mono', ui-monospace, monospace`
  - *Weights:* 600 (Semibold), 700 (Bold)
  - *Tracking:* `+0.08em` to `+0.15em` (uppercase)

### 3.2 Fluid Typographic Scale

| Level | CSS Fluid Clamp / Token | Rem Equivalent | Target Usage |
| :--- | :--- | :--- | :--- |
| **Hero Display / H1** | `clamp(2.75rem, 5.5vw, 4.75rem)` | `44px – 76px` | Single homepage & landing page hero title |
| **Section H2** | `clamp(2.00rem, 3.8vw, 3.25rem)` | `32px – 52px` | Section titles across all pages |
| **Card H3** | `clamp(1.35rem, 2.2vw, 1.85rem)` | `22px – 30px` | Service, solution, and case study titles |
| **Subsection H4** | `clamp(1.15rem, 1.6vw, 1.35rem)` | `18px – 22px` | Modal subsections, metadata headers |
| **Body Large** | `clamp(1.05rem, 1.25vw, 1.2rem)` | `17px – 19px` | Lead paragraphs, hero descriptions |
| **Body Base** | `1.00rem` | `16px` | Standard descriptive copy, article prose |
| **Body Small** | `0.875rem` | `14px` | Card descriptions, form labels |
| **Eyebrow / Monospace** | `0.75rem` | `12px` | Eyebrow badges, metrics, telemetry HUD |

---

## 4. Spacing, Layout & Containers

### 4.1 8px Spatial Grid System

All margins, paddings, and component dimensions adhere to the 8px baseline grid:

```css
--space-1:  4px;    /* Micro offsets, icon padding */
--space-2:  8px;    /* Tag margins, button icon gap */
--space-3:  12px;   /* Form field internal padding */
--space-4:  16px;   /* Standard card padding */
--space-6:  24px;   /* Moderate card gutters */
--space-8:  32px;   /* Section subsection spacing */
--space-10: 40px;   /* Grid gap desktop */
--space-12: 48px;   /* Hero column gap */
--space-16: 64px;   /* Section padding (mobile) */
--space-20: 80px;   /* Section padding (tablet) */
--space-24: 96px;   /* Section padding (desktop standard) */
--space-30: 120px;  /* Section padding (desktop generous) */
--space-40: 160px;  /* Hero vertical spacing */
```

### 4.2 Standard Container Widths

```css
--container-sm:  640px;   /* Centered article / blog reading container */
--container-md:  768px;   /* Form / contact container */
--container-lg:  1024px;  /* Narrow showcase */
--container-xl:  1280px;  /* SOLVIXBIT Standard Max Container (`max-w-7xl`) */
--container-2xl: 1440px;  /* Ultra-wide boundary */
```

### 4.3 Container Gutters
- **Mobile (< 640px):** `16px` (`px-4`)
- **Tablet (640px – 1024px):** `24px` (`px-6`)
- **Desktop (≥ 1024px):** `32px` (`px-8` to `px-12`)

---

## 5. Grid Architectures

The SOLVIXBIT layout eschews repetitive 3-card grids in favor of distinctive, high-hierarchy compositions:

1. **12-Column Flexible Grid:**
   - Standard 12-column layout for diverse editorial arrangements: `display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: var(--space-8);`
2. **Asymmetric 60/40 Hero & Feature Split:**
   - Left column 60% editorial authority, Right column 40% interactive cockpit / visual.
   - `grid-template-columns: repeat(auto-fit, minmax(min(100%, 460px), 1fr))`
3. **Stacked Alternating Narrative (Process & Case Studies):**
   - 2-column alternating blocks with sticky side rails.
4. **Interactive Multi-Tab Matrix (Capabilities & Solutions):**
   - Horizontal tab rail navigating into dynamic multi-column content panels.

---

## 6. Surfaces, Radii, Shadows & Glassmorphism

### 6.1 Border Radius Tokens

```css
--radius-sm:   6px;    /* Badges, tags, form controls */
--radius-md:   12px;   /* Buttons, interactive chips, popovers */
--radius-lg:   16px;   /* Cards, dropdown menus, modals */
--radius-xl:   24px;   /* 3D cockpit stage, hero cards */
--radius-2xl:  32px;   /* Large structural showcase panels */
--radius-full: 999px;  /* Pill buttons, search bars, signal beacons */
```

### 6.2 Elevation & Shadow Tokens

```css
--shadow-sm:        0 1px 3px rgba(0, 0, 0, 0.04);
--shadow-md:        0 4px 12px rgba(0, 0, 0, 0.06);
--shadow-lg:        0 12px 32px rgba(0, 0, 0, 0.08);
--shadow-xl:        0 24px 48px rgba(0, 0, 0, 0.12);
--shadow-glow-blue: 0 8px 32px -4px rgba(89, 139, 255, 0.35);
--shadow-glow-green: 0 8px 32px -4px rgba(2, 196, 21, 0.30);
--shadow-obsidian:  0 32px 84px -16px rgba(3, 5, 14, 0.65), 0 0 40px -8px rgba(89, 139, 255, 0.22);
```

### 6.3 Glassmorphism System

Glassmorphic styling is applied selectively to navigation bars, floating HUD chips, dropdowns, and interactive modals:

```css
/* 1. Light Frosted Glass (Navbar & Floating Badges) */
.sb-glass--light {
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(229, 231, 235, 0.9);
}

/* 2. Dark Cyber-Glass (Modal Toasts & Floating Badges on Dark Sections) */
.sb-glass--dark {
  background-color: rgba(6, 10, 24, 0.82);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(89, 139, 255, 0.28);
}

/* 3. HUD Tactical Cockpit Panel */
.sb-glass--hud {
  background-color: rgba(7, 12, 28, 0.78);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(89, 139, 255, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
}
```

---

## 7. Motion & Animation Tokens

### 7.1 Easing Curves

```typescript
export const EASING_TOKENS = {
  // Brand quintic easing for all entrance transitions
  brand: 'power3.out',
  // Cinematic editorial split-text reveals
  cinematic: 'power4.out',
  // Smooth deceleration for UI microinteractions
  smooth: 'power2.out',
  // Subtle tactile spring for buttons & badges
  spring: 'back.out(1.4)',
  // CSS cubic-bezier equivalents
  cssBrand: 'cubic-bezier(0.16, 1, 0.3, 1)',
  cssSmooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const;
```

### 7.2 Duration Scales

- **Instant (150ms / 0.15s):** Icon shifts, arrow translations, hover color transitions.
- **Fast (250ms / 0.25s):** Dropdown openings, mobile menu drawers, button active states.
- **Normal (550ms / 0.55s):** Card scroll-reveals, tab content transitions.
- **Slow (850ms / 0.85s):** Section entrance sequences, headline split-word reveals.
- **Hero (1100ms / 1.1s):** Initial homepage sequence, image mask expansions.

---

## 8. TypeScript Design Token Consumption

All tokens are exported as strongly typed constants from `src/lib/tokens/index.ts`:

```typescript
import { COLOR_TOKENS, TYPOGRAPHY_TOKENS, SPACING_TOKENS, SHADOW_TOKENS } from '@/lib/tokens';

const primaryColor = COLOR_TOKENS.brand.primaryBlue; // "#598BFF"
const standardPadding = SPACING_TOKENS.sectionPadding.standard;
```

