<script setup lang="ts">
const localePath = useLocalePath();
const scrolled = ref(false);
const open = useState("sidebar-open", () => false);

function toggleSidebar() {
  open.value = !open.value;
}

onMounted(() => {
  window.addEventListener("scroll", () => {
    scrolled.value = window.scrollY > 0;
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", () =>
    console.log("Unsubscribed scroll")
  );
});
</script>

<template>
  <header
    class="flex transition-all justify-start lg:justify-between items-center py-6 px-5 border-b border-transparent border-solid fixed top-0 left-0 w-full z-10"
    :class="{ scrolled }"
  >
    <div class="lg:hidden mr-2">
      <button aria-label="Toggle Sidebar" class="block" @click="toggleSidebar">
        <svg width="26" height="26" viewBox="0 0 30 30" aria-hidden="true">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="2"
            d="M4 7h22M4 15h22M4 23h22"
          ></path>
        </svg>
      </button>
    </div>

    <nav class="flex items-center" aria-label="primary-navigation">
      <div class="text-xl font-bold mr-5">
        <NuxtLink :to="localePath('index')" class="flex items-center">
          <img src="/nuxt.svg" alt="Nuxt logo" class="block w-8 h-8" />
          <span class="ml-1 block">Templatr</span>
        </NuxtLink>
      </div>
      <ul class="hidden lg:flex gap-4 font-semibold text-green-600 text-sm">
        <li>
          <NuxtLink :to="localePath('/guide')">{{
            $t("header.guide")
          }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/demo')">{{ $t("header.demo") }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/resources')">{{
            $t("header.resources")
          }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/blogs/my-first-blog')">{{
            $t("header.blogs")
          }}</NuxtLink>
        </li>
      </ul>
    </nav>
    <div>
      <div class="hidden lg:flex items-center">
        <a
          href="https://github.com/data-miner00/nuxt-content-template"
          class="block p-2"
          target="_blank"
          rel="noreferrer noopener"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
        </a>

        <div class="mx-2">
          <NuxtAnchor name="Nuxt" url="https://nuxt.com" :special="true" />
        </div>
        <div class="ml-2">
          <NuxtAnchor name="Content" url="https://content.nuxtjs.org/" />
        </div>

        <div class="mx-3 h-3 w-[2px] bg-gray-100 dark:bg-gray-700" />
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
    <MobileSidebar :open="open" :toggle-sidebar="toggleSidebar" />
  </header>
</template>

<style scoped lang="sass">
.scrolled
  @apply bg-white border-gray-300 dark:bg-slate-800 dark:border-gray-700 py-4
</style>
