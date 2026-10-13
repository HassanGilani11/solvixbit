/**
 * SOLVIXBIT Animation Tokens & System Configuration
 * Strict alignment with brand identity:
 * Blue #598BFF | Green #02C415 | Light Grey #EFEFEF | Black #000000 | White #FFFFFF
 */

export const ANIMATION_CONFIG = {
  // Easing presets
  ease: {
    // Premium digital agency quintic out easing
    brand: 'power3.out',
    // Editorial cinematic entrance
    cinematic: 'power4.out',
    // Smooth deceleration for UI components
    smooth: 'power2.out',
    // Natural subtle spring for interactive elements
    spring: 'back.out(1.4)',
  },

  // Durations in seconds (GSAP uses seconds)
  duration: {
    instant: 0.15,
    fast: 0.35,
    normal: 0.65,
    slow: 0.9,
    hero: 1.1,
  },

  // Stagger intervals in seconds
  stagger: {
    fast: 0.06,
    normal: 0.1,
    relaxed: 0.15,
  },

  // ScrollTrigger view thresholds
  scroll: {
    standardStart: 'top 85%',
    scrubSmooth: 0.8, // subtle lag on scrub for buttery feel without disconnect
    endTrigger: 'bottom 20%',
  },

  // Responsive breakpoints
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    wide: 1280,
  },
} as const;

export type AnimationConfig = typeof ANIMATION_CONFIG;
