<script lang="ts">
export default defineComponent({
  props: {
    code: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: null,
    },
    filename: {
      type: String,
      default: null,
    },
    highlights: {
      type: Array as () => number[],
      default: () => [],
    },
    meta: {
      type: String,
      default: null,
    },
  },
});
</script>

<template>
  <div class="relative">
    <span
      v-if="filename"
      class="block absolute py-1 px-2 text-xs rounded border border-solid border-gray-300 right-2 top-2 bg-gray-100"
      >{{ filename }}</span
    >
    <slot />
  </div>
</template>

<style>
pre code .line {
  display: block;
  min-height: 1rem;
}
</style>
