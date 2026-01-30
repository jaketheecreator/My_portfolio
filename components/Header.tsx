interface HeaderProps {
  name: string;
  bio: string;
  email: string;
  onAiModeToggle?: () => void;
}

export default function Header({ name, bio, email, onAiModeToggle }: HeaderProps) {
  // Process bio text to convert HTML links to styled React elements
  const processBio = (paragraph: string) => {
    const parts: (string | JSX.Element)[] = [];
    
    // Split by bold markers (including bold links) and regular links
    const regex = /(\*\*<a href="[^"]*">.*?<\/a>\*\*)|(\*\*.*?\*\*)|(<a href="[^"]*">.*?<\/a>)/g;
    let lastIndex = 0;
    let match;
    let key = 0;
    
    while ((match = regex.exec(paragraph)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${key++}`} className="text-zinc-400">
            {paragraph.substring(lastIndex, match.index)}
          </span>
        );
      }
      
      // Process match
      if (match[1]) {
        // Bold link (remove ** markers and extract link)
        const boldLinkMatch = match[1].match(/\*\*<a href="([^"]*)">(.*?)<\/a>\*\*/);
        if (boldLinkMatch) {
          const href = boldLinkMatch[1];
          const linkText = boldLinkMatch[2];
          // Extract email from mailto: links for title attribute (only for mailto links)
          const isMailto = href.startsWith('mailto:');
          const titleProps = isMailto ? { title: href.replace('mailto:', '') } : {};
          
          parts.push(
            <a
              key={`bold-link-${key++}`}
              href={href}
              {...titleProps}
              className="text-white hover:text-zinc-300 transition-colors font-medium border-b border-dotted border-white/30 hover:border-white/50"
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            >
              {linkText}
            </a>
          );
        }
      } else if (match[2]) {
        // Bold text (remove ** markers)
        const boldText = match[2].replace(/\*\*/g, '');
        parts.push(
          <strong key={`bold-${key++}`} className="text-white font-medium">
            {boldText}
          </strong>
        );
      } else if (match[3]) {
        // Regular link
        const linkMatch = match[3].match(/<a href="([^"]*)">(.*?)<\/a>/);
        if (linkMatch) {
          const href = linkMatch[1];
          const linkText = linkMatch[2];
          // Extract email from mailto: links for title attribute (only for mailto links)
          const isMailto = href.startsWith('mailto:');
          const titleProps = isMailto ? { title: href.replace('mailto:', '') } : {};
          
          parts.push(
            <a
              key={`link-${key++}`}
              href={href}
              {...titleProps}
              className="text-white hover:text-zinc-300 transition-colors border-b border-dotted border-white/30 hover:border-white/50"
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            >
              {linkText}
            </a>
          );
        }
      }
      
      lastIndex = regex.lastIndex;
    }
    
    // Add remaining text
    if (lastIndex < paragraph.length) {
      parts.push(
        <span key={`text-end-${key++}`} className="text-zinc-400">
          {paragraph.substring(lastIndex)}
        </span>
      );
    }
    
    return parts;
  };

  return (
    <header>
      {/* Profile Picture - left aligned */}
      <div className="mb-6">
        <div className="w-14 h-14 rounded-[0.85rem] overflow-hidden">
          <img
            src="/assets/My_icon.avif"
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name - left aligned */}
      <div className="mb-2">
        <h1 className="text-2xl font-medium text-white">
          {name}
        </h1>
      </div>

      {/* Bio - left aligned */}
      <div className="text-zinc-400 leading-relaxed">
        {bio.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-base font-light mb-6 last:mb-0">
            {processBio(paragraph)}
          </p>
        ))}
      </div>

      {/* AI Mode Toggle Button */}
      {onAiModeToggle && (
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={onAiModeToggle}
            className="text-base text-white font-light border-b border-dotted border-white/30 hover:border-white/50 transition-colors cursor-pointer"
          >
            Ask my AI
          </button>
          <span className="relative inline-flex items-center px-2 py-0.5 rounded-full bg-zinc-900/50 text-xs text-zinc-400 font-light uppercase tracking-wider">
            BETA
          </span>
        </div>
      )}
    </header>
  );
}
