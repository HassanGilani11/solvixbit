import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start a Project & Discovery Consultation | SOLVIXBIT',
  description:
    'Kick off your project with SOLVIXBIT. Scope budgets, timelines, and technical requirements for custom software, SaaS products, AI workflows, or cloud architectures.',
  keywords: [
    'Start a Project',
    'Project Discovery Brief',
    'Custom Software Scoping',
    'MVP Development Estimate',
    'AI Architecture Consultation',
  ],
  alternates: {
    canonical: 'https://www.solvixbit.com/start-a-project',
  },
  openGraph: {
    title: 'Start a Project & Discovery Consultation | SOLVIXBIT',
    description:
      'Kick off your project with SOLVIXBIT. Scope budgets, timelines, and technical requirements for custom software, SaaS products, AI workflows, or cloud architectures.',
    url: 'https://www.solvixbit.com/start-a-project',
  },
};

export default function StartAProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
