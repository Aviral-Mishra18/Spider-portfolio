"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Code, 
  Cpu, 
  ShieldCheck, 
  GraduationCap,
  Send, 
  ExternalLink,
  ChevronRight,
  Bookmark,
  Sparkles,
  Layers,
  Award
} from "lucide-react";

export default function NotebookPage() {
  const [activeSheet, setActiveSheet] = useState<"sideA" | "sideB">("sideA");

  const toggleSheet = () => {
    setActiveSheet((prev) => (prev === "sideA" ? "sideB" : "sideA"));
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-2 sm:px-4 font-sans relative">
      {/* Centered Sheet Action Header */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4 font-mono text-xs z-20 relative text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <Bookmark className="w-3.5 h-3.5" />
          <span>{activeSheet === "sideA" ? "DOSSIER ENTRY #01 // PROFILE & EDUCATION (SIDE A)" : "DOSSIER ENTRY #02 // TECH ARSENAL & PRINCIPLES (SIDE B)"}</span>
        </div>
        <span className="text-zinc-400 font-mono text-[11px]">
          • Click corner fold to flip sheet
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
            className="w-full relative rounded-2xl bg-[#0d101a] border border-zinc-800 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden"
          >
            {/* Notebook Lined Paper Background with Left Red Margin & Ring Holes */}
            <div 
              className="relative p-6 sm:p-10 min-h-[580px] text-zinc-100"
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
                {activeSheet === "sideA" ? "CONFIDENTIAL // DOSSIER_A" : "VERIFIED // DOSSIER_B"}
              </div>

              {/* PAGE CONTENT */}
              {activeSheet === "sideA" ? (
                /* SIDE A: CAREER OBJECTIVE & EDUCATION TIMELINE */
                <div className="space-y-6 pl-6 sm:pl-8">
                  {/* Title & Date */}
                  <div className="border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-red-500" />
                      <span>HERO DOSSIER • KANPUR, INDIA</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-black font-mono tracking-tight text-white">
                      ABOUT ME // <span className="text-red-500">AVIRAL MISHRA</span>
                    </h2>
                    <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
                      Full Stack & AI Systems Developer • BCA Scholar
                    </p>
                  </div>

                  {/* Profile Card snippet */}
                  <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
                    <div className="flex items-center gap-4 z-10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-zinc-900 p-0.5 shadow-[0_0_20px_rgba(239,68,68,0.5)] flex items-center justify-center font-black font-mono text-lg text-white shrink-0">
                        AM
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">Aviral Mishra</h3>
                        <p className="text-xs font-mono text-red-400">PHONE: +91 9170252358 • KANPUR, INDIA</p>
                        <p className="text-xs text-zinc-400 mt-0.5">aviralmisrhra718@gmail.com • linkedin.com/in/aviral-mishra18</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded font-mono text-[10px] text-emerald-400 z-10 shrink-0">
                      ● STATUS: READY FOR MISSIONS
                    </div>
                  </div>

                  {/* Career Objective */}
                  <div className="space-y-2 font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-900/40 border border-zinc-800/80 p-4 rounded-xl">
                    <h3 className="text-xs sm:text-sm font-bold font-mono text-white flex items-center gap-2 uppercase">
                      <span className="text-red-500">&gt;</span> CAREER OBJECTIVE
                    </h3>
                    <p>
                      BCA student skilled in TypeScript, Next.js, and React.js, with hands-on experience integrating AI-driven APIs into real-world projects. A quick learner with strong problem-solving skills, seeking to contribute effectively in a professional development environment.
                    </p>
                  </div>

                  {/* Education Timeline Section */}
                  <div className="space-y-3 font-mono text-xs">
                    <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-blue-400" />
                      ACADEMIC BACKGROUND
                    </h3>
                    <div className="grid grid-cols-1 gap-2.5">
                      {/* PSIT-CHE */}
                      <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                        <div>
                          <span className="text-white font-bold block">PSIT College of Higher Education (PSIT-CHE), CSJMU</span>
                          <span className="text-red-400 text-[11px]">Bachelor of Computer Applications (B.C.A.)</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800 font-bold shrink-0">
                          2024 – 2027 (Pursuing) • Kanpur
                        </span>
                      </div>

                      {/* Kanya Kubja 12th */}
                      <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                        <div>
                          <span className="text-zinc-200 font-semibold block">Kanya Kubja Public School, CBSE</span>
                          <span className="text-zinc-400 text-[11px]">Intermediate (12th Grade)</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800 shrink-0">
                          2024 • Kanpur
                        </span>
                      </div>

                      {/* Kanya Kubja 10th */}
                      <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                        <div>
                          <span className="text-zinc-200 font-semibold block">Kanya Kubja Public School, CBSE</span>
                          <span className="text-zinc-400 text-[11px]">High School (10th Grade)</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800 shrink-0">
                          2022 • Kanpur
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* SIDE B: SKILLS ARSENAL, CERTIFICATIONS & LAWS */
                <div className="space-y-6 pl-6 sm:pl-8">
                  {/* Header */}
                  <div className="border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
                      <Layers className="w-3.5 h-3.5 text-blue-500" />
                      <span>NOTEBOOK ENTRY • TECHNICAL SPECIFICATIONS</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-black font-mono tracking-tight text-white">
                      TECH ARSENAL & <span className="text-blue-500">CERTIFICATIONS</span>
                    </h2>
                    <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
                      Languages, frameworks, databases, tools, and verified credentials.
                    </p>
                  </div>

                  {/* Technical Stack Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <div className="flex items-center gap-2 text-red-400 font-bold mb-2 uppercase">
                        <Code className="w-3.5 h-3.5" />
                        Languages & Frontend
                      </div>
                      <div className="space-y-1.5 text-zinc-300">
                        <div className="flex justify-between">
                          <span>TypeScript & JavaScript</span>
                          <span className="text-red-400 font-bold">95%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Next.js & React.js</span>
                          <span className="text-red-400 font-bold">96%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tailwind CSS, HTML5, CSS3</span>
                          <span className="text-red-400 font-bold">95%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>C, C++, Python</span>
                          <span className="text-red-400 font-bold">88%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <div className="flex items-center gap-2 text-blue-400 font-bold mb-2 uppercase">
                        <Cpu className="w-3.5 h-3.5" />
                        Backend, DB & Tools
                      </div>
                      <div className="space-y-1.5 text-zinc-300">
                        <div className="flex justify-between">
                          <span>Node.js & Express</span>
                          <span className="text-blue-400 font-bold">90%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Supabase (PostgreSQL RLS)</span>
                          <span className="text-blue-400 font-bold">90%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>MongoDB (Atlas)</span>
                          <span className="text-blue-400 font-bold">88%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GitHub, VS Code, Vercel</span>
                          <span className="text-blue-400 font-bold">94%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certifications & Seminars Overview */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 font-mono text-xs space-y-2">
                    <div className="text-amber-400 font-bold uppercase flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      Certifications & Key Highlights
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-300">
                      <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
                        • C++ Programming Certification
                      </div>
                      <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
                        • AI Tools Workshop – Ben 10X
                      </div>
                      <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
                        • Finalist – Tech Expo 2K25
                      </div>
                      <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
                        • Google Developer Program Attendee
                      </div>
                    </div>
                  </div>

                  {/* Call to action buttons */}
                  <div className="pt-1 flex flex-wrap items-center gap-3 font-mono text-xs">
                    <Link
                      href="/contact"
                      className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      CONTACT ME
                    </Link>
                    <Link
                      href="/resume"
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center gap-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      VIEW FULL RESUME
                    </Link>
                    <Link
                      href="/projects"
                      className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold rounded-lg transition-all flex items-center gap-2"
                    >
                      <span>VIEW PROJECTS</span>
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
