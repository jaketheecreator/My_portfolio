import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getCaseStudyBySlug } from '@/lib/get-data';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const result = await getCaseStudyBySlug(params.slug);

  if (!result) {
    notFound();
  }

  const { caseStudy, data } = result;
  const { metadata, contactLinks } = data;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Header
        name={metadata.name}
        bio={metadata.bio}
        email={metadata.email}
      />
      <main>
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-white mb-8 inline-block transition-colors"
        >
          ← Back to portfolio
        </Link>
        <article className="mb-16">
          <div className="mb-8">
            <img
              src={caseStudy.coverImage}
              alt={caseStudy.title}
              className="w-full h-auto object-cover"
            />
          </div>
          <h1 className="text-3xl font-light mb-4">{caseStudy.title}</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-base text-gray-300 font-light leading-relaxed mb-6">
              {caseStudy.summary}
            </p>
            <div className="text-sm text-gray-400 font-light leading-relaxed whitespace-pre-line">
              {caseStudy.content}
            </div>
          </div>
        </article>
      </main>
      <Footer contactLinks={contactLinks} />
    </div>
  );
}
