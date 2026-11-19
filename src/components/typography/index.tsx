import React from 'react';
import { cn } from '../../lib/utils';

export interface DisplayProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: 1 | 2;
  as?: React.ElementType;
  className?: string;
}

export const Display: React.FC<DisplayProps> = ({
  children,
  level = 1,
  as,
  className,
  ...props
}) => {
  const Component = as || (level === 1 ? 'h1' : 'h2');
  return (
    <Component className={cn('sb-display', `sb-display--${level}`, className)} {...props}>
      {children}
    </Component>
  );
};

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: React.ElementType;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 2,
  as,
  className,
  ...props
}) => {
  const Component = as || (`h${level}` as React.ElementType);
  return (
    <Component className={cn('sb-heading', `sb-heading--${level}`, className)} {...props}>
      {children}
    </Component>
  );
};

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  size?: 'sm' | 'base' | 'lg';
  muted?: boolean;
  as?: React.ElementType;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  size = 'base',
  muted = false,
  as: Component = 'p',
  className,
  ...props
}) => {
  return (
    <Component
      className={cn('sb-text', `sb-text--${size}`, muted && 'sb-text--muted', className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  children,
  required = false,
  className,
  ...props
}) => {
  return (
    <label className={cn('sb-label', className)} {...props}>
      {children}
      {required && <span style={{ color: 'var(--color-semantic-error)', marginLeft: '4px' }}>*</span>}
    </label>
  );
};

export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'badge' | 'beacon' | 'subtle';
  color?: 'blue' | 'green' | 'dark' | 'white';
  className?: string;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  variant = 'beacon',
  color = 'blue',
  className,
  style,
  ...props
}) => {
  const dotColor = color === 'green' ? 'var(--color-secondary-green)' : 'var(--color-primary-blue)';

  if (variant === 'subtle') {
    return (
      <div
        className={cn('sb-eyebrow-subtle', className)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: 'var(--font-size-xs)',
          fontWeight: 700,
          fontFamily: 'var(--font-family-mono)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: color === 'green' ? 'var(--color-secondary-green)' : color === 'white' ? '#FFFFFF' : 'var(--color-primary-blue)',
          ...style,
        }}
        {...props}
      >
        <span>//</span>
        <span>{children}</span>
      </div>
    );
  }

  return (
    <div
      className={cn('sb-eyebrow', className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: variant === 'badge' ? '4px 12px' : '6px 14px',
        backgroundColor: variant === 'badge' ? 'var(--theme-surface-alt)' : '#FFFFFF',
        border: '1px solid var(--theme-border)',
        borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-sm)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 700,
        fontFamily: 'var(--font-family-mono)',
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        color: color === 'white' ? '#FFFFFF' : '#111827',
        ...style,
      }}
      {...props}
    >
      {variant === 'beacon' && (
        <span
          style={{
            position: 'relative',
            display: 'inline-flex',
            width: '8px',
            height: '8px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className="sb-radar-ping"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: dotColor,
            }}
          />
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: dotColor,
            }}
          />
        </span>
      )}
      <span>{children}</span>
    </div>
  );
};

export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  eyebrow?: React.ReactNode;
  eyebrowVariant?: 'badge' | 'beacon' | 'subtle';
  eyebrowColor?: 'blue' | 'green' | 'dark' | 'white';
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center' | 'split';
  rightElement?: React.ReactNode;
  theme?: 'light' | 'dark';
  level?: 1 | 2 | 3;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  eyebrowVariant = 'beacon',
  eyebrowColor = 'blue',
  title,
  description,
  align = 'left',
  rightElement,
  theme = 'light',
  level = 2,
  className,
  style,
  ...props
}) => {
  const isDark = theme === 'dark';
  const isSplit = align === 'split' && rightElement;

  return (
    <div
      className={cn('sb-section-heading', `sb-section-heading--${align}`, className)}
      style={{
        display: isSplit ? 'flex' : 'block',
        flexDirection: isSplit ? 'row' : undefined,
        justifyContent: isSplit ? 'space-between' : undefined,
        alignItems: isSplit ? 'flex-end' : undefined,
        flexWrap: isSplit ? 'wrap' : undefined,
        gap: isSplit ? 'var(--space-6)' : undefined,
        textAlign: align === 'center' ? 'center' : 'left',
        marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
        ...style,
      }}
      {...props}
    >
      <div style={{ maxWidth: isSplit ? '680px' : align === 'center' ? '760px' : '720px', margin: align === 'center' ? '0 auto' : undefined }}>
        {eyebrow && (
          <div style={{ marginBottom: '14px' }}>
            {typeof eyebrow === 'string' ? (
              <Eyebrow variant={eyebrowVariant} color={eyebrowColor}>
                {eyebrow}
              </Eyebrow>
            ) : (
              eyebrow
            )}
          </div>
        )}

        <Heading
          level={level}
          style={{
            color: isDark ? '#FFFFFF' : '#000000',
            fontFamily: 'var(--font-family-heading)',
            fontWeight: 800,
            fontSize: 'var(--typography-fluid-h2, clamp(2rem, 3.8vw, 3.25rem))',
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            marginBottom: description ? '14px' : '0',
          }}
        >
          {title}
        </Heading>

        {description && (
          <Text
            size="lg"
            style={{
              color: isDark ? '#94A3B8' : '#4B5563',
              lineHeight: 1.65,
              fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
              margin: 0,
            }}
          >
            {description}
          </Text>
        )}
      </div>

      {rightElement && (
        <div style={{ marginTop: isSplit ? 0 : 'var(--space-4)', alignSelf: isSplit ? 'flex-end' : undefined }}>
          {rightElement}
        </div>
      )}
    </div>
  );
};
