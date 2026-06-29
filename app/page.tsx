"use client";

import React, { useState } from "react";
import { Palette, Terminal, ArrowRight, X } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  medium: string;
  description: string;
  bullets: string[];
}

const PROJECTS: Project[] = [
  {
    id: "nyc-silkscreen",
    title: "MANHATTAN PRESS",
    category: "SILKSCREEN",
    image: "/images/pop_art_nyc.jpg",
    year: "1968 / 2026",
    medium: "Silkscreen Print on Cotton Board",
    description: "A bold, graphic-novel inspired interpretation of the Manhattan skyline. Utilizing vintage lithographic inks to capture the exuberant energy of commercial printing combined with architectural discipline.",
    bullets: ["Muted red and cream color palette", "Ben-Day halftone dot pattern overlays", "4px solid ink-black structural borders"]
  },
  {
    id: "compu-view-3000",
    title: "COMPU-VIEW 3000",
    category: "DIGITAL ART",
    image: "/images/pop_art_designer.jpg",
    year: "2026",
    medium: "Vector Graphic & Dot Grid Matrix",
    description: "A retro-futuristic comic illustration exploring the intersection of creative code and mid-century printing processes. Designed as a tribute to vintage terminal systems and the process of digital craftsmanship.",
    bullets: ["Lichtenstein comic style layout", "Grounded monospace code typography", "10-20% opacity dot-matrix background"]
  },
  {
    id: "analog-artifacts",
    title: "ANALOG ARTIFACTS",
    category: "LOGOTYPE",
    image: "/images/pop_art_tools.jpg",
    year: "2025",
    medium: "Flat Matte Mixed Medium Illustration",
    description: "A sharp, orthogonal depiction of the essential designer toolkit. Rejects digital gradients and shadows in favor of bold ink lines, high-contrast geometry, and pure tactile layout structure.",
    bullets: ["Sharp 0px corner layouts", "Mustard Yellow color accents", "Refined brutalist composition grid"]
  }
];

