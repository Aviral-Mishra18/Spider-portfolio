"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function HoloStatsCard() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setRotateX((-y / rect.height) * 20);
    setRotateY((x / rect.width) * 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="perspective-1000 w-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full relative rounded-2xl p-6 md:p-8 bg-zinc-950/80 border border-red-500/30 backdrop-blur-xl shadow-[0_0_50px_rgba(239,68,68,0.2)] group overflow-hidden font-mono"
      >
        {/* Holographic Scanlines Grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ef4444 1px, transparent 1px), linear-gradient(to bottom, #ef4444 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Ambient Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-2xl" />

        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <span className="text-sm font-bold text-red-500 tracking-widest uppercase">
              AVIRAL.SYS // SUIT_HUD_v3.2
            </span>
          </div>
          <span className="text-xs text-zinc-500 uppercase tracking-widest">
            STATUS: ONLINE
          </span>
        </div>

        {/* Bio Body */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Aviral Mishra
          </h2>
          <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-sans">
            Full-Stack & 3D Interactive Web Developer specializing in building high-performance Next.js applications, immersive Three.js graphics, and sleek cyberpunk user experiences.
          </p>
        </div>

        {/* 3D Cyber Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center hover:border-red-500/50 transition-colors">
            <div className="text-2xl md:text-3xl font-black text-red-500">3+</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
              Years Experience
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center hover:border-blue-500/50 transition-colors">
            <div className="text-2xl md:text-3xl font-black text-blue-400">100+</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
              Webs Slinged
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center hover:border-emerald-500/50 transition-colors">
            <div className="text-2xl md:text-3xl font-black text-emerald-400">99.9%</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
              Bugs Webbed
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center hover:border-purple-500/50 transition-colors">
            <div className="text-2xl md:text-3xl font-black text-purple-400">∞</div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
              Responsibility
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
