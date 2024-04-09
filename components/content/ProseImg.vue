<script setup lang="ts">
type Props = {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
};

defineProps<Props>();
</script>

<template>
  <div
    class="img-container w-full rounded-lg border border-solid border-gray-200 dark:border-gray-600 my-5 inline-block"
  >
    <NuxtImg
      :src="src"
      :alt="alt"
      class="block mx-auto"
      :width="width"
      :height="height"
    >
    </NuxtImg>
  </div>
</template>

<style>
.img-container {
  --pattern-base-color: white;
  --pattern-box-color: #f6f7f8;
  background-size: 40px 40px;
  background-image: linear-gradient(
      to right,
      var(--pattern-box-color) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, var(--pattern-box-color) 1px, transparent 1px);
  background-color: var(--pattern-base-color);
  opacity: 0.95;
  background-position: center;
}

.dark .img-container {
  --pattern-base-color: rgb(55 65 81);
  --pattern-box-color: rgb(47, 61, 80);
}
</style>
