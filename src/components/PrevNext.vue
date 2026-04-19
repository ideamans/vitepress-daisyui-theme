<script setup lang="ts">
import { usePrevNext } from '../composables/useSidebar'

const pair = usePrevNext()
</script>

<template>
  <nav class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-base-300 pt-6">
    <a
      v-if="pair.prev"
      :href="pair.prev.link"
      class="group flex flex-col items-start p-4 rounded-lg border border-base-300 hover:border-primary transition-colors"
    >
      <span class="text-xs text-base-content/60">Previous</span>
      <span class="text-base-content group-hover:text-primary">{{ pair.prev.text }}</span>
    </a>
    <div v-else />
    <a
      v-if="pair.next"
      :href="pair.next.link"
      class="group flex flex-col items-end p-4 rounded-lg border border-base-300 hover:border-primary transition-colors sm:col-start-2"
    >
      <span class="text-xs text-base-content/60">Next</span>
      <span class="text-base-content group-hover:text-primary">{{ pair.next.text }}</span>
    </a>
  </nav>
</template>
