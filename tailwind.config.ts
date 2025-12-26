import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0B1120",   // Deepest Blue/Black (Main BG)
          primary: "#0F172A", // Slate 900 (Secondary BG)
          accent: "#FF6B6B", // Coral/Orange (Buttons)
          text: "#E2E8F0",   // Light Gray (Text)
        }
      },
      backgroundImage: {
        "hero-glow": "conic-gradient(from 180deg at 50% 50%, #0F172A 0deg, #1e293b 180deg, #0F172A 360deg)",
      },
    },
  },
  plugins: [],
};
export default config;
