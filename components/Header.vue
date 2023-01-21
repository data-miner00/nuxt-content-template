<script setup lang="ts">
const scrolled = ref(false);

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
    class="flex transition-all justify-between items-center py-6 px-5 border-b border-transparent border-solid fixed top-0 left-0 w-full z-10"
    :class="{ 'bg-white border-gray-300 py-4': scrolled }"
  >
    <nav class="flex items-center">
      <div class="text-xl font-bold mr-5">
        <NuxtLink to="/">Mumk</NuxtLink>
      </div>
      <ul class="flex gap-4 font-semibold text-green-600 text-sm">
        <li>
          <NuxtLink to="/">View</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Demo</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">Resources</NuxtLink>
        </li>
      </ul>
    </nav>
    <div>
      <div>item</div>
    </div>
  </header>
</template>
