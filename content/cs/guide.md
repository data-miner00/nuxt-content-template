---
title: Začínáme
description: Vše, co potřebujete vědět, abyste mohli začít s touto skvělou šablonou
topic: Průvodce
category: Průvodce
authors:
  - name: Shaun
    avatar: shaun.png
tags:
  - návod
  - průvodce
updatedAt: 2026-10-27T13:25:15.205Z
createdAt: 2023-11-18T11:37:49.432Z
---

> Poznámka: Tato stránka byla přeložena pomocí umělé inteligence.

## Přehled

Tato šablona se nejlépe hodí pro statické weby, jako jsou **dokumentace** a **prezentace portfolia**, kterým prospívá psaní v Markdownu.

Základem šablony jsou Vue.js a Nuxt.js, o správu obsahu se stará Nuxt Content a jako knihovna stylů ji doplňuje Tailwind CSS.

## Instalace

Nejprve si naklonujte šablonu projektu z GitHubu.

```
git clone https://github.com/data-miner00/nuxt-content-template.git
```

Soubor `pnpm-lock.yaml` byl vygenerován s [Node.js](https://nodejs.org) 20.9.0, proto se doporučuje použít stejnou verzi.

Pokud používáte [Nix](https://nixos.org/download.html), spusťte místo toho shell Nixu. Soubor `shell.nix` v kořenovém adresáři projektu poskytuje Node.js 20.9.0 a pnpm 10, takže ani jedno z nich není nutné instalovat zvlášť.

```
nix-shell
```

Poté nainstalujte závislosti pomocí [Pnpm](https://pnpm.io).

```
pnpm i --frozen-lockfile
```

Přepínač `--frozen-lockfile` nainstaluje přesně ty verze, které jsou uzamčené v `pnpm-lock.yaml`, a místo aktualizace lockfilu skončí chybou.

Držte se Pnpm a nepoužívejte [Npm](https://npmjs.com/) ani [Yarn](https://yarnpkg.com/). Ty soubor `pnpm-lock.yaml` ignorují a rozsahy verzí v `package.json` si vyhodnotí po svém, čímž stáhnou novější vydání Nuxtu a Nuxt Content, na která tato šablona zatím nebyla upravena.

Dále zkopírujte vzorový soubor s proměnnými prostředí a nahraďte jeho hodnoty vlastními.

```
cp .env.example .env
```

`NUXT_PUBLIC_SITE_URL` je adresa, na které bude web nasazen. Používá se pro kanonické odkazy, náhledy na sociálních sítích a mapu webu. Pokud není nastavena, použije se `https://example.com`. `NUXT_INDEXABLE` určuje, zda smí vyhledávače web indexovat. Pokud není nastavena, indexování je povoleno jen u produkčních sestavení.

Po dokončení instalace spusťte vývojový server příkazem `dev`.

```
pnpm dev
```

## Před psaním

Než začnete psát články do souborů `.md`, doporučujeme přidat frontmatter, který článek popisuje, aby jej bylo možné využít při sestavování rozvržení jednotlivých stránek. Ukázku frontmatteru najdete v souboru `/templates/frontmatter.yml`. Jde v podstatě o sadu vlastních vlastností, které se k článku vztahují.

```yaml
title: Název článku
description: Podnadpis, který název popisuje podrobněji a měl by začínat velkým písmenem jako běžná věta
topic: Téma
category: Kategorie
authors:
  - name: Contributor 1
    avatar: contrib_1.png
  - name: Contributor 2
    avatar: contrib_2.png
tags:
  - návod
  - průvodce
  - tahák
updatedAt: 2022-11-18T11:37:49.432Z
createdAt: 2022-11-18T11:37:49.432Z
```

Doporučené vlastnosti jsou následující:

- `title`: Název (h1) článku či tématu.
- `description`: Delší popis, který vysvětluje záměr a cíl článku.
- `category`: Hlavní téma článku.
- `tags`: Seznam štítků souvisejících s článkem.
- `createdAt`: Časové razítko vytvoření článku.
- `updatedAt`: Časové razítko úpravy článku.

Klidně si ale přidejte další vlastní pole, která vám dávají smysl.

Tato šablona spouští Nuxt Content v režimu řízeném dokumenty (volba `documentDriven` v `nuxt.config.ts`), který sám načte článek odpovídající aktuální URL. Jeho pole pak lze číst z `page`, kterou vrací composable `useContent`, stejně jako to dělá `pages/[...slug].vue`.

```vue
<script setup lang="ts">
const { page } = useContent();
</script>

<template>
  <h1>{{ page?.title }}</h1>
</template>
```

Výše uvedený příklad ukazuje přístup k vlastnímu atributu `title` z frontmatteru článku. Ostatní definované hodnoty lze získat obdobně.

## Psaní obsahu

V Nuxtu se každý soubor `.vue` ve složce `/pages` mapuje přímo na cestu odpovídající názvu souboru od kořene. Například `pages/home.vue` se v aplikaci mapuje na `/home`.

S Nuxt Content lze stejně tak mapovat soubory `.md` ze složky `/content` přímo od kořene. Aby to fungovalo, musí být ve složce `/pages` umístěn soubor `[...slug].vue`.

Pokud se názvy souboru `.md` ve složce `/content` a souboru `.vue` ve složce `/pages` shodují, přednost dostane soubor `.vue` ve složce `/pages` a deklarace souboru `.md` se neuplatní.

Pro pořádek: i tato stránka (`/guide`) je napsána jako `.md` ve složce `/content` a poté vykreslena s předdefinovanými styly a rozvržením.

### Obsah článku

Ve výchozím nastavení Nuxt Content zobrazuje v obsahu jen `<h2>` a `<h3>` a vynechá jakýkoli `<h1>` v Markdownu, protože `<h1>` je chápán jako hlavní nadpis článku nebo stránky. Všechny další nadpisy v článku tak musí sémanticky začínat od `<h2>`. Při psaní se proto doporučuje používat nadpisy `<h2>` a nižší úrovně.

Tato šablona zobrazuje v obsahu pouze značky `<h2>`. Pro názornost si představte následující strukturu nadpisů v článku.

```
├─ Nadpis 1
│  ├─ Podnadpis A
│  ├─ Podnadpis B
│  └─ Podnadpis C
├─ Nadpis 2
│  ├─ Podnadpis A
│  ├─ Podnadpis B
│  └─ Podnadpis C
├─ Nadpis 3
└─ Nadpis 4
```

V obsahu se vygeneruje následující.

```
├─ Nadpis 1
├─ Nadpis 2
├─ Nadpis 3
└─ Nadpis 4
```

Chcete-li zobrazit i podnadpisy, otevřete `components/TableOfContent.vue` a odkomentujte blok označený komentářem „Uncomment the code below to render secondary title“.

Ve spodní části obsahu je také uvedeno, kdy byl článek naposledy aktualizován. Datum pochází z pole `updatedAt` ve frontmatteru a formátuje se podle aktivního jazyka, takže `2026-10-27T13:25:15.205Z` se zobrazí jako „October 27, 2026“ v angličtině, „27 octobre 2026“ ve francouzštině a „27. října 2026“ v češtině. Pokud `updatedAt` vynecháte, datum se nezobrazí.

```yaml
---
title: Začínáme
updatedAt: 2026-10-27T13:25:15.205Z
---
```

### Řazení obsahu

Ve výchozím nastavení se obsah řadí abecedně. Chcete-li pořadí upravit, přidejte před název souboru číslo, za kterým bezprostředně následuje `.`, například `1.Introduction.md`, a u dalších souborů číslo zvyšujte.

```[Struktura adresářů] {1}
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

### Obrázky

![můj super obrázek](/images/demo.png)

Takto vypadá obrázek na výšku v textu článku. Je zarovnaný doleva a roztáhne se na maximální šířku, kterou text článku nabízí. Obrázky, které se mají servírovat spolu s aplikací, lze umístit do adresáře `public`. Například obrázky ve složce `/public/images` jsou přímo dostupné přes cestu `/images/img.jpg`.

```md
![můj super obrázek](/images/demo.png)
```

Obrázek na šířku nejspíš zabere celou šířku kontejneru, pokud má dostatečně široké rozlišení.

![můj super obrázek na šířku](/images/demo_landscape.png)

Obrázky umístěné ve složce `/assets/images` musí nejprve zpracovat nástroje pro sestavení. Odkažte na ně ve zdrojovém kódu pomocí `require` nebo jiné formy importu, jinak se do výsledného sestavení nedostanou.

```vue
<template>
  <img :src="require('~/assets/images/img.jpg')" />
</template>
```

### Tabulky

Takto vypadá výchozí tabulka.

| Věk | Osoba 1 | Osoba 2 | Osoba 3 | Průměr |
| --- | ------- | ------- | ------- | ------ |
| 8   | 6       | 7       | 5       | 6      |
| 10  | 6.5     | 7.5     | 8.5     | 7.5    |
| 12  | 8       | 9       | 10      | 9      |

### Klávesnice

Klávesy lze znázornit pomocí HTML značky `<kbd>`, například <kbd>Esc</kbd>, <kbd>Enter</kbd> a <kbd>Ctrl</kbd>.

### Podpora LaTeXu

Tato šablona také podporuje $\LaTeX$. Pište krásné rovnice přímo v Markdownu snadno a rychle!

```latex [Schrödingerova rovnice]
\begin{equation}
  i \hbar \frac{\partial}{\partial t} \Psi \big(\textbf{r}, t) = \left[- \frac{\hbar^2}{2m}\nabla^2 + V(\textbf{r})\right]\Psi(\textbf{r}, t)
\end{equation}
```

Uvedený kód $\LaTeX$u pro Schrödingerovu rovnici se vykreslí do bohatého výstupu, jak je vidět níže.

$$
\begin{equation}
  i \hbar \frac{\partial}{\partial t} \Psi \big(\textbf{r}, t) = \left[- \frac{\hbar^2}{2m}\nabla^2 + V(\textbf{r})\right]\Psi(\textbf{r}, t)
\end{equation}
$$

Zde je další příklad matice vykreslené pomocí $\LaTeX$u.

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

## Stylování

Tato šablona otevírá spoustu prostoru pro přizpůsobení nad rámec toho, co už nabízí Nuxt, Nuxt Content, TailwindCSS a pár mých vylepšení, díky kterým je skvělá.

### Obsah

Obsah článku je nastylován pomocí pluginu Typography od Tailwindu (`@tailwindcss/typography`), který nabízí sadu předdefinovaných stylů. Ty bohatě stačí na to, aby byl článek elegantní a příjemně se četl. Styl lze upravit na značce `<article>` v `/pages/[...slug].vue` pomocí klíčového slova `prose`.

Chcete-li nastylovat `<h2>` uvnitř článku, přidejte stylu předponu `prose-h2:` v bloku článku, kde je ve třídě definováno `prose`.

```html
<article class="prose prose-stone prose-h2:text-blue-400" />
```

Chcete-li navíc změnit, jak se Markdown převádí na komponenty Vue pro vykreslení, vytvořte konkrétní prvky Prose ve složce `/components/content`. Nuxt pak k vykreslení obsahu Markdownu automaticky použije právě tyto prvky. Mezi dostupné náhrady patří `ProseCode`, `ProseH1`, `ProseA` atd. Úplný seznam najdete v oficiálním [repozitáři na GitHubu](https://github.com/nuxt/content/tree/main/src/runtime/components/Prose).

Pro inspiraci: v této šabloně jsou přepsané prvky Prose `ProseCode`, `ProseH2` a `ProseH3`, které najdete ve složce `/components/content`.

### Vlastní komponenty

Nuxt Content umožňuje vytvářet vlastní komponenty, které lze vložit do Markdownu a vykreslit je spolu s ním jako HTML. Komponenty lze v Markdownu použít několika způsoby. Prvním z nich je syntaxe MDC.

**Řádkové komponenty** se používají tak, že před název komponenty přidáte dvojtečku. Tím se na stránce vykreslí komponenta, která nepřijímá žádné vlastnosti ani potomky.

```
:my-component
```

**Blokové komponenty** se používají tak, že před název komponenty přidáte dvojitou dvojtečku a konec komponenty označíte další dvojitou dvojtečkou. Bloková komponenta je komponenta, která jako obsah svého slotu přijímá obsah v Markdownu nebo jinou komponentu.

```
::card
Ahoj světe
::
```

Blokové komponenty podporují také **vnořování**.

```
::hero
  :::card
    Vnořená karta
    ::card
      Hluboce vnořená karta
    ::
  :::
::
```

Chcete-li vykreslit obsah do vlastního **pojmenovaného slotu** v komponentě, použijte vzor `#slot-name`, kterým určíte, jaký obsah se má vykreslit v kterém slotu.

```
::card
Výchozí text slotu

#description
Toto se vykreslí ve slotu `description` v komponentě.
::
```

U vlastní komponenty, která přijímá **vlastnosti** (props), stačí uzavřít požadované dvojice klíč–hodnota do složených závorek hned za názvem komponenty.

```
::alert{type="warning" color="default"}
Komponenta **alert**
::
```

Další způsob, jak předat vlastnosti vlastní komponentě, je **metoda YAML**, kterou ukazuje následující příklad.

```
::alert
---
type: warning
color: default
---
Komponenta **alert**
::
```

Zde je malý příklad použití vlastní komponenty se syntaxí MDC. Pro následující ukázku se používá vlastní komponenta s názvem `Card.vue`.

```
::card{title="Úžasný nadpis!" footer="Toto je nenápadná patička"}
Toto je ukázkový odstavec, který se **předává** do **výchozího slotu** vlastní karty k vykreslení.
::
```

Výše uvedený úryvek kódu vykreslí svůj obsah takto.

::card{title="Úžasný nadpis!" footer="Toto je nenápadná patička"}
Toto je ukázkový odstavec, který se **předává** do **výchozího slotu** vlastní karty k vykreslení.
::

### Tmavý motiv

Tato šablona používá pro motivy tmavý režim Tailwindu založený na třídách. Součástí je i hotová komponenta pro přepínání motivu. Využívá composable [useColorMode](https://color-mode.nuxtjs.org/) z Nuxt Color Mode, který se stará o přepínání motivu a ukládání preferovaného motivu přes rozhraní Local Storage prohlížeče. Je to neuvěřitelně pohodlné.

```ts
const colorMode = useColorMode();

colorMode.preference = "dark";
colorMode.preference = "light";
colorMode.preference = "system";
```

### Bloky kódu

Vzhled bloků kódu si můžete upravit podle svého v sekci `content` konfiguračního souboru `nuxt.config.ts`.

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

V sekci `highlight` můžete zvolit motiv, kterým se budou bloky kódu vykreslovat ve světlém i tmavém režimu. Nuxt Content používá jako zvýrazňovač kódu [Shiki](https://github.com/shikijs/shiki), který nabízí širokou škálu [oblíbených motivů](https://github.com/shikijs/shiki/blob/main/docs/themes.md) připravených k použití.

Zvýrazňování syntaxe je ve výchozím nastavení dostupné jen pro omezenou sadu jazyků, jako jsou HTML, JavaScript, TypeScript a Vue. Chcete-li zapnout zvýrazňování pro jiný jazyk, stačí přidat jeho [identifikátor jazyka](https://github.com/shikijs/shiki/blob/main/docs/languages.md) do pole `preload`.

### Tailwind v Markdownu

Protože je Tailwind v `tailwind.config.js` nastaven tak, aby sledoval styly v souborech `.md`, lze jej v souboru volně používat kdekoli. Pokud například chcete nastylovat konkrétní slovo třídou Tailwindu `text-pink-400`, stačí ho obalit HTML značkou span a přiřadit jí název třídy.

```md
## Můj zbytečný nadpis

Lorem <span class="text-pink-400">ipsum</span> dolor sit amet, adispicing elit.
```

Další způsob, jak nastylovat text v řádku, je syntaxe uvedená níže. Je jednodušší a úhlednější než předchozí příklad.

```md
Lorem [ipsum]{.text-pink-400} dolor sit amet, adispicing elit.
```

> https://tailwindcss.nuxt.dev/examples/content

## Internacionalizace

Internacionalizace je do této šablony zabudována díky [Nuxt i18n](https://v8.i18n.nuxtjs.org/). Součástí je i komponenta pro přepínání jazyků, která umožňuje snadno a plynule přecházet mezi dostupnými jazyky (v tomto případě angličtinou, francouzštinou a češtinou).

URL nevýchozího jazyka bude mít předponu s jeho kódem, kdežto výchozí jazyk žádnou předponu nepotřebuje.

### Definování slov

Překlady jsou uloženy v samostatném souboru JSON pro každý jazyk ve složce `locales`. Díky tomu nezatěžují `nuxt.config.ts` a dobře se udržují, i když **slovník roste**. Každý jazyk je zaregistrován v `nuxt.config.ts` spolu se souborem, který obsahuje jeho slova.

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

Výše uvedený kód říká Nuxtu, aby anglická slova hledal v `locales/en.json` a francouzská slova v `locales/fr.json`. Se zapnutou volbou `lazy` se načte pouze soubor aktivního jazyka.

Chcete-li definovat slovo, přidejte stejný klíč do každého jazykového souboru s jeho přeloženou hodnotou. Klíče lze vnořovat a seskupovat tak související slova.

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

Slovo pak lze použít kdekoli uvnitř `<template>` tak, že jeho klíč předáte funkci `$t`. K vnořeným klíčům se dostanete pomocí teček.

```vue
<template>
  <h3>{{ $t("tableOfContent.title") }}</h3>
</template>
```

Nuxt pak podle aktivního jazyka vykreslí „In this article“ nebo „Dans cet article“.

### Zprávy přímo v konfiguraci

Pár slov lze definovat také přímo v `nuxt.config.ts` pod `vueI18n.messages`, aniž byste vytvářeli jazykové soubory.

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

Používají se stejně pomocí `$t("welcome")`, ale s rostoucím slovníkem se konfigurační soubor rychle stává těžkopádným na údržbu. Proto tato šablona drží všechna slova v jazykových souborech.

### Zástupné symboly a formátovaný text

Ne každý překlad je obyčejný řetězec. Některé věty obsahují hodnotu, která je známá až za běhu, některé potřebují uprostřed značky a některé se na obrazovce vůbec nezobrazí. Tato sekce popisuje, jak si šablona poradí s každým z těchto případů.

#### Pojmenované zástupné symboly

Obalte název do složených závorek, čímž ve zprávě vytvoříte mezeru, a jeho hodnotu pak předejte jako druhý argument `$t`. Řádek s copyrightem v patičce takto vypisuje aktuální rok.

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

Každý jazyk může umístit `{year}` tam, kde to jeho gramatika vyžaduje, takže není potřeba dělit větu na kousky a v šabloně je zase slepovat dohromady.

#### Značky uvnitř věty

Když část věty potřebuje vlastní prvek, jako například zelené „Nuxt“ v hlavním nadpisu, použijte místo `$t` komponentu `<i18n-t>`. Každý zástupný symbol ve zprávě vyplní slot se stejným názvem.

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

`keypath` je klíč zprávy, `scope="global"` ji vyhledá v jazykových souborech a `tag` je prvek, který výsledek obalí. Všimněte si, že „Nuxt“ je v angličtině na prvním místě, ale ve francouzštině na druhém. Slot následuje zástupný symbol, ať je kdekoli, takže si každý jazyk zachová přirozený slovosled.

#### Přeložené atributy

Text, který na stránce není vidět, jako například `aria-label` a `title`, čtou čtečky obrazovky a zobrazuje se v popiscích, proto by měl být přeložen také. Atribut navažte s dvojtečkou, aby se jeho hodnota brala jako výraz, a uvnitř zavolejte `$t`.

```vue [components/VHeader.vue]
<template>
  <nav :aria-label="$t('header.primary_navigation')">
    <!-- ... -->
  </nav>
</template>
```

Bez dvojtečky by atribut obsahoval doslovný text `$t('header.primary_navigation')`.

#### Propojené zprávy

Když mají dva klíče vždy říkat totéž, nasměrujte jeden na druhý pomocí `@:` následovaného jeho klíčem. Mapa webu v patičce takto znovu používá navigační popisky ze záhlaví, takže když v záhlaví přejmenujete „Guide“, přejmenuje se i v patičce.

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

`$t("footer.sitemap.guide")` nyní vrací „Guide“. Odkaz se vyhodnocuje v rámci aktivního jazyka, takže když je stránka ve francouzštině, vrátí francouzské slovo.

#### Přeložený název webu

Název a popis webu, které se zobrazují na kartě prohlížeče, ve výsledcích vyhledávání a v náhledech odkazů, se překládají prostřednictvím komponenty `<SeoKit>` v `app.vue`. Composable `useI18n` poskytuje `t`, které funguje jako `$t`, ale lze ho volat i uvnitř `<script setup>`, a `locale`, tedy kód aktivního jazyka.

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

Předání `locale` do `language` udržuje atribut `lang` stránky v souladu s aktivním jazykem. Stránky, které ve frontmatteru nemají `description`, použijí přeložený popis webu, který se nastavuje pomocí `useSeoMeta` v `pages/[...slug].vue`.

### I18n v Nuxt Content

Chcete-li podporovat internacionalizaci obsahu v Markdownu z Nuxt Content, vytvořte ve složce `content` odpovídající složku s kódem nevýchozího jazyka a napodobte v ní strukturu základní složky.

Mám-li například následující strukturu souborů s anglickým obsahem, francouzský obsah lze umístit následujícím způsobem.

Z:

```[Struktura adresářů]
├─ content
│  ├─ blogs
│  │  ├─ blog1.md
│  │  └─ blog2.md
│  ├─ demo.md
│  └─ guide.md
```

Na:

```[Struktura adresářů]
├─ content
│  ├─ blogs
│  │  ├─ blog1.md (anglicky)
│  │  └─ blog2.md (anglicky)
│  ├─ fr
│  │  ├─ blogs
│  │  │  ├─ blog1.md (francouzsky)
│  │  │  └─ blog2.md (francouzsky)
│  │  ├─ demo.md (francouzsky)
│  │  └─ guide.md (francouzsky)
│  ├─ demo.md (anglicky)
│  └─ guide.md (anglicky)
```

Tím využíváme chování URL s předponou pro nevýchozí jazyk a funguje to. Není to nejelegantnější řešení, ale prozatím funguje.

### Internacionalizované odkazy

Aby každý odkaz na webu vedl na svůj protějšek v daném jazyce, musíme odkazy předem zpracovat pomocí composable `useLocalePath`. V kódu to vypadá takto.

```vue
<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <NuxtLink to="/careers">Před i18n</NuxtLink>
  <!-- změněno na -->
  <NuxtLink :to="localePath('/careers')">Po i18n</NuxtLink>
</template>
```

Díky tomu vás odkaz v anglickém kontextu přesměruje na běžnou stránku `/careers`, kdežto ve francouzském kontextu bude směřovat na `/fr/careers`, tedy na její francouzskou verzi.

## Citace ve stylu APA

Tato šablona navíc obsahuje jednoduchou komponentu pro citace ve stylu APA, kterou lze v souboru Markdown použít pomocí syntaxe MDC. Příklady a styly vycházejí z tohoto [článku na Scribbru](https://www.scribbr.com/apa-examples/website/).

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

### Příklady

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
