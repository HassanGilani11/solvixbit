'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isRegistered = false;

/**
 * Initializes and registers GSAP plugins on the client side.
 * Safe to call multiple times in SSR/CSR.
 */
export function initGSAP() {
  if (typeof window === 'undefined') return { gsap, ScrollTrigger: null };

  if (!isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;

    // Set GSAP defaults for consistent, refined agency animations
    gsap.defaults({
      ease: 'power3.out',
      duration: 0.65,
    });

    // Configure ScrollTrigger defaults
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });
  }

  return { gsap, ScrollTrigger };
}

/**
 * Helper to check if the user has requested reduced motion.
 */
export function checkPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export { gsap, ScrollTrigger };
