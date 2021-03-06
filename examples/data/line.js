/* eslint-disable comma-dangle */
export default {
  name: '折线图',
  type: 'line',
  data: [
    {
      name: '折线图',
      data: {
        columns: ['日期', '访问用户', '下单用户'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
      settings: {
        yAxisType: ['0.0a']
      },
      attr: {
        extend: {}
      }
    },
    {
      name: '折线图',
      data: {
        columns: ['日期', '访问用户', '下单用户'],
        rows: [
          ['1/1', 1393, 1093],
          ['1/2', 3530, 3230],
          ['1/3', 2923, 2623],
          ['1/4', 1723, 1423],
          ['1/5', 3792, 3492],
          ['1/6', 4593, 4293]
        ]
      },
      settings: {},
      attr: {
        useDataConverter: true
      }
    },
    {
      name: '时间轴折线图',
      data: {
        columns: ['日期', '访问用户', '下单用户'],
        rows: [
          { '日期': '2018-05-01', '访问用户': 1393, '下单用户': 1100 },
          { '日期': '2018-05-03', '访问用户': 3530, '下单用户': 2823 },
          { '日期': '2018-05-04', '访问用户': 2923, '下单用户': 1989 },
          { '日期': '2018-05-08', '访问用户': 1723, '下单用户': 1152 },
          { '日期': '2018-05-10', '访问用户': 3792, '下单用户': 3170 },
          { '日期': '2018-05-17', '访问用户': 4593, '下单用户': 4059 }
        ]
      },
      settings: {
        xAxisType: 'time',
        tooltipAlias (date) {
          const time = new Date(date)
          return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`
        }
      }
    },
    // {
    //   name: 'label 属性配置',
    //   data: {
    //     columns: ['日期', '访问用户', '下单用户'],
    //     rows: [
    //       { '日期': '1/1', '访问用户': 123, '下单用户': 3 },
    //       { '日期': '1/2', '访问用户': 1223, '下单用户': 6 },
    //       { '日期': '1/3', '访问用户': 2123, '下单用户': 9 },
    //       { '日期': '1/4', '访问用户': 4123, '下单用户': 12 },
    //       { '日期': '1/5', '访问用户': 3123, '下单用户': 15 },
    //       { '日期': '1/6', '访问用户': 7123, '下单用户': 20 }
    //     ]
    //   },
    //   settings: {
    //     label: {
    //       normal: {
    //         show: true
    //       }
    //     }
    //   }
    // },
    // {
    //   name: '设置指标名称',
    //   data: {
    //     columns: ['date', 'balance', 'age'],
    //     rows: [
    //       { 'date': '1/1', 'balance': 123, 'age': 3 },
    //       { 'date': '1/2', 'balance': 1223, 'age': 6 },
    //       { 'date': '1/3', 'balance': 2123, 'age': 9 },
    //       { 'date': '1/4', 'balance': 4123, 'age': 12 },
    //       { 'date': '1/5', 'balance': 3123, 'age': 15 },
    //       { 'date': '1/6', 'balance': 7123, 'age': 20 }
    //     ]
    //   },
    //   settings: {
    //     labelMap: {
    //       date: '日期',
    //       balance: '访问用户'
    //     }
    //   }
    // },
    // {
    //   name: '设置legend名称',
    //   data: {
    //     columns: ['日期', '访问用户', '下单用户'],
    //     rows: [
    //       { '日期': '1/1', '访问用户': 123, '下单用户': 3 },
    //       { '日期': '1/2', '访问用户': 1223, '下单用户': 6 },
    //       { '日期': '1/3', '访问用户': 2123, '下单用户': 9 },
    //       { '日期': '1/4', '访问用户': 4123, '下单用户': 12 },
    //       { '日期': '1/5', '访问用户': 3123, '下单用户': 15 },
    //       { '日期': '1/6', '访问用户': 7123, '下单用户': 20 }
    //     ]
    //   },
    //   settings: {
    //     legendName: {
    //       '访问用户': 'remain'
    //     }
    //   }
    // },
    // {
    //   name: '带有较小百分比数值',
    //   data: {
    //     columns: ['日期', '下单率'],
    //     rows: [
    //       { '日期': '1/1', '访问用户': 123, '下单率': 0.00001 },
    //       { '日期': '1/2', '访问用户': 1223, '下单率': 0.00002 },
    //       { '日期': '1/3', '访问用户': 2123, '下单率': 0.00003 },
    //       { '日期': '1/4', '访问用户': 4123, '下单率': 0.00007 },
    //       { '日期': '1/5', '访问用户': 3123, '下单率': 0.00001 },
    //       { '日期': '1/6', '访问用户': 7123, '下单率': 0.00003 }
    //     ]
    //   },
    //   settings: {
    //     yAxisType: ['percent'],
    //     digit: 4
    //   }
    // },
    // {
    //   name: '坐标轴配置',
    //   data: {
    //     columns: ['日期', '访问用户', '下单率'],
    //     rows: [
    //       { '日期': '1/1', '访问用户': 123, '下单率': 0.3 },
    //       { '日期': '1/2', '访问用户': 1223, '下单率': 0.6 },
    //       { '日期': '1/3', '访问用户': 2123, '下单率': 0.9 },
    //       { '日期': '1/4', '访问用户': 4123, '下单率': 0.12 },
    //       { '日期': '1/5', '访问用户': 3123, '下单率': 0.15 },
    //       { '日期': '1/6', '访问用户': 7123, '下单率': 0.20 }
    //     ]
    //   },
    //   settings: {
    //     axisSite: {
    //       right: ['下单率']
    //     },
    //     yAxisType: ['KMB', 'percent']
    //   }
    // },
    // {
    //   name: '指标维度配置',
    //   data: {
    //     columns: ['日期', '访问用户', '下单率'],
    //     rows: [
    //       { '日期': '1/1', '访问用户': 123, '下单率': 0.1 },
    //       { '日期': '1/2', '访问用户': 1223, '下单率': 0.2 },
    //       { '日期': '1/3', '访问用户': 2123, '下单率': 0.3 },
    //       { '日期': '1/4', '访问用户': 4123, '下单率': 0.4 },
    //       { '日期': '1/5', '访问用户': 3123, '下单率': 0.5 },
    //       { '日期': '1/6', '访问用户': 7123, '下单率': 0.6 }
    //     ]
    //   },
    //   settings: {
    //     dimension: ['下单率'],
    //     metrics: ['访问用户']
    //   }
    // },
    // {
    //   name: '坐标轴缩放配置',
    //   data: {
    //     columns: ['日期', '访问用户', '下单率'],
    //     rows: [
    //       { '日期': '1/1', '访问用户': 1232, '下单率': 0.1 },
    //       { '日期': '1/2', '访问用户': 1223, '下单率': 0.2 },
    //       { '日期': '1/3', '访问用户': 2123, '下单率': 0.3 },
    //       { '日期': '1/4', '访问用户': 4123, '下单率': 0.4 },
    //       { '日期': '1/5', '访问用户': 3123, '下单率': 0.5 },
    //       { '日期': '1/6', '访问用户': 7123, '下单率': 0.6 }
    //     ]
    //   },
    //   settings: {
    //     dimension: ['下单率'],
    //     metrics: ['访问用户'],
    //     scale: [true, true]
    //   }
    // },
    // {
    //   name: '坐标轴值域配置',
    //   data: {
    //     columns: ['日期', '访问用户', '下单率'],
    //     rows: [
    //       { '日期': '1/1', '访问用户': 1232, '下单率': 0.1 },
    //       { '日期': '1/2', '访问用户': 1223, '下单率': 0.2 },
    //       { '日期': '1/3', '访问用户': 2123, '下单率': 0.3 },
    //       { '日期': '1/4', '访问用户': 4123, '下单率': 0.4 },
    //       { '日期': '1/5', '访问用户': 3123, '下单率': 0.5 },
    //       { '日期': '1/6', '访问用户': 7123, '下单率': 0.6 }
    //     ]
    //   },
    //   settings: {
    //     dimension: ['下单率'],
    //     metrics: ['访问用户'],
    //     min: [1000],
    //     max: [5000]
    //   }
    // },
    // {
    //   name: '面积图',
    //   data: {
    //     columns: ['日期', '访问用户', '下单率'],
    //     rows: [
    //       { '日期': '1/1', '访问用户': 123, '下单率': 0.1 },
    //       { '日期': '1/2', '访问用户': 1223, '下单率': 0.2 },
    //       { '日期': '1/3', '访问用户': 2123, '下单率': 0.3 },
    //       { '日期': '1/4', '访问用户': 4123, '下单率': 0.4 },
    //       { '日期': '1/5', '访问用户': 3123, '下单率': 0.5 },
    //       { '日期': '1/6', '访问用户': 7123, '下单率': 0.6 }
    //     ]
    //   },
    //   settings: {
    //     area: true
    //   }
    // },
    // {
    //   name: '堆叠折线图',
    //   data: {
    //     columns: ['日期', '2015', '2016'],
    //     rows: [
    //       { '日期': '1/1', '2015': 100, '2016': 40 },
    //       { '日期': '1/2', '2015': 110, '2016': 60 },
    //       { '日期': '1/3', '2015': 140, '2016': 10 },
    //       { '日期': '1/4', '2015': 260, '2016': 30 },
    //       { '日期': '1/5', '2015': 300, '2016': 20 },
    //       { '日期': '1/6', '2015': 380, '2016': 70 }
    //     ]
    //   },
    //   settings: {
    //     stack: {
    //       '年份': ['2015', '2016']
    //     }
    //   }
    // }
  ]
}
