<template>
  <!-- 测试属性
    data: { columns, rows }
    changeDelay: { type: Number, default: 0 }
    handler: { type: Object, default () { return {} } }
    useDataConverter: Boolean
    width: { type: String, default: 'auto' }
    height: { type: String, default: '400px' }
    className: String
  -->
  <div>
    width height
    <ve-line
      :data="chartData"
      class="custom-class"
      width="300px"
      height="300px">
    </ve-line>
    simple data
    <ve-line
      :data="simpleChartData"
      :handler="handler"
      useDataConverter>
    </ve-line>
    <button @click="changeSettings">trigger change</button>
    <br>
    change delay 0
    <ve-line
      :data="chartData"
      :after-config="afterConfig"
      :settings="chartSettings">
    </ve-line>
    change delay 1000
    <ve-line
      :data="chartData"
      :after-config="afterConfig.bind(this, 1)"
      :change-delay="1000"
      :settings="chartSettings">
    </ve-line>
  </div>
</template>

<script>
import { VeLine } from '../../src/index.es'
import { LINE_DATA, SIMPLE_LINE_DATA } from './data'
import { simpleDataConverter } from '../../src/converter'
export default {
  data () {
    this.handler = {
      dataConverter: simpleDataConverter
    }
    return {
      chartData: LINE_DATA,
      chartSettings: {},
      simpleChartData: SIMPLE_LINE_DATA
    }
  },
  methods: {
    changeSettings () {
      this.timer = Date.now()
      console.log('触发 watch')
      this.chartSettings = { yAxisType: ['0.0a'] }
    },
    afterConfig () {
      console.log(arguments)
      console.log('绘制延迟时间', Date.now() - (this.timer || Date.now()))
      return arguments[arguments.length - 1]
    }
  },
  components: { VeLine }
}
</script>
