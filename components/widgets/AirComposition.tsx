"use client";
import React from "react";
import GlassPanel from "../ui/GlassPanel";

export default function AirComposition() {
  const elements = [
    { label: "Nitrogen", value: "78.08%", color: "bg-blue-500" },
    { label: "Oxygen", value: "20.95%", color: "bg-cyan-400" },
    { label: "Argon", value: "0.93%", color: "bg-purple-500" },
    { label: "CO2", value: "0.04%", color: "bg-rose-500" },
  ];

  return (
    <GlassPanel className="p-7 border-white/10 relative overflow-hidden group">
      {/* Scanning Line Animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-scan pointer-events-none" />
      
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[11px] uppercase tracking-[0.5em] text-white/50 font-black">Atmos // Composition</h3>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
          <span className="text-[9px] text-green-400 font-bold tracking-widest uppercase">Active</span>
        </div>
      </div>

      <div className="space-y-6">
        {elements.map((item) => (
          <div key={item.label} className="relative">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider">{item.label}</span>
              <span className="text-[12px] font-mono font-black text-white tracking-tight">{item.value}</span>
            </div>
            <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.color} shadow-[0_0_12px_rgba(255,255,255,0.2)] transition-all duration-1000 ease-out`} 
                style={{ width: item.value }} 
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-4">
        <div className="shrink-0 w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
            <span className="text-[11px] text-blue-300 font-black">AI</span>
        </div>
        <p className="text-[10px] text-white/40 leading-relaxed uppercase font-bold tracking-wide">
          Sensor fusion confirmed. Gas levels stable within current sector.
        </p>
      </div>
    </GlassPanel>
  );
}