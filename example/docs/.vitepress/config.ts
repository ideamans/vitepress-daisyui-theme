import { withTheme } from 'vitepress-daisyui-theme/config'

export default withTheme({
  title: 'Tailwind Theme Example',
  description: 'Preview site for vitepress-daisyui-theme',
  appearance: true,
  lastUpdated: true,
  markdown: {
    math: true
  },
  themeConfig: {
    siteTitle: 'TW Theme',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Markdown Demo', link: '/guide/markdown-demo' },
      { text: 'Math', link: '/guide/math' },
      { text: 'Team', link: '/team' },
      { text: 'About', link: '/about' },
      {
        text: 'Resources',
        items: [
          { text: 'VitePress', link: 'https://vitepress.dev', target: '_blank' },
          { text: 'Tailwind CSS', link: 'https://tailwindcss.com', target: '_blank' },
          { text: 'DaisyUI', link: 'https://daisyui.com', target: '_blank' }
        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/guide/getting-started' },
            { text: 'Markdown Demo', link: '/guide/markdown-demo' },
            { text: 'Math (MathJax)', link: '/guide/math' }
          ]
        },
        {
          text: 'Layouts',
          collapsed: true,
          items: [
            { text: 'Doc layout', link: '/guide/getting-started' },
            { text: 'Page layout', link: '/about' }
          ]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/' }],
    footer: {
      message: 'Built with vitepress-daisyui-theme',
      copyright: '© 2026'
    },
    outline: { level: [2, 3], label: 'On this page' },
    externalLinkIcon: true,
    editLink: {
      pattern: 'https://github.com/example/repo/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    search: {
      provider: 'local'
    }
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US'
    },
    ja: {
      label: '日本語',
      lang: 'ja',
      themeConfig: {
        nav: [
          { text: 'ガイド', link: '/ja/guide/getting-started' },
          { text: 'Markdown', link: '/ja/guide/markdown-demo' },
          { text: 'About', link: '/ja/about' }
        ],
        sidebar: {
          '/ja/guide/': [
            {
              text: 'はじめに',
              collapsed: false,
              items: [
                { text: '導入', link: '/ja/guide/getting-started' },
                { text: 'Markdown デモ', link: '/ja/guide/markdown-demo' }
              ]
            }
          ]
        },
        outline: { level: [2, 3], label: 'このページの内容' },
        docFooter: { prev: '前のページ', next: '次のページ' }
      }
    }
  }
})
