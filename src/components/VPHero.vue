<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress/client'

interface HeroAction {
  theme?: 'brand' | 'alt'
  text: string
  link: string
  target?: string
  rel?: string
}

interface HeroImage {
  src?: string
  alt?: string
  light?: string
  dark?: string
}

interface HeroData {
  name?: string
  text?: string
  tagline?: string
  image?: string | HeroImage
  actions?: HeroAction[]
}

const props = defineProps<{
  name?: string
  text?: string
  tagline?: string
  image?: string | HeroImage
  actions?: HeroAction[]
}>()

const { frontmatter, isDark } = useData()

const hero = computed<HeroData>(() => {
  if (props.name || props.text || props.tagline || props.image || props.actions) {
    return {
      name: props.name,
      text: props.text,
      tagline: props.tagline,
      image: props.image,
      actions: props.actions
    }
  }
  return (frontmatter.value.hero as HeroData) ?? {}
})

const imageSrc = computed(() => {
  const img = hero.value.image
  if (!img) return undefined
  if (typeof img === 'string') return { src: img, alt: '' }
  if (img.light && img.dark) return { src: isDark.value ? img.dark : img.light, alt: img.alt ?? '' }
  if (img.src) return { src: img.src, alt: img.alt ?? '' }
  return undefined
})
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-[1fr_auto] items-center">
      <div class="text-center md:text-left">
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-base-content">
          <span v-if="hero.name" class="block bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">{{ hero.name }}</span>
          <span v-if="hero.text" class="block mt-2">{{ hero.text }}</span>
        </h1>
        <p v-if="hero.tagline" class="mt-6 text-lg text-base-content/70 max-w-2xl mx-auto md:mx-0">
          {{ hero.tagline }}
        </p>
        <div v-if="hero.actions?.length" class="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
          <a
            v-for="(a, i) in hero.actions"
            :key="i"
            :href="a.link"
            :target="a.target"
            :rel="a.rel"
            class="btn"
            :class="a.theme === 'alt' ? 'btn-outline' : 'btn-primary'"
          >
            {{ a.text }}
          </a>
        </div>
      </div>
      <div v-if="imageSrc" class="flex justify-center md:justify-end">
        <img :src="imageSrc.src" :alt="imageSrc.alt" class="max-w-xs w-full h-auto" />
      </div>
    </div>
  </section>
</template>
