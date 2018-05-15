import cloneDeep from 'lodash/cloneDeep'
import numeral from 'numeral'

export const getStackMap = (stack) => {
  const stackMap = {}
  Object.keys(stack).forEach(item => {
    stack[item].forEach(name => {
      stackMap[name] = item
    })
  })
  return stackMap
}

export const $get = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send(null)
    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText))
    }
    xhr.onerror = () => {
      reject(JSON.parse(xhr.responseText))
    }
  })
}

const mapPromise = {}

export const getMapJSON = ({
  position,
  positionJsonLink,
  beforeRegisterMapOnce,
  mapURLProfix
}) => {
  const link = positionJsonLink || `${mapURLProfix}${position}.json`
  if (!mapPromise[link]) {
    mapPromise[link] = $get(link).then(res => {
      if (beforeRegisterMapOnce) res = beforeRegisterMapOnce(res)
      return res
    })
  }
  return mapPromise[link]
}

let bmapPromise = null
let amapPromise = null

export const getBmap = (key, v) => {
  if (!bmapPromise) {
    bmapPromise = new Promise((resolve, reject) => {
      const callbackName = `bmap${Date.now()}`
      window[callbackName] = resolve
      const script = document.createElement('script')
      script.src = [
        `https://api.map.baidu.com/api?v=${v || '2.0'}`,
        `ak=${key}`,
        `callback=${callbackName}`
      ].join('&')

      document.body.appendChild(script)
    })
  }
  return bmapPromise
}

export const getAmap = (key, v) => {
  if (!amapPromise) {
    amapPromise = new Promise((resolve, reject) => {
      const callbackName = `amap${Date.now()}`
      window[callbackName] = resolve
      const script = document.createElement('script')
      script.src = [
        `https://webapi.amap.com/maps?v=${v || '1.4.3'}`,
        `key=${key}`,
        `callback=${callbackName}`
      ].join('&')

      document.body.appendChild(script)
    })
  }
  return amapPromise
}

export const getType = v => Object.prototype.toString.call(v)

export const toKebab = v => v.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

export const isArray = v => getType(v) === '[object Array]'

export const isObject = v => getType(v) === '[object Object]'

export const isFunction = v => typeof v === 'function'

export const getFnAndObjValue = (target, key) => {
  return isFunction(target)
    ? target(key)
    : !isObject(target)
      ? key
      : target[key] != null
        ? target[key]
        : key
}

export const getFormat = (v, format, defaultValue = '-') => {
  if (v == null) return defaultValue
  return format ? numeral(v).format(format) : v
}

export const arrDelItem = (arr, item) => {
  const result = cloneDeep(arr)
  const index = arr.indexOf(item)
  result.splice(index, 1)
  return result
}

export const arrDelArrItem = (arr, diffArr) => {
  return arr.filter(item => !~diffArr.indexOf(item))
}

export const optionsAddAttr = (obj, target, item) => {
  if (!target) return
  if (isObject(target)) {
    Object.keys(target).forEach(key => {
      optionsAddAttr(obj, key, target[key])
    })
    return
  }
  if (obj[target] && isArray(obj[target])) {
    if (isArray(item)) {
      obj[target] = obj[target].concat(item)
    } else {
      obj[target].push(item)
    }
  } else {
    if (isArray(item)) {
      obj[target] = item
    } else {
      obj[target] = [item]
    }
  }
}
