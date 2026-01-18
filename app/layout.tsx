import type { Metadata } from "next";
import "./globals.css";
import AdminSwitcher from "@/components/AdminSwitcher";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Multi-disciplinary portfolio",
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
        <AdminSwitcher />
      </body>
    </html>
  );
}
