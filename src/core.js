import {
  COLORS,
  NO_DATA_LOGIC_PROPS,
  DEFAULT_THEME
} from './constants'
import {
  toKebab,
  isArray,
  isObject,
  debounce
} from './utils'
import Loading from '@/components/loading'
import DataEmpty from '@/components/data-empty'
import setExtendOptions from './module/extend'
import setTooltip from './module/tooltip'
import setMarks from './module/mark'
import setLegend from './module/legend'

export default {
  render (h) {
    return h('div', {
      class: [
        toKebab(this.$options.name || this.$options._componentTag),
        this.className // TODO: add test case
      ],
      style: this.canvasStyle
    }, [
      h('div', {
        style: this.canvasStyle,
        ref: 'canvas'
      }),
      h(Loading, {
        style: { display: this.loading ? '' : 'none' }
      }),
      h(DataEmpty, {
        style: { display: this.dataEmpty ? '' : 'none' }
      }),
      this.$slots.default
    ])
  },

  props: {
    // custom props
    data: { type: [Object, Array], default () { return {} } },
    settings: { type: Object, default () { return {} } },

    width: { type: String, default: 'auto' },
    height: { type: String, default: '400px' },
    className: String,

    beforeConfig: Function,
    afterConfig: Function,
    afterSetOption: Function,
    afterSetOptionOnce: Function,

    events: Object,

    initOptions: { type: Object, default () { return {} } },

    tooltipVisible: { type: Boolean, default: true },
    legendVisible: { type: Boolean, default: true },
    axisVisible: { type: Boolean, default: true },

    markLine: Object,
    markArea: Object,
    markPoint: Object,

    theme: Object,
    themeName: String,

    loading: Boolean,
    dataEmpty: Boolean,

    extend: Object,

    judgeWidth: { type: Boolean, default: false },
    widthChangeDelay: { type: Number, default: 300 },

    tooltipFormatter: { type: Function },

    resizeable: { type: Boolean, default: true },
    resizeDelay: { type: Number, default: 200 },

    changeDelay: { type: Number, default: 0 },

    handler: { type: Object, default () { return {} } },
    useDataConverter: Boolean,
    // echarts props
    grid: [Object, Array],
    colors: Array,
    visualMap: [Object, Array],
    dataZoom: [Object, Array],
    toolbox: [Object, Array],
    title: Object,
    legend: [Object, Array],
    xAxis: [Object, Array],
    yAxis: [Object, Array],
    radar: Object,
    tooltip: Object,
    axisPointer: Object,
    brush: [Object, Array],
    geo: Object,
    timeline: [Object, Array],
    graphic: [Object, Array],
    series: [Object, Array],
    backgroundColor: [Object, String],
    textStyle: Object,
    animation: Object
  },

  watch: {
    data: {
      deep: true,
      handler (v) {
        if (v) this.changeHandler()
      }
    },

    settings: {
      deep: true,
      handler (v) {
        if (v) this.changeHandler()
      }
    },

    events: {
      deep: true,
      handler () {
        this.createEventProxy()
      }
    },

    theme: {
      deep: true,
      handler (v) {
        this.themeChange(v)
      }
    },

    themeName (v) {
      this.themeChange(v)
    }
  },

  computed: {
    canvasStyle () {
      return {
        width: this.width,
        height: this.height,
        position: 'relative'
      }
    },

    chartColor () {
      return this.colors || (this.theme && this.theme.color) || COLORS
    }
  },

  methods: {
    init () {
      if (this.echarts) return
      const themeArg = this.themeName || this.theme || DEFAULT_THEME
      this.echarts = this.echartsLib.init(this.$refs.canvas, themeArg, this.initOptions)
      if (this.data) this.changeHandler()
      this.createEventProxy()
      if (this.resizeable) window.addEventListener('resize', this.resizeHandler)
    },

    dataHandler () {
      const dataConverter = this.handler.dataConverter
      let { data } = this
      let options = {}

      if (!this.chartHandler) return
      if (this.useDataConverter && dataConverter) data = dataConverter(data)
      if (this.beforeConfig) data = this.beforeConfig(data)

      const { columns = [], rows = [] } = data

      options = this.chartHandler(
        options,
        columns,
        rows,
        this.settings,
        {
          axisVisible: this.axisVisible,
          echarts: this.echarts
        }
      )

      if (options) {
        if (typeof options.then === 'function') {
          options.then(this.optionsHandler)
        } else {
          this.optionsHandler(options)
        }
      }
    },

    optionsHandler (options) {
      const { animation, echarts, _once } = this
      if (this.tooltipVisible) setTooltip(options)
      if (this.legendVisible) setLegend(options)
      // add echarts origin options attributes
      const echartsAttrs = [
        'grid', 'dataZoom', 'visualMap', 'toolbox', 'title', 'legend',
        'xAxis', 'yAxis', 'radar', 'tooltip', 'axisPointer', 'brush',
        'geo', 'timeline', 'graphic', 'series', 'backgroundColor',
        'textStyle'
      ]
      echartsAttrs.forEach(setting => {
        if (this[setting] != null) options[setting] = this[setting]
      })

      // add animation related to echarts options
      if (animation) {
        Object.keys(animation).forEach(key => {
          options[key] = animation[key]
        })
      }
      // add mark* to echarts series
      if (this.markArea || this.markLine || this.markPoint) {
        const marks = {
          markArea: this.markArea,
          markLine: this.markLine,
          markPoint: this.markPoint
        }
        const series = options.series
        if (isArray(series)) {
          series.forEach(item => {
            setMarks(item, marks)
          })
        } else if (isObject(series)) {
          setMarks(series, marks)
        }
      }

      options.color = this.chartColor

      if (this.extend) setExtendOptions(options, this.extend)

      if (this.afterConfig) options = this.afterConfig(options)
      echarts.setOption(options, true)

      if (this.judgeWidth) this.judgeWidthHandler(options)

      this.$emit('ready', echarts)
      if (!_once['ready-once']) {
        _once['ready-once'] = true
        this.$emit('ready-once', echarts)
      }

      if (this.afterSetOption) this.afterSetOption(echarts)
      if (this.afterSetOptionOnce && !_once['afterSetOptionOnce']) {
        _once['afterSetOptionOnce'] = this.afterSetOptionOnce(echarts)
      }
    },

    judgeWidthHandler (options) {
      const { echarts } = this

      if (this.$el.clientWidth) {
        echarts && echarts.resize()
      } else {
        this.$nextTick(_ => {
          if (this.$el.clientWidth) {
            echarts && echarts.resize()
          } else {
            setTimeout(_ => {
              echarts && echarts.resize()
              if (!this.$el.clientWidth) {
                console.warn(' Can\'t get dom width or height ')
              }
            }, this.widthChangeDelay)
          }
        })
      }
    },

    resize () {
      this.echarts.resize()
    },

    addWatchToProps () {
      const watchedVariable = this._watchers.map(watcher => watcher.expression)
      Object.keys(this.$props).forEach(prop => {
        if (!~watchedVariable.indexOf(prop) &&
          !~NO_DATA_LOGIC_PROPS.indexOf(prop)) {
          const opts = {}
          const item = this.$props[prop]
          if (isObject(item) || isArray(item)) opts.deep = true
          this.$watch(prop, this.changeHandler, opts)
        }
      })
    },

    createEventProxy () {
      const self = this
      const keys = Object.keys(this.events || {})
      keys.length && keys.forEach(ev => {
        if (this.registeredEvents.indexOf(ev) === -1) {
          this.registeredEvents.push(ev)
          this.echarts.on(ev, (function (ev) {
            return function (...args) {
              if (ev in self.events) {
                self.events[ev].apply(null, args)
              }
            }
          })(ev))
        }
      })
    },

    themeChange (theme) {
      this.clean()
      this.echarts = null
      this.init()
    },

    clean () {
      if (this.resizeable) {
        window.removeEventListener('resize', this.resizeHandler)
      }
      this.echarts.dispose()
    }
  },

  created () {
    this.echarts = null
    this.registeredEvents = []
    this._once = {}
    this.resizeHandler = debounce(_ => {
      this.echarts && this.echarts.resize()
    }, this.resizeDelay)
    this.changeHandler = debounce(_ => {
      this.dataHandler()
    }, this.changeDelay)
    this.addWatchToProps()
  },

  mounted () {
    this.init()
  },

  beforeDestroy () {
    this.clean()
  }
}
