"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isGrab, setIsGrab] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;
    setIsDesktop(true);

    // Hide native OS cursor globally across all elements
    document.documentElement.classList.add("custom-spider-cursor");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // 1. Instant 0-lag precision center point update
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }

      // Check grab/grabbing cursor states
      const bodyCursor = document.body.style.cursor;
      setIsGrab(bodyCursor === "grab");
      setIsGrabbing(bodyCursor === "grabbing");

      // 2. Interactive hover detection for clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest(
          "a, button, input, textarea, select, [role='button'], .cursor-pointer, [data-clickable]"
        );
        setIsHovered(!!clickable);
      }
    };

    const onMouseDown = () => {
      setIsClicked(true);
      if (document.body.style.cursor === "grabbing" || document.body.style.cursor === "grab") {
        setIsGrabbing(true);
      }
    };

    const onMouseUp = () => {
      setIsClicked(false);
      setIsGrabbing(false);
    };

    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    // Smooth fluid interpolation for outer Spider reticle
    const render = () => {
      ringX += (mouseX - ringX) * 0.24;
      ringY += (mouseY - ringY) * 0.24;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      }
      animFrame = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    animFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrame);
      document.documentElement.classList.remove("custom-spider-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      {/* 1. Instant Zero-Lag Center Precision Red Point */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)", transition: "opacity 0.2s" }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isGrabbing
              ? "w-2.5 h-2.5 bg-red-400 shadow-[0_0_12px_#ef4444]"
              : "w-1.5 h-1.5 bg-red-500 shadow-[0_0_8px_#ef4444]"
          }`}
        />
      </div>

      {/* 2. Fluid Following Spider-Sense Reticle */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998] will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)", transition: "opacity 0.2s" }}
      >
        <div
          className={`relative rounded-full border transition-all duration-150 flex items-center justify-center ${
            isGrabbing
              ? "w-6 h-6 border-red-500 bg-red-600/40 shadow-[0_0_24px_rgba(239,68,68,1)] scale-90"
              : isGrab
              ? "w-11 h-11 border-red-400 bg-red-500/15 shadow-[0_0_20px_rgba(239,68,68,0.6)] scale-110 -translate-x-1.5 -translate-y-1.5"
              : isClicked
              ? "w-6 h-6 border-red-500 bg-red-500/30 shadow-[0_0_18px_rgba(239,68,68,0.9)] scale-90"
              : isHovered
              ? "w-10 h-10 border-red-400 bg-red-500/15 shadow-[0_0_22px_rgba(239,68,68,0.7)] scale-110 -translate-x-1 -translate-y-1"
              : "w-8 h-8 border-red-500/70 shadow-[0_0_10px_rgba(239,68,68,0.35)]"
          }`}
        >
          {/* Spider Reticle Crosshairs when hovering or grabbing */}
          {(isHovered || isGrab || isGrabbing) && (
            <>
              <div className="absolute top-0 w-0.5 h-1.5 bg-red-400" />
              <div className="absolute bottom-0 w-0.5 h-1.5 bg-red-400" />
              <div className="absolute left-0 w-1.5 h-0.5 bg-red-400" />
              <div className="absolute right-0 w-1.5 h-0.5 bg-red-400" />
            </>
          )}

          {/* Grabbing pulse indicator */}
          {isGrabbing && (
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping opacity-75" />
          )}
        </div>
      </div>
    </>
  );
}
