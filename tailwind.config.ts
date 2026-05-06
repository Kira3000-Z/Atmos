import type { Config } from "tailwindcss";

const config: Config = {
  // 1. Tell Tailwind where your components live so it knows to style them
  content: [
    "app/**/*.{js,ts,jsx,tsx,mdx}",
    "components/**/*.{js,ts,jsx,tsx,mdx}",
    "lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 2. You can add custom colors here if you want to reuse them later!
      colors: {
        atmos: {
          dark: "#0f101a", 
        }
      },
      // 3. Custom animations (like the spinner we used in loading.tsx)
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
};

export default config;