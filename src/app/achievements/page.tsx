"use client";

import { useState } from "react";
import {
  Trophy,
  Award,
  Flame,
  Star,
  ShieldCheck,
  Sparkles,
  Layers,
} from "lucide-react";
import { ACHIEVEMENTS_DATA } from "@/data/achievementsData";
import TriumphWebNetwork from "@/components/triumph/TriumphWebNetwork";

const CATEGORIES = [
  { id: "all", label: "All Feats" },
  { id: "triumphs", label: "Achievements & Triumphs" },
  { id: "certifications", label: "Certifications" },
  { id: "seminars", label: "Seminars & Workshops" },
  { id: "activities", label: "Club & Leadership" },
];

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <main className="min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20 px-3 sm:px-6 max-w-7xl mx-auto space-y-6 sm:space-y-8 text-white relative">
      {/* Lightweight Ambient Glows using CSS radial gradients */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/3 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Main Hero Header */}
      <div className="relative z-10 text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-red-500 shrink-0" />
          <span className="truncate">CANON LOG // ACHIEVEMENTS & ACTIVITIES</span>
        </div>

        {/* Heading Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-300 to-blue-500">
            Web of Triumphs
          </span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-mono max-w-2xl mx-auto leading-relaxed">
          Interactive Spider Web network tracking verified victories, hackathons, certifications, and leadership milestones across the spider-verse.
        </p>
      </div>

      {/* Hero Stats HUD Banner (Responsive 2x2 on mobile, 4 on desktop) */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 p-3 sm:p-6 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 text-center border-r border-b md:border-b-0 border-zinc-800/60">
          <div className="flex items-center gap-1.5 sm:gap-2 text-amber-400 font-mono font-bold text-xl sm:text-2xl md:text-3xl">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 shrink-0" />
            <span>#1</span>
          </div>
          <span className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase mt-0.5 sm:mt-1">Hackathons & Finalist</span>
        </div>

        <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 text-center border-b md:border-b-0 md:border-r border-zinc-800/60">
          <div className="flex items-center gap-1.5 sm:gap-2 text-red-400 font-mono font-bold text-xl sm:text-2xl md:text-3xl">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 shrink-0" />
            <span>365d</span>
          </div>
          <span className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase mt-0.5 sm:mt-1">Dev Commit Streak</span>
        </div>

        <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 text-center border-r border-zinc-800/60">
          <div className="flex items-center gap-1.5 sm:gap-2 text-blue-400 font-mono font-bold text-xl sm:text-2xl md:text-3xl">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 shrink-0" />
            <span>100%</span>
          </div>
          <span className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase mt-0.5 sm:mt-1">Verified Credentials</span>
        </div>

        <div className="flex flex-col items-center justify-center p-2.5 sm:p-3 text-center">
          <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 font-mono font-bold text-xl sm:text-2xl md:text-3xl">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 shrink-0" />
            <span>ACTIVE</span>
          </div>
          <span className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase mt-0.5 sm:mt-1">Club Coordinator</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap pt-1 sm:pt-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                isActive
                  ? "bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] border border-blue-400"
                  : "bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              {cat.id === "all" && <Layers className="w-3.5 h-3.5" />}
              {cat.id === "triumphs" && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
              {cat.id === "certifications" && <Award className="w-3.5 h-3.5 text-blue-400" />}
              {cat.id === "seminars" && <Star className="w-3.5 h-3.5 text-cyan-400" />}
              {cat.id === "activities" && <Flame className="w-3.5 h-3.5 text-red-400" />}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Spider Web Network of Triumphs */}
      <div className="relative z-10 pt-1 sm:pt-2">
        <TriumphWebNetwork
          items={ACHIEVEMENTS_DATA}
          activeCategory={activeCategory}
        />
      </div>
    </main>
  );
}
