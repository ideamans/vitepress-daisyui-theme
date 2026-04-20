<script setup lang="ts">
import { computed, ref } from 'vue'
import { onContentUpdated, useData } from 'vitepress/client'
import type { ThemeConfig } from '../types'

defineEmits<{ (e: 'openSidebar'): void; (e: 'openToc'): void }>()

const { theme, page, frontmatter } = useData<ThemeConfig>()

const hasSidebar = computed(() => frontmatter.value.sidebar !== false && !!theme.value.sidebar)

const headerCount = ref(0)
const firstTitle = ref('')

onContentUpdated(() => {
  if (typeof document === 'undefined') return
  const els = document.querySelectorAll<HTMLElement>(
    'article.prose h2, article.prose h3, article.prose h4, article.prose h5, article.prose h6'
  )
  headerCount.value = els.length
  const h1 = document.querySelector<HTMLElement>('article.prose h1')
  firstTitle.value = h1?.textContent?.trim() ?? ''
})

const currentTitle = computed(() => firstTitle.value || page.value.title || 'Menu')

const hasToc = computed(() => {
  if (frontmatter.value.outline === false) return false
  if (theme.value.outline === false) return false
  return headerCount.value > 0
})
</script>

<template>
  <div class="lg:hidden sticky top-16 z-20 bg-base-100/90 backdrop-blur border-b border-base-300">
    <div class="max-w-[88rem] mx-auto px-4 md:px-6 h-12 flex items-center gap-2">
      <button
        v-if="hasSidebar"
        class="btn btn-ghost btn-sm gap-1.5 font-normal"
        aria-label="Open sidebar"
        @click="$emit('openSidebar')"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h10M4 18h16" />
        </svg>
        <span class="truncate max-w-[50vw]">{{ currentTitle }}</span>
      </button>
      <div class="flex-1" />
      <button
        v-if="hasToc"
        class="btn btn-ghost btn-sm gap-1.5 font-normal xl:hidden"
        aria-label="Open table of contents"
        @click="$emit('openToc')"
      >
        On this page
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  </div>
</template>
