<template>
  <div class="chart-code">
    <vuep :template="code"></vuep>
    <form
      target="_blank"
      action="http://jsfiddle.net/api/post/library/pure/"
      class="chart-code-form"
      method="post">
      <input type="hidden" name="html" :value="post.html">
      <input type="hidden" name="css" :value="post.css">
      <input type="hidden" name="js" :value="post.js">
      <button type="submit" class="chart-code-form-button">在线运行</button>
    </form>
  </div>
</template>

<script>
import Vuep from 'vuep'
import 'vuep/dist/vuep.css'
import axios from 'axios'

export default {
  props: {
    name: String
  },

  computed: {
    code ({ name, getFormat }) {
      return getFormat(window.CHART_CODE[name].code.content)
    },
    post ({ name, getFormat }) {
      const result = {}
      const post = window.CHART_CODE[name].post
      Object.keys(post).forEach(key => {
        result[key] = getFormat(post[key])
      })
      return result
    }
  },

  methods: {
    getFormat (str) {
      console.log
      const reg = new RegExp(`^(\\s{0,${window.CHART_CODE_INDENT}}|[\\n])`, 'gm')
      return str.replace(reg, '').replace(/^\s/, '')
    }
  },

  components: {
    Vuep
  }
}
</script>

<style lang="stylus">
.chart-code
  position: relative;

  .chart-code-form
    position: absolute;
    right: 10px;
    width: 45%;
    text-align: right;
    bottom: 1px;
    background-color: #fff;

    .chart-code-form-button
      outline: 0;
      border: 0;
      background-color: transparent;
      color: #3eaf7c;
      font-size: 14px;
      cursor: pointer;
</style>
