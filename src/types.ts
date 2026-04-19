import type { DefaultTheme } from 'vitepress'

/**
 * Theme config extends VitePress's DefaultTheme.Config for drop-in
 * compatibility. Every VitePress-native option works out of the box;
 * the only addition is the `daisyui` slot for picking DaisyUI theme names.
 */
export interface ThemeConfig extends DefaultTheme.Config {
  daisyui?: {
    light?: string
    dark?: string
  }
}

export type NavItem = DefaultTheme.NavItem
export type NavItemWithLink = DefaultTheme.NavItemWithLink
export type NavItemWithChildren = DefaultTheme.NavItemWithChildren
export type SidebarItem = DefaultTheme.SidebarItem
export type SidebarConfig = DefaultTheme.Sidebar
export type SidebarMulti = DefaultTheme.SidebarMulti
export type SocialLink = DefaultTheme.SocialLink
export type FooterConfig = DefaultTheme.Footer
