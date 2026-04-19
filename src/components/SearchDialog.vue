<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useData, useRouter } from 'vitepress/client'
import { useLocalSearch, type SearchResult } from '../composables/useLocalSearch'
import type { ThemeConfig } from '../types'

const emit = defineEmits<{ (e: 'close'): void }>()

const { theme } = useData<ThemeConfig>()
const router = useRouter()
const { ensureIndex, search } = useLocalSearch()

const q = ref('')
const results = ref<SearchResult[]>([])
const active = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  await ensureIndex()
  await nextTick()
  inputRef.value?.focus()
})

watch(q, (value) => {
  results.value = search(value, 20)
  active.value = 0
})

const translations = computed(() => (theme.value as any).search?.options?.translations?.modal ?? {})

const placeholder = computed(() => translations.value.displayDetails ?? 'Search docs')
const noResultsText = computed(() => translations.value.noResultsText ?? 'No results for')
const resetText = computed(() => translations.value.resetButtonTitle ?? 'Reset search')
const closeText = computed(() => translations.value.footer?.closeText ?? 'close')
const selectText = computed(() => translations.value.footer?.selectText ?? 'to select')
const navigateText = computed(() => translations.value.footer?.navigateText ?? 'to navigate')

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('close')
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (results.value.length) active.value = (active.value + 1) % results.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (results.value.length) active.value = (active.value - 1 + results.value.length) % results.value.length
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const hit = results.value[active.value]
    if (hit) go(hit.link)
  }
}

function go(link: string) {
  router.go(link)
  emit('close')
}

function breadcrumb(r: SearchResult): string {
  return r.titles.filter(Boolean).join(' › ')
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-12" @click.self="$emit('close')">
    <div class="absolute inset-0 bg-black/50" />
    <div class="relative w-full max-w-xl bg-base-100 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]" @keydown="onKey">
      <div class="flex items-center gap-2 px-4 py-3 border-b border-base-300">
        <svg class="w-5 h-5 text-base-content/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="7" />
          <path stroke-linecap="round" d="M21 21l-4.3-4.3" />
        </svg>
        <input
          ref="inputRef"
          v-model="q"
          type="search"
          :placeholder="placeholder"
          class="flex-1 bg-transparent outline-none text-base"
          @keydown="onKey"
        />
        <button
          v-if="q"
          class="btn btn-ghost btn-xs"
          :aria-label="resetText"
          @click="q = ''"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <kbd class="kbd kbd-xs hidden sm:inline-flex" @click="$emit('close')">Esc</kbd>
      </div>

      <div class="flex-1 overflow-y-auto">
        <ul v-if="results.length" class="p-2">
          <li
            v-for="(r, i) in results"
            :key="r.id"
            :class="['rounded-lg', i === active ? 'bg-base-200' : '']"
            @mouseenter="active = i"
          >
            <a
              :href="r.link"
              class="block px-3 py-2 no-underline"
              @click.prevent="go(r.link)"
            >
              <div class="text-sm font-medium text-base-content">{{ r.title }}</div>
              <div v-if="breadcrumb(r)" class="text-xs text-base-content/60 mt-0.5">{{ breadcrumb(r) }}</div>
            </a>
          </li>
        </ul>
        <div v-else-if="q" class="p-8 text-center text-base-content/60">
          {{ noResultsText }} <span class="font-medium">"{{ q }}"</span>
        </div>
        <div v-else class="p-8 text-center text-base-content/50 text-sm">
          Start typing to search
        </div>
      </div>

      <div class="hidden sm:flex items-center gap-4 px-4 py-2 border-t border-base-300 text-xs text-base-content/60">
        <span class="flex items-center gap-1"><kbd class="kbd kbd-xs">↵</kbd> {{ selectText }}</span>
        <span class="flex items-center gap-1"><kbd class="kbd kbd-xs">↑</kbd><kbd class="kbd kbd-xs">↓</kbd> {{ navigateText }}</span>
        <span class="flex items-center gap-1"><kbd class="kbd kbd-xs">Esc</kbd> {{ closeText }}</span>
      </div>
    </div>
  </div>
</template>
