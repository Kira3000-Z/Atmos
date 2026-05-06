export async function getWeatherData(query: string) {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  
  // Safety check to prevent sending "undefined" to the API
  const cleanQuery = query?.trim() || "Bhimtal";
  
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cleanQuery}&days=7&aqi=yes`;

  const response = await fetch(url);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Failed to fetch weather data");
  }

  return await response.json();
}