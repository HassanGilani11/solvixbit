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
