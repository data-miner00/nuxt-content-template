// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],
  tailwindcss: {
    configPath: "./tailwind.config.ts",
    cssPath: "./assets/css/styles.scss",
    viewer: false,
  },
  content: {
    documentDriven: true,
    highlight: {
      theme: {
        default: "github-light",
        dark: "github-dark",
      },
    },
  },
});
