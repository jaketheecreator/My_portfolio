interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

interface FooterProps {
  socialLinks?: SocialLink[];
}

export default function Footer({ socialLinks }: FooterProps) {
  const defaultLinks: SocialLink[] = socialLinks || [
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'in' },
    { name: 'Website', url: 'https://example.com', icon: '🌐' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'X' },
  ];

  return (
    <footer className="mt-20 pb-12">
      <section className="mb-12">
        <h2 className="text-sm font-light text-gray-400 mb-6">Connect with me here:</h2>
        <div className="flex gap-6">
          {defaultLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors font-light"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </section>
    </footer>
  );
}
