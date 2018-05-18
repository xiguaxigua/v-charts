
### Line

#### simple line

<Chart name="line_simple" />

#### set data format

<Chart name="line_data_type" />

#### settings

| attribute | description | type | default |
| ----- | --- |:----:| --- |
| dimension | dimension of chart data | String | columns[0] |
| metrics | metrics of chart data | Array | columns exclude dimension |

<script>
line_simple = {
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
            columns: ['date', 'UV', 'order', 'orderRate'],
            rows: [
              { 'date': '1/1', 'UV': 1393, 'order': 1093, 'orderRate': 0.32 },
              { 'date': '1/2', 'UV': 3530, 'order': 3230, 'orderRate': 0.26 },
              { 'date': '1/3', 'UV': 2923, 'order': 2623, 'orderRate': 0.76 },
              { 'date': '1/4', 'UV': 1723, 'order': 1423, 'orderRate': 0.49 },
              { 'date': '1/5', 'UV': 3792, 'order': 3492, 'orderRate': 0.323 },
              { 'date': '1/6', 'UV': 4593, 'order': 4293, 'orderRate': 0.78 }
            ]
          }
        }
      }
    }
    <\/script>
  `
},
line_data_type = {
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
            columns: ['date', 'UV', 'order', 'orderRate'],
            rows: [
              { 'date': '1/1', 'UV': 1393, 'order': 1093, 'orderRate': 0.32 },
              { 'date': '1/2', 'UV': 3530, 'order': 3230, 'orderRate': 0.26 },
              { 'date': '1/3', 'UV': 2923, 'order': 2623, 'orderRate': 0.76 },
              { 'date': '1/4', 'UV': 1723, 'order': 1423, 'orderRate': 0.49 },
              { 'date': '1/5', 'UV': 3792, 'order': 3492, 'orderRate': 0.323 },
              { 'date': '1/6', 'UV': 4593, 'order': 4293, 'orderRate': 0.78 }
            ]
          }
        }
      }
    }
    <\/script>
  `
}

</script>


