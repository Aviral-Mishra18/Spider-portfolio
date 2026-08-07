"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Code, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Send, 
  ExternalLink,
  Layers
} from "lucide-react";

const PAGES = [
  {
    id: "origin",
    tabLabel: "01 // ORIGIN",
    title: "DOSSIER: AVIRAL MISHRA",
    subtitle: "Your Friendly Neighborhood Developer",
    stamp: "TOP SECRET",
    content: (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 shadow-inner">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-zinc-900 p-0.5 shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center justify-center text-2xl font-black text-white">
              AM
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-wide">Aviral Mishra</h3>
              <p className="text-xs text-red-400 font-mono">PRIMARY ALIAS: WEB_SLINGER</p>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">LOCATION: India • Earth-616</p>
            </div>
          </div>
          <div className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded font-mono text-[10px] text-red-400 tracking-widest uppercase">
            STATUS: ACTIVE // DEVELOPER
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-bold font-mono text-zinc-200 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Origin Narrative
          </h4>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans font-normal">
            Bitten by an intense passion for high-performance software engineering and 3D web graphics, 
            I build hyper-responsive, interactive digital experiences. Combining cutting-edge web technology 
            with spider-themed aesthetics, I engineer web apps that feel alive, modern, and blazingly fast.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
          <div className="p-3 bg-zinc-900/40 rounded-lg border border-zinc-800/60">
            <span className="text-zinc-500 block text-[10px]">CORE FOCUS</span>
            <span className="text-zinc-200 font-semibold">Interactive 3D & Web Apps</span>
          </div>
          <div className="p-3 bg-zinc-900/40 rounded-lg border border-zinc-800/60">
            <span className="text-zinc-500 block text-[10px]">SPECIAL ABILITY</span>
            <span className="text-red-400 font-semibold">Pixel-Perfect Animation</span>
          </div>
          <div className="p-3 bg-zinc-900/40 rounded-lg border border-zinc-800/60">
            <span className="text-zinc-500 block text-[10px]">MAIN STACK</span>
            <span className="text-zinc-200 font-semibold">Next.js 16 • React 19 • TS</span>
          </div>
          <div className="p-3 bg-zinc-900/40 rounded-lg border border-zinc-800/60">
            <span className="text-zinc-500 block text-[10px]">THREAT LEVEL</span>
            <span className="text-emerald-400 font-semibold">Supreme Code Quality</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "arsenal",
    tabLabel: "02 // ARSENAL",
    title: "TECH ARSENAL & SUIT SPECS",
    subtitle: "Core Weapons & Stack Proficiency",
    stamp: "VERIFIED",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Frontend & 3D */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <div className="flex items-center gap-2 mb-3 text-red-400 font-mono text-xs font-bold uppercase">
              <Code className="w-4 h-4" />
              Frontend & 3D Graphics
            </div>
            <ul className="space-y-2 font-mono text-xs">
              <li className="flex justify-between items-center text-zinc-300">
                <span>Next.js 16 / React 19</span>
                <span className="text-red-400 font-bold">100%</span>
              </li>
              <li className="flex justify-between items-center text-zinc-300">
                <span>TypeScript / JavaScript</span>
                <span className="text-red-400 font-bold">95%</span>
              </li>
              <li className="flex justify-between items-center text-zinc-300">
                <span>Three.js / React Three Fiber</span>
                <span className="text-red-400 font-bold">90%</span>
              </li>
              <li className="flex justify-between items-center text-zinc-300">
                <span>Tailwind CSS v4 & GSAP</span>
                <span className="text-red-400 font-bold">95%</span>
              </li>
            </ul>
          </div>

          {/* Backend & Systems */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <div className="flex items-center gap-2 mb-3 text-blue-400 font-mono text-xs font-bold uppercase">
              <Cpu className="w-4 h-4" />
              Backend & Infrastructure
            </div>
            <ul className="space-y-2 font-mono text-xs">
              <li className="flex justify-between items-center text-zinc-300">
                <span>Node.js / Express</span>
                <span className="text-blue-400 font-bold">90%</span>
              </li>
              <li className="flex justify-between items-center text-zinc-300">
                <span>Supabase / PostgreSQL</span>
                <span className="text-blue-400 font-bold">88%</span>
              </li>
              <li className="flex justify-between items-center text-zinc-300">
                <span>RESTful APIs & GraphQL</span>
                <span className="text-blue-400 font-bold">92%</span>
              </li>
              <li className="flex justify-between items-center text-zinc-300">
                <span>Git / CI/CD Automation</span>
                <span className="text-blue-400 font-bold">95%</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Tags */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">Specialized Suit Modules</span>
          <div className="flex flex-wrap gap-2">
            {[
              "WebGL Shaders",
              "Dynamic Audio Sync",
              "Smooth GSAP Timelines",
              "Dark Mode Themes",
              "SEO Optimization",
              "Real-time WebSockets",
              "Accessible UI/UX",
              "Responsive Layouts"
            ].map((skill) => (
              <span 
                key={skill}
                className="px-3 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-red-500/40 transition-colors"
              >
                🕸️ {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: "principles",
    tabLabel: "03 // PRINCIPLES",
    title: "SPIDER CODE: CORE PRINCIPLES",
    subtitle: "Guiding Laws of Engineering",
    stamp: "CONFIDENTIAL",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-4">
          <div className="p-3 rounded-lg bg-red-600/10 border border-red-500/20 text-red-400 shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white font-mono mb-1">1. Web Speed & Instant Execution</h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              Zero latency is my spider-sense. I prioritize static generation, lazy loading, lightweight WebGL buffers, and optimized asset delivery for instant page responses.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-4">
          <div className="p-3 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white font-mono mb-1">2. Immersive Visual Storytelling</h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              Websites shouldn't just be documents; they should be interactive worlds. I craft smooth depth, 3D perspective layers, dynamic lighting, and crisp micro-interactions.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-4">
          <div className="p-3 rounded-lg bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white font-mono mb-1">3. Great Power, Bulletproof Code</h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              "With great power comes great responsibility." Every line of code is strictly typed, modularized, scalable, and built to survive edge cases with robust error handling.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "contact",
    tabLabel: "04 // MISSION",
    title: "ACTIVE MISSIONS & CONTACT",
    subtitle: "Sling Webs On Your Next Project",
    stamp: "OPEN FOR HIRE",
    content: (
      <div className="space-y-6">
        <div className="p-6 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-red-500/30 text-center space-y-3 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/10 rounded-full blur-xl pointer-events-none" />
          <h3 className="text-xl font-black text-white font-mono tracking-tight">Ready to build something legendary?</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto font-sans leading-relaxed">
            Whether you need a cutting-edge 3D web app, a high-converting portfolio, or a scalable full-stack web platform, I'm ready for deployment.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs font-mono transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              DEPLOY WEB-SHOOTER (CONTACT)
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold rounded-lg text-xs font-mono transition-all flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              VIEW ACTIVE PROJECTS
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3 bg-zinc-900/40 rounded-lg border border-zinc-800/60 flex items-center justify-between">
            <span className="text-zinc-400">Response Time</span>
            <span className="text-emerald-400 font-bold">&lt; 24 Hours</span>
          </div>
          <div className="p-3 bg-zinc-900/40 rounded-lg border border-zinc-800/60 flex items-center justify-between">
            <span className="text-zinc-400">Availability</span>
            <span className="text-red-400 font-bold">Open to Freelance & Roles</span>
          </div>
        </div>
      </div>
    )
  }
];

export default function CopyPageFlip() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goToNextPage = () => {
    if (currentPage < PAGES.length - 1) {
      setDirection("next");
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setDirection("prev");
      setCurrentPage((prev) => prev - 1);
    }
  };

  const selectPage = (index: number) => {
    if (index === currentPage) return;
    setDirection(index > currentPage ? "next" : "prev");
    setCurrentPage(index);
  };

  // Keyboard navigation support (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNextPage();
      } else if (e.key === "ArrowLeft") {
        goToPrevPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const page = PAGES[currentPage];

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-2 sm:px-4 font-sans">
      {/* Top Index Tabs (Notebook dividers) */}
      <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
        {PAGES.map((p, idx) => {
          const isActive = idx === currentPage;
          return (
            <button
              key={p.id}
              onClick={() => selectPage(idx)}
              className={`px-3 sm:px-4 py-2 rounded-t-xl text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap border-t border-x ${
                isActive
                  ? "bg-zinc-900 text-red-400 border-red-500/50 shadow-[0_-4px_15px_rgba(239,68,68,0.2)] translate-y-[2px] z-20"
                  : "bg-zinc-950/80 text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:bg-zinc-900/50 z-10"
              }`}
            >
              {p.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Main Notebook / Copy Container with Spiral Binding */}
      <div className="relative rounded-b-2xl rounded-tr-2xl bg-zinc-950 border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Top Metallic Spiral Binder Rings */}
        <div className="h-6 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-around px-4 z-30 relative">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-4 bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-800 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.6)] transform -rotate-12 border border-zinc-900"
            />
          ))}
        </div>

        {/* Notebook Paper Body */}
        <div 
          className="relative min-h-[480px] sm:min-h-[520px] p-6 sm:p-10 bg-[#101216] text-zinc-100 overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(239, 68, 68, 0.25) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 100% 28px",
            backgroundPosition: "48px 0, 0 0"
          }}
        >
          {/* Subtle Paper Texture Line Overlay & Watermark */}
          <div className="absolute top-4 right-6 pointer-events-none opacity-20 font-mono text-[10px] text-zinc-400 border border-zinc-700 px-2 py-1 rotate-3">
            LOG_PAGE_{currentPage + 1}_OF_{PAGES.length}
          </div>

          {/* 3D Page Flip Animation Container */}
          <div className="relative z-10 perspective-[1200px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentPage}
                initial={{
                  rotateY: direction === "next" ? 75 : -75,
                  opacity: 0,
                  transformOrigin: direction === "next" ? "left center" : "right center"
                }}
                animate={{
                  rotateY: 0,
                  opacity: 1
                }}
                exit={{
                  rotateY: direction === "next" ? -75 : 75,
                  opacity: 0,
                  transformOrigin: direction === "next" ? "right center" : "left center"
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.25, 1, 0.5, 1]
                }}
                className="w-full space-y-6"
              >
                {/* Page Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-800/80 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 font-mono text-xs text-red-500 uppercase tracking-widest mb-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{page.tabLabel}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
                      {page.title}
                    </h2>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">{page.subtitle}</p>
                  </div>

                  {/* Stamp / Badge */}
                  <div className="px-3 py-1 border-2 border-dashed border-red-500/60 rounded font-mono text-xs font-bold text-red-500 tracking-widest transform rotate-3 bg-red-500/5 shadow-sm">
                    [{page.stamp}]
                  </div>
                </div>

                {/* Page Dynamic Content */}
                <div className="pt-2">
                  {page.content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Bottom Page Turning Fold / Dog-Ear Hint */}
          {currentPage < PAGES.length - 1 && (
            <button
              onClick={goToNextPage}
              className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-zinc-800 to-transparent border-t border-l border-zinc-700/60 hover:from-red-950/60 transition-all flex items-end justify-end p-2 group cursor-pointer"
              title="Click to turn page"
            >
              <div className="w-0 h-0 border-b-[18px] border-b-zinc-900 border-l-[18px] border-l-transparent drop-shadow-md group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>

        {/* Notebook Bottom Control Footer Bar */}
        <div className="h-14 bg-zinc-900/90 border-t border-zinc-800 px-6 flex items-center justify-between font-mono text-xs z-30 relative">
          <div className="flex items-center gap-2 text-zinc-400">
            <span>PAGE {currentPage + 1} / {PAGES.length}</span>
            <span className="hidden sm:inline text-zinc-600">• Use ← → arrow keys to flip</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 font-semibold transition-all ${
                currentPage === 0
                  ? "text-zinc-600 bg-zinc-950/40 cursor-not-allowed border border-zinc-900"
                  : "text-zinc-200 bg-zinc-800 hover:bg-red-600 hover:text-white border border-zinc-700 shadow-sm"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">PREV PAGE</span>
            </button>

            <button
              onClick={goToNextPage}
              disabled={currentPage === PAGES.length - 1}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1 font-semibold transition-all ${
                currentPage === PAGES.length - 1
                  ? "text-zinc-600 bg-zinc-950/40 cursor-not-allowed border border-zinc-900"
                  : "text-white bg-red-600 hover:bg-red-700 border border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]"
              }`}
            >
              <span className="hidden sm:inline">NEXT PAGE</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
