### Start

#### Import v-charts

##### Fully import

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

##### On demand

Each chart component of v-charts is individually packaged under the `lib` folder

```
|- lib/
    |- line.js  -------------- Line Chart
```

When used, a single chart component can be directly import into the project.

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
