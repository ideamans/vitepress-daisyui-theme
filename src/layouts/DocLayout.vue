<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import { Content, useData, useRoute } from 'vitepress/client'
import Header from '../components/Header.vue'
import LocalNav from '../components/LocalNav.vue'
import Sidebar from '../components/Sidebar.vue'
import Toc from '../components/Toc.vue'
import PrevNext from '../components/PrevNext.vue'
import DocMeta from '../components/DocMeta.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import Footer from '../components/Footer.vue'
import type { ThemeConfig } from '../types'

const { theme, frontmatter } = useData<ThemeConfig>()
const route = useRoute()

const sidebarOpen = ref(false)
const tocOpen = ref(false)
const drawerOpen = computed(() => sidebarOpen.value || tocOpen.value)

watch(() => route.path, () => {
  sidebarOpen.value = false
  tocOpen.value = false
})

watchEffect(() => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = drawerOpen.value ? 'hidden' : ''
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-base-100 text-base-content">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 btn btn-primary btn-sm">
      {{ theme.skipToContentLabel ?? 'Skip to content' }}
    </a>
    <Header />
    <LocalNav @openSidebar="sidebarOpen = true" @openToc="tocOpen = true" />

    <div class="flex-1 w-full max-w-[88rem] mx-auto px-4 md:px-6 lg:px-8">
      <div class="flex gap-8">
        <aside class="hidden lg:block w-64 shrink-0 py-8 sticky top-16 self-start max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Sidebar />
        </aside>

        <main id="main" class="flex-1 min-w-0 py-8">
          <Breadcrumb />
          <article class="prose max-w-none" :class="{ 'external-link-icon': theme.externalLinkIcon }">
            <Content />
          </article>
          <DocMeta />
          <PrevNext v-if="frontmatter.prev !== false || frontmatter.next !== false" class="mt-8" />
        </main>

        <aside
          v-if="theme.outline !== false && theme.aside !== false"
          class="hidden xl:block w-56 shrink-0 py-8 sticky top-16 self-start max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <Toc />
        </aside>
      </div>
    </div>

    <Footer />

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div v-if="sidebarOpen" class="lg:hidden fixed inset-0 z-40" @click.self="sidebarOpen = false">
        <div class="absolute inset-0 bg-black/40" />
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="-translate-x-full"
          leave-active-class="transition duration-200 ease-in"
          leave-to-class="-translate-x-full"
          appear
        >
          <aside class="absolute left-0 top-0 h-full w-72 bg-base-100 overflow-y-auto shadow-xl">
            <div class="flex items-center justify-between h-16 px-4 border-b border-base-300">
              <span class="font-semibold">Menu</span>
              <button class="btn btn-ghost btn-sm btn-square" aria-label="Close" @click="sidebarOpen = false">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div class="p-4"><Sidebar /></div>
          </aside>
        </Transition>
      </div>
    </Transition>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div v-if="tocOpen" class="xl:hidden fixed inset-0 z-40" @click.self="tocOpen = false">
        <div class="absolute inset-0 bg-black/40" />
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-x-full"
          leave-active-class="transition duration-200 ease-in"
          leave-to-class="translate-x-full"
          appear
        >
          <aside class="absolute right-0 top-0 h-full w-72 bg-base-100 overflow-y-auto shadow-xl">
            <div class="flex items-center justify-between h-16 px-4 border-b border-base-300">
              <span class="font-semibold">On this page</span>
              <button class="btn btn-ghost btn-sm btn-square" aria-label="Close" @click="tocOpen = false">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div class="p-4" @click="tocOpen = false"><Toc /></div>
          </aside>
        </Transition>
      </div>
    </Transition>
  </div>
</template>
