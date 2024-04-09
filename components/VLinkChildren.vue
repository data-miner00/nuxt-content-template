<script setup lang="ts">
import type { NavItem } from "@nuxt/content/dist/runtime/types";

type Props = {
  topics: NavItem[] | undefined;
};

defineProps<Props>();
</script>

<template>
  <div :key="topic._id" v-for="(topic, index) in topics" class="pl-4">
    <NuxtLink :to="topic._path">
      <span v-if="topics && index < topics?.length - 1">├</span
      ><span v-else>└</span> <span v-if="topic.children">📁</span
      ><span v-else>📃</span>
      {{ topic.title }}
    </NuxtLink>
    <VLinkChildren :topics="topic.children" />
  </div>
</template>
