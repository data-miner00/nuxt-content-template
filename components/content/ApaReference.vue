<script lang="ts" setup>
type Source = "newspaper" | "blogs" | "magazines" | "online-news" | "websites";
type Props = {
  authors?: string[];
  organization?: string;
  title: string;
  date?: string;
  retrievedDate?: string;
  publisher?: string;
  url: string;
  source: Source;
};

const props = defineProps<Props>();

const authorsString = computed(() =>
  props.authors && props.authors.length > 0
    ? props.authors.join(", ")
    : props.organization
);

const punctuatedTitle = computed(() => {
  const punctuations = ["?", ".", "!"];
  const containPunctuations = punctuations.includes(
    props.title[props.title.length - 1]
  );

  return containPunctuations ? props.title : props.title + ".";
});

const italicTitle = computed(() => {
  return props.source === "online-news" || props.source === "websites";
});

const hasAuthor = computed(() => props.authors || props.organization);
</script>

<template>
  <div class="pl-8 md:pl-16 -indent-8 md:-indent-16 mb-4 last-of-type:mb-0">
    <span v-if="hasAuthor">{{ authorsString }}. </span>
    <time v-if="hasAuthor" :datetime="date">({{ date ?? "n.d." }}). </time>
    <span :class="italicTitle ? 'italic' : ''">
      {{ punctuatedTitle }}
    </span>
    <time v-if="!hasAuthor" :datetime="date">({{ date ?? "n.d." }}). </time>
    <span v-if="publisher" :class="!italicTitle ? 'italic' : ''"
      >&nbsp;{{ publisher }}.
    </span>
    <span v-if="!date && source === 'websites'">
      Retrieved {{ retrievedDate }} from
    </span>
    <a :href="url">{{ url }}</a>
  </div>
</template>
