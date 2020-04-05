import * as numberUtil from './number'
import * as cookieUtil from './cookie'
import * as funcUtil from './func'
import * as reactUtil from './react.jsx'
import * as stringUtil from './string'
import * as validateUtil from './validate'
// console.log(NumberUtil)
export default {
      ...numberUtil,
      ...cookieUtil,
      ...funcUtil,
      ...reactUtil,
      ...stringUtil,
      ...validateUtil,
}