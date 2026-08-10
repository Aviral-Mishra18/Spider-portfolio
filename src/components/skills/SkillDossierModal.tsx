"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillItem } from "@/data/skillsData";

interface SkillDossierModalProps {
  skill: SkillItem | null;
  mode: "comic" | "hud";
  onClose: () => void;
}

export default function SkillDossierModal({ skill, mode, onClose }: SkillDossierModalProps) {
  if (!skill) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className={`relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border-2 shadow-2xl ${
            mode === "comic"
              ? "bg-zinc-950 border-red-600 shadow-[0_0_50px_rgba(239,68,68,0.4)]"
              : "bg-zinc-950 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.4)]"
          }`}
        >
          {/* Header Banner */}
          <div
            className={`px-6 py-4 flex items-center justify-between border-b ${
              mode === "comic"
                ? "bg-zinc-900 border-red-600"
                : "bg-cyan-950/60 border-cyan-500/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{skill.icon}</span>
              <div>
                <span
                  className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded ${
                    mode === "comic"
                      ? "bg-red-600 text-white"
                      : "bg-cyan-500 text-zinc-950"
                  }`}
                >
                  {mode === "comic" ? "DAILY BUGLE DOSSIER" : "STARK HUD TELEMETRY"}
                </span>
                <h3 className="text-xl font-bold text-white tracking-wide font-mono mt-0.5">
                  {skill.name}
                </h3>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="px-3 py-1 bg-zinc-800 hover:bg-red-600 text-white text-xs font-mono rounded transition-colors"
            >
              ✕ ESCAPE
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Top Stat Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-zinc-400 block">CATEGORY</span>
                <span className="text-xs font-bold text-white font-mono">{skill.categoryLabel}</span>
              </div>
              <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-zinc-400 block">EXPERIENCE</span>
                <span className="text-xs font-bold text-cyan-400 font-mono">{skill.experience}</span>
              </div>
              <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-zinc-400 block">SPIDEY RATING</span>
                <span className="text-xs font-bold text-yellow-400 font-mono">⚡ 9.8 / 10</span>
              </div>
              <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-zinc-400 block">WEB FLUID</span>
                <span className="text-xs font-bold text-red-400 font-mono">{skill.level}% CHARGED</span>
              </div>
            </div>

            {/* Progress Gauge Detail */}
            <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
              <div className="flex justify-between items-center text-xs font-mono text-zinc-300 mb-2">
                <span>🕸️ WEB-FLUID PROFICIENCY GAUGE</span>
                <span className="text-cyan-400 font-bold">{skill.level}%</span>
              </div>
              <div className="w-full bg-zinc-950 h-3 rounded-full overflow-hidden border border-zinc-800 p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-cyan-400"
                />
              </div>
            </div>

            {/* Headline or Telemetry snippet */}
            <div
              className={`p-4 rounded-xl border ${
                mode === "comic"
                  ? "bg-amber-950/20 border-red-500/30 text-amber-200"
                  : "bg-cyan-950/20 border-cyan-500/30 text-cyan-200"
              }`}
            >
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-1">
                {mode === "comic" ? "NEWSPAPER HEADLINE COVERAGE" : "SUIT AI LOG ANALYSIS"}
              </h4>
              <p className="text-sm font-serif italic">
                "{mode === "comic" ? skill.dailyBugleHeadline : skill.starkTelemetryCode}"
              </p>
            </div>

            {/* Complete Overview */}
            <div>
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                TECHNICAL CAPABILITIES & EXERTION
              </h4>
              <p className="text-zinc-300 text-sm leading-relaxed font-sans bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80">
                {skill.description}
              </p>
            </div>

            {/* Related Projects Built */}
            <div>
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">
                DEPLOYED IN SPIDER PROJECTS
              </h4>
              <div className="flex flex-wrap gap-2">
                {skill.projects.map((proj, i) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-mono text-white flex items-center gap-2"
                  >
                    <span className="text-red-500 font-bold">✓</span>
                    <span>{proj}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500">
              STATUS: <span className="text-emerald-400 font-bold">READY FOR DEPLOYMENT</span>
            </span>
            <button
              onClick={onClose}
              className={`px-5 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-white transition-transform active:scale-95 ${
                mode === "comic"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-cyan-600 hover:bg-cyan-700"
              }`}
            >
              DISMISS WEB DOSSIER
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
