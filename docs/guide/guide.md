### 开始使用

#### 简单折线图

<Chart name="guide" />

#### 设置数据格式

<Chart name="guide" />

| Tables        | Are           | Cool  |  x |
| ------------- |:-------------:|:-----:|:--:|
| col 3 is      | right-aligned | $16awehaskdjhalksjdhalkjdhsakjdhas00 |  q  |
| col 2 is      | centeraasdhakjdhakjsdhklsahdakjshdlakjshdkljahsdkjhasdkjahskded      |   $12 |  q  |
| zebra stripes | are neat      |    $1 |   q |

<script>
CHART_CODE = {
  guide: {
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
              columns: ['日期', '成本', '利润', '占比', '其他'],
              rows: [
                { '成本': 1523, '日期': '1月1日', '利润': 1523, '占比': 0.12, '其他': 100 },
                { '成本': 1223, '日期': '1月2日', '利润': 1523, '占比': 0.345, '其他': 100 },
                { '成本': 2123, '日期': '1月3日', '利润': 1523, '占比': 0.7, '其他': 100 },
                { '成本': 4123, '日期': '1月4日', '利润': 1523, '占比': 0.31, '其他': 100 },
                { '成本': 3123, '日期': '1月5日', '利润': 1523, '占比': 0.12, '其他': 100 },
                { '成本': 7123, '日期': '1月6日', '利润': 1523, '占比': 0.65, '其他': 100 }
              ]
            }
          }
        },
        components: { VeLine }
      }
      <\/script>
    `,
    post: {
      html: `
        <div id="app">
          <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </div>
      `,
      js: `
        new Vue({
          el: '#app',
          data () {
            this.chartSettings = {}
            return {
              chartData: {
                columns: ['日期', '成本', '利润', '占比', '其他'],
                rows: [
                  { '成本': 1523, '日期': '1月1日', '利润': 1523, '占比': 0.12, '其他': 100 },
                  { '成本': 1223, '日期': '1月2日', '利润': 1523, '占比': 0.345, '其他': 100 },
                  { '成本': 2123, '日期': '1月3日', '利润': 1523, '占比': 0.7, '其他': 100 },
                  { '成本': 4123, '日期': '1月4日', '利润': 1523, '占比': 0.31, '其他': 100 },
                  { '成本': 3123, '日期': '1月5日', '利润': 1523, '占比': 0.12, '其他': 100 },
                  { '成本': 7123, '日期': '1月6日', '利润': 1523, '占比': 0.65, '其他': 100 }
                ]
              }
            }
          }
        })
      `
    }
  },
  dataType: {
    code: `
      <template>
        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
      </template>
      <script>
      export default {
        data () {
          this.chartSettings = {
            yAxisTye: ['0.0a']
          }
          return {
            chartData: {
              columns: ['日期', '成本', '利润', '占比', '其他'],
              rows: [
                { '成本': 1523, '日期': '1月1日', '利润': 1523, '占比': 0.12, '其他': 100 },
                { '成本': 1223, '日期': '1月2日', '利润': 1523, '占比': 0.345, '其他': 100 },
                { '成本': 2123, '日期': '1月3日', '利润': 1523, '占比': 0.7, '其他': 100 },
                { '成本': 4123, '日期': '1月4日', '利润': 1523, '占比': 0.31, '其他': 100 },
                { '成本': 3123, '日期': '1月5日', '利润': 1523, '占比': 0.12, '其他': 100 },
                { '成本': 7123, '日期': '1月6日', '利润': 1523, '占比': 0.65, '其他': 100 }
              ]
            }
          }
        },
        components: { VeLine }
      }
      <\/script>
    `,
    post: {
      html: `
        <div id="app">
          <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </div>
      `,
      js: `
        new Vue({
          el: '#app',
          data () {
            this.chartSettings = {
              yAxisTye: ['0.0a']
            }
            return {
              chartData: {
                columns: ['日期', '成本', '利润', '占比', '其他'],
                rows: [
                  { '成本': 1523, '日期': '1月1日', '利润': 1523, '占比': 0.12, '其他': 100 },
                  { '成本': 1223, '日期': '1月2日', '利润': 1523, '占比': 0.345, '其他': 100 },
                  { '成本': 2123, '日期': '1月3日', '利润': 1523, '占比': 0.7, '其他': 100 },
                  { '成本': 4123, '日期': '1月4日', '利润': 1523, '占比': 0.31, '其他': 100 },
                  { '成本': 3123, '日期': '1月5日', '利润': 1523, '占比': 0.12, '其他': 100 },
                  { '成本': 7123, '日期': '1月6日', '利润': 1523, '占比': 0.65, '其他': 100 }
                ]
              }
            }
          }
        })
      `
    }
  }
}

</script>

