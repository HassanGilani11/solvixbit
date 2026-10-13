import React from 'react';

export interface StructuredDataProps {
  type?: 'Organization' | 'WebSite' | 'ProfessionalService';
}

export const StructuredData: React.FC<StructuredDataProps> = () => {
  const baseUrl = 'https://solvixbit.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SOLVIXBIT',
    alternateName: 'Solvixbit Technologies',
    url: baseUrl,
    logo: `${baseUrl}/assets/logo.png`,
    slogan: 'Technology That Solves.',
    description:
      'SOLVIXBIT is a technology solutions company helping businesses build, automate and scale through software engineering, AI, SaaS, ecommerce, mobile applications and digital transformation.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-555-7658',
      contactType: 'sales',
      email: 'hello@solvixbit.com',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://twitter.com/solvixbit',
      'https://linkedin.com/company/solvixbit',
      'https://github.com/solvixbit',
    ],
    knowsAbout: [
      'Software Engineering',
      'Artificial Intelligence',
      'Process Automation',
      'SaaS Development',
      'Cloud Architecture',
      'Ecommerce Platforms',
      'Mobile Application Development',
    ],
    priceRange: '$$$$',
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SOLVIXBIT',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
};
