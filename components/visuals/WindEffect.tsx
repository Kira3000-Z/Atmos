"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function WindEffect({ isVisible, windSpeed }: { isVisible: boolean, windSpeed: number }) {
  const [streaks, setStreaks] = useState<any[]>([]);

  useEffect(() => {
    if (!isVisible) {
      setStreaks([]);
      return;
    }

    const streakCount = Math.min(Math.floor(windSpeed / 1.5), 30);
    const newStreaks = Array.from({ length: streakCount }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: Math.max(0.3, 2.5 - (windSpeed / 60)), 
      width: Math.random() * 150 + 50
    }));

    setStreaks(newStreaks);
  }, [isVisible, windSpeed]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {streaks.map((streak) => (
        <motion.div
          key={streak.id}
          initial={{ x: "-150%", opacity: 0 }}
          animate={{ x: "250%", opacity: [0, 0.4, 0] }}
          transition={{
            duration: streak.duration,
            repeat: Infinity,
            delay: streak.delay,
            ease: "linear"
          }}
          style={{
            top: `${streak.top}%`,
            width: `${streak.width}px`,
          }}
          className="absolute h-px bg-linear-to-r from-transparent via-white/30 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.2)]"
        />
      ))}
    </div>
  );
}