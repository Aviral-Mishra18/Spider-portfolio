"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const prevPosRef = useRef({ x: -100, y: -100 });
  const particleIdRef = useRef(0);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktop)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;
    setIsDesktop(true);

    // Apply cursor-none class to body
    document.documentElement.classList.add("custom-spider-cursor");

    let animFrame: number;
    let targetX = -100;
    let targetY = -100;
    let currentTrailX = -100;
    let currentTrailY = -100;

    const updateTrail = () => {
      // Smooth lerp for silk trailing node
      currentTrailX += (targetX - currentTrailX) * 0.22;
      currentTrailY += (targetY - currentTrailY) * 0.22;
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
        if (dist > 15 && Math.random() > 0.6) {
          const newParticle: Particle = {
            id: ++particleIdRef.current,
            x: x + (Math.random() - 0.5) * 8,
            y: y + (Math.random() - 0.5) * 8,
            size: Math.random() * 3 + 2,
          };
          setParticles((prev) => [...prev.slice(-12), newParticle]);
        }
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest("[role='button']") ||
        target?.closest("input") ||
        target?.closest("textarea") ||
        target?.classList.contains("interactive")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicked(true);
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
    }, 400);
    return () => clearTimeout(timer);
  }, [particles]);

  if (!isDesktop) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* Dynamic Silk Line connecting Spider to smooth trailing anchor */}
      <svg className="absolute inset-0 w-full h-full">
        {mousePosition.x >= 0 && (
          <line
            x1={trailPosition.x}
            y1={trailPosition.y}
            x2={mousePosition.x}
            y2={mousePosition.y}
            stroke={isHovered ? "#ef4444" : "rgba(255, 255, 255, 0.4)"}
            strokeWidth={isHovered ? "2" : "1"}
            strokeDasharray={isHovered ? "none" : "2 3"}
            strokeOpacity={0.6}
          />
        )}
      </svg>

      {/* Trailing Web Dust Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: isHovered ? "#ef4444" : "#60a5fa",
              boxShadow: isHovered
                ? "0 0 8px #ef4444"
                : "0 0 6px #60a5fa",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Trailing Web Node */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        animate={{
          x: trailPosition.x - 3,
          y: trailPosition.y - 3,
          scale: isHovered ? 1.4 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full ${
            isHovered
              ? "bg-red-500 shadow-[0_0_8px_#ef4444]"
              : "bg-cyan-400/80 shadow-[0_0_6px_#38bdf8]"
          }`}
        />
      </motion.div>

      {/* Main Animated Spider Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
        animate={{
          x: mousePosition.x - 18,
          y: mousePosition.y - 18,
          scale: isClicked ? 0.82 : isHovered ? 1.35 : 1,
          rotate: isHovered ? 0 : angle,
        }}
        transition={{
          x: { type: "spring", stiffness: 1400, damping: 45, mass: 0.1 },
          y: { type: "spring", stiffness: 1400, damping: 45, mass: 0.1 },
          scale: { type: "spring", stiffness: 600, damping: 25 },
          rotate: { type: "spring", stiffness: 350, damping: 22 },
        }}
      >
        {/* Spidey-Sense Radar Warning Rings when Hovering Interactive Elements */}
        {isHovered && (
          <>
            <motion.div
              className="absolute -inset-2 rounded-full border border-red-500/60"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.9, 1.45, 0.9],
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -inset-4 rounded-full border border-dashed border-cyan-400/50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.2, 0.7, 0.2],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Spidey-Sense Warning Arcs (Comic Style Squiggles) */}
            <motion.div
              className="absolute -top-3 flex items-center justify-center gap-1.5"
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: -2 }}
              exit={{ opacity: 0 }}
            >
              <span className="w-1 h-2 bg-yellow-400 rotate-[-25deg] rounded-full shadow-[0_0_6px_#facc15]" />
              <span className="w-1 h-3 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
              <span className="w-1 h-2 bg-yellow-400 rotate-[25deg] rounded-full shadow-[0_0_6px_#facc15]" />
            </motion.div>
          </>
        )}

        {/* Spider SVG Vector Graphic */}
        <div className="relative w-9 h-9 flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(239,68,68,0.85)]">
          <svg
            viewBox="0 0 64 64"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="spideyRedGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ff4d4d" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </linearGradient>
              <linearGradient id="spideyBlueGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <filter id="spiderGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Glowing Suit Background Glow */}
            <circle cx="32" cy="32" r="14" fill={isHovered ? "url(#spideyRedGrad)" : "url(#spideyBlueGrad)"} opacity={0.25} />

            {/* Spider Legs - Left Side (Upper to Lower) */}
            <motion.path
              d="M30 24 L16 12 L10 18"
              stroke={isHovered ? "#ef4444" : "#38bdf8"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M30 24 L14 10 L8 16" : "M30 24 L16 12 L10 18",
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.path
              d="M30 27 L13 22 L7 29"
              stroke={isHovered ? "#ef4444" : "#38bdf8"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M30 27 L11 20 L5 28" : "M30 27 L13 22 L7 29",
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.path
              d="M30 33 L14 38 L8 46"
              stroke={isHovered ? "#ef4444" : "#38bdf8"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M30 33 L12 40 L6 49" : "M30 33 L14 38 L8 46",
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.path
              d="M30 37 L17 49 L13 58"
              stroke={isHovered ? "#ef4444" : "#38bdf8"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M30 37 L15 52 L11 61" : "M30 37 L17 49 L13 58",
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Spider Legs - Right Side (Upper to Lower) */}
            <motion.path
              d="M34 24 L48 12 L54 18"
              stroke={isHovered ? "#ef4444" : "#38bdf8"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M34 24 L50 10 L56 16" : "M34 24 L48 12 L54 18",
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.path
              d="M34 27 L51 22 L57 29"
              stroke={isHovered ? "#ef4444" : "#38bdf8"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M34 27 L53 20 L59 28" : "M34 27 L51 22 L57 29",
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.path
              d="M34 33 L50 38 L56 46"
              stroke={isHovered ? "#ef4444" : "#38bdf8"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M34 33 L52 40 L58 49" : "M34 33 L50 38 L56 46",
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.path
              d="M34 37 L47 49 L51 58"
              stroke={isHovered ? "#ef4444" : "#38bdf8"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                d: isHovered ? "M34 37 L49 52 L53 61" : "M34 37 L47 49 L51 58",
              }}
              transition={{ duration: 0.2 }}
            />

            {/* Spider Head & Mandibles */}
            <path
              d="M32 15 L29 20 L35 20 Z"
              fill={isHovered ? "#ef4444" : "#ffffff"}
            />
            {/* Glowing Spider Mask Eyes on Head */}
            <circle cx="30.5" cy="18" r="0.8" fill="#ffffff" />
            <circle cx="33.5" cy="18" r="0.8" fill="#ffffff" />

            {/* Cephalothorax (Mid Body) */}
            <ellipse
              cx="32"
              cy="25"
              rx="4"
              ry="5"
              fill="url(#spideyRedGrad)"
              stroke="#ffffff"
              strokeWidth="0.8"
            />

            {/* Abdomen (Lower Body - Sleek Spider Emblem Shape) */}
            <path
              d="M32 28 C28 32, 28 40, 32 46 C36 40, 36 32, 32 28 Z"
              fill="url(#spideyRedGrad)"
              stroke={isHovered ? "#fef08a" : "#93c5fd"}
              strokeWidth="1"
            />

            {/* Center Core Web Reactor Dot */}
            <circle
              cx="32"
              cy="34"
              r="2"
              fill={isHovered ? "#ffffff" : "#38bdf8"}
              className="animate-pulse"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

