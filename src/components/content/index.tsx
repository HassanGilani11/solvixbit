import React from 'react';
import { cn } from '../../lib/utils';
import { Heading, Text } from '../typography';
import { ArrowRight } from '../icons';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'blue' | 'green' | 'dark' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className,
  ...props
}) => {
  return (
    <span className={cn('sb-badge', `sb-badge--${variant}`, className)} {...props}>
      {children}
    </span>
  );
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  interactive = false,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('sb-card', interactive && 'sb-card--interactive', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export interface ServiceCardProps {
  title: string;
  description: string;
  category?: string;
  number?: string;
  icon?: React.ReactNode;
  tags?: string[];
  className?: string;
  onCtaClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  category,
  number,
  icon,
  tags,
  className,
  onCtaClick,
}) => {
  return (
    <div className={cn('sb-service-card', className)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
        {number && <span className="sb-service-card__num">{number}</span>}
        {category && (
          <span
            style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              color: '#6B7280',
              backgroundColor: '#EFEFEF',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
            }}
          >
            {category}
          </span>
        )}
      </div>
      {icon && <div style={{ marginBottom: 'var(--space-4)', color: 'var(--color-primary-blue)' }}>{icon}</div>}
      <Heading level={3} style={{ marginBottom: 'var(--space-2)' }}>
        {title}
      </Heading>
      <Text muted size="base" style={{ marginBottom: 'var(--space-6)', flexGrow: 1 }}>
        {description}
      </Text>
      {tags && tags.length > 0 && (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'auto' }}>
          {tags.map((tag) => (
            <Badge key={tag} variant="neutral">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      {onCtaClick && (
        <button
          type="button"
          onClick={onCtaClick}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            marginTop: 'var(--space-4)',
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            color: 'var(--color-primary-blue)',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
          className="sb-link-arrow"
        >
          <span>Start {title} Project</span>
          <ArrowRight size={13} className="sb-btn__arrow" />
        </button>
      )}
    </div>
  );
};

export interface CaseStudyCardProps {
  title: string;
  client?: string;
  category?: string;
  metric?: string;
  metricLabel?: string;
  description: string;
  tags?: string[];
  className?: string;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  client,
  category,
  metric,
  metricLabel,
  description,
  tags,
  className,
}) => {
  return (
    <div className={cn('sb-case-study-card', className)}>
      <div style={{ padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
          {client && (
            <span style={{ fontSize: 'var(--font-size-xs)', color: '#6B7280', fontWeight: 600 }}>
              {client}
            </span>
          )}
          {category && <Badge variant="blue">{category}</Badge>}
        </div>
        <Heading level={3} style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
          {title}
        </Heading>
        {metric && (
          <div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              backgroundColor: '#FAFAFA',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #E5E7EB',
              marginBottom: 'var(--space-4)',
            }}
          >
            <div
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 800,
                color: 'var(--color-primary-blue)',
                fontFamily: 'var(--font-family-heading)',
              }}
            >
              {metric}
            </div>
            {metricLabel && (
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--theme-muted)' }}>
                {metricLabel}
              </div>
            )}
          </div>
        )}
        <Text muted size="sm" style={{ marginBottom: 'var(--space-4)' }}>
          {description}
        </Text>
        {tags && tags.length > 0 && (
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <Badge key={tag} variant="neutral">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  className?: string;
}

export const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  company,
  avatarUrl,
  className,
}) => {
  return (
    <div className={cn('sb-testimonial', className)}>
      <p
        style={{
          fontFamily: 'var(--font-family-body)',
          fontSize: 'var(--font-size-lg)',
          lineHeight: 'var(--line-height-relaxed)',
          color: 'var(--theme-text)',
          marginBottom: 'var(--space-6)',
          fontStyle: 'italic',
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={author}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-full)',
              objectFit: 'cover',
            }}
          />
        )}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--font-size-base)',
              color: 'var(--theme-text)',
            }}
          >
            {author}
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--theme-muted)' }}>
            {role}, {company}
          </div>
        </div>
      </div>
    </div>
  );
};
