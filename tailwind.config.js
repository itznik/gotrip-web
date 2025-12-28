/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables the toggle button
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0B1120",    // Deep Ocean (Dark Mode BG)
          light: "#FDFBF7",   // Warm Sand (Light Mode BG)
          primary: "#0F172A", // Dark Slate
          secondary: "#F1F5F9", // Light Slate
          accent: "#FF6B6B",  // Coral
        }
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
