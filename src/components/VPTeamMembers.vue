<script setup lang="ts">
import { computed } from 'vue'
import type { DefaultTheme } from 'vitepress'
import VPTeamMembersItem from './VPTeamMembersItem.vue'

const props = withDefaults(
  defineProps<{
    size?: 'small' | 'medium'
    members: DefaultTheme.TeamMember[]
  }>(),
  { size: 'medium' }
)

const gridCols = computed(() =>
  props.size === 'small'
    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
)
</script>

<template>
  <div :class="['grid gap-4 my-6', gridCols]">
    <VPTeamMembersItem v-for="m in members" :key="m.name" :size="size" :member="m" />
  </div>
</template>
