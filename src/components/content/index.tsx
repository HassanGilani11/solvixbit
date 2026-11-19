import React from 'react';
import Link from 'next/link';
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

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'hud' | 'accent';
  blur?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  variant = 'light',
  blur = 'md',
  interactive = false,
  className,
  style,
  ...props
}) => {
  return (
    <div
      className={cn(
        'sb-glass',
        `sb-glass--${variant}`,
        `sb-glass--blur-${blur}`,
        interactive && 'sb-glass--interactive',
        className
      )}
      style={style}
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
  href?: string;
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
  href,
}) => {
  const content = (
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
      {(onCtaClick || href) && (
        <div
          style={{
            marginTop: 'var(--space-4)',
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            color: 'var(--color-primary-blue)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
          className="sb-link-arrow"
        >
          <span>Explore {title}</span>
          <ArrowRight size={13} className="sb-btn__arrow" />
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        {content}
      </Link>
    );
  }

  return content;
};

export interface SolutionCardProps {
  title: string;
  category?: string;
  description: string;
  deliverables?: string[];
  metrics?: { value: string; label: string };
  tags?: string[];
  href?: string;
  onCtaClick?: () => void;
  className?: string;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  category,
  description,
  deliverables,
  metrics,
  tags,
  href,
  onCtaClick,
  className,
}) => {
  const cardBody = (
    <div
      className={cn('sb-card sb-card--interactive', className)}
      style={{
        padding: 'var(--space-8)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        {category && <Badge variant="blue">{category}</Badge>}
        {metrics && (
          <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)', color: 'var(--color-secondary-green)', fontWeight: 700 }}>
            {metrics.value} {metrics.label}
          </span>
        )}
      </div>

      <Heading level={3} style={{ marginBottom: 'var(--space-3)' }}>
        {title}
      </Heading>

      <Text muted size="base" style={{ marginBottom: 'var(--space-6)', flexGrow: 1 }}>
        {description}
      </Text>

      {deliverables && deliverables.length > 0 && (
        <div style={{ marginBottom: 'var(--space-6)', borderTop: '1px solid var(--theme-border)', paddingTop: 'var(--space-4)' }}>
          <div style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>
            Deliverables
          </div>
          <ul style={{ margin: 0, paddingLeft: '18px', fontSize: 'var(--font-size-sm)', color: '#374151', lineHeight: 1.6 }}>
            {deliverables.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {tags && tags.length > 0 && (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'auto', marginBottom: 'var(--space-4)' }}>
          {tags.map((tag) => (
            <Badge key={tag} variant="neutral">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {(href || onCtaClick) && (
        <div
          style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            color: 'var(--color-primary-blue)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: 'auto',
          }}
          className="sb-link-arrow"
        >
          <span>Explore Solution Architecture</span>
          <ArrowRight size={13} className="sb-btn__arrow" />
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        {cardBody}
      </Link>
    );
  }

  return cardBody;
};

export interface CaseStudyCardProps {
  title: string;
  client?: string;
  category?: string;
  metric?: string;
  metricLabel?: string;
  description: string;
  tags?: string[];
  imageUrl?: string;
  href?: string;
  featured?: boolean;
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
  imageUrl,
  href,
  featured = false,
  className,
}) => {
  const cardContent = (
    <div className={cn('sb-case-study-card', featured && 'sb-case-study-card--featured', className)}>
      {imageUrl && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            backgroundColor: '#070B19',
            overflow: 'hidden',
          }}
        >
          <img
            src={imageUrl}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      )}
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
        {href && (
          <div
            style={{
              marginTop: 'var(--space-4)',
              fontFamily: 'var(--font-family-body)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 600,
              color: 'var(--color-primary-blue)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            className="sb-link-arrow"
          >
            <span>View Case Study</span>
            <ArrowRight size={13} className="sb-btn__arrow" />
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export const ProjectShowcase = CaseStudyCard;

export interface ArticleCardProps {
  title: string;
  excerpt: string;
  category?: string;
  readTime?: string;
  date?: string;
  slug: string;
  imageUrl?: string;
  author?: {
    name: string;
    avatarUrl?: string;
  };
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  excerpt,
  category,
  readTime,
  date,
  slug,
  imageUrl,
  author,
  className,
}) => {
  return (
    <Link
      href={`/blog/${slug}`}
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
    >
      <div
        className={cn('sb-card sb-card--interactive', className)}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {imageUrl && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              backgroundColor: '#0A0F1D',
              overflow: 'hidden',
            }}
          >
            <img
              src={imageUrl}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>
        )}

        <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
            {category && <Badge variant="neutral">{category}</Badge>}
            {(readTime || date) && (
              <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-mono)', color: '#6B7280' }}>
                {date} {date && readTime && '•'} {readTime}
              </span>
            )}
          </div>

          <Heading level={3} style={{ marginBottom: 'var(--space-2)', fontSize: '1.2rem', lineHeight: 1.3 }}>
            {title}
          </Heading>

          <Text muted size="sm" style={{ marginBottom: 'var(--space-6)', flexGrow: 1, lineHeight: 1.6 }}>
            {excerpt}
          </Text>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 'auto',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--theme-border)',
            }}
          >
            {author && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {author.avatarUrl && (
                  <img
                    src={author.avatarUrl}
                    alt={author.name}
                    style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                )}
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#374151' }}>
                  {author.name}
                </span>
              </div>
            )}

            <div
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 700,
                color: 'var(--color-primary-blue)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                marginLeft: 'auto',
              }}
            >
              <span>Read Insight</span>
              <ArrowRight size={12} className="sb-btn__arrow" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  supporting?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  onStartProjectClick?: () => void;
  theme?: 'light' | 'dark';
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  eyebrow = 'READY TO MOVE FORWARD?',
  title = "Have a challenge in mind? Let's build what's next.",
  supporting = 'Direct Senior Partner Access • Production-Ready Systems • Zero Vendor Lock-in',
  description = 'Tell us about your technical challenge, timeline, and goals. We respond within one business day with direct senior engineering perspective.',
  primaryCtaText = 'Start a Project',
  primaryCtaHref = '/start-a-project',
  secondaryCtaText = 'Schedule Consultation',
  secondaryCtaHref = '/contact',
  onStartProjectClick,
  theme = 'dark',
  className,
}) => {
  const isDark = theme === 'dark';

  return (
    <section
      className={cn(isDark ? 'sb-section-dark' : 'sb-section', className)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(4.5rem, 8vw, 7.5rem) 0',
        backgroundColor: isDark ? '#000000' : '#FFFFFF',
        color: isDark ? '#FFFFFF' : '#000000',
        borderTop: isDark ? '1px solid #1E293B' : '1px solid #E5E7EB',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 3vw, 2rem)',
        }}
      >
        <div style={{ maxWidth: '820px' }}>
          {eyebrow && (
            <div
              style={{
                fontSize: 'var(--font-size-xs)',
                fontFamily: 'var(--font-family-mono)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--color-primary-blue)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              // {eyebrow}
            </div>
          )}

          <h2
            style={{
              fontFamily: 'var(--font-family-heading)',
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.035em',
              color: isDark ? '#FFFFFF' : '#000000',
              marginBottom: '16px',
            }}
          >
            {title}
          </h2>

          {supporting && (
            <div
              style={{
                fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
                fontWeight: 600,
                color: 'var(--color-secondary-green)',
                marginBottom: '20px',
              }}
            >
              {supporting}
            </div>
          )}

          {description && (
            <p
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                color: isDark ? '#94A3B8' : '#4B5563',
                lineHeight: 1.65,
                maxWidth: '680px',
                marginBottom: '36px',
              }}
            >
              {description}
            </p>
          )}

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href={primaryCtaHref}
              onClick={(e) => {
                if (onStartProjectClick) {
                  e.preventDefault();
                  onStartProjectClick();
                }
              }}
              className="sb-btn sb-btn--lg sb-btn--primary"
              style={{ textDecoration: 'none' }}
            >
              <span>{primaryCtaText}</span>
              <ArrowRight size={16} className="sb-btn__arrow" />
            </Link>

            {secondaryCtaText && (
              <Link
                href={secondaryCtaHref}
                className={cn('sb-btn sb-btn--lg', isDark ? 'sb-btn--outline' : 'sb-btn--secondary')}
                style={{
                  textDecoration: 'none',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : undefined,
                  color: isDark ? '#FFFFFF' : undefined,
                }}
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
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
