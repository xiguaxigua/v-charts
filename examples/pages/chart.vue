<template>
  <div class="page-item-test">
    <div class="chart-item" v-for="(d, i) in chartData" :key="i">
      <div class="chart-part">
        <h3>{{ d.name }}</h3>
        <component
          :is="`ve-${innerType}`"
          :data="d.data"
          :handler="handler"
          v-bind="d.attr || {}"
          :settings="d.settings">
        </component>
      </div>
      <div class="code-view">
        <p>数据格式</p>
        <div class="data-code">
          <code-section :content="d.data" json></code-section>
        </div>
        <p>配置项</p>
        <div class="setting-code">
          <code-section :content="d.settings" json></code-section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VeLine from 'packages/line'
// import VeBar from '../../src/packages/bar'
// import VeHistogram from '../../src/packages/histogram'
// import VePie from '../../src/packages/pie'
// import VeRing from '../../src/packages/ring'
// import VeWaterfall from '../../src/packages/waterfall'
// import VeFunnel from '../../src/packages/funnel'
// import VeRadar from '../../src/packages/radar'
// import VeChart from '../../src/packages/chart'
// import VeMap from '../../src/packages/map'
// import VeSankey from '../../src/packages/sankey'
// import VeHeatmap from '../../src/packages/heatmap'
// import VeScatter from '../../src/packages/scatter'
// import VeCandle from '../../src/packages/candle'
// import VeGauge from '../../src/packages/gauge'
// import VeTree from '../../src/packages/tree'
import CHART_DATA from '../data'
import { simpleDataConverter } from '@/converter'

export default {
  name: 'Item',

  data () {
    this.handler = {
      dataConverter: simpleDataConverter
    }
    return {
      chartData: [],
      type: null,
      innerType: null
    }
  },

  methods: {
    init () {
      this.type = this.$route.params.type
      this.chartData = CHART_DATA[this.type].data
      this.innerType = CHART_DATA[this.type].type
    }
  },

  created () { this.init() },

  watch: {
    $route () {
      this.init()
    }
  },

  components: {
    // VeBar,
    // VeHistogram,
    // VePie,
    // VeRing,
    // VeWaterfall,
    // VeFunnel,
    // VeRadar,
    // VeChart,
    // VeMap,
    // VeSankey,
    // VeHeatmap,
    // VeScatter,
    // VeCandle,
    // VeGauge,
    // VeTree
    VeLine
  }
}
</script>

<style>
.page-item-test h3, p {
  margin: 0;
}

.page-item-test  pre {
  height: 150px;
}

.page-item-test  .chart-item {
  display: flex;
  padding: 15px;
}

.chart-part {
  flex: 1;
}

.code-view {
  width: 400px;
  margin-left: 20px;
}
</style>
