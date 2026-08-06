"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggle() {
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Synthesize web-shoot SFX on demand using Web Audio API
  const playWebShootSFX = () => {
    if (!audioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Audio context fallback
    }
  };

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a") || target?.closest("button")) {
        playWebShootSFX();
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [audioEnabled]);

  return (
    <button
      onClick={() => setAudioEnabled(!audioEnabled)}
      className="fixed bottom-6 right-6 z-40 p-3 bg-zinc-900/80 border border-white/10 rounded-full text-zinc-300 hover:text-white hover:border-red-500/50 backdrop-blur-md transition-colors"
      title={audioEnabled ? "Mute Web SFX" : "Enable Web SFX"}
    >
      {audioEnabled ? (
        <Volume2 className="w-5 h-5 text-red-500" />
      ) : (
        <VolumeX className="w-5 h-5 text-zinc-500" />
      )}
    </button>
  );
}
