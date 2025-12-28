/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // This connects to next-themes
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          accent: "var(--brand-accent)",
          dark: "#0B1120",
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
