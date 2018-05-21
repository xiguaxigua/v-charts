### 开始使用

#### 引入 v-charts

##### 完整引入

```js
import Vue from 'vue'
import VCharts from 'v-charts-v2'
import App from './App.vue'

Vue.use(VCharts)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

##### 按需引入

v-charts 的每种图表组件，都以 umd 的格式打包到 lib 文件夹下

```
|- lib/
    |- line.js  -------------- 折线图
```

使用时，可以直接将单个图表引入到项目中

```js
import Vue from 'vue'
import VeLine from 'v-charts-v2/lib/line'
import App from './App.vue'

Vue.component(VeLine.name, VeLine)

new Vue({
  el: '#app',
  render: h => h(App)
})
```
