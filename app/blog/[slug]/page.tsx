'use server'
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/app/_utils/markdown";
import Image from 'next/image';

interface IBlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPage({ params }: IBlogPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tagsList = post.tags ? post.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];

  return (
    <div className="min-h-screen flex flex-col bg-surface selection:bg-primary selection:text-white font-sans text-on-surface">
      <main className="flex-1">
        {/* Banner Section */}
        <section className="border-b-4 border-on-surface bg-surface-bright py-12 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 benday-dots-light opacity-50 pointer-events-none" />
          <div className="flex flex-col gap-2 max-w-4xl mx-auto px-6 relative z-10">
            <Link
              href="/blog"
              className="label-caps text-xs text-primary font-bold hover:underline mb-6 inline-block"
            >
              ← BACK TO THE JOURNAL
            </Link>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-on-surface-variant">
              <span className="label-caps">
                {post.category} // {post.date}
              </span>
              
            </div>
            <h1 className="display-lg text-4xl md:text-6xl uppercase leading-tight text-on-surface">
              {post.title}
            </h1>
            <div className="flex gap-4 font-mono text-xs text-on-surface-variant">
              <span>{post.readingTime}</span>
              <span>•</span>
              <span>WRITTEN BY {post.author}</span>
            </div>
            {tagsList.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tagsList.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 border border-on-surface/30 bg-surface-container-low text-on-surface-variant"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-16 bg-surface">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 gap-12">
            {post.image && (
              <div className="border-4 border-on-surface overflow-hidden bg-white aspect-video relative max-w-full hard-shadow-lg">
                <Image alt={post.title} src={post.image} width={480} height={600} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Intro text */}
            <div className="border-l-4 border-primary pl-6 py-2">
              <p className="body-lg text-on-surface font-semibold italic">{post.description}</p>
            </div>

            {/* Article Content */}
            <article
              className="prose max-w-none prose-neutral prose-headings:font-anton prose-headings:uppercase"
              dangerouslySetInnerHTML={{ __html: post.contentHTML || "" }}
            />
          </div>
        </section>
      </main>

      {/* FOOTER GRID */}
      <footer className="border-t-4 border-on-surface bg-on-background text-inverse-on-surface py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-xs">
          <div>
            <span className="label-caps text-lg font-bold font-anton tracking-wider text-white block mb-1">
              STUDIO GRAPHIC // JOURNAL
            </span>
            <span className="text-on-surface-variant/60 block">
              © 2026. All rights reserved. Ink and code in perfect harmony.
            </span>
          </div>

          <div className="flex gap-6">
            <Link href="/blog" className="hover:text-primary transition-colors">
              ← BACK TO BLOG INDEX
            </Link>
            <span className="text-on-surface-variant/40">|</span>
            <Link href="/" className="hover:text-primary transition-colors">
              RETURN TO PORTFOLIO
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
