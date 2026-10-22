import { useData } from 'vitepress/client'

/**
 * Site `base` support for links taken from the config and frontmatter.
 *
 * VitePress's default theme passes every internal link through `withBase`, so configs
 * write links without the base (`/guide/`). These helpers do the same for this theme:
 * internal links get the base prepended, and route paths are compared without it.
 * A link that already starts with the base is left alone, so configs that worked
 * around the missing base by prefixing it themselves keep working.
 */

export function isExternalLink(link: string): boolean {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(link)
}

function trimBase(base: string): string {
  return base.replace(/\/$/, '')
}

/** Prepend `base` to an internal absolute link (`/foo` → `/docs/foo`). */
export function resolveLink(link: string, base = '/'): string
export function resolveLink(link: string | undefined, base?: string): string | undefined
export function resolveLink(link: string | undefined, base = '/'): string | undefined {
  if (!link || base === '/' || isExternalLink(link) || !link.startsWith('/')) return link
  const b = trimBase(base)
  if (link === b || link.startsWith(b + '/')) return link
  return b + link
}

/** Remove `base` from a route path or link (`/docs/foo` → `/foo`). Inverse of `resolveLink`. */
export function stripBase(path: string, base = '/'): string {
  if (base === '/' || isExternalLink(path)) return path
  const b = trimBase(base)
  if (path === b) return '/'
  return path.startsWith(b + '/') ? path.slice(b.length) : path
}

export function useLink() {
  const { site } = useData()
  return {
    resolve: <T extends string | undefined>(link: T): T => resolveLink(link, site.value.base) as T,
    strip: (path: string): string => stripBase(path, site.value.base),
  }
}
