import { MetadataRoute } from 'next';
import { servicesData } from '../config/services';
import { SOLUTIONS } from '../config/solutions';
import { caseStudiesData } from '../config/work';
import { ARTICLES } from '../config/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://solvixbit.com';
  const lastModified = new Date();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/start-a-project`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/work`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic service routes
  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Dynamic solution routes (all 10 solutions)
  const solutionRoutes: MetadataRoute.Sitemap = SOLUTIONS.map((s) => ({
    url: `${baseUrl}/solutions/${s.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Dynamic insight articles routes (published starter articles)
  const insightRoutes: MetadataRoute.Sitemap = ARTICLES.filter((a) => a.status === 'published').map((a) => ({
    url: `${baseUrl}/insights/${a.slug}`,
    lastModified: new Date(a.updatedAt || a.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Dynamic case study routes
  const workRoutes: MetadataRoute.Sitemap = caseStudiesData.map((w) => ({
    url: `${baseUrl}/work/${w.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...solutionRoutes, ...insightRoutes, ...serviceRoutes, ...workRoutes];
}
