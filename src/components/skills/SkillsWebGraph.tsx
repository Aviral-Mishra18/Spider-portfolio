"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SkillsWebGraphProps {
  hoveredSkillId: string | null;
  onCoreHover: (hovered: boolean) => void;
}

// Realistic High-Precision Spider Emblem Graphic
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
        <filter id="subtleSpiderGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#subtleSpiderGlow)">
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
    <div ref={containerRef} className="relative w-full mb-10 flex flex-col items-center">
      {/* Central Core Spider Node */}
      <motion.div
        onHoverStart={() => onCoreHover(true)}
        onHoverEnd={() => onCoreHover(false)}
        whileHover={{ scale: 1.06 }}
        className="relative z-20 cursor-pointer group flex flex-col items-center"
      >
        {/* Soft, Eye-Friendly Subtle Halo (No blinding neon glare) */}
        <div className="absolute -inset-3 bg-red-600/20 rounded-full blur-lg opacity-40 group-hover:opacity-75 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

        {/* Central Core Circle Badge with Sleek Metallic / Dark Glassmorphic Ring */}
        <div className="relative z-10 w-24 h-24 rounded-full bg-zinc-950 border-2 border-red-500/50 group-hover:border-red-400 flex flex-col items-center justify-center p-2 shadow-[0_4px_20px_rgba(0,0,0,0.8)] transition-all duration-300">
          {/* Subtle Inner Ring */}
          <div className="absolute inset-1 rounded-full border border-red-500/10 pointer-events-none" />

          {/* Real Realistic Spider Vector */}
          <div className="transform transition-transform duration-300 group-hover:scale-110">
            <RealisticSpiderEmblem className="w-11 h-11" />
          </div>

          <span className="text-[10px] font-mono font-bold text-zinc-200 tracking-wider uppercase text-center mt-0.5 group-hover:text-red-300 transition-colors">
            SPIDER-DEV
          </span>
        </div>

        {/* Sub-label badge with eye-friendly soft red border & text */}
        <div className="mt-2 px-3 py-1 bg-zinc-900/90 border border-zinc-800 rounded-full text-[11px] font-mono text-zinc-300 font-medium tracking-wide shadow-md flex items-center gap-1.5 group-hover:border-red-500/40 transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span>CORE TECH NODE // AVIRAL</span>
        </div>
      </motion.div>

      {/* Background Spider Web Net SVG Grid (Soft, low opacity) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible opacity-25">
        {/* Background Concentric Spider Web Rings */}
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
          stroke="rgba(239, 68, 68, 0.12)"
          strokeWidth="1"
          strokeDasharray="6 8"
        />
      </svg>
    </div>
  );
}
