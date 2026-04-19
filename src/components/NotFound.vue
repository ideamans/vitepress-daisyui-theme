<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress/client'
import Header from './Header.vue'
import Footer from './Footer.vue'
import type { ThemeConfig } from '../types'

const { theme, site } = useData<ThemeConfig>()

const cfg = computed(() => theme.value.notFound ?? {})
const code = computed(() => cfg.value.code ?? '404')
const title = computed(() => cfg.value.title ?? 'PAGE NOT FOUND')
const quote = computed(
  () => cfg.value.quote ?? "But if you don't change your direction, and if you keep looking, you may end up where you are heading."
)
const linkLabel = computed(() => cfg.value.linkLabel ?? 'go to home')
const linkText = computed(() => cfg.value.linkText ?? 'Take me home')
const home = computed(() => withBase(site.value.base ?? '/'))
</script>

<template>
  <div class="min-h-screen flex flex-col bg-base-100 text-base-content">
    <Header />
    <main class="flex-1 flex items-center justify-center px-6 py-24">
      <div class="text-center max-w-md">
        <p class="text-sm tracking-widest uppercase text-base-content/50">{{ code }}</p>
        <h1 class="mt-4 text-4xl font-bold">{{ title }}</h1>
        <p class="mt-4 text-base-content/70">{{ quote }}</p>
        <a :href="home" :aria-label="linkLabel" class="btn btn-primary mt-8">{{ linkText }}</a>
      </div>
    </main>
    <Footer />
  </div>
</template>
