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

Le fichier `pnpm-lock.yaml` a été généré avec [Node.js](https://nodejs.org) 20.9.0, il est donc recommandé d'utiliser la même version.

Si vous utilisez [Nix](https://nixos.org/download.html), entrez plutôt dans le shell Nix. Le fichier `shell.nix` à la racine du projet fournit Node.js 20.9.0 et pnpm 10, il n'est donc pas nécessaire de les installer séparément.

```
nix-shell
```

Ensuite, installez les dépendances avec [Pnpm](https://pnpm.io).

```
pnpm i --frozen-lockfile
```

L'option `--frozen-lockfile` installe exactement les versions figées dans `pnpm-lock.yaml` et s'arrête avec une erreur au lieu de mettre à jour le fichier de verrouillage.

Tenez-vous-en à Pnpm plutôt qu'à [Npm](https://npmjs.com/) ou [Yarn](https://yarnpkg.com/). Ces derniers ignorent `pnpm-lock.yaml` et résolvent eux-mêmes les plages de versions de `package.json`, ce qui installe des versions plus récentes de Nuxt et Nuxt Content pour lesquelles ce modèle n'a pas été mis à jour.

Copiez ensuite le fichier d'environnement d'exemple et remplacez ses valeurs par les vôtres.

```
cp .env.example .env
```

`NUXT_PUBLIC_SITE_URL` est l'adresse à laquelle le site sera déployé. Elle sert aux liens canoniques, aux aperçus sur les réseaux sociaux et au plan du site, qui se rabattent sur `https://example.com` si elle n'est pas définie. `NUXT_INDEXABLE` détermine si les moteurs de recherche sont autorisés à indexer le site. Lorsqu'elle n'est pas définie, l'indexation n'est autorisée que pour les builds de production.

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

Ce modèle utilise Nuxt Content en mode document-driven (l'option `documentDriven` de `nuxt.config.ts`), qui récupère de lui-même l'article correspondant à l'URL actuelle. Ses champs peuvent ensuite être lus depuis `page`, renvoyé par le composable `useContent`, comme le fait `pages/[...slug].vue`.

```vue
<script setup lang="ts">
const { page } = useContent();
</script>

<template>
  <h1>{{ page?.title }}</h1>
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

Pour inclure également les sous-titres, ouvrez `components/TableOfContent.vue` et décommentez le bloc signalé par le commentaire "Uncomment the code below to render secondary title".

Le bas de la table des matières indique aussi la date de dernière mise à jour de l'article. Cette date provient du champ `updatedAt` du frontmatter et s'affiche dans la langue active, si bien que `2024-03-28T11:05:53.157Z` devient "March 28, 2024" en anglais et "28 mars 2024" en français. Retirez `updatedAt` pour la masquer.

```yaml
---
title: Commencer
updatedAt: 2024-03-28T11:05:53.157Z
---
```

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

### Tableau

Voici à quoi ressemble le tableau par défaut.

| Âge | Personne 1 | Personne 2 | Personne 3 | Moyenne |
| --- | ---------- | ---------- | ---------- | ------- |
| 8   | 6          | 7          | 5          | 6       |
| 10  | 6.5        | 7.5        | 8.5        | 7.5     |
| 12  | 8          | 9          | 10         | 9       |

### Clavier

Les touches du clavier peuvent être représentées par la balise HTML `<kbd>` telle que <kbd>Esc</kbd>, <kbd>Entrée</kbd> et <kbd>Ctrl</kbd>.

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

> https://tailwindcss.nuxt.dev/examples/content

## Internationalisation

L'internationalisation est déjà intégrée à ce modèle à l'aide de [Nuxt i18n](https://v8.i18n.nuxtjs.org/). Le composant de changement de langue est également fourni pour permettre une transition facile entre les langues disponibles (dans ce cas, l'anglais et le français) de manière transparente.

L'URL de la locale non par défaut sera préfixée avec son code alors que la locale par défaut ne nécessite pas de préfixe.

### Définition des mots

Les traductions sont stockées dans un fichier JSON propre à chaque langue, dans le dossier `locales`. Elles restent ainsi en dehors de `nuxt.config.ts` et faciles à maintenir à mesure que le **vocabulaire s'agrandit**. Chaque langue est déclarée dans `nuxt.config.ts` avec le fichier qui contient ses mots.

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

Le code ci-dessus indique à Nuxt de chercher les mots anglais dans `locales/en.json` et les mots français dans `locales/fr.json`. Avec l'option `lazy` activée, seul le fichier de la langue active est chargé.

Pour définir un mot, ajoutez la même clé dans chaque fichier de langue avec sa valeur traduite. Les clés peuvent être imbriquées pour regrouper les mots associés.

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

Le mot peut ensuite être utilisé n'importe où dans la balise `<template>` en passant sa clé à la fonction `$t`, avec des points pour accéder aux clés imbriquées.

```vue
<template>
  <h3>{{ $t("tableOfContent.title") }}</h3>
</template>
```

Avec cela en place, Nuxt affiche "In this article" ou "Dans cet article" selon la langue active.

### Messages en ligne

Pour quelques mots seulement, il est aussi possible de les définir directement dans `nuxt.config.ts` sous `vueI18n.messages`, sans créer de fichier de langue.

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

Ils s'utilisent de la même manière avec `$t("welcome")`, mais le fichier de configuration devient vite difficile à maintenir à mesure que le vocabulaire s'agrandit. C'est pourquoi ce modèle conserve tous les mots dans les fichiers de langue.

### Variables et texte enrichi

Toutes les traductions ne sont pas de simples chaînes. Certaines phrases contiennent une valeur connue uniquement à l'exécution, d'autres ont besoin de balises en plein milieu, et d'autres encore ne s'affichent jamais à l'écran. Cette section explique comment le modèle gère chacun de ces cas.

#### Variables nommées

Entourez un nom d'accolades pour laisser un emplacement vide dans le message, puis passez sa valeur en second argument de `$t`. La ligne de copyright du pied de page s'en sert pour afficher l'année en cours.

```json [locales/fr.json]
{
  "footer": {
    "copyright": "Templatr © {year} par Shaun. Tous droits non réservés."
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

Chaque langue peut placer `{year}` là où sa grammaire l'exige, sans avoir à découper la phrase en morceaux pour les recoller dans la balise `<template>`.

#### Balises au sein d'une phrase

Lorsqu'une partie de la phrase a besoin de son propre élément, comme le "Nuxt" en vert du titre principal, utilisez le composant `<i18n-t>` au lieu de `$t`. Chaque variable du message est remplie par le slot du même nom.

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

`keypath` est la clé du message, `scope="global"` la recherche dans les fichiers de langue et `tag` est l'élément qui enveloppe le résultat. Remarquez que "Nuxt" arrive en premier en anglais mais en second en français. Le slot suit la variable où qu'elle se trouve, si bien que chaque langue conserve l'ordre naturel de ses mots.

#### Attributs traduits

Le texte invisible sur la page, comme `aria-label` et `title`, est tout de même lu par les lecteurs d'écran et affiché dans les infobulles, il doit donc lui aussi être traduit. Préfixez l'attribut par `:` pour que sa valeur soit interprétée comme une expression, puis appelez `$t` à l'intérieur.

```vue [components/VHeader.vue]
<template>
  <nav :aria-label="$t('header.primary_navigation')">
    <!-- ... -->
  </nav>
</template>
```

Sans le `:`, l'attribut contiendrait littéralement le texte `$t('header.primary_navigation')`.

#### Messages liés

Lorsque deux clés doivent toujours dire la même chose, faites pointer l'une vers l'autre avec `@:` suivi de sa clé. Le plan du site du pied de page réutilise ainsi les libellés de navigation de l'en-tête, de sorte que renommer "Guide" dans l'en-tête le renomme aussi dans le pied de page.

```json [locales/fr.json]
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

`$t("footer.sitemap.guide")` renvoie alors "Guide". Le lien est résolu dans la langue active, il renvoie donc le mot anglais lorsque la page est en anglais.

#### Nom du site traduit

Le nom et la description du site, utilisés dans l'onglet du navigateur, les résultats de recherche et les aperçus de liens, sont traduits via le composant `<SeoKit>` dans `app.vue`. Le composable `useI18n` fournit `t`, qui fonctionne comme `$t` mais peut aussi être appelé dans `<script setup>`, ainsi que `locale`, le code de la langue active.

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

Transmettre `locale` à `language` garde l'attribut `lang` de la page synchronisé avec la langue active. Les pages sans `description` dans leur frontmatter se rabattent sur la description traduite du site, définie avec `useSeoMeta` dans `pages/[...slug].vue`.

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

## Références de style APA

De plus, ce modèle est également livré avec un simple composant de citation de style APA qui peut être utilisé dans le fichier Markdown à l'aide de la syntaxe MDC. Les exemples et les styles sont conçus sur la base de cet [article Scribbr](https://www.scribbr.com/apa-examples/website/).

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

### Exemples

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
