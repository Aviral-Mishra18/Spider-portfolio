"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  Flame,
  Star,
  Zap,
  Medal,
  Target,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Filter,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { ACHIEVEMENTS_DATA } from "@/data/achievementsData";
import TriumphWebNetwork from "@/components/triumph/TriumphWebNetwork";

const CATEGORIES = [
  { id: "all", label: "All Feats" },
  { id: "triumphs", label: "Triumphs (Achievements)" },
  { id: "activities", label: "Heroic Activities" },
  { id: "certifications", label: "Certifications" },
];

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 text-white relative">
      {/* Background Atmosphere Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-2/3 left-1/4 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px]" />
      </div>

      {/* Main Hero Header */}
      <div className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-red-500 animate-spin-slow" />
          <span>CANON LOG // ACHIEVEMENTS & ACTIVITIES</span>
        </div>

        {/* Heading Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-300 to-blue-500">
            Web of Triumphs
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 font-mono max-w-2xl mx-auto leading-relaxed">
          Interactive Spider Web network tracking key victories, hackathon wins, community heroics, leadership feats, and active engineering endeavors across the spider-verse.
        </p>
      </div>

      {/* Hero Stats HUD Banner */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center justify-center p-3 text-center border-r border-zinc-800/60 last:border-r-0">
          <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-2xl sm:text-3xl">
            <Trophy className="w-6 h-6 text-amber-500" />
            <span>#1</span>
          </div>
          <span className="text-xs text-zinc-500 font-mono uppercase mt-1">Hackathon Wins</span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 text-center border-r border-zinc-800/60 last:border-r-0">
          <div className="flex items-center gap-2 text-red-400 font-mono font-bold text-2xl sm:text-3xl">
            <Flame className="w-6 h-6 text-red-500" />
            <span>365d</span>
          </div>
          <span className="text-xs text-zinc-500 font-mono uppercase mt-1">Dev Commit Streak</span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 text-center border-r border-zinc-800/60 last:border-r-0">
          <div className="flex items-center gap-2 text-blue-400 font-mono font-bold text-2xl sm:text-3xl">
            <Award className="w-6 h-6 text-blue-500" />
            <span>500+</span>
          </div>
          <span className="text-xs text-zinc-500 font-mono uppercase mt-1">OSS Stars & Reach</span>
        </div>

        <div className="flex flex-col items-center justify-center p-3 text-center">
          <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-2xl sm:text-3xl">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <span>100%</span>
          </div>
          <span className="text-xs text-zinc-500 font-mono uppercase mt-1">Verified Canon</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="relative z-10 flex items-center justify-center gap-2 flex-wrap pt-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono tracking-wider transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? "bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-400"
                  : "bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              {cat.id === "all" && <Layers className="w-3.5 h-3.5" />}
              {cat.id === "triumphs" && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
              {cat.id === "activities" && <Flame className="w-3.5 h-3.5 text-red-400" />}
              {cat.id === "certifications" && <Award className="w-3.5 h-3.5 text-blue-400" />}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Spider Web Network of Triumphs */}
      <div className="relative z-10 pt-2">
        <TriumphWebNetwork
          items={ACHIEVEMENTS_DATA}
          activeCategory={activeCategory}
        />
      </div>
    </main>
  );
}
