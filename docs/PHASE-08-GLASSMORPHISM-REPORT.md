# SOLVIXBIT — PHASE 08: Glassmorphism Design System Report

## 1. Objective & Design Principles

Phase 08 introduces a selective, reusable glassmorphism design system for SOLVIXBIT without rebuilding the homepage or sacrificing contrast, legibility, or runtime performance.

- **Approved Palette**: Blue (`#598BFF`), Green (`#02C415`), Light Grey (`#EFEFEF`), Black (`#000000`), White (`#FFFFFF`).
- **Selective Application**: Glass surfaces are applied only to high-value focal points (navigation bar, hero centerpiece panel, capability inspector, solution cards, portfolio overlays, floating metadata pills, and the closing CTA), avoiding uniform glassmorphism across every card or section.
- **Contrast & Fallbacks**: High-contrast foregrounds paired with dark/light translucent backdrops, subtle inner highlights (`inset 0 1px 0`), and `@supports not ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px)))` solid fallbacks.
- **Mobile Performance**: On viewports `<= 767px`, blur radii are reduced (`8px`) on dark glass panels and removed (`backdrop-filter: none`) on light service surfaces to preserve 60fps scrolling on mobile GPUs.

---

## 2. Design Tokens Added (`src/styles/tokens.css`)

| Token | Value | Purpose |
| :--- | :--- | :--- |
| `--glass-bg-light` | `rgba(255, 255, 255, 0.78)` | Light translucent surface |
| `--glass-bg-light-subtle` | `rgba(255, 255, 255, 0.62)` | Subtle light surface |
| `--glass-bg-dark` | `rgba(10, 14, 24, 0.78)` | Dark translucent surface |
| `--glass-bg-dark-strong` | `rgba(7, 11, 22, 0.84)` | High-contrast dark glass |
| `--glass-border-light` | `rgba(0, 0, 0, 0.08)` | Crisp light border |
| `--glass-border-dark` | `rgba(255, 255, 255, 0.12)` | Fine translucent dark border |
| `--glass-border-accent` | `rgba(89, 139, 255, 0.28)` | Brand blue glass border |
| `--glass-border-green` | `rgba(2, 196, 21, 0.28)` | Brand green glass border |
| `--glass-highlight-light` | `inset 0 1px 0 rgba(255, 255, 255, 0.85)` | Top-edge inner highlight (light) |
| `--glass-highlight-dark` | `inset 0 1px 0 rgba(255, 255, 255, 0.14)` | Top-edge inner highlight (dark) |
| `--glass-blur-sm` | `8px` | Subtle surface blur |
| `--glass-blur-md` | `16px` | Standard panel blur |
| `--glass-blur-lg` | `22px` | Strong hero centerpiece blur |

---

## 3. Reusable Glassmorphism Classes (`src/styles/components.css`)

| Class | Component Target | Visual Treatment | Fallback (`@supports not`) |
| :--- | :--- | :--- | :--- |
| `.sb-glass-nav` | `Navbar` (`src/components/navigation/index.tsx`) | `rgba(255,255,255,0.84)`, `blur(14px) saturate(160%)`, inner light highlight | `#FFFFFF` |
| `.sb-glass-hero` | `HeroSection` right-column centerpiece (`src/components/home/HeroSection.tsx`) | Dark navy gradient, `blur(22px) saturate(140%)`, blue ambient glow, inner highlight | `#0A0F1E` |
| `.sb-glass-capability` | `CapabilitiesEcosystem` inspector panel (`src/components/home/CapabilitiesEcosystem.tsx`) | Dark slate gradient, `blur(16px) saturate(135%)`, translucent border | `#0A0F1E` |
| `.sb-glass-service` | Alternating `HomeServicesSection` cards (`src/components/home/HomeServicesSection.tsx`) | Light translucent gradient, `blur(8px)`, brand blue hover glow | `#FFFFFF` |
| `.sb-glass-solution` / `--active` | `HomeSolutionsSection` cards (`src/components/home/HomeSolutionsSection.tsx`) | Dark glass panel, `blur(16px)`, blue border & glow when hovered/active | `#0A0F1E` |
| `.sb-glass-overlay` | `HomeFeaturedWork` image metadata bar (`src/components/home/HomeFeaturedWork.tsx`) | `rgba(10, 15, 28, 0.82)`, `blur(12px)`, `rgba(255,255,255,0.16)` border | `#0A0F1E` |
| `.sb-glass-meta` / `--light` | Floating metadata pills in Hero, Services, Insights | Compact `blur(10px)` pills for dark and light contexts | `#0A0F1E` / `#FFFFFF` |
| `.sb-glass-cta` | `HomeClosingCTA` (`src/components/home/HomeClosingCTA.tsx`) | Deep dark glass surface, `blur(16px)`, brand blue border & radial glow | `#0A0F1E` |

---

## 4. Accessibility & Performance Notes

- **Text Contrast**: All dark glass panels pair `#FFFFFF` / `#F8FAFC` / `#DBEAFE` text with `>= 0.72`–`0.94` dark alpha backgrounds. Light glass surfaces pair `#111827` / `#374151` text with `>= 0.78`–`0.90` white alpha backgrounds.
- **Reduced Motion**: `src/styles/motion.css` and `src/lib/animation/gsap.ts` honor `prefers-reduced-motion: reduce`, disabling GSAP scroll reveals and continuous Three.js float animations when enabled.
- **WebGL Fallback**: `HeroSculpture.tsx` retains its SVG fallback when WebGL2/WebGL is unavailable.
