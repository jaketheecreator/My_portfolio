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

export interface ContactLink {
  name: string;
  url: string;
  value: string;
  icon: 'email' | 'x' | 'github' | 'linkedin' | 'dribbble';
}

export interface PortfolioData {
  metadata: Metadata;
  caseStudies: CaseStudy[];
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
 * Finds a specific case study by slug
 */
export async function getCaseStudyBySlug(slug: string): Promise<{ caseStudy: CaseStudy; data: PortfolioData } | null> {
  const study = projectsData.caseStudies.find(cs => cs.slug === slug);

  if (study) {
    return { caseStudy: study, data: projectsData as PortfolioData };
  }

  return null;
}
