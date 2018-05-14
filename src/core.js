import { COLORS, NO_DATA_LOGIC_PROPS, DEFAULT_THEME } from './constants'
import { toKebab, isArray, isObject } from './utils'
import Loading from '@/components/loading'
import DataEmpty from '@/components/data-empty'
import debounce from 'throttle-debounce/debounce'

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
      const {
        echarts,
        themeName,
        theme,
        $refs: {
          canvas
        },
        initOptions,
        echartsLib,
        data,
        createEventProxy,
        resizeable,
        resizeHandler
      } = this

      if (echarts) return
      const themeArg = themeName || theme || DEFAULT_THEME
      this.echarts = echartsLib.init(canvas, themeArg, initOptions)
      if (data) this.changeHandler()
      createEventProxy()
      if (resizeable) window.addEventListener('resize', resizeHandler)
    },

    dataHandler () {
      const {
        chartHandler,
        tooltipVisible,
        legendVisible,
        echarts,
        tooltipFormatter,
        optionsHandler,
        settings,
        beforeConfig
      } = this
      let { data } = this
      const extra = {
        tooltipVisible,
        legendVisible,
        echarts,
        tooltipFormatter
      }
      let options = {}

      if (!chartHandler) return
      if (beforeConfig) data = beforeConfig(data)

      const { columns = [], rows = [] } = data

      options = chartHandler(
        options,
        columns,
        rows,
        settings,
        extra
      )

      if (options) {
        if (typeof options.then === 'function') {
          options.then(optionsHandler)
        } else {
          optionsHandler(options)
        }
      }
    },

    optionsHandler (options) {
      const {
        animation,
        markArea,
        markLine,
        markPoint,
        addMark,
        chartColor,
        getExtendOptions,
        extend,
        afterConfig,
        echarts,
        _once,
        afterSetOption,
        afterSetOptionOnce,
        judgeWidth
      } = this
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
      if (markArea || markLine || markPoint) {
        const marks = {
          markArea: markArea,
          markLine: markLine,
          markPoint: markPoint
        }
        const series = options.series
        if (isArray(series)) {
          series.forEach(item => {
            addMark(item, marks)
          })
        } else if (isObject(series)) {
          addMark(series, marks)
        }
      }

      options.color = chartColor

      if (extend) getExtendOptions(options, extend)

      if (afterConfig) options = afterConfig(options)

      echarts.setOption(options, true)

      if (judgeWidth) this.judgeWidthHandler(options)

      this.$emit('ready', echarts)
      if (!_once['ready-once']) {
        _once['ready-once'] = true
        this.$emit('ready-once', echarts)
      }

      if (afterSetOption) afterSetOption(echarts)
      if (afterSetOptionOnce && !_once['afterSetOptionOnce']) {
        _once['afterSetOptionOnce'] = afterSetOptionOnce(echarts)
      }
    },

    getExtendOptions (options, extend) {
      // extend sub attribute
      // TODO: add more convenient extend
      Object.keys(extend).forEach(attr => {
        if (typeof extend[attr] === 'function') {
          // get callback value
          options[attr] = extend[attr](options[attr])
        } else {
          // mixin extend value
          if (isArray(options[attr]) && isObject(options[attr][0])) {
            // eg: [{ xx: 1 }, { xx: 2 }]
            options[attr].forEach((option, index) => {
              options[attr][index] = Object.assign({}, option, extend[attr])
            })
          } else if (isObject(options[attr])) {
            // eg: { xx: 1, yy: 2 }
            options[attr] = Object.assign({}, options[attr], extend[attr])
          } else {
            options[attr] = extend[attr]
          }
        }
      })
    },

    judgeWidthHandler (options) {
      const {
        echarts,
        widthChangeDelay
      } = this

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
            }, widthChangeDelay)
          }
        })
      }
    },

    addMark (seriesItem, marks) {
      Object.keys(marks).forEach(key => {
        if (marks[key]) seriesItem[key] = marks[key]
      })
    },

    resize () {
      this.echarts.resize()
    },

    addWatchToProps () {
      const {
        changeHandler,
        $props,
        _watchers
      } = this
      const watchedVariable = _watchers.map(watcher => watcher.expression)
      Object.keys($props).forEach(prop => {
        if (!~watchedVariable.indexOf(prop) &&
          !~NO_DATA_LOGIC_PROPS.indexOf(prop)) {
          const opts = {}
          const item = $props[prop]
          if (isObject(item) || isArray(item)) opts.deep = true
          this.$watch(prop, changeHandler, opts)
        }
      })
    },

    createEventProxy () {
      // 只要用户使用 on 方法绑定的事件都做一层代理，
      // 是否真正执行相应的事件方法取决于该方法是否仍然存在 events 中
      // 实现 events 的动态响应
      const {
        registeredEvents,
        events,
        echarts
      } = this
      const self = this
      const keys = Object.keys(events || {})
      keys.length && keys.forEach(ev => {
        if (registeredEvents.indexOf(ev) === -1) {
          registeredEvents.push(ev)
          echarts.on(ev, (function (ev) {
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
    this.resizeHandler = debounce(this.resizeDelay, _ => {
      this.echarts && this.echarts.resize()
    })
    this.changeHandler = debounce(this.changeDelay, _ => {
      this.dataHandler()
    })
    this.addWatchToProps()
  },

  mounted () {
    this.init()
  },

  beforeDestroy () {
    this.clean()
  }
}
