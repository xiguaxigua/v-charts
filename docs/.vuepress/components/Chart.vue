<template>
  <div class="chart-code">
    <div ref="box"></div>
    <form
      target="_blank"
      action="http://jsfiddle.net/api/post/library/pure/"
      class="chart-code-form"
      method="post">
      <input type="hidden" name="html" :value="post.html">
      <input type="hidden" name="css" :value="post.css">
      <input type="hidden" name="js" :value="post.js">
      <input type="hidden" name="panel_js" value="3">
      <input type="hidden" name="wrap" value="l">
      <button type="submit" class="chart-code-form-button">在线运行</button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'

const COMMON_SOURCE = {
  html: [
    '<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"><\/script>',
    '<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"><\/script>',
    '<script src="https://cdn.jsdelivr.net/npm/v-charts-v2/lib/index.min.js"><\/script>',
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/v-charts-v2/lib/style.min.css">'
  ]
}

export default {
  props: {
    name: String
  },
  data () {
    return {
      post: {}
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
      return str.replace(reg, '').replace(/^\s/, '')
    }
  },
  mounted () {
    const { name, getFormat } = this
    const result = {}
    const post = window.CHART_CODE[name].post
    Object.keys(post).forEach(key => {
      result[key] = getFormat(post[key])
      if (COMMON_SOURCE[key]) {
        result[key] = `${COMMON_SOURCE[key].join('\n')}\n${result[key]}`
      }
    })
    this.post = result
    const code = getFormat(window.CHART_CODE[name].code)
    if (window.VeIndex) {
      Object.keys(VeIndex).forEach(key => {
        if (!key.indexOf('Ve')) {
          window[key] = VeIndex[key]
        }
      })
    }
    import('vuep').then(Vuep => {
      const CodeSection = Vue.extend(Vuep)
      new CodeSection({
        propsData: { template: code }
      }).$mount(this.$refs.box)
    })
  }
}
</script>


<style lang="stylus">
@import "../../../node_modules/vuep/dist/vuep.css"

.vuep
  height: 460px

.chart-code
  position: relative

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
