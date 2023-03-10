// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1.0",
      title: "Nuxt Content Template",
      meta: [
        {
          name: "description",
          content:
            "A hand-crafted feature-rich document driven template powered by Nuxt and Nuxt Content.",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/nuxt.svg",
        },
      ],
      bodyAttrs: {
        class: "dark:bg-slate-800 dark:text-gray-50",
      },
    },
  },
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  tailwindcss: {
    configPath: "./tailwind.config.js",
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
      preload: ["cpp", "csharp", "rust", "wenyan", "yaml", "latex"],
    },
    markdown: {
      remarkPlugins: ["remark-math"],
      rehypePlugins: ["rehype-mathjax"],
    },
  },
  colorMode: { classSuffix: "" },
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => ["mjx-container"].includes(tag),
    },
  },
});
