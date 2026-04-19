<script setup lang="ts">
import { computed } from 'vue'
import type { DefaultTheme } from 'vitepress'
import SocialLinks from './SocialLinks.vue'

const props = withDefaults(
  defineProps<{
    size?: 'small' | 'medium'
    member: DefaultTheme.TeamMember
  }>(),
  { size: 'medium' }
)

const avatarSize = computed(() => (props.size === 'small' ? 'w-16 h-16' : 'w-24 h-24'))
const nameSize = computed(() => (props.size === 'small' ? 'text-base' : 'text-lg'))

// SocialLinks reads from themeConfig.socialLinks, so we render links inline here instead.
const icons: Record<string, string> = (SocialLinks as any).icons ?? {}
</script>

<template>
  <article class="flex flex-col items-center text-center p-6 rounded-xl bg-base-100 border border-base-300">
    <img
      v-if="member.avatar"
      :src="member.avatar"
      :alt="member.name"
      :class="['rounded-full object-cover ring-2 ring-base-300', avatarSize]"
    />
    <h3 :class="['mt-4 font-semibold text-base-content', nameSize]">{{ member.name }}</h3>
    <p v-if="member.title" class="text-sm text-base-content/70 mt-1">{{ member.title }}</p>
    <p v-if="member.org" class="text-xs text-base-content/50 mt-0.5">
      <a
        v-if="member.orgLink"
        :href="member.orgLink"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-primary"
      >
        {{ member.org }}
      </a>
      <template v-else>{{ member.org }}</template>
    </p>
    <p v-if="member.desc" class="text-sm text-base-content/80 mt-3 leading-relaxed">{{ member.desc }}</p>

    <div v-if="member.links && member.links.length" class="mt-4 flex gap-1">
      <a
        v-for="(l, i) in member.links"
        :key="i"
        :href="l.link"
        :aria-label="l.ariaLabel ?? (typeof l.icon === 'string' ? l.icon : 'link')"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-ghost btn-xs btn-square"
      >
        <span v-if="typeof l.icon === 'object'" v-html="l.icon.svg" />
        <span v-else class="uppercase text-[0.6rem] tracking-wider">{{ String(l.icon).slice(0, 2) }}</span>
      </a>
    </div>

    <a
      v-if="member.sponsor"
      :href="member.sponsor"
      target="_blank"
      rel="noopener noreferrer"
      class="btn btn-outline btn-sm mt-4"
    >
      {{ member.actionText ?? 'Sponsor' }}
    </a>
  </article>
</template>
