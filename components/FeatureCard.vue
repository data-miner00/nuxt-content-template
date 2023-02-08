<script lang="ts">
export default defineComponent({
  props: {
    icon: String,
    title: String,
    description: String,
    color: {
      type: String,
      default: "bg-violet-400",
    },
  },
});
</script>

<template>
  <section
    class="border overflow-hidden border-solid relative border-gray-200 rounded-xl shadow-lg shadow-gray-200 dark:border-gray-700 dark:shadow-none after:h-6 after:w-12 dark:after:bg-gray-700 after:bg-gray-100 after:absolute after:-top-1 after:-right-4 after:transform after:rotate-45"
  >
    <header
      class="flex items-center border-b border-solid border-gray-200 dark:border-gray-700 p-5"
    >
      <div
        class="flex place-items-center p-3 rounded-full text-white items-center w-12 h-12"
        :class="color"
      >
        <slot>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="block"
            viewBox="0 0 16 16"
          >
            <path
              d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"
            />
            <path
              fill-rule="evenodd"
              d="M9.146 8.146a.5.5 0 0 1 .708 0L11.5 9.793l1.646-1.647a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 0-.708z"
            />
            <path
              fill-rule="evenodd"
              d="M11.5 5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 1 .5-.5z"
            />
            <path
              d="M3.56 11V7.01h.056l1.428 3.239h.774l1.42-3.24h.056V11h1.073V5.001h-1.2l-1.71 3.894h-.039l-1.71-3.894H2.5V11h1.06z"
            />
          </svg>
        </slot>
      </div>
      <div class="ml-5">
        <h1 class="block font-bold uppercase text-slate-800 dark:text-slate-50">
          {{ title }}
        </h1>
      </div>
    </header>
    <main class="p-5">
      <p class="text-gray-600 dark:text-gray-200">{{ description }}</p>
    </main>
  </section>
</template>
