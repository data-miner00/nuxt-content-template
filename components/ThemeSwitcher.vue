<script setup lang="ts">
const colorMode = useColorMode();
const open = useState("open", () => false);

function selectTheme(selectedTheme: "system" | "light" | "dark") {
  colorMode.preference = selectedTheme;
  open.value = false;
}
</script>

<template>
  <div class="relative">
    <button
      class="px-2 py-2 bg-gray-100 dark:bg-slate-700 rounded-md"
      @click="open = !open"
    >
      <svg
        v-if="colorMode.value === 'light'"
        data-testid="theme-sun"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
        />
      </svg>
      <svg
        v-else
        data-testid="theme-moon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"
        />
      </svg>
    </button>

    <ul
      v-if="open"
      class="absolute z-50 top-8 right-0 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-slate-600 dark:highlight-white/5 dark:text-slate-300 mt-4"
    >
      <!-- system mode -->
      <li
        class="py-1 px-2 flex items-center cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-50"
        @click="selectTheme('system')"
      >
        <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 mr-2">
          <path
            d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
            stroke-width="2"
            stroke-linejoin="round"
            :class="
              colorMode.preference === 'system'
                ? 'stroke-emerald-500 fill-emerald-400/20'
                : 'stroke-slate-400 dark:stroke-slate-500'
            "
          ></path>
          <path
            d="M14 15c0 3 2 5 2 5H8s2-2 2-5"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="
              colorMode.preference === 'system'
                ? 'stroke-emerald-500'
                : 'stroke-slate-400 dark:stroke-slate-500'
            "
          ></path>
        </svg>

        <div
          class="text-md font-semibold"
          :class="{ 'text-emerald-500': colorMode.preference === 'system' }"
        >
          System
        </div>
      </li>

      <!-- light mode -->
      <li
        class="py-1 px-2 flex items-center cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-50"
        @click="selectTheme('light')"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-6 h-6 mr-2"
        >
          <path
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            :class="
              colorMode.preference === 'light'
                ? 'fill-emerald-400/20 stroke-emerald-500'
                : 'stroke-slate-400 dark:stroke-slate-500'
            "
          ></path>
          <path
            d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
            :class="
              colorMode.preference === 'light'
                ? 'stroke-emerald-500'
                : 'stroke-slate-400 dark:stroke-slate-500'
            "
          ></path>
        </svg>

        <div
          class="text-md font-semibold"
          :class="{ 'text-emerald-500': colorMode.preference === 'light' }"
        >
          Light
        </div>
      </li>

      <!-- dark mode -->
      <li
        class="py-1 px-2 flex items-center cursor-pointer dark:hover:bg-slate-700 hover:bg-gray-50"
        @click="selectTheme('dark')"
      >
        <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 mr-2">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
            class=""
            :class="
              colorMode.preference === 'dark'
                ? 'fill-emerald-400/20'
                : 'fill-transparent'
            "
          ></path>
          <path
            d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
            :class="
              colorMode.preference === 'dark'
                ? 'fill-emerald-500'
                : 'fill-slate-400 dark:fill-slate-500'
            "
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
            :class="
              colorMode.preference === 'dark'
                ? 'fill-emerald-500'
                : 'fill-slate-400 dark:fill-slate-500'
            "
          ></path>
        </svg>

        <div
          class="text-md font-semibold"
          :class="{ 'text-emerald-500': colorMode.preference === 'dark' }"
        >
          Dark
        </div>
      </li>
    </ul>
  </div>
</template>
