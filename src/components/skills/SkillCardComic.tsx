"use client";

import React from "react";
import { motion } from "framer-motion";
import { SkillItem } from "@/data/skillsData";

interface SkillCardComicProps {
  skill: SkillItem;
  onLasso: (skill: SkillItem, event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function SkillCardComic({ skill, onLasso }: SkillCardComicProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8, rotate: -0.7 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      onClick={(e) => onLasso(skill, e)}
      className="relative cursor-pointer group bg-amber-50/5 dark:bg-zinc-950 border-2 border-zinc-800 hover:border-red-600 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_35px_rgba(239,68,68,0.35)] flex flex-col justify-between transition-all duration-300"
    >
      {/* Newspaper Masthead Banner */}
      <div className="bg-zinc-900/90 border-b-2 border-red-600 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-black tracking-widest text-xs sm:text-sm font-serif uppercase">
            THE DAILY BUGLE
          </span>
          <span className="px-1.5 py-0.5 bg-red-600 text-white text-[9px] font-mono font-bold uppercase rounded">
            {skill.comicBadge}
          </span>
        </div>
        <span className="text-zinc-400 text-[10px] font-mono tracking-wider">
          {skill.experience}
        </span>
      </div>

      {/* Main Comic Article Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Sub-header Dateline */}
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-2 border-b border-zinc-800 pb-1">
            <span>NEW YORK CITY</span>
            <span className="text-red-400 font-semibold">{skill.categoryLabel}</span>
          </div>

          {/* Title & Icon Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl p-2 bg-zinc-900 border border-zinc-800 rounded-lg group-hover:scale-110 transition-transform">
              {skill.icon}
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-white tracking-tight group-hover:text-red-500 transition-colors">
                {skill.name}
              </h4>
              <span className="text-xs text-zinc-400 font-mono">
                Proficiency Level: <strong className="text-red-400">{skill.level}%</strong>
              </span>
            </div>
          </div>

          {/* Newspaper Headline */}
          <h5 className="text-xs font-black text-amber-300/90 dark:text-zinc-200 uppercase font-serif tracking-tight leading-snug mb-2 group-hover:text-red-400 transition-colors">
            "{skill.dailyBugleHeadline}"
          </h5>

          {/* Article snippet */}
          <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 font-sans mb-4">
            {skill.description}
          </p>
        </div>

        {/* Project tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {skill.projects.map((proj, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-300 group-hover:border-red-500/40"
            >
              #{proj}
            </span>
          ))}
        </div>
      </div>

      {/* Comic Footer CTA */}
      <div className="px-4 py-2.5 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-between group-hover:bg-red-950/40 transition-colors">
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wide group-hover:text-white transition-colors">
          🕸️ SHOOT WEB TO INSPECT
        </span>
        <span className="text-red-500 font-bold text-xs group-hover:translate-x-1 transition-transform">
          &rarr;
        </span>
      </div>
    </motion.div>
  );
}
