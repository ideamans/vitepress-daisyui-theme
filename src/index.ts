import type { Theme } from 'vitepress/client'
import Layout from './Layout.vue'
import Badge from './components/Badge.vue'
import Callout from './components/Callout.vue'
import VPTeamPage from './components/VPTeamPage.vue'
import VPTeamPageTitle from './components/VPTeamPageTitle.vue'
import VPTeamPageSection from './components/VPTeamPageSection.vue'
import VPTeamMembers from './components/VPTeamMembers.vue'
import VPTeamMembersItem from './components/VPTeamMembersItem.vue'
import './styles/theme.css'

export type { ThemeConfig, NavItem, SidebarItem, SidebarConfig, SocialLink, FooterConfig } from './types'

function closeAllDropdowns(except?: Node | null) {
  document.querySelectorAll<HTMLDetailsElement>('details.dropdown[open]').forEach((d) => {
    if (except && d.contains(except)) return
    d.open = false
    // Blur so :focus-within / :has(:focus) don't keep it visually open
    const summary = d.querySelector('summary')
    if (summary instanceof HTMLElement) summary.blur()
  })
}

const theme: Theme = {
  Layout,
  enhanceApp({ app, router }) {
    app.component('Badge', Badge)
    app.component('Callout', Callout)
    app.component('VPTeamPage', VPTeamPage)
    app.component('VPTeamPageTitle', VPTeamPageTitle)
    app.component('VPTeamPageSection', VPTeamPageSection)
    app.component('VPTeamMembers', VPTeamMembers)
    app.component('VPTeamMembersItem', VPTeamMembersItem)

    if (typeof window === 'undefined') return

    document.addEventListener('click', (e) => {
      closeAllDropdowns(e.target as Node | null)
    })
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllDropdowns()
    })
    router.onAfterRouteChange = () => {
      closeAllDropdowns()
    }
  }
}

export default theme
