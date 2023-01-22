<script setup lang="ts">
defineProps(["toc"]);
</script>

<template>
  <aside
    class="sticky top-[350px] bg-white font-bold rounded-lg border border-solid border-gray-200 xl:w-[272px] text-sm transform -translate-y-60"
    aria-label="Table of Content"
  >
    <header class="py-3 px-7 border-b border-solid border-gray-200">
      <h3 class="text-gray-600">In this article</h3>
    </header>
    <div class="py-3">
      <div v-for="(item, index) in toc" :key="index">
        <NuxtLink
          class="py-2 block pl-7"
          exact-active-class="bg-gray-50 text-green-600"
          :to="`#${item.id}`"
          >{{ item.text }}</NuxtLink
        >

        <!-- Uncomment the code below to render secondary title -->
        <!-- <div v-if="item.children">
          <NuxtLink
            v-for="(child, index) in item.children"
            :key="index"
            class="py-2 block pl-10"
            exact-active-class="bg-gray-50 text-green-600"
            :to="`#${child.id}`"
            >{{ child.text }}</NuxtLink
          >
        </div> -->
      </div>
    </div>
  </aside>
</template>
