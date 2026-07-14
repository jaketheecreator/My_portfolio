import projectsData from '@/data/projects.json';

export interface CaseStudy {
  title: string;
  summary: string;
  coverImage: string;
  slug: string;
  content: string;
}

export interface Metadata {
  name: string;
  bio: string;
  email: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Experience {
  dates: string;
  role: string;
  company: string;
  description: string;
  logo?: string;
}

export interface Tool {
  name: string;
  icon: string;
}

export interface ShippedProject {
  title: string;
  summary: string;
  coverImage: string;
  slug: string;
  link: string | null;
  comingSoon: boolean;
  content: string;
}

export interface ContactLink {
  name: string;
  url: string;
  value: string;
  icon: 'email' | 'x' | 'github' | 'linkedin' | 'dribbble';
}

export interface PortfolioData {
  metadata: Metadata;
  caseStudies: CaseStudy[];
  shippedProjects?: ShippedProject[];
  tools?: Tool[];
  experiences?: Experience[];
  contactLinks?: ContactLink[];
}

/**
 * Fetches all portfolio data from the single projects.json file
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  return projectsData as PortfolioData;
}

/**
 * Finds a specific case study by slug, checking both caseStudies and shippedProjects
 */
export async function getCaseStudyBySlug(slug: string): Promise<{ caseStudy: CaseStudy | ShippedProject; data: PortfolioData } | null> {
  const study = projectsData.caseStudies.find(cs => cs.slug === slug);

  if (study) {
    return { caseStudy: study, data: projectsData as PortfolioData };
  }

  const shipped = projectsData.shippedProjects?.find(sp => sp.slug === slug);

  if (shipped) {
    return { caseStudy: shipped, data: projectsData as PortfolioData };
  }

  return null;
}
