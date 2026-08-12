"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  Flame,
  Star,
  Zap,
  Medal,
  Target,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  X,
  ChevronRight,
  ChevronLeft,
  Share2,
  ExternalLink,
  Radio,
} from "lucide-react";
import { AchievementItem } from "@/data/achievementsData";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy,
  Award,
  Flame,
  Star,
  Zap,
  Medal,
  Target,
  ShieldCheck,
};

interface TriumphWebNetworkProps {
  items: AchievementItem[];
  activeCategory: string;
}

export default function TriumphWebNetwork({
  items,
  activeCategory,
}: TriumphWebNetworkProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isCenterHovered, setIsCenterHovered] = useState<boolean>(false);

  // Default selection to first item if modal open or user clicks
  const selectedItem = useMemo(() => {
    return items.find((item) => item.id === selectedNodeId) || null;
  }, [items, selectedNodeId]);

  // Center coordinates inside SVG viewBox (1000 x 700)
  const cx = 500;
  const cy = 350;
  const radius = 250;

  // Calculate node positions around the center TRIUMPH core
  const nodes = useMemo(() => {
    const total = items.length;
    return items.map((item, index) => {
      // Start angle from top (-PI/2)
      const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
      
      // Slightly stagger radii for dynamic aesthetic if multiple items
      const currentRadius = index % 2 === 0 ? radius : radius * 0.92;
      
      const x = cx + currentRadius * Math.cos(angle);
      const y = cy + currentRadius * Math.sin(angle);

      return {
        ...item,
        x,
        y,
        angle,
        index,
      };
    });
  }, [items, cx, cy, radius]);

  // Determine if a node matches current filter
  const isNodeMatching = (itemCategory: string) => {
    if (activeCategory === "all") return true;
    return itemCategory === activeCategory;
  };

  // Keyboard navigation for details modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedNodeId) return;
      if (e.key === "Escape") setSelectedNodeId(null);
      if (e.key === "ArrowRight") navigateNode(1);
      if (e.key === "ArrowLeft") navigateNode(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNodeId, items]);

  const navigateNode = (direction: number) => {
    if (!selectedNodeId) return;
    const currentIndex = items.findIndex((i) => i.id === selectedNodeId);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + items.length) % items.length;
    setSelectedNodeId(items[nextIndex].id);
  };

  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      {/* Dynamic Background Spider-Web Glow & Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] transition-all duration-700 ${
            hoveredNodeId || isCenterHovered
              ? "bg-blue-600/25 scale-110"
              : "bg-red-600/15"
          }`}
        />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      </div>

      {/* Main SVG Web Graph Canvas */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <div className="relative w-full aspect-[10/7] min-h-[520px] sm:min-h-[640px] max-h-[750px]">
          <svg
            className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
            viewBox="0 0 1000 700"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Radial Web Gradient - Red to Blue */}
              <radialGradient id="spiderWebBgGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
              </radialGradient>

              {/* Dynamic Strand Red-Blue Gradient */}
              <linearGradient id="strandRedBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>

              <linearGradient id="activeBlueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>

              {/* Glow Filters */}
              <filter id="webBlueGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="webRedGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Subtle Concentric Spider Web Rings & Spokes */}
            <g className="opacity-40">
              {/* Concentric Web Polygons / Rings */}
              {[70, 140, 210, 280, 350].map((r, ringIdx) => {
                const sides = 12;
                const points = Array.from({ length: sides })
                  .map((_, i) => {
                    const a = (i * 2 * Math.PI) / sides - Math.PI / 2;
                    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
                  })
                  .join(" ");

                return (
                  <polygon
                    key={ringIdx}
                    points={points}
                    fill="none"
                    stroke={ringIdx % 2 === 0 ? "rgba(239, 68, 68, 0.25)" : "rgba(59, 130, 246, 0.2)"}
                    strokeWidth="1.2"
                    strokeDasharray={ringIdx % 2 === 1 ? "4 4" : "none"}
                  />
                );
              })}

              {/* Background 12-Spoke Radial Lines */}
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * 2 * Math.PI) / 12 - Math.PI / 2;
                const sx = cx + 370 * Math.cos(a);
                const sy = cy + 370 * Math.sin(a);
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={sx}
                    y2={sy}
                    stroke="rgba(239, 68, 68, 0.15)"
                    strokeWidth="1"
                  />
                );
              })}
            </g>

            {/* Interconnecting Outer Web Perimeter Strands (Mesh between neighboring nodes) */}
            {nodes.map((node, i) => {
              const nextNode = nodes[(i + 1) % nodes.length];
              const isStrandActive =
                hoveredNodeId === node.id ||
                hoveredNodeId === nextNode.id ||
                isCenterHovered ||
                selectedNodeId === node.id ||
                selectedNodeId === nextNode.id;

              // Arc curve for spider-web sagging effect
              const midX = (node.x + nextNode.x) / 2;
              const midY = (node.y + nextNode.y) / 2;
              // Sag inward towards center slightly
              const controlX = midX + (cx - midX) * 0.25;
              const controlY = midY + (cy - midY) * 0.25;

              return (
                <g key={`mesh-${node.id}-${nextNode.id}`}>
                  <path
                    d={`M ${node.x} ${node.y} Q ${controlX} ${controlY} ${nextNode.x} ${nextNode.y}`}
                    fill="none"
                    stroke={isStrandActive ? "#3b82f6" : "rgba(239, 68, 68, 0.35)"}
                    strokeWidth={isStrandActive ? "2.5" : "1.5"}
                    strokeDasharray={isStrandActive ? "8 4" : "none"}
                    filter={isStrandActive ? "url(#webBlueGlow)" : "none"}
                    className="transition-all duration-300"
                  />

                  {/* Flowing Light Energy Particles along outer mesh when active */}
                  {isStrandActive && (
                    <motion.circle
                      r="3.5"
                      fill="#60a5fa"
                      filter="url(#webBlueGlow)"
                      initial={{ offsetDistance: "0%" }}
                      animate={{
                        cx: [node.x, controlX, nextNode.x],
                        cy: [node.y, controlY, nextNode.y],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </g>
              );
            })}

            {/* Radial Web Strands (Center Node -> Each Achievement Node) */}
            {nodes.map((node) => {
              const isHovered = hoveredNodeId === node.id;
              const isSelected = selectedNodeId === node.id;
              const isActive = isHovered || isSelected || isCenterHovered;
              const isMatching = isNodeMatching(node.category);

              return (
                <g key={`radial-${node.id}`}>
                  {/* Base Line */}
                  <line
                    x1={cx}
                    y1={cy}
                    x2={node.x}
                    y2={node.y}
                    stroke={
                      isActive
                        ? "#3b82f6"
                        : isMatching
                        ? "rgba(239, 68, 68, 0.6)"
                        : "rgba(255, 255, 255, 0.1)"
                    }
                    strokeWidth={isActive ? "3" : isMatching ? "1.8" : "1"}
                    strokeDasharray={isActive ? "6 3" : "none"}
                    filter={isActive ? "url(#webBlueGlow)" : "none"}
                    className="transition-all duration-300"
                  />

                  {/* Animated Energy Flow Beams on Active Radial Lines */}
                  {isActive && (
                    <>
                      <motion.circle
                        r="4"
                        fill="#60a5fa"
                        filter="url(#webBlueGlow)"
                        initial={{ opacity: 0 }}
                        animate={{
                          cx: [cx, node.x],
                          cy: [cy, node.y],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                      <motion.circle
                        r="3"
                        fill="#38bdf8"
                        filter="url(#webBlueGlow)"
                        initial={{ opacity: 0 }}
                        animate={{
                          cx: [node.x, cx],
                          cy: [node.y, cy],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 0.3,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {/* CENTER NODE: "TRIUMPH CORE" */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
            onMouseEnter={() => setIsCenterHovered(true)}
            onMouseLeave={() => setIsCenterHovered(false)}
            onClick={() => {
              // Highlight all items or reset selection
              setSelectedNodeId(null);
            }}
          >
            {/* Red to Blue Pulsating Aura */}
            <motion.div
              animate={{
                scale: isCenterHovered ? [1, 1.2, 1.1] : [1, 1.08, 1],
                opacity: isCenterHovered ? 1 : 0.7,
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className={`absolute -inset-6 rounded-full blur-xl transition-colors duration-500 ${
                isCenterHovered
                  ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-90 shadow-[0_0_50px_rgba(59,130,246,0.8)]"
                  : "bg-gradient-to-r from-red-600 via-amber-500 to-red-700 opacity-60 shadow-[0_0_40px_rgba(239,68,68,0.6)]"
              }`}
            />

            {/* Central triumph badge structure */}
            <motion.div
              whileHover={{ scale: 1.12, rotate: [0, -3, 3, 0] }}
              className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-zinc-950 border-4 transition-all duration-500 flex flex-col items-center justify-center p-3 shadow-2xl ${
                isCenterHovered
                  ? "border-blue-500 shadow-[0_0_35px_rgba(59,130,246,0.9)]"
                  : "border-red-600 shadow-[0_0_30px_rgba(239,68,68,0.6)]"
              }`}
            >
              {/* Inner ring graphic */}
              <div className="absolute inset-1 rounded-full border border-dashed border-white/20 animate-spin-slow pointer-events-none" />

              {/* Spider Emblem */}
              <span className="text-3xl sm:text-4xl filter drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                🕷️
              </span>

              {/* TRIUMPH text */}
              <span
                className={`text-xs sm:text-sm font-black font-mono tracking-widest uppercase mt-1 transition-colors duration-300 ${
                  isCenterHovered ? "text-cyan-300" : "text-red-400"
                }`}
              >
                TRIUMPH
              </span>

              <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                CORE NODE
              </span>
            </motion.div>
          </div>

          {/* RADIAL WEB NODES (Interactive Feat Nodes) */}
          {nodes.map((node) => {
            const IconComponent = ICON_MAP[node.iconName] || Trophy;
            const isHovered = hoveredNodeId === node.id;
            const isSelected = selectedNodeId === node.id;
            const isMatching = isNodeMatching(node.category);

            // Convert SVG viewBox coordinates (1000x700) to relative percentages
            const leftPercent = (node.x / 1000) * 100;
            const topPercent = (node.y / 700) * 100;

            return (
              <div
                key={node.id}
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 ${
                  isMatching ? "opacity-100 scale-100" : "opacity-35 scale-90"
                }`}
              >
                <motion.div
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => setSelectedNodeId(node.id)}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative cursor-pointer group flex flex-col items-center"
                >
                  {/* Red -> Blue Glowing Node Halo on Hover/Select */}
                  <div
                    className={`absolute -inset-3 rounded-full blur-md transition-all duration-500 ${
                      isHovered || isSelected
                        ? "bg-blue-500/80 scale-125 shadow-[0_0_30px_rgba(59,130,246,0.9)] opacity-100"
                        : "bg-red-600/40 opacity-0 group-hover:opacity-80"
                    }`}
                  />

                  {/* Main Web Node Circle */}
                  <div
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zinc-950 border-2 transition-all duration-300 flex items-center justify-center shadow-xl ${
                      isHovered || isSelected
                        ? "border-blue-400 bg-zinc-900 text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.8)]"
                        : "border-red-600/80 text-red-400 group-hover:border-blue-400 group-hover:text-blue-400"
                    }`}
                  >
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300" />

                    {/* Category color indicator dot */}
                    <span
                      className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-zinc-950 ${
                        node.category === "triumphs"
                          ? "bg-amber-400 shadow-[0_0_8px_#f59e0b]"
                          : node.category === "activities"
                          ? "bg-red-500 shadow-[0_0_8px_#ef4444]"
                          : "bg-blue-500 shadow-[0_0_8px_#3b82f6]"
                      }`}
                    />
                  </div>

                  {/* Node Label Tooltip Pill */}
                  <div
                    className={`mt-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold whitespace-nowrap tracking-wide border transition-all duration-300 max-w-[150px] truncate shadow-lg ${
                      isHovered || isSelected
                        ? "bg-blue-950/90 border-blue-500/80 text-cyan-300 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        : "bg-zinc-900/90 border-zinc-800 text-zinc-300 group-hover:border-blue-500/60 group-hover:text-white"
                    }`}
                  >
                    {node.title}
                  </div>

                  {/* Issue Badge Pill */}
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                    {node.issueNo || "NODE FEAT"}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE / QUICK SELECTOR GRID BOTTOM DOCK */}
      <div className="relative z-10 max-w-4xl mx-auto mt-6 px-4">
        <div className="flex items-center justify-between mb-3 text-xs font-mono text-zinc-400 border-b border-zinc-800/80 pb-2">
          <span className="flex items-center gap-2 text-red-400 font-bold uppercase">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            INTERCONNECTED WEB NODES ({nodes.length})
          </span>
          <span className="text-zinc-500 hidden sm:inline">
            CLICK ANY NODE TO INSPECT DOSSIER
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;
            const IconComponent = ICON_MAP[node.iconName] || Trophy;

            return (
              <button
                key={node.id}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-2.5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isSelected || isHovered
                    ? "bg-blue-950/40 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] -translate-y-0.5"
                    : "bg-zinc-950/70 border-zinc-800/80 text-zinc-400 hover:border-red-500/50 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <IconComponent
                    className={`w-4 h-4 ${
                      isSelected || isHovered ? "text-cyan-400" : "text-red-400"
                    }`}
                  />
                  <span className="text-[9px] font-mono text-zinc-500">
                    {node.date}
                  </span>
                </div>
                <div className="text-xs font-bold font-mono truncate text-zinc-200">
                  {node.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SPIDER HUD DOSSIER MODAL / DETAILED OVERLAY */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            {/* Modal Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNodeId(null)}
              className="absolute inset-0"
            />

            {/* Modal Content Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-2xl bg-zinc-950 border-2 border-blue-500/80 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(59,130,246,0.4)] overflow-hidden text-white"
            >
              {/* Top Red & Blue HUD Accent Lines */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-cyan-400 to-blue-600" />
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedNodeId(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-blue-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => navigateNode(-1)}
                  className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-blue-500 transition-colors flex items-center gap-1 text-xs font-mono"
                >
                  <ChevronLeft className="w-4 h-4" /> PREV
                </button>
                <button
                  onClick={() => navigateNode(1)}
                  className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-blue-500 transition-colors flex items-center gap-1 text-xs font-mono"
                >
                  NEXT <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-zinc-500 ml-auto uppercase tracking-widest">
                  WEB NODE TELEMETRY
                </span>
              </div>

              {/* Header Badges */}
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="px-3 py-1 bg-blue-950/80 border border-blue-500/50 text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase rounded-md shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                  {selectedItem.issueNo || "TRIUMPH NODE"}
                </span>
                <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono uppercase">
                  {selectedItem.date}
                </span>
                <span className="px-2.5 py-1 bg-amber-950/60 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold uppercase rounded">
                  {selectedItem.badgeText}
                </span>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
                {selectedItem.title}
              </h2>
              <p className="text-sm font-mono text-cyan-400/90 mb-4">
                {selectedItem.tagline}
              </p>

              {/* Description */}
              <p className="text-sm text-zinc-300 leading-relaxed mb-6 bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl font-sans">
                {selectedItem.description}
              </p>

              {/* Bullet Highlights */}
              {selectedItem.highlights && selectedItem.highlights.length > 0 && (
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-mono uppercase text-zinc-400 font-bold tracking-wider mb-2">
                    FEAT HIGHLIGHTS // CANON RECORD
                  </h4>
                  {selectedItem.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Footer Actions */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-bold">STATUS: ACTIVE IN SPIDER-VERSE</span>
                </div>

                <button
                  onClick={() => setSelectedNodeId(null)}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all uppercase tracking-wider text-xs"
                >
                  DISMISS HUD
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
