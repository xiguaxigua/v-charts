### 开始使用

{{ 1+1 }}

<ClientOnly>
  <chart name="guide"/>
</ClientOnly>


#### a例子

<script>
CHART_CODE = {
  guide: {
    code: {
      content: `
        <template>
          <div>Hello, {{ name }}!</div>
        </template>
        <script>
        module.exports = {
          data: function () {
            return { name: 'Vue' }
          }
        }
        <\/script>
      `
    },
    post: {
      html: `
        <div id="app">Hello, {{ name }}!</div>
      `,
      css: ``,
      js: `
        new Vue({
          el: '#app',
          data: function () {
            return { name: 'Vue' }
          }
        })
      `
    }
  }
}

</script>

