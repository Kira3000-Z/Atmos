"use client";
import { useEffect, useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar"; 
import SunGauge from "@/components/widgets/SunGauge";
import WeatherDetailsGrid from "@/components/widgets/WeatherDetailsGrid";
import HourlyChart from "@/components/widgets/HourlyChart";
import HistoricalTrends from "@/components/widgets/HistoricalTrends";
import AirComposition from "@/components/widgets/AirComposition"; 
import SatelliteTracker from "@/components/widgets/SatelliteTracker"; // Integrated
import GlassPanel from "@/components/ui/GlassPanel";
import WeatherOrb from "@/components/visuals/WeatherOrb";
import MistOverlay from "@/components/visuals/MistOverlay";
import RainEffect from "@/components/visuals/RainEffect";
import SnowEffect from "@/components/visuals/SnowEffect"; 
import ThunderEffect from "@/components/visuals/ThunderEffect";
import Sunbeams from "@/components/visuals/Sunbeams";
import WindEffect from "@/components/visuals/WindEffect";
import { getWeatherData } from "@/lib/weather-api";
import { WeatherData } from "@/lib/types";
import { getWeatherTheme } from "@/lib/weather-themes";
import { getAtmosAdvice } from "@/lib/atmos-logic";

export default function DashboardPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  /** 
   * PRIMARY SECTOR: Defaulting to Bhimtal coordinates (29.35, 79.55) 
   * to ensure stable data retrieval on startup.
   */
  const [locationQuery, setLocationQuery] = useState("29.35,79.55"); 
  const [liveTime, setLiveTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    
    if (!locationQuery.trim()) {
      setLoading(false);
      return;
    }

    getWeatherData(locationQuery)
      .then((data) => {
        if (isMounted) {
          setWeather(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Atmos Data Link Error:", err);
        // Fallback to primary sector coordinates if search fails
        if (isMounted) setLocationQuery("29.35,79.55");
      });

    return () => { isMounted = false; };
  }, [locationQuery]);

  const theme = useMemo(() => {
    if (!weather) return { color: "#3b82f6", text: "text-blue-400", border: "border-white/10" };
    return getWeatherTheme(weather.current.condition.code, weather.current.is_day);
  }, [weather]);

  const env = useMemo(() => {
    if (!weather) return { sunny: false, mist: false, rain: false, thunder: false, windy: false, snow: false };
    const code = weather.current.condition.code;
    return {
      sunny: code === 1000,
      mist: [1030, 1135, 1147].includes(code),
      rain: [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code),
      /** 
       * Trigger Snow + Thunder visuals for specific weather codes (e.g., Kedarnath).
       */
      snow: [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1282].includes(code),
      thunder: [1087, 1273, 1276, 1279, 1282].includes(code),
      windy: weather.current.wind_kph > 12 
    };
  }, [weather]);

  if (loading || !weather) return (
    <div className="h-screen bg-[#0f101a] flex items-center justify-center">
      <div className="text-white/20 uppercase tracking-[0.8em] animate-pulse font-light text-sm">Syncing Atmos...</div>
    </div>
  );

  const { current, location, forecast } = weather;
  const todayAstro = forecast.forecastday[0].astro;
  const advice = getAtmosAdvice(current);
  const liveTimeString = liveTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  return (
    <main className="flex h-screen overflow-hidden bg-[#0f101a] text-white relative font-sans selection:bg-blue-500/30">
      
      {/* Dynamic Background Visuals */}
      <WeatherOrb themeColor={theme.color} windSpeed={current.wind_kph} />
      <MistOverlay isVisible={env.mist} />
      <RainEffect isVisible={env.rain} />
      <SnowEffect isVisible={env.snow} /> 
      <ThunderEffect isVisible={env.thunder} />
      <Sunbeams isVisible={env.sunny} />
      <WindEffect isVisible={env.windy} windSpeed={current.wind_kph} />

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto p-8 space-y-8 no-scrollbar relative z-10">
        <header className="flex items-center justify-between">
          <div className={`glass px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] border-white/10 ${theme.text}`}>
            {location.name.toUpperCase()} SECTOR // {Math.round(current.temp_c)}°C
          </div>
          <input 
            type="text" placeholder="QUERY COORDINATES..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
            onKeyDown={(e) => { if (e.key === "Enter" && searchQuery.trim()) { setLocationQuery(searchQuery); setSearchQuery(""); }}}
            className="glass bg-transparent px-6 py-3 outline-none w-80 text-xs tracking-widest placeholder:text-white/20"
          />
        </header>

        <div className="grid grid-cols-12 gap-8">
          <section className="col-span-12 lg:col-span-9 space-y-8">
            
            <GlassPanel className="p-8 border-l-4 border-l-blue-500/40 border-white/10">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-xs text-blue-400 font-bold border border-blue-500/20">HUD</div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-2">Tactical Summary</h3>
                    <p className="text-base font-medium text-gray-200 leading-relaxed tracking-tight">{advice}</p>
                  </div>
               </div>
            </GlassPanel>

            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-8">
                 <GlassPanel className="p-10 h-full flex flex-col justify-between border-white/10">
                    <div className="flex items-center gap-16">
                      <span className="text-[11rem] font-thin tracking-tighter leading-none opacity-95">{Math.round(current.temp_c)}°</span>
                      <div>
                        <p className={`text-5xl font-bold tracking-tight mb-3 ${theme.text}`}>{current.condition.text}</p>
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">DP: {Math.round(current.dewpoint_c)}°C • GUST: {current.gust_kph}km/h</p>
                      </div>
                    </div>
                 </GlassPanel>
              </div>

              <div className="col-span-12 md:col-span-4">
                <GlassPanel className="p-8 h-full border-white/10">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-8">7-Day Intel</h3>
                  <div className="space-y-4">
                    {forecast.forecastday.slice(0, 6).map((day, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0">
                        <span className="text-xs text-gray-400 uppercase font-bold">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <img src={day.day.condition.icon} alt="ico" className="w-6 h-6 grayscale opacity-60" />
                        <span className="text-sm font-bold tracking-tighter">{Math.round(day.day.maxtemp_c)}°</span>
                      </div>
                    ))}
                  </div>
                </GlassPanel>
              </div>
            </div>

            <div className="space-y-8">
              <HourlyChart data={forecast.forecastday[0].hour} themeColor={theme.color} />
              <WeatherDetailsGrid data={current} />
              <HistoricalTrends />
            </div>
          </section>

          {/* SIDEBAR COLUMN (lg:col-span-3) */}
          <section className="col-span-12 lg:col-span-3 space-y-8">
            <GlassPanel className="border-white/10 p-6">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-4">Solar Cycle</h3>
              <SunGauge sunrise={todayAstro.sunrise} sunset={todayAstro.sunset} current={liveTimeString} themeColor={theme.color} />
            </GlassPanel>

            <GlassPanel className="p-8 border-white/10 relative overflow-hidden">
               <h3 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-6">Biometric HUD</h3>
               <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-3 font-bold">
                      <span className="text-xs text-gray-300 uppercase tracking-widest">UV Intensity</span>
                      <span className={`text-sm ${current.uv > 6 ? 'text-orange-400' : 'text-blue-400'}`}>LVL {current.uv}</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${(current.uv / 11) * 100}%` }} />
                    </div>
                  </div>
               </div>
            </GlassPanel>

            <GlassPanel className="h-80 flex flex-col items-center justify-between p-8 relative overflow-hidden border-white/10">
               <div className="relative w-40 h-40 border border-white/10 rounded-full flex items-center justify-center z-10 bg-black/20">
                  <div className="absolute w-full h-full rounded-full border-t border-blue-500/30 animate-[spin_4s_linear_infinite]" />
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6] relative z-20" />
               </div>
               <footer className="z-10 text-center space-y-1">
                  <p className="text-sm font-bold text-blue-400 uppercase tracking-[0.3em]">{todayAstro.moon_phase}</p>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest">Illumination: {todayAstro.moon_illumination}%</p>
               </footer>
            </GlassPanel>

            {/* Content filling the empty space */}
            <AirComposition />
            <SatelliteTracker />
          </section>
        </div>
      </div>
    </main>
  );
}