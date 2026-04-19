<script setup lang="ts">
import { Content, useData } from 'vitepress/client'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import type { ThemeConfig } from '../types'

const { theme } = useData<ThemeConfig>()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-base-100 text-base-content">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 btn btn-primary btn-sm">
      {{ theme.skipToContentLabel ?? 'Skip to content' }}
    </a>
    <Header />
    <main id="main" class="flex-1">
      <Content />
    </main>
    <Footer />
  </div>
</template>
