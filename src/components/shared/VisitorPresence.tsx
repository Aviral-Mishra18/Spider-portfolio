"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SpiderDot {
  id: string;
  x: number; // percentage
  y: number; // percentage
}

export default function VisitorPresence() {
  const [dots, setDots] = useState<SpiderDot[]>([]);

  useEffect(() => {
    // Generate initial small set of crawler dots around edges
    const initialDots: SpiderDot[] = Array.from({ length: 4 }).map((_, i) => ({
      id: `dot-${i}`,
      x: i % 2 === 0 ? Math.random() * 5 + 2 : Math.random() * 5 + 93,
      y: Math.random() * 80 + 10,
    }));
    setDots(initialDots);

    // Periodically shift spider dots along page margins
    const interval = setInterval(() => {
      setDots((prevDots) =>
        prevDots.map((dot) => ({
          ...dot,
          x: Math.max(1, Math.min(98, dot.x + (Math.random() * 4 - 2))),
          y: Math.max(5, Math.min(95, dot.y + (Math.random() * 6 - 3))),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]"
          animate={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
          }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
        </motion.div>
      ))}
    </div>
  );
}
