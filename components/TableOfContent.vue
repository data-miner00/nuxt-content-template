<script setup lang="ts">
defineProps(["toc"]);

const isShowToTopButton = ref(false);

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > screen.height / 2) {
      isShowToTopButton.value = true;
    } else {
      isShowToTopButton.value = false;
    }
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", () =>
    console.log("unmounted scroll listener")
  );
});

var scrollToTop = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <aside
    class="lg:sticky lg:top-[350px] bg-white dark:bg-slate-800 font-bold rounded-lg border border-solid border-gray-200 dark:border-gray-700 xl:w-[272px] text-sm transform lg:-translate-y-60"
    aria-label="Table of Content"
  >
    <header
      class="py-3 px-7 border-b border-solid border-gray-200 dark:border-gray-700 flex justify-between"
    >
      <h3 class="text-gray-600 dark:text-gray-300 block">In this article</h3>

      <button
        v-show="isShowToTopButton"
        class="text-xs border border-solid border-gray-200 dark:border-gray-700 rounded-full block px-2 py-[1px] text-green-600"
        @click="scrollToTop"
      >
        scroll to top
      </button>
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

<style lang="scss" scoped>
a.active {
  @apply bg-gray-50 dark:bg-slate-700 text-green-600;
}

button {
  display: inherit !important; /* override v-show display: none */
  transition: opacity 0.3s;
}

button[style*="display: none;"] {
  opacity: 0;
  pointer-events: none; /* disable user interaction */
  user-select: none; /* disable user selection */
}
</style>
