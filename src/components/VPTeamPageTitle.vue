<script setup lang="ts"></script>

<template>
  <header class="text-center">
    <h1 v-if="$slots.title" class="text-3xl md:text-5xl font-bold tracking-tight text-base-content">
      <slot name="title" />
    </h1>
    <p v-if="$slots.lead" class="mt-4 text-base md:text-lg text-base-content/70 max-w-2xl mx-auto">
      <slot name="lead" />
    </p>
  </header>
</template>
