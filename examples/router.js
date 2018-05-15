/* eslint-disable comma-dangle */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: '安装', component: () => import('./pages/install') },
    { path: '/chart/:type', name: '图表', component: () => import('./pages/chart') },
    // { path: '/eventer', name: '事件监听', component: require('./pages/eventer') },
    // { path: '/toggle', name: '图表切换', component: require('./pages/toggle') },
    // { path: '/bmap', name: '百度地图', component: require('./pages/bmap.vue') },
    // { path: '/amap', name: '高德地图', component: require('./pages/amap.vue') },
    // { path: '/test', name: '测试', component: require('./pages/test') },
  ]
})
