"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  vx?: number;
  vy?: number;
}

interface ClickWave {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickWaves, setClickWaves] = useState<ClickWave[]>([]);
  
  const prevPosRef = useRef({ x: -100, y: -100 });
  const particleIdRef = useRef(0);
  const clickIdRef = useRef(0);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktop)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;
    setIsDesktop(true);

    // Apply cursor-none class to html root
    document.documentElement.classList.add("custom-spider-cursor");

    let animFrame: number;
    let targetX = -100;
    let targetY = -100;
    let currentTrailX = -100;
    let currentTrailY = -100;

    const updateTrail = () => {
      // Smooth lerp for silk trailing node
      currentTrailX += (targetX - currentTrailX) * 0.24;
      currentTrailY += (targetY - currentTrailY) * 0.24;
      setTrailPosition({ x: currentTrailX, y: currentTrailY });
      animFrame = requestAnimationFrame(updateTrail);
    };
    animFrame = requestAnimationFrame(updateTrail);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      targetX = x;
      targetY = y;
      setMousePosition({ x, y });

      // Calculate directional rotation angle
      const dx = x - prevPosRef.current.x;
      const dy = y - prevPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 3) {
        const rad = Math.atan2(dy, dx);
        const deg = (rad * 180) / Math.PI + 90; // +90 to align spider head with forward motion
        setAngle(deg);
        prevPosRef.current = { x, y };

        // Spawn occasional silk spark particle on fast movement
        if (dist > 12 && Math.random() > 0.5) {
          const newParticle: Particle = {
            id: ++particleIdRef.current,
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            size: Math.random() * 3.5 + 2,
          };
          setParticles((prev) => [...prev.slice(-16), newParticle]);
        }
      }

      // Check if hovering over interactive elements (cards, buttons, links, etc.)
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest("a") ||
          target.closest("button") ||
          target.closest("[role='button']") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("select") ||
          target.closest(".cursor-pointer") ||
          target.closest("[data-cursor]") ||
          target.closest(".interactive") ||
          target.closest("[tabindex]:not([tabindex='-1'])")
        );
        setIsHovered(isInteractive);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      // Spawn a web shockwave on click
      const newWave: ClickWave = {
        id: ++clickIdRef.current,
        x: e.clientX,
        y: e.clientY,
      };
      setClickWaves((prev) => [...prev.slice(-4), newWave]);
    };

    const onMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(animFrame);
      document.documentElement.classList.remove("custom-spider-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // Periodically clean up old particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 350);
    return () => clearTimeout(timer);
  }, [particles]);

  // Clean up click waves
  useEffect(() => {
    if (clickWaves.length === 0) return;
    const timer = setTimeout(() => {
      setClickWaves((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [clickWaves]);

  if (!isDesktop) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Dynamic Red Silk Line connecting Spider to smooth trailing anchor */}
      <svg className="absolute inset-0 w-full h-full">
        {mousePosition.x >= 0 && (
          <>
            {/* Outer red silk glow */}
            <line
              x1={trailPosition.x}
              y1={trailPosition.y}
              x2={mousePosition.x}
              y2={mousePosition.y}
              stroke="rgba(239, 68, 68, 0.45)"
              strokeWidth={isHovered ? "3.5" : "2"}
              strokeLinecap="round"
            />
            {/* Inner crisp silk thread */}
            <line
              x1={trailPosition.x}
              y1={trailPosition.y}
              x2={mousePosition.x}
              y2={mousePosition.y}
              stroke={isHovered ? "#ff3b30" : "rgba(255, 255, 255, 0.75)"}
              strokeWidth={isHovered ? "1.8" : "1"}
              strokeDasharray={isHovered ? "none" : "3 3"}
              strokeLinecap="round"
            />
          </>
        )}
      </svg>

      {/* Trailing Web Dust / Energy Sparks (Spider Red & White Glow) */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.9, scale: 1 }}
            animate={{ opacity: 0, scale: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: isHovered ? "#ff1e27" : "#ef4444",
              boxShadow: isHovered
                ? "0 0 10px #ff1e27, 0 0 4px #ffffff"
                : "0 0 8px #ef4444, 0 0 3px #f87171",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Web Shockwave Click Burst */}
      <AnimatePresence>
        {clickWaves.map((w) => (
          <motion.div
            key={w.id}
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: w.x - 24,
              top: w.y - 24,
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "2px solid #ef4444",
              boxShadow: "0 0 15px rgba(239, 68, 68, 0.8), inset 0 0 10px rgba(239, 68, 68, 0.4)",
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Trailing Web Node (Red Anchor Core) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        animate={{
          x: trailPosition.x - 4,
          y: trailPosition.y - 4,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      >
        <div
          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
            isHovered
              ? "bg-red-500 shadow-[0_0_12px_#ff1e27,0_0_4px_#ffffff]"
              : "bg-red-600 shadow-[0_0_8px_#ef4444]"
          }`}
        />
      </motion.div>

      {/* Main Animated Red Spider Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
        animate={{
          x: mousePosition.x - 22,
          y: mousePosition.y - 22,
          scale: isClicked ? 0.85 : isHovered ? 1.35 : 1,
          rotate: isHovered ? 0 : angle,
        }}
        transition={{
          x: { type: "spring", stiffness: 1400, damping: 45, mass: 0.1 },
          y: { type: "spring", stiffness: 1400, damping: 45, mass: 0.1 },
          scale: { type: "spring", stiffness: 650, damping: 26 },
          rotate: { type: "spring", stiffness: 380, damping: 24 },
        }}
      >
        {/* Spidey-Sense Radar Warning Rings & Comic Squiggles when Hovering */}
        {isHovered && (
          <>
            {/* Outer Pulsing Crimson Web Radar Ring */}
            <motion.div
              className="absolute -inset-3 rounded-full border border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{
                scale: [0.95, 1.55, 0.95],
                opacity: [0.4, 0.95, 0.4],
              }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Secondary Dashed Web Scanner Ring */}
            <motion.div
              className="absolute -inset-5 rounded-full border border-dashed border-red-400/60"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{
                scale: [1, 1.7, 1],
                opacity: [0.2, 0.75, 0.2],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            />
            {/* Spidey-Sense Warning Arcs (Comic Style Squiggles) */}
            <motion.div
              className="absolute -top-3.5 flex items-center justify-center gap-1.5"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: -3 }}
              exit={{ opacity: 0 }}
            >
              <span className="w-1 h-2.5 bg-yellow-400 rotate-[-28deg] rounded-full shadow-[0_0_8px_#facc15]" />
              <span className="w-1.5 h-3.5 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]" />
              <span className="w-1 h-2.5 bg-yellow-400 rotate-[28deg] rounded-full shadow-[0_0_8px_#facc15]" />
            </motion.div>
          </>
        )}

        {/* Enhanced Red Spider SVG Vector Graphic */}
        <div className="relative w-11 h-11 flex items-center justify-center filter drop-shadow-[0_0_12px_rgba(239,68,68,0.95)] drop-shadow-[0_0_4px_rgba(255,59,48,0.8)]">
          <svg
            viewBox="0 0 64 64"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Vibrant Spider-Man Crimson Gradient */}
              <linearGradient id="spideyMainRed" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff3333" />
                <stop offset="45%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>

              {/* Glowing Highlights for Legs & Shell */}
              <linearGradient id="spideyLegRed" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff4d4d" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>

              {/* Spider Mask Lens Gradient */}
              <linearGradient id="spideyEyeWhite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
            </defs>

            {/* Glowing Red Aura Backing */}
            <circle
              cx="32"
              cy="32"
              r="15"
              fill="url(#spideyMainRed)"
              opacity={isHovered ? 0.35 : 0.2}
            />

            {/* Spider Legs - Left Side (4 Articulated Legs) */}
            <motion.path
              d="M30 24 L15 11 L8 17"
              stroke="url(#spideyLegRed)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M30 24 L13 9 L6 15" : "M30 24 L15 11 L8 17",
              }}
              transition={{ duration: 0.22 }}
            />
            <motion.path
              d="M30 27 L12 21 L5 29"
              stroke="url(#spideyLegRed)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M30 27 L10 19 L3 27" : "M30 27 L12 21 L5 29",
              }}
              transition={{ duration: 0.22 }}
            />
            <motion.path
              d="M30 33 L13 39 L7 48"
              stroke="url(#spideyLegRed)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M30 33 L11 41 L5 51" : "M30 33 L13 39 L7 48",
              }}
              transition={{ duration: 0.22 }}
            />
            <motion.path
              d="M30 37 L16 50 L12 60"
              stroke="url(#spideyLegRed)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M30 37 L14 53 L10 63" : "M30 37 L16 50 L12 60",
              }}
              transition={{ duration: 0.22 }}
            />

            {/* Spider Legs - Right Side (4 Articulated Legs) */}
            <motion.path
              d="M34 24 L49 11 L56 17"
              stroke="url(#spideyLegRed)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M34 24 L51 9 L58 15" : "M34 24 L49 11 L56 17",
              }}
              transition={{ duration: 0.22 }}
            />
            <motion.path
              d="M34 27 L52 21 L59 29"
              stroke="url(#spideyLegRed)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M34 27 L54 19 L61 27" : "M34 27 L52 21 L59 29",
              }}
              transition={{ duration: 0.22 }}
            />
            <motion.path
              d="M34 33 L51 39 L57 48"
              stroke="url(#spideyLegRed)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M34 33 L53 41 L59 51" : "M34 33 L51 39 L57 48",
              }}
              transition={{ duration: 0.22 }}
            />
            <motion.path
              d="M34 37 L48 50 L52 60"
              stroke="url(#spideyLegRed)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M34 37 L50 53 L54 63" : "M34 37 L48 50 L52 60",
              }}
              transition={{ duration: 0.22 }}
            />

            {/* Leg Joint Accent Nodes (White / Gold Tech Pips) */}
            <circle cx="15" cy="11" r="1" fill="#ffffff" />
            <circle cx="12" cy="21" r="1" fill="#ffffff" />
            <circle cx="13" cy="39" r="1" fill="#ffffff" />
            <circle cx="16" cy="50" r="1" fill="#ffffff" />
            <circle cx="49" cy="11" r="1" fill="#ffffff" />
            <circle cx="52" cy="21" r="1" fill="#ffffff" />
            <circle cx="51" cy="39" r="1" fill="#ffffff" />
            <circle cx="48" cy="50" r="1" fill="#ffffff" />

            {/* Spider Head & Mandibles */}
            <path
              d="M32 14 L28 20 L36 20 Z"
              fill="url(#spideyMainRed)"
              stroke="#ffffff"
              strokeWidth="0.8"
            />

            {/* Iconic Spider Mask Lenses / Eyes on Head */}
            {/* Left Eye */}
            <path
              d="M29 17.5 L31.2 16.5 L31 19 Z"
              fill="url(#spideyEyeWhite)"
              stroke="#000000"
              strokeWidth="0.6"
            />
            {/* Right Eye */}
            <path
              d="M35 17.5 L32.8 16.5 L33 19 Z"
              fill="url(#spideyEyeWhite)"
              stroke="#000000"
              strokeWidth="0.6"
            />

            {/* Cephalothorax (Mid Body Armor) */}
            <ellipse
              cx="32"
              cy="25"
              rx="4.5"
              ry="5.5"
              fill="url(#spideyMainRed)"
              stroke="#ffffff"
              strokeWidth="1"
            />

            {/* Abdomen (Lower Body - Sleek Spider Emblem Shape) */}
            <path
              d="M32 28 C27 33, 27 41, 32 47 C37 41, 37 33, 32 28 Z"
              fill="url(#spideyMainRed)"
              stroke={isHovered ? "#fde047" : "#fca5a5"}
              strokeWidth="1.2"
            />

            {/* Spider Chest Web Webbing Lines (Interior Armor Detail) */}
            <line x1="32" y1="30" x2="32" y2="44" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
            <line x1="29.5" y1="35" x2="34.5" y2="35" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
            <line x1="30" y1="40" x2="34" y2="40" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />

            {/* Center Core Web Reactor / Spider Spark Dot */}
            <circle
              cx="32"
              cy="35"
              r="2.2"
              fill={isHovered ? "#ffffff" : "#fef08a"}
              className="animate-pulse"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
