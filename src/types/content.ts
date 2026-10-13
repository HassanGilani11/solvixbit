export interface Benefit {
  title: string;
  description: string;
  metric?: string;
}

export interface Capability {
  title: string;
  description: string;
  tag?: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  kicker: string;
  headline: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  benefits: Benefit[];
  capabilities: Capability[];
  techStack: string[];
  deliverables: string[];
  featuredCaseStudySlug?: string;
}

export interface SolutionPhase {
  phase?: string;
  name?: string;
  title?: string;
  summary?: string;
  description?: string;
  deliverables: string[];
}

export interface SolutionEngagementModel {
  title: string;
  duration?: string;
  timeline?: string;
  description: string;
  bestFor: string;
}

export interface SolutionFAQ {
  question: string;
  answer: string;
}

export interface SolutionDetail {
  slug: string;
  title: string;
  kicker?: string;
  category: string;
  headline?: string;
  heroHeadline?: string;
  summary: string;
  valueProposition?: string;
  problem?: string;
  problemStatement?: string;
  featured?: boolean;
  challengeDetails?: {
    title: string;
    description: string;
  }[];
  capabilities: {
    title: string;
    description: string;
  }[];
  scopeBoundaries?: string[];
  approach?: string;
  phases: SolutionPhase[];
  outcomes: any[];
  targetAudience?: {
    profiles?: string[];
    businessTypes?: string[];
    teams?: string[];
    useCases?: string[];
  };
  engagementModels: SolutionEngagementModel[];
  faqs: SolutionFAQ[];
  useCases?: { title: string; scenario: string; resolution: string }[];
  servicesIncluded?: string[];
  relatedSolutions?: string[];
  relatedSolutionSlugs?: string[];
}

export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  headline: string;
  summary: string;
  industry: string;
  year: string;
  services: string[];
  metrics: { label: string; value: string }[];
  challenge: string;
  solution: string;
  architectureDetails: string[];
  techStack: string[];
  image?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  specialty: string;
  avatarColor: string;
}

export interface ArticleAuthor {
  name: string;
  role: string;
  avatar?: string;
  avatarColor?: string;
}

export interface TableOfContentItem {
  id: string;
  title: string;
}

export interface ArticleSection {
  id?: string;
  heading: string;
  content: string | string[];
  keyTakeaway?: string;
  subsections?: {
    title: string;
    content: string;
  }[];
}

export interface Article {
  id?: string;
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  metaDescription?: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime?: string;
  readingTime?: string;
  publishedAt: string;
  updatedAt?: string;
  status: 'published' | 'draft';
  author: ArticleAuthor;
  coverImage?: string;
  tableOfContents?: TableOfContentItem[];
  intro?: string;
  sections: ArticleSection[];
  conclusion?: string;
  relatedSolutionSlug?: string;
  relatedSolutionTitle?: string;
  relatedArticleSlugs?: string[];
}

export interface ProjectDiscoveryData {
  objectives: string[];
  challenges?: string[];
  challenge?: string;
  customChallenge?: string;
  challengeCustom?: string;
  scopeDeliverables?: string[];
  scope?: string[];
  budgetRange?: string;
  budget?: string;
  timeline: string;
  fullName: string;
  email?: string;
  workEmail?: string;
  companyName: string;
  website?: string;
  projectTitle?: string;
  projectDescription: string;
  preferredContact?: string;
  additionalNotes?: string;
  preselectedSolution?: string;
}

export interface ProjectSubmissionResponse {
  success: boolean;
  referenceId?: string;
  message?: string;
  error?: string;
  validationErrors?: Record<string, string>;
  summary?: {
    name?: string;
    email?: string;
    company?: string;
    objectiveSummary?: string;
    budgetRange?: string;
    timeline?: string;
  };
}
