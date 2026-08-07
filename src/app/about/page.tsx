"use client";

import NotebookPage from "@/components/animations/NotebookPage";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-10 text-white relative">
      {/* Background Atmosphere Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px]" />
      </div>

      {/* Main Section Heading */}
      <div className="relative z-10 text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-mono text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          CONFIDENTIAL // HERO_DOSSIER
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-zinc-100 to-blue-500">
            About Me
          </span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 font-mono max-w-xl mx-auto">
          Interactive developer dossier presented by Spider-Man. Inspect origin story, suit specifications, and core engineering laws.
        </p>
      </div>

      {/* Main 2-Column Hero Presenter Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
        {/* LEFT COLUMN: Large High-Res Spider-Man Presenter */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start justify-center relative group">
          {/* Red Spider-Sense Atmosphere Aura behind Spider-Man */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-blue-600/20 blur-3xl rounded-full pointer-events-none scale-110 group-hover:scale-125 transition-transform duration-700" />

          {/* Presentation Status Badge above Spider-Man */}
          <div className="relative z-20 mb-3 px-3 py-1.5 bg-zinc-950/90 border border-red-500/40 rounded-lg text-[11px] font-mono text-red-400 shadow-[0_4px_20px_rgba(239,68,68,0.3)] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-red-500 animate-spin-slow" />
            <span>PRESENTING // NOTEBOOK DOSSIER</span>
          </div>

          {/* Large High-Res Spider-Man Presenter Graphic */}
          <div className="relative z-10 flex flex-col items-center lg:items-start">
            <img
              src="/img2.png"
              alt="Spider-Man Presenting About Me"
              className="w-64 sm:w-80 md:w-96 lg:w-[430px] h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(239,68,68,0.6)] transform group-hover:scale-105 transition-transform duration-500 cursor-pointer"
            />

            {/* Sub-caption badge under Spider-Man */}
            <div className="mt-2 px-3 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 backdrop-blur-md">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>HAND GESTURE POINTING TO DOSSIER</span>
            </div>
          </div>

          {/* Glowing Web Beam Line connecting Spider-Man's hand to Notebook Page (Desktop only) */}
          <div className="hidden lg:block absolute top-1/2 -right-8 w-16 h-[2px] bg-gradient-to-r from-red-500/80 to-transparent pointer-events-none z-0 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        </div>

        {/* RIGHT COLUMN: The About Me Notebook Page Sheet */}
        <div className="lg:col-span-7 w-full">
          <NotebookPage />
        </div>
      </div>
    </main>
  );
}
