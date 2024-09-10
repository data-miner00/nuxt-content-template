<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath();
const isPopupOpen = useState("popup-open", () => false);

function closePopup() {
  isPopupOpen.value = false;
}
</script>

<template>
  <div class="relative flex items-center">
    <button
      @click="() => (isPopupOpen = !isPopupOpen)"
      class="flex ml-2 items-center justify-between px-2 py-2 bg-gray-100 dark:bg-slate-700 rounded-md"
      :title="$t('header.buttons.change_language')"
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
    <div
      v-if="isPopupOpen"
      class="absolute -bottom-40 right-0 flex flex-col items-stretch rounded"
    >
      <NuxtLink
        :to="switchLocalePath('fr')"
        @click="closePopup"
        class="language"
      >
        <span class="block">
          <NuxtImg
            src="/images/flag-france.svg"
            alt="The flag of France"
            class="h-8"
          />
        </span>
        <span class="block"> Français </span>
      </NuxtLink>
      <NuxtLink
        :to="switchLocalePath('en')"
        @click="closePopup"
        class="language"
      >
        <span class="block">
          <NuxtImg
            src="/images/flag-united-states.svg"
            alt="The flag of the States"
            class="h-8"
          />
        </span>
        <span class="block">English</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="sass">
.language
  @apply p-2 flex flex-col items-center hover:border-gray-200 dark:hover:border-slate-600 dark:hover:bg-slate-700 hover:bg-white border border-solid border-transparent rounded text-center
</style>
