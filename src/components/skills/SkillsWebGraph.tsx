"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SkillItem } from "@/data/skillsData";

interface SkillsWebGraphProps {
  hoveredSkillId: string | null;
  onCoreHover: (hovered: boolean) => void;
}

export default function SkillsWebGraph({
  hoveredSkillId,
  onCoreHover,
}: SkillsWebGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [corePos, setCorePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const updateCorePos = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCorePos({
          x: rect.width / 2,
          y: 80, // Top center core position
        });
      }
    };

    updateCorePos();
    window.addEventListener("resize", updateCorePos);
    return () => window.removeEventListener("resize", updateCorePos);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full mb-12 flex flex-col items-center">
      {/* Central Core Spider Node */}
      <motion.div
        onHoverStart={() => onCoreHover(true)}
        onHoverEnd={() => onCoreHover(false)}
        whileHover={{ scale: 1.1 }}
        className="relative z-20 cursor-pointer group flex flex-col items-center"
      >
        {/* Pulsating Spidey Sense Core Aura */}
        <div className="absolute -inset-4 bg-gradient-to-r from-red-600 via-amber-500 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 animate-pulse" />

        {/* Central Core Circle Badge */}
        <div className="relative z-10 w-24 h-24 rounded-full bg-zinc-950 border-4 border-red-600 flex flex-col items-center justify-center p-2 shadow-[0_0_35px_rgba(239,68,68,0.6)] group-hover:border-amber-400 transition-colors">
          <span className="text-3xl animate-bounce">🕷️</span>
          <span className="text-[10px] font-mono font-black text-white tracking-widest uppercase text-center mt-1">
            SPIDER-DEV
          </span>
        </div>

        {/* Sub-label badge */}
        <div className="mt-2 px-3 py-1 bg-zinc-900/90 border border-red-500/40 rounded-full text-[11px] font-mono text-red-400 font-bold tracking-wide shadow-lg">
          CORE TECH NODE // AVIRAL
        </div>
      </motion.div>

      {/* Background Spider Web Net SVG Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible opacity-30">
        <defs>
          <linearGradient id="neonRedBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Background Concentric Spider Web Circles */}
        <ellipse
          cx="50%"
          cy="80"
          rx="250"
          ry="150"
          fill="none"
          stroke="rgba(239, 68, 68, 0.2)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <ellipse
          cx="50%"
          cy="80"
          rx="450"
          ry="280"
          fill="none"
          stroke="rgba(59, 130, 246, 0.15)"
          strokeWidth="1"
          strokeDasharray="6 8"
        />
      </svg>
    </div>
  );
}
