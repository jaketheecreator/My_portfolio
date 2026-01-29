'use client';

import Link from 'next/link';
import { useState } from 'react';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

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

  const tooltipText = isExternalLink ? 'View live product' : 'View case study';

  const commonProps = {
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    className: 'block cursor-pointer no-underline group relative',
  };

  if (isExternalLink) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...commonProps}
      >
        {isHovered && (
          <span
            className="fixed pointer-events-none z-50 opacity-100 transition-opacity duration-0"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y - 40}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <span className="bg-zinc-800 text-white text-sm font-light px-4 py-2 rounded-full whitespace-nowrap border border-zinc-700">
              {tooltipText}
            </span>
          </span>
        )}
        {cardContent}
      </a>
    );
  }

  return (
    <Link 
      href={href}
      prefetch={true}
      {...commonProps}
    >
      {isHovered && (
        <span
          className="fixed pointer-events-none z-50 opacity-100 transition-opacity duration-0"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y - 40}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <span className="bg-zinc-800 text-white text-sm font-light px-4 py-2 rounded-full whitespace-nowrap border border-zinc-700">
            {tooltipText}
          </span>
        </span>
      )}
      {cardContent}
    </Link>
  );
}
