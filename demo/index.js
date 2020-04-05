// const { isEmptyObject } = require('../lib/number')
const { filterEmptyVal,isEmptyObject,isEqual,uniqueArray } = require('../lib/func')
const {moneyUppercase,splitPoint,toFixed}  = require('../lib/number') 
const {filterEmojiAndSpace,genRandomStr}  = require('../lib/string') 
let aa = {
    name: 'xxx',
    age: 10,
    sex: true,
    list: [
        { a: 'atext',b:12,c:false,d:[1,2,3,4,5,{last:'last-text',list:[99,88]}] },
        { a: 'atext',b:12,c:false,d:[1,2,3,4,5,{last:'last-text',list:[99,88]}] },
        {a:{a:{a:'last-a'}}}
    ]
}
let bb = {
    name:'xxx',
    age:0,
    sex:false,
    a:'',
    b:null,
    c:undefined,
    f:{
        name:'333',
        d:''
    }
}
// let bb = {
//     name:'xxx',
//     age:0,
//     sex:false,
//     f:{
//         name:'333',
//     }
// }
// console.log(filterEmptyVal(bb))

// name=xxx&age=10&sex=true&list=0=a=atext&b=12&c=false&d=0=1&1=2&2=3&3=4&4=5&5=last=last-text&list=0=99&1=88&1=a=atext&b=12&c=false&d=0=1&1=2&2=3&3=4&4=5&5=last=last-text&list=0=99&1=88&2=a=a=a=last-a&

let e1 = {
    name:'xxx',
    age:0,
    sex:false,
    a:'',
    b:null,
    c:undefined,
    f:{
        name:'333',
        d:''
    }
}
let e2 = {
    name:'xxx',
    age:0,
    sex:false,
    a:'',
    b:null,
    c:undefined,
    f:{
        name:'333',
        d:[]
    }
}
console.log(isEqual(e1,e2))


// console.log(uniqueArray(
//     [{name:'a'},{name:'a'},{name:'b'},1,1,2]
// ))

// console.log(moneyUppercase('1234.444'))

// const all = require('../lib/index').default
// console.log(all)


console.log(genRandomStr(3))
console.log(filterEmojiAndSpace('aa  '))