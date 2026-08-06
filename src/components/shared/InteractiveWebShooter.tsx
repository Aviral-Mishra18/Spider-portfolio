"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface WebShot {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export default function InteractiveWebShooter() {
  const router = useRouter();
  const [shots, setShots] = useState<WebShot[]>([]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a, button, [role='button']");
      if (!target) return;

      const href = target.getAttribute("href");
      // If it's a internal page link
      if (href && href.startsWith("/")) {
        e.preventDefault();

        // Calculate target element center coordinates
        const rect = target.getBoundingClientRect();
        const endX = rect.left + rect.width / 2;
        const endY = rect.top + rect.height / 2;

        // Origin: Top right Spider-Man position
        const startX = window.innerWidth - 48;
        const startY = 48;

        const shotId = `shot-${Date.now()}`;
        setShots((prev) => [...prev, { id: shotId, startX, startY, endX, endY }]);

        // Sound effect trigger
        try {
          const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(900, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
          gain.gain.setValueAtTime(0.4, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.2);
        } catch {
          // Audio fallback
        }

        // Navigate after web shoot animation completes (300ms)
        setTimeout(() => {
          setShots((prev) => prev.filter((s) => s.id !== shotId));
          router.push(href);
        }, 320);
      }
    };

    window.addEventListener("click", handleGlobalClick, true);
    return () => window.removeEventListener("click", handleGlobalClick, true);
  }, [router]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {shots.map((shot) => (
          <svg key={shot.id} className="absolute inset-0 w-full h-full">
            {/* Realistic SVG Web Line with Web Threads */}
            <motion.line
              x1={shot.startX}
              y1={shot.startY}
              x2={shot.endX}
              y2={shot.endY}
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            />
            {/* Inner White Core Line for realistic web texture */}
            <motion.line
              x1={shot.startX}
              y1={shot.startY}
              x2={shot.endX}
              y2={shot.endY}
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            />
            {/* Web Splat Impact Burst at destination */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.15 }}
            >
              <circle cx={shot.endX} cy={shot.endY} r="8" fill="rgba(239, 68, 68, 0.4)" />
              <circle cx={shot.endX} cy={shot.endY} r="4" fill="#ffffff" />
            </motion.g>
          </svg>
        ))}
      </AnimatePresence>
    </div>
  );
}
