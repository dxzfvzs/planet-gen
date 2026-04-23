/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        "text-soft": "var(--color-text-soft)",
        border: "var(--color-border)",

        text: "#2d2a32",


        primary: "#ff7aa2",
        secondary: "#7dd3fc",
        accent: "#a78bfa",

        yellow: "#f1db85",
        "dark-yellow": "#ccb761",
        green: "#86efac",
        orange: "#fdba74",
      },
    },
  },
  plugins: [],
};
