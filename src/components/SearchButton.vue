<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useData } from 'vitepress/client'
import { defineAsyncComponent } from 'vue'
import type { ThemeConfig } from '../types'

const SearchDialog = defineAsyncComponent(() => import('./SearchDialog.vue'))

const { theme } = useData<ThemeConfig>()

const enabled = computed(() => (theme.value as any).search?.provider === 'local')
const open = ref(false)

const isMac = ref(false)
onMounted(() => {
  isMac.value = /Mac|iPhone|iPod|iPad/i.test(navigator.platform || navigator.userAgent)
})

function onKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    open.value = true
  }
  if (e.key === 'Escape') open.value = false
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

watch(open, (v) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = v ? 'hidden' : ''
})
</script>

<template>
  <template v-if="enabled">
    <button
      class="btn btn-ghost btn-sm gap-2 font-normal hidden sm:inline-flex text-base-content/60 hover:text-base-content"
      :aria-label="(theme as any).search?.options?.translations?.button?.buttonAriaLabel ?? 'Search'"
      @click="open = true"
    >
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="7" />
        <path stroke-linecap="round" d="M21 21l-4.3-4.3" />
      </svg>
      <span>{{ (theme as any).search?.options?.translations?.button?.buttonText ?? 'Search' }}</span>
      <kbd class="kbd kbd-xs">{{ isMac ? '⌘' : 'Ctrl' }}</kbd>
      <kbd class="kbd kbd-xs">K</kbd>
    </button>

    <button
      class="btn btn-ghost btn-sm btn-square sm:hidden"
      aria-label="Search"
      @click="open = true"
    >
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="7" />
        <path stroke-linecap="round" d="M21 21l-4.3-4.3" />
      </svg>
    </button>

    <SearchDialog v-if="open" @close="open = false" />
  </template>
</template>
