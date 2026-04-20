<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress/client'

interface FeatureIcon {
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
  light?: string
  dark?: string
  wrap?: boolean
}

interface Feature {
  icon?: string | FeatureIcon
  title?: string
  details?: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
}

const props = defineProps<{ features?: Feature[] }>()
const { frontmatter, isDark } = useData()

const features = computed<Feature[]>(() => props.features ?? (frontmatter.value.features as Feature[]) ?? [])

function iconKind(icon: Feature['icon']) {
  if (!icon) return 'none' as const
  if (typeof icon === 'string') {
    if (icon.startsWith('/') || /^https?:/.test(icon)) return 'image' as const
    return 'emoji' as const
  }
  return 'object' as const
}

function resolveObjectIcon(icon: FeatureIcon) {
  const src = icon.light && icon.dark ? (isDark.value ? icon.dark : icon.light) : icon.src
  return {
    src,
    alt: icon.alt ?? '',
    width: icon.width ? String(icon.width) : undefined,
    height: icon.height ? String(icon.height) : undefined
  }
}
</script>

<template>
  <section v-if="features.length" class="pb-20">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <component
          :is="f.link ? 'a' : 'div'"
          v-for="(f, i) in features"
          :key="i"
          :href="f.link"
          :target="f.target"
          :rel="f.rel"
          class="card bg-base-100 border border-base-300 transition-colors"
          :class="f.link ? 'hover:border-primary' : ''"
        >
          <div class="card-body">
            <div v-if="f.icon" class="mb-3 text-3xl">
              <span v-if="iconKind(f.icon) === 'emoji'">{{ f.icon }}</span>
              <img
                v-else-if="iconKind(f.icon) === 'image'"
                :src="(f.icon as string)"
                alt=""
                class="h-10 w-auto"
              />
              <img
                v-else-if="iconKind(f.icon) === 'object'"
                :src="resolveObjectIcon(f.icon as FeatureIcon).src"
                :alt="resolveObjectIcon(f.icon as FeatureIcon).alt"
                :width="resolveObjectIcon(f.icon as FeatureIcon).width"
                :height="resolveObjectIcon(f.icon as FeatureIcon).height"
              />
            </div>
            <h3 class="card-title text-lg">{{ f.title }}</h3>
            <p v-if="f.details" class="text-base-content/70">{{ f.details }}</p>
            <div v-if="f.link && f.linkText" class="mt-2 text-primary text-sm">{{ f.linkText }} →</div>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>
