# Markdown Demo <Badge type="tip">NEW</Badge>

Showcase of every markdown feature VitePress ships with, styled for Tailwind + DaisyUI.

[[toc]]

## Paragraphs and inline

Lorem **ipsum dolor** sit _amet_, consectetur adipiscing elit. Use `inline code` for symbols,
and [internal links](./getting-started) or [external links](https://vitepress.dev) for references.
Combine **_bold italic_** as needed. Autolink: <https://vitepress.dev>.

Emoji shortcodes work too: :tada: :rocket: :sparkles:

## Lists

- Unordered item one
- Unordered item two
  - Nested
  - Deeper
- Task list
  - [x] Install theme
  - [ ] Customize colors
  - [ ] Ship docs

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

## Code blocks

### Basic fence + language label + copy button

```ts
import { withTheme } from 'vitepress-daisyui-theme/config'

export default withTheme({
  title: 'My Docs',
  themeConfig: { nav: [{ text: 'Guide', link: '/guide/getting-started' }] }
})
```

### Line highlighting `{2,4-6}`

```ts{2,4-6}
function hello() {
  const greeting = 'hello'
  return greeting
  const other = 'world'
  return other
  // final return
}
```

### Line numbers with `:line-numbers`

```ts:line-numbers
function add(a: number, b: number) {
  return a + b
}
console.log(add(1, 2))
```

### Focus `// [!code focus]`

```js
function greet(name) {
  const upper = name.toUpperCase()
  return `Hello, ${upper}!` // [!code focus]
}
```

### Diff `// [!code ++]` / `// [!code --]`

```ts
const config = {
  title: 'Old title', // [!code --]
  title: 'New title', // [!code ++]
  description: 'Shared across locales'
}
```

### Error & warning notations

```js
const x = 1
const y = 2 // [!code warning]
const z = x + undefined // [!code error]
```

### Highlight words `// [!code highlight]`

```js
function sum(a, b) {
  return a + b // [!code highlight]
}
```

### Code groups

::: code-group

```ts [config.ts]
import { withTheme } from 'vitepress-daisyui-theme/config'
export default withTheme({ title: 'TS' })
```

```js [config.js]
import { withTheme } from 'vitepress-daisyui-theme/config'
export default withTheme({ title: 'JS' })
```

```json [package.json]
{
  "scripts": {
    "dev": "vitepress dev docs"
  }
}
```

:::

## Custom containers

::: tip
Use tip for recommendations.
:::

::: info
Neutral informational note.
:::

::: warning
Use with care. This calls a destructive operation.
:::

::: danger
Data loss possible. Read carefully before running.
:::

::: details Click me to expand
Hidden content goes here. Perfect for FAQ answers or verbose examples.

```ts
console.log('Secret snippet inside a details container')
```

:::

## GitHub-flavored alerts

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

## Inline Vue component (Badge)

Heading level two with badge <Badge type="tip">NEW</Badge>

`<Badge>` accepts `type="tip|info|warning|danger"`. Use inline: `Experimental` <Badge type="warning">experimental</Badge> `Deprecated` <Badge type="danger">deprecated</Badge>.

## Callout component

<Callout type="tip" title="Pro tip">
Custom Vue components work anywhere in your docs. This one accepts <code>type</code> and <code>title</code>.
</Callout>

## Headings

### Level three

Some copy under a level-three heading.

#### Level four

Deeper nesting still renders cleanly.

##### Level five

###### Level six

## Image

![VitePress logo](https://vitepress.dev/vitepress-logo-mini.svg)

---

End of demo.
