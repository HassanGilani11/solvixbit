import React from 'react';
import type { Metadata, Viewport } from 'next';
import { StructuredData } from '../components/seo/StructuredData';
import { Navbar, Footer } from '../components/navigation';
import { ChatWidget } from '../components/chat';
import '../styles/tokens.css';
import '../styles/motion.css';
import '../styles/components.css';
import '../styles/chat.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.solvixbit.com';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#070B14' },
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SOLVIXBIT | Technology That Solves.',
    template: '%s | SOLVIXBIT',
  },
  description:
    'SOLVIXBIT is a technology solutions company helping businesses build, automate and scale through custom software engineering, AI workflows, SaaS platforms, headless ecommerce, and enterprise cloud systems.',
  keywords: [
    'Technology Solutions',
    'Software Engineering',
    'AI & Automation',
    'SaaS Development',
    'Digital Transformation',
    'Enterprise Cloud Architecture',
    'Custom Web Development',
    'Headless Ecommerce',
    'Business Process Automation',
    'API Integration',
  ],
  authors: [{ name: 'SOLVIXBIT Engineering Team', url: siteUrl }],
  creator: 'SOLVIXBIT',
  publisher: 'SOLVIXBIT',
  applicationName: 'SOLVIXBIT',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'SOLVIXBIT | Technology That Solves.',
    description:
      'We design and build software, AI, automation and digital solutions that help businesses work smarter, move faster and scale with confidence.',
    siteName: 'SOLVIXBIT',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'SOLVIXBIT | Technology That Solves.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLVIXBIT | Technology That Solves.',
    description:
      'We design and build software, AI, automation and digital solutions that help businesses work smarter, move faster and scale with confidence.',
    creator: '@solvixbit',
    site: '@solvixbit',
    images: [`${siteUrl}/og-image.jpg`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <StructuredData />
      </head>
      <body suppressHydrationWarning style={{ margin: 0, padding: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* WCAG 2.2 AA Accessibility Skip Link */}
        <a href="#main-content" className="sb-skip-link">
          Skip to main content
        </a>
        <Navbar />
        <div style={{ flex: '1 0 auto' }}>
          {children}
        </div>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
