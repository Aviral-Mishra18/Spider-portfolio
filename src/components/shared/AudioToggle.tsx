"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioToggle() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showHUD, setShowHUD] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const bgTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize or resume AudioContext
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play crisp Spider Web Shooter "Thwip" SFX
  const playThwipSFX = () => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Primary whoosh oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.18);

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);

      // Noise layer for silk hiss
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "highpass";
      noiseFilter.frequency.setValueAtTime(2000, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.15);
    } catch {
      // Audio context fallback
    }
  };

  // Play Spidey-Sense Beep / Chime on Hover
  const playHoverSFX = () => {
    if (!audioEnabled) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.06);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Audio fallback
    }
  };

  // Suit Online Activation Chime
  const playActivationChime = () => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.18, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.35);
      });
    } catch {
      // Audio fallback
    }
  };

  // Atmospheric Spider-Man Synth Drone & Sequence
  const startAtmosphere = () => {
    try {
      const ctx = getAudioContext();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
      masterGain.connect(ctx.destination);
      ambientGainRef.current = masterGain;

      // Ambient deep drone bass
      const bassOsc = ctx.createOscillator();
      bassOsc.type = "sawtooth";
      bassOsc.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

      const bassFilter = ctx.createBiquadFilter();
      bassFilter.type = "lowpass";
      bassFilter.frequency.setValueAtTime(220, ctx.currentTime);

      const bassGain = ctx.createGain();
      bassGain.gain.setValueAtTime(0.08, ctx.currentTime);

      bassOsc.connect(bassFilter);
      bassFilter.connect(bassGain);
      bassGain.connect(masterGain);
      bassOsc.start();

      // Atmospheric rhythmic pulse chords (Cyber Spidey Theme)
      const notes = [220, 261.63, 293.66, 329.63, 392.0]; // A minor pentatonic
      let step = 0;

      const schedulePulse = () => {
        if (!audioEnabled || !audioCtxRef.current) return;
        const now = ctx.currentTime;
        const note = notes[step % notes.length];
        step++;

        const pulseOsc = ctx.createOscillator();
        const pGain = ctx.createGain();
        const pFilter = ctx.createBiquadFilter();

        pulseOsc.type = "sine";
        pulseOsc.frequency.setValueAtTime(note, now);

        pFilter.type = "bandpass";
        pFilter.frequency.setValueAtTime(note * 2, now);

        pGain.gain.setValueAtTime(0.05, now);
        pGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        pulseOsc.connect(pFilter);
        pFilter.connect(pGain);
        pGain.connect(masterGain);

        pulseOsc.start(now);
        pulseOsc.stop(now + 0.75);

        bgTimerRef.current = setTimeout(schedulePulse, 850);
      };

      schedulePulse();
    } catch {
      // Audio fallback
    }
  };

  const stopAtmosphere = () => {
    if (bgTimerRef.current) {
      clearTimeout(bgTimerRef.current);
      bgTimerRef.current = null;
    }
    if (ambientGainRef.current && audioCtxRef.current) {
      try {
        ambientGainRef.current.gain.exponentialRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 0.3
        );
      } catch {
        // Safe ramp fallback
      }
    }
  };

  // Toggle Audio Master
  const toggleAudio = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    setShowHUD(true);
    setTimeout(() => setShowHUD(false), 2400);

    if (newState) {
      playActivationChime();
      startAtmosphere();
    } else {
      stopAtmosphere();
    }
  };

  // Listen to global interactive clicks & hovers when audio is enabled
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (!audioEnabled) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("a") || target?.closest("button") || target?.closest("[role='button']")) {
        playThwipSFX();
      }
    };

    const handleGlobalMouseOver = (e: MouseEvent) => {
      if (!audioEnabled) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("a") || target?.closest("button") || target?.closest("[role='button']")) {
        playHoverSFX();
      }
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });
    window.addEventListener("mouseover", handleGlobalMouseOver, { passive: true });

    return () => {
      window.removeEventListener("click", handleGlobalClick, { capture: true });
      window.removeEventListener("mouseover", handleGlobalMouseOver);
    };
  }, [audioEnabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAtmosphere();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Dynamic Audio HUD Status Toast */}
      <AnimatePresence>
        {showHUD && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-950/90 border border-red-500/40 text-[11px] font-mono shadow-[0_0_20px_rgba(239,68,68,0.35)] backdrop-blur-md flex items-center gap-2"
          >
            <Radio className={`w-3.5 h-3.5 ${audioEnabled ? "text-red-500 animate-pulse" : "text-zinc-500"}`} />
            <span className={audioEnabled ? "text-red-400 font-bold" : "text-zinc-400"}>
              {audioEnabled ? "SPIDEY-SUIT AUDIO: ONLINE (SFX + AMBIENT)" : "SUIT AUDIO: MUTED"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Sound Action Button */}
      <motion.button
        onClick={toggleAudio}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className={`relative p-3.5 rounded-full border backdrop-blur-md transition-all shadow-xl flex items-center justify-center cursor-pointer group ${
          audioEnabled
            ? "bg-red-950/80 border-red-500 text-white shadow-[0_0_25px_rgba(239,68,68,0.6)]"
            : "bg-zinc-900/80 border-zinc-700 text-zinc-400 hover:text-white hover:border-red-500/50"
        }`}
        title={audioEnabled ? "Mute Spidey Sound Effects & Atmosphere" : "Enable Spidey Audio & Web SFX"}
      >
        {/* Animated Sound Wave Equalizer Bars when ON */}
        {audioEnabled && (
          <div className="absolute -top-2 flex items-center gap-0.5 pointer-events-none">
            <span className="w-0.5 h-2 bg-red-400 animate-pulse" />
            <span className="w-0.5 h-3 bg-red-500 animate-bounce" />
            <span className="w-0.5 h-1.5 bg-red-400 animate-pulse" />
          </div>
        )}

        {audioEnabled ? (
          <Volume2 className="w-5 h-5 text-red-400 group-hover:text-white transition-colors animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
        )}
      </motion.button>
    </div>
  );
}

