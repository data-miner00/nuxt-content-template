<template>
  <section class="section pb-10 pt-32 lg:pt-52 lg:pb-28 relative">
    <div class="lg:max-w-[75rem] mx-auto px-6">
      <slot />
    </div>
  </section>
</template>

<style>
.section::before {
  --mask-color: #000;
  --background-color: #fafafa;
  content: "";
  position: absolute;
  inset: 0;
  mask-image: linear-gradient(
    var(--mask-color),
    var(--mask-color),
    transparent
  );
  background-color: var(--background-color);
  z-index: -1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E");
}

.dark .section::before {
  --mask-color: #fff;
  --background-color: #1e293b;
}
</style>
