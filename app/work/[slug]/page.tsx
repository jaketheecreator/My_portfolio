import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getCaseStudyBySlug } from '@/lib/get-data';

interface PageProps {
  params: {
    slug: string;
  };
}

interface ContentSection {
  heading: string | null;
  paragraphs: string[];
}

function parseContentSections(content: string): ContentSection[] {
  const blocks = content.split('\n\n');
  const sections: ContentSection[] = [];

  for (const block of blocks) {
    const headingMatch = block.match(/^\*\*(.+)\*\*$/);

    if (headingMatch) {
      sections.push({ heading: headingMatch[1], paragraphs: [] });
    } else if (sections.length > 0) {
      sections[sections.length - 1].paragraphs.push(block);
    } else {
      sections.push({ heading: null, paragraphs: [block] });
    }
  }

  return sections;
}

export default async function CaseStudyPage({ params }: PageProps) {
  const result = await getCaseStudyBySlug(params.slug);

  if (!result) {
    notFound();
  }

  const { caseStudy, data } = result;
  const { contactLinks } = data;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <main>
        <div className="flex justify-between items-center mb-8 animate-fade-in-up">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white inline-block transition-colors"
          >
            ← Back to portfolio
          </Link>
          {'link' in caseStudy && caseStudy.link && (
            <a
              href={caseStudy.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium text-white overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
              }}
            >
              <span
                className="absolute inset-0 rounded-full opacity-80"
                style={{
                  background: 'conic-gradient(from var(--border-angle), transparent, #666, transparent 40%)',
                  animation: 'rotate-border 3s linear infinite',
                }}
              />
              <span className="absolute inset-[1.5px] rounded-full" />
              <span className="relative z-10">View live project</span>
            </a>
          )}
        </div>
        <article className="mb-16">
          <div className="mb-8 overflow-hidden rounded-[0.65rem] animate-fade-in-up animate-delay-100">
            <img
              src={caseStudy.coverImage}
              alt={caseStudy.title}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-base text-gray-300 font-light leading-relaxed mb-6 animate-fade-in-up animate-delay-200">
              {caseStudy.summary}
            </p>
            <div className="text-sm text-gray-400 font-light leading-relaxed">
              {parseContentSections(caseStudy.content).map((section, index) => {
                const sectionDelay = ['animate-delay-300', 'animate-delay-400', 'animate-delay-500'][
                  Math.min(index, 2)
                ];

                return (
                <div key={index} className={`mb-20 animate-fade-in-up ${sectionDelay}`}>
                  {section.heading && (
                    <h3
                      className="text-sm font-light text-zinc-400 mb-3 uppercase tracking-wider"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {section.heading}
                    </h3>
                  )}
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-4 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                  {section.heading && (
                    <div className="aspect-[6/5] rounded-[0.65rem] border-2 border-dashed border-zinc-800 flex items-center justify-center text-zinc-500 text-sm">
                      Screenshot or clip goes here
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          </div>
        </article>
      </main>
      <Footer contactLinks={contactLinks} />
    </div>
  );
}
