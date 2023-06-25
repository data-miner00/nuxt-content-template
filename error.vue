<script setup lang="ts">
const localePath = useLocalePath();

// Clean error state
function handleError() {
  clearError({ redirect: "/" });
}
</script>

<template>
  <NuxtLayout>
    <div
      class="h-96 max-w-screen-xl mx-auto flex justify-center items-center mt-24 xl:mt-48"
    >
      <section class="sm:flex">
        <p class="text-4xl font-semibold text-green-600 sm:text-5xl">404</p>
        <div class="sm:ml-6">
          <div class="sm:border-l border-gray-400 sm:pl-6">
            <h1
              class="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
            >
              {{ $t("errorPage.message") }}
            </h1>
            <p class="mt-1 text-xl text-gray-500">
              {{ $t("errorPage.message") }}
            </p>
          </div>
          <div
            class="flex gap-3 mt-10 sm:border-l sm:border-transparent sm:pl-6"
          >
            <NuxtLink
              class="px-6 py-3 rounded transition-colors duration-200 bg-green-600 text-white border-2 border-solid border-green-600"
              :to="localePath('/')"
            >
              {{ $t("errorPage.action") }}
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>
