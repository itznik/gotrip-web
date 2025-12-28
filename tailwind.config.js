/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // We define these explicitly to avoid variable confusion
        brand: {
          accent: "#FF6B6B", // Coral
          dark: "#0B1120",   // Deep Ocean
          light: "#FDFBF7",  // Cream
        }
      },
      animation: {
        scroll: "scroll 35s linear infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-100% - 1.5rem))" },
        },
      },
    },
  },
  plugins: [],
};
