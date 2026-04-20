<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, onUpdated, ref, shallowRef } from 'vue'
import { onContentUpdated, useData } from 'vitepress/client'
import type { ThemeConfig } from '../types'

interface TocNode {
  level: number
  title: string
  link: string
  element: HTMLElement
  children?: TocNode[]
}

const { theme, frontmatter } = useData<ThemeConfig>()

const headers = shallowRef<TocNode[]>([])
const flat = shallowRef<TocNode[]>([])
const activeLink = ref<string>('')

const ignoreRE = /\b(?:header-anchor|footnote-ref|ignore-header)\b/

function resolveRange(): [number, number] {
  const cfg = (frontmatter.value.outline as ThemeConfig['outline']) ?? theme.value.outline
  const raw = typeof cfg === 'object' && cfg && !Array.isArray(cfg) ? (cfg as any).level : cfg
  if (raw === 'deep') return [2, 6]
  if (typeof raw === 'number') return [raw, raw]
  if (Array.isArray(raw)) return [raw[0], raw[1]]
  return [2, 2]
}

function resolveLabel(): string {
  const cfg = theme.value.outline
  if (typeof cfg === 'object' && cfg && !Array.isArray(cfg) && 'label' in cfg) {
    return (cfg as any).label ?? 'On this page'
  }
  return (theme.value as any).outlineTitle ?? 'On this page'
}

function serializeHeader(h: Element): string {
  let out = ''
  for (const node of h.childNodes) {
    if (node.nodeType === 1) {
      if (ignoreRE.test((node as Element).className)) continue
      out += node.textContent
    } else if (node.nodeType === 3) {
      out += node.textContent
    }
  }
  return out.trim()
}

function buildTree(items: TocNode[], min: number, max: number): { tree: TocNode[]; flat: TocNode[] } {
  const tree: TocNode[] = []
  const flat: TocNode[] = []
  const stack: (TocNode | { level: number; shouldIgnore: true })[] = []

  for (const raw of items) {
    const node: TocNode = { ...raw, children: [] }
    let parent = stack[stack.length - 1]
    while (parent && parent.level >= node.level) {
      stack.pop()
      parent = stack[stack.length - 1]
    }
    if (node.element.classList.contains('ignore-header') || (parent && 'shouldIgnore' in parent)) {
      stack.push({ level: node.level, shouldIgnore: true })
      continue
    }
    if (node.level > max || node.level < min) continue
    flat.push(node)
    if (parent && !('shouldIgnore' in parent)) (parent as TocNode).children!.push(node)
    else tree.push(node)
    stack.push(node)
  }
  return { tree, flat }
}

function collect() {
  const [min, max] = resolveRange()
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>(
      'article.prose h1, article.prose h2, article.prose h3, article.prose h4, article.prose h5, article.prose h6'
    )
  )
    .filter((el) => el.id && el.hasChildNodes())
    .map<TocNode>((el) => ({
      level: Number(el.tagName[1]),
      title: serializeHeader(el),
      link: '#' + el.id,
      element: el
    }))
  const { tree, flat: f } = buildTree(nodes, min, max)
  headers.value = tree
  flat.value = f
}

onContentUpdated(collect)
onMounted(() => {
  collect()
  window.addEventListener('scroll', onScroll, { passive: true })
  requestAnimationFrame(updateActive)
})
onUpdated(() => {
  if (location.hash) activeLink.value = decodeURIComponent(location.hash)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

let rafId = 0
function onScroll() {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = 0
    updateActive()
  })
}

function getAbsoluteTop(el: HTMLElement): number {
  let top = 0
  let cur: HTMLElement | null = el
  while (cur && cur !== document.body) {
    top += cur.offsetTop
    cur = cur.offsetParent as HTMLElement | null
    if (!cur) return NaN
  }
  return top
}

function updateActive() {
  const items = flat.value
  if (!items.length) {
    activeLink.value = ''
    return
  }
  const scrollY = window.scrollY
  const isBottom = Math.abs(scrollY + window.innerHeight - document.body.offsetHeight) < 1

  if (scrollY < 1) {
    activeLink.value = ''
    return
  }
  if (isBottom) {
    activeLink.value = items[items.length - 1].link
    return
  }

  let current = ''
  for (const h of items) {
    const top = getAbsoluteTop(h.element)
    if (Number.isNaN(top)) continue
    const margin = parseFloat(getComputedStyle(h.element).scrollMarginTop) || 0
    if (top > scrollY + margin + 4) break
    current = h.link
  }
  activeLink.value = current
}

const enabled = computed(() => {
  if (frontmatter.value.outline === false) return false
  if (theme.value.outline === false) return false
  return headers.value.length > 0
})

function indentClass(level: number) {
  return level === 2 ? 'pl-3' : level === 3 ? 'pl-6' : level === 4 ? 'pl-9' : level === 5 ? 'pl-12' : 'pl-[3.75rem]'
}

function renderList(nodes: TocNode[]): TocNode[] {
  const out: TocNode[] = []
  const walk = (arr: TocNode[]) => {
    for (const n of arr) {
      out.push(n)
      if (n.children?.length) walk(n.children)
    }
  }
  walk(nodes)
  return out
}
</script>

<template>
  <div v-if="enabled" class="text-sm">
    <div class="font-semibold text-base-content mb-3">{{ resolveLabel() }}</div>
    <ul class="space-y-1 border-l border-base-300">
      <li v-for="h in renderList(headers)" :key="h.link">
        <a
          :href="h.link"
          class="block py-1 -ml-px border-l transition-colors"
          :class="[
            activeLink === h.link
              ? 'border-primary text-primary'
              : 'border-transparent text-base-content/60 hover:text-base-content',
            indentClass(h.level)
          ]"
        >
          {{ h.title }}
        </a>
      </li>
    </ul>
  </div>
</template>
