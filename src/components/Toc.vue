<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress/client'
import type { ThemeConfig } from '../types'

interface TocNode {
  level: number
  title: string
  link: string
  slug: string
  children?: TocNode[]
}

const { page, theme } = useData<ThemeConfig>()
const route = useRoute()

function resolveRange(): [number, number] {
  const cfg = theme.value.outline
  const raw = typeof cfg === 'object' && cfg && !Array.isArray(cfg) ? (cfg as any).level : cfg
  if (raw === 'deep') return [2, 6]
  if (typeof raw === 'number') return [raw, raw]
  if (Array.isArray(raw)) return [raw[0], raw[1]]
  return [2, 3]
}

function resolveLabel(): string {
  const cfg = theme.value.outline
  if (typeof cfg === 'object' && cfg && !Array.isArray(cfg) && 'label' in cfg) {
    return (cfg as any).label ?? 'On this page'
  }
  return 'On this page'
}

function flatten(nodes: TocNode[], min: number, max: number): TocNode[] {
  const out: TocNode[] = []
  const walk = (arr: TocNode[]) => {
    for (const n of arr) {
      if (n.level >= min && n.level <= max) out.push(n)
      if (n.children) walk(n.children)
    }
  }
  walk(nodes)
  return out
}

const headers = computed<TocNode[]>(() => {
  const [min, max] = resolveRange()
  return flatten((page.value.headers as TocNode[]) ?? [], min, max)
})

const active = ref<string>('')

let observer: IntersectionObserver | null = null

function setup() {
  if (observer) observer.disconnect()
  if (typeof IntersectionObserver === 'undefined') return
  const els = headers.value
    .map((h) => document.getElementById(h.slug))
    .filter((el): el is HTMLElement => !!el)
  if (!els.length) return
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top)
      if (visible[0]) active.value = (visible[0].target as HTMLElement).id
    },
    { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
  )
  els.forEach((el) => observer!.observe(el))
}

onMounted(() => setup())
onBeforeUnmount(() => observer?.disconnect())
watch(() => route.path, () => setTimeout(setup, 50))
</script>

<template>
  <div v-if="headers.length" class="text-sm">
    <div class="font-semibold text-base-content mb-3">{{ resolveLabel() }}</div>
    <ul class="space-y-1 border-l border-base-300">
      <li v-for="h in headers" :key="h.slug">
        <a
          :href="h.link"
          class="block py-1 -ml-px border-l transition-colors"
          :class="[
            active === h.slug
              ? 'border-primary text-primary'
              : 'border-transparent text-base-content/60 hover:text-base-content',
            h.level === 2 ? 'pl-3' : h.level === 3 ? 'pl-6' : h.level === 4 ? 'pl-9' : 'pl-12'
          ]"
        >
          {{ h.title }}
        </a>
      </li>
    </ul>
  </div>
</template>
