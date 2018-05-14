import App from './App'
import Vue from 'vue'
import router from './router'

import CodeSection from './components/code-section'

Vue.component(CodeSection.name, CodeSection)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
