"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS_DATA } from "@/data/skillsData";
import SkillsWebGraph from "@/components/skills/SkillsWebGraph";
import SpideySenseNode from "@/components/skills/SpideySenseNode";

type CategoryType = "all" | "languages" | "frontend" | "backend" | "database" | "tools" | "softskills";

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [webFiring, setWebFiring] = useState<boolean>(false);
  const [webAttached, setWebAttached] = useState<boolean>(false);

  // Filter skills by selected category
  const filteredSkills = SKILLS_DATA.filter((skill) =>
    selectedCategory === "all" ? true : skill.category === selectedCategory
  );

  const handleCoreClick = () => {
    if (!isUnlocked) {
      setWebFiring(true);
      // Step 1: Web shoots out from SPIDER-DEV Core
      // Step 2: At 400ms, web reaches & attaches to cards, and cards flip over!
      setTimeout(() => {
        setWebAttached(true);
        setIsUnlocked(true);
      }, 400);
      // Step 3: Web shooting burst animation settles
      setTimeout(() => {
        setWebFiring(false);
      }, 1300);
    } else {
      // Detach webs and flip cards back to locked state
      setWebAttached(false);
      setIsUnlocked(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 sm:pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto relative overflow-hidden bg-black text-white">
      {/* Lightweight Ambient Glows using CSS radial gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-10 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-10 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-mono text-xs font-semibold mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            <span>🕸️ SPIDER ARSENAL // ACTIVE HUD</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase font-mono">
            WEB OF <span className="text-red-500">TECH STACK</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-xl mt-2 font-mono">
            Interactive tech telemetry directly reflecting Aviral Mishra&apos;s technical arsenal. Hover over suit modules to inspect Spidey-Sense telemetry!
          </p>
        </div>

        {/* Soft, Sleek Status Indicator */}
        <div className="bg-zinc-900/90 border border-zinc-800 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-lg backdrop-blur-md self-start md:self-auto font-mono text-xs text-zinc-300">
          <span className={`w-2 h-2 rounded-full ${isUnlocked ? "bg-emerald-400" : "bg-red-400"} animate-pulse`} />
          <span>{isUnlocked ? "ARSENAL: UNLOCKED // WEBS ATTACHED" : "ARSENAL: LOCKED // AWAITING WEB"}</span>
        </div>
      </div>

      {/* Central Core Web Network Graph */}
      <SkillsWebGraph
        isUnlocked={isUnlocked}
        webAttached={webAttached}
        onCoreClick={handleCoreClick}
        webFiring={webFiring}
      />

      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-zinc-800/80 relative z-10 justify-center">
        {[
          { id: "all", label: "ALL ARSENAL" },
          { id: "languages", label: "LANGUAGES" },
          { id: "frontend", label: "FRONTEND" },
          { id: "backend", label: "BACKEND" },
          { id: "database", label: "DATABASES" },
          { id: "tools", label: "TOOLS & LIBS" },
          { id: "softskills", label: "SOFT SKILLS" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as CategoryType)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
              selectedCategory === cat.id
                ? "bg-red-500/15 border-red-500/60 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)] scale-105"
                : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills Nodes Grid - Pure CSS Grid without layout thrashing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <SpideySenseNode
              key={skill.id}
              skill={skill}
              index={index}
              isUnlocked={isUnlocked}
              webAttached={webAttached}
            />
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
