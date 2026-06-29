"use client";

import { useState } from "react";
import Link from "next/link";

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState<"BIO" | "PHILOSOPHY" | "STACK">("BIO");

  return (
    <div className="min-h-screen flex flex-col bg-surface selection:bg-primary selection:text-white font-sans text-on-surface">
      <main className="flex-1">
        {/* BANNER */}
        <section className="border-b-4 border-on-surface bg-surface-bright py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="label-caps text-xs text-primary font-bold tracking-widest block mb-2 font-mono">
              DOSSIER // AGENT 01
            </span>
            <h1 className="display-lg text-5xl md:text-7xl font-anton uppercase text-on-surface">
              ABOUT THE ARTIST & CODER
            </h1>
          </div>
        </section>

        {/* DETAILS SECTION */}
        <section className="border-b-4 border-on-surface">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Bio Column */}
            <div className="lg:col-span-7 p-6 md:p-12 lg:p-16 flex flex-col justify-between border-b-4 lg:border-b-0 lg:border-r-4 border-on-surface bg-surface">
              <div>
                {/* Custom Tab Selector */}
                <div className="flex border-4 border-on-surface mb-8 font-mono text-xs font-bold bg-surface-container-high max-w-md">
                  {(["BIO", "PHILOSOPHY", "STACK"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3 text-center border-r-4 last:border-r-0 border-on-surface transition-all ${
                        activeTab === tab 
                          ? "bg-tertiary text-on-surface" 
                          : "bg-surface hover:bg-surface-container"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === "BIO" && (
                  <div className="space-y-6">
                    <h2 className="headline-md text-3xl uppercase font-anton text-on-surface">
                      INK RUNS IN MY SYSTEM
                    </h2>
                    <p className="body-lg text-on-surface-variant leading-relaxed">
                      I am a multi-disciplinary freelancer based in New York. I bridge the gap between commercial printmaking history and modern, high-performance web development.
                    </p>
                    <p className="body-md text-on-surface-variant leading-relaxed">
                      My workflow is heavily influenced by the Mid-Century New York Pop Art movement. I believe that digital experiences deserve the same attention to geometry, ink density, and structural limits that classic screenprints have. Instead of chasing fleeting design trends, I build responsive, accessible web portals designed to last.
                    </p>
                  </div>
                )}

                {activeTab === "PHILOSOPHY" && (
                  <div className="space-y-6">
                    <h2 className="headline-md text-3xl uppercase font-anton text-on-surface">
                      REFINED BRUTALISM
                    </h2>
                    <p className="body-lg text-on-surface-variant leading-relaxed">
                      No blurs. No gradients. No soft drop shadows. Just pure, flat geometry and ink-on-paper permanence.
                    </p>
                    <p className="body-md text-on-surface-variant leading-relaxed">
                      I view CSS properties like margins, grid templates, and border weights as structural architecture. Elements are either locked into their modular cells or overlapping with purpose. We use Ben-Day halftone patterns to create visual weight, and hard offset shadows to convey physical depth. Everything is legible, bold, and solid.
                    </p>
                  </div>
                )}

                {activeTab === "STACK" && (
                  <div className="space-y-6">
                    <h2 className="headline-md text-3xl uppercase font-anton text-on-surface">
                      THE CURRENT TOOLKIT
                    </h2>
                    <p className="body-lg text-on-surface-variant leading-relaxed">
                      High efficiency, zero waste. We write clean code to build fast interfaces.
                    </p>
                    <div className="grid grid-cols-2 gap-4 font-mono text-xs text-on-surface-variant pt-2">
                      <div className="border-2 border-on-surface p-3 bg-surface-container">
                        <span className="font-bold text-primary block mb-1">FRONTEND</span>
                        React / Next.js<br />Tailwind CSS v4<br />TypeScript / ES6+
                      </div>
                      <div className="border-2 border-on-surface p-3 bg-surface-container">
                        <span className="font-bold text-secondary block mb-1">ART & DESIGN</span>
                        Silkscreen Press<br />Adobe Illustrator<br />Vector Outlining
                      </div>
                      <div className="border-2 border-on-surface p-3 bg-surface-container">
                        <span className="font-bold text-tertiary block mb-1">PERFORMANCE</span>
                        Web Vitals (LCP, INP)<br />Semantic HTML5 Architecture<br />Native Interactive APIs
                      </div>
                      <div className="border-2 border-on-surface p-3 bg-surface-container">
                        <span className="font-bold text-on-surface block mb-1">GRID LAYOUTS</span>
                        CSS Grid / Container Queries<br />Offset Shadow Math<br />Halftone Dot Matrix
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-12 pt-6 border-t-4 border-on-surface">
                <Link 
                  href="/#contact" 
                  className="btn-brutalist bg-primary text-white border-4 border-on-surface py-3 px-6 label-caps font-bold tracking-widest text-center inline-block"
                  style={{ color: "#ffffff" }}
                >
                  HIRE THE STUDIO →
                </Link>
              </div>
            </div>

            {/* Right Poster Column */}
            <div className="lg:col-span-5 p-6 md:p-12 lg:p-16 flex items-center justify-center bg-surface-container relative overflow-hidden">
              <div className="absolute inset-0 benday-dots-light opacity-60 pointer-events-none" />
              
              {/* Card Container */}
              <div className="relative border-4 border-on-surface bg-surface max-w-sm w-full hard-shadow-lg z-10">
                <div className="p-4 border-b-4 border-on-surface bg-surface-container-high flex justify-between items-center">
                  <span className="label-caps text-xs font-bold text-on-surface">SYS.MONITOR.02</span>
                  <div className="w-2.5 h-2.5 bg-primary border-2 border-on-surface rounded-full" />
                </div>
                <div className="p-0 overflow-hidden bg-white">
                  <img 
                    src="/images/pop_art_tools.jpg" 
                    alt="Creative tools illustration" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="p-4 border-t-4 border-on-surface bg-surface-container-low font-mono text-xs text-on-surface-variant flex justify-between">
                  <span>SCALE: 100% FLAT</span>
                  <span>MEDIUM: INK ON PAPER</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORK HISTORY & CLIENTS */}
        <section className="py-16 bg-surface-bright">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="display-lg text-4xl md:text-5xl font-anton uppercase text-on-surface mb-12 pb-4 border-b-4 border-on-surface">
              SELECTED EXHIBITS & CLIENTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs text-on-surface-variant">
              {/* Exhibition List */}
              <div className="border-4 border-on-surface bg-surface p-6 hard-shadow">
                <h3 className="label-caps text-sm font-bold text-primary mb-4 pb-2 border-b-2 border-on-surface">
                  SOLO EXHIBITIONS
                </h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-start gap-4">
                    <span>1. "GRID LOCK & INK SPLAT" // NYC CENTRAL GALLERY</span>
                    <span className="font-bold text-on-surface">2026</span>
                  </li>
                  <li className="flex justify-between items-start gap-4">
                    <span>2. "THE MATTE MATRIX" // BROOKLYN PRINT WORKS</span>
                    <span className="font-bold text-on-surface">2025</span>
                  </li>
                  <li className="flex justify-between items-start gap-4">
                    <span>3. "BRUTALIST CODEWAYS" // DESTECH CENTRE</span>
                    <span className="font-bold text-on-surface">2024</span>
                  </li>
                </ul>
              </div>

              {/* Client List */}
              <div className="border-4 border-on-surface bg-surface p-6 hard-shadow">
                <h3 className="label-caps text-sm font-bold text-secondary mb-4 pb-2 border-b-2 border-on-surface">
                  FREELANCE CONTRACTS
                </h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-start gap-4">
                    <span>1. RE-ARCHITECTING TAILWIND DESIGN SYSTEMS // ACME CORP</span>
                    <span className="font-bold text-on-surface">6 MOS</span>
                  </li>
                  <li className="flex justify-between items-start gap-4">
                    <span>2. BRAND RE-INKING & COMPONENT CODING // RETRO MEDIA</span>
                    <span className="font-bold text-on-surface">8 MOS</span>
                  </li>
                  <li className="flex justify-between items-start gap-4">
                    <span>3. CUSTOM PRINT DESIGNS & SYSTEMATIC GRID // NYC PRESS</span>
                    <span className="font-bold text-on-surface">3 MOS</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER GRID */}
      <footer className="border-t-4 border-on-surface bg-on-background text-inverse-on-surface py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-xs">
          <div>
            <span className="label-caps text-lg font-bold font-anton tracking-wider text-white block mb-1">
              STUDIO GRAPHIC // NYC
            </span>
            <span className="text-on-surface-variant/60 block">
              © 2026. All rights reserved. Ink and code in perfect harmony.
            </span>
          </div>
          
          <div className="flex gap-6">
            <Link href="/" className="hover:text-primary transition-colors">← RETURN TO PORTFOLIO</Link>
            <span className="text-on-surface-variant/40">|</span>
            <span className="text-on-surface-variant/80">BUILT WITH NEXT.JS 16 & TAILWIND V4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
