<script setup lang="ts">
import { computed } from 'vue'

type Type = 'note' | 'tip' | 'info' | 'warning' | 'danger' | 'success'

const props = withDefaults(defineProps<{ type?: Type; title?: string }>(), { type: 'info' })

const accent = computed(() => {
  switch (props.type) {
    case 'tip':
    case 'success':
      return 'border-success bg-success/10 text-success-content'
    case 'warning':
      return 'border-warning bg-warning/10 text-warning-content'
    case 'danger':
      return 'border-error bg-error/10 text-error-content'
    case 'note':
      return 'border-base-300 bg-base-200 text-base-content'
    case 'info':
    default:
      return 'border-info bg-info/10 text-info-content'
  }
})
</script>

<template>
  <div class="my-4 border-l-4 rounded-r px-4 py-3" :class="accent">
    <p v-if="title" class="font-semibold mb-1">{{ title }}</p>
    <div class="callout-body">
      <slot />
    </div>
  </div>
</template>
