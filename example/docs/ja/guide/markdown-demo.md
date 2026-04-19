# Markdown Demo <Badge type="tip">NEW</Badge>

Everything VitePress already renders, styled for Tailwind + DaisyUI.

## Paragraphs and inline

Lorem **ipsum dolor** sit _amet_, consectetur adipiscing elit. Use `inline code` for symbols,
and [links](https://vitepress.dev) for external references. Combine **_bold italic_** as needed.

## Lists

- Unordered item one
- Unordered item two
  - Nested
  - Deeper
- Unordered item three

1. First
2. Second
3. Third

## Blockquote

> "Readable documentation is a feature, not a nice-to-have."
> — some person, probably

## Table

| Layout | Header | Sidebar | TOC  |
| ------ | :----: | :-----: | :--: |
| doc    |   yes  |   yes   | yes  |
| page   |   yes  |    no   |  no  |
| home   |   no   |    no   |  no  |

## Code

```ts
import { withTheme } from 'vitepress-daisyui-theme/config'

export default withTheme({
  title: 'My Docs',
  themeConfig: { nav: [{ text: 'Guide', link: '/guide/getting-started' }] }
})
```

```vue
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button class="btn btn-primary" @click="count++">Clicked {{ count }}</button>
</template>
```

## Custom containers

::: tip
This is a tip block — handy for recommendations.
:::

::: info
Plain informational note.
:::

::: warning
Use with care. This calls a destructive operation.
:::

::: danger
Data loss possible. Read carefully before running.
:::

## Callout component

Globally registered, use inside Markdown:

<Callout type="tip" title="Pro tip">
Custom Vue components work anywhere in your docs. This one accepts <code>type</code> and <code>title</code>.
</Callout>

<Callout type="warning">
Heads up — the API below is experimental.
</Callout>

## Badges <Badge type="info">inline</Badge>

Use `<Badge type="tip|info|warning|danger">label</Badge>` next to headings or inline. <Badge type="warning">experimental</Badge> <Badge type="danger">deprecated</Badge>

## Headings

### Level three

Some copy under a level-three heading.

#### Level four

Deeper nesting still renders cleanly.

## Image

Markdown images get rounded corners and fluid sizing automatically.

---

End of demo.
