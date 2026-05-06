"use client";
import GlassPanel from "../ui/GlassPanel";

export default function WeatherDetailsGrid({ data }: { data: any }) {
  const { 
    wind_kph, humidity, vis_km, uv, 
    precip_mm, air_quality, temp_c, feelslike_c, pressure_mb
  } = data;

  const aqi = air_quality?.["us-epa-index"] || 1;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
      {/* 1. THERMAL PERCEPTION */}
      <GlassPanel className="p-8 border-white/10 h-72 flex flex-col items-center justify-between">
        <h3 className="text-[11px] uppercase tracking-[0.5em] text-gray-500 font-bold">Thermal Perception</h3>
        <div className="w-full space-y-6">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Actual</span>
              <span className="text-4xl font-black">{Math.round(temp_c)}°</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Feels Like</span>
              <span className="text-4xl font-black text-blue-400">{Math.round(feelslike_c)}°</span>
            </div>
          </div>
          <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-blue-600 via-blue-400 to-indigo-500 transition-all duration-1000"
              style={{ width: `${(feelslike_c / 50) * 100}%` }}
            />
          </div>
        </div>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">Heat Index Sync</p>
      </GlassPanel>

      {/* 2. BAROMETRIC FORCE */}
      <GlassPanel className="p-8 border-white/10 h-72 flex flex-col items-center justify-between">
        <h3 className="text-[11px] uppercase tracking-[0.5em] text-gray-500 font-bold">Barometric Force</h3>
        <div className="relative w-full py-8 flex flex-col items-center">
          <div className="w-full h-0.5 bg-white/10 relative">
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] transition-all duration-1000 border-2 border-slate-900"
              style={{ left: `${((pressure_mb - 950) / 100) * 100}%` }}
            />
          </div>
          <div className="mt-8 flex flex-col items-center">
            <span className="text-5xl font-black tracking-tighter leading-none">{pressure_mb}</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase mt-2 tracking-widest">mb</span>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">Static Pressure</p>
      </GlassPanel>

      {/* 3. UV INTENSITY */}
      <GlassPanel className="p-8 border-white/10 h-72 flex flex-col items-center justify-between">
        <h3 className="text-[11px] uppercase tracking-[0.5em] text-gray-500 font-bold">UV Intensity</h3>
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-40 h-20 overflow-hidden">
            <svg className="w-40 h-40 transform -rotate-180">
              <circle cx="80" cy="80" r="72" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
              <circle cx="80" cy="80" r="72" fill="transparent" stroke="#facc15" strokeWidth="12" 
                strokeDasharray="226" strokeDashoffset={226 - (226 * (uv / 11))} className="transition-all duration-1000" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-x-0 -bottom-1 text-center text-5xl font-black tracking-tighter">{uv.toFixed(1)}</div>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold py-1 px-3 border border-white/5 rounded-full bg-white/5">LVL {uv}</p>
      </GlassPanel>

      {/* 4. PRECIPITATION */}
      <GlassPanel className="p-8 border-white/10 h-72 flex flex-col items-center justify-between">
        <h3 className="text-[11px] uppercase tracking-[0.5em] text-gray-500 font-bold">Precipitation</h3>
        <div className="relative w-36 h-36 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute bottom-0 w-full bg-linear-to-t from-blue-600/40 to-blue-400/10 transition-all duration-1000 rounded-b-full"
            style={{ height: `${Math.min(precip_mm * 10 + 5, 100)}%` }} />
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-6xl font-black tracking-tighter leading-none">{Math.floor(precip_mm)}</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase mt-1 tracking-widest">mm</span>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">Sector Hydration</p>
      </GlassPanel>

      {/* 5. AIR QUALITY */}
      <GlassPanel className="p-8 border-white/10 h-72 flex flex-col items-center justify-between">
        <h3 className="text-[11px] uppercase tracking-[0.5em] text-gray-500 font-bold">Air Quality</h3>
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle cx="72" cy="72" r="64" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
            <circle cx="72" cy="72" r="64" fill="transparent" stroke="#22c55e" strokeWidth="8" 
              strokeDasharray="402" strokeDashoffset={402 - (402 * (aqi / 6))} className="transition-all duration-1000" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col items-center">
            <span className="text-6xl font-black tracking-tighter">{aqi}</span>
          </div>
        </div>
        <p className="text-[10px] text-green-400 uppercase tracking-[0.3em] font-bold">Atmosphere Clear</p>
      </GlassPanel>

      {/* 6. OPTICAL DEPTH */}
      <GlassPanel className="p-8 border-white/10 h-72 flex flex-col items-center justify-between">
        <h3 className="text-[11px] uppercase tracking-[0.5em] text-gray-500 font-bold">Optical Depth</h3>
        <div className="flex flex-col items-center gap-1.5 flex-1 justify-center mt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-700 ${6-i < vis_km ? 'bg-blue-400 shadow-[0_0_10px_#60a5fa]' : 'bg-white/5'}`}
              style={{ width: `${50 + (i * 22)}px`, opacity: (1 - (i * 0.1)) }} />
          ))}
        </div>
        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-5xl font-black tracking-tighter">{vis_km}</span>
          <span className="text-sm text-gray-500 font-bold uppercase tracking-widest">km</span>
        </div>
      </GlassPanel>

      {/* 7. MOISTURE DENSITY */}
      <GlassPanel className="p-8 border-white/10 h-72 flex flex-col items-center justify-between">
        <h3 className="text-[11px] uppercase tracking-[0.5em] text-gray-500 font-bold">Moisture Density</h3>
        <div className="flex gap-2 items-end h-24 mb-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-3 bg-white/5 rounded-full relative h-full">
              <div className="absolute bottom-0 w-full bg-linear-to-t from-blue-600 to-blue-400 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                style={{ height: i < (humidity / 12) ? '100%' : '15%' }} />
            </div>
          ))}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-black tracking-tighter leading-none">{humidity}</span>
          <span className="text-lg text-blue-500/50 font-bold">%</span>
        </div>
      </GlassPanel>

      {/* 8. WIND VECTORS */}
      <GlassPanel className="p-8 border-white/10 h-72 flex flex-col items-center justify-between">
        <h3 className="text-[11px] uppercase tracking-[0.5em] text-gray-500 font-bold">Wind Vectors</h3>
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/5 bg-linear-to-b from-white/5 to-transparent" />
          <div className="w-1 h-16 bg-linear-to-t from-transparent via-blue-500 to-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-transform duration-1000"
            style={{ transform: `rotate(${wind_kph * 4}deg)` }} />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black tracking-tighter">{wind_kph}</span>
          <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">km/h</span>
        </div>
      </GlassPanel>

    </div>
  );
}