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
      htmlAttrs: {
        lang: "en",
      },
      bodyAttrs: {
        class: "dark:bg-slate-800 dark:text-gray-50",
      },
    },
  },
  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@nuxt/image",
  ],
  extends: ["nuxt-seo-kit"],
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
  i18n: {
    locales: [
      {
        code: "en",
        file: "en.json",
      },
      {
        code: "fr",
        file: "fr.json",
      },
    ],
    vueI18n: {
      legacy: false,
      locale: "en",
      messages: {
        en: {
          welcome: "Welcome",
        },
        fr: {
          welcome: "Bienvenue",
        },
      },
    },
    langDir: "locales",
    lazy: true,
    defaultLocale: "en",
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://example.com",
      siteName: "Nuxt Content Template",
      siteDescription:
        "A Nuxt3 template built specifically for documentations and blogs.",
      language: "en",
    },
  },
});
