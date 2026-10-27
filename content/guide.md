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
updatedAt: 2024-03-28T11:05:53.157Z
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

The `pnpm-lock.yaml` file was generated with [Node.js](https://nodejs.org) 20.9.0, so it is recommended to use the same version.

If you use [Nix](https://nixos.org/download.html), enter the Nix shell instead. The `shell.nix` file at the root of the project provides Node.js 20.9.0 and pnpm 10, so neither needs to be installed separately.

```
nix-shell
```

Next, install the dependencies with [Pnpm](https://pnpm.io).

```
pnpm i --frozen-lockfile
```

The `--frozen-lockfile` flag installs the exact versions pinned in `pnpm-lock.yaml` and stops with an error instead of updating the lockfile.

Stick to Pnpm rather than [Npm](https://npmjs.com/) or [Yarn](https://yarnpkg.com/). They ignore `pnpm-lock.yaml` and resolve the version ranges in `package.json` on their own, which pulls in newer releases of Nuxt and Nuxt Content that this template has not been updated for.

Then, copy the example environment file and replace its values with your own.

```
cp .env.example .env
```

`NUXT_PUBLIC_SITE_URL` is the address the site will be deployed to. It is used for canonical links, social previews and the sitemap, which fall back to `https://example.com` when it is not set. `NUXT_INDEXABLE` decides whether search engines are allowed to index the site. When it is not set, indexing is only allowed in production builds.

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

This template runs Nuxt Content in document-driven mode (the `documentDriven` option in `nuxt.config.ts`), which fetches the article that matches the current URL on its own. Its fields can then be read from the `page` returned by the `useContent` composable, the same way `pages/[...slug].vue` does.

```vue
<script setup lang="ts">
const { page } = useContent();
</script>

<template>
  <h1>{{ page?.title }}</h1>
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

To include the subheadings as well, open `components/TableOfContent.vue` and uncomment the block marked "Uncomment the code below to render secondary title".

The bottom of the ToC also shows when the article was last updated. The date comes from the `updatedAt` field in the frontmatter and is formatted in the active language, so `2024-03-28T11:05:53.157Z` is shown as "March 28, 2024" in English and "28 mars 2024" in French. Leave out `updatedAt` to hide it.

```yaml
---
title: Getting Started
updatedAt: 2024-03-28T11:05:53.157Z
---
```

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

![my cool image](/images/demo.png)

This is how a portrait image looks like within the prose. It is left aligned and will extend to the max width available in the prose. Images that will be served alongside with the app can be placed within the `public` directory. For instance, images within the `/public/images` folder can be accessed via the path `/images/img.jpg` directly.

```md
![my cool image](/images/demo.png)
```

The landscape image will most probably took over the full width of the container if they have a wide enough resolution.

![my cool landscape image](/images/demo_landscape.png)

For images that are located in `/assets/images` folder, they will need to be processed by the build tools by referencing them from source code by using `require` or any form of import before they will be included in the final build output.

```vue
<template>
  <img :src="require('~/assets/images/img.jpg')" />
</template>
```

### Tables

This is how the default table looks like.

| Age | Person 1 | Person 2 | Person 3 | Average |
| --- | -------- | -------- | -------- | ------- |
| 8   | 6        | 7        | 5        | 6       |
| 10  | 6.5      | 7.5      | 8.5      | 7.5     |
| 12  | 8        | 9        | 10       | 9       |

### Keyboard

Keyboard keys can be represented with the `<kbd>` HTML tag such as <kbd>Esc</kbd>, <kbd>Enter</kbd> and <kbd>Ctrl</kbd>.

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

### Custom Components

Nuxt Content allows the creation of custom components that can be embedded to the Markdown script and render it as HTML altogether. There are a couple of syntax that can be used to feature custom components in the Markdown. The first way to do so is by using the MDC syntax.

For **inline components**, it can be used by prepending a colon in front of the component's name. This will render the component that takes in no props nor children into the page.

```
:my-component
```

For **block components**, it can be used by prefixing the component's name with a double colon, followed by another closing double colon to signify the end of the component. Block component is the component that can accept Markdown content or another component as it's slot content.

```
::card
Hello world
::
```

**Nesting** is supported for the block component as such.

```
::hero
  :::card
    A nested card
    ::card
      A super nested card
    ::
  :::
::
```

To render for a custom **named slot** inside the component, use the `#slot-name` pattern to outline which content to be rendered within which slot.

```
::card
The slot default text

#description
This will be rendered within the `description` slot in the component.
::
```

For a custom component that accepts **props**, simply enclose the desired key-value pairs within a pair of curly braces immediately after the component's name.

```
::alert{type="warning" color="default"}
The **alert** component
::
```

Another way of passing props to a custom component is by using the **YAML method** that is demonstrated as below.

```
::alert
---
type: warning
color: default
---
The **alert** component
::
```

Here is a small example on using the custom component with the MDC syntax. The custom component named `Card.vue` is used for the following demo.

```
::card{title="Awesome title!" footer="This is an inconspicuous footer"}
This is a sample paragraph that is **passed** into the custom card's **default slot** for rendering.
::
```

The code snippet above will have it's content rendered as below.

::card{title="Awesome title!" footer="This is an inconspicuous footer"}
This is a sample paragraph that is **passed** into the custom card's **default slot** for rendering.
::

### Dark Theme

This template uses Tailwind's class-based Dark Mode for theming. A ready to use theme switching component is already provided. It uses the Nuxt Color Mode's [useColorMode](https://color-mode.nuxtjs.org/) composable to take care of the theme switching and persisting the theme preference through the browser's Local Storage API. It is incredibly convenient.

```ts
const colorMode = useColorMode();

colorMode.preference = "dark";
colorMode.preference = "light";
colorMode.preference = "system";
```

### Code Blocks

The style of the code blocks can be modified to suits your liking by heading over to the `content` section in the `nuxt.config.ts` configuration file.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  content: {
    documentDriven: { navigation: false },
    highlight: {
      theme: {
        default: "github-light",
        dark: "github-dark",
      },
      preload: ["cpp", "csharp", "rust", "wenyan"],
    },
  },
});
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

> https://tailwindcss.nuxt.dev/examples/content

## Internationalization

Internationalization is already baked into this template with the help of [Nuxt i18n](https://v8.i18n.nuxtjs.org/). The language switcher component is also provided that allows easy transition between the languages that is available (in this case English and French) seamlessly.

The url of the non-default locale will be prefixed with it's code whereas the default locale does not require prefixing.

### Defining Words

Translations are stored in a separate JSON file for each language inside the `locales` folder. This keeps them out of `nuxt.config.ts` and easy to maintain as the **vocabulary grows**. Each language is registered in `nuxt.config.ts` along with the file that holds its words.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    langDir: "locales",
    locales: [
      {
        code: "en",
        file: "en.json",
      },
      {
        code: "fr",
        file: "fr.json",
      },
    ],
    lazy: true,
    defaultLocale: "en",
  },
});
```

The code above tells Nuxt to look for the English words in `locales/en.json` and the French words in `locales/fr.json`. With `lazy` enabled, only the file for the active language is loaded.

To define a word, add the same key to every locale file with its translated value. Keys can be nested to group related words together.

```json [locales/en.json]
{
  "tableOfContent": {
    "title": "In this article"
  }
}
```

```json [locales/fr.json]
{
  "tableOfContent": {
    "title": "Dans cet article"
  }
}
```

The word can then be used anywhere inside the `<template>` by passing its key to the `$t` function, using dots to reach nested keys.

```vue
<template>
  <h3>{{ $t("tableOfContent.title") }}</h3>
</template>
```

With this in place, Nuxt renders "In this article" or "Dans cet article" depending on the active language.

### Inline Messages

For a handful of words, they can also be defined directly in `nuxt.config.ts` under `vueI18n.messages` without creating any locale files.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  i18n: {
    vueI18n: {
      messages: {
        en: {
          welcome: "Welcome",
        },
        fr: {
          welcome: "Bienvenue",
        },
      },
    },
  },
});
```

These are used the same way with `$t("welcome")`, but the config file quickly becomes cumbersome to maintain as the vocabulary grows. That is why this template keeps every word in the locale files instead.

### Placeholders and Rich Text

Not every translation is a plain string. Some sentences contain a value that is only known at runtime, some need markup in the middle of them, and some are never shown on screen at all. This section covers how the template handles each case.

#### Named Placeholders

Wrap a name in curly braces to leave a gap in the message, then pass its value as the second argument of `$t`. The copyright line in the footer uses this to print the current year.

```json [locales/en.json]
{
  "footer": {
    "copyright": "Templatr © {year} by Shaun. All rights unreserved."
  }
}
```

```vue [components/VFooter.vue]
<script setup lang="ts">
const date = new Date();
</script>

<template>
  <footer>{{ $t("footer.copyright", { year: date.getFullYear() }) }}</footer>
</template>
```

Each language can put `{year}` wherever its grammar needs it, so there is no need to split the sentence into pieces and glue them back together in the template.

#### Markup Inside a Sentence

When part of a sentence needs its own element, such as the green "Nuxt" in the hero heading, use the `<i18n-t>` component instead of `$t`. Each placeholder in the message is filled by a slot of the same name.

```json [locales/en.json]
{
  "homePage": {
    "landing": {
      "title": "{nuxt} Content Template"
    }
  }
}
```

```json [locales/fr.json]
{
  "homePage": {
    "landing": {
      "title": "Modèle {nuxt} Content"
    }
  }
}
```

```vue [pages/index.vue]
<template>
  <i18n-t keypath="homePage.landing.title" scope="global" tag="h1">
    <template #nuxt>
      <span class="text-green-500">Nuxt</span>
    </template>
  </i18n-t>
</template>
```

`keypath` is the key of the message, `scope="global"` looks it up in the locale files and `tag` is the element that wraps the result. Notice that "Nuxt" comes first in English but second in French. The slot follows the placeholder wherever it is, so each language keeps its natural word order.

#### Translated Attributes

Text that is not visible on the page, such as `aria-label` and `title`, is still read out by screen readers and shown in tooltips, so it should be translated too. Bind the attribute with a colon so that its value is treated as an expression, then call `$t` inside it.

```vue [components/VHeader.vue]
<template>
  <nav :aria-label="$t('header.primary_navigation')">
    <!-- ... -->
  </nav>
</template>
```

Without the colon, the attribute would contain the literal text `$t('header.primary_navigation')`.

#### Linked Messages

When two keys should always say the same thing, point one at the other with `@:` followed by its key. The footer sitemap reuses the navigation labels of the header this way, so renaming "Guide" in the header renames it in the footer as well.

```json [locales/en.json]
{
  "header": {
    "guide": "Guide"
  },
  "footer": {
    "sitemap": {
      "guide": "@:header.guide"
    }
  }
}
```

`$t("footer.sitemap.guide")` now returns "Guide". The link is resolved within the active language, so it returns the French word when the page is in French.

#### Translated Site Name

The site name and description used in the browser tab, search results and link previews are translated through the `<SeoKit>` component in `app.vue`. The `useI18n` composable provides `t`, which works like `$t` but can also be called inside `<script setup>`, and `locale`, the code of the active language.

```vue [app.vue]
<script setup lang="ts">
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
```

Passing `locale` to `language` keeps the `lang` attribute of the page in sync with the active language. Pages that have no `description` in their frontmatter fall back to the translated site description, which is set with `useSeoMeta` in `pages/[...slug].vue`.

### I18n in Nuxt Content

To support internationalization for Markdown based contents from Nuxt Content, create a corresponding folder inside the `content` folder with the non-default locale's code and imitate the structure of the base folder.

For example, given I have the following file structure that has English contents, the French contents can be housed in the following manner.

From:

```[Directory Structure]
├─ content
│  ├─ blogs
│  │  ├─ blog1.md
│  │  └─ blog2.md
│  ├─ demo.md
│  └─ guide.md
```

To:

```[Directory Structure]
├─ content
│  ├─ blogs
│  │  ├─ blog1.md (English)
│  │  └─ blog2.md (English)
│  ├─ fr
│  │  ├─ blogs
│  │  │  ├─ blog1.md (French)
│  │  │  └─ blog2.md (French)
│  │  ├─ demo.md (French)
│  │  └─ guide.md (French)
│  ├─ demo.md (English)
│  └─ guide.md (English)
```

By doing this, we are utilizing the behaviour of the prefixed URL for non-default locale and it does the trick. Not the most elegant solution but it works for now.

### Internationalized Links

To make sure that every links in the website corresponds to its language counterparts, we have to preprocess the links with the `useLocalePath` composable. Here is how it looks like in code.

```vue
<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <NuxtLink to="/careers">Before i18n</NuxtLink>
  <!-- changed to -->
  <NuxtLink :to="localePath('/careers')">After i18n</NuxtLink>
</template>
```

This will ensures when you are in the English context, the link will redirect you to the normal `/careers` page whereas if you are in the French context, it will points to `/fr/careers` for its French version.

## APA Style References

Additionally, this template also comes with a simple APA style citation component that can be utilized in the Markdown file using the MDC syntax. The examples and styles are crafted base on this [Scribbr article](https://www.scribbr.com/apa-examples/website/).

```
::apa-reference
---
authors:
  - Greenhouse, S
date: 2020, July 30
title: The coronavirus pandemic has intensified systemic economic racism against black Americans
publisher: The New Yorker
url: https://www.newyorker.com/news/news-desk/the-pandemic-has-intensified-systemic-economic-racism-against-black-americans
source: newspaper
---
::
```

### Examples

<!-- prettier-ignore-start -->
::apa-reference
---
authors: 
  - Greenhouse, S
date: 2020, July 30
title: The coronavirus pandemic has intensified systemic economic racism against black Americans
publisher: The New Yorker
url: https://www.newyorker.com/news/news-desk/the-pandemic-has-intensified-systemic-economic-racism-against-black-americans
source: newspaper
---
::

::apa-reference
---
authors:
  - Lee, C
date: 2020, February 19
title: A tale of two reference formats
publisher: APA Style Blog
url: https://apastyle.apa.org/blog/two-reference-formats
source: blogs
---
::

::apa-reference
---
authors:
  - Rowlatt, J
date: 2020, October 19
title: Could cold water hold a clue to a dementia cure?
publisher: BBC News
url: https://www.bbc.com/news/health-54531075
source: online-news
---
::

::apa-reference
---
organization: Scribbr
date: n.d.
title: How to cite a website in APA style
url: https://www.scribbr.com/apa-examples/website/
source: websites
---
::

::apa-reference
---
date: 2020, October 19
title: "The countdown: A prophecy, crowds and a TikTok takedown"
publisher: BBC News
url: https://www.bbc.com/news/election-us-2020-54596667
source: online-news
---
::
<!-- prettier-ignore-end -->
