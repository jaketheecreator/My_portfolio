'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import CaseStudyCard from '@/components/CaseStudyCard';
import Footer from '@/components/Footer';
import Experience from '@/components/Experience';
import SoftwareTools from '@/components/SoftwareTools';
import ChatInterface from '@/components/ChatInterface';
import type { Metadata, CaseStudy, Tool, Experience as ExperienceType, ContactLink } from '@/lib/get-data';

interface HomeClientProps {
  metadata: Metadata;
  caseStudies: CaseStudy[];
  tools?: Tool[];
  experiences?: ExperienceType[];
  contactLinks?: ContactLink[];
}

export default function HomeClient({
  metadata,
  caseStudies,
  tools,
  experiences,
  contactLinks,
}: HomeClientProps) {
  const [isAiMode, setIsAiMode] = useState(false);

  const handleAiModeToggle = () => {
    setIsAiMode(!isAiMode);
  };

  if (isAiMode) {
    return <ChatInterface onClose={() => setIsAiMode(false)} />;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      <div className="animate-fade-in-up">
        <Header
          name={metadata.name}
          bio={metadata.bio}
          email={metadata.email}
          onAiModeToggle={handleAiModeToggle}
        />
      </div>

      {/* WORK Section */}
      <section className="mt-24 mb-16 animate-fade-in-up animate-delay-200">
        <h2 className="text-sm font-light text-zinc-400 mb-2 uppercase tracking-wider" style={{ fontFamily: 'monospace' }}>WORK</h2>
        <p className="text-base text-zinc-400 font-light mb-12">
          Below are some select projects, full walkthroughs on request.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {caseStudies.slice(0, 4).map((study, index) => (
            <div key={study.slug} className="animate-fade-in-up" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
              <CaseStudyCard
                title={study.title}
                summary={study.summary}
                coverImage={study.coverImage}
                slug={study.slug}
              />
            </div>
          ))}
        </div>
      </section>

      {experiences && experiences.length > 0 && (
        <div className="animate-fade-in-up animate-delay-400">
          <Experience experiences={experiences} />
        </div>
      )}

      {tools && tools.length > 0 && (
        <div className="animate-fade-in-up animate-delay-500">
          <SoftwareTools tools={tools.slice(0, 8)} />
        </div>
      )}

      <div className="animate-fade-in-up animate-delay-500">
        <Footer email={metadata.email} contactLinks={contactLinks} />
      </div>
    </div>
  );
}
