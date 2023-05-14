/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./content/**/*.md",
    "./components/**/*.vue",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./locales/**/*.json",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
