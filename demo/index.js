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
console.log(isEmptyObject(undefined))
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
    },
    list:[
        {name:'xx',list:[0,1,2]},
        false,
        123
    ]
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

let obj1 = {
    name:'xxx',
    age:0,
    sex:false,
    a:'',
    b:null,
    c:undefined,
    f:{
        name:'333',
        d:''
    },
    list:[
        {name:'xx',list:[0,1,2]},
        false,
        123
    ]
}
let obj2 = {
    name:'xxx',
    age:0,
    sex:false,
    a:'',
    b:null,
    c:undefined,
    f:{
        name:'333',
        d:''
    },
    list:[
        {name:'xx',list:[0,1,4]},
        false,
        123
    ]
}
console.log('----------------')
console.log(isEqual(obj1,obj2))


console.log(uniqueArray(
    [{name:'a'},{name:'a'},{name:'b'},1,1,2]
))

// console.log(moneyUppercase('1234.444'))

// const all = require('../lib/index').default
// console.log(all)


console.log(genRandomStr(3))
console.log(filterEmojiAndSpace('  aa  '))

const {watchTimeInterval,sleep,secondToTime}  = require('../lib/func') 
// let i =0
// watchTimeInterval(30,1000,()=>{
//     console.log(i)
//     i++
// },()=>{
            
// })
// setTimeout(()=>{
//     let time = new Date().getTime();
//     console.log('begin')
//     for(;;){
//         let current = new Date().getTime()
//         if(current - time > 10*1000){
//             break;
//         }
//     }
//     console.log('over')
// },10000)

console.log(secondToTime(59))
console.log(secondToTime(60))
console.log(secondToTime(61))
console.log(secondToTime(60*60))
console.log(secondToTime(60*60+1))
console.log(secondToTime(60*60*24+1))