<script setup lang="ts">
import { useRoute } from 'vitepress/client'
import { useSidebar } from '../composables/useSidebar'
import type { SidebarItem } from '../types'

const { items } = useSidebar()
const route = useRoute()

function isActive(item: SidebarItem): boolean {
  if (!item.link) return false
  const a = route.path.replace(/\.html$/, '').replace(/\/$/, '')
  const b = item.link.replace(/\.html$/, '').replace(/\/$/, '')
  return a === b
}

function isCollapsible(section: SidebarItem): boolean {
  return typeof section.collapsed === 'boolean' && !!section.items?.length
}

function containsActive(section: SidebarItem): boolean {
  return !!section.items?.some((child) => isActive(child))
}
</script>

<template>
  <nav class="text-sm">
    <ul class="space-y-6">
      <li v-for="(section, i) in items" :key="i">
        <details
          v-if="isCollapsible(section)"
          :open="containsActive(section) || section.collapsed === false"
          class="group"
        >
          <summary class="flex items-center justify-between cursor-pointer font-semibold text-base-content mb-2 px-2 list-none [&::-webkit-details-marker]:hidden">
            <span>{{ section.text }}</span>
            <svg
              class="w-4 h-4 transition-transform group-open:rotate-90 text-base-content/50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </summary>
          <ul class="space-y-0.5 border-l border-base-300">
            <li v-for="(item, j) in section.items" :key="j">
              <a
                :href="item.link"
                class="block px-3 py-1.5 -ml-px border-l transition-colors"
                :class="
                  isActive(item)
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent text-base-content/70 hover:text-base-content hover:border-base-content/30'
                "
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
        </details>

        <template v-else>
          <div v-if="section.text" class="font-semibold text-base-content mb-2 px-2">
            {{ section.text }}
          </div>
          <ul v-if="section.items" class="space-y-0.5 border-l border-base-300">
            <li v-for="(item, j) in section.items" :key="j">
              <a
                :href="item.link"
                class="block px-3 py-1.5 -ml-px border-l transition-colors"
                :class="
                  isActive(item)
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent text-base-content/70 hover:text-base-content hover:border-base-content/30'
                "
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
          <a
            v-else-if="section.link"
            :href="section.link"
            class="block px-2 py-1.5"
            :class="isActive(section) ? 'text-primary font-medium' : 'text-base-content/70 hover:text-base-content'"
          >
            {{ section.text }}
          </a>
        </template>
      </li>
    </ul>
  </nav>
</template>
