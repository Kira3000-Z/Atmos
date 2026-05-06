"use client";
import React from "react";

interface SunGaugeProps {
  sunrise: string;
  sunset: string;
  current: string;
  themeColor: string;
}

export default function SunGauge({ sunrise, sunset, current, themeColor }: SunGaugeProps) {
  // Helper to convert time string (05:27 AM) to minutes from midnight
  const toMinutes = (timeStr: string) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const start = toMinutes(sunrise);
  const end = toMinutes(sunset);
  const now = toMinutes(current);

  // Calculate progress (0 to 1)
  const totalDaylight = end - start;
  const elapsed = now - start;
  const progress = Math.max(0, Math.min(1, elapsed / totalDaylight));

  return (
    <div className="relative flex flex-col items-center justify-center py-4">
      {/* The Visual Arc */}
      <div className="relative w-full h-32 mb-6">
        <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
          {/* Background Path (Dashed Arc) */}
          <path
            d="M 10,45 A 40,40 0 0,1 90,45"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="2"
            strokeDasharray="2,2"
          />
          
          {/* Progress Path */}
          <path
            d="M 10,45 A 40,40 0 0,1 90,45"
            fill="none"
            stroke={themeColor}
            strokeWidth="2"
            strokeDashoffset={125.6 * (1 - progress)}
            strokeDasharray="125.6"
            className="transition-all duration-1000 ease-in-out opacity-40"
          />

          {/* Floating "Sun" Marker */}
          <g style={{ 
            transform: `rotate(${(progress * 180) - 180}deg)`, 
            transformOrigin: '50px 45px',
            transition: 'transform 1s ease-in-out'
          }}>
            <circle cx="10" cy="45" r="3" fill="#fbbf24" className="shadow-[0_0_10px_#fbbf24]" />
            <circle cx="10" cy="45" r="6" stroke="#fbbf24" strokeWidth="0.5" fill="none" className="opacity-30" />
          </g>
        </svg>

        {/* Live Digital Clock Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className="text-2xl font-light tracking-[0.2em] text-white opacity-90">{current.split(' ')[0]}</span>
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-500 mt-1">Live Telemetry</span>
        </div>
      </div>

      {/* Sunrise/Sunset Data Points */}
      <div className="w-full flex justify-between px-2">
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Sunrise</span>
          <span className="text-xs font-bold text-gray-300">{sunrise}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Sunset</span>
          <span className="text-xs font-bold text-gray-300">{sunset}</span>
        </div>
      </div>
    </div>
  );
}