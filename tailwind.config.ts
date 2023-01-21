import type { Config } from "tailwindcss";
import tailwindTypography from "@tailwindcss/typography";

export default <Partial<Config>>{
  content: [
    "./content/**/*.md",
    "./components/**/*.vue",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindTypography],
  darkMode: "class",
};
