
### 折线图

#### 简单折线图

<Chart name="en_line_simple" />

#### 设置数据格式

<Chart name="en_line_data_type" />

| 配置项 | 简介 | 类型 | 默认 |
| ----- | --- |:----:| --- |
| dimension | 维度 | String | `columns[0]` |
| metrics | 指标 | Array | columns exclude dimension |


<script>
en_line_simple = {
  code: `
    <template>
      <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    </template>
    <script>
    export default {
      data () {
        this.chartSettings = {}
        return {
          chartData: {
            columns: ['日期', '访问用户', '下单用户', '下单率'],
            rows: [
              { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
              { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
              { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
              { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
              { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
              { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
            ]
          }
        }
      }
    }
    <\/script>
  `
},
en_line_data_type = {
  code: `
    <template>
      <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    </template>
    <script>
    export default {
      data () {
        this.chartSettings = {
          yAxisType: ['0.[0]a']
        }
        return {
          chartData: {
            columns: ['日期', '访问用户', '下单用户', '下单率'],
            rows: [
              { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
              { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
              { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
              { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
              { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
              { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
            ]
          }
        }
      }
    }
    <\/script>
  `
}

</script>


