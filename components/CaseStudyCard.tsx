'use client';

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

  // Special handling for all cards - open external URLs
  const isGist = slug === 'gist';
  const isSperax = slug === 'sperax';
  const isChaquen = slug === 'chaquen';
  const isVaultcraft = slug === 'vaultcraft';
  const isExternalLink = isGist || isSperax || isChaquen || isVaultcraft;
  
  let href: string;
  if (isGist) {
    href = 'https://gistweb3.com';
  } else if (isSperax) {
    href = 'https://sperax.io/';
  } else if (isChaquen) {
    href = 'https://chaquen.io/';
  } else if (isVaultcraft) {
    href = 'https://vaultcraft.io';
  } else {
    href = `/work/${slug}`;
  }

  const cardContent = (
    <article className="w-full">
      <div className="mb-4 overflow-hidden rounded-[0.65rem]">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
        />
      </div>
      <h2 className="text-base font-medium mb-1 text-white group-hover:text-zinc-300 transition-colors">
        {title}
      </h2>
      <p className="text-sm text-zinc-400 font-light whitespace-pre-line overflow-hidden" style={{ lineHeight: '1.5', height: '3.9375rem' }}>
        {summary}
      </p>
    </article>
  );

  if (isExternalLink) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer no-underline group"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link 
      href={href}
      prefetch={true}
      className="block cursor-pointer no-underline group"
    >
      {cardContent}
    </Link>
  );
}
