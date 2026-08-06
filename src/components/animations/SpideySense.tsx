"use client";

import { motion } from "framer-motion";

interface SpideySenseProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "red" | "blue";
}

export default function SpideySense({
  children,
  className = "",
  glowColor = "red",
}: SpideySenseProps) {
  const glowStyles =
    glowColor === "red"
      ? "hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
      : "hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]";

  return (
    <motion.div
      className={`relative inline-block transition-shadow duration-300 rounded-lg ${glowStyles} ${className}`}
      whileHover={{
        scale: 1.02,
        x: [0, -1.5, 1.5, -1, 1, 0],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 0.15,
            ease: "easeInOut",
          },
          scale: { duration: 0.2 },
        },
      }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
}
