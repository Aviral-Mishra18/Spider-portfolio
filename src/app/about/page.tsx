"use client";

import NotebookPage from "@/components/animations/NotebookPage";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20 sm:pt-24 pb-16 px-3 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-10 text-white relative">
      {/* Lightweight Ambient Glows using CSS radial gradients */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Main Section Heading */}
      <div className="relative z-10 text-center space-y-3 max-w-3xl mx-auto px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-mono text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          CONFIDENTIAL // HERO_DOSSIER
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-zinc-100 to-blue-500">
            About Me
          </span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-mono max-w-xl mx-auto">
          Interactive developer dossier of Aviral Mishra. Inspect origin story, academic background, and technical arsenal.
        </p>
      </div>

      {/* Main 2-Column Hero Presenter Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pt-2">
        {/* LEFT COLUMN: Aviral Mishra Profile Presenter */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative group order-2 lg:order-1">
          {/* Presentation Status Badge */}
          <div className="relative z-20 mb-3 px-3 py-1.5 bg-zinc-950/90 border border-red-500/40 rounded-lg text-[10px] sm:text-[11px] font-mono text-red-400 shadow-[0_4px_20px_rgba(239,68,68,0.3)] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>PORTFOLIO LEAD // AVIRAL MISHRA</span>
          </div>

          {/* Full Portrait Graphic of Aviral Mishra */}
          <div className="relative z-10 flex flex-col items-center max-w-xs sm:max-w-sm w-full">
            {/* Ambient Glowing Spider Halo behind image */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-zinc-800 to-blue-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500 -z-10" />

            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-red-500/30 group-hover:border-red-500/70 shadow-[0_10px_35px_rgba(239,68,68,0.3)] transition-all duration-300 bg-zinc-900/60">
              <img
                src="/aviral.png"
                alt="Aviral Mishra - Full Stack Developer"
                className="w-full h-auto max-h-[480px] object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient overlay at bottom of photo for text contrast */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />

              {/* Overlay Badge at bottom of photo */}
              <div className="absolute bottom-3 inset-x-3 px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-700/60 backdrop-blur-md flex items-center justify-between text-[11px] font-mono">
                <span className="text-white font-bold tracking-wide">AVIRAL MISHRA</span>
                <span className="text-red-400 font-semibold text-[10px]">FULL STACK DEV</span>
              </div>
            </div>

            {/* Sub-caption badge */}
            <div className="mt-3 px-3 py-1 rounded bg-zinc-900/80 border border-zinc-800 text-[10px] font-mono text-zinc-400 flex items-center gap-1.5 backdrop-blur-md">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>VERIFIED DOSSIER // AVIRAL MISHRA</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The About Me Notebook Page Sheet */}
        <div className="lg:col-span-7 w-full order-1 lg:order-2">
          <NotebookPage />
        </div>
      </div>
    </main>
  );
}
