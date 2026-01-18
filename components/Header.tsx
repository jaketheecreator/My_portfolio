import Link from 'next/link';

interface HeaderProps {
  name: string;
  bio: string;
  email: string;
}

export default function Header({ name, bio, email }: HeaderProps) {
  // Process bio text to convert HTML links to styled React elements
  const processBio = (text: string) => {
    const parts: (string | JSX.Element)[] = [];
    const lines = text.split('\n\n');
    
    lines.forEach((line, lineIndex) => {
      if (lineIndex > 0) {
        parts.push(<br key={`br-${lineIndex}`} />);
        parts.push(<br key={`br2-${lineIndex}`} />);
      }
      
      // Split by bold markers and links
      const regex = /(\*\*.*?\*\*)|(<a href="[^"]*">.*?<\/a>)/g;
      let lastIndex = 0;
      let match;
      let key = 0;
      
      while ((match = regex.exec(line)) !== null) {
        // Add text before match
        if (match.index > lastIndex) {
          parts.push(
            <span key={`text-${lineIndex}-${key++}`} className="text-white">
              {line.substring(lastIndex, match.index)}
            </span>
          );
        }
        
        // Process match
        if (match[1]) {
          // Bold text (remove ** markers)
          const boldText = match[1].replace(/\*\*/g, '');
          parts.push(
            <strong key={`bold-${lineIndex}-${key++}`} className="text-white font-medium">
              {boldText}
            </strong>
          );
        } else if (match[2]) {
          // Link
          const linkMatch = match[2].match(/<a href="([^"]*)">(.*?)<\/a>/);
          if (linkMatch) {
            parts.push(
              <a
                key={`link-${lineIndex}-${key++}`}
                href={linkMatch[1]}
                className="text-blue-400 font-medium border-b border-blue-400/30 hover:border-blue-400 transition-all pb-0.5"
              >
                {linkMatch[2]}
              </a>
            );
          }
        }
        
        lastIndex = regex.lastIndex;
      }
      
      // Add remaining text
      if (lastIndex < line.length) {
        parts.push(
          <span key={`text-end-${lineIndex}-${key++}`} className="text-white">
            {line.substring(lastIndex)}
          </span>
        );
      }
    });
    
    return parts;
  };

  return (
    <header className="mb-12 pt-8">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link href="/">
            <h1 className="text-2xl font-light mb-4 hover:text-white transition-colors cursor-pointer">
              {name}
            </h1>
          </Link>
          <div className="text-white leading-relaxed max-w-2xl">
            <p className="text-sm font-light">
              {processBio(bio)}
            </p>
          </div>
        </div>
        <a
          href={`mailto:${email}`}
          className="text-sm text-gray-400 hover:text-white transition-colors font-light ml-6 flex-shrink-0"
        >
          Email me
        </a>
      </div>
    </header>
  );
}
