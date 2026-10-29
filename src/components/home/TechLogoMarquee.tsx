import React from 'react';
import { Container } from '../layout';

interface TechItem {
  name: string;
  category: string;
  iconText: string;
  highlight?: boolean;
}

const ROW_ONE_TECHS: TechItem[] = [
  { name: 'Next.js 15', category: 'Frontend / Fullstack', iconText: '▲', highlight: true },
  { name: 'TypeScript', category: 'Typed Engineering', iconText: 'TS', highlight: true },
  { name: 'React 19', category: 'UI Components', iconText: '⚛' },
  { name: 'Node.js', category: 'High-Throughput Backend', iconText: '⬢' },
  { name: 'Python', category: 'AI & Data Science', iconText: '🐍' },
  { name: 'PostgreSQL', category: 'Relational Database', iconText: '🐘', highlight: true },
  { name: 'Docker', category: 'Containerization', iconText: '🐋' },
  { name: 'Kubernetes', category: 'Orchestration', iconText: '☸' },
  { name: 'GraphQL', category: 'API Query Layer', iconText: '◈' },
  { name: 'Redis', category: 'In-Memory Cache', iconText: '⚡', highlight: true },
  { name: 'Go (Golang)', category: 'Distributed Systems', iconText: 'GO' },
  { name: 'Tailwind CSS', category: 'Design System', iconText: '≋' },
];

const ROW_TWO_TECHS: TechItem[] = [
  { name: 'Amazon Web Services', category: 'Cloud Infrastructure', iconText: 'AWS', highlight: true },
  { name: 'Google Cloud Platform', category: 'Data & Serverless', iconText: 'GCP' },
  { name: 'OpenAI API', category: 'Generative Intelligence', iconText: '✦', highlight: true },
  { name: 'Anthropic Claude', category: 'Enterprise LLMs', iconText: '✶' },
  { name: 'Shopify Plus', category: 'Headless Commerce', iconText: '🛍️', highlight: true },
  { name: 'Apache Kafka', category: 'Event Streaming', iconText: '☊' },
  { name: 'Supabase', category: 'Realtime Backend', iconText: '⚡' },
  { name: 'Cloudflare', category: 'Edge Computing & WAF', iconText: '☁', highlight: true },
  { name: 'Terraform', category: 'Infrastructure as Code', iconText: '⚏' },
  { name: 'Stripe Billing', category: 'Global Monetization', iconText: '💳' },
  { name: 'Datadog', category: 'Observability & APM', iconText: '📊' },
  { name: 'LangChain', category: 'Agent Pipelines', iconText: '🔗' },
];

export const TechLogoMarquee: React.FC = () => {
  return (
    <section
      aria-label="Core Technology Stack"
      style={{
        padding: '72px 0 80px',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #EFEFEF',
        borderBottom: '1px solid #EFEFEF',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="sb-badge" style={{ marginBottom: '14px' }}>
            ENGINEERING ECOSYSTEM
          </span>
          <h2
            style={{
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: 800,
              color: '#000000',
              letterSpacing: '-0.02em',
              margin: '0 0 12px',
            }}
          >
            Battle-Tested Technologies We Engineer With
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#6B7280',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.5,
            }}
          >
            Modern, type-safe frameworks, enterprise cloud services, and AI architectures selected for sub-second latency, security, and long-term maintainability.
          </p>
        </div>
      </Container>

      {/* Marquee Wrapper with Side Fade Mask */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Left and Right Gradient Fades */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: 'clamp(40px, 8vw, 160px)',
            background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: 'clamp(40px, 8vw, 160px)',
            background: 'linear-gradient(270deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Row 1: Scrolling Left */}
        <div className="sb-marquee-track sb-marquee-left">
          {[...ROW_ONE_TECHS, ...ROW_ONE_TECHS, ...ROW_ONE_TECHS].map((tech, idx) => (
            <div
              key={`row1-${idx}`}
              className="sb-tech-card"
              aria-hidden={idx >= ROW_ONE_TECHS.length ? 'true' : undefined}
            >
              <div className="sb-tech-card__icon">
                {tech.iconText}
              </div>
              <div>
                <div className="sb-tech-card__name">
                  {tech.name}
                </div>
                <div className="sb-tech-card__category">
                  {tech.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="sb-marquee-track sb-marquee-right">
          {[...ROW_TWO_TECHS, ...ROW_TWO_TECHS, ...ROW_TWO_TECHS].map((tech, idx) => (
            <div
              key={`row2-${idx}`}
              className="sb-tech-card"
              aria-hidden={idx >= ROW_TWO_TECHS.length ? 'true' : undefined}
            >
              <div className="sb-tech-card__icon">
                {tech.iconText}
              </div>
              <div>
                <div className="sb-tech-card__name">
                  {tech.name}
                </div>
                <div className="sb-tech-card__category">
                  {tech.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
