import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { getPortfolioData } from '@/lib/get-data';

// Using Node.js runtime (default) for reliable stream handling
// Edge runtime can have issues with stream parsing in some cases
// export const runtime = 'edge';

/**
 * Generates the portfolio context string from the data file
 */
async function generatePortfolioContext(): Promise<string> {
  const data = await getPortfolioData();
  const { metadata, caseStudies, experiences } = data;

  // Clean bio text (remove HTML/markdown)
  const cleanBio = metadata.bio
    .replace(/\*\*<a href="[^"]*">(.*?)<\/a>\*\*/g, '$1')
    .replace(/<a href="[^"]*">(.*?)<\/a>/g, '$1')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\n\n+/g, '\n\n')
    .trim();

  // Format projects
  const projectsText = caseStudies.map((project) => {
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

  // Format experiences with dates
  const experiencesText = experiences && experiences.length > 0
    ? experiences.map((exp) => {
        // Clean company name (remove parentheses formatting)
        const companyName = exp.company.includes('(')
          ? exp.company.split('(')[0].trim()
          : exp.company;
        
        return `- ${exp.dates}: ${exp.role} at ${companyName}\n  ${exp.description}`;
      }).join('\n')
    : '';

  return `Name: ${metadata.name}
Role: Product Designer and Co-founder

Bio: ${cleanBio}

Projects:
${projectsText}

Work Experience:
${experiencesText || 'No detailed work history available.'}`;
}

export async function POST(req: Request) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate portfolio context from data file
    const portfolioContext = await generatePortfolioContext();

    const result = streamText({
      model: google('gemini-2.5-flash'),
      system: `You are Amana's AI assistant. Use the following context to answer questions about his work:

${portfolioContext}

Be professional, concise, and highlight his work on Salypay and Gist. You can answer questions about specific years, companies, roles, and dates based on the work experience provided. If asked about something not in the context, politely say you only know about Amana's professional portfolio.`,
      messages,
    });

    // Return the UI message stream response with explicit headers
    return result.toUIMessageStreamResponse();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return new Response(
      JSON.stringify({ 
        error: 'Error processing chat request',
        message: errorMessage
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
