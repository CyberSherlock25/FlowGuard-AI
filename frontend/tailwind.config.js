/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cisco: {
          blue: "#00bceb",
          navy: "#0f172a",
          dark: "#0b132b",
          lightBlue: "#0076ce",
          accent: "#00e5ff",
          surface: "rgba(15, 23, 42, 0.75)"
        },
        status: {
          green: "#10b981",
          yellow: "#f59e0b",
          red: "#ef4444",
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 188, 235, 0.4), 0 0 10px rgba(0, 188, 235, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 188, 235, 0.8), 0 0 30px rgba(0, 188, 235, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
