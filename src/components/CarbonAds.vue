<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress/client'
import type { ThemeConfig } from '../types'

const { theme } = useData<ThemeConfig>()
const route = useRoute()

const ads = computed(() => theme.value.carbonAds)
const container = ref<HTMLDivElement | null>(null)

function load() {
  const el = container.value
  const cfg = ads.value
  if (!el || !cfg) return
  el.innerHTML = ''
  const s = document.createElement('script')
  s.id = '_carbonads_js'
  s.async = true
  s.src = `//cdn.carbonads.com/carbon.js?serve=${cfg.code}&placement=${cfg.placement}`
  el.appendChild(s)
}

onMounted(load)
onBeforeUnmount(() => {
  if (container.value) container.value.innerHTML = ''
})
watch(() => route.path, () => load())
</script>

<template>
  <div v-if="ads" ref="container" class="carbon-ads mt-8" />
</template>
