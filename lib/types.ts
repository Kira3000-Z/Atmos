export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    uv: number;
    vis_km: number;
    pressure_mb: number;
    dewpoint_c: number;
    precip_mm: number;
    gust_kph: number;
    air_quality?: {
      co: number;
      pm2_5: number;
      o3: number;
      so2: number;
      no2: number;
      "us-epa-index": number; // Essential for AOD/Haze Density logic
    };
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgvis_km: number;
        daily_chance_of_rain: number;
        condition: {
          icon: string;
        };
      };
      astro: {
        sunrise: string;
        sunset: string;
        moon_phase: string;
        moon_illumination: string;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        precip_mm: number;
        uv: number;
        condition: {
          code: number;
        };
      }>;
    }>;
  };
  alerts?: {
    alert: Array<{
      headline: string;
      event: string;
      severity: string;
    }>;
  };
}