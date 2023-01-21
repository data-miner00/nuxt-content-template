<script setup lang="ts">
const language = useState("language", () => "en");
</script>

<template>
  <button
    class="flex ml-2 items-center justify-between px-2 py-2 bg-gray-100 rounded-md"
  >
    <svg
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      class="block"
    >
      <path
        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
      ></path>
    </svg>
    <svg
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="h-4 w-4 block"
    >
      <g transform="rotate(90 12 12)">
        <path d="M9 5l7 7-7 7"></path>
      </g>
    </svg>
  </button>
</template>
