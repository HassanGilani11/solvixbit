import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SOLUTIONS, getSolutionBySlug, getAllSolutionSlugs } from '@/config/solutions';
import { ArrowRight, ArrowUpRight, CheckIcon } from '@/components/icons';
import { Container } from '@/components/layout';

interface SolutionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSolutionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return {
      title: 'Solution Not Found | SOLVIXBIT',
    };
  }

  return {
    title: `${solution.title} | SOLVIXBIT Solutions`,
    description: solution.summary,
    openGraph: {
      title: `${solution.title} | SOLVIXBIT Solutions`,
      description: solution.summary,
      url: `https://www.solvixbit.com/solutions/${solution.slug}`,
    },
  };
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  // Related solutions
  const relatedSlugs = solution.relatedSolutions || solution.relatedSolutionSlugs || [];
  const relatedSolutions = SOLUTIONS.filter(
    (s) => s.slug !== solution.slug && relatedSlugs.includes(s.slug)
  ).slice(0, 3);

  const problemText = solution.problem || solution.problemStatement || '';
  const profiles = solution.targetAudience?.profiles || solution.targetAudience?.businessTypes || [];
  const teams = solution.targetAudience?.teams || [];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {/* 1. HERO SECTION */}
      <section style={{ padding: 'clamp(3.5rem, 6vw, 5.5rem) 0 60px', backgroundColor: '#FAFAFA', borderBottom: '1px solid #EFEFEF' }}>
        <Container>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
            <Link href="/" style={{ color: '#6B7280', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/solutions" style={{ color: '#6B7280', textDecoration: 'none' }}>Solutions</Link>
            <span>/</span>
            <span style={{ color: '#111827', fontWeight: 600 }}>{solution.title}</span>
          </div>

          <div style={{ maxWidth: '960px' }}>
            <span className="sb-badge" style={{ marginBottom: '20px' }}>
              {solution.category} SOLUTION
            </span>

            <h1 style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'clamp(34px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#000000',
              lineHeight: 1.15,
              margin: '0 0 20px 0',
            }}>
              {solution.heroHeadline || solution.headline || solution.title}
            </h1>

            <p style={{
              fontSize: 'clamp(18px, 2.2vw, 22px)',
              color: '#4B5563',
              lineHeight: 1.55,
              marginBottom: '36px',
            }}>
              {solution.valueProposition || solution.summary}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link
                href={`/start-a-project?solution=${solution.slug}`}
                className="sb-btn sb-btn--primary"
              >
                Discuss This Solution
                <ArrowRight size={18} />
              </Link>
              <a href="#approach" className="sb-btn sb-btn--secondary">
                Explore Our Approach
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. THE BUSINESS CHALLENGE */}
      <section style={{ padding: '80px 0' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#598BFF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                The Operational Reality
              </span>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#000000', letterSpacing: '-0.02em', marginTop: '8px', marginBottom: '20px' }}>
                The Business Challenge
              </h2>
              <p style={{ fontSize: '17px', color: '#4B5563', lineHeight: 1.7, marginBottom: '24px' }}>
                {problemText}
              </p>
            </div>

            {(profiles.length > 0 || teams.length > 0) && (
              <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
                  Who this solution is tailored for:
                </h3>
                {profiles.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>Target Profiles</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {profiles.map((p, idx) => (
                        <span key={idx} style={{ backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB', borderRadius: '6px', padding: '6px 12px', fontSize: '13px', color: '#374151' }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {teams.length > 0 && (
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>Relevant Teams</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {teams.map((t, idx) => (
                        <span key={idx} style={{ backgroundColor: 'rgba(89, 139, 255, 0.08)', color: '#1D4ED8', borderRadius: '6px', padding: '6px 12px', fontSize: '13px', fontWeight: 500 }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* 3. WHAT THE SOLUTION ADDRESSES */}
      {solution.capabilities && solution.capabilities.length > 0 && (
        <section style={{ padding: '80px 0', backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
          <Container>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="sb-badge" style={{ marginBottom: '16px' }}>
                CAPABILITIES &amp; DELIVERABLES
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#000000', letterSpacing: '-0.02em', marginBottom: '16px' }}>
                What This Solution Delivers
              </h2>
              <p style={{ color: '#6B7280', fontSize: '17px', maxWidth: '640px', margin: '0 auto' }}>
                Specific engineering capabilities and modular deliverables configured to your architectural requirements.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {solution.capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    padding: '24px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: 'rgba(2, 196, 21, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckIcon size={14} color="#02C415" />
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: 0 }}>
                      {cap.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 4. HOW WE APPROACH IT (5 PHASES) */}
      {solution.phases && solution.phases.length > 0 && (
        <section id="approach" style={{ padding: '80px 0' }}>
          <Container>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="sb-badge" style={{ marginBottom: '16px' }}>
                DELIVERY LIFECYCLE
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#000000', letterSpacing: '-0.02em', marginBottom: '16px' }}>
                How We Approach It
              </h2>
              <p style={{ color: '#6B7280', fontSize: '17px', maxWidth: '640px', margin: '0 auto' }}>
                A disciplined, 5-stage engineering process ensuring predictability, visibility, and high code quality.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {solution.phases.map((phase, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    padding: '24px 20px',
                    position: 'relative',
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#598BFF', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    STAGE 0{idx + 1}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
                    {phase.name || phase.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.5, marginBottom: '16px' }}>
                    {phase.summary || phase.description}
                  </p>
                  {phase.deliverables && phase.deliverables.length > 0 && (
                    <div style={{ borderTop: '1px dashed #E5E7EB', paddingTop: '12px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: '6px' }}>
                        Deliverables
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {phase.deliverables.map((d, dIdx) => (
                          <li key={dIdx} style={{ fontSize: '12px', color: '#374151' }}>
                            • {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 5. POTENTIAL OUTCOMES */}
      {solution.outcomes && solution.outcomes.length > 0 && (
        <section style={{ padding: '80px 0', backgroundColor: '#000000', color: '#FFFFFF' }}>
          <Container>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span style={{ color: '#02C415', fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                TARGET VALUE
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '16px' }}>
                Intended Strategic Outcomes
              </h2>
              <p style={{ color: '#9CA3AF', fontSize: '17px', maxWidth: '640px', margin: '0 auto' }}>
                Realistic, verifiable commercial and architectural benefits designed to justify your technology investment.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {solution.outcomes.map((outcome, idx) => {
                const text = typeof outcome === 'string' ? outcome : (outcome.description || outcome.label || '');
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#111827',
                      border: '1px solid #1F2937',
                      borderRadius: '12px',
                      padding: '24px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <div style={{ marginTop: '3px', flexShrink: 0 }}>
                      <CheckIcon size={18} color="#02C415" />
                    </div>
                    <span style={{ fontSize: '15px', color: '#E5E7EB', lineHeight: 1.5 }}>
                      {text}
                    </span>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* 7. ENGAGEMENT OPTIONS */}
      {solution.engagementModels && solution.engagementModels.length > 0 && (
        <section style={{ padding: '80px 0' }}>
          <Container>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span className="sb-badge" style={{ marginBottom: '16px' }}>
                FLEXIBLE ENGAGEMENT MODELS
              </span>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#000000', letterSpacing: '-0.02em', marginBottom: '16px' }}>
                How We Partner With You
              </h2>
              <p style={{ color: '#6B7280', fontSize: '17px', maxWidth: '640px', margin: '0 auto' }}>
                Structured engagement frameworks designed to accommodate your team structure and project lifecycle.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              {solution.engagementModels.map((model, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '14px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
                      {model.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.5, marginBottom: '20px' }}>
                      {model.description}
                    </p>
                    <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px' }}>
                      <strong>Best for:</strong> {model.bestFor}
                    </div>
                  </div>
                  {(model.timeline || model.duration) && (
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#598BFF', backgroundColor: '#F0F5FF', padding: '6px 10px', borderRadius: '6px', textAlign: 'center' }}>
                      Timeline: {model.timeline || model.duration}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 8. FAQS */}
      {solution.faqs && solution.faqs.length > 0 && (
        <section style={{ padding: '80px 0', backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E7EB' }}>
          <Container>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <span className="sb-badge" style={{ marginBottom: '16px' }}>
                  FREQUENTLY ASKED QUESTIONS
                </span>
                <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#000000', letterSpacing: '-0.02em' }}>
                  Questions &amp; Practical Answers
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {solution.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      padding: '24px 28px',
                    }}
                  >
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                      {faq.question}
                    </h3>
                    <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 9. RELATED SOLUTIONS */}
      {relatedSolutions.length > 0 && (
        <section style={{ padding: '80px 0' }}>
          <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#000000', margin: 0 }}>
                Related Solutions
              </h2>
              <Link href="/solutions" style={{ fontSize: '14px', fontWeight: 600, color: '#598BFF', textDecoration: 'none' }}>
                View all 10 solutions →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {relatedSolutions.map((rel) => (
                <div
                  key={rel.slug}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#598BFF' }}>
                      {rel.category}
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: '6px 0 10px' }}>
                      <Link href={`/solutions/${rel.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {rel.title}
                      </Link>
                    </h3>
                    <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.5, marginBottom: '16px' }}>
                      {rel.summary}
                    </p>
                  </div>
                  <Link
                    href={`/solutions/${rel.slug}`}
                    style={{ fontSize: '13px', fontWeight: 600, color: '#598BFF', textDecoration: 'none' }}
                  >
                    Explore Solution →
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 10. FINAL CTA */}
      <section style={{ padding: '80px 0', backgroundColor: '#000000', color: '#FFFFFF', textAlign: 'center' }}>
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span style={{ color: '#02C415', fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
              LET&apos;S SOLVE THIS TOGETHER
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '20px' }}>
              Ready to explore {solution.title}?
            </h2>
            <p style={{ fontSize: '18px', color: '#9CA3AF', lineHeight: 1.6, marginBottom: '36px' }}>
              Start a project consultation to share your challenge and receive architectural recommendations from our senior team.
            </p>
            <Link
              href={`/start-a-project?solution=${solution.slug}`}
              className="sb-btn sb-btn--lg sb-btn--on-dark"
            >
              Discuss This Solution
              <ArrowRight size={18} />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
