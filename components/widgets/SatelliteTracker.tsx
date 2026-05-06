"use client";
import React from "react";
import GlassPanel from "../ui/GlassPanel";

export default function SatelliteTracker() {
  return (
    <GlassPanel className="p-5 border-white/10 relative overflow-hidden h-64 flex flex-col">
      <div className="flex justify-between items-center mb-5 shrink-0">
        <h3 className="text-[11px] uppercase tracking-[0.5em] text-white/60 font-black">Orbital // Network</h3>
        <div className="flex items-center gap-2">
           <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
           </span>
           <span className="text-[9px] text-blue-400 font-mono font-bold tracking-widest">TRK: ACTIVE</span>
        </div>
      </div>

      {/* The Visual Grid / Map - Height fixed to prevent stretching */}
      <div className="relative w-full h-28 bg-white/5 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
        {/* Dynamic Grid Background */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        {/* Scanning Radar Line */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 w-1/3 h-full animate-scan" />

        {/* Satellite Pings - Brighter for readability */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_12px_#60a5fa] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee] animate-pulse [animation-delay:1.5s]" />
        
        <span className="relative z-10 text-[10px] font-black text-white/40 tracking-[0.4em] uppercase">Sector Locked</span>
      </div>

      {/* Stats Section - Increased Contrast */}
      <div className="mt-auto space-y-3 pb-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Active Satellites</span>
          <span className="text-[12px] font-mono font-black text-white bg-white/5 px-2 py-0.5 rounded border border-white/5">04</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Signal Integrity</span>
          <span className="text-[12px] font-mono font-black text-green-400">98.2%</span>
        </div>
      </div>
    </GlassPanel>
  );
}