"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillItem } from "@/data/skillsData";

interface SpideySenseNodeProps {
  skill: SkillItem;
  mode: "comic" | "hud";
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function SpideySenseNode({
  skill,
  mode,
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
        scale: 1.03,
        x: [0, -2, 2, -1.5, 1.5, 0],
        transition: {
          x: { repeat: Infinity, repeatType: "mirror", duration: 0.15, ease: "easeInOut" },
          scale: { duration: 0.2 },
        },
      }}
      className="relative group cursor-pointer"
    >
      {/* Spidey-Sense Warning Arcs (Radiates yellow/red glow lines when hovered) */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Top-Left Arcs */}
            <motion.svg
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1, 1.15, 1] }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 w-12 h-12 pointer-events-none z-20 stroke-amber-400 fill-none stroke-[2]"
              viewBox="0 0 50 50"
            >
              <path d="M 40 10 A 30 30 0 0 0 10 40" strokeDasharray="3 3" />
              <path d="M 48 10 A 38 38 0 0 0 10 48" stroke="rgb(239, 68, 68)" strokeWidth="2.5" />
            </motion.svg>

            {/* Top-Right Arcs */}
            <motion.svg
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1, 1.15, 1] }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ repeat: Infinity, duration: 0.8, delay: 0.1, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-12 h-12 pointer-events-none z-20 stroke-red-500 fill-none stroke-[2]"
              viewBox="0 0 50 50"
            >
              <path d="M 10 10 A 30 30 0 0 1 40 40" strokeDasharray="3 3" />
              <path d="M 2 10 A 38 38 0 0 1 40 48" stroke="rgb(245, 158, 11)" strokeWidth="2.5" />
            </motion.svg>
          </>
        )}
      </AnimatePresence>

      {/* Card Wrapper based on Mode */}
      <div
        className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
          mode === "comic"
            ? "bg-zinc-950 border-zinc-800 hover:border-red-600 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
            : "bg-zinc-950/90 border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] backdrop-blur-md"
        }`}
      >
        {/* Header Strip */}
        <div
          className={`px-4 py-2 flex items-center justify-between border-b ${
            mode === "comic"
              ? "bg-zinc-900 border-red-600"
              : "bg-cyan-950/40 border-cyan-500/20"
          }`}
        >
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-400 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isHovered ? "bg-red-500 animate-ping" : "bg-zinc-500"}`} />
            {skill.categoryLabel}
          </span>
          <span className="text-[10px] font-mono text-zinc-400">{skill.experience}</span>
        </div>

        {/* Card Main Info */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl p-2 bg-zinc-900 border border-zinc-800 rounded-xl group-hover:scale-110 transition-transform">
              {skill.icon}
            </div>
            <div>
              <h4 className="text-lg font-bold text-white tracking-wide font-serif">
                {skill.name}
              </h4>
              <span className="text-xs font-mono text-zinc-400">
                Level: <strong className="text-red-400">{skill.level}%</strong>
              </span>
            </div>
          </div>

          {/* Web Fluid Level Meter */}
          <div className="mb-3">
            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800 p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  mode === "comic"
                    ? "bg-gradient-to-r from-red-600 to-amber-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                    : "bg-gradient-to-r from-cyan-500 via-blue-500 to-red-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                }`}
              />
            </div>
          </div>

          {/* Headline / Snippet */}
          <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 mb-4 font-sans">
            {skill.description}
          </p>

          {/* Projects Chips */}
          <div className="flex flex-wrap gap-1.5">
            {skill.projects.map((p, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-zinc-900/90 border border-zinc-800 rounded text-[10px] font-mono text-zinc-300"
              >
                #{p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
