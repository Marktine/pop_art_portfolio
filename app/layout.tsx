import type { Metadata } from "next";
import Link from 'next/link';
import { Anton, Work_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const workSans = Work_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Graphic Gallery | Stitch Matte Pop Art Portfolio",
  description: "A professional freelance portfolio themed on Mid-Century New York Pop Art.",
};

const ROUTE_MAP = [
  { label: "PORTFOLIO", link: "/" },
  { label: "ABOUT ME", link: "/about_me" },
  { label: "BLOG", link: "/blog" },
  { label: "SERVICES", link: "/#services" },
  { label: "INQUIRE", link: "/#contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${anton.variable} ${workSans.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-surface">
        <div className="min-h-screen flex flex-col bg-surface selection:bg-primary selection:text-white font-sans text-on-surface">
        {/* PERSISTENT HEADER GRID */}
        <header className="border-b-4 border-on-surface bg-surface sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
            {/* Logo Brand Box */}
            <div className="p-6 md:px-8 border-b-4 md:border-b-0 md:border-r-4 border-on-surface flex items-center bg-surface-bright md:w-80">
              <Link href="/" className="inline-block">
                <span className="display-lg text-4xl tracking-wider block font-anton uppercase text-on-surface hover:text-primary transition-colors">
                  STUDIO GRAPHIC
                </span>
                <span className="label-caps text-xs text-on-surface-variant block tracking-widest mt-1">
                  BRUTALIST CODE
                </span>
              </Link>
            </div>

            {/* Navigation Links Grid */}
            <Navbar routes={ROUTE_MAP} />
          </div>
        </header>
        {children}
        </div>
      </body>
    </html>
  );
}
