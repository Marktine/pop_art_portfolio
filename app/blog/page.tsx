"use server";
import Link from "next/link";

import EmailSubscribe from "./components/EmailSubscribe";
import SidebarBlogPostItem from "./components/SidebarBlogPostItem";
import FeaturedPostCardItem from "./components/FeaturedPostCardItem";
import SecondaryGridPostItem from "./components/SecondaryGridPostItem";
import SearchBar from "./components/SearchBar";
import { getSortedPosts } from '../_utils/markdown';
import { BlogPriority } from "../_types/blog";

export default async function Blog(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await props.searchParams;
  const q = resolvedSearchParams.q;
  const searchQuery = typeof q === 'string' ? q : '';

  const gridPosts = await getSortedPosts(BlogPriority.NORMAL);
  const featuredPost = await getSortedPosts(BlogPriority.FEATURED);
  const sidebarPosts = await getSortedPosts(BlogPriority.SIDEBAR);

  // TODO: Need a way to optimize this!
  // May be at indexing at build time.
  const allPosts = [...featuredPost, ...sidebarPosts, ...gridPosts];
  const filteredPosts = searchQuery
    ? allPosts.filter((post) => {
        const query = searchQuery.toLowerCase();
        return (
          post.title?.toLowerCase().includes(query) ||
          post.description?.toLowerCase().includes(query) ||
          post.category?.toLowerCase().includes(query) ||
          post.tags?.toLowerCase().includes(query)
        );
      })
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-surface selection:bg-primary selection:text-white font-sans text-on-surface">
      <main className="flex-1">
        {/* Header Section */}
        <section className="border-b-4 border-on-surface bg-surface-container-high py-16 md:py-24 relative overflow-hidden">
          {/* Halftone Dot Pattern */}
          <div className="absolute inset-0 benday-dots-dark opacity-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="bg-tertiary-fixed text-on-tertiary-fixed font-mono text-xs font-bold tracking-widest px-4 py-1.5 border-2 border-on-surface inline-block mb-6 uppercase">
              LATEST UPDATES
            </div>
            <h1 className="display-lg text-5xl md:text-7xl uppercase leading-[0.9] mb-8">
              The Ink &amp; <span className="text-primary">Grit</span> <br />
              Journal.
            </h1>
            <p className="body-lg text-on-surface-variant max-w-2xl border-l-4 border-primary pl-6">
              Dispatches from the front lines of freelance design. A deep dive into the intersection
              of pop art, refined brutalism, and commercial creativity.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-12 md:py-20 bg-surface">
          {/* Search bar */}
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <SearchBar defaultValue={searchQuery} />
          </div>

          <div className="max-w-7xl mx-auto px-6">
            {searchQuery ? (
              // Search Results Layout
              filteredPosts.length > 0 ? (
                <div id="searchResultContainer">
                  <div className="mb-8">
                    <div className="bg-primary text-white font-mono text-xs font-bold tracking-widest px-4 py-1.5 border-2 border-on-surface inline-block mb-4 uppercase">
                      SEARCH RESULTS
                    </div>
                    <h2 className="headline-lg text-3xl md:text-5xl uppercase leading-[0.9]">
                      Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} for <span className="text-primary">"{searchQuery}"</span>
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-4 border-on-surface">
                    {filteredPosts.map((post, idx) => (
                      <SecondaryGridPostItem
                        shadowEffect={idx % 3 === 0}
                        dotPatternBackground={idx === filteredPosts.length - 1}
                        key={idx}
                        post={post}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                // No results found
                <div className="border-4 border-on-surface bg-surface-container-high p-12 text-center relative overflow-hidden">
                  <div className="absolute inset-0 benday-dots-dark opacity-10 pointer-events-none" />
                  <div className="relative z-10 max-w-lg mx-auto">
                    <div className="bg-primary text-white font-mono text-xs font-bold tracking-widest px-4 py-1.5 border-2 border-on-surface inline-block mb-6 uppercase">
                      ERROR // NO_MATCHES
                    </div>
                    <h3 className="headline-lg text-3xl md:text-5xl uppercase mb-6 leading-tight">
                      No Articles Found.
                    </h3>
                    <p className="body-lg text-on-surface-variant mb-8">
                      We searched high and low but couldn't find any dispatches matching <span className="font-bold text-primary">"{searchQuery}"</span>. Try checking your spelling or use more general terms.
                    </p>
                    <Link
                      href="/blog"
                      className="btn-brutalist inline-block bg-inverse-surface text-white font-anton text-xl py-4 px-8 border-4 border-on-surface hard-shadow uppercase cursor-pointer"
                    >
                      Clear Search
                    </Link>
                  </div>
                </div>
              )
            ) : (
              // Default Blog Layout
              <>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-4 border-on-surface">
                  {/* Featured Post */}
                  <FeaturedPostCardItem
                    post={featuredPost[0]}
                  />

                  {/* Sidebar Column */}
                  <div className="lg:col-span-4 flex flex-col divide-y-4 divide-on-surface">
                    {sidebarPosts.map((post, idx) => (
                      <SidebarBlogPostItem
                        key={idx}
                        post={post}
                      />
                    ))}
                  </div>
                </div>

                {/* Secondary Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-x-4 border-b-4 border-on-surface">
                  {gridPosts.map((post, idx) => (
                    <SecondaryGridPostItem
                      shadowEffect
                      dotPatternBackground
                      key={idx}
                      post={post}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="pb-20 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-primary text-white border-4 border-on-surface p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
              {/* Ben-Day Halftone Accent Circle */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 benday-dots-dark opacity-20 pointer-events-none rounded-full border-4 border-on-surface" />

              <div className="lg:w-1/2 relative z-10">
                <h2 className="headline-lg text-3xl md:text-5xl uppercase mb-6 leading-tight">
                  Get the Journal <br />
                  Direct to Inbox.
                </h2>
                <p className="body-lg opacity-95 text-white/90">
                  No fluff. No spam. Just raw insights into design and the creative process once a
                  month.
                </p>
              </div>
              <EmailSubscribe />
            </div>
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
            <Link href="/" className="hover:text-primary transition-colors">
              ← RETURN TO PORTFOLIO
            </Link>
            <span className="text-on-surface-variant/40">|</span>
            <span className="text-on-surface-variant/80">BUILT WITH NEXT.JS 16 & TAILWIND V4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
