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
        "bg-darker": "var(--color-bg-darker)",
        "bg-content": "var(--color-bg-content)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        "text-soft": "var(--color-text-soft)",
        border: "var(--color-border)",

        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",

        success: "var(--color-success)",
        mid: "var(--color-mid)",
        fail: "var(--color-fail)",
      },
    },
  },
  plugins: [],
};
