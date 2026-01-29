interface ExperienceEntry {
  dates: string;
  role: string;
  company: string;
  description: string;
  logo?: string;
}

interface ExperienceProps {
  experiences: ExperienceEntry[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section className="mt-24 mb-16">
      <h2 className="text-sm font-normal text-zinc-400 mb-2 uppercase tracking-wider" style={{ fontFamily: 'monospace' }}>EXPERIENCE</h2>
      <p className="text-base text-zinc-400 font-light mb-12">
        Throughout my career, I've worked on various projects, from building scalable systems to designing user-friendly interfaces. Here's a brief overview.
      </p>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="flex gap-8">
            <div className="text-xs text-zinc-400 font-light flex-shrink-0 w-20">
              {exp.dates}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base text-white font-medium">{exp.role}</span>
                <span className="text-base text-white font-medium">•</span>
                <span className="text-base text-white font-medium">
                  {exp.company.includes('(') ? (
                    <>
                      {exp.company.split('(')[0].trim()}
                      <span className="text-base text-zinc-400 font-light"> ({exp.company.match(/\(([^)]+)\)/)?.[1]})</span>
                    </>
                  ) : (
                    exp.company
                  )}
                </span>
              </div>
              <p className="text-base text-zinc-400 font-light leading-relaxed">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
