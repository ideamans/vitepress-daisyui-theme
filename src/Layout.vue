<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useData } from 'vitepress/client'
import DocLayout from './layouts/DocLayout.vue'
import PageLayout from './layouts/PageLayout.vue'
import HomeLayout from './layouts/HomeLayout.vue'
import NotFound from './components/NotFound.vue'
import type { ThemeConfig } from './types'

const { frontmatter, isDark, theme, page } = useData<ThemeConfig>()

const layout = computed(() => (frontmatter.value.layout as string | undefined) ?? 'doc')
const isNotFound = computed(() => !!page.value.isNotFound)

watchEffect(() => {
  if (typeof document === 'undefined') return
  const light = theme.value.daisyui?.light ?? 'light'
  const dark = theme.value.daisyui?.dark ?? 'dark'
  document.documentElement.dataset.theme = isDark.value ? dark : light
})
</script>

<template>
  <NotFound v-if="isNotFound" />
  <HomeLayout v-else-if="layout === 'home'" />
  <PageLayout v-else-if="layout === 'page'" />
  <DocLayout v-else />
</template>
