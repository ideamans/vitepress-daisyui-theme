<script setup lang="ts">
import { useSidebar } from '../composables/useSidebar'
import SidebarItem from './SidebarItem.vue'

const { items } = useSidebar()
</script>

<template>
  <nav class="text-sm">
    <ul class="space-y-6">
      <SidebarItem v-for="(section, i) in items" :key="i" :item="section" :depth="0" />
    </ul>
  </nav>
</template>
