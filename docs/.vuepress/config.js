const version = require('../../package.json').version
const webpack = require('webpack')

module.exports = {
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon'}],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/babel-standalone/babel.min.js' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/echarts@latest/dist/echarts.min.js' }],
    ['script', { src: '/index.js' }]
  ],
  ga: 'UA-118958706-1',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'v-charts',
      description: '基于 Vue2.x 的 Echarts 组件'
    },
    '/en/': {
      lang: 'en-US',
      title: 'v-charts',
      description: 'Chart components based on Vue2.x and Echarts'
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
          '/en/guide/': genSidebarConfig('Guide', 'Charts', 'Others')
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
          '/guide/': genSidebarConfig('介绍', '图表', '其他')
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        version: JSON.stringify(version)
      })
      // new webpack.ProvidePlugin({
      //   CHART_CODE: 'global-var-chart-code'
      // })
    ]
  }
}

function genSidebarConfig (intro, charts, others) {
  return [
    {
      title: intro,
      collapsable: false,
      children: [
        '',
        'start',
        'props'
      ]
    },
    {
      title: charts,
      collapsable: false,
      children: [
        'line'
      ]
    },
    {
      title: others,
      collapsable: false,
      children: [
        'event'
      ]
    }
  ]
}
