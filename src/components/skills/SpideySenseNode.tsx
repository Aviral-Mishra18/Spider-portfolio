"use client";

import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillItem } from "@/data/skillsData";

interface SpideySenseNodeProps {
  skill: SkillItem;
  index: number;
  isUnlocked: boolean;
  webAttached: boolean;
}

// Compact, Ultra-Smooth Spidey Mask Radar Node (Matching Image 1)
function SpideyRadarMask({
  isWebAttached = false,
  isHovered = false,
}: {
  isWebAttached?: boolean;
  isHovered?: boolean;
}) {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center select-none">
      {/* Outer Radar Rings (GPU optimized: only animate ping/spin when active or hovered) */}
      <div
        className={`absolute inset-0 rounded-full border border-red-500/30 pointer-events-none transition-opacity ${
          isHovered ? "animate-ping opacity-40" : "opacity-25"
        }`}
      />
      <div className="absolute -inset-1 rounded-full border border-red-500/35 pointer-events-none" />
      <div
        className={`absolute -inset-2.5 rounded-full border border-dashed border-red-500/25 pointer-events-none ${
          isHovered || isWebAttached ? "animate-[spin_16s_linear_infinite]" : ""
        }`}
      />

      {/* Red Radar Blip with white border on the outer ring (Matching Image 1) */}
      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-white shadow-[0_0_8px_#ef4444] z-20" />

      {/* Attached Web Silk Strand coming from top to mask (Matching Image 1 requirement) */}
      <div
        className={`absolute -top-7 left-1/2 -translate-x-1/2 w-[2px] transition-all duration-300 z-10 ${
          isWebAttached
            ? "h-9 bg-gradient-to-b from-white via-red-400 to-red-600 shadow-[0_0_6px_#ffffff]"
            : "h-7 bg-gradient-to-b from-zinc-600 to-red-950"
        }`}
      >
        <div
          className={`absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-colors ${
            isWebAttached ? "bg-white shadow-[0_0_5px_#ffffff]" : "bg-zinc-600"
          }`}
        />
      </div>

      {/* Center Circular Mask Graphic */}
      <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-b from-red-600 via-red-700 to-red-950 border-2 border-red-500/80 shadow-[0_0_14px_rgba(239,68,68,0.5)] flex items-center justify-center overflow-hidden">
        {/* Radial Web Grid Lines */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-65">
          {/* Web Spokes */}
          <line x1="50" y1="0" x2="50" y2="100" stroke="#09090b" strokeWidth="1.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#09090b" strokeWidth="1.5" />
          <line x1="15" y1="15" x2="85" y2="85" stroke="#09090b" strokeWidth="1.5" />
          <line x1="85" y1="15" x2="15" y2="85" stroke="#09090b" strokeWidth="1.5" />
          {/* Web Rings */}
          <circle cx="50" cy="50" r="16" fill="none" stroke="#09090b" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#09090b" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="#09090b" strokeWidth="1.5" />
        </svg>

        {/* Iconic White Spider-Man Eyes with Bold Black Borders */}
        <div className="relative z-20 flex items-center justify-center gap-1.5">
          {/* Left Eye */}
          <svg viewBox="0 0 40 60" className="w-4 h-6.5 drop-shadow-[0_0_4px_rgba(255,255,255,0.9)]">
            <path
              d="M 28 4 C 18 16 10 32 10 50 C 18 52 26 46 28 32 C 30 22 30 12 28 4 Z"
              fill="#ffffff"
              stroke="#09090b"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
          {/* Right Eye */}
          <svg viewBox="0 0 40 60" className="w-4 h-6.5 drop-shadow-[0_0_4px_rgba(255,255,255,0.9)]">
            <path
              d="M 12 4 C 22 16 30 32 30 50 C 22 52 14 46 12 32 C 10 22 10 12 12 4 Z"
              fill="#ffffff"
              stroke="#09090b"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SpideySenseNodeComponent({
  skill,
  index,
  isUnlocked,
  webAttached,
}: SpideySenseNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isShake, setIsShake] = useState(false);
  const [showLockedWarning, setShowLockedWarning] = useState(false);

  // Card should NOT flip when clicked directly without web attached!
  const handleCardClick = () => {
    if (!isUnlocked) {
      setIsShake(true);
      setShowLockedWarning(true);
      setTimeout(() => setIsShake(false), 380);
      setTimeout(() => setShowLockedWarning(false), 2200);
    }
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={false}
        animate={{
          rotateY: isUnlocked ? 0 : 180,
          scale: isHovered ? 1.02 : 1,
          x: isShake ? [-5, 5, -3, 3, 0] : 0,
        }}
        transition={{
          rotateY: {
            duration: 0.6,
            delay: isUnlocked ? (index % 6) * 0.05 : 0,
            ease: [0.25, 1, 0.5, 1],
          },
          scale: { duration: 0.15 },
          x: { duration: 0.35 },
        }}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        onClick={handleCardClick}
        className="relative w-full h-full select-none cursor-pointer group"
      >
        {/* ================================================================= */}
        {/* FRONT SIDE (REVEALED SKILL DETAILS)                              */}
        {/* ================================================================= */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
          className="w-full h-full"
        >
          {/* Card Frame (Solid bg-zinc-950 instead of backdrop-blur to eliminate GPU compositing lag) */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800/90 hover:border-red-500/50 bg-zinc-950 hover:bg-zinc-900/50 shadow-md hover:shadow-[0_4px_24px_rgba(239,68,68,0.12)] transition-colors duration-200 flex flex-col justify-between h-full">
            {/* Top Web Anchor Node */}
            {webAttached && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30">
                <div className="w-[2px] h-2 bg-gradient-to-b from-white to-red-400 shadow-[0_0_5px_#ffffff]" />
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 border border-white shadow-[0_0_5px_#ef4444]" />
              </div>
            )}

            {/* Corner Accent Dots */}
            <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-red-400/30 group-hover:bg-red-400/70 transition-colors" />
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-400/30 group-hover:bg-red-400/70 transition-colors" />

            {/* Header Strip */}
            <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60">
              <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-red-400 flex items-center gap-1.5 truncate">
                <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? "bg-red-400 animate-ping" : "bg-red-500/70"}`} />
                {skill.starkTelemetryCode}
              </span>
              <span className="text-[10px] font-mono text-zinc-400 shrink-0 ml-2">{skill.experience}</span>
            </div>

            {/* Card Main Info */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl group-hover:border-red-500/30 group-hover:scale-105 transition-transform duration-200 shadow-inner shrink-0">
                    {skill.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-white tracking-wide font-mono group-hover:text-red-300 transition-colors truncate">
                      {skill.name}
                    </h4>
                    <span className="text-xs font-mono text-zinc-400">
                      Level: <strong className="text-red-400">{skill.level}%</strong>
                    </span>
                  </div>
                </div>

                {/* Web Fluid Level Meter (Hardware-accelerated CSS transition without layout thrash) */}
                <div className="mb-3 bg-zinc-900/90 border border-zinc-800/80 p-2 rounded-xl">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                    <span>🕸️ WEB FLUID CHARGE</span>
                    <span className="text-red-400 font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                    <div
                      style={{
                        width: `${skill.level}%`,
                        transition: "width 0.6s ease-out",
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-red-500 to-rose-400"
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-xs font-mono leading-relaxed line-clamp-2 mb-3">
                  {skill.description}
                </p>
              </div>

              {/* Projects Chips */}
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
        </div>

        {/* ================================================================= */}
        {/* BACK SIDE (COMPACT - IDENTICAL SIZING VIA ABSOLUTE INSET-0)      */}
        {/* ================================================================= */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 w-full h-full rounded-2xl border border-zinc-800/90 group-hover:border-red-500/50 bg-zinc-950 p-4 shadow-md flex flex-col justify-between items-center overflow-hidden transition-colors duration-200"
        >
          {/* Background subtle Spider Web Tech Pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />

          {/* Top Encrypted Header */}
          <div className="w-full flex items-center justify-between border-b border-zinc-800/80 pb-2 z-10">
            <span className="text-[10px] font-mono text-red-400 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              STATUS: ENCRYPTED // #{index + 1}
            </span>
            <span className="text-[9px] font-mono text-zinc-400 px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded">
              {webAttached ? "WEB ATTACHED" : "AWAITING WEB"}
            </span>
          </div>

          {/* Center Spidey Mask Radar Node with Attached Web (Matching Image 1) */}
          <div className="z-10 my-auto flex flex-col items-center">
            <SpideyRadarMask isWebAttached={webAttached} isHovered={isHovered} />
            <h5 className="mt-2 text-xs font-mono font-bold text-zinc-200 tracking-wider uppercase">
              SPIDEY ARSENAL NODE
            </h5>
            <span className="text-[10px] font-mono text-zinc-500 mt-0.5">
              {webAttached ? "DECRYPTING SUIT TELEMETRY..." : "WEB SILK DISCONNECTED"}
            </span>
          </div>

          {/* Bottom Action Pill */}
          <div className="w-full z-10 pt-2 border-t border-zinc-800/80 text-center">
            <div className="py-1 px-3 bg-red-500/10 border border-red-500/30 rounded-lg text-[10px] font-mono text-red-400 font-semibold group-hover:bg-red-500/20 group-hover:border-red-500/60 transition-colors flex items-center justify-center gap-1.5">
              <span>🕸️</span>
              <span>CLICK SPIDER-DEV CORE TO ATTACH WEB</span>
            </div>
          </div>
        </div>

        {/* Warning Notification when user clicks card before attaching web */}
        <AnimatePresence>
          {showLockedWarning && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-x-3 top-1/2 -translate-y-1/2 z-50 p-3 rounded-xl bg-zinc-950 border border-red-500/90 shadow-[0_0_20px_rgba(239,68,68,0.7)] text-center pointer-events-none"
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-red-400">
                <span>⚠️</span>
                <span>WEB NOT ATTACHED!</span>
              </div>
              <p className="text-[10px] font-mono text-zinc-300 mt-1 leading-snug">
                Pehle upar <strong className="text-white">SPIDER-DEV</strong> core par click karke web attach karo, tab saare cards flip honge!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default memo(SpideySenseNodeComponent);
