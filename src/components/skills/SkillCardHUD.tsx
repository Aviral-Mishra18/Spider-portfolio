"use client";

import React from "react";
import { motion } from "framer-motion";
import { SkillItem } from "@/data/skillsData";

interface SkillCardHUDProps {
  skill: SkillItem;
  onLasso: (skill: SkillItem, event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function SkillCardHUD({ skill, onLasso }: SkillCardHUDProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      onClick={(e) => onLasso(skill, e)}
      className="relative cursor-pointer group bg-zinc-950/90 border border-cyan-500/30 hover:border-cyan-400 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] flex flex-col justify-between transition-all duration-300 backdrop-blur-md"
    >
      {/* Stark Tech Cyber Corner Crosshairs */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Stark HUD Header Telemetry Bar */}
      <div className="bg-cyan-950/40 border-b border-cyan-500/20 px-4 py-2 flex items-center justify-between font-mono text-[10px]">
        <div className="flex items-center gap-2 text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="tracking-wider">{skill.starkTelemetryCode}</span>
        </div>
        <span className="text-zinc-500 uppercase">{skill.category}</span>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Main Title Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl p-2 bg-cyan-950/60 border border-cyan-500/30 rounded-lg group-hover:border-cyan-400 transition-colors">
                {skill.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors font-mono">
                  {skill.name}
                </h4>
                <span className="text-[11px] text-zinc-400 font-mono">
                  EXP: <strong className="text-cyan-400">{skill.experience}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Web-Fluid Charge Bar */}
          <div className="mb-4 bg-zinc-900 border border-cyan-500/20 p-2.5 rounded-lg">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <span>🕸️ WEB FLUID CHARGE</span>
              </span>
              <span className="text-cyan-400 font-bold">{skill.level}%</span>
            </div>
            <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-cyan-500/20 p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-red-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-400 text-xs font-mono leading-relaxed line-clamp-2 mb-4">
            {skill.description}
          </p>
        </div>

        {/* Project Telemetry Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {skill.projects.map((proj, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-cyan-950/50 border border-cyan-500/30 rounded text-[10px] font-mono text-cyan-200"
            >
              SYS: {proj}
            </span>
          ))}
        </div>
      </div>

      {/* Stark HUD Footer */}
      <div className="px-4 py-2.5 bg-cyan-950/30 border-t border-cyan-500/20 flex items-center justify-between font-mono text-[10px]">
        <span className="text-cyan-400/80 group-hover:text-cyan-300 transition-colors flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full" />
          TARGET LOCKED // CLICK TO LASSO
        </span>
        <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
          [+]
        </span>
      </div>
    </motion.div>
  );
}
