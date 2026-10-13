'use client';

import React, { useRef, useId } from 'react';
import { useGSAP } from '@gsap/react';
import { initGSAP, checkPrefersReducedMotion } from '../../lib/animation/gsap';
import { ANIMATION_CONFIG } from '../../lib/animation/config';
import { cn } from '../../lib/utils';

// Ensure GSAP plugins are registered
initGSAP();

export interface ScrollSectionRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'scale-up' | 'slide-side';
  staggerSelector?: string;
  staggerInterval?: number;
  delay?: number;
  start?: string;
  className?: string;
}

/**
 * ScrollSectionReveal: Refined GSAP ScrollTrigger reveal for sections & grids.
 * Gracefully renders immediately when prefers-reduced-motion is active.
 */
export const ScrollSectionReveal: React.FC<ScrollSectionRevealProps> = ({
  children,
  animation = 'fade-up',
  staggerSelector,
  staggerInterval = ANIMATION_CONFIG.stagger.normal,
  delay = 0,
  start = ANIMATION_CONFIG.scroll.standardStart,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      const container = containerRef.current;
      if (!container) return;

      const targets = staggerSelector
        ? container.querySelectorAll(staggerSelector)
        : container.children.length > 0
        ? Array.from(container.children)
        : [container];

      if (targets.length === 0) return;

      let fromVars: gsap.TweenVars = {
        opacity: 0,
        ease: ANIMATION_CONFIG.ease.brand,
        duration: ANIMATION_CONFIG.duration.normal,
        delay,
      };

      switch (animation) {
        case 'fade-up':
          fromVars = { ...fromVars, y: 32 };
          break;
        case 'scale-up':
          fromVars = { ...fromVars, scale: 0.94, y: 16 };
          break;
        case 'slide-side':
          fromVars = { ...fromVars, x: -24 };
          break;
        case 'fade-in':
        default:
          break;
      }

      gsap.from(targets, {
        ...fromVars,
        stagger: targets.length > 1 ? staggerInterval : 0,
        scrollTrigger: {
          trigger: container,
          start,
          once: true,
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: containerRef, dependencies: [animation, staggerSelector, delay] }
  );

  return (
    <div ref={containerRef} className={className} {...props}>
      {children}
    </div>
  );
};

export interface TextSplitRevealProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLDivElement> {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightColor?: string;
}

/**
 * TextSplitReveal: Splitted line-by-line editorial headline reveal using GSAP.
 * Avoids any layout shifts by maintaining exact natural line height and spacing.
 */
export const TextSplitReveal: React.FC<TextSplitRevealProps> = ({
  text,
  as: Component = 'h2',
  className,
  delay = 0,
  highlightWords = [],
  highlightColor = 'var(--color-primary-blue)',
  ...props
}) => {
  const rootRef = useRef<HTMLHeadingElement | HTMLDivElement | null>(null);
  const words = text.split(' ');

  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      if (!rootRef.current) return;

      const wordSpans = rootRef.current.querySelectorAll('.sb-split-word');

      gsap.from(wordSpans, {
        y: '100%',
        opacity: 0,
        duration: ANIMATION_CONFIG.duration.slow,
        ease: ANIMATION_CONFIG.ease.cinematic,
        stagger: ANIMATION_CONFIG.stagger.fast,
        delay,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 88%',
          once: true,
        },
      });
    },
    { scope: rootRef, dependencies: [text, delay] }
  );

  return (
    <Component
      ref={rootRef as any}
      className={cn('sb-split-heading', className)}
      {...props}
      style={{
        overflow: 'hidden',
        display: 'block',
        lineHeight: 1.15,
        ...props.style,
      }}
    >
      {words.map((word, idx) => {
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
        );

        return (
          <span
            key={`${word}-${idx}`}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'top',
              paddingBottom: '0.04em',
            }}
          >
            <span
              className="sb-split-word"
              style={{
                display: 'inline-block',
                willChange: 'transform, opacity',
                color: isHighlighted ? highlightColor : 'inherit',
              }}
            >
              {word}
            </span>
            {idx < words.length - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </Component>
  );
};

export interface ImageMaskRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'clip';
  className?: string;
}

/**
 * ImageMaskReveal: Editorial mask and clip-path reveal for project visuals.
 */
export const ImageMaskReveal: React.FC<ImageMaskRevealProps> = ({
  children,
  direction = 'clip',
  className,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (checkPrefersReducedMotion()) return;

      const { gsap } = initGSAP();
      const container = containerRef.current;
      if (!container) return;

      if (direction === 'clip') {
        gsap.fromTo(
          container,
          {
            clipPath: 'inset(12% 12% 12% 12% round 16px)',
            scale: 0.96,
            opacity: 0.4,
          },
          {
            clipPath: 'inset(0% 0% 0% 0% round 16px)',
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: ANIMATION_CONFIG.ease.brand,
            scrollTrigger: {
              trigger: container,
              start: 'top 82%',
              once: true,
            },
          }
        );
      } else {
        gsap.from(container, {
          y: direction === 'up' ? 40 : 0,
          x: direction === 'left' ? -30 : 0,
          opacity: 0,
          duration: 0.9,
          ease: ANIMATION_CONFIG.ease.brand,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
        });
      }
    },
    { scope: containerRef, dependencies: [direction] }
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        willChange: 'transform, opacity, clip-path',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
