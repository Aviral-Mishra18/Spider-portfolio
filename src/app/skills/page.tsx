"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS_DATA } from "@/data/skillsData";
import SkillsWebGraph from "@/components/skills/SkillsWebGraph";
import SpideySenseNode from "@/components/skills/SpideySenseNode";

type CategoryType = "all" | "frontend" | "backend" | "database" | "tools" | "special";

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [isCoreHovered, setIsCoreHovered] = useState<boolean>(false);

  // Filter skills by selected category
  const filteredSkills = SKILLS_DATA.filter((skill) =>
    selectedCategory === "all" ? true : skill.category === selectedCategory
  );

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto relative overflow-hidden bg-black text-white">
      {/* Spider Red Background Glow Accents */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-red-800/15 rounded-full blur-3xl pointer-events-none" />

      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/10 border border-red-500/30 rounded-full text-red-400 font-mono text-xs font-semibold mb-3 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>🕸️ SPIDER ARSENAL // ACTIVE HUD</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase font-mono">
            WEB OF <span className="text-red-600">TECH STACK</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mt-2 font-mono">
            Interactive tech telemetry connected to Spider-Dev Core Node. Hover over suit modules to trigger Spidey-Sense warning arcs and web fluid telemetry!
          </p>
        </div>

        {/* Red & Black Status Indicator */}
        <div className="bg-red-950/80 border border-red-600/40 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-xl backdrop-blur-md self-start md:self-auto font-mono text-xs text-red-300">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span>SUIT HUD: ONLINE</span>
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
                ? "bg-red-600/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.35)] scale-105"
                : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:border-red-900/60 hover:text-white"
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
