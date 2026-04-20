<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress/client'
import type { SidebarItem } from '../types'

const props = defineProps<{ item: SidebarItem; depth?: number }>()
const route = useRoute()

const depth = computed(() => props.depth ?? 0)

function normalize(p: string): string {
  return p.replace(/\.html$/, '').replace(/\/$/, '')
}

const isActive = computed(() => {
  if (!props.item.link) return false
  return normalize(route.path) === normalize(props.item.link)
})

const containsActive = computed(() => {
  const walk = (arr?: SidebarItem[]): boolean => {
    if (!arr) return false
    for (const it of arr) {
      if (it.link && normalize(route.path) === normalize(it.link)) return true
      if (walk(it.items)) return true
    }
    return false
  }
  return walk(props.item.items)
})

const collapsible = computed(() => typeof props.item.collapsed === 'boolean' && !!props.item.items?.length)
const hasChildren = computed(() => !!props.item.items?.length)

const openInitially = computed(() => props.item.collapsed === false || containsActive.value)

const indentPx = computed(() => depth.value * 12)
</script>

<template>
  <li>
    <details
      v-if="collapsible"
      :open="openInitially"
      class="group"
    >
      <summary
        class="flex items-center justify-between cursor-pointer text-base-content mb-1 list-none [&::-webkit-details-marker]:hidden py-1"
        :class="depth === 0 ? 'font-semibold px-2' : 'px-3'"
        :style="{ paddingLeft: depth > 0 ? `${indentPx + 12}px` : undefined }"
      >
        <span v-if="item.link === undefined">{{ item.text }}</span>
        <a
          v-else
          :href="item.link"
          :target="item.target"
          :rel="item.rel"
          class="hover:text-primary"
          :class="isActive ? 'text-primary' : ''"
        >{{ item.text }}</a>
        <svg
          class="w-4 h-4 transition-transform group-open:rotate-90 text-base-content/50 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </summary>
      <ul class="space-y-0.5" :class="depth === 0 ? 'border-l border-base-300' : ''">
        <SidebarItem
          v-for="(child, i) in item.items"
          :key="i"
          :item="child"
          :depth="depth + 1"
        />
      </ul>
    </details>

    <template v-else-if="hasChildren">
      <div
        v-if="item.text && !item.link"
        class="text-base-content mb-1 py-1"
        :class="depth === 0 ? 'font-semibold px-2' : 'px-3'"
        :style="{ paddingLeft: depth > 0 ? `${indentPx + 12}px` : undefined }"
      >{{ item.text }}</div>
      <a
        v-else-if="item.link"
        :href="item.link"
        :target="item.target"
        :rel="item.rel"
        class="block py-1 transition-colors"
        :class="[
          depth === 0 ? 'font-semibold px-2' : '',
          isActive ? 'text-primary' : 'text-base-content hover:text-primary'
        ]"
        :style="{ paddingLeft: depth > 0 ? `${indentPx + 12}px` : undefined }"
      >{{ item.text }}</a>
      <ul class="space-y-0.5" :class="depth === 0 ? 'border-l border-base-300' : ''">
        <SidebarItem
          v-for="(child, i) in item.items"
          :key="i"
          :item="child"
          :depth="depth + 1"
        />
      </ul>
    </template>

    <a
      v-else-if="item.link"
      :href="item.link"
      :target="item.target"
      :rel="item.rel"
      class="block py-1.5 -ml-px border-l transition-colors"
      :class="
        isActive
          ? 'border-primary text-primary font-medium'
          : 'border-transparent text-base-content/70 hover:text-base-content hover:border-base-content/30'
      "
      :style="{ paddingLeft: `${indentPx + 12}px` }"
    >{{ item.text }}</a>
  </li>
</template>
