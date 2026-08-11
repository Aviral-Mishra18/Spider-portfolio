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
import { ACHIEVEMENTS_DATA, AchievementItem } from "@/data/achievementsData";

// Icon mapping helper
const ICON_MAP = {
  Trophy,
  Award,
  Flame,
  Star,
  Zap,
  Medal,
  Target,
  ShieldCheck,
};

const CATEGORIES = [
  { id: "all", label: "All Feats" },
  { id: "triumphs", label: "Triumphs (Achievements)" },
  { id: "activities", label: "Heroic Activities" },
  { id: "certifications", label: "Certifications" },
];

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = ACHIEVEMENTS_DATA.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 text-white relative">
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
          Tracking key victories, hackathon wins, community heroics, leadership feats, and active engineering endeavors across the spider-verse.
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
      <div className="relative z-10 flex items-center justify-center gap-2 flex-wrap pt-4">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono tracking-wider transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? "bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] border border-red-500"
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

      {/* Grid of Achievements & Activities */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => {
            const IconComponent = ICON_MAP[item.iconName] || Trophy;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative bg-zinc-950 border border-zinc-800 hover:border-red-600/80 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_35px_rgba(239,68,68,0.2)] hover:-translate-y-1 overflow-hidden"
              >
                {/* Subtle Glowing Corner Graphic Background */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/10 rounded-full blur-2xl group-hover:bg-red-600/20 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Issue Badge & Date */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 bg-red-950/60 border border-red-500/30 text-red-400 text-[10px] font-mono font-bold tracking-wider uppercase rounded-md shadow-inner">
                      {item.issueNo || "TRIUMPH LOG"}
                    </span>
                    <span className="text-zinc-500 font-mono text-xs tracking-wide">
                      {item.date}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-3 bg-zinc-900 border border-zinc-800 group-hover:border-red-500/50 rounded-xl text-red-500 group-hover:text-red-400 group-hover:bg-red-950/30 transition-all duration-300 shadow-md">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-amber-400/90 font-mono mt-0.5">
                        {item.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="space-y-2 mb-6 border-t border-zinc-900 pt-3">
                      {item.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Card Footer Badge */}
                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-emerald-400 font-bold uppercase">{item.badgeText}</span>
                  </div>
                  <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    STATUS: LOGGED
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </main>
  );
}
