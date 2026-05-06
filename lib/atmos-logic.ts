export function getAtmosAdvice(current: any) {
  const uv = current?.uv || 0;
  const temp = current?.temp_c || 0;
  const precip = current?.precip_mm || 0;
  const vis = current?.vis_km || 0;
  const gust = current?.gust_kph || 0;

  if (precip > 5) return "Heavy rainfall detected. Road grip is significantly reduced; avoid high-speed travel.";
  if (gust > 50) return "High wind gusts detected. Secure loose outdoor objects and exercise caution near tall trees.";
  if (vis < 2) return "Low visibility in your sector. Use fog lights and reduce speed if driving.";
  if (uv > 7) return "Extreme UV levels. Avoid prolonged exposure; high risk of skin damage within 20 mins.";
  if (temp > 35) return "Ambient heat alert. Risk of dehydration; keep pets and electronics in climate-controlled areas.";
  
  return "Stability confirmed. No significant environmental threats detected in the current sector.";
}