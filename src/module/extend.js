import { isArray, isObject } from '../utils'
export default function setExtendOptions (options, extend) {
  // extend sub attribute
  Object.keys(extend).forEach(attr => {
    if (typeof extend[attr] === 'function') {
      // get callback value
      options[attr] = extend[attr](options[attr])
    } else {
      // mixin extend value
      if (isArray(options[attr]) && isObject(options[attr][0])) {
        // eg: [{ xx: 1 }, { xx: 2 }]
        options[attr].forEach((option, index) => {
          options[attr][index] = Object.assign({}, option, extend[attr])
        })
      } else if (isObject(options[attr])) {
        // eg: { xx: 1, yy: 2 }
        options[attr] = Object.assign({}, options[attr], extend[attr])
      } else {
        options[attr] = extend[attr]
      }
    }
  })
}
