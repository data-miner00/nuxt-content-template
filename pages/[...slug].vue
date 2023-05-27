<script setup lang="ts">
const { path } = useRoute();
const localePath = useLocalePath();

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

let observer: IntersectionObserver;
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`aside a[href$="#${id}"]`);

      if (link) {
        if (id && entry.isIntersecting) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      }
    });
  });

  document
    .querySelectorAll("article.prose h2[id], article.prose h3[id]")
    .forEach((heading) => {
      observer.observe(heading);
    });
});

onBeforeUnmount(() => {
  observer.disconnect();
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
      class="text-xl md:text-2xl font-normal text-gray-500 dark:text-gray-300 lg:max-w-[500px] xl:max-w-[700px] mb-5"
    >
      {{ data?.description }}
    </p>
    <ul
      v-if="data?.tags"
      class="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-50"
    >
      <li
        v-for="(tag, index) in data?.tags"
        :key="index"
        class="border border-solid border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-slate-700 rounded py-1 px-2"
      >
        #{{ tag }}
      </li>
    </ul>
  </Landing>
  <main class="mx-auto flex justify-center">
    <article
      class="prose prose-stone dark:prose-invert max-w-[90%] sm:max-w-[65ch] prose-pre:bg-gray-100 dark:prose-pre:bg-slate-700 dark:prose-pre:text-gray-50 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:border-solid prose-pre:rounded-lg prose-pre:text-slate-800 prose-headings:text-cyan-600 dark:prose-hr:border-gray-700 dark:prose-li:marker:text-gray-200 dark:prose-blockquote:border-gray-200 prose-headings:scroll-mt-24"
    >
      <ContentRenderer :value="(data as Record<string, any> | undefined)">
        <template #empty>
          <ContentNotFound />
        </template>
      </ContentRenderer>
      <hr v-if="prev || next" />
      <div class="flex justify-between">
        <NuxtLink
          v-if="prev"
          :to="localePath(prev._path)"
          class="block py-1 px-3 border border-solid border-gray-200 dark:border-gray-700 rounded"
        >
          ← {{ prev.title }}
        </NuxtLink>
        <div aria-hidden v-else />
        <NuxtLink
          v-if="next"
          :to="localePath(next._path)"
          class="block py-1 px-3 border border-solid border-gray-200 dark:border-gray-700 rounded"
        >
          {{ next.title }} →
        </NuxtLink>
        <div aria-hidden v-else />
      </div>
    </article>
    <div v-if="toc" class="relative ml-10 hidden lg:block">
      <TableOfContent :toc="toc.links" />
    </div>
  </main>
</template>
