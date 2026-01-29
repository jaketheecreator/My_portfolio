interface Tool {
  name: string;
  icon: string;
}

interface SoftwareToolsProps {
  tools: Tool[];
}

const ToolIcon = ({ name, icon }: { name: string; icon: string }) => {
  const iconClass = "w-8 h-8 object-contain";
  
  // Framer logo (SVG)
  if (icon === 'framer') {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 0h16v8h-8zm0 8h8l8 8H4zm0 8h8v8H4z" fill="currentColor"/>
      </svg>
    );
  }
  
  // Map icon types to image paths
  const iconMap: Record<string, string> = {
    'figma': '/assets/figma_icon.png',
    'cursor': '/assets/cursor-ai_icon.png',
    'cursor-ai': '/assets/cursor-ai_icon.png',
    'jitter': '/assets/Jitter_icon.png',
    'gpt': '/assets/chatgpt-icon.webp',
    'openai': '/assets/chatgpt-icon.webp',
    'chatgpt': '/assets/chatgpt-icon.webp',
    'gemini': '/assets/gemini_icon.webp',
    'github': '/assets/github-white-icon.webp',
  };
  
  const imagePath = iconMap[icon.toLowerCase()];
  
  if (imagePath) {
    // Add rounded corners for Jitter logo
    const roundedClass = icon.toLowerCase() === 'jitter' ? 'rounded-lg' : '';
    return (
      <img 
        src={imagePath} 
        alt={name} 
        className={`${iconClass} ${roundedClass}`}
      />
    );
  }
  
  // Fallback to emoji for other tools
  return <span className="text-4xl">{icon}</span>;
};

export default function SoftwareTools({ tools }: SoftwareToolsProps) {
  return (
    <section className="mt-24 mb-16">
      <h2 className="text-sm font-light text-zinc-400 mb-8 uppercase tracking-wider" style={{ fontFamily: 'monospace' }}>STACK</h2>
      <div className="flex items-center gap-6 flex-nowrap">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
          >
            <ToolIcon name={tool.name} icon={tool.icon} />
          </div>
        ))}
      </div>
    </section>
  );
}
