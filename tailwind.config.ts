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
          dark: "#0B212F",   // Deep Teal (Header/Footer)
          light: "#FDFBF7",  // Cream/Sand (Main BG)
          accent: "#FF7E67", // Coral (Buttons)
          secondary: "#1E3A4C", // Lighter Teal for gradients
        }
      },
      backgroundImage: {
        "hero-pattern": "url('/world-map.svg')", // We will add this later
      },
    },
  },
  plugins: [],
};
export default config;
