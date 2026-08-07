"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Code, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Send, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  FileText,
  Bookmark
} from "lucide-react";

export default function NotebookPage() {
  const [activeSheet, setActiveSheet] = useState<"sideA" | "sideB">("sideA");

  const toggleSheet = () => {
    setActiveSheet((prev) => (prev === "sideA" ? "sideB" : "sideA"));
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-2 sm:px-4 font-sans relative">
      {/* Centered Sheet Action Header */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-5 font-mono text-xs z-20 relative text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <FileText className="w-3.5 h-3.5" />
          <span>{activeSheet === "sideA" ? "NOTEBOOK_SHEET_#01 (SIDE A)" : "NOTEBOOK_SHEET_#02 (SIDE B)"}</span>
        </div>
        <span className="text-zinc-400 font-mono text-[11px]">
          • Click bottom corner fold to flip page
        </span>
      </div>

      {/* Single Notebook Paper Sheet Container */}
      <div className="relative z-10 perspective-[1400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSheet}
            initial={{
              rotateY: activeSheet === "sideB" ? 90 : -90,
              opacity: 0,
              scale: 0.96
            }}
            animate={{
              rotateY: 0,
              opacity: 1,
              scale: 1
            }}
            exit={{
              rotateY: activeSheet === "sideB" ? -90 : 90,
              opacity: 0,
              scale: 0.96
            }}
            transition={{
              duration: 0.5,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="w-full relative rounded-2xl bg-[#0f121d] border border-zinc-800 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            {/* Notebook Lined Paper Background with Left Red Margin & Ring Holes */}
            <div 
              className="relative p-6 sm:p-12 min-h-[560px] text-zinc-100"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(239, 68, 68, 0.35) 2px, transparent 2px),
                  linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: "100% 100%, 100% 32px",
                backgroundPosition: "54px 0, 0 0"
              }}
            >
              {/* Notebook Left Margin Punched Ring Holes */}
              <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-around pointer-events-none py-12">
                <div className="w-4 h-4 rounded-full bg-zinc-950 border border-zinc-800 shadow-inner" />
                <div className="w-4 h-4 rounded-full bg-zinc-950 border border-zinc-800 shadow-inner" />
                <div className="w-4 h-4 rounded-full bg-zinc-950 border border-zinc-800 shadow-inner" />
              </div>

              {/* Watermark Stamp */}
              <div className="absolute top-6 right-8 font-mono text-[10px] text-red-500/80 border-2 border-dashed border-red-500/60 px-3 py-1 rounded rotate-6 pointer-events-none tracking-widest font-black uppercase">
                {activeSheet === "sideA" ? "CONFIDENTIAL // SIDE_A" : "VERIFIED // SIDE_B"}
              </div>

              {/* PAGE CONTENT */}
              {activeSheet === "sideA" ? (
                /* SIDE A: ORIGIN STORY & PROFILE */
                <div className="space-y-8 pl-6 sm:pl-8">
                  {/* Title & Date */}
                  <div className="border-b border-zinc-800/80 pb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
                      <Bookmark className="w-3.5 h-3.5 text-red-500" />
                      <span>NOTEBOOK ENTRY • DATE: 08.08.2026</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                      ABOUT ME // <span className="text-red-500">AVIRAL MISHRA</span>
                    </h2>
                    <p className="text-sm font-mono text-zinc-400 mt-1">
                      Interactive 3D Web Engineer & Full-Stack Developer
                    </p>
                  </div>

                  {/* Profile Card snippet */}
                  <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
                    <div className="flex items-center gap-4 z-10">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-zinc-900 p-0.5 shadow-[0_0_20px_rgba(239,68,68,0.5)] flex items-center justify-center font-black font-mono text-xl text-white shrink-0">
                        AM
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Aviral Mishra</h3>
                        <p className="text-xs font-mono text-red-400">ALIAS: SPIDER_DEV // EARTH-616</p>
                        <p className="text-xs text-zinc-400 mt-0.5">Specialty: High-performance 3D & Next.js Apps</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded font-mono text-[10px] text-emerald-400 z-10">
                      ● STATUS: AVAILABLE FOR MISSIONS
                    </div>
                  </div>

                  {/* Narrative Paragraphs */}
                  <div className="space-y-4 font-sans text-sm text-zinc-300 leading-relaxed">
                    <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                      <span className="text-red-500">&gt;</span> ORIGIN STORY
                    </h3>
                    <p>
                      Driven by a obsession for speed, interactive web graphics, and clean architecture, 
                      I craft web applications that leave a lasting impression. I combine 3D WebGL scenes, 
                      smooth GSAP timelines, and Next.js 16 micro-frontends to build modern digital products.
                    </p>
                    <p>
                      Like a spider crafting intricate webs, every project is constructed with precise logic, 
                      responsive layouts, and full TypeScript type-safety.
                    </p>
                  </div>

                  {/* Grid Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                      <span className="text-red-400 font-bold block mb-1">🕸️ 3D WebGL</span>
                      <span className="text-zinc-400 text-[11px]">Three.js, React Three Fiber, GLSL Shaders</span>
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                      <span className="text-blue-400 font-bold block mb-1">⚡ Next.js 16</span>
                      <span className="text-zinc-400 text-[11px]">Turbopack, SSR, Server Actions, React 19</span>
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                      <span className="text-emerald-400 font-bold block mb-1">🛡️ Bulletproof</span>
                      <span className="text-zinc-400 text-[11px]">Strict TypeScript, Clean Code, SEO</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* SIDE B: SKILLS ARSENAL & PRINCIPLES */
                <div className="space-y-8 pl-6 sm:pl-8">
                  {/* Header */}
                  <div className="border-b border-zinc-800/80 pb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
                      <Bookmark className="w-3.5 h-3.5 text-blue-500" />
                      <span>NOTEBOOK ENTRY • SPECIFICATIONS</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                      TECH ARSENAL & <span className="text-blue-500">PRINCIPLES</span>
                    </h2>
                    <p className="text-sm font-mono text-zinc-400 mt-1">
                      Detailed breakdown of skills, frameworks, and engineering laws.
                    </p>
                  </div>

                  {/* Technical Stack Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold mb-3 uppercase">
                        <Code className="w-4 h-4" />
                        Frontend & 3D Tech
                      </div>
                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-zinc-300">Next.js 16 / React 19</span>
                          <span className="text-red-400 font-bold">100%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-300">TypeScript</span>
                          <span className="text-red-400 font-bold">95%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-300">Three.js / R3F</span>
                          <span className="text-red-400 font-bold">90%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-300">Tailwind CSS v4 & GSAP</span>
                          <span className="text-red-400 font-bold">95%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold mb-3 uppercase">
                        <Cpu className="w-4 h-4" />
                        Backend & Systems
                      </div>
                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-zinc-300">Node.js / Express</span>
                          <span className="text-blue-400 font-bold">90%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-300">Supabase / PostgreSQL</span>
                          <span className="text-blue-400 font-bold">88%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-300">REST APIs & GraphQL</span>
                          <span className="text-blue-400 font-bold">92%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-300">Git / CI/CD</span>
                          <span className="text-blue-400 font-bold">95%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Core Laws */}
                  <div className="space-y-3 font-mono text-xs">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Spider Code Principles
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
                        <span className="text-white font-bold block mb-0.5">1. Zero Latency Execution</span>
                        <span className="text-zinc-400 text-[11px]">Static prerendering, optimized assets, instant responses.</span>
                      </div>
                      <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800">
                        <span className="text-white font-bold block mb-0.5">2. Great Power, Great Code</span>
                        <span className="text-zinc-400 text-[11px]">Clean architecture, type-safety, maintainability.</span>
                      </div>
                    </div>
                  </div>

                  {/* Call to action buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      href="/contact"
                      className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs font-mono transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      CONTACT ME
                    </Link>
                    <Link
                      href="/projects"
                      className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold rounded-lg text-xs font-mono transition-all flex items-center gap-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      VIEW PROJECTS
                    </Link>
                  </div>
                </div>
              )}

              {/* Bottom Interactive Corner Page Fold / Dog-Ear Clicker */}
              <button
                onClick={toggleSheet}
                className="absolute bottom-0 right-0 w-14 h-14 bg-gradient-to-tl from-zinc-800 via-zinc-900 to-transparent border-t border-l border-zinc-700 hover:from-red-950/80 transition-all flex items-end justify-end p-2 group cursor-pointer"
                title="Click to flip notebook sheet"
              >
                <div className="w-0 h-0 border-b-[20px] border-b-zinc-950 border-l-[20px] border-l-transparent drop-shadow-lg group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Notebook Sheet Bottom Line Details */}
            <div className="h-10 bg-zinc-950 border-t border-zinc-800 px-8 flex items-center justify-between font-mono text-[11px] text-zinc-500">
              <span>SHEET {activeSheet === "sideA" ? "1 OF 2 (SIDE A)" : "2 OF 2 (SIDE B)"}</span>
              <button 
                onClick={toggleSheet}
                className="hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Click corner fold to flip</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
