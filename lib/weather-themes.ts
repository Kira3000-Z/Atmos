export const getWeatherTheme = (code: number, isDay: number) => {
  // Clear / Sunny
  if (code === 1000) {
    return isDay 
      ? { color: "#eab308", border: "border-yellow-500/30", text: "text-yellow-500", shadow: "shadow-yellow-500/10" }
      : { color: "#818cf8", border: "border-indigo-400/30", text: "text-indigo-400", shadow: "shadow-indigo-500/10" };
  }
  // Cloudy / Overcast
  if ([1003, 1006, 1009].includes(code)) {
    return { color: "#9ca3af", border: "border-gray-400/30", text: "text-gray-400", shadow: "shadow-gray-500/5" };
  }
  // Rain / Storm
  if ([1063, 1183, 1189, 1195, 1273, 1276].includes(code)) {
    return { color: "#3b82f6", border: "border-blue-500/30", text: "text-blue-500", shadow: "shadow-blue-500/10" };
  }
  return { color: "#eab308", border: "border-yellow-500/30", text: "text-yellow-500", shadow: "shadow-yellow-500/10" };
};