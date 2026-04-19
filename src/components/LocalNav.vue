<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress/client'
import type { ThemeConfig } from '../types'

defineEmits<{ (e: 'openSidebar'): void; (e: 'openToc'): void }>()

const { theme, page } = useData<ThemeConfig>()

const currentTitle = computed(() => {
  const h = page.value.headers?.[0]
  return h?.title ?? page.value.title ?? 'Menu'
})

const hasToc = computed(() => theme.value.outline !== false && (page.value.headers?.length ?? 0) > 0)
</script>

<template>
  <div class="lg:hidden sticky top-16 z-20 bg-base-100/90 backdrop-blur border-b border-base-300">
    <div class="max-w-[88rem] mx-auto px-4 md:px-6 h-12 flex items-center gap-2">
      <button
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
