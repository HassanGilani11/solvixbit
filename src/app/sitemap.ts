import { MetadataRoute } from 'next';
import { servicesData } from '../config/services';
import { SOLUTIONS } from '../config/solutions';
import { caseStudiesData } from '../config/work';
import { ARTICLES } from '../config/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.solvixbit.com').replace(/\/+$/, '');
  const now = new Date();

  // Static core brand and conversion routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/start-a-project`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ];

  // Dynamic industry solutions (10 comprehensive solution architectures)
  const solutionRoutes: MetadataRoute.Sitemap = SOLUTIONS.map((s) => ({
    url: `${baseUrl}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic engineering services (9 core capabilities)
  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic insight articles (published thought-leadership and engineering deep-dives)
  const insightRoutes: MetadataRoute.Sitemap = ARTICLES.filter((a) => a.status === 'published').map((a) => ({
    url: `${baseUrl}/insights/${a.slug}`,
    lastModified: new Date(a.updatedAt || a.publishedAt || now),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Dynamic case study routes (proven client outcomes and metrics)
  const workRoutes: MetadataRoute.Sitemap = caseStudiesData.map((w) => ({
    url: `${baseUrl}/work/${w.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...solutionRoutes, ...serviceRoutes, ...insightRoutes, ...workRoutes];
}
