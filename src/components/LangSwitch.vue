<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress/client'
import type { ThemeConfig } from '../types'

const { site, localeIndex, theme } = useData<ThemeConfig>()
const route = useRoute()

interface Entry {
  key: string
  label: string
  lang?: string
  link?: string
}

const locales = computed<Entry[]>(() => {
  const raw = site.value.locales as Record<string, any> | undefined
  if (!raw) return []
  return Object.entries(raw).map(([key, v]) => ({
    key,
    label: v.label ?? key,
    lang: v.lang,
    link: v.link
  }))
})

const visible = computed(() => locales.value.length > 1)

const current = computed(() => locales.value.find((l) => l.key === localeIndex.value))

const i18nRouting = computed(() => theme.value.i18nRouting !== false)
const menuLabel = computed(() => theme.value.langMenuLabel ?? 'Change language')

function localeBase(key: string): string {
  return key === 'root' ? '/' : `/${key}/`
}

function hrefFor(target: Entry): string {
  if (target.link) return target.link
  if (!i18nRouting.value) return localeBase(target.key)

  const currentBase = localeBase(localeIndex.value ?? 'root')
  const targetBase = localeBase(target.key)
  let path = route.path
  if (path.startsWith(currentBase)) {
    path = path.slice(currentBase.length - 1) // keep leading slash
  }
  if (path === '/' || path === '') return targetBase
  return (targetBase.replace(/\/$/, '') + path).replace(/\/+/g, '/')
}
</script>

<template>
  <details v-if="visible" class="dropdown dropdown-end">
    <summary class="btn btn-ghost btn-sm btn-square" :aria-label="menuLabel">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <path stroke-linecap="round" d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
      </svg>
    </summary>
    <ul class="menu dropdown-content bg-base-100 rounded-box shadow-lg border border-base-300 mt-1 z-40 min-w-40">
      <li v-for="l in locales" :key="l.key">
        <a :href="hrefFor(l)" :class="{ 'font-semibold text-primary': l.key === current?.key }" :hreflang="l.lang">
          {{ l.label }}
        </a>
      </li>
    </ul>
  </details>
</template>
