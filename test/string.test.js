const expect = require('chai').expect;
const Utils = require('../lib/index').default;

describe('string', function () {
    it('过滤字符串中的表情和空格 filterEmojiAndSpace', done => {
        expect(Utils.filterEmojiAndSpace('aa')).to.be.equal('aa')
        done()
    })
    it('过滤字符串前后空格 trim', done => {
        expect(Utils.trim('aa')).to.be.equal('aa')
        expect(Utils.trim('  aa')).to.be.equal('aa')
        expect(Utils.trim('aa  ')).to.be.equal('aa')
        expect(Utils.trim('  aa  ')).to.be.equal('aa')
        expect(Utils.trim('a a')).to.be.equal('a a')
        done()
    })
    it('翻转字符串 reversString', done => {
        expect(Utils.reversString('abc')).to.be.equal('cba')
        expect(Utils.reversString('')).to.be.equal('')
        expect(Utils.reversString(123)).to.be.equal(123)
        done()
    })
    it('生成随机字符串 genRandomStr', done => {
        expect(Utils.genRandomStr('5')).to.be.length(5)
        expect(Utils.genRandomStr(5)).to.be.length(5)
        expect(Utils.genRandomStr(0)).to.be.length(0)
        expect(Utils.genRandomStr('')).to.be.length(0)
        done()
    })
})