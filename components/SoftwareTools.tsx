interface Tool {
  name: string;
  icon: string;
}

interface SoftwareToolsProps {
  tools: Tool[];
}

export default function SoftwareTools({ tools }: SoftwareToolsProps) {
  return (
    <section className="my-16">
      <h2 className="text-sm font-light text-gray-400 mb-6">Softwares/Tools:</h2>
      <div className="grid grid-cols-2 gap-4">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 border border-gray-800 rounded-sm hover:border-gray-700 transition-colors"
          >
            <span className="text-2xl">{tool.icon}</span>
            <span className="text-sm font-light">{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
