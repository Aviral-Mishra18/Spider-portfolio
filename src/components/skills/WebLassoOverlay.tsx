"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillItem } from "@/data/skillsData";

export interface LassoCoords {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  skill: SkillItem;
}

interface WebLassoOverlayProps {
  lasso: LassoCoords | null;
  onComplete: (skill: SkillItem) => void;
}

export default function WebLassoOverlay({ lasso, onComplete }: WebLassoOverlayProps) {
  useEffect(() => {
    if (lasso) {
      const timer = setTimeout(() => {
        onComplete(lasso.skill);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [lasso, onComplete]);

  if (!lasso) return null;

  const { startX, startY, endX, endY } = lasso;
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2 - 40; // Curve slightly upward like web sling pendulum trajectory

  // Calculate web strand offset lines for realism
  const pathD = `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;
  const strand1 = `M ${startX} ${startY} Q ${midX - 15} ${midY - 15} ${endX} ${endY}`;
  const strand2 = `M ${startX} ${startY} Q ${midX + 15} ${midY + 15} ${endX} ${endY}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="webGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Secondary Web Strands */}
          <motion.path
            d={strand1}
            fill="none"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
          <motion.path
            d={strand2}
            fill="none"
            stroke="rgba(239, 68, 68, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />

          {/* Main Web Lasso Line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#webGlow)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </svg>

        {/* Muzzle Flash / Shooter Point Effect at Cursor */}
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1.8, 0], opacity: [1, 0.8, 0] }}
          transition={{ duration: 0.3 }}
          style={{ left: startX - 16, top: startY - 16 }}
          className="absolute w-8 h-8 rounded-full bg-white border-2 border-red-500 shadow-[0_0_20px_#ef4444]"
        />

        {/* Target Impact Web Splat Ring at Skill Card */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.8] }}
          transition={{ duration: 0.35, delay: 0.15 }}
          style={{ left: endX - 30, top: endY - 30 }}
          className="absolute w-15 h-15 rounded-full border-2 border-cyan-400 bg-red-600/30 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_#06b6d4]"
        >
          <div className="w-6 h-6 rounded-full bg-white animate-ping" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
