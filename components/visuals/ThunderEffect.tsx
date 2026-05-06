"use client";
import { useEffect, useState } from "react";

export default function ThunderEffect({ isVisible }: { isVisible: boolean }) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const triggerFlash = () => {
      setFlash(true);
      setTimeout(() => setFlash(false), 50);
      setTimeout(() => setFlash(true), 100);
      setTimeout(() => setFlash(false), 250);

      const nextFlash = Math.random() * 6000 + 4000;
      return setTimeout(triggerFlash, nextFlash);
    };

    const timer = triggerFlash();
    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-5 pointer-events-none transition-opacity duration-75 ${
        flash ? "bg-blue-100/10 opacity-100" : "opacity-0"
      }`} 
    />
  );
}