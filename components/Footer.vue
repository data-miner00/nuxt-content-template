<template>
  <footer class="footer relative pt-10 pb-10 lg:pb-24 lg:pt-28">
    <div
      class="mx-auto px-6 grid grid-cols-2 grid-rows-5 lg:grid-cols-6 lg:grid-rows-1 lg:max-w-[75rem] gap-10 lg:gap-20"
    >
      <section class="col-span-2">
        <img src="/_nuxt/nuxt.svg" alt="Nuxt logo" class="w-12 h-12 mb-5" />
        <h2 class="text-2xl font-bold mb-5">Templatr</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          The ultimate `.md` template powered by green technologies.
        </p>
      </section>
      <nav
        class="row-start-2 row-span-2 lg:row-start-1 lg:col-start-3 lg:row-span-full"
      >
        <h2>Sitemap</h2>
        <NuxtLink to="/">Homepage</NuxtLink>
        <NuxtLink to="/guide">Guide</NuxtLink>
        <NuxtLink to="/demo">Demo</NuxtLink>
        <NuxtLink to="/resources">Resources</NuxtLink>
        <NuxtLink to="/blog/my-first-blog">Blog</NuxtLink>
        <NuxtLink to="/credits">Credits</NuxtLink>
      </nav>
      <nav
        class="row-start-4 row-span-2 lg:row-start-1 lg:col-start-4 lg:row-span-full"
      >
        <h2>Projects</h2>
        <a href="https://github.com/data-miner00/blog">Blog</a>
        <a href="https://github.com/data-miner00/portfolio">Portfolio</a>
        <a href="https://github.com/data-miner00/book">Book</a>
        <a href="https://github.com/data-miner00/avax-nft-minter"
          >Avalanche NFT Minter</a
        >
        <a href="https://github.com/data-miner00/positron">Positron</a>
        <a href="https://github.com/data-miner00/ng-hackernews"
          >The Hacker Times</a
        >
        <a href="https://github.com/data-miner00/web-ui">Gallerium</a>
        <a href="https://github.com/data-miner00/Linker">Linker</a>
        <a href="https://github.com/data-miner00/arknights-event-afk"
          >Arknights Event Afk</a
        >
        <a href="">Portfolio v2</a>
      </nav>
      <nav
        class="row-start-2 row-span-2 col-start-2 lg:row-start-1 lg:col-start-5 lg:row-span-full"
      >
        <h2>Templates</h2>
        <a href="https://github.com/data-miner00/React-Esbuild-Template"
          >React Esbuild Template</a
        >
        <a href="https://github.com/data-miner00/react-rescript-template"
          >React Rescript Template</a
        >
        <a href="https://github.com/data-miner00/algorand-react-template"
          >Algorand React Template</a
        >
      </nav>
      <nav
        class="row-start-4 row-span-2 col-start-2 lg:row-start-1 lg:col-start-6 lg:row-span-full"
      >
        <h2>Technologies</h2>
        <a href="https://vuejs.org/">Vue.js</a>
        <a href="https://nuxt.com">Nuxt.js</a>
        <a href="https://content.nuxtjs.org/">Nuxt Content</a>
        <a href="https://tailwindcss.com/">Tailwind CSS</a>
        <a href="https://tailwindcss.nuxt.dev/">Nuxt Tailwind</a>
        <a href="https://www.markdownguide.org/getting-started/">Markdown</a>
        <a href="https://pnpm.io/">Pnpm</a>
      </nav>
    </div>
    <footer class="pt-12 mx-auto px-6 lg:max-w-[75rem] text-gray-400 text-sm">
      Templatr &copy; 2023 by Shaun. All rights unreserved.
    </footer>
  </footer>
</template>

<style lang="scss" scoped>
.footer::before {
  --mask-color: #000;
  --background-color: #fafafa;
  content: "";
  position: absolute;
  inset: 0;
  mask-image: linear-gradient(
    transparent,
    var(--mask-color),
    var(--mask-color)
  );
  background-color: var(--background-color);
  z-index: -1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E");
}

.dark .footer::before {
  --mask-color: #fff;
  --background-color: #1e293b;
}

nav {
  @apply flex flex-col gap-2 text-gray-700 dark:text-gray-500;

  h2 {
    @apply font-semibold mb-5;
  }

  a {
    @apply block text-gray-500 dark:text-gray-400 relative;

    &:hover {
      @apply text-gray-700 dark:text-gray-300;
    }
  }
}
</style>
