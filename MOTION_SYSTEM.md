# SOLVIXBIT — Motion System & Micro-Interaction Guidelines

**Brand:** SOLVIXBIT  
**Tagline:** Technology That Solves.  
**Document Version:** 5.0.0 (Phase 5: Motion & Micro-Interactions)  
**Status:** Approved & Implemented  

---

## 1. Core Motion Philosophy

The SOLVIXBIT motion system prioritizes **purpose, responsiveness, and restraint**. Animations are engineered to provide subtle tactile feedback, guide user focus, and communicate computational precision without cognitive overload or distraction.

### Principles:
1. **Subtle & Fast:** Interactions feel instantaneous and crisp rather than drawn out.
2. **GPU-Accelerated Only:** All transitions are restricted to `opacity` and `transform` (`translateY`, `scale`), eliminating layout recalculations and repaints.
3. **Strict Accessibility:** Zero non-essential animations for users with `prefers-reduced-motion: reduce`.
4. **No Visual Noise:** Avoid constant loops, bouncy physics, or novelty parallax effects.

---

## 2. Motion Specifications

### 2.1 Durations
| Token | Timing Range | Default Value | Purpose |
|---|---|---|---|
| `fast` | 120ms – 180ms | `150ms` | Button hovers, link color transitions, active clicks, micro-toggles |
| `standard` | 200ms – 300ms | `250ms` | Card elevation, toast entrance, mobile menu slide, modal popup |
| `large` | 400ms – 700ms | `500ms` | Section entrance reveals, staggered grid reveals, hero headline entrance |

### 2.2 Preferred Brand Easing
- **Primary Brand Curve:** `cubic-bezier(0.22, 1, 0.36, 1)` (Smooth, decisive deceleration with natural momentum)
- **Linear:** `linear` (Progress bars, timed indicators)

---

## 3. Micro-Interaction Details

| Element | Interaction | Visual Behavior | CSS / Mechanism |
|---|---|---|---|
| **Buttons** | Hover / Press | Subtle -1px lift on hover, scale down (0.99) on active press | `transform: translateY(-1px)` via `fast` brand curve |
| **Cards & Services** | Hover | Subtle -2px lift + cyan/blue border highlight | `transform: translateY(-2px)` via `standard` brand curve |
| **Links** | Hover | Instant color shift with underline | `color` + `opacity` transition via `fast` curve |
| **Section Reveal** | Scroll Intersection | 16px fade-up when scrolled into viewport | `useScrollReveal` hook + `.sb-reveal--visible` |
| **Modal / Dialog** | Mount | Subtle scale-in (0.96 -> 1.0) with background dim | `sb-scale-in` via `standard` curve |
| **Mobile Menu** | Toggle | Clean slide-down with opacity fade | `sb-slide-down` via `standard` curve |
| **Toast Alerts** | Trigger | Fade-up from bottom right | `sb-fade-up` via `standard` curve |

---

## 4. Accessibility & Performance Safeguards

- **Strict `prefers-reduced-motion`:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- **Intersection Observer Cleanup:** Observers unobserve elements immediately after first reveal to eliminate ongoing CPU usage.
