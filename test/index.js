/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import Vue from 'vue/dist/vue.min.js'
import chartData from '../examples/data/index.js'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import {
  VeLine,
  // VeBar,
  // VeHistogram,
  // VePie,
  // VeRing,
  // VeFunnel,
  // VeRadar,
  // VeWaterfall,
  // VeChart,
  // VeMap,
  // VeSankey,
  // VeHeatmap,
  // VeScatter,
  // VeCandle,
  // VeGauge
} from '../lib/index.esm'

window.Promise = require('es6-promise').Promise
require('babel-polyfill')

const comps = {
  line: VeLine,
  // bar: VeBar,
  // histogram: VeHistogram,
  // pie: VePie,
  // ring: VeRing,
  // funnel: VeFunnel,
  // radar: VeRadar,
  // waterfall: VeWaterfall,
  // chart: VeChart,
  // map: VeMap,
  // sankey: VeSankey,
  // heatmap: VeHeatmap,
  // scatter: VeScatter,
  // candle: VeCandle,
  // gauge: VeGauge
}
let box
let vm = {}
createBox()

afterEach(() => {
  if (vm.$el) document.body.removeChild(vm.$el)
  createBox()
})

Object.keys(comps).forEach(type => {
  chartData[type].data.forEach(item => {
    describe(type + ': ', () => {
      testMount(type, comps[type], item)
    })
  })
})

function testMount (type, comp, item) {
  it(item.name, () => {
    const Ctor = Vue.extend(comp)
    const vm = new Ctor({
      propsData: { data: item.data, settings: item.settings }
    }).$mount(box)
    expect(vm.$el.classList.contains('ve-' + type)).toEqual(true)
  })
}

function createBox () {
  box = document.createElement('div')
  box.id = 'app'
  document.body.appendChild(box)
}