export default function Home() {
  const [filter, setFilter] = useState<string>("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredProjects = filter === "ALL" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  const handleContactSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface selection:bg-primary selection:text-white font-sans text-on-surface">
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="border-b-4 border-on-surface">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-150 items-stretch">
            {/* Left Content Column */}
            <div className="lg:col-span-7 p-6 md:p-12 lg:p-16 flex flex-col justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-on-surface bg-surface-bright">
              <div className="inline-block bg-tertiary text-white label-caps text-xs px-3 py-1.5 border-2 border-on-surface mb-6 max-w-fit hard-shadow">
                ESTABLISHED 2026
              </div>
              <h1 className="display-lg text-6xl md:text-7xl lg:text-8xl text-on-surface uppercase mb-6 leading-tight select-none">
                ART. CODE.<br />SYSTEMS.
              </h1>
              <p className="body-lg text-on-surface-variant max-w-xl mb-8 leading-relaxed">
                Mid-century New York Pop Art meets modern frontend engineering. 
                Heavy line weights, flat matte surfaces, and a rigid modular grid 
                designed for digital solutions with physical permanence.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#gallery" 
                  className="btn-brutalist bg-primary text-white border-4 border-on-surface py-4 px-8 label-caps font-bold tracking-wider inline-block text-center hover:text-white"
                  style={{ color: "#ffffff" }}
                >
                  EXPLORE GALLERY
                </a>
                <a 
                  href="#contact" 
                  className="btn-brutalist bg-tertiary text-on-surface border-4 border-on-surface py-4 px-8 label-caps font-bold tracking-wider inline-block text-center hover:bg-tertiary"
                >
                  START PROJECT
                </a>
              </div>
            </div>

            {/* Right Poster Column */}
            <div className="lg:col-span-5 p-6 md:p-12 lg:p-16 flex items-center justify-center bg-surface-container relative overflow-hidden">
              <div className="absolute inset-0 benday-dots-light opacity-60 pointer-events-none" />
              
              {/* Brutalist Hard Shadow Card */}
              <div className="relative border-4 border-on-surface bg-surface max-w-sm w-full hard-shadow-lg z-10 transition-transform duration-300 hover:-translate-y-2">
                <div className="p-4 border-b-4 border-on-surface bg-surface-container-high flex justify-between items-center">
                  <span className="label-caps text-xs font-bold text-on-surface">SYS.MONITOR.01</span>
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full border-2 border-on-surface bg-primary" />
                    <span className="w-3 h-3 rounded-full border-2 border-on-surface bg-tertiary" />
                    <span className="w-3 h-3 rounded-full border-2 border-on-surface bg-secondary" />
                  </div>
                </div>
                <div className="p-0 overflow-hidden bg-white">
                  <img 
                    src="/images/pop_art_designer.jpg" 
                    alt="Pop art illustrator at work" 
                    className="w-full h-auto object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-4 border-t-4 border-on-surface bg-surface-container-low font-mono text-xs text-on-surface-variant flex justify-between">
                  <span>SCALE: 100% MATTE</span>
                  <span>TYPE: COMPU-VIEW</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BRUTALIST STATS HEADER */}
        <section className="border-b-4 border-on-surface bg-secondary text-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center divide-y-4 md:divide-y-0 md:divide-x-4 divide-on-surface font-mono">
            <div className="p-8 flex flex-col justify-center items-center">
              <span className="display-lg text-5xl text-tertiary-fixed mb-2 font-anton">08+</span>
              <span className="label-caps text-sm tracking-widest text-secondary-fixed">YEARS IN THE STUDIO</span>
            </div>
            <div className="p-8 flex flex-col justify-center items-center">
              <span className="display-lg text-5xl text-primary-fixed mb-2 font-anton">120+</span>
              <span className="label-caps text-sm tracking-widest text-secondary-fixed">COMPLETED PRINTS & SITES</span>
            </div>
            <div className="p-8 flex flex-col justify-center items-center bg-surface-container-highest text-on-surface relative">
              <div className="absolute inset-0 benday-dots-dark opacity-10 pointer-events-none" />
              <span className="display-lg text-5xl text-primary mb-2 font-anton z-10">99%</span>
              <span className="label-caps text-sm tracking-widest text-on-surface-variant z-10">TACTILE FORCE</span>
            </div>
          </div>
        </section>

        {/* GRAPHIC GALLERY SECTION */}
        <section id="gallery" className="border-b-4 border-on-surface py-16 md:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b-4 border-on-surface">
              <div>
                <span className="label-caps text-sm text-primary tracking-widest block mb-2 font-bold font-mono">
                  EXHIBIT A // WORKS
                </span>
                <h2 className="display-lg text-5xl md:text-6xl font-anton uppercase text-on-surface">
                  GRAPHIC GALLERY
                </h2>
              </div>
              
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-2 mt-6 md:mt-0 font-mono">
                {["ALL", "SILKSCREEN", "DIGITAL ART", "LOGOTYPE"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 border-2 border-on-surface font-bold text-xs tracking-wider transition-all label-caps ${
                      filter === category 
                        ? "bg-primary text-white hard-shadow" 
                        : "bg-surface hover:bg-surface-container-high text-on-surface"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <article 
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group border-4 border-on-surface bg-surface-container-lowest cursor-pointer hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-150 flex flex-col h-full"
                >
                  {/* Card Image */}
                  <div className="border-b-4 border-on-surface overflow-hidden aspect-4/3 bg-surface-dim relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-tertiary text-on-surface border-2 border-on-surface label-caps text-[10px] px-2.5 py-1 font-bold">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Header & Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center text-xs font-mono text-on-surface-variant mb-2">
                        <span>YEAR: {project.year}</span>
                      </div>
                      <h3 className="headline-md text-2xl uppercase font-anton tracking-wider text-on-surface mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="body-md text-on-surface-variant line-clamp-3 mb-4">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t-2 border-dashed border-on-surface-variant/40 flex justify-between items-center">
                      <span className="label-caps text-xs text-primary font-bold flex items-center gap-1">
                        VIEW DETAILS <ArrowRight size={14} className="stroke-[3]" />
                      </span>
                      <span className="text-xs font-mono text-on-surface-variant font-bold">{project.medium}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="border-b-4 border-on-surface bg-surface-container">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-on-surface">
            {/* Title / Accent Cell */}
            <div className="lg:col-span-4 p-8 md:p-12 flex flex-col justify-between bg-surface-container-high relative">
              <div className="absolute inset-0 benday-dots-light opacity-40 pointer-events-none" />
              <div className="z-10">
                <span className="label-caps text-sm text-primary tracking-widest font-bold block mb-2">
                  OUR CAPABILITIES
                </span>
                <h2 className="display-lg text-4xl md:text-5xl font-anton uppercase text-on-surface mb-6 leading-tight">
                  MODULAR SERVICES
                </h2>
              </div>
              <p className="body-md text-on-surface-variant z-10 mb-8 max-w-xs">
                We design systems, print graphics, and program responsive code. Everything is bounded by heavy line weights and architectural discipline.
              </p>
              <div className="z-10 hidden lg:block border-4 border-on-surface p-4 bg-tertiary/20 label-caps text-xs font-mono">
                STATUS: ACCEPTING WORK FOR Q3/Q4 2026
              </div>
            </div>

            {/* Service 1 */}
            <div className="lg:col-span-4 p-8 md:p-12 hover:bg-surface-container-lowest transition-colors group">
              <span className="font-mono text-xs font-bold text-on-surface-variant block mb-6">01 / CREATIVE</span>
              <div className="w-12 h-12 border-4 border-on-surface bg-primary mb-6 flex items-center justify-center text-white">
                <Palette size={20} className="stroke-[3]" />
              </div>
              <h3 className="headline-md text-2xl font-anton uppercase text-on-surface mb-4">
                BRAND IDENTITY
              </h3>
              <p className="body-md text-on-surface-variant mb-6">
                Creating high-contrast, structural brand marks, custom logotypes, and complete brand design guidelines built on rigid geometric grids.
              </p>
              <ul className="font-mono text-xs text-on-surface-variant space-y-2 border-t-2 border-on-surface pt-4">
                <li className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-primary border border-on-surface" />
                  Logo & Emblem Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-primary border border-on-surface" />
                  Typography Architecture
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-primary border border-on-surface" />
                  Print Production Assets
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="lg:col-span-4 p-8 md:p-12 hover:bg-surface-container-lowest transition-colors group">
              <span className="font-mono text-xs font-bold text-on-surface-variant block mb-6">02 / TECHNICAL</span>
              <div className="w-12 h-12 border-4 border-on-surface bg-tertiary mb-6 flex items-center justify-center text-on-surface">
                <Terminal size={20} className="stroke-[3]" />
              </div>
              <h3 className="headline-md text-2xl font-anton uppercase text-on-surface mb-4">
                WEB DEVELOPMENT
              </h3>
              <p className="body-md text-on-surface-variant mb-6">
                Programming responsive Next.js apps with custom design tokens, modern layout states, CSS scroller colors, container queries, and clean structures.
              </p>
              <ul className="font-mono text-xs text-on-surface-variant space-y-2 border-t-2 border-on-surface pt-4">
                <li className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-tertiary border border-on-surface" />
                  Tailwind CSS v4 Systems
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-tertiary border border-on-surface" />
                  React / Next.js Frameworks
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-tertiary border border-on-surface" />
                  Modern Frontend Optimization
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CLIENT INQUIRY FORM */}
        <section id="contact" className="border-b-4 border-on-surface py-16 md:py-24 bg-surface-bright relative">
          <div className="absolute inset-0 benday-dots-light opacity-50 pointer-events-none" />
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            
            {/* Form Container Card */}
            <div className="border-4 border-on-surface bg-surface p-8 md:p-12 hard-shadow-lg">
              <div className="mb-8 border-b-4 border-on-surface pb-6">
                <span className="label-caps text-xs text-primary font-bold tracking-widest block mb-2 font-mono">
                  EXHIBIT B // TRANSACTION
                </span>
                <h2 className="headline-lg text-4xl uppercase font-anton text-on-surface">
                  PROJECT INQUIRY
                </h2>
              </div>

              {formSubmitted ? (
                <div className="border-4 border-primary bg-primary-container p-6 text-on-primary-container hard-shadow mb-4">
                  <p className="label-caps text-lg font-bold mb-2">INQUIRY RECEIVED!</p>
                  <p className="text-sm font-mono leading-relaxed">
                    Thank you. The signal has been registered in the print studio dashboard. Expect a manual response within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="name" className="label-caps text-xs font-bold text-on-surface">
                        Sender Name (Required)
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. AGENT COOPER"
                        className="p-4 border-4 border-on-surface bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/40 rounded-none focus:outline-none focus:bg-primary-container/20 focus:border-primary transition-colors font-mono text-sm"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="email" className="label-caps text-xs font-bold text-on-surface">
                        Sender Email (Required)
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="e.g. COOPER@TWINPEAKS.GOV"
                        className="p-4 border-4 border-on-surface bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/40 rounded-none focus:outline-none focus:bg-tertiary-container/20 focus:border-tertiary transition-colors font-mono text-sm"
                      />
                    </div>
                  </div>

                  {/* Message input */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="message" className="label-caps text-xs font-bold text-on-surface">
                      Project Details & Budget
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Describe the grid dimensions, medium, or coding components needed..."
                      className="p-4 border-4 border-on-surface bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/40 rounded-none focus:outline-none focus:bg-primary-container/20 focus:border-primary transition-colors font-mono text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="btn-brutalist w-full bg-primary text-white border-4 border-on-surface py-4 px-6 label-caps font-bold tracking-widest text-center hover:text-white"
                      style={{ color: "#ffffff" }}
                    >
                      TRANSMIT INQUIRY
                    </button>
                  </div>
                </form>
              )}
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
            <a href="#" className="hover:text-primary transition-colors">BACK TO TOP ↑</a>
            <span className="text-on-surface-variant/40">|</span>
            <span className="text-on-surface-variant/80">BUILT WITH NEXT.JS 16 & TAILWIND V4</span>
          </div>
        </div>
      </footer>

      {/* NATIVE PROJECT DETAIL MODAL / DIALOG */}
      {selectedProject && (
        <div className="fixed inset-0 bg-on-background/80 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-xs">
          <div 
            className="border-4 border-on-surface bg-surface max-w-2xl w-full hard-shadow-lg relative animate-scale-up"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-4 border-b-4 border-on-surface bg-surface-container flex justify-between items-center">
              <span className="label-caps text-xs text-primary font-bold">{selectedProject.category} // CASE</span>
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 border-2 border-on-surface flex items-center justify-center hover:bg-primary hover:text-white transition-colors bg-surface"
              >
                <X size={16} className="stroke-[3]" />
              </button>
            </div>
            
            {/* Details content */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="border-4 border-on-surface overflow-hidden aspect-video bg-surface-dim">
                <img 
                  src={projectToImage(selectedProject.id)} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant mb-2">
                  <span>MEDIUM: {selectedProject.medium}</span>
                  <span>YEAR: {selectedProject.year}</span>
                </div>
                <h3 className="headline-md text-3xl uppercase font-anton text-on-surface mb-3">
                  {selectedProject.title}
                </h3>
                <p className="body-md text-on-surface-variant leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
                
                {/* Structured bullet list with brutalist bullets */}
                <h4 className="label-caps text-xs text-on-surface font-bold mb-3">DESIGN SPECIFICATIONS:</h4>
                <ul className="font-mono text-xs text-on-surface-variant space-y-2 bg-surface-container p-4 border-2 border-on-surface">
                  {selectedProject.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-2.5 h-2.5 bg-primary border border-on-surface mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t-4 border-on-surface bg-surface-container-low flex justify-between items-center">
              <span className="text-xs font-mono text-on-surface-variant">CLASSIFIED ARCHIVES © STUDIO GRAPHIC</span>
              <button
                onClick={() => setSelectedProject(null)}
                className="btn-brutalist bg-primary text-white border-2 border-on-surface py-2 px-6 label-caps text-xs font-bold hover:text-white"
                style={{ color: "#ffffff" }}
              >
                CLOSE VIEW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function projectToImage(id: string): string {
  if (id === "nyc-silkscreen") return "/images/pop_art_nyc.jpg";
  if (id === "compu-view-3000") return "/images/pop_art_designer.jpg";
  return "/images/pop_art_tools.jpg";
}
