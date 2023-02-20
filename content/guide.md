---
title: Getting Started
description: Everything you need to know to get started with this awesome template
topic: Guide
category: Guide
authors:
  - name: Shaun
    avatar: shaun.png
tags:
  - tutorial
  - guide
updatedAt: 2023-11-18T11:37:49.432Z
createdAt: 2023-11-18T11:37:49.432Z
---

## Overview

This template is best used for static sites such as **documentation** and **portfolio showcase** that can be benefited by using Markdown.

The stack is comprised of Vue.js and Nuxt.js as the core technology for building the template, Nuxt Content for content management and supplemented by Tailwind CSS as the styling library.

## Installation

To get started, clone the project template from GitHub.

```
git clone https://github.com/data-miner00/nuxt-content-template.git
```

Next, install the dependencies with [Pnpm](https://pnpm.io).

```
pnpm i
```

If you want to install with other package managers like [Npm](https://npmjs.com/) or [Yarn](https://yarnpkg.com/), feel free to delete the `pnpm-lock.yaml` and proceed with the package manager of your choice.

After the installation is completed, start the development server by running the `dev` command.

```
pnpm dev
```

## Pre-writing

Before writing any articles in the `.md` file, it is advised to add the frontmatter code that describes the article so that it can be used when laying out the individual page. The frontmatter example can be found at `/templates/frontmatter.yml` file. It is essentially an assortment of custom properties that relates to the article.

```yaml
title: Title of the Article
description: The subtitle describing the title in more details, should be written in sentence-case
topic: Topic
category: Category
authors:
  - name: Contributor 1
    avatar: contrib_1.png
  - name: Contributor 2
    avatar: contrib_2.png
tags:
  - tutorial
  - guide
  - cheatsheet
updatedAt: 2022-11-18T11:37:49.432Z
createdAt: 2022-11-18T11:37:49.432Z
```

The recommended properties are listed as follows:

- `title`: The title (h1) of the article/topic.
- `description`: A longer definition that describes the intention and objective of the article.
- `category`: The main topic of the article.
- `tags`: A list of tags that are related to the article.
- `createdAt`: The timestamp of article creation.
- `updatedAt`: The timestamp of article modification.

However, feel free to add in more custom fields that makes most sense to you.

To access the fields, they can be obtained from the `useAsyncData` composables as follow.

```vue
<script setup lang="ts">
const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent(path).findOne();
});
</script>

<template>
  <h1>{{ data?.title }}</h1>
</template>
```

The example above demonstrates the access of the custom `title` attribute from the frontmatter of the article. Other defined values can be retrieved similarly.

## Writing Content

In Nuxt, every `.vue` file inside the `/pages` folder maps directly to the path of the file name from root accordingly. For instance, the `pages/home.vue` maps to `/home` in the application.

With Nuxt Content, it is possible to map `.md` file within the `/content` folder directly to root as well. This will require a `[...slug].vue` file to be placed within the `/pages` folder in order to work.

If there are conflicting names between the `.md` file and the `.vue` file in both `/content` and `/pages` folder, the `.vue` file in the `/pages` folder will get the precedence and annulling the declaration of the `.md` file.

For the record, this page (`/guide`) is written in `.md` within the `/content` folder that is then rendered with predefined stylings and layout.

### Table of Content

By default, Nuxt content renders `<h2>` and `<h3>` only in the ToC and will skip any `<h1>` that is present to the markdown because `<h1>` is recognized as the main title of the article or page. Any subsequent headings in the article will have to start from `<h2>` semantically. Hence, it is recommended to use headings `<h2>` and above when writing.

This template only renders out the `<h2>` tags in the table of content. To visualize this, consider the following example of heading structure within an article.

```
├─ Heading 1
│  ├─ Subheading A
│  ├─ Subheading B
│  └─ Subheading C
├─ Heading 2
│  ├─ Subheading A
│  ├─ Subheading B
│  └─ Subheading C
├─ Heading 3
└─ Heading 4
```

In the ToC, the contents generated will be as follows.

```
├─ Heading 1
├─ Heading 2
├─ Heading 3
└─ Heading 4
```

To customize this behaviour to include the subheading as well, head over to `/pages/[...slug].vue` and uncomment the codes that will generate the subheading.

### Ordering Content

The default ordering is by alphabetical order. To customize the orderings, prepend the filename with numbers followed by an immediate `.` such as `1.Introduction.md` and increment the count for subsequent files.

```[Directory Structure] {1}
content/
  1.frameworks/
    1.vue.md
    2.nuxt.md
  2.examples/
    1.vercel.md
    2.netlify.md
    3.heroku.md
    index.md
```

### Images

![my cool image](/_nuxt/assets/images/demo.png)

This is how a potrait image looks like within the prose. It is left aligned and will extend to the max width available in the prose. For images that are located in `/assets/images` folder, simply prepend the path with `/_nuxt` and it will get the correct image in the Markdown.

```md
![my cool image](/_nuxt/assets/images/demo.png)
```

The landscape image will most probably took over the full width of the container if they have a wide enough resolution.

![my cool landscape image](/_nuxt/assets/images/demo_landscape.png)

### LaTeX Support

This template also comes with the support for $\LaTeX$. Write beautiful equations within the Markdown with ease!

```latex [Schrödinger equation]
\begin{equation}
  i \hbar \frac{\partial}{\partial t} \Psi \big(\textbf{r}, t) = \left[- \frac{\hbar^2}{2m}\nabla^2 + V(\textbf{r})\right]\Psi(\textbf{r}, t)
\end{equation}
```

The $\LaTeX$ code for Schrödinger equation shown will render the rich output as shown below.

$$
\begin{equation}
  i \hbar \frac{\partial}{\partial t} \Psi \big(\textbf{r}, t) = \left[- \frac{\hbar^2}{2m}\nabla^2 + V(\textbf{r})\right]\Psi(\textbf{r}, t)
\end{equation}
$$

Here is another example of matrix rendered with $\LaTeX$.

```latex
\begin{pmatrix*}[r]
    -1 & 2 & 3 \\
    4 & -5 & 6 \\
    7 & 8 & -9
\end{pmatrix*}
```

$$
\begin{pmatrix*}[r]
    -1 & 2 & 3 \\
    4 & -5 & 6 \\
    7 & 8 & -9
\end{pmatrix*}
$$

## Styling

This template opens up a lot of room for customization on top of what's currently provided by Nuxt, Nuxt Content, TailwindCSS and some of my touches to make it great.

### Content

The content of the article was styled using Tailwind's Typography plugin (`@tailwindcss/typography`) that offers a set of pre-defined styles that is enough the make the article sleak and appealing to read through. The style can be customized on the `<article>` tag in `/pages/[...slug].vue` by using the `prose` keyword.

To style an `<h2>` inside the article block, prefix the style with `prose-h2:` in the article block where `prose` is defined in the class.

```html
<article class="prose prose-stone prose-h2:text-blue-400" />
```

Besides, to modify how the Markdown is translated to Vue components for rendering, create the specific Prose elements within the `/components/content` folder. Nuxt will automatically use those elements to render out the Markdown content instead. The list of available overrides includes `ProseCode`, `ProseH1`, `ProseA` etc. The full list can be inspected in the official [GitHub repo](https://github.com/nuxt/content/tree/main/src/runtime/components/Prose).

For your reference, examples of the overridden Prose element in this template are `ProseCode`, `ProseH2` and `ProseH3` that can be found in the `/components/content` folder.

### Dark Theme

This template uses Tailwind's class-based Dark Mode for theming. A ready to use theme switching component is already provided. It takes care of the changing of theme and persisting the theme preference through the browser's Local Storage API. _Details to be updated._

### Code Blocks

The style of the code blocks can be modified to suits your liking by heading over to the `content` section in the `nuxt.config.ts` configuration file.

```ts[nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    documentDriven: true,
    highlight: {
      theme: {
        default: "github-light",
        dark: "github-dark",
      },
      preload: ["cpp", "csharp", "rust", "wenyan"],
    },
  }
})
```

In the `highlight` section, you can choose the theme that will render out the code blocks for both light and dark mode. Nuxt Content uses [Shiki](https://github.com/shikijs/shiki) as their code highlighter and it comes along with a wide array of [popular themes](https://github.com/shikijs/shiki/blob/main/docs/themes.md) ready to be used.

The syntax highlighting support are only available for a limited set of languages by default such as HTML, JavaScript, TypeScript and Vue. To enable highlighting for the language of choice, just add in the [language identifier](https://github.com/shikijs/shiki/blob/main/docs/languages.md) into the `preload` array.

### Tailwind in Markdown

Since Tailwind has been configured to watch for styles in `.md` files in the `tailwind.config.js`, it can be used freely anywhere in the file. For example, if you want to style a particular word with a `text-pink-400` Tailwind class, just wrap it inside a HTML span tag and assign the class name to it.

```md
## My Superfluous Title

Lorem <span class="text-pink-400">ipsum</span> dolor sit amet, adispicing elit.
```

Another way to style an inline text is by using the syntax as shown below. It is simpler and neat than the previous example.

```md
Lorem [ipsum]{.text-pink-400} dolor sit amet, adispicing elit.
```

> https://tailwindcss.nuxtjs.org/examples/content

## Internationalization

To be added.
