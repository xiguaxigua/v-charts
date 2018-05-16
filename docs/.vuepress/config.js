module.exports = {
  title: 'v-charts',
  description: '基于 Vue2.x 的 Echarts 组件',
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon'}],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/babel-standalone/babel.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/echarts@latest/dist/echarts.min.js' }],
    ['script', { src: '/chart-lib/index.min.js' }],
    ['link', { href: '/chart-lib/style.min.css', rel: 'stylesheet' }]
  ],
  lastUpdated: 'Last Updated',
  ga: 'UA-118958706-1',
  locales: {
    '/en': {
      lang: 'English',
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    '/': {
      lang: '中文',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    }
  },
  themeConfig: {
    repo: 'ElemeFe/v-charts',
    sidebar: {
      '/zh/': [
        'guide',
      ],
      '/en/': [
        'guide'
      ]
    }
  }
}
