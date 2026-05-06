"use client";
import React, { useState } from "react";
import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Bar } from "recharts";
import GlassPanel from "../ui/GlassPanel";

const mockArchiveData = [
  { month: "Jul", high: 25, low: 18, fcHigh: 27, fcLow: 20, precip: 4, humidity: 85, wind: 4 },
  { month: "Aug", high: 24, low: 19, fcHigh: 26, fcLow: 21, precip: 6, humidity: 88, wind: 5 },
  { month: "Sep", high: 22, low: 17, fcHigh: 25, fcLow: 20, precip: 5, humidity: 82, wind: 6 },
  { month: "Oct", high: 20, low: 12, fcHigh: 23, fcLow: 15, precip: 3, humidity: 70, wind: 5 },
  { month: "Nov", high: 15, low: 8, fcHigh: 18, fcLow: 10, precip: 1, humidity: 65, wind: 4 },
  { month: "Dec", high: 12, low: 5, fcHigh: 16, fcLow: 8, precip: 0.5, humidity: 62, wind: 5 },
  { month: "Jan", high: 10, low: 2, fcHigh: 15, fcLow: 5, precip: 0.8, humidity: 68, wind: 6 },
  { month: "Feb", high: 14, low: 6, fcHigh: 18, fcLow: 9, precip: 1.2, humidity: 70, wind: 7 },
  { month: "Mar", high: 18, low: 9, fcHigh: 22, fcLow: 13, precip: 2, humidity: 65, wind: 8 },
  { month: "Apr", high: 24, low: 14, fcHigh: 28, fcLow: 18, precip: 3, humidity: 55, wind: 9 },
  { month: "May", high: 28, low: 16, fcHigh: 30, fcLow: 19, precip: 2, humidity: 50, wind: 7 },
  { month: "Jun", high: 32, low: 19, fcHigh: 34, fcLow: 22, precip: 4, humidity: 75, wind: 6 },
];

export default function HistoricalTrends() {
  const [activeTab, setActiveTab] = useState("Temperature");

  const tabs = [
    { name: "Temperature" },
    { name: "Precipitation" },
    { name: "Humidity" },
    { name: "Wind" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Temperature":
        return (
          <>
            <Area type="monotone" dataKey="high" stroke="#f43f5e" strokeWidth={2} fill="url(#colorHigh)" isAnimationActive={true} />
            <Area type="monotone" dataKey="low" stroke="#3b82f6" strokeWidth={2} fill="url(#colorLow)" isAnimationActive={true} />
            <Line type="monotone" dataKey="fcHigh" stroke="rgba(255,255,255,0.2)" strokeDasharray="5 5" dot={false} strokeWidth={1} />
            <Line type="monotone" dataKey="fcLow" stroke="rgba(255,255,255,0.2)" strokeDasharray="5 5" dot={false} strokeWidth={1} />
          </>
        );
      case "Precipitation":
        return (
          <>
            <Bar dataKey="precip" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} />
            <Area type="monotone" dataKey="precip" stroke="#3b82f6" strokeWidth={2} fill="rgba(59,130,246,0.1)" />
          </>
        );
      case "Humidity":
        return (
          <>
            <Area type="monotone" dataKey="humidity" stroke="#2dd4bf" strokeWidth={3} fill="rgba(45,212,191,0.1)" />
            <Line type="monotone" dataKey="humidity" stroke="rgba(255,255,255,0.2)" strokeDasharray="5 5" dot={false} />
          </>
        );
      case "Wind":
        return (
          <>
            <Area type="monotone" dataKey="wind" stroke="#60a5fa" strokeWidth={3} fill="rgba(96,165,250,0.1)" />
            <Bar dataKey="wind" fill="rgba(96,165,250,0.1)" barSize={4} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <GlassPanel className="p-8 h-137.5 border-white/10 flex flex-col bg-slate-900/30 backdrop-blur-3xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-10 z-10">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                activeTab === tab.name 
                  ? "bg-yellow-400 text-slate-950 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]" 
                  : "bg-white/5 text-gray-500 border-white/5 hover:bg-white/10"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[400px] z-10">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={mockArchiveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            
            {/* UPDATED: tick size increased to 14 and bolded */}
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 700 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 700 }} 
            />
            
            <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
            
            {renderContent()}
            
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex justify-center gap-8 text-[9px] font-bold text-gray-600 uppercase tracking-widest border-t border-white/5 pt-6">
        {activeTab === "Temperature" ? (
          <>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> Daily Low</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500" /> Daily High</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 border-t border-dashed border-gray-500" /> Archival Forecast</div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${activeTab === "Precipitation" ? "bg-blue-500" : activeTab === "Humidity" ? "bg-teal-400" : "bg-blue-300"}`} /> 
            {activeTab} Trend
          </div>
        )}
      </div>
    </GlassPanel>
  );
}