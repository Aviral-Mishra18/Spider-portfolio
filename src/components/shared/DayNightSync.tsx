"use client";

import { useEffect, useState } from "react";

export default function DayNightSync() {
  const [isNight, setIsNight] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsNight(hour < 6 || hour >= 18);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {isNight ? (
        // Night skyline atmosphere
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950 to-blue-950/20 opacity-80" />
      ) : (
        // Day/Dusk skyline atmosphere
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-zinc-950 to-zinc-950 opacity-80" />
      )}
    </div>
  );
}
