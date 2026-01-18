import Header from '@/components/Header';
import CaseStudyCard from '@/components/CaseStudyCard';
import Footer from '@/components/Footer';
import SoftwareTools from '@/components/SoftwareTools';
import PersonalProjects from '@/components/PersonalProjects';
import { getPortfolioData, getPortfolioType } from '@/lib/get-data';

export default async function Home() {
  const niche = await getPortfolioType();
  console.log('Current Niche:', niche);
  
  const data = await getPortfolioData();
  const { metadata, caseStudies, tools, personalProjects, socialLinks } = data;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Header
        name={metadata.name}
        bio={metadata.bio}
        email={metadata.email}
      />
      <main>
        <section className="mb-16">
          <h2 className="text-sm font-light text-gray-400 mb-6">Case Studies:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-16">
            {caseStudies.map((study) => (
              <CaseStudyCard
                key={study.slug}
                title={study.title}
                summary={study.summary}
                coverImage={study.coverImage}
                slug={study.slug}
              />
            ))}
          </div>
        </section>
        <SoftwareTools tools={tools} />
        {personalProjects && personalProjects.length > 0 && (
          <PersonalProjects projects={personalProjects} />
        )}
      </main>
      <Footer socialLinks={socialLinks} />
    </div>
  );
}
