/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.tsx","./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo 600
        secondary: "#F59E0B", // Amber 500
        background: "#F3F4F6", // Gray 200
        text: "#111827", // Gray 900
        accent: "#10B981", // Emerald 500
        border: "#D1D5DB", // Gray 300
        danger: "#EF4444", // Red 500
        success: "#10B981", // Emerald 500  
        light:{
          100: "#F9FAFB", // Gray 100
          200: "#F3F4F6", // Gray 200
          300: "#E5E7EB", // Gray 300
          400: "#D1D5DB", // Gray 400
          500: "#9CA3AF", // Gray 500
        },
        dark:{
          100: "#1F2937", // Gray 900
          200: "#111827", // Gray 800
          300: "#374151", // Gray 700
          400: "#4B5563", // Gray 600
          500: "#6B7280", // Gray 500
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
}