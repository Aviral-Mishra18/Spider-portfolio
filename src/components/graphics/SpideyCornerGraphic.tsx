"use client";

import { motion } from "framer-motion";

export default function SpideyCornerGraphic() {
  return (
    <div className="relative group cursor-pointer z-50 flex-shrink-0">
      {/* Dynamic Spidey-Sense Warning Arcs (Red Electricity Aura) */}
      <motion.div
        className="absolute -inset-3 rounded-full border border-red-500/40 pointer-events-none"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.3, 0.8, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -inset-5 rounded-full border border-dashed border-red-600/30 pointer-events-none"
        animate={{
          scale: [1.1, 1.35, 1.1],
          opacity: [0.2, 0.6, 0.2],
          rotate: [360, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Classic Vibrant Red Spider-Man Suit Shield */}
      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-red-950 border-2 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.75)] group-hover:scale-110 transition-transform duration-300 flex items-center justify-center overflow-hidden">
        {/* Subtle Web Texture Grid Overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40 stroke-zinc-950 fill-none stroke-[1.2]"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="12" />
          <circle cx="50" cy="50" r="26" />
          <circle cx="50" cy="50" r="40" />
          <line x1="50" y1="0" x2="50" y2="100" />
          <line x1="0" y1="50" x2="100" y2="50" />
          <line x1="15" y1="15" x2="85" y2="85" />
          <line x1="85" y1="15" x2="15" y2="85" />
        </svg>

        {/* Detailed Metallic Red Spider Mask with Glowing Eyes */}
        <div className="relative z-10 flex items-center justify-center gap-1">
          {/* Left Eye */}
          <motion.div
            className="w-4 h-7 bg-white border-2 border-zinc-950 rounded-tl-full rounded-br-full shadow-[0_0_12px_#ffffff] transform -rotate-12"
            whileHover={{ scale: 1.15 }}
          />
          {/* Center Spider Emblem */}
          <div className="w-1.5 h-3 bg-red-950 rounded-full" />
          {/* Right Eye */}
          <motion.div
            className="w-4 h-7 bg-white border-2 border-zinc-950 rounded-tr-full rounded-bl-full shadow-[0_0_12px_#ffffff] transform rotate-12"
            whileHover={{ scale: 1.15 }}
          />
        </div>
      </div>

      {/* Wrist Web-Shooter Laser Beacon */}
      <span className="absolute -bottom-1 -left-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-80" />
        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border-2 border-white shadow-[0_0_10px_#ef4444]" />
      </span>
    </div>
  );
}
