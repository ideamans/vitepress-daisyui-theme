import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

/**
 * Wraps VitePress `defineConfig` to wire Tailwind CSS 4's Vite plugin
 * and inject an inline head script that sets DaisyUI's `data-theme`
 * before first paint (prevents FOUC).
 *
 * @param {import('vitepress').UserConfig<import('./types').ThemeConfig>} [config]
 * @returns {import('vitepress').UserConfig<import('./types').ThemeConfig>}
 */
export function withTheme(config = {}) {
  const userVite = config.vite ?? {}
  const userBuild = userVite.build ?? {}
  const userRollup = userBuild.rollupOptions ?? {}
  const userOnWarn = userRollup.onwarn

  const themeConfig = config.themeConfig ?? {}
  const lightTheme = themeConfig.daisyui?.light ?? 'light'
  const darkTheme = themeConfig.daisyui?.dark ?? 'dark'

  const fouc = `(()=>{try{var k="vitepress-theme-appearance";var s=localStorage.getItem(k)||"auto";var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var d=(s==="auto"||!s)?m:s==="dark";document.documentElement.dataset.theme=d?${JSON.stringify(darkTheme)}:${JSON.stringify(lightTheme)};}catch(e){}})();`

  const head = [...(config.head ?? []), ['script', { id: 'tw-theme-init' }, fouc]]

  const merged = {
    ...config,
    head,
    vite: {
      ...userVite,
      plugins: [tailwindcss(), ...((userVite.plugins) ?? [])],
      build: {
        ...userBuild,
        rollupOptions: {
          ...userRollup,
          onwarn(warning, warn) {
            if (
              warning.code === 'CYCLIC_CROSS_CHUNK_REEXPORT' ||
              (warning.message && warning.message.includes("Export \"Content\""))
            ) {
              return
            }
            if (userOnWarn) userOnWarn(warning, warn)
            else warn(warning)
          }
        }
      }
    }
  }
  return defineConfig(merged)
}

// Back-compat alias for the previous name
export const withTailwindTheme = withTheme

export { defineConfig }
