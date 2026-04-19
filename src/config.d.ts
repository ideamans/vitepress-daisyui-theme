import type { UserConfig } from 'vitepress'
import type { ThemeConfig } from './types'

export function withTheme(config?: UserConfig<ThemeConfig>): UserConfig<ThemeConfig>

/** @deprecated renamed to `withTheme` */
export function withTailwindTheme(config?: UserConfig<ThemeConfig>): UserConfig<ThemeConfig>

export { defineConfig } from 'vitepress'
export type { ThemeConfig }
