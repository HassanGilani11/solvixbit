import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      iconLeft,
      iconRight,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'sb-btn',
          `sb-btn--${variant}`,
          `sb-btn--${size}`,
          fullWidth && 'sb-btn--full',
          className
        )}
        style={fullWidth ? { width: '100%' } : undefined}
        {...props}
      >
        {iconLeft && <span className="sb-btn__icon-left">{iconLeft}</span>}
        <span>{children}</span>
        {iconRight && <span className="sb-btn__icon-right">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('sb-btn-group', className)} {...props}>
      {children}
    </div>
  );
};

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  isExternal?: boolean;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  isExternal = false,
  className,
  ...props
}) => {
  return (
    <a
      href={href}
      className={cn('sb-link', className)}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  );
};
