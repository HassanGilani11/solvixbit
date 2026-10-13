import React from 'react';
import { cn } from '../../lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  as: Component = 'div',
  className,
  ...props
}) => {
  return (
    <Component className={cn('sb-container', className)} {...props}>
      {children}
    </Component>
  );
};

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  as: Component = 'section',
  className,
  id,
  ...props
}) => {
  return (
    <Component id={id} className={cn('sb-section', className)} {...props}>
      {children}
    </Component>
  );
};

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  gap?: '1' | '2' | '3' | '4' | '6' | '8' | '10' | '12' | '16';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  className?: string;
}

export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'vertical',
  gap = '4',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  style,
  ...props
}) => {
  const inlineStyles: React.CSSProperties = {
    gap: `var(--space-${gap})`,
    alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
    justifyContent: justify === 'between' ? 'space-between' : justify === 'around' ? 'space-around' : justify === 'start' ? 'flex-start' : justify === 'end' ? 'flex-end' : justify,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...style,
  };

  return (
    <div
      className={cn('sb-stack', direction === 'horizontal' && 'sb-stack--horizontal', className)}
      style={inlineStyles}
      {...props}
    >
      {children}
    </div>
  );
};

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: '2' | '3' | '4' | '6' | '8' | '12';
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 1,
  gap = '6',
  className,
  style,
  ...props
}) => {
  const inlineStyles: React.CSSProperties = {
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: `var(--space-${gap})`,
    ...style,
  };

  return (
    <div className={cn('sb-grid', className)} style={inlineStyles} {...props}>
      {children}
    </div>
  );
};
