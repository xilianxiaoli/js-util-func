import * as numberUtil from './number'
import * as cookieUtil from './cookie'
import * as funcUtil from './func'
import * as stringUtil from './string'
import * as validateUtil from './validate'
import * as reactUtil from './react.js'
import * as timeNotify from './timeNotify.js'

let output = {
      ...numberUtil,
      ...cookieUtil,
      ...funcUtil,
      ...stringUtil,
      ...validateUtil,
      ...reactUtil,
      ...timeNotify
}

export default {
      ...output
}