const expect = require('chai').expect;
const Utils = require('../lib/index').default;

describe('func', function () {
    it('计时器-浏览器进程切后台后，去除进程暂停时间 watchTimeInterval', done => {
        let i = 0
        Utils.watchTimeInterval(5*1000, 1000, () => {
            i++
        }, () => {
            expect(i).to.be.within(3, 4)
            done()
        })
        setTimeout(() => {
            let time = new Date().getTime();
            for (; ;) {
                let current = new Date().getTime()
                if (current - time > 2 * 1000) {
                    break;
                }
            }
        }, 1000)
    })
    it('计时器-浏览器进程照常执行 watchTimeInterval', done => {
        let i = 0
        Utils.watchTimeInterval(5*1000, 1000, () => {
            i++
        }, () => {
            expect(i).to.be.equal(5)
            done()
        })
    })
    it('获取链接的参数，返回对象格式 searchParams', done => {
        expect(Utils.searchParams("?q=js&qs=n")).to.deep.equal({ q: 'js', qs: 'n' })
        done()
    })
    it('判断是否是空对象 isEmptyObject', done => {
        expect(Utils.isEmptyObject({})).to.be.true
        expect(Utils.isEmptyObject({ name: 'x' })).to.be.false
        expect(Utils.isEmptyObject(123)).to.be.false
        expect(Utils.isEmptyObject(true)).to.be.false
        expect(Utils.isEmptyObject('string')).to.be.false
        expect(Utils.isEmptyObject(null)).to.be.false
        expect(Utils.isEmptyObject(undefined)).to.be.false
        done()
    })
    it('将对象中的值为空字符串、null、undefined 的值过滤掉 filterEmptyVal', done => {
        let before = {
            name: 'xxx',
            age: 0,
            sex: false,
            a: '',
            b: null,
            c: undefined,
            f: {
                name: '333',
                d: ''
            }
        }
        let after = {
            name: 'xxx',
            age: 0,
            sex: false,
            f: {
                name: '333',
            }
        }
        expect(Utils.filterEmptyVal(before)).to.deep.equal(after);
        expect(Utils.filterEmptyVal(null)).to.be.equal(null)
        expect(Utils.filterEmptyVal(123)).to.be.equal(123)
        done()
    })
    it('将对象的 key 和 value 通过连接符拼接成字符串 deepMakeObjToStr', done => {
        let obj = {
            name: 'xxx',
            age: 10,
            sex: true,
            list: [
                { a: 'atext', b: 12, c: false, d: [1, 2, 3, 4, 5, { last: 'last-text', list: [99, 88] }] },
                { a: 'atext', b: 12, c: false, d: [1, 2, 3, 4, 5, { last: 'last-text', list: [99, 88] }] },
                { a: { a: { a: 'last-a' } } }
            ],
            emptyList:[]
        }
        let objStr = 'name=xxx&age=10&sex=true&list=0=a=atext&b=12&c=false&d=0=1&1=2&2=3&3=4&4=5&5=last=last-text&list=0=99&1=88&1=a=atext&b=12&c=false&d=0=1&1=2&2=3&3=4&4=5&5=last=last-text&list=0=99&1=88&2=a=a=a=last-a&'

        expect(Utils.deepMakeObjToStr(obj)).to.be.equal(objStr)
        expect(Utils.deepMakeObjToStr(null)).to.be.equal(null)
        expect(Utils.deepMakeObjToStr(true)).to.be.equal(true)
        expect(Utils.deepMakeObjToStr('true')).to.be.equal('true')
        done()
    })
    it('将秒数转换成  {day,hour,minute,second} 对象 secondToTime', done => {
        expect(Utils.secondToTime(59)).to.deep.equal({day: 0, hour: 0, minute: 0, second: 59})
        expect(Utils.secondToTime(60)).to.deep.equal({day: 0, hour: 0, minute: 1, second: 0})
        expect(Utils.secondToTime(61)).to.deep.equal({day: 0, hour: 0, minute: 1, second: 1})
        expect(Utils.secondToTime(60 * 60)).to.deep.equal({day: 0, hour: 1, minute: 0, second: 0})
        expect(Utils.secondToTime(60 * 60 + 1)).to.deep.equal({day: 0, hour: 1, minute: 0, second: 1})
        expect(Utils.secondToTime(60 * 60 * 24 + 1)).to.deep.equal({day: 1, hour: 0, minute: 0, second: 1})
        expect(Utils.secondToTime(-1)).to.deep.equal({day: 0, hour: 0, minute: 0, second: 0})
        done()
    })
    it('比较两个对象是否相等 isEqual',done=>{
        let obj = {
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
        expect(Utils.isEqual(obj,obj1)).to.be.true;
        expect(Utils.isEqual(obj,obj2)).to.be.false;
        expect(Utils.isEqual(123,345)).to.be.false;
        expect(Utils.isEqual(true,true)).to.be.true;
        expect(Utils.isEqual({name:'xx'},{name:'xxx',age:10})).to.be.false;
        done()
    })
    it('数组去重，值包括基本类型和对象类型 uniqueArray',done=>{
        expect(Utils.uniqueArray([{name:'a'},{name:'a'},{name:'b'},1,1,2])).to.deep.equal([{name:'a'},{name:'b'},1,2])
        expect(Utils.uniqueArray([{name:'a',list:[1,2],f:false},{name:'a',list:[1,2],f:false},{name:'b'}])).to.deep.equal([{name:'a',list:[1,2],f:false},{name:'b'}])
        expect(Utils.uniqueArray([false,false,true,true,0,0,null,null,undefined,undefined])).to.deep.equal([false,true,0,null,undefined])
        expect(Utils.uniqueArray(123)).to.be.equal(undefined)
        done()
    })
    it('线程睡眠 sleep',done=>{
        let beginTime = new Date().getTime();
        Utils.sleep(1000).then(()=>{
            let time =  new Date().getTime() - beginTime;
            expect(time).to.be.within(1000, 1100)
        })
        done()
    })
})