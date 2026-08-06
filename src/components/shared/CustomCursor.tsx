"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktop)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;
    setIsDesktop(true);

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest("[role='button']") ||
        target?.classList.contains("interactive")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Web Line drawn to origin on click */}
      {isClicked && (
        <svg className="absolute inset-0 w-full h-full">
          <line
            x1="0"
            y1="0"
            x2={mousePosition.x}
            y2={mousePosition.y}
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            className="opacity-75"
          />
        </svg>
      )}

      {/* Spider Dot / Reticle Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-red-500/80 flex items-center justify-center pointer-events-none mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isClicked ? 0.75 : isHovered ? 1.5 : 1,
          borderColor: isHovered ? "#ef4444" : "#3b82f6",
          backgroundColor: isHovered ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className={`w-1.5 h-1.5 rounded-full ${isHovered ? "bg-red-500" : "bg-blue-500"}`} />
      </motion.div>
    </div>
  );
}
