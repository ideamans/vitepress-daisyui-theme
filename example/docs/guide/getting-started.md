# Getting Started

Welcome to the **vitepress-daisyui-theme** preview. This page uses the default
`doc` layout — header, left sidebar, main content, right TOC, and prev/next links at the bottom.

## Install

```bash
pnpm add -D vitepress vitepress-daisyui-theme tailwindcss @tailwindcss/vite daisyui
```

## Wire up

Create `.vitepress/config.ts`:

```ts
import { withTheme } from 'vitepress-daisyui-theme/config'

export default withTheme({
  title: 'My Docs',
  themeConfig: {
    nav: [{ text: 'Guide', link: '/guide/getting-started' }],
    sidebar: {
      '/guide/': [
        { text: 'Start here', items: [{ text: 'Intro', link: '/guide/getting-started' }] }
      ]
    }
  }
})
```

Create `.vitepress/theme/index.ts`:

```ts
import Theme from 'vitepress-daisyui-theme'
export default Theme
```

That's all. `pnpm vitepress dev` boots it up.

## Layouts

Pick a layout per page via frontmatter:

| layout | Chrome | Purpose |
| --- | --- | --- |
| `doc` (default) | Header + sidebar + TOC + footer | Documentation |
| `page` | Header + footer only | LPs, marketing, legal |
| `home` | None | Full-bleed creative pages |

```md
---
layout: page
---
```

## Next steps

- Visit the [Markdown demo](./markdown-demo) to see all supported block types.
- Check the [About page](/about) for a `page` layout example.
- The [index page](/) uses the `home` layout.
