<script setup lang="ts">
defineProps(["toc"]);
</script>

<template>
  <aside
    class="sticky top-[350px] bg-white dark:bg-slate-800 font-bold rounded-lg border border-solid border-gray-200 dark:border-gray-700 xl:w-[272px] text-sm transform -translate-y-60"
    aria-label="Table of Content"
  >
    <header
      class="py-3 px-7 border-b border-solid border-gray-200 dark:border-gray-700"
    >
      <h3 class="text-gray-600 dark:text-gray-300">In this article</h3>
    </header>
    <div class="py-3">
      <div v-for="(item, index) in toc" :key="index">
        <NuxtLink
          class="py-2 block pl-7 text-gray-700 dark:text-gray-200"
          :to="`#${item.id}`"
          >{{ item.text }}</NuxtLink
        >

        <!-- Uncomment the code below to render secondary title -->
        <!-- <div v-if="item.children">
          <NuxtLink
            v-for="(child, index) in item.children"
            :key="index"
            class="py-2 block pl-10 text-gray-700"
            :to="`#${child.id}`"
            >{{ child.text }}</NuxtLink
          >
        </div> -->
      </div>
    </div>
  </aside>
</template>

<style lang="scss">
a.active {
  @apply bg-gray-50 dark:bg-slate-700 text-green-600 dark:text-cyan-600;
}
</style>
