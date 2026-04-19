# vitepress-daisyui-theme

A VitePress theme skinned with [DaisyUI 5](https://daisyui.com) on top of [Tailwind CSS 4](https://tailwindcss.com). Built from scratch — the default VitePress theme is not loaded, so there are no CSS collisions to fight.

It implements VitePress's `DefaultTheme.Config` surface so existing VitePress docs can migrate with near-zero config changes.

## Features

- **DaisyUI-native styling.** Uses DaisyUI's semantic tokens (`base-*`, `primary`, `info`, `success`, `warning`, `error`) and components (`navbar`, `footer`, `btn`, `dropdown`, `menu`, `kbd`). Swap theme names via `themeConfig.daisyui`.
- **Two layouts, frontmatter-driven.**
  - `doc` (default) — header + collapsible sidebar + content + outline + prev/next
  - `page` — header + free-form content + footer (LPs, marketing, legal)
- **DefaultTheme.Config compatible.** `nav`, `sidebar` (including `SidebarMulti` with `base`), `search`, `locales`, `editLink`, `lastUpdated`, `outline`, `docFooter`, `socialLinks`, `footer`, `externalLinkIcon`, `aside`, `notFound`, `i18nRouting`, label strings — all honored.
- **Full markdown parity with VitePress.**
  - Header anchors (`#` on hover)
  - Fenced code blocks with Shiki dual-theme, copy button, language label
  - Line highlighting `{1,3-5}`, line numbers (`:line-numbers`), and notation transformers: `// [!code focus]`, `// [!code ++/--]`, `// [!code highlight]`, `// [!code error/warning]`
  - Custom containers (`::: tip / info / warning / danger / details / code-group`)
  - GitHub-flavored alerts (`> [!NOTE]`, `TIP`, `IMPORTANT`, `WARNING`, `CAUTION`)
  - Inline TOC (`[[toc]]`)
  - Math via `markdown-it-mathjax3` (opt-in)
- **Built-in local search.** Set `themeConfig.search.provider = 'local'` and VitePress core generates the MiniSearch index; the theme ships the Tailwind-styled dialog with `⌘K` / `Ctrl+K` shortcut, arrow-key navigation, and per-locale indexing.
- **i18n.** Standard VitePress `locales` map; theme adds a language switcher in the header, respects `i18nRouting`.
- **Breadcrumb.** Derived automatically from the sidebar tree.
- **Inline components registered globally.** `<Badge>`, `<Callout>`, `<VPTeamPage>`, `<VPTeamPageTitle>`, `<VPTeamPageSection>`, `<VPTeamMembers>`, `<VPTeamMembersItem>` — the team components accept the same `DefaultTheme.TeamMember[]` shape as VitePress.
- **Dark mode without FOUC.** An inline head script sets DaisyUI's `data-theme` attribute before first paint, synchronized with VitePress's `isDark` reactively.
- **Accessibility.** Skip-to-content link, focus-visible styling, body scroll lock while drawers are open, `aria-label` via `langMenuLabel` / `skipToContentLabel` / etc.

## Install

```bash
pnpm add vitepress-daisyui-theme
pnpm add -D vitepress tailwindcss @tailwindcss/vite daisyui
```

## Wire up

`.vitepress/config.ts`:

```ts
import { withTheme } from 'vitepress-daisyui-theme/config'

export default withTheme({
  title: 'My Docs',
  themeConfig: {
    nav: [{ text: 'Guide', link: '/guide/getting-started' }],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [{ text: 'Intro', link: '/guide/getting-started' }]
        }
      ]
    },
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/owner/repo' }],
    editLink: { pattern: 'https://github.com/owner/repo/edit/main/docs/:path' }
  }
})
```

`.vitepress/theme/index.ts`:

```ts
import Theme from 'vitepress-daisyui-theme'
export default Theme
```

That's the full setup. `withTheme` installs `@tailwindcss/vite`, injects the FOUC-prevention head script, and returns VitePress's standard `UserConfig`, so you can layer any additional VitePress option on top.

## Layouts

Pick a layout per page via frontmatter. Omit it and you get `doc`:

```md
---
layout: page
---
```

| layout | Header / Footer | Sidebar | Outline | Use case |
| --- | :---: | :---: | :---: | --- |
| `doc` (default) | yes | yes | yes | Documentation pages |
| `page` | yes | no | no | LPs, marketing pages, team, `/about`, legal |

## DaisyUI theme switching

`themeConfig.daisyui` chooses the DaisyUI theme names applied to the `<html data-theme>` attribute:

```ts
withTheme({
  themeConfig: {
    daisyui: { light: 'corporate', dark: 'night' }
  }
})
```

Any DaisyUI theme shipped with DaisyUI 5 or registered via `@plugin 'daisyui'` in your own CSS works. The theme re-reads the preference on every page render and updates the attribute — no separate toggle state to wire up.

To extend DaisyUI's theme catalog, create a CSS entry and import it from your `.vitepress/theme/index.ts`:

```css
/* .vitepress/theme/custom.css */
@plugin 'daisyui/theme' {
  name: 'brand';
  color-scheme: 'light';
  --color-primary: oklch(0.65 0.2 250);
  /* ... */
}
```

```ts
import Theme from 'vitepress-daisyui-theme'
import './custom.css'
export default Theme
```

## Search

`themeConfig.search = { provider: 'local' }` activates VitePress's built-in MiniSearch indexing (per-locale). The theme supplies:

- Header search button with `⌘K` / `Ctrl+K` shortcut
- Full-screen dialog with incremental results grouped by heading
- Arrow-key navigation (`↑` `↓` `Enter` `Esc`)

`themeConfig.search.options.translations.modal.*` labels are respected. Algolia provider is typed but not rendered by this theme yet — PRs welcome.

## i18n

Standard VitePress locale config works unchanged:

```ts
withTheme({
  locales: {
    root: { label: 'English', lang: 'en-US' },
    ja: {
      label: '日本語',
      lang: 'ja',
      themeConfig: {
        nav: [{ text: 'ガイド', link: '/ja/guide/' }],
        outline: { label: 'このページの内容' },
        docFooter: { prev: '前のページ', next: '次のページ' }
      }
    }
  }
})
```

The theme adds a `LangSwitch` dropdown in the header; it preserves the current path and swaps the locale prefix. Honors `themeConfig.i18nRouting`.

## Team page

```md
---
layout: page
---

<script setup>
const core = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [{ icon: 'github', link: 'https://github.com/yyx990803' }]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Meet the Team</template>
    <template #lead>Some helpful intro text.</template>
  </VPTeamPageTitle>

  <VPTeamPageSection>
    <template #title>Core members</template>
    <template #members>
      <VPTeamMembers size="medium" :members="core" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
```

`DefaultTheme.TeamMember` shape — `avatar`, `name`, `title`, `org`, `orgLink`, `desc`, `links`, `sponsor`, `actionText`.

## Math

```ts
// .vitepress/config.ts
withTheme({
  markdown: { math: true }
})
```

```bash
pnpm add -D markdown-it-mathjax3
```

Use `$inline$` and `$$block$$` in markdown. MathJax renders its own SVG — the theme does not interfere.

## Badges

```md
# Heading <Badge type="tip">NEW</Badge>

Experimental feature <Badge type="warning">experimental</Badge>
```

`type` accepts `tip | info | warning | danger`, same API as VitePress's default badge.

## Config helper

`withTheme(config)` returns VitePress's `UserConfig`. It:

1. Installs `@tailwindcss/vite` as a Vite plugin
2. Injects an inline head `<script>` that reads the appearance preference from `localStorage` and sets `data-theme` before first paint
3. Silences Rollup's cosmetic `CYCLIC_CROSS_CHUNK_REEXPORT` warning for VitePress's `Content` re-export

If you prefer to wire Vite yourself, import `Theme` and `./styles` directly and skip the helper.

## Compatibility

| | |
| --- | --- |
| VitePress | `>= 1.0` |
| Node | `>= 18` |
| Tailwind CSS | `^4.0` |
| DaisyUI | `^5.0` |
| Vue | `^3.3` |

## License

MIT © miyanaga
