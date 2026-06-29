"use client";

import React, { useState } from "react";
import Link from "next/link";

import { BlogPost } from '../_types/blog';
import FeaturedPostCardItem from "./components/FeaturedPostCardItem";
import SidebarBlogPostItem from "./components/SidebarBlogPostItem";
import SecondaryGridPostItem from "./components/SecondaryGridPostItem";
import { Mail } from "lucide-react";

export default function Blog() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.ChangeEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 5000);
    }
  };

  const featuredPost: BlogPost = {
    id: "featured-1",
    slug: "death-of-minimalist-aesthetic",
    title: "The Death of the Minimalist Corporate Aesthetic",
    date: "01.24.24",
    category: "FEATURED",
    image: "/images/pop_art_nyc.jpg",
    description:
      "Why the safe, 'blanding' of corporate identities is finally losing its grip. We explore how Refined Brutalism is bringing back the soul of commercial art through heavy weights and unapologetic geometry.",
  };

  const sidebarPosts: BlogPost[] = [
    {
      id: "side-1",
      slug: "grids-cage-or-catalyst",
      title: "Grids as Cage or Catalyst?",
      date: "01.20.24",
      category: "DESIGN THEORY",
      image: "/images/pop_art_designer.jpg",
      description:
        "Breaking the 12-column cage without losing the structural integrity of your layout.",
    },
    {
      id: "side-2",
      slug: "pricing-the-unpriced",
      title: "Pricing the Unpriced",
      date: "01.15.24",
      category: "BUSINESS",
      description:
        "How to value artistic intuition in a data-driven commercial landscape.",
    },
  ];

  const gridPosts: BlogPost[] = [
    {
      id: "grid-1",
      slug: "freelance-manifesto",
      title: "The Freelance Manifesto",
      date: "01.10.24",
      category: "MANIFESTO",
      image: "/images/pop_art_tools.jpg",
      description:
        "Redefining professional autonomy in the era of automated creative tools.",
    },
    {
      id: "grid-2",
      slug: "limited-palettes",
      title: "Limited Palettes",
      date: "01.05.24",
      category: "COLOR THEORY",
      description:
        "Why restricting your color choices leads to more powerful, memorable visual identities.",
      customVisual: (
        <div className="mb-6 aspect-square bg-tertiary-container border-4 border-on-surface flex items-center justify-center p-6 text-center">
          <h4 className="headline-md text-on-tertiary-container uppercase">Is Color Dead?</h4>
        </div>
      ),
    },
    {
      id: "grid-3",
      slug: "brutalist-structures",
      title: "Brutalist Structures",
      date: "12.28.23",
      category: "ARCHITECTURE",
      image: "/images/pop_art_nyc.jpg",
      description:
        "Finding beauty in the raw, unrefined shapes of 1960s New York architecture.",
    },
  ];

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
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-4 border-on-surface">
              {/* Featured Post */}
              <FeaturedPostCardItem
                post={featuredPost}
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

              <div className="w-full lg:w-1/2 max-w-md relative z-10">
                {subscribed ? (
                  <div className="bg-surface text-on-surface border-4 border-on-surface p-6 text-center">
                    <span className="label-caps text-xs font-bold text-primary block mb-2">
                      SUCCESS // INKED
                    </span>
                    <h3 className="headline-md text-2xl uppercase mb-2">YOU ARE SUBSCRIBED!</h3>
                    <p className="body-md text-on-surface-variant">
                      Welcome to the journal. Look out for our next dispatch.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                    <input
                      className="bg-surface text-on-surface font-mono text-xs font-bold p-4 border-4 border-on-surface focus:ring-0 focus:border-on-surface focus:bg-tertiary-fixed outline-none transition-colors placeholder:text-on-surface-variant/50"
                      placeholder="EMAIL@ADDRESS.COM"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn-brutalist bg-inverse-surface text-white font-anton text-2xl py-4 border-4 border-on-surface hard-shadow pop-hover transition-all uppercase cursor-pointer"
                    >
                      Subscribe Now
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => {
            const el = document.getElementById("newsletter");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-16 h-16 rounded-none bg-tertiary-fixed text-on-tertiary-fixed border-4 border-on-surface hard-shadow flex items-center justify-center hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
          title="Subscribe to Newsletter"
        >
          <Mail />
        </button>
      </div>

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
