<script setup lang="ts"></script>

<template>
  <section class="pt-8 border-t border-base-300 first:border-t-0 first:pt-0">
    <div v-if="$slots.title || $slots.lead" class="text-center mb-6">
      <h2 v-if="$slots.title" class="text-2xl md:text-3xl font-semibold text-base-content">
        <slot name="title" />
      </h2>
      <p v-if="$slots.lead" class="mt-2 text-base-content/70">
        <slot name="lead" />
      </p>
    </div>
    <slot name="members" />
  </section>
</template>
