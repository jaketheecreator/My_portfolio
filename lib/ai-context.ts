import { getPortfolioData } from './get-data';

/**
 * Strips HTML tags and markdown from bio text for AI context
 */
function cleanBioText(bio: string): string {
  return bio
    // Remove HTML anchor tags but keep the text
    .replace(/\*\*<a href="[^"]*">(.*?)<\/a>\*\*/g, '$1')
    .replace(/<a href="[^"]*">(.*?)<\/a>/g, '$1')
    // Remove markdown bold markers
    .replace(/\*\*(.*?)\*\*/g, '$1')
    // Clean up extra whitespace
    .replace(/\n\n+/g, '\n\n')
    .trim();
}

export async function generatePortfolioContext(): Promise<string> {
  const data = await getPortfolioData();
  
  const { metadata, caseStudies } = data;

  // Clean bio text for AI context (remove HTML/markdown)
  const cleanBio = cleanBioText(metadata.bio);

  const projectsContext = caseStudies.map((project) => {
    const link = project.slug === 'gist' 
      ? 'https://gistweb3.com' 
      : project.slug === 'sperax' 
      ? 'https://sperax.io/' 
      : project.slug === 'chaquen' 
      ? 'https://chaquen.io/' 
      : project.slug === 'vaultcraft' 
      ? 'https://vaultcraft.io' 
      : `/work/${project.slug}`;
    
    return `- ${project.title}: ${project.summary}\n  Link: ${link}`;
  }).join('\n');

  return `
Name: ${metadata.name}
Role: Product Designer and Co-founder

Bio: ${cleanBio}

Projects:
${projectsContext}
`.trim();
}
