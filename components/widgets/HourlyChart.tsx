"use client";
import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import GlassPanel from "../ui/GlassPanel";

export default function HourlyChart({ data, themeColor }: { data: any[], themeColor: string }) {
  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.filter((_, i) => i % 2 === 0).map((hr) => ({
      time: new Date(hr.time).toLocaleTimeString([], { hour: 'numeric', hour12: true }),
      temp: Math.round(hr.temp_c),
      precip: hr.precip_mm || 0,
    }));
  }, [data]);

  if (chartData.length === 0) return (
    <GlassPanel className="p-8 h-100 border-white/10 flex items-center justify-center">
      <p className="text-[10px] uppercase tracking-widest text-white/20">Data Stream Offline...</p>
    </GlassPanel>
  );

  return (
    <GlassPanel className="p-8 border-white/10 flex flex-col bg-slate-900/40 backdrop-blur-3xl relative z-10">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-[14px] uppercase tracking-[0.6em] text-gray-400 font-black">24-Hour Overview</h3>
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
          <span className="text-[11px] text-gray-200 uppercase font-bold tracking-widest">Thermal Projection</span>
        </div>
      </div>
      
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="horizonGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <linearGradient id="fillArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="url(#horizonGradient)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="transparent" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.4)" 
              fontSize={13} // Increased for better visibility
              fontWeight="bold"
              tickLine={false}
              axisLine={false}
              dy={15}
            />

            <YAxis 
              stroke="rgba(255,255,255,0.4)" 
              fontSize={13} // Increased for better visibility
              fontWeight="bold"
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}°`}
            />

            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                border: '1px solid rgba(255,255,255,0.2)', 
                borderRadius: '16px',
                backdropFilter: 'blur(10px)'
              }}
              itemStyle={{ color: '#fff', fontSize: '16px', fontWeight: '900' }}
              labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}
            />

            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="url(#horizonGradient)" 
              strokeWidth={4}
              fill="url(#fillArea)" 
              isAnimationActive={true}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-12 flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Precip. Distribution</span>
        <div className="flex-1 flex gap-1 h-2.5 rounded-full overflow-hidden">
          {chartData.map((hr, i) => (
            <div 
              key={i} 
              className="h-full bg-blue-500" 
              style={{ width: `${100/chartData.length}%`, opacity: hr.precip > 0 ? 0.8 : 0.05 }} 
            />
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}