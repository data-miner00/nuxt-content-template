<script setup lang="ts">
import { useClipboard } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    code?: string;
    language?: string | null;
    filename?: string | null;
    highlights?: number[];
    meta?: string | null;
  }>(),
  {
    code: "",
    language: null,
    filename: null,
    highlights: undefined,
    meta: null,
  }
);

const { copy, copied, text } = useClipboard();
</script>

<template>
  <div class="relative">
    <div class="absolute right-2 top-2 flex gap-1">
      <span
        v-if="filename"
        class="block py-1 px-2 text-xs rounded border border-solid border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-slate-700"
        >{{ filename }}</span
      >

      <button
        class="block border border-solid border-gray-300 dark:border-gray-600 rounded p-1 bg-gray-100 dark:bg-slate-700"
        @click="copy(code)"
      >
        <svg
          v-if="copied"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="block text-green-500"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="block"
          viewBox="0 0 16 16"
        >
          <path
            d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
          />
          <path
            d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
          />
        </svg>
      </button>
    </div>
    <slot />
  </div>
</template>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
