"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface EntryGateProps {
  onEnter?: () => void;
}

export default function EntryGate({ onEnter }: EntryGateProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [showWebBurst, setShowWebBurst] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const spideyWrapperRef = useRef<HTMLDivElement>(null);
  const spideyImgRef = useRef<HTMLImageElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const swingTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    setMounted(true);
    const hasEntered = sessionStorage.getItem("hasEnteredSite");
    if (!hasEntered) {
      setVisible(true);
    } else {
      onEnter?.();
    }
  }, [onEnter]);

  // Entrance & Idle Pendulum Swing GSAP timeline
  useEffect(() => {
    if (!visible || !spideyWrapperRef.current) return;

    // Reset transform origin for top hanging pendulum
    gsap.set(spideyWrapperRef.current, {
      transformOrigin: "top center",
    });

    // 1. Initial Spider-Man Dramatic Drop Down Animation from Above Top Viewport
    const dropTl = gsap.timeline({
      onComplete: () => {
        // Start continuous gentle pendulum swing once dropped down
        swingTweenRef.current = gsap.to(spideyWrapperRef.current, {
          rotation: 3,
          duration: 2.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      },
    });

    dropTl.fromTo(
      spideyWrapperRef.current,
      { y: "-110vh", rotation: -12, scale: 0.8 },
      { y: 0, rotation: -3, scale: 1, duration: 1.2, ease: "back.out(1.3)" }
    );

    dropTl.fromTo(
      promptRef.current,
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    // Subtle background breathing pulse
    if (bgGlowRef.current) {
      gsap.to(bgGlowRef.current, {
        opacity: 0.8,
        scale: 1.15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    return () => {
      swingTweenRef.current?.kill();
      dropTl.kill();
    };
  }, [visible]);

  // Synthetic Web-Shoot "Thwip" Sound using Web Audio API
  const playWebShootSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Dual oscillator thwip sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.18);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1800, ctx.currentTime);
      filter.Q.setValueAtTime(4, ctx.currentTime);

      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {
      // Audio playback fallback
    }
  };

  const handleEnter = () => {
    if (isEntering || !containerRef.current) return;
    setIsEntering(true);
    setShowWebBurst(true);

    // Play Web-Shoot Sound
    playWebShootSound();

    // Stop continuous idle pendulum
    if (swingTweenRef.current) {
      swingTweenRef.current.kill();
    }

    const mainTl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("hasEnteredSite", "true");
        setVisible(false);
        onEnter?.();

        // 🌟 Multi-Stage Staggered Entrance Reveal for Entire Site UI
        const revealTl = gsap.timeline();

        // 1. Header Navbar slides down with elastic bounce
        revealTl.fromTo(
          "header",
          { y: -90, opacity: 0, filter: "blur(6px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "back.out(1.2)" }
        );

        // 2. 3D Web Canvas scene scales up from center
        revealTl.fromTo(
          "[data-gsap='3d-scene']",
          { scale: 0.3, opacity: 0, rotate: -15 },
          { scale: 1, opacity: 1, rotate: 0, duration: 0.9, ease: "power3.out" },
          "-=0.5"
        );

        // 3. Hero Main Title ("Aviral Mishra") drops in with glowing clearance
        revealTl.fromTo(
          "[data-gsap='title']",
          { y: 45, opacity: 0, filter: "blur(14px)", scale: 0.9 },
          { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        );

        // 4. Subtitle slides up
        revealTl.fromTo(
          "[data-gsap='subtitle']",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );

        // 5. Action Buttons ("View Projects", "Suit Up") pop in with staggered bounce
        revealTl.fromTo(
          "[data-gsap='buttons'] > *",
          { y: 40, opacity: 0, scale: 0.85 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.5)" },
          "-=0.3"
        );
      },
    });

    // Step 1: Spidey recoils down slightly then zip-slings UP out of frame (~0.4s)
    mainTl
      .to(spideyWrapperRef.current, {
        y: 20,
        scale: 1.1,
        duration: 0.1,
        ease: "power1.out",
      })
      .to(spideyWrapperRef.current, {
        y: "-140vh",
        scale: 0.85,
        rotation: 10,
        duration: 0.4,
        ease: "power3.in",
      });

    // Step 2: Prompt button snaps down & fades out
    mainTl.to(
      promptRef.current,
      {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.2,
        ease: "power2.in",
      },
      "-=0.35"
    );

    // Step 3: Full Screen Overlay Fades Out with Blur-to-Clear (~0.5s)
    mainTl.to(
      containerRef.current,
      {
        opacity: 0,
        filter: "blur(16px)",
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.2"
    );
  };

  if (!mounted || !visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-zinc-950 text-white overflow-hidden select-none font-mono"
    >
      {/* Background Cyberpunk Ambient Glows & Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          ref={bgGlowRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-600/25 rounded-full blur-[150px] opacity-60"
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/15 rounded-full blur-[130px]" />

        {/* Subtle Cyberpunk Scanlines Grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Top Banner Tag */}
      <div className="z-10 pt-6 text-xs text-zinc-500 tracking-widest uppercase flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" />
        SYSTEM_GATEWAY // AVIRAL.SYS_v2.6
      </div>

      {/* Center Hanging Spider-Man Container */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-start w-full -mt-2">
        {/* Animated Web Line extending from very top of screen */}
        <div className="w-[2px] bg-gradient-to-b from-zinc-300 via-white to-red-500/80 h-[10vh] max-h-[80px] shadow-[0_0_8px_rgba(255,255,255,0.8)] -mb-1 z-10" />

        <div
          ref={spideyWrapperRef}
          onClick={handleEnter}
          className="cursor-pointer group relative flex flex-col items-center transition-transform duration-300 hover:scale-[1.05]"
          title="Click Spider-Man to enter"
        >
          {/* Glowing Spidey Sense Halo on Hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-600/0 via-red-600/30 to-cyan-500/30 group-hover:via-red-500/50 blur-3xl rounded-full transition-all duration-300 -z-10" />

          {/* Spider-Man Hanging Image */}
          <img
            ref={spideyImgRef}
            src="/assets/spiderman-hang.png"
            alt="Spider-Man Hanging"
            className="w-auto h-[48vh] max-h-[520px] min-h-[280px] object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_0_40px_rgba(239,68,68,0.85)] transition-all duration-300"
          />

          {/* Spidey Sense Indicator Badge on Hover */}
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 mt-2 px-4 py-1.5 bg-red-600 text-white text-[11px] font-mono uppercase font-black tracking-widest rounded-full border border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.9)] animate-bounce flex items-center gap-1.5">
            <span className="animate-spin text-yellow-300">⚡</span> CLICK SPIDEY TO LAUNCH <span className="animate-spin text-yellow-300">⚡</span>
          </div>
        </div>

        {/* Web Burst SVG Ripple Shockwave Effect when clicked */}
        {showWebBurst && (
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
            <svg viewBox="0 0 100 100" className="w-64 h-64 stroke-red-500 fill-none stroke-[2] animate-ping opacity-75">
              <circle cx="50" cy="50" r="20" />
              <circle cx="50" cy="50" r="40" />
              <line x1="50" y1="0" x2="50" y2="100" />
              <line x1="0" y1="50" x2="100" y2="50" />
            </svg>
          </div>
        )}
      </div>

      {/* Bottom Terminal Prompt & Interactive Button */}
      <div
        ref={promptRef}
        className="z-20 pb-12 px-6 flex flex-col items-center text-center gap-4 max-w-md w-full"
      >
        <button
          onClick={handleEnter}
          className="w-full py-3.5 px-6 bg-zinc-900/90 hover:bg-red-950/70 border border-zinc-700 hover:border-red-500 rounded-xl text-red-500 hover:text-red-400 font-mono text-sm md:text-base tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] group cursor-pointer flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <span className="text-zinc-500 group-hover:text-red-400 transition-colors">&gt;</span>
          <span className="font-bold tracking-widest">[ CLICK SPIDEY TO BOOT AVIRAL.SYS ]</span>
          <span className="inline-block w-2.5 h-4 bg-red-500 animate-pulse ml-1" />
        </button>

        <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping inline-block" />
          STATUS: LOCKED // CLICK SPIDER-MAN TO AUTHORIZE ACCESS
        </p>
      </div>
    </div>
  );
}
