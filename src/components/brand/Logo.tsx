import React, { useState } from 'react';

export interface LogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon';
  theme?: 'light' | 'dark' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  height?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  theme = 'auto',
  size = 'md',
  height: customHeight,
  className,
}) => {
  const [imageError, setImageError] = useState(false);

  // Height mappings based on size
  const heightMap = {
    sm: 28,
    md: 36,
    lg: 44,
    xl: 56,
  };

  const height = customHeight ?? heightMap[size];

  // Determine logo source
  let logoSrc = '/brand/solvixbit-horizontal-black-logo.svg';

  if (theme === 'dark') {
    logoSrc = variant === 'vertical'
      ? '/brand/solvixbit-vertical-logo.svg'
      : '/brand/solvixbit-horizontal-logo.svg';
  } else if (theme === 'light') {
    logoSrc = variant === 'vertical'
      ? '/brand/solvixbit-vertical-black-logo.svg'
      : '/brand/solvixbit-horizontal-black-logo.svg';
  } else {
    // Auto: default to horizontal black logo for light navbar
    logoSrc = '/brand/solvixbit-horizontal-black-logo.svg';
  }

  if (!imageError) {
    return (
      <div className={className} style={{ display: 'inline-flex', alignItems: 'center' }}>
        <img
          src={logoSrc}
          alt="SOLVIXBIT | Technology That Solves."
          height={height}
          style={{
            height: `${height}px`,
            width: 'auto',
            display: 'block',
            maxWidth: '100%',
            objectFit: 'contain',
          }}
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Graceful fallback
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-family-heading)',
        fontWeight: 800,
        fontSize: size === 'lg' ? '1.5rem' : '1.25rem',
        color: theme === 'dark' ? '#FFFFFF' : '#000000',
        letterSpacing: '-0.02em',
      }}
    >
      SOLVIX<span style={{ color: 'var(--color-primary-blue)' }}>BIT</span>
    </div>
  );
};
