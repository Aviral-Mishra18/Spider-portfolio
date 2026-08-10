"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS_DATA, SkillItem } from "@/data/skillsData";
import SkillsWebGraph from "@/components/skills/SkillsWebGraph";
import SpideySenseNode from "@/components/skills/SpideySenseNode";

type ModeType = "comic" | "hud";
type CategoryType = "all" | "frontend" | "backend" | "database" | "tools" | "special";

export default function SkillsPage() {
  const [mode, setMode] = useState<ModeType>("hud");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [isCoreHovered, setIsCoreHovered] = useState<boolean>(false);

  // Filter skills by selected category
  const filteredSkills = SKILLS_DATA.filter((skill) =>
    selectedCategory === "all" ? true : skill.category === selectedCategory
  );

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/10 border border-red-500/30 rounded-full text-red-400 font-mono text-xs font-semibold mb-3">
            <span>🕸️ SPIDER-TECH ARSENAL</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase font-serif">
            WEB OF <span className="text-red-600">TECH STACK</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mt-2 font-mono">
            Interactive skill network connected to Spider-Dev Core Node. Hover over cards to trigger Spidey-Sense warning arcs and electric pulses!
          </p>
        </div>

        {/* Dual Mode Switcher Button */}
        <div className="bg-zinc-900/90 border-2 border-zinc-800 p-1.5 rounded-2xl flex items-center gap-1 shadow-xl backdrop-blur-md self-start md:self-auto">
          <button
            onClick={() => setMode("comic")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              mode === "comic"
                ? "bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-105"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span>📰</span>
            <span>COMIC MODE</span>
          </button>
          <button
            onClick={() => setMode("hud")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              mode === "hud"
                ? "bg-cyan-500 text-zinc-950 shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-105"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span>🤖</span>
            <span>STARK HUD MODE</span>
          </button>
        </div>
      </div>

      {/* Central Core Web Network Graph */}
      <SkillsWebGraph
        hoveredSkillId={hoveredSkillId}
        onCoreHover={(hovered) => setIsCoreHovered(hovered)}
      />

      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-zinc-800/80 relative z-10 justify-center">
        {[
          { id: "all", label: "ALL ARSENAL" },
          { id: "frontend", label: "FRONTEND TECH" },
          { id: "backend", label: "BACKEND & API" },
          { id: "database", label: "DATABASES & CLOUD" },
          { id: "tools", label: "TOOLS & DEVOPS" },
          { id: "special", label: "SPECIAL WEAPONS" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as CategoryType)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
              selectedCategory === cat.id
                ? mode === "comic"
                  ? "bg-red-600/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                  : "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills Nodes Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <SpideySenseNode
              key={skill.id}
              skill={skill}
              mode={mode}
              isHovered={hoveredSkillId === skill.id || isCoreHovered}
              onHoverStart={() => setHoveredSkillId(skill.id)}
              onHoverEnd={() => setHoveredSkillId(null)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
