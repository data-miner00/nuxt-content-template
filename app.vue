<script setup lang="ts">
import "bootstrap-icons/font/bootstrap-icons.min.css";

const { t, locale } = useI18n();
</script>

<template>
  <NuxtLayout>
    <SeoKit
      :site-name="t('site.name')"
      :site-description="t('site.description')"
      :language="locale"
    />
    <NuxtPage />
  </NuxtLayout>
</template>
