"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Suit-up style transition: start clipped from bottom, reveal upwards
    gsap.fromTo(
      containerRef.current,
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        opacity: 0,
        y: 50
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        clearProps: "all" // clean up after animation
      }
    );
  }, [pathname]); // re-run on path change

  return (
    <div ref={containerRef} className="will-change-transform">
      {children}
    </div>
  );
}
