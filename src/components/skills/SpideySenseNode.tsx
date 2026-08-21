"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillItem } from "@/data/skillsData";

interface SpideySenseNodeProps {
  skill: SkillItem;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function SpideySenseNode({
  skill,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: SpideySenseNodeProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      whileHover={{
        scale: 1.02,
        y: -3,
        transition: { duration: 0.2 },
      }}
      className="relative group cursor-pointer"
    >
      {/* Soft Spidey-Sense Warning Arcs (Gentle opacity, comfortable on the eyes) */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Top-Left Arcs */}
            <motion.svg
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 0.75, scale: [1, 1.1, 1] }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 w-10 h-10 pointer-events-none z-20 stroke-amber-400/60 fill-none stroke-[1.5]"
              viewBox="0 0 50 50"
            >
              <path d="M 40 10 A 30 30 0 0 0 10 40" strokeDasharray="3 3" />
              <path d="M 48 10 A 38 38 0 0 0 10 48" stroke="rgba(248, 113, 113, 0.7)" strokeWidth="2" />
            </motion.svg>

            {/* Top-Right Arcs */}
            <motion.svg
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 0.75, scale: [1, 1.1, 1] }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ repeat: Infinity, duration: 1.2, delay: 0.2, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-10 h-10 pointer-events-none z-20 stroke-red-400/60 fill-none stroke-[1.5]"
              viewBox="0 0 50 50"
            >
              <path d="M 10 10 A 30 30 0 0 1 40 40" strokeDasharray="3 3" />
              <path d="M 2 10 A 38 38 0 0 1 40 48" stroke="rgba(248, 113, 113, 0.7)" strokeWidth="2" />
            </motion.svg>
          </>
        )}
      </AnimatePresence>

      {/* Sleek, Eye-Friendly Card Frame (Neutral dark bg + soft light red accents) */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800/90 hover:border-red-500/40 bg-zinc-950/90 hover:bg-zinc-900/40 shadow-lg hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)] backdrop-blur-md transition-all duration-300 flex flex-col justify-between h-full">
        {/* Soft Corner Accent Dots */}
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-red-400/30 group-hover:bg-red-400/70 transition-colors" />
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-400/30 group-hover:bg-red-400/70 transition-colors" />

        {/* Header Strip - Clean charcoal with soft light-red telemetry */}
        <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60">
          <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-red-400 flex items-center gap-1.5 truncate">
            <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? "bg-red-400 animate-ping" : "bg-red-500/70"}`} />
            {skill.starkTelemetryCode}
          </span>
          <span className="text-[10px] font-mono text-zinc-400 shrink-0 ml-2">{skill.experience}</span>
        </div>

        {/* Card Main Info */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-2xl p-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl group-hover:border-red-500/30 group-hover:scale-105 transition-all shadow-inner">
                {skill.icon}
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-wide font-mono group-hover:text-red-300 transition-colors">
                  {skill.name}
                </h4>
                <span className="text-xs font-mono text-zinc-400">
                  Level: <strong className="text-red-400">{skill.level}%</strong>
                </span>
              </div>
            </div>

            {/* Web Fluid Level Meter - Soft light red gradient */}
            <div className="mb-3 bg-zinc-900/80 border border-zinc-800/80 p-2 rounded-xl">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                <span>🕸️ WEB FLUID CHARGE</span>
                <span className="text-red-400 font-bold">{skill.level}%</span>
              </div>
              <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-red-500 to-rose-400"
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-zinc-400 text-xs font-mono leading-relaxed line-clamp-2 mb-4">
              {skill.description}
            </p>
          </div>

          {/* Projects Chips - Clean soft tag pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skill.projects.map((p, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 hover:border-red-500/30 rounded text-[10px] font-mono text-zinc-300 transition-colors"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
