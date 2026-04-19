<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress/client'
import ThemeSwitch from './ThemeSwitch.vue'
import SocialLinks from './SocialLinks.vue'
import LangSwitch from './LangSwitch.vue'
import SearchButton from './SearchButton.vue'
import type { NavItem, ThemeConfig } from '../types'

const { site, theme, isDark } = useData<ThemeConfig>()

const siteTitle = computed(() => {
  const t = theme.value.siteTitle
  return t === false ? '' : t ?? site.value.title
})

const nav = computed<NavItem[]>(() => theme.value.nav ?? [])

const logo = computed(() => {
  const l = theme.value.logo
  if (!l) return undefined
  if (typeof l === 'string') return { src: l, alt: '' }
  if ('light' in l && 'dark' in l) return { src: isDark.value ? l.dark : l.light, alt: l.alt ?? '' }
  if ('src' in l) return { src: l.src, alt: l.alt ?? '' }
  return undefined
})

function hasChildren(item: NavItem): item is Extract<NavItem, { items: any }> {
  return 'items' in item && Array.isArray((item as any).items)
}

function linkOf(item: NavItem): string | undefined {
  if ('link' in item && typeof (item as any).link === 'string') return (item as any).link
  return undefined
}

function textOf(item: NavItem): string {
  return 'text' in item && item.text ? item.text : ''
}

const mobileOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-30 bg-base-100/80 backdrop-blur border-b border-base-300">
    <div class="navbar max-w-[88rem] mx-auto px-4 md:px-6 lg:px-8 min-h-16">
      <div class="navbar-start gap-2">
        <button
          class="btn btn-ghost btn-sm btn-square md:hidden"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <a href="/" class="flex items-center gap-2 font-semibold text-base-content hover:opacity-80">
          <img v-if="logo" :src="logo.src" :alt="logo.alt" class="h-7 w-auto" />
          <span v-if="siteTitle">{{ siteTitle }}</span>
        </a>
        <nav class="hidden md:flex items-center gap-1 ml-4">
          <template v-for="(item, i) in nav" :key="i">
            <details v-if="hasChildren(item)" class="dropdown">
              <summary class="btn btn-ghost btn-sm font-normal">{{ textOf(item) }}</summary>
              <ul class="menu dropdown-content bg-base-100 rounded-box shadow-lg border border-base-300 mt-1 z-40 min-w-44">
                <li v-for="(sub, j) in (item as any).items" :key="j">
                  <a :href="(sub as any).link" :target="(sub as any).target" :rel="(sub as any).rel">
                    {{ (sub as any).text }}
                  </a>
                </li>
              </ul>
            </details>
            <a
              v-else-if="linkOf(item)"
              :href="linkOf(item)"
              :target="(item as any).target"
              :rel="(item as any).rel"
              class="btn btn-ghost btn-sm font-normal"
            >
              {{ textOf(item) }}
            </a>
          </template>
        </nav>
      </div>

      <div class="navbar-end gap-1">
        <SearchButton />
        <LangSwitch />
        <SocialLinks />
        <ThemeSwitch />
      </div>
    </div>

    <div v-if="mobileOpen" class="md:hidden border-t border-base-300 bg-base-100">
      <ul class="menu p-2">
        <template v-for="(item, i) in nav" :key="i">
          <li v-if="hasChildren(item)">
            <details>
              <summary>{{ textOf(item) }}</summary>
              <ul>
                <li v-for="(sub, j) in (item as any).items" :key="j">
                  <a :href="(sub as any).link" :target="(sub as any).target">{{ (sub as any).text }}</a>
                </li>
              </ul>
            </details>
          </li>
          <li v-else-if="linkOf(item)">
            <a :href="linkOf(item)" :target="(item as any).target">{{ textOf(item) }}</a>
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>
