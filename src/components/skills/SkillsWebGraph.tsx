"use client";

import React, { useRef, useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillsWebGraphProps {
  isUnlocked: boolean;
  webAttached?: boolean;
  onCoreClick: () => void;
  webFiring: boolean;
}

// Ultra-Smooth Realistic Spider Emblem (Hardware-accelerated vectors, no CPU filter)
function RealisticSpiderEmblem({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="realSpiderBodyGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="45%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
        <linearGradient id="realSpiderLegGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
      </defs>

      <g>
        {/* Abdomen (Lower Body) */}
        <path
          d="M50 48 C42.5 48 36.5 57 36.5 68 C36.5 79 42.5 88 50 88 C57.5 88 63.5 79 63.5 68 C63.5 57 57.5 48 50 48 Z"
          fill="url(#realSpiderBodyGrad)"
        />
        {/* Dorsal pattern line */}
        <path d="M50 51 L50 81" stroke="#fca5a5" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />

        {/* Cephalothorax (Upper Body / Head) */}
        <ellipse cx="50" cy="39" rx="8" ry="8.5" fill="url(#realSpiderBodyGrad)" />

        {/* Pedipalps / Chelicerae */}
        <path d="M47 31 C46 26.5 43.5 24 42 23" stroke="url(#realSpiderLegGrad)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M53 31 C54 26.5 56.5 24 58 23" stroke="url(#realSpiderLegGrad)" strokeWidth="1.8" strokeLinecap="round" />

        {/* Left Legs (4 Jointed Legs) */}
        <path d="M44 35 C35 23 25 19 16 27 C11 32 8 41 6 47" stroke="url(#realSpiderLegGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M43 39 C30 31 20 33 12 44 C8 50 6 59 5 67" stroke="url(#realSpiderLegGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M43 43 C30 44 20 52 14 64 C10 72 9 81 8 88" stroke="url(#realSpiderLegGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M44 47 C34 55 26 67 22 79 C19 87 18 94 18 98" stroke="url(#realSpiderLegGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Right Legs (4 Jointed Legs) */}
        <path d="M56 35 C65 23 75 19 84 27 C89 32 92 41 94 47" stroke="url(#realSpiderLegGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M57 39 C70 31 80 33 88 44 C92 50 94 59 95 67" stroke="url(#realSpiderLegGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M57 43 C70 44 80 52 86 64 C90 72 91 81 92 88" stroke="url(#realSpiderLegGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M56 47 C66 55 74 67 78 79 C81 87 82 94 82 98" stroke="url(#realSpiderLegGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

function SkillsWebGraphComponent({
  isUnlocked,
  webAttached = false,
  onCoreClick,
  webFiring,
}: SkillsWebGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [corePos, setCorePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const updateCorePos = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCorePos({
          x: rect.width / 2,
          y: 70, // Top center core position
        });
      }
    };

    updateCorePos();
    window.addEventListener("resize", updateCorePos);
    return () => window.removeEventListener("resize", updateCorePos);
  }, []);

  // Synthetic Web-Shoot "Thwip" Sound using Web Audio API
  const playWebShootSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {}
  };

  const handleCoreNodeClick = () => {
    playWebShootSound();
    onCoreClick();
  };

  return (
    <div ref={containerRef} className="relative w-full mb-10 flex flex-col items-center">
      {/* Central Core Spider Node (Matching Image 2) */}
      <motion.div
        onClick={handleCoreNodeClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-20 cursor-pointer group flex flex-col items-center select-none"
        title={isUnlocked ? "Click to relock cards" : "Click to fire webs & flip cards open"}
      >
        {/* Pulsing Spidey Core Aura */}
        <div
          className={`absolute -inset-2 rounded-full blur-lg transition-colors duration-300 pointer-events-none ${
            isUnlocked
              ? "bg-red-500/25"
              : "bg-red-600/20 group-hover:bg-red-500/40"
          }`}
        />

        {/* Central Core Circle Badge with Sleek Metallic Ring */}
        <div
          className={`relative z-10 w-24 h-24 rounded-full bg-zinc-950 border-2 transition-colors duration-200 flex flex-col items-center justify-center p-2 shadow-md ${
            isUnlocked
              ? "border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
              : "border-red-500/80 group-hover:border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
          }`}
        >
          {/* Outer Crosshair Ticks (Matching Image 2) */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-l-2 border-t-2 border-red-500/80 rounded-tl pointer-events-none" />
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse pointer-events-none" />

          {/* Realistic Spider Vector */}
          <div className="transform transition-transform duration-200 group-hover:scale-105">
            <RealisticSpiderEmblem className="w-11 h-11" />
          </div>

          <span className="text-[10px] font-mono font-bold text-zinc-200 tracking-wider uppercase text-center mt-0.5 group-hover:text-red-300 transition-colors">
            SPIDER-DEV
          </span>
        </div>

        {/* Sub-label badge (Matching Image 2: "• CORE TECH NODE // AVIRAL") */}
        <div className="mt-2.5 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[11px] font-mono text-zinc-300 font-medium tracking-wide shadow-sm flex items-center gap-1.5 group-hover:border-red-500/40 transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span>CORE TECH NODE // AVIRAL</span>
        </div>

        {/* Interactive Action Prompt Callout */}
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className={`mt-2.5 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border transition-colors duration-200 flex items-center gap-1.5 ${
            isUnlocked
              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              : webFiring
              ? "bg-red-500/30 border-white text-white shadow-[0_0_15px_#ef4444]"
              : "bg-red-600/20 border-red-500/70 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.3)]"
          }`}
        >
          <span className="text-yellow-300">⚡</span>
          <span>
            {isUnlocked
              ? "WEBS ATTACHED • CLICK TO DETACH & RELOCK"
              : webFiring
              ? "SHOOTING WEBS... ATTACHING TO CARDS..."
              : "CLICK SPIDER-DEV TO SHOOT WEBS & FLIP CARDS"}
          </span>
          <span className="text-yellow-300">⚡</span>
        </motion.div>
      </motion.div>

      {/* ================================================================= */}
      {/* HARDWARE-ACCELERATED WEB SHOOT ANIMATION RAYS (NO CPU BLUR)       */}
      {/* ================================================================= */}
      <AnimatePresence>
        {webFiring && (
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 w-full h-[520px] pointer-events-none z-30 overflow-visible"
          >
            {/* 8-Way Radiant Web Strands */}
            {[-460, -320, -180, -60, 60, 180, 320, 460].map((offset, i) => (
              <g key={i}>
                {/* Outer Glow Line */}
                <motion.line
                  x1="50%"
                  y1={corePos.y + 20}
                  x2={`calc(50% + ${offset}px)`}
                  y2={corePos.y + 260 + Math.abs(offset) * 0.16}
                  stroke="#ef4444"
                  strokeWidth="5"
                  strokeOpacity="0.45"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.28, ease: "easeOut", delay: i * 0.015 }}
                />
                {/* Core White Laser Silk Ray */}
                <motion.line
                  x1="50%"
                  y1={corePos.y + 20}
                  x2={`calc(50% + ${offset}px)`}
                  y2={corePos.y + 260 + Math.abs(offset) * 0.16}
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.28, ease: "easeOut", delay: i * 0.015 }}
                />

                {/* Target Web Impact Burst Circle */}
                <motion.circle
                  cx={`calc(50% + ${offset}px)`}
                  cy={corePos.y + 260 + Math.abs(offset) * 0.16}
                  r="10"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.6, 2.2], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.015 }}
                />
              </g>
            ))}

            {/* Center Web Muzzle Flash */}
            <motion.circle
              cx="50%"
              cy={corePos.y + 20}
              r="40"
              fill="rgba(239, 68, 68, 0.2)"
              stroke="#ffffff"
              strokeWidth="2"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [0.4, 1.5, 2.2], opacity: [0, 1, 0] }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Background Spider Web Net SVG Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible opacity-20">
        {/* Persistent Connected Web Filaments when Unlocked */}
        {isUnlocked && (
          <g className="opacity-40">
            {[-380, -220, -70, 70, 220, 380].map((offset, i) => (
              <line
                key={`conn-${i}`}
                x1="50%"
                y1={corePos.y + 20}
                x2={`calc(50% + ${offset}px)`}
                y2={corePos.y + 240 + Math.abs(offset) * 0.12}
                stroke="#ef4444"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
            ))}
          </g>
        )}
        {/* Concentric Spider Web Rings */}
        <ellipse
          cx="50%"
          cy="70"
          rx="250"
          ry="150"
          fill="none"
          stroke="rgba(239, 68, 68, 0.2)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <ellipse
          cx="50%"
          cy="70"
          rx="450"
          ry="280"
          fill="none"
          stroke="rgba(239, 68, 68, 0.12)"
          strokeWidth="1"
          strokeDasharray="6 8"
        />
      </svg>
    </div>
  );
}

export default memo(SkillsWebGraphComponent);
