<script setup lang="ts">
const counter = useState("counter", () => Math.round(Math.random() * 1000));
</script>

<template>
  <div>
    <div class="font-lg font-bold">{{ counter }}</div>
    <NuxtPage />
  </div>
</template>
