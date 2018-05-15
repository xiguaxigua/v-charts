const rollup = require('rollup')
const vue = require('rollup-plugin-vue').default
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const eslint = require('rollup-plugin-eslint')
const uglify = require('rollup-plugin-uglify')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const alias = require('rollup-plugin-alias')
const commonjs = require('rollup-plugin-commonjs')
const path = require('path')

function resolvePath (dir) {
  return path.join(__dirname, '..', dir)
}

const componentInfo = require('../src/component-list')

let pkg = []
const pkgTypeList = [
  { type: 'cjs', min: false, suffix: '.common.js' },
  { type: 'cjs', min: true, suffix: '.common.min.js' },
  { type: 'umd', min: false, suffix: '.js' },
  { type: 'umd', min: true, suffix: '.min.js' }
]

pkgTypeList.forEach(({ type, min, suffix }) => {
  Object.keys(componentInfo).forEach(name => {
    const { src, dist } = componentInfo[name]
    pkg.push({
      min,
      type,
      suffix,
      globalName: name,
      src,
      dist
    })
  })
})

const addons = [
  {
    min: false,
    type: 'es',
    suffix: '.esm.js',
    globalName: '',
    src: 'src/index.es.js',
    dist: 'lib/index'
  }
]
pkg = pkg.concat(addons)

pkg.forEach(item => { rollupFn(item) })

function rollupFn (item) {
  const vueSettings = item.min
    ? { css: 'lib/style.min.css', postcss: [autoprefixer, cssnano] }
    : { css: 'lib/style.css', postcss: [autoprefixer] }

  const plugins = [
    eslint({
      throwError: true,
      exclude: 'node_modules/**'
    }),
    alias({
      resolve: ['.js', '.vue'],
      '@': resolvePath('src'),
      'packages': resolvePath('packages')
    }),
    vue(vueSettings),
    resolve({
      extensions: ['.js', '.vue']
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    })
  ]
  if (item.min) plugins.push(uglify())

  rollup.rollup({
    input: item.src,
    external: id => /^(echarts|numeral|lodash)/.test(id),
    plugins
  }).then(function (bundle) {
    const dest = item.dist + item.suffix

    bundle.write({
      format: item.type,
      name: item.globalName,
      globals: {
        'echarts/lib/echarts': 'echarts'
      },
      file: dest
    }).catch(e => {
      console.log(e)
      process.exit(1)
    })
  }).catch((e) => {
    console.log(e)
    process.exit(1)
  })
}
