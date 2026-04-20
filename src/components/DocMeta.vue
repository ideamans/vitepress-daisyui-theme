<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress/client'
import type { ThemeConfig } from '../types'

const { theme, page, lang, frontmatter } = useData<ThemeConfig>()

const editUrl = computed(() => {
  if (frontmatter.value.editLink === false) return undefined
  const cfg = theme.value.editLink
  if (!cfg) return undefined
  const { filePath, relativePath } = page.value
  if (typeof cfg.pattern === 'function') return cfg.pattern({ filePath, relativePath })
  return cfg.pattern.replace(/:path/g, filePath || relativePath)
})

const editText = computed(() => theme.value.editLink?.text ?? 'Edit this page')

const lastUpdated = computed(() => {
  if (frontmatter.value.lastUpdated === false) return undefined
  const ts = page.value.lastUpdated
  if (!ts) return undefined
  const fmt = theme.value.lastUpdated?.formatOptions
  const forceLocale = fmt && (fmt as any).forceLocale
  const locale = forceLocale ? lang.value : undefined
  const opts: Intl.DateTimeFormatOptions = fmt
    ? { ...fmt }
    : { dateStyle: 'short', timeStyle: 'short' }
  try {
    return new Intl.DateTimeFormat(locale, opts).format(new Date(ts))
  } catch {
    return new Date(ts).toISOString()
  }
})

const lastUpdatedText = computed(
  () => theme.value.lastUpdated?.text ?? (theme.value as any).lastUpdatedText ?? 'Last updated'
)

const visible = computed(() => !!editUrl.value || !!lastUpdated.value)
</script>

<template>
  <div v-if="visible" class="flex flex-wrap items-center justify-between gap-3 text-sm mt-10 pt-6 border-t border-base-300 text-base-content/60">
    <a
      v-if="editUrl"
      :href="editUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-1.5 hover:text-primary"
    >
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
      {{ editText }}
    </a>
    <span v-else />
    <span v-if="lastUpdated">{{ lastUpdatedText }}: <time>{{ lastUpdated }}</time></span>
  </div>
</template>
