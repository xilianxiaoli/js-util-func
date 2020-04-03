// const { isEmptyObject } = require('../lib/number')
const { filterEmptyVal,isEmptyObject } = require('../lib/func')
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
console.log(filterEmptyVal(bb))

// name=xxx&age=10&sex=true&list=0=a=atext&b=12&c=false&d=0=1&1=2&2=3&3=4&4=5&5=last=last-text&list=0=99&1=88&1=a=atext&b=12&c=false&d=0=1&1=2&2=3&3=4&4=5&5=last=last-text&list=0=99&1=88&2=a=a=a=last-a&