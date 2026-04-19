<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    text?: string
    type?: 'info' | 'tip' | 'warning' | 'danger'
  }>(),
  { type: 'tip' }
)

const style = computed(() => {
  switch (props.type) {
    case 'info':
      return 'bg-info/15 text-info border-info/40'
    case 'warning':
      return 'bg-warning/15 text-warning border-warning/40'
    case 'danger':
      return 'bg-error/15 text-error border-error/40'
    case 'tip':
    default:
      return 'bg-success/15 text-success border-success/40'
  }
})
</script>

<template>
  <span
    class="inline-flex items-center align-middle px-1.5 py-0.5 mx-0.5 rounded border text-[0.72em] leading-tight font-semibold"
    :class="style"
  >
    <slot>{{ text }}</slot>
  </span>
</template>
