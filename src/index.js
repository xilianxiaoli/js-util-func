import * as numberUtil from './number'
import * as cookieUtil from './cookie'
import * as funcUtil from './func'
import * as stringUtil from './string'
import * as validateUtil from './validate'
import * as reactUtil from './react.js'

let output = {
      ...numberUtil,
      ...cookieUtil,
      ...funcUtil,
      ...stringUtil,
      ...validateUtil,
}
if (process.env.NODE_ENV !== 'test') {
      output = {
            ...output,
            ...reactUtil
      }
}

export default {
      ...output
}