import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amana Braimah | Product Designer & AI Developer",
  description: "A Product Designer crafting intentional digital experiences. Specialized in bridging the gap between design systems and AI-powered development.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Amana Braimah | Product Designer & AI Developer",
    description: "A Product Designer crafting intentional digital experiences. Specialized in bridging the gap between design systems and AI-powered development.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Amana Braimah - Product Designer & AI Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amana Braimah | Product Designer & AI Developer",
    description: "A Product Designer crafting intentional digital experiences. Specialized in bridging the gap between design systems and AI-powered development.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] relative">
        <div className="noise-overlay" />
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
