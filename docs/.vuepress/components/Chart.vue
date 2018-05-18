<template>
  <div class="chart-code">
    <loading v-show="loading"></loading>
    <div class="chart-container" ref="box"></div>
    <form
      target="_blank"
      action="http://jsfiddle.net/api/post/library/pure/"
      class="chart-code-form"
      method="post">
      <input type="hidden" name="css" :value="post[0]">
      <input type="hidden" name="html" :value="post[1]">
      <input type="hidden" name="js" :value="post[2]">
      <input type="hidden" name="panel_js" value="3">
      <input type="hidden" name="wrap" value="l">
      <button type="submit" class="chart-code-form-button">在线运行</button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue/dist/vue.common'
import Loading from '../../../src/components/loading'

const RESOURCE = [
  '<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"><\/script>',
  '<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"><\/script>',
  '<script src="https://cdn.jsdelivr.net/npm/numeral/numeral.js"><\/script>',
  '<script src="https://cdn.jsdelivr.net/npm/v-charts-v2@' + version + '/lib/index.min.js"><\/script>',
  '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/v-charts-v2/lib/style.min.css">'
]
const SPLIT_SIGN = '@!@'
const REPLICE_LIST = [
  { from: '<template>', to: SPLIT_SIGN + '<template>' },
  { from: '</template>', to: '<template>' + SPLIT_SIGN },
  { from: '<template>', to: '<div id="app">' },
  { from: '</template>', to: '</div>' },
  { from: '<style>', to: '' },
  { from: '</style>', to: '' },
  { from: '<script>', to: '' },
  { from: 'export default {', to: 'new Vue({\n  el: \'#app\',\n' },
  { from: '\n<\/script>', to: ')' }
]


export default {
  props: {
    name: String
  },
  data () {
    return {
      post: [],
      loading: true
    }
  },
  methods: {
    getFormat (str) {
      str = str.replace(/^\W/, '')
      let indent = 0
      Array.prototype.some.call(str, s => {
        if (s !== ' ') return true
        indent++
      })
      const reg = new RegExp(`^(\\s{0,${indent}}|[\\n])`, 'gm')
      return str.replace(reg, '')
    }
  },
  mounted () {
    const { name, getFormat } = this
    const result = {}
    const code = getFormat(window[name].code)
    let post = code
    REPLICE_LIST.forEach(({ from, to }) => {
      post = post.replace(from, to)
    })
    post = post.split(SPLIT_SIGN).map(item => item.replace(/^\n+/gm, ''))
    post[1] = `${RESOURCE.join('\n')}\n${post[1]}`
    this.post = post
    Promise.all([
      import('vuep'),
      import('../../../lib/index.js')
    ]).then(([Vuep, VeIndex]) => {
      Vue.use(VeIndex)
      const CodeSection = Vue.extend(Vuep)
      new CodeSection({
        propsData: { template: code }
      }).$mount(this.$refs.box)
      this.loading = false
    })
  },

  components: { Loading }
}
</script>


<style lang="stylus">
@import "../../../node_modules/vuep/dist/vuep.css"
@import "../../../lib/style.min.css"

table
  width: 100%

  td
    white-space: pre-line;


.vuep
  min-height: 460px
  height: inherit

.v-charts-component-loading
  border: 1px solid #ccc

  .path
    stroke: #3eaf7c 

.chart-code
  position: relative
  min-height: 460px
  margin-top: 10px
  height: inherit

  .chart-code-form
    position: absolute
    right: 10px
    width: 45%
    text-align: right
    bottom: 1px
    background-color: #fff

    .chart-code-form-button
      outline: 0
      border: 0
      background-color: transparent
      color: #3eaf7c
      font-size: 14px
      cursor: pointer
</style>
