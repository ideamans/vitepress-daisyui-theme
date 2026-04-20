<script setup lang="ts">
import { computed } from 'vue'
import { Content, useData } from 'vitepress/client'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import VPHero from '../components/VPHero.vue'
import VPFeatures from '../components/VPFeatures.vue'
import BackToTop from '../components/BackToTop.vue'
import type { ThemeConfig } from '../types'

const { theme, frontmatter } = useData<ThemeConfig>()

const showNavbar = computed(() => frontmatter.value.navbar !== false)
const showFooter = computed(() => frontmatter.value.footer !== false)
const pageClass = computed(() => (frontmatter.value.pageClass as string | undefined) ?? '')
</script>

<template>
  <div class="min-h-screen flex flex-col bg-base-100 text-base-content" :class="pageClass">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 btn btn-primary btn-sm">
      {{ theme.skipToContentLabel ?? 'Skip to content' }}
    </a>
    <Header v-if="showNavbar" />
    <main id="main" class="flex-1">
      <VPHero v-if="frontmatter.hero" />
      <VPFeatures v-if="frontmatter.features" />
      <div class="max-w-6xl mx-auto px-6">
        <Content />
      </div>
    </main>
    <Footer v-if="showFooter" />
    <BackToTop />
  </div>
</template>
