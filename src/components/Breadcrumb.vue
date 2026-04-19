<script setup lang="ts">
import { useBreadcrumb } from '../composables/useSidebar'

const trail = useBreadcrumb()
</script>

<template>
  <nav v-if="trail.length > 1" aria-label="Breadcrumb" class="text-sm text-base-content/60 mb-4 flex flex-wrap items-center gap-1">
    <template v-for="(crumb, i) in trail" :key="i">
      <a
        v-if="crumb.link && i < trail.length - 1"
        :href="crumb.link"
        class="hover:text-base-content"
      >
        {{ crumb.text }}
      </a>
      <span v-else :class="i === trail.length - 1 ? 'text-base-content' : ''">
        {{ crumb.text }}
      </span>
      <svg
        v-if="i < trail.length - 1"
        class="w-3 h-3 opacity-60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6" />
      </svg>
    </template>
  </nav>
</template>
