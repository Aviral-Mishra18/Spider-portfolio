"use client";

import { motion } from "framer-motion";

interface SpideyWebCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function SpideyWebCard({ children, className = "" }: SpideyWebCardProps) {
  return (
    <motion.div
      className={`relative group bg-zinc-900/70 border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] ${className}`}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Top-Right SVG Web Corner Accent */}
      <svg
        className="absolute top-0 right-0 w-24 h-24 stroke-red-500/20 group-hover:stroke-red-500/50 fill-none stroke-[1] transition-colors pointer-events-none"
        viewBox="0 0 100 100"
      >
        <path d="M100 0 L0 0 A100 100 0 0 0 100 100 Z" fill="rgba(239,68,68,0.03)" />
        <path d="M100 20 A80 80 0 0 0 20 100" />
        <path d="M100 40 A60 60 0 0 0 40 100" />
        <path d="M100 60 A40 40 0 0 0 60 100" />
        <line x1="100" y1="0" x2="30" y2="100" />
        <line x1="100" y1="0" x2="60" y2="100" />
        <line x1="100" y1="0" x2="100" y2="60" />
      </svg>

      {/* Bottom-Left SVG Web Corner Accent */}
      <svg
        className="absolute bottom-0 left-0 w-20 h-20 stroke-blue-500/20 group-hover:stroke-blue-500/40 fill-none stroke-[1] transition-colors pointer-events-none"
        viewBox="0 0 100 100"
      >
        <path d="M0 100 A100 100 0 0 1 100 0" />
        <path d="M0 80 A80 80 0 0 1 80 0" />
        <path d="M0 60 A60 60 0 0 1 60 0" />
        <line x1="0" y1="100" x2="70" y2="0" />
      </svg>

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
