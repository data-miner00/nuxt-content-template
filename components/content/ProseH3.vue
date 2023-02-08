<script setup lang="ts">
defineProps<{ id: string }>();
const heading = 3;
const { anchorLinks } = useRuntimeConfig().public.content;
const generate =
  anchorLinks?.depth >= heading && !anchorLinks?.exclude.includes(heading);
</script>

<template>
  <h3 :id="id" class="relative block group">
    <a
      v-if="generate"
      :href="`#${id}`"
      class="absolute -left-6 top-2 px-1 bg-gray border border-solid border-gray-200 dark:border-gray-700 text-sm rounded no-underline text-gray-500 dark:text-gray-400 hidden group-hover:block"
    >
      #
    </a>
    <slot />
  </h3>
</template>
