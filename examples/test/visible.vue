<template>
  <!--
    tooltipVisible: { type: Boolean, default: true },
    legendVisible: { type: Boolean, default: true },
    axisVisible: { type: Boolean, default: true },
  -->
  <div>
    hide tooltip
    <ve-line :data="chartData" :tooltip-visible="false"></ve-line>
    hide legend
    <ve-line :data="chartData" :legend-visible="false"></ve-line>
    hide axis
    <ve-line :data="chartData" :axis-visible="false"></ve-line>
  </div>
</template>

<script>
import { VeLine } from '../../src/index.es'
import { LINE_DATA } from './data'
export default {
  data () {
    return {
      chartData: LINE_DATA
    }
  },
  components: { VeLine }
}
</script>
