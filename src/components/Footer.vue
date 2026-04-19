<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress/client'
import type { ThemeConfig } from '../types'

const { theme } = useData<ThemeConfig>()
const footer = computed(() => theme.value.footer)
</script>

<template>
  <footer
    v-if="footer"
    class="footer footer-center sm:footer-horizontal border-t border-base-300 bg-base-100 text-base-content/60 p-8 mt-12"
  >
    <aside class="max-w-[88rem] mx-auto w-full">
      <p v-if="footer.message">{{ footer.message }}</p>
      <p v-if="footer.copyright">{{ footer.copyright }}</p>
    </aside>
  </footer>
</template>
