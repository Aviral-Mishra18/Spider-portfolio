"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Code, 
  Cpu, 
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
    <div className="w-full max-w-4xl mx-auto py-2 sm:py-4 px-1 sm:px-4 font-sans relative">
      {/* Centered Sheet Action Header */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-3 sm:mb-4 font-mono text-xs z-20 relative text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.2)] text-[11px] sm:text-xs">
          <Bookmark className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{activeSheet === "sideA" ? "ENTRY #01 (SIDE A)" : "ENTRY #02 (SIDE B)"}</span>
        </div>
        <span className="text-zinc-400 font-mono text-[10px] sm:text-[11px]">
          • Click corner fold to flip
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
              className="relative p-4 sm:p-8 md:p-10 min-h-[540px] sm:min-h-[580px] text-zinc-100"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(239, 68, 68, 0.3) 2px, transparent 2px),
                  linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: "100% 100%, 100% 32px",
                backgroundPosition: "38px 0, 0 0"
              }}
            >
              {/* Notebook Left Margin Punched Ring Holes (Hidden on very narrow mobile to save space) */}
              <div className="hidden sm:flex absolute left-3 top-0 bottom-0 flex-col justify-around pointer-events-none py-12">
                <div className="w-3.5 h-3.5 rounded-full bg-zinc-950 border border-zinc-800 shadow-inner" />
                <div className="w-3.5 h-3.5 rounded-full bg-zinc-950 border border-zinc-800 shadow-inner" />
                <div className="w-3.5 h-3.5 rounded-full bg-zinc-950 border border-zinc-800 shadow-inner" />
              </div>

              {/* Watermark Stamp */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-8 font-mono text-[9px] sm:text-[10px] text-red-500/80 border border-dashed border-red-500/60 px-2 py-0.5 sm:px-3 sm:py-1 rounded rotate-6 pointer-events-none tracking-widest font-black uppercase">
                {activeSheet === "sideA" ? "DOSSIER_A" : "DOSSIER_B"}
              </div>

              {/* PAGE CONTENT */}
              {activeSheet === "sideA" ? (
                /* SIDE A: CAREER OBJECTIVE & EDUCATION TIMELINE */
                <div className="space-y-5 sm:space-y-6 pl-2 sm:pl-8">
                  {/* Title & Date */}
                  <div className="border-b border-zinc-800/80 pb-3 pr-20">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>HERO DOSSIER • KANPUR, INDIA</span>
                    </div>
                    <h2 className="text-xl sm:text-3xl font-black font-mono tracking-tight text-white truncate">
                      ABOUT ME // <span className="text-red-500">AVIRAL MISHRA</span>
                    </h2>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">
                      Full Stack & AI Systems Developer • BCA Scholar
                    </p>
                  </div>

                  {/* Profile Card snippet */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative overflow-hidden">
                    <div className="flex items-center gap-3 z-10 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-600 to-zinc-900 p-0.5 shadow-[0_0_20px_rgba(239,68,68,0.5)] flex items-center justify-center font-black font-mono text-base sm:text-lg text-white shrink-0">
                        AM
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-white truncate">Aviral Mishra</h3>
                        <p className="text-[11px] font-mono text-red-400 truncate">PHONE: +91 9170252358 • KANPUR</p>
                        <p className="text-[11px] text-zinc-400 truncate">aviralmisrhra718@gmail.com</p>
                      </div>
                    </div>
                    <div className="px-2.5 py-0.5 bg-zinc-950 border border-zinc-800 rounded font-mono text-[9px] sm:text-[10px] text-emerald-400 z-10 shrink-0">
                      ● READY FOR MISSIONS
                    </div>
                  </div>

                  {/* Career Objective */}
                  <div className="space-y-2 font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-900/40 border border-zinc-800/80 p-3.5 sm:p-4 rounded-xl">
                    <h3 className="text-xs font-bold font-mono text-white flex items-center gap-2 uppercase">
                      <span className="text-red-500">&gt;</span> CAREER OBJECTIVE
                    </h3>
                    <p>
                      BCA student skilled in TypeScript, Next.js, and React.js, with hands-on experience integrating AI-driven APIs into real-world projects. A quick learner with strong problem-solving skills, seeking to contribute effectively in a professional development environment.
                    </p>
                  </div>

                  {/* Education Timeline Section */}
                  <div className="space-y-2.5 font-mono text-xs">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                      ACADEMIC BACKGROUND
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {/* PSIT-CHE */}
                      <div className="p-2.5 sm:p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                        <div>
                          <span className="text-white font-bold block text-[11px] sm:text-xs">PSIT College of Higher Education (PSIT-CHE)</span>
                          <span className="text-red-400 text-[10px] sm:text-[11px]">Bachelor of Computer Applications (B.C.A.)</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 font-bold shrink-0">
                          2024 – 2027 (Pursuing)
                        </span>
                      </div>

                      {/* Kanya Kubja 12th */}
                      <div className="p-2.5 sm:p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                        <div>
                          <span className="text-zinc-200 font-semibold block text-[11px] sm:text-xs">Kanya Kubja Public School, CBSE</span>
                          <span className="text-zinc-400 text-[10px] sm:text-[11px]">Intermediate (12th Grade)</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 shrink-0">
                          2024 • Kanpur
                        </span>
                      </div>

                      {/* Kanya Kubja 10th */}
                      <div className="p-2.5 sm:p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                        <div>
                          <span className="text-zinc-200 font-semibold block text-[11px] sm:text-xs">Kanya Kubja Public School, CBSE</span>
                          <span className="text-zinc-400 text-[10px] sm:text-[11px]">High School (10th Grade)</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 shrink-0">
                          2022 • Kanpur
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* SIDE B: SKILLS ARSENAL, CERTIFICATIONS & LAWS */
                <div className="space-y-5 sm:space-y-6 pl-2 sm:pl-8">
                  {/* Header */}
                  <div className="border-b border-zinc-800/80 pb-3 pr-20">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mb-1">
                      <Layers className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>SPECIFICATIONS & CREDENTIALS</span>
                    </div>
                    <h2 className="text-xl sm:text-3xl font-black font-mono tracking-tight text-white truncate">
                      TECH ARSENAL & <span className="text-blue-500">CERTS</span>
                    </h2>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">
                      Languages, frameworks, databases, and verified achievements.
                    </p>
                  </div>

                  {/* Technical Stack Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <div className="flex items-center gap-2 text-red-400 font-bold mb-1.5 uppercase text-[11px]">
                        <Code className="w-3.5 h-3.5" />
                        Languages & Frontend
                      </div>
                      <div className="space-y-1 text-zinc-300 text-[11px]">
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

                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <div className="flex items-center gap-2 text-blue-400 font-bold mb-1.5 uppercase text-[11px]">
                        <Cpu className="w-3.5 h-3.5" />
                        Backend, DB & Tools
                      </div>
                      <div className="space-y-1 text-zinc-300 text-[11px]">
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
                  <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800 font-mono text-xs space-y-1.5">
                    <div className="text-amber-400 font-bold uppercase flex items-center gap-2 text-[11px]">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      Certifications & Key Highlights
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10px] sm:text-[11px] text-zinc-300">
                      <div className="p-1.5 rounded bg-zinc-950 border border-zinc-800">
                        • C++ Programming Certification
                      </div>
                      <div className="p-1.5 rounded bg-zinc-950 border border-zinc-800">
                        • AI Tools Workshop – Ben 10X
                      </div>
                      <div className="p-1.5 rounded bg-zinc-950 border border-zinc-800">
                        • Finalist – Tech Expo 2K25
                      </div>
                      <div className="p-1.5 rounded bg-zinc-950 border border-zinc-800">
                        • Google Developer Program Attendee
                      </div>
                    </div>
                  </div>

                  {/* Call to action buttons */}
                  <div className="pt-1 flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs">
                    <Link
                      href="/contact"
                      className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center gap-1.5 text-[11px] sm:text-xs"
                    >
                      <Send className="w-3 h-3" />
                      CONTACT
                    </Link>
                    <Link
                      href="/resume"
                      className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center gap-1.5 text-[11px] sm:text-xs"
                    >
                      <ExternalLink className="w-3 h-3" />
                      RESUME
                    </Link>
                    <Link
                      href="/projects"
                      className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold rounded-lg transition-all flex items-center gap-1.5 text-[11px] sm:text-xs"
                    >
                      PROJECTS
                    </Link>
                  </div>
                </div>
              )}

              {/* Bottom Interactive Corner Page Fold / Dog-Ear Clicker */}
              <button
                onClick={toggleSheet}
                className="absolute bottom-0 right-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-tl from-zinc-800 via-zinc-900 to-transparent border-t border-l border-zinc-700 hover:from-red-950/80 transition-all flex items-end justify-end p-1.5 sm:p-2 group cursor-pointer"
                title="Click to flip notebook sheet"
              >
                <div className="w-0 h-0 border-b-[16px] sm:border-b-[20px] border-b-zinc-950 border-l-[16px] sm:border-l-[20px] border-l-transparent drop-shadow-lg group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Notebook Sheet Bottom Line Details */}
            <div className="h-9 sm:h-10 bg-zinc-950 border-t border-zinc-800 px-4 sm:px-8 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-zinc-500">
              <span>{activeSheet === "sideA" ? "SHEET 1 (SIDE A)" : "SHEET 2 (SIDE B)"}</span>
              <button 
                onClick={toggleSheet}
                className="hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Flip sheet</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
