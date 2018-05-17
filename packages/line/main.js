import {
  arrDelItem,
  optionsAddAttr,
  arrDelArrItem,
  getStackMap,
  getFormat,
  getFnAndObjValue
} from '@/utils'

function getXAxis (args) {
  const {
    dimension,
    rows,
    gridIndex,
    xAxisType,
    xAxisName,
    axisVisible
  } = args

  return {
    type: xAxisType,
    name: xAxisName,
    data: rows.map(row => ({ value: row[dimension] })),
    show: axisVisible,
    gridIndex
  }
}

function getYAxis (args) {
  const {
    rightMetrics,
    leftMetrics,
    yAxisType,
    metricsType,
    axisVisible,
    scale,
    min,
    max,
    gridIndex,
    yAxisName
  } = args
  const yAxis = []
  const yAxisBase = {
    type: 'value',
    show: axisVisible,
    gridIndex
  }
  const types = [
    yAxisType[0] || metricsType[leftMetrics[0]],
    yAxisType[2] || metricsType[rightMetrics[0]]
  ]

  for (let i = 0; i < 2; i++) {
    if (!(i && rightMetrics)) {
      yAxis[i] = Object.assign({}, yAxisBase, {
        name: yAxisName[i] || '',
        scale: scale[i] || false,
        min: min[i] || null,
        max: max[i] || null
      })
      if (types[i]) {
        yAxis[i].axisLabel = {
          formatter: val => getFormat(val, types[i])
        }
      }
    }
  }
  return yAxis
}

function getSeries (args) {
  const {
    rows,
    leftMetrics,
    rightMetrics,
    extraMetrics,
    stack,
    labelAlias,
    dimension,
    displayMetrics,
    metricsType,
    yAxisType,
    area
  } = args
  const stackMap = stack && getStackMap(stack)
  const series = []

  displayMetrics.forEach((metricsItem, index) => {
    const data = []
    rows.forEach(row => {
      let value = {
        value: [row[dimension], row[metricsItem]],
        _extra: [],
        name: row[dimension],
        format: metricsType[metricsItem] ||
          (~leftMetrics.indexOf(metricsItem) && yAxisType[0]) ||
          (~rightMetrics.indexOf(metricsItem) && yAxisType[1]) ||
          false
      }
      if (index === displayMetrics.length - 1) {
        extraMetrics.forEach(ext => {
          value._extra.push({
            name: row[dimension],
            seriesName: ext,
            value: [row[dimension], row[ext]],
            format: metricsType[ext] || false
          })
        })
      }
      data.push(value)
    })
    series.push({
      name: getFnAndObjValue(labelAlias, metricsItem),
      type: 'line',
      data,
      yAxisIndex: ~leftMetrics.indexOf(metricsItem) ? 0 : 1, // TODO: 处理多图时的坐标轴问题，
      xAxisIndex: 0,
      stack: stack && stackMap[metricsItem],
      areaStyle: area && { normal: {} }
    })
  })

  return series
}

export const line = (options, columns, rows, settings, extra) => {
  const {
    dimension = columns[0],
    metrics: customMetrics,
    extraMetrics = [],
    axisSite = {},
    gridIndex = 0,
    xAxisType = 'category',
    xAxisName = '',
    yAxisType = [],
    yAxisName = [],
    metricsType = {},
    labelAlias,
    legendAlias,
    tooltipAlias,
    scale = [],
    stack = {},
    min = [],
    max = [],
    area
  } = settings
  const { axisVisible } = extra
  const metrics = customMetrics || arrDelItem(columns, dimension)
  const rightMetrics = axisSite.right || []
  const leftMetrics = axisSite.left || arrDelArrItem(metrics, rightMetrics)
  const displayMetrics = leftMetrics.concat(rightMetrics)
  const xAxis = getXAxis({
    dimension,
    rows,
    gridIndex,
    xAxisType,
    xAxisName,
    axisVisible
  })
  const yAxis = getYAxis({
    rightMetrics,
    leftMetrics,
    yAxisType,
    metricsType,
    axisVisible,
    scale,
    min,
    max,
    gridIndex,
    yAxisName
  })
  const series = getSeries({
    rows,
    leftMetrics,
    rightMetrics,
    extraMetrics,
    stack,
    labelAlias,
    dimension,
    displayMetrics,
    metricsType,
    yAxisType,
    area
  })
  const _legendSettings = {
    legendAlias,
    displayMetrics,
    labelAlias
  }
  const _tooltipSettings = {
    trigger: 'axis',
    tooltipAlias
  }
  optionsAddAttr(options, {
    xAxis,
    yAxis,
    series,
    _legendSettings,
    _tooltipSettings
  })
  return options
}
