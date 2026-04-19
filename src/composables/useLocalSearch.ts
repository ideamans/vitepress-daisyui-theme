import { computed, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress/client'
import MiniSearch, { type Options as MiniSearchOptions } from 'minisearch'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- virtual module supplied by VitePress when search.provider === 'local'
import localSearchIndex from '@localSearchIndex'

export interface SearchResult {
  id: string
  title: string
  titles: string[]
  link: string
  score: number
}

const DEFAULT_OPTIONS: MiniSearchOptions<any> = {
  fields: ['title', 'titles', 'text'],
  storeFields: ['title', 'titles']
}

export function useLocalSearch() {
  const { site, localeIndex, theme } = useData()

  const provider = computed(() => (theme.value as any).search?.provider as string | undefined)
  const enabled = computed(() => provider.value === 'local')

  const indexRef = ref<MiniSearch | null>(null)
  const loading = ref(false)

  async function ensureIndex() {
    if (!enabled.value || indexRef.value) return
    const indexes = localSearchIndex as Record<string, () => Promise<{ default: string }>>
    if (!indexes) return
    const locale = localeIndex.value ?? 'root'
    const loader = indexes[locale] ?? indexes['root']
    if (!loader) return
    loading.value = true
    try {
      const mod = await loader()
      const userOpts = (theme.value as any).search?.options?.miniSearch?.options ?? {}
      indexRef.value = MiniSearch.loadJSON(mod.default, { ...DEFAULT_OPTIONS, ...userOpts })
    } finally {
      loading.value = false
    }
  }

  // Re-load when locale changes
  watch(localeIndex, () => {
    indexRef.value = null
  })

  function search(query: string, limit = 20): SearchResult[] {
    if (!indexRef.value || !query.trim()) return []
    const userSearchOpts = (theme.value as any).search?.options?.miniSearch?.searchOptions ?? {}
    const raw = indexRef.value.search(query, { prefix: true, fuzzy: 0.2, boost: { title: 4, titles: 2 }, ...userSearchOpts })
    const base = site.value.base ?? '/'
    return raw.slice(0, limit).map((r: any) => ({
      id: r.id,
      title: r.title,
      titles: Array.isArray(r.titles) ? r.titles : [],
      link: withBase(r.id.startsWith(base) ? r.id : r.id.replace(/^\//, base)),
      score: r.score
    }))
  }

  return { enabled, loading, ensureIndex, search }
}
