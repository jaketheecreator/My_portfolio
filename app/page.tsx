import { getPortfolioData } from '@/lib/get-data';
import HomeClient from '@/components/HomeClient';

export default async function Home() {
  try {
    const data = await getPortfolioData();
    const { metadata, caseStudies, shippedProjects, tools, experiences, contactLinks } = data;

    return (
      <HomeClient
        metadata={metadata}
        caseStudies={caseStudies}
        shippedProjects={shippedProjects}
        tools={tools}
        experiences={experiences}
        contactLinks={contactLinks}
      />
    );
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    throw error;
  }
}
