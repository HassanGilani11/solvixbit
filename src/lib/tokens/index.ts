/**
 * SOLVIXBIT Design Tokens — TypeScript Master Definition
 * Strict brand palette:
 * Primary Blue: #598BFF | Secondary Green: #02C415 | Light Grey: #EFEFEF | Black: #000000 | White: #FFFFFF
 */

export const COLOR_TOKENS = {
  brand: {
    primaryBlue: '#598BFF',
    secondaryGreen: '#02C415',
    lightGrey: '#EFEFEF',
    black: '#000000',
    white: '#FFFFFF',
  },
  obsidian: {
    deep: '#03050E',
    base: '#060A18',
    surface: '#0B132B',
    border: 'rgba(89, 139, 255, 0.28)',
    highlight: 'rgba(2, 196, 21, 0.22)',
  },
  neutrals: {
    white: '#FFFFFF',
    50: '#FAFAFA',
    100: '#EFEFEF',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    black: '#000000',
  },
  semantic: {
    success: '#02C415',
    warning: '#D97706',
    error: '#DC2626',
    info: '#598BFF',
  },
  alphas: {
    blueGlow: 'rgba(89, 139, 255, 0.25)',
    blueSubtle: 'rgba(89, 139, 255, 0.08)',
    greenGlow: 'rgba(2, 196, 21, 0.20)',
    greenSubtle: 'rgba(2, 196, 21, 0.08)',
    darkGlass: 'rgba(6, 10, 24, 0.82)',
    lightGlass: 'rgba(255, 255, 255, 0.88)',
  },
} as const;

export const TYPOGRAPHY_TOKENS = {
  fonts: {
    heading: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  sizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.75rem',  // 76px
  },
  fluidHeadings: {
    h1: 'clamp(2.75rem, 5.5vw, 4.75rem)',
    h2: 'clamp(2.0rem, 3.8vw, 3.25rem)',
    h3: 'clamp(1.35rem, 2.2vw, 1.85rem)',
    h4: 'clamp(1.15rem, 1.6vw, 1.35rem)',
  },
  lineHeights: {
    none: 1,
    tight: 1.12,
    snug: 1.28,
    normal: 1.5,
    relaxed: 1.65,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.04em',
    tight: '-0.02em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.08em',
    widest: '0.15em',
  },
} as const;

export const SPACING_TOKENS = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  30: '120px',
  40: '160px',
  sectionPadding: {
    compact: 'clamp(3rem, 5vw, 4.5rem) 0',
    standard: 'clamp(4.5rem, 7vw, 7.5rem) 0',
    hero: 'clamp(3rem, 6vw, 6rem) 0',
  },
} as const;

export const CONTAINER_TOKENS = {
  maxWidths: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
    full: '100%',
  },
  gutters: {
    mobile: '1rem',
    tablet: '1.5rem',
    desktop: '2rem',
  },
} as const;

export const GRID_TOKENS = {
  columns: {
    12: 'repeat(12, minmax(0, 1fr))',
    4: 'repeat(4, minmax(0, 1fr))',
    3: 'repeat(3, minmax(0, 1fr))',
    2: 'repeat(2, minmax(0, 1fr))',
    1: '1fr',
  },
  asymmetric: {
    hero: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
    twoThirds: '2fr 1fr',
    oneThird: '1fr 2fr',
  },
} as const;

export const RADIUS_TOKENS = {
  none: '0px',
  sm: '6px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  full: '999px',
} as const;

export const SHADOW_TOKENS = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.04)',
  md: '0 4px 12px rgba(0, 0, 0, 0.06)',
  lg: '0 12px 32px rgba(0, 0, 0, 0.08)',
  xl: '0 24px 48px rgba(0, 0, 0, 0.12)',
  glowBlue: '0 8px 32px -4px rgba(89, 139, 255, 0.35)',
  glowGreen: '0 8px 32px -4px rgba(2, 196, 21, 0.30)',
  obsidianDepth: '0 32px 84px -16px rgba(3, 5, 14, 0.65), 0 0 40px -8px rgba(89, 139, 255, 0.22)',
} as const;

export const GLASS_TOKENS = {
  light: {
    bg: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid rgba(229, 231, 235, 0.9)',
    blur: '16px',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
  },
  dark: {
    bg: 'rgba(6, 10, 24, 0.82)',
    border: '1px solid rgba(89, 139, 255, 0.28)',
    blur: '18px',
    shadow: '0 16px 48px rgba(0, 0, 0, 0.55)',
  },
  hud: {
    bg: 'rgba(7, 12, 28, 0.75)',
    border: '1px solid rgba(89, 139, 255, 0.22)',
    blur: '14px',
    shadow: '0 8px 24px rgba(0, 0, 0, 0.40)',
  },
} as const;

export const MOTION_TOKENS = {
  durations: {
    instant: 0.15,
    fast: 0.25,
    normal: 0.55,
    slow: 0.85,
    hero: 1.1,
  },
  durationsMs: {
    instant: 150,
    fast: 250,
    normal: 550,
    slow: 850,
  },
  easings: {
    brand: 'power3.out',
    cinematic: 'power4.out',
    smooth: 'power2.out',
    spring: 'back.out(1.4)',
    cubicBrand: 'cubic-bezier(0.16, 1, 0.3, 1)',
    cubicSmooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  stagger: {
    fast: 0.06,
    normal: 0.1,
    relaxed: 0.15,
  },
} as const;

export const BREAKPOINT_TOKENS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

