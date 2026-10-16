import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Engineering Inquiries | SOLVIXBIT',
  description:
    'Connect directly with SOLVIXBIT partners and senior solutions architects. Discuss custom software development, AI automation, and technical scopes with response within 24 hours.',
  keywords: [
    'Contact SOLVIXBIT',
    'Hire Software Engineers',
    'AI Consulting Inquiries',
    'Custom Software Quote',
    'Technology Partner',
  ],
  alternates: {
    canonical: 'https://www.solvixbit.com/contact',
  },
  openGraph: {
    title: 'Contact Us & Engineering Inquiries | SOLVIXBIT',
    description:
      'Connect directly with SOLVIXBIT partners and senior solutions architects. Discuss custom software development, AI automation, and technical scopes with response within 24 hours.',
    url: 'https://www.solvixbit.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
