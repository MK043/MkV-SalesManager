/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0c0d11",
          surface: "#16171d",
          surface2: "#1c1e26",
          surfaceHover: "#23252f",
          olive: {
            DEFAULT: "#4a5e38",
            dark: "#374728",
            light: "#647d4e",
            glow: "rgba(74, 94, 56, 0.25)"
          },
          sand: {
            DEFAULT: "#c8ad8d",
            dark: "#a68763",
            light: "#efe8de"
          },
          border: "rgba(255, 255, 255, 0.09)",
          borderStrong: "rgba(255, 255, 255, 0.18)",
          text: "#f2f3f5",
          muted: "#a0a1a4",
          subtle: "#707174",
          green: "#34c77b",
          yellow: "#e5b53e",
          orange: "#f08a3c",
          red: "#e5534b"
        }
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        sans: ["Manrope", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      }
    },
  },
  plugins: [],
};
