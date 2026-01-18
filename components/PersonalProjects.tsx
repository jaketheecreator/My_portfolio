interface PersonalProject {
  name: string;
  description: string;
  icon: string;
  url?: string;
}

interface PersonalProjectsProps {
  projects: PersonalProject[];
}

export default function PersonalProjects({ projects }: PersonalProjectsProps) {
  return (
    <section className="my-16">
      <h2 className="text-sm font-light text-gray-400 mb-6">Personal Projects:</h2>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.url || '#'}
            className="flex items-center justify-between p-4 border border-gray-800 rounded-sm hover:border-gray-700 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{project.icon}</span>
              <div>
                <div className="text-sm font-light">{project.name}</div>
                <div className="text-xs text-gray-500 font-light">{project.description}</div>
              </div>
            </div>
            <span className="text-gray-500 group-hover:text-white transition-colors">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
