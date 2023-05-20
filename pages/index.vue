<script lang="ts" setup>
const localePath = useLocalePath();
</script>

<template>
  <Landing>
    <div class="pb-40">
      <span
        class="uppercase text-xs lg:text-lg text-cyan-600 font-bold bg-gray-50 bg-opacity-20 px-2 py-1 lg:px-3 lg:py-2 border border-solid border-gray-200 rounded-lg dark:bg-slate-800 dark:text-indigo-200 dark:border-gray-500"
        >✨ {{ $t("homePage.landing.new") }}</span
      >
      <h1 class="text-5xl lg:text-7xl font-bold mb-5">
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-300 to-emerald-400"
          >Nuxt</span
        >
        Content Template
      </h1>
      <p
        class="text-xl lg:text-2xl text-gray-700 mb-10 dark:text-gray-300"
        v-html="$t('homePage.landing.description_html')"
      ></p>
      <div class="flex">
        <NuxtLink
          :to="localePath('/guide')"
          class="text-md lg:text-lg py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold bg-opacity-80"
          >{{ $t("homePage.landing.view_guide") }}</NuxtLink
        >
        <a
          href="https://github.com/data-miner00/nuxt-content-template"
          class="ml-2 text-md lg:text-lg py-2 px-4 rounded-lg border border-solid border-green-500 text-green-500 hover:bg-green-500 bg-opacity-80 hover:text-white font-semibold"
          >{{ $t("homePage.landing.clone") }}</a
        >
      </div>
    </div>
  </Landing>
  <section class="lg:max-w-[75rem] mx-auto px-6 pb-10">
    <ul
      class="grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 gap-5"
    >
      <li>
        <FeatureCard
          :title="$t('homePage.features.markdown.title')"
          :description="$t('homePage.features.markdown.description')"
        />
      </li>
      <li>
        <FeatureCard
          :title="$t('homePage.features.tailwind.title')"
          :description="$t('homePage.features.tailwind.description')"
          color="bg-cyan-400"
        >
          <svg
            class="block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.88 73.29"
            width="24"
            height="20"
          >
            <title>Tailwind CSS</title>
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M61.44,0Q36.87,0,30.72,24.43q9.22-12.21,21.5-9.16c4.68,1.16,8,4.53,11.72,8.26,6,6.08,13,13.11,28.22,13.11q24.57,0,30.72-24.43-9.21,12.22-21.5,9.16c-4.68-1.16-8-4.53-11.72-8.26C83.64,7,76.67,0,61.44,0ZM30.72,36.64Q6.15,36.64,0,61.07q9.23-12.21,21.5-9.16c4.68,1.16,8,4.53,11.72,8.27,6,6.07,13,13.11,28.22,13.11q24.57,0,30.72-24.43Q82.95,61.07,70.66,58c-4.68-1.16-8-4.53-11.72-8.26-6-6.08-13-13.12-28.22-13.12Z"
            />
          </svg>
        </FeatureCard>
      </li>
      <li>
        <FeatureCard
          :title="$t('homePage.features.dark_mode.title')"
          :description="$t('homePage.features.dark_mode.description')"
          color="bg-pink-400"
        >
          <svg
            class="block"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
            />
          </svg>
        </FeatureCard>
      </li>
    </ul>
  </section>
</template>
