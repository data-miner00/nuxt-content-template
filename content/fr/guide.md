---
title: Commencer
description: Tout ce que vous devez savoir pour commencer avec ce modèle génial
topic: Guide
category: Guide
authors:
  - name: Shaun
    avatar: shaun.png
tags:
  - didacticiel
  - guide
updatedAt: 2023-11-18T11:37:49.432Z
createdAt: 2023-11-18T11:37:49.432Z
---

> Remarque: Cette page est traduite à l'aide de Google Traduction

## Aperçu

Ce modèle est mieux utilisé pour les sites statiques tels que la **documentation** et la **vitrine de portefeuille** qui peuvent bénéficier de l'utilisation de Markdown.

La pile est composée de Vue.js et Nuxt.js comme technologie de base pour la création du modèle, Nuxt Content pour la gestion de contenu et complétée par Tailwind CSS comme bibliothèque de style.

## Installation

Pour commencer, clonez le modèle de projet depuis GitHub.

```
git clone https://github.com/data-miner00/nuxt-content-template.git
```

Ensuite, installez les dépendances avec [Pnpm](https://pnpm.io).

```
pnpm i
```

Si vous souhaitez installer avec d'autres gestionnaires de packages comme [Npm](https://npmjs.com/) ou [Yarn](https://yarnpkg.com/), n'hésitez pas à supprimer le `pnpm-lock.yaml` et continuez avec le gestionnaire de paquets de votre choix.

Une fois l'installation terminée, démarrez le serveur de développement en exécutant la commande `dev`.

```
pnpm dev
```

## Pré-écriture

Avant d'écrire des articles dans le fichier `.md`, il est conseillé d'ajouter le code frontmatter qui décrit l'article afin qu'il puisse être utilisé lors de la mise en page de la page individuelle. L'exemple de frontmatter peut être trouvé dans le fichier `/templates/frontmatter.yml`. Il s'agit essentiellement d'un assortiment de propriétés personnalisées liées à l'article.

```yaml
title: Titre de l'article
description: Le sous-titre décrivant le titre plus en détail, doit être écrit en casse-phrase
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

Les propriétés recommandées sont répertoriées comme suit:

- `title`: Le titre (h1) de l'article/sujet.
- `description`: Une définition plus longue qui décrit l'intention et l'objectif de l'article.
- `category`: Le sujet principal de l'article.
- `tags`: Une liste de balises liées à l'article.
- `createdAt`: L'horodatage de la création de l'article.
- `updatedAt`: L'horodatage de la modification de l'article.

Cependant, n'hésitez pas à ajouter d'autres champs personnalisés qui vous conviennent le mieux.

Pour accéder aux champs, ils peuvent être obtenus à partir des composables `useAsyncData` comme suit.

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

L'exemple ci-dessus illustre l'accès de l'attribut personnalisé `title` à partir du frontmatter de l'article. D'autres valeurs définies peuvent être récupérées de la même manière.

## Writing Content

Dans Nuxt, chaque fichier `.vue` dans le dossier `/pages` correspond directement au chemin du nom de fichier à partir de la racine en conséquence. Par exemple, le `pages/home.vue` correspond à `/home` dans l'application.

Avec Nuxt Content, il est également possible de mapper le fichier `.md` dans le dossier `/content` directement à la racine. Cela nécessitera qu'un fichier `[...slug].vue` soit placé dans le dossier `/pages` pour fonctionner.

S'il y a des conflits de noms entre le fichier `.md` et le fichier `.vue` dans les dossiers `/content` et `/pages`, le fichier `.vue` dans le dossier `/pages` aura la priorité et annulant la déclaration du fichier `.md`.

Pour mémoire, cette page (`/guide`) est écrite en `.md` dans le dossier `/content` qui est ensuite rendu avec des styles et une mise en page prédéfinis.

### Table des matières

Par défaut, le contenu Nuxt rend `<h2>` et `<h3>` uniquement dans la table des matières et ignorera tout `<h1>` présent dans le démarquage car `<h1>` est reconnu comme le titre principal de la article ou page. Tous les titres suivants de l'article devront commencer sémantiquement à partir de `<h2>`. Par conséquent, il est recommandé d'utiliser les en-têtes `<h2>` et supérieurs lors de l'écriture.

Ce modèle n'affiche que les balises `<h2>` dans la table des matières. Pour visualiser cela, considérez l'exemple suivant de structure de titre dans un article.

```
├─ Titre 1
│  ├─ Sous-titre A
│  ├─ Sous-titre B
│  └─ Sous-titre C
├─ Titre 2
│  ├─ Sous-titre A
│  ├─ Sous-titre B
│  └─ Sous-titre C
├─ Titre 3
└─ Titre 4
```

Dans la table des matières, le contenu généré sera le suivant.

```
├─ Titre 1
├─ Titre 2
├─ Titre 3
└─ Titre 4
```

Pour personnaliser ce comportement afin d'inclure également le sous-titre, rendez-vous sur `/pages/[...slug].vue` et décommentez les codes qui généreront le sous-titre.

### Commander du contenu

Le classement par défaut est par ordre alphabétique. Pour personnaliser les commandes, faites précéder le nom du fichier de nombres suivis d'un `.` immédiat tel que `1.Introduction.md` et incrémentez le nombre pour les fichiers suivants.

```[Structure du répertoire] {1}
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

![ma belle image](/images/demo.png)

Voici à quoi ressemble une image de portrait dans la prose. Il est aligné à gauche et s'étendra jusqu'à la largeur maximale disponible dans la prose. Les images qui seront diffusées avec l'application peuvent être placées dans le répertoire "public". Par exemple, les images du dossier `/public/images` sont accessibles via le chemin `/images/img.jpg` directement.

```md
![ma belle image](/images/demo.png)
```

L'image de paysage occupera très probablement toute la largeur du conteneur si elle a une résolution suffisamment large.

![mon image de paysage cool](/images/demo_landscape.png)

Pour les images situées dans le dossier `/assets/images`, elles devront être traitées par les outils de construction en les référençant à partir du code source en utilisant `require` ou toute forme d'importation avant qu'elles ne soient incluses dans la sortie finale de la construction. .

```vue
<template>
  <img :src="require('~/assets/images/img.jpg')" />
</template>
```

### Prise en charge de LaTeX

Ce modèle est également livré avec le support de $\LaTeX$. Écrivez facilement de belles équations dans le Markdown !

```latex [Équation de Schrödinger]
\begin{equation}
  i \hbar \frac{\partial}{\partial t} \Psi \big(\textbf{r}, t) = \left[- \frac{\hbar^2}{2m}\nabla^2 + V(\textbf{r})\right]\Psi(\textbf{r}, t)
\end{equation}
```

Le code $\LaTeX$ pour l'équation de Schrödinger affiché rendra la sortie riche comme indiqué ci-dessous.

$$
\begin{equation}
  i \hbar \frac{\partial}{\partial t} \Psi \big(\textbf{r}, t) = \left[- \frac{\hbar^2}{2m}\nabla^2 + V(\textbf{r})\right]\Psi(\textbf{r}, t)
\end{equation}
$$

Voici un autre exemple de matrice rendue avec $\LaTeX$.

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

## Coiffant

Ce modèle ouvre beaucoup de possibilités de personnalisation en plus de ce qui est actuellement fourni par Nuxt, Nuxt Content, TailwindCSS et certaines de mes touches pour le rendre génial.

### Content

Le contenu de l'article a été stylisé à l'aide du plugin Typography de Tailwind (`@tailwindcss/typography`) qui offre un ensemble de styles prédéfinis suffisants pour rendre l'article élégant et attrayant à lire. Le style peut être personnalisé sur la balise `<article>` dans `/pages/[...slug].vue` en utilisant le mot clé `prose`.

Pour styliser un `<h2>` à l'intérieur du bloc d'article, préfixez le style avec `prose-h2:` dans le bloc d'article où `prose` est défini dans la classe.

```html
<article class="prose prose-stone prose-h2:text-blue-400" />
```

En outre, pour modifier la façon dont le Markdown est traduit en composants Vue pour le rendu, créez les éléments Prose spécifiques dans le dossier `/components/content`. Nuxt utilisera automatiquement ces éléments pour restituer le contenu Markdown à la place. La liste des remplacements disponibles comprend `ProseCode`, `ProseH1`, `ProseA` etc. La liste complète peut être consultée dans le référentiel [GitHub officiel](https://github.com/nuxt/content/tree/main/src/runtime/components/Prose).

Pour votre information, des exemples d'éléments Prose remplacés dans ce modèle sont `ProseCode`, `ProseH2` et `ProseH3` qui se trouvent dans le dossier `/components/content`.

### Composants personnalisés

Nuxt Content permet la création de composants personnalisés qui peuvent être intégrés au script Markdown et le restituer en HTML. Il existe quelques syntaxes qui peuvent être utilisées pour présenter des composants personnalisés dans le Markdown. La première façon de le faire est d'utiliser la syntaxe MDC.

Pour les **composants en ligne**, il peut être utilisé en ajoutant deux-points devant le nom du composant. Cela rendra le composant qui ne prend aucun accessoire ni enfant dans la page.

```
:my-component
```

Pour les **composants de bloc**, il peut être utilisé en préfixant le nom du composant avec un double deux-points, suivi d'un autre double-virgule fermant pour signifier la fin du composant. Le composant de bloc est le composant qui peut accepter le contenu Markdown ou un autre composant comme contenu d'emplacement.

```
::card
Bonjour le monde
::
```

**L'imbrication** est prise en charge pour le composant de bloc en tant que tel.

```
::hero
  :::card
    Une carte imbriquée
    ::card
      Une carte super imbriquée
    ::
  :::
::
```

Pour effectuer le rendu d'un **emplacement nommé** personnalisé à l'intérieur du composant, utilisez le modèle `#slot-name` pour indiquer quel contenu doit être rendu dans quel emplacement.

```
::card
Le texte par défaut de l'emplacement

#description
Cela sera rendu dans l'emplacement `description` du composant.
::
```

Pour un composant personnalisé qui accepte les **props**, placez simplement les paires clé-valeur souhaitées dans une paire d'accolades immédiatement après le nom du composant.

```
::alert{type="warning" color="default"}
Le composant **alerte**
::
```

Une autre façon de transmettre des accessoires à un composant personnalisé consiste à utiliser la **méthode YAML** illustrée ci-dessous.

```
::alert
---
type: warning
color: default
---
Le composant **alerte**
::
```

Voici un petit exemple d'utilisation du composant personnalisé avec la syntaxe MDC. Le composant personnalisé nommé "Card.vue" est utilisé pour la démonstration suivante.

```
::card{title="Titre génial!" footer="Ceci est un pied de page discret"}
Ceci est un exemple de paragraphe qui est **passé** dans l'**emplacement par défaut** de la carte personnalisée pour le rendu.
::
```

L'extrait de code ci-dessus aura son contenu rendu comme ci-dessous.

::card{title="Titre génial!" footer="Ceci est un pied de page discret"}
Ceci est un exemple de paragraphe qui est **passé** dans l'**emplacement par défaut** de la carte personnalisée pour le rendu.
::

### Thème sombre

Ce modèle utilise le mode sombre basé sur les classes de Tailwind pour la thématisation. Un composant de changement de thème prêt à l'emploi est déjà fourni. Il utilise le composable [useColorMode](https://color-mode.nuxtjs.org/) du mode de couleur Nuxt pour prendre en charge le changement de thème et la persistance de la préférence de thème via l'API de stockage local du navigateur. C'est incroyablement pratique.

```ts
const colorMode = useColorMode();

colorMode.preference = "dark";
colorMode.preference = "light";
colorMode.preference = "system";
```

### Blocs de code

Le style des blocs de code peut être modifié à votre guise en vous rendant dans la section `content` du fichier de configuration `nuxt.config.ts`.

```ts [nuxt.config.ts]
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
  },
});
```

Dans la section `highlight`, vous pouvez choisir le thème qui affichera les blocs de code pour les modes clair et sombre. Le contenu Nuxt utilise [Shiki](https://github.com/shikijs/shiki) comme surligneur de code et il est accompagné d'un large éventail de [thèmes populaires](https://github.com/shikijs/shiki/blob/main/docs/themes.md) prêt à être utilisé.

La prise en charge de la coloration syntaxique n'est disponible que pour un ensemble limité de langages par défaut tels que HTML, JavaScript, TypeScript et Vue. Pour activer la mise en surbrillance de la langue de votre choix, ajoutez simplement l'[identifiant de langue](https://github.com/shikijs/shiki/blob/main/docs/languages.md) dans le tableau "preload".

### Tailwind dans Markdown

Étant donné que Tailwind a été configuré pour surveiller les styles dans les fichiers `.md` dans `tailwind.config.js`, il peut être utilisé librement n'importe où dans le fichier. Par exemple, si vous souhaitez styliser un mot particulier avec une classe Tailwind `text-pink-400`, encapsulez-le simplement dans une balise HTML span et attribuez-lui le nom de la classe.

```md
## Mon titre superflu

Lorem <span class="text-pink-400">ipsum</span> dolor sit amet, adispicing elit.
```

Une autre façon de styliser un texte en ligne consiste à utiliser la syntaxe indiquée ci-dessous. Il est plus simple et soigné que l'exemple précédent.

```md
Lorem [ipsum]{.text-pink-400} dolor sit amet, adispicing elit.
```

> https://tailwindcss.nuxtjs.org/examples/content

## Internationalisation

L'internationalisation est déjà intégrée à ce modèle à l'aide de [Nuxt i18n](https://v8.i18n.nuxtjs.org/). Le composant de changement de langue est également fourni pour permettre une transition facile entre les langues disponibles (dans ce cas, l'anglais et le français) de manière transparente.

L'URL de la locale non par défaut sera préfixée avec son code alors que la locale par défaut ne nécessite pas de préfixe.

### Définition des mots

Pour définir un mot pour les langues prévues, il existe une section dans `nuxt.config.ts` nommée `vueI18n` dans l'objet `i18n` pour les définir. Par exemple, pour définir le monde "welcome" pour l'anglais et le français, créez une propriété appelée `welcome` dans leurs objets régionaux respectifs à l'intérieur de `messages` avec leur valeur correspondante.

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

Le mot nouvellement défini peut être utilisé n'importe où dans le projet à l'intérieur de la balise `templates` en interpolant avec la fonction `$t` qui prend la clé du mot défini.

```vue
<template>
  <p>{{ $t("welcome") }}</p>
</template>
```

Avec cela en place, Nuxt est assez intelligent pour restituer correctement "Bienvenue" ou "Bienvenue" lorsque le contexte de la langue a changé.

### Définition du fichier de paramètres régionaux

Bien que la solution ci-dessus consistant à ajouter une nouvelle définition de mots dans le fichier `nuxt.config.ts` fonctionne, elle peut poser un réel problème lorsque le **vocabulaire s'agrandit** à mesure que le fichier devient lourd à maintenir.

Heureusement, il existe un autre moyen préféré de stocker les définitions de langage dans leur propre fichier JSON séparé. Avec cette approche, non seulement il atteint le principe de responsabilité unique, mais il améliore également considérablement la maintenabilité des fichiers.

Voici comment il est configuré dans `nuxt.config.ts`.

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
  },
});
```

Le code ci-dessus indique à Nuxt de localiser la définition anglaise dans le fichier "en.json" et la définition française dans le fichier "fr.json" dans le dossier "locales".

### I18n dans le contenu Nuxt

Pour prendre en charge l'internationalisation des contenus basés sur Markdown à partir de Nuxt Content, créez un dossier correspondant dans le dossier `content` avec le code de la locale non par défaut et imitez la structure du dossier de base.

Par exemple, étant donné que j'ai la structure de fichiers suivante qui a un contenu en anglais, le contenu en français peut être hébergé de la manière suivante.

De:

```[Structure du répertoire]
├─ content
│  ├─ blogs
│  │  ├─ blog1.md
│  │  └─ blog2.md
│  ├─ demo.md
│  └─ guide.md
```

En:

```[Structure du répertoire]
├─ content
│  ├─ blogs
│  │  ├─ blog1.md (Anglais)
│  │  └─ blog2.md (Anglais)
│  ├─ fr
│  │  ├─ blogs
│  │  │  ├─ blog1.md (Français)
│  │  │  └─ blog2.md (Français)
│  │  ├─ demo.md (Français)
│  │  └─ guide.md (Français)
│  ├─ demo.md (Anglais)
│  └─ guide.md (Anglais)
```

En faisant cela, nous utilisons le comportement de l'URL préfixée pour les paramètres régionaux non par défaut et cela fait l'affaire. Ce n'est pas la solution la plus élégante mais ça marche pour l'instant.

### Liens internationalisés

Pour nous assurer que chaque lien du site Web correspond à ses homologues linguistiques, nous devons prétraiter les liens avec le composable `useLocalePath`. Voici à quoi cela ressemble dans le code.

```vue
<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <NuxtLink to="/careers">Avant i18n</NuxtLink>
  <!-- changé en -->
  <NuxtLink :to="localePath('/careers')">Après i18n</NuxtLink>
</template>
```

Cela garantira que lorsque vous êtes dans le contexte anglais, le lien vous redirigera vers la page normale `/careers` alors que si vous êtes dans le contexte français, il pointera vers `/fr/careers` pour sa version française.
