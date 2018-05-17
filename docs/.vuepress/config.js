const version = require('../../package.json').version
const webpack = require('webpack')

module.exports = {
  title: 'v-charts',
  description: '基于 Vue2.x 的 Echarts 组件',
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon'}],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/babel-standalone/babel.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/echarts@latest/dist/echarts.min.js' }]
  ],
  ga: 'UA-118958706-1',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    },
    '/en/': {
      lang: 'en-US',
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    }
  },
  serviceWorker: true,
  themeConfig: {
    repo: 'ElemeFe/v-charts',
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/en/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
          {
            text: 'guide',
            link: '/en/guide/',
          }
        ],
        sidebar: {
          '/en/guide/': genSidebarConfig('guide')
        }
      },
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [
          {
            text: '指南',
            link: '/guide/',
          }
        ],
        sidebar: {
          '/guide/': genSidebarConfig('指南')
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        version: JSON.stringify(version)
      })
    ]
  }
}

function genSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'guide',
        'line',
        'event'
      ]
    }
  ]
}
