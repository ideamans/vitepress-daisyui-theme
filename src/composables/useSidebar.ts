import { computed } from 'vue'
import { useData, useRoute } from 'vitepress/client'
import type { SidebarConfig, SidebarItem, SidebarMulti } from '../types'
import { stripBase } from './useLink'

function isMulti(cfg: SidebarConfig): cfg is SidebarMulti {
  return !Array.isArray(cfg)
}

function matchByPrefix(path: string, map: SidebarMulti, siteBase: string): { items: SidebarItem[]; base?: string } {
  const keys = Object.keys(map).sort((a, b) => b.length - a.length)
  for (const k of keys) {
    // keys are written without the site base (like the default theme); a key that includes it also matches
    if (path.startsWith(stripBase(k, siteBase))) {
      const v = map[k]
      if (Array.isArray(v)) return { items: v }
      return { items: v.items, base: v.base }
    }
  }
  return { items: [] }
}

function applyBase(items: SidebarItem[], base?: string): SidebarItem[] {
  if (!base) return items
  const join = (a: string, b: string) => (a.replace(/\/$/, '') + '/' + b.replace(/^\//, '')).replace(/\/+/g, '/')
  const walk = (arr: SidebarItem[]): SidebarItem[] =>
    arr.map((it) => ({
      ...it,
      link: it.link ? join(base, it.link) : it.link,
      items: it.items ? walk(it.items) : undefined
    }))
  return walk(items)
}

export function useSidebar() {
  const { theme, site } = useData()
  const route = useRoute()

  const items = computed<SidebarItem[]>(() => {
    const cfg = theme.value.sidebar as SidebarConfig | undefined
    if (!cfg) return []
    if (!isMulti(cfg)) return cfg
    const { items: matched, base } = matchByPrefix(stripBase(route.path, site.value.base), cfg, site.value.base)
    return applyBase(matched, base)
  })

  const flat = computed<SidebarItem[]>(() => {
    const out: SidebarItem[] = []
    const walk = (arr: SidebarItem[]) => {
      for (const it of arr) {
        if (it.link) out.push(it)
        if (it.items) walk(it.items)
      }
    }
    walk(items.value)
    return out
  })

  return { items, flat }
}

function normalize(p: string): string {
  return p.replace(/\.html$/, '').replace(/\/$/, '')
}

export function usePrevNext() {
  const { frontmatter, theme, page, site } = useData()
  const { flat } = useSidebar()

  return computed(() => {
    const df = theme.value.docFooter ?? {}
    const showPrev = df.prev !== false
    const showNext = df.next !== false
    // `guide/index.md` is the page at `/guide/`
    const current = normalize(page.value.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, ''))
    const linkPath = (it: SidebarItem) => normalize(stripBase(it.link || '', site.value.base))
    const idx = flat.value.findIndex((it) => linkPath(it).replace(/^\//, '') === current || linkPath(it) === '/' + current)
    const fmPrev = frontmatter.value.prev
    const fmNext = frontmatter.value.next
    const prevRaw = showPrev ? (idx > 0 ? flat.value[idx - 1] : undefined) : undefined
    const nextRaw = showNext ? (idx >= 0 && idx < flat.value.length - 1 ? flat.value[idx + 1] : undefined) : undefined
    const fromSidebar = (it?: SidebarItem) =>
      it ? { text: it.docFooterText ?? it.text ?? '', link: it.link ?? '' } : undefined
    const resolveFm = (fm: any, fallback?: { text: string; link: string }) => {
      if (fm === false) return undefined
      if (typeof fm === 'string') return fallback ? { ...fallback, text: fm } : undefined
      if (fm && typeof fm === 'object') return { text: fm.text ?? fallback?.text ?? '', link: fm.link ?? fallback?.link ?? '' }
      return fallback
    }
    const prevLabel = typeof df.prev === 'string' ? df.prev : undefined
    const nextLabel = typeof df.next === 'string' ? df.next : undefined
    return {
      prev: resolveFm(fmPrev, fromSidebar(prevRaw)),
      next: resolveFm(fmNext, fromSidebar(nextRaw)),
      prevLabel,
      nextLabel
    }
  })
}

export function useBreadcrumb() {
  const route = useRoute()
  const { site } = useData()
  const { items } = useSidebar()

  return computed(() => {
    const trail: { text: string; link?: string }[] = []
    const target = normalize(stripBase(route.path, site.value.base))

    function walk(arr: SidebarItem[], crumbs: { text: string; link?: string }[]): boolean {
      for (const it of arr) {
        const nextCrumbs = it.text ? [...crumbs, { text: it.text, link: it.link }] : crumbs
        if (it.link && normalize(stripBase(it.link, site.value.base)) === target) {
          trail.splice(0, trail.length, ...nextCrumbs)
          return true
        }
        if (it.items && walk(it.items, nextCrumbs)) return true
      }
      return false
    }

    walk(items.value, [])
    return trail
  })
}
