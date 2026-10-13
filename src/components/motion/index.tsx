'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

/**
 * Hook to detect user's preference for reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for performant scroll-triggered intersection reveals
 */
export function useScrollReveal(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options, prefersReduced]);

  return { ref, isVisible };
}

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  staggerIndex?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  staggerIndex,
  className,
  ...props
}) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={cn(
        'sb-reveal',
        isVisible && 'sb-reveal--visible',
        staggerIndex && `sb-stagger-${staggerIndex}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface FadeUpProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}

export const FadeUp: React.FC<FadeUpProps> = ({
  children,
  delayMs = 0,
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={cn('sb-animate-fade-up', className)}
      style={{ animationDelay: `${delayMs}ms`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export interface ScaleInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delayMs = 0,
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={cn('sb-animate-scale-in', className)}
      style={{ animationDelay: `${delayMs}ms`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export * from './GSAPComponents';
export { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
export { ANIMATION_CONFIG } from '../../lib/animation/config';
