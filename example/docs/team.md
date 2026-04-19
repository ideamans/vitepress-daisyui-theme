---
layout: page
---

<script setup>
const core = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ],
    desc: 'Independent open source developer, creator of Vue and VitePress.'
  },
  {
    avatar: 'https://www.github.com/kiaking.png',
    name: 'Kia King Ishii',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/kiaking' },
      { icon: 'twitter', link: 'https://twitter.com/KiaKing85' }
    ],
    desc: 'VitePress maintainer and default theme designer.'
  },
  {
    avatar: 'https://www.github.com/brc-dd.png',
    name: 'Divyansh Singh',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/brc-dd' }
    ],
    desc: 'Maintainer of VitePress core.'
  }
]

const contributors = [
  { avatar: 'https://www.github.com/bencodezen.png', name: 'Ben Hong', links: [{ icon: 'github', link: 'https://github.com/bencodezen' }] },
  { avatar: 'https://www.github.com/patak-dev.png', name: 'Patak', links: [{ icon: 'github', link: 'https://github.com/patak-dev' }] },
  { avatar: 'https://www.github.com/sapphi-red.png', name: 'sapphi-red', links: [{ icon: 'github', link: 'https://github.com/sapphi-red' }] },
  { avatar: 'https://www.github.com/antfu.png', name: 'Anthony Fu', links: [{ icon: 'github', link: 'https://github.com/antfu' }] }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Meet the Team</template>
    <template #lead>
      The development of VitePress is guided by an international team, some of whom have chosen to be featured below.
    </template>
  </VPTeamPageTitle>

  <VPTeamPageSection>
    <template #title>Core members</template>
    <template #lead>
      Core team members are those who are actively involved in the maintenance of the project.
    </template>
    <template #members>
      <VPTeamMembers size="medium" :members="core" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>Contributors</template>
    <template #lead>
      People who have notably contributed to the project.
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="contributors" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
