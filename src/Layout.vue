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

const layoutComponent = computed(() => {
  if (layout.value === 'home') return HomeLayout
  if (layout.value === 'page') return PageLayout
  return DocLayout
})

watchEffect(() => {
  if (typeof document === 'undefined') return
  const light = theme.value.daisyui?.light ?? 'light'
  const dark = theme.value.daisyui?.dark ?? 'dark'
  document.documentElement.dataset.theme = isDark.value ? dark : light
})
</script>

<template>
  <NotFound v-if="isNotFound" />
  <component :is="layoutComponent" v-else>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </component>
</template>
