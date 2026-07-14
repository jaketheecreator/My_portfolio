'use client';

import Link from 'next/link';
import { Lock } from 'lucide-react';

interface ShippedProjectCardProps {
  title: string;
  summary: string;
  coverImage: string;
  slug: string;
  link: string | null;
  comingSoon: boolean;
  content: string;
}

export default function ShippedProjectCard({
  title,
  summary,
  coverImage,
  link,
  comingSoon,
}: ShippedProjectCardProps) {
  const cardContent = (
    <article className={`w-full ${comingSoon ? 'opacity-60' : ''}`}>
      <div className="mb-4 overflow-hidden rounded-[0.65rem]">
        {comingSoon ? (
          <div className="w-full h-48 bg-zinc-900 flex items-center justify-center">
            <Lock className="w-8 h-8 text-zinc-600" />
          </div>
        ) : (
          <img
            src={coverImage}
            alt={title}
            className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
          />
        )}
      </div>
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-base font-medium text-white group-hover:text-zinc-300 transition-colors">
          {title}
        </h2>
        {comingSoon && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-zinc-900/50 text-xs text-zinc-400 font-light uppercase tracking-wider">
            Coming soon
          </span>
        )}
      </div>
      <p className="text-sm text-zinc-400 font-light whitespace-pre-line overflow-hidden" style={{ lineHeight: '1.5', height: '3.9375rem' }}>
        {summary}
      </p>
    </article>
  );

  if (comingSoon || !link) {
    return cardContent;
  }

  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      prefetch={true}
      className="block cursor-pointer no-underline group"
    >
      {cardContent}
    </Link>
  );
}
