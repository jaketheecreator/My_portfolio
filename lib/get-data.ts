import { headers } from 'next/headers';
import web2Data from '@/data/web2-data.json';
import web3Data from '@/data/web3-data.json';
import combinedData from '@/data/combined-data.json';

export type PortfolioType = 'web2' | 'web3' | 'combined';

export interface CaseStudy {
  title: string;
  summary: string;
  coverImage: string;
  slug: string;
  content: string;
  type?: string;
}

export interface Metadata {
  name: string;
  bio: string;
  email: string;
}

export interface Tool {
  name: string;
  icon: string;
}

export interface PersonalProject {
  name: string;
  description: string;
  icon: string;
  url?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  metadata: Metadata;
  caseStudies: CaseStudy[];
  tools: Tool[];
  personalProjects?: PersonalProject[];
  socialLinks?: SocialLink[];
}

/**
 * Gets the portfolio type from the request headers (set by middleware)
 */
export async function getPortfolioType(): Promise<PortfolioType> {
  const headersList = await headers();
  return (headersList.get('x-portfolio-type') || 'combined') as PortfolioType;
}

/**
 * Fetches portfolio data based on the current subdomain
 * - web2 subdomain: returns only web2 projects
 * - web3 subdomain: returns only web3 projects
 * - main domain: returns combined (all projects)
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const portfolioType = await getPortfolioType();
  
  console.log('[getPortfolioData] Portfolio type detected:', portfolioType);

  if (portfolioType === 'web2') {
    console.log('[getPortfolioData] Returning Web2 data with', web2Data.caseStudies.length, 'case studies');
    return web2Data as PortfolioData;
  } else if (portfolioType === 'web3') {
    console.log('[getPortfolioData] Returning Web3 data with', web3Data.caseStudies.length, 'case studies');
    return web3Data as PortfolioData;
  } else {
    console.log('[getPortfolioData] Returning Combined data with', combinedData.caseStudies.length, 'case studies');
    return combinedData as PortfolioData;
  }
}

/**
 * Finds a specific case study by slug across all portfolios
 */
export async function getCaseStudyBySlug(slug: string): Promise<{ caseStudy: CaseStudy; data: PortfolioData } | null> {
  const web2Study = web2Data.caseStudies.find(cs => cs.slug === slug);
  const web3Study = web3Data.caseStudies.find(cs => cs.slug === slug);
  const combinedStudy = combinedData.caseStudies.find(cs => cs.slug === slug);

  if (web2Study) {
    return { caseStudy: web2Study, data: web2Data as PortfolioData };
  } else if (web3Study) {
    return { caseStudy: web3Study, data: web3Data as PortfolioData };
  } else if (combinedStudy) {
    return { caseStudy: combinedStudy, data: combinedData as PortfolioData };
  }

  return null;
}
