"use client";

import DynamicSpiderMask from "@/components/3d/SpiderMask3D";
import DynamicSkillNodes from "@/components/3d/SkillNodes3D";
import HoloStatsCard from "@/components/3d/HoloStatsCard";
import SpideySense from "@/components/animations/SpideySense";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-6 max-w-7xl mx-auto space-y-16 text-white relative">
      {/* Background Atmosphere Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-mono text-xs uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          ORIGIN_STORY // AVIRAL_MISHRA
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          Suit Up: <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">About Me</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl font-mono">
          Interactive 3D developer crafting high-performance, accessible, and spider-infused web applications.
        </p>
      </div>

      {/* Hero Section: 3D Holographic Card & 3D Interactive Mask */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <HoloStatsCard />
        </div>
        <div className="lg:col-span-5 flex items-center justify-center">
          <DynamicSpiderMask />
        </div>
      </div>

      {/* 3D Web Skill Constellation Section */}
      <div className="relative z-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold font-mono tracking-tight flex items-center gap-2">
              <span className="text-red-500">&gt;</span> TECH_CONSTELLATION
            </h2>
            <p className="text-zinc-400 text-sm font-mono mt-1">
              Interactive 3D Web Nodes representing core skills & suit capabilities.
            </p>
          </div>
        </div>

        <DynamicSkillNodes />
      </div>

      {/* Origin Principles Section */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
        <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800 hover:border-red-500/40 transition-colors">
          <div className="text-3xl mb-3">🕸️</div>
          <h3 className="text-lg font-bold text-white mb-2">3D & Interactive Web</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Building immersive 3D experiences using Three.js, React Three Fiber, and GSAP for web applications that leave a lasting impact.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800 hover:border-blue-500/40 transition-colors">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-lg font-bold text-white mb-2">Speed & Performance</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Optimized Next.js 16 architectures with lightning-fast static prerendering, Turbo pack efficiency, and clean code principles.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800 hover:border-emerald-500/40 transition-colors">
          <div className="text-3xl mb-3">🛡️</div>
          <h3 className="text-lg font-bold text-white mb-2">Great Power, Great Code</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Writing maintainable, accessible, and bulletproof code with full TypeScript integration and robust testing.
          </p>
        </div>
      </div>

      {/* CTA Footer Section */}
      <div className="relative z-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-zinc-800 font-mono">
        <div>
          <h4 className="text-lg font-bold text-white">Ready to sling webs on your next project?</h4>
          <p className="text-xs text-zinc-400">Let's connect and build something extraordinary together.</p>
        </div>

        <SpideySense glowColor="red">
          <Link
            href="/contact"
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-[0_0_25px_rgba(239,68,68,0.5)] block text-center"
          >
            📡 Contact Me
          </Link>
        </SpideySense>
      </div>
    </main>
  );
}
