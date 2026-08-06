"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WebLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hard cap: dismiss after 1.5 seconds max
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-white cursor-pointer select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          onClick={() => setLoading(false)}
        >
          {/* Animated SVG Spider Web Drawing */}
          <div className="w-24 h-24 mb-4 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-red-500 fill-none stroke-[2]">
              {/* Concentric Web Rings */}
              <motion.circle
                cx="50"
                cy="50"
                r="15"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="30"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              />
              {/* Radial Web Spoke Lines */}
              <motion.line
                x1="50"
                y1="5"
                x2="50"
                y2="95"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              />
              <motion.line
                x1="5"
                y1="50"
                x2="95"
                y2="50"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              />
              <motion.line
                x1="18"
                y1="18"
                x2="82"
                y2="82"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.line
                x1="82"
                y1="18"
                x2="18"
                y2="82"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </svg>
          </div>

          <p className="text-sm font-mono tracking-widest text-zinc-400 uppercase animate-pulse">
            Slinging Webs...
          </p>
          <span className="text-xs text-zinc-600 mt-2">(Click to skip)</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
