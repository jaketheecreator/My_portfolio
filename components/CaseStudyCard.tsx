import Link from 'next/link';

interface CaseStudyCardProps {
  title: string;
  summary: string;
  coverImage: string;
  slug: string;
}

export default function CaseStudyCard({
  title,
  summary,
  coverImage,
  slug,
}: CaseStudyCardProps) {
  // Verify slug is received correctly
  if (!slug) {
    console.error('CaseStudyCard: Missing slug prop');
    return null;
  }

  // Use next/link for client-side navigation (no page refresh)
  const href = `/work/${slug}`;

  return (
    <Link 
      href={href}
      className="block cursor-pointer no-underline"
      prefetch={true}
    >
      <article className="w-full">
        <div className="mb-4 overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
          />
        </div>
        <h2 className="text-lg font-light mb-2 hover:text-white transition-colors">
          {title}
        </h2>
        <p className="text-sm text-gray-400 font-light leading-relaxed">
          {summary}
        </p>
      </article>
    </Link>
  );
}
