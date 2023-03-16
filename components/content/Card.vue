<script setup lang="ts">
defineProps(["title", "footer"]);
</script>

<template>
  <article
    class="rounded border border-solid border-gray-200 dark:border-gray-600"
  >
    <header
      class="py-2 px-4 text-lg font-semibold text-violet-500 dark:text-violet-400"
    >
      <span>{{ title }}</span>
    </header>
    <section class="px-4">
      <slot />
    </section>
    <footer class="py-2 px-4 text-sm text-gray-400">
      <span>{{ footer }}</span>
    </footer>
  </article>
</template>
