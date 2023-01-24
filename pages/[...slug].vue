<script setup lang="ts">
const { path } = useRoute();

const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent(path).findOne();
});

const {
  // Global references
  globals,
  navigation,
  surround,
  page,
  // Computed properties from `page` key
  excerpt,
  toc,
  type,
  layout,
  // Computed properties from `surround` key
  next,
  prev,
} = useContent();

useHead({
  title: data.value?.title,
});
</script>

<template>
  <Landing>
    <span class="text-cyan-600 text-lg md:text-2xl font-bold mb-5">{{
      data?.topic
    }}</span>
    <h1
      class="text-5xl md:text-7xl font-bold mb-6 md:mb-10 lg:max-w-[500px] xl:max-w-[700px]"
    >
      {{ data?.title }}
    </h1>
    <p
      class="text-xl md:text-2xl font-normal text-gray-500 lg:max-w-[500px] xl:max-w-[700px]"
    >
      {{ data?.description }}
    </p>
  </Landing>
  <main class="mx-auto flex justify-center">
    <article
      class="prose prose-stone max-w-[340px] sm:max-w-[65ch] prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200 prose-pre:border-solid prose-pre:rounded-lg prose-pre:text-slate-800"
    >
      <ContentRenderer :value="(data as Record<string, any> | undefined)">
        <template #empty>
          <p>no content found</p>
        </template>
      </ContentRenderer>
    </article>
    <div v-if="toc" class="relative ml-10 hidden lg:block">
      <TableOfContent :toc="toc.links" />
    </div>
  </main>
</template>
