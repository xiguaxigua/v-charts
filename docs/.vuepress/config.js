module.exports = {
  title: 'v-charts',
  description: '基于 Vue2.x 的 Echarts 组件',
  head: [
    ['link', {
      rel: 'shortcut icon',
      href: '/favicon.ico',
      type: 'image/x-icon'
    }],
    ['script', { src: '/custom.js' }]
  ],
  ga: 'UA-118958706-1',
  themeConfig: {
    sidebar: {
      '/zh/': [
        'guide',
      ],
      '/en/': [
        'guide'
      ]
    },
    nav: [
      {
        text: '语言',
        items: [
          { text: '中文', link: '/zh/guide' },
          { text: 'English', link: '/en/guide' }
        ]
      },
      {
        text: 'Github',
        link: 'https://github.com/elemefe/v-charts'
      }
    ]
  }
}
