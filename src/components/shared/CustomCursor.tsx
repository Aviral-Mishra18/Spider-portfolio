"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringVisualRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices with fine precision
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;
    setIsDesktop(true);

    // Hide native OS cursor globally across all elements
    document.documentElement.classList.add("custom-spider-cursor");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isClicking = false;
    let isGrabbing = false;
    let isGrab = false;
    let isVisible = false;
    let animFrame: number;

    // Direct DOM mutation for visual reticle updates — ZERO React re-renders = 100% 120fps smooth
    const updateRingVisual = () => {
      const el = ringVisualRef.current;
      if (!el) return;

      if (isGrabbing || (isClicking && isGrab)) {
        el.className =
          "relative rounded-full border border-red-500 bg-red-600/40 shadow-[0_0_24px_rgba(239,68,68,1)] w-6 h-6 scale-90 transition-all duration-150 flex items-center justify-center";
      } else if (isGrab) {
        el.className =
          "relative rounded-full border border-red-400 bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.7)] w-11 h-11 scale-105 transition-all duration-150 flex items-center justify-center";
      } else if (isClicking) {
        el.className =
          "relative rounded-full border border-red-500 bg-red-500/30 shadow-[0_0_18px_rgba(239,68,68,0.9)] w-6 h-6 scale-90 transition-all duration-150 flex items-center justify-center";
      } else if (isHovered) {
        el.className =
          "relative rounded-full border border-red-400 bg-red-500/15 shadow-[0_0_20px_rgba(239,68,68,0.6)] w-10 h-10 scale-110 transition-all duration-150 flex items-center justify-center";
      } else {
        el.className =
          "relative rounded-full border border-red-500/70 shadow-[0_0_10px_rgba(239,68,68,0.35)] w-8 h-8 transition-all duration-150 flex items-center justify-center";
      }
    };

    // Ultra-lightweight mousemove: ONLY stores position + updates instant hardware dot
    // ZERO React setState calls, ZERO expensive DOM queries!
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }

      // 0-lag instant point update directly on GPU composited layer
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Event-driven hover checks: ONLY fires when cursor enters an element
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const bodyCursor = document.body.style.cursor;
      isGrab = bodyCursor === "grab";
      isGrabbing = bodyCursor === "grabbing";

      const clickable = !!target.closest(
        "a, button, input, textarea, select, [role='button'], .cursor-pointer, [data-clickable]"
      );

      if (isHovered !== clickable) {
        isHovered = clickable;
        updateRingVisual();
      }
    };

    const onMouseDown = () => {
      isClicking = true;
      updateRingVisual();
    };

    const onMouseUp = () => {
      isClicking = false;
      updateRingVisual();
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    // High-responsiveness fluid interpolation loop (0.48 lerp factor)
    // NEVER lags or trails behind; perfectly synchronized with natural hand motion
    const render = () => {
      ringX += (mouseX - ringX) * 0.48;
      ringY += (mouseY - ringY) * 0.48;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      animFrame = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    animFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrame);
      document.documentElement.classList.remove("custom-spider-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      {/* 1. Instant 0-Lag Precision Red Point (Always concentric & centered) */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] will-change-transform opacity-0"
        style={{
          transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
          transition: "opacity 0.15s ease-out",
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
      </div>

      {/* 2. Fluid Following Spider Reticle (Concentric centered, zero wobble) */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998] will-change-transform opacity-0 flex items-center justify-center"
        style={{
          transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
          transition: "opacity 0.15s ease-out",
        }}
      >
        <div
          ref={ringVisualRef}
          className="relative rounded-full border border-red-500/70 shadow-[0_0_10px_rgba(239,68,68,0.35)] w-8 h-8 transition-all duration-150 flex items-center justify-center"
        >
          {/* Subtle Spider Reticle Crosshairs */}
          <div className="absolute top-0 w-0.5 h-1.5 bg-red-400 opacity-80" />
          <div className="absolute bottom-0 w-0.5 h-1.5 bg-red-400 opacity-80" />
          <div className="absolute left-0 w-1.5 h-0.5 bg-red-400 opacity-80" />
          <div className="absolute right-0 w-1.5 h-0.5 bg-red-400 opacity-80" />
        </div>
      </div>
    </>
  );
}
