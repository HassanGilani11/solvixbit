'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';

// Custom cubic-bezier easing: [0.16, 1, 0.3, 1] with 0.65s duration
const customEase = [0.16, 1, 0.3, 1] as const;

export interface HeroHeadlineProps {
  className?: string;
  style?: React.CSSProperties;
}

export const HeroHeadline: React.FC<HeroHeadlineProps> = ({ className, style }) => {
  // Container variant to orchestrate staggering
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  // Line slide-up reveal variant
  const lineVariants: Variants = {
    hidden: {
      y: '115%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: customEase,
      },
    },
  };

  // Highlight variant with subtle extra delay
  const highlightVariants: Variants = {
    hidden: {
      y: '115%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: customEase,
        delay: 0.08,
      },
    },
  };

  return (
    <motion.h1
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        fontFamily: 'var(--font-family-heading)',
        fontWeight: 800,
        fontSize: 'clamp(2.5rem, 4.8vw, 4.25rem)',
        lineHeight: 1.08,
        letterSpacing: '-0.035em',
        color: '#000000',
        marginBottom: 'var(--space-6)',
        ...style,
      }}
    >
      {/* Line 1: We turn bold ideas into */}
      <span
        style={{
          display: 'block',
          overflow: 'hidden',
          paddingBottom: '0.06em',
        }}
      >
        <motion.span
          variants={lineVariants}
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity',
          }}
        >
          We turn bold ideas into
        </motion.span>
      </span>

      {/* Line 2: digital experiences. */}
      <span
        style={{
          display: 'block',
          overflow: 'hidden',
          paddingBottom: '0.06em',
        }}
      >
        <motion.span
          variants={highlightVariants}
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #598BFF 0%, #2563EB 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            willChange: 'transform, opacity',
          }}
        >
          digital experiences.
        </motion.span>
      </span>
    </motion.h1>
  );
};
