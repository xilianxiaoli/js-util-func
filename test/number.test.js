
// import chai  from 'chai';
// const expect = chai.expect;
// import Utils from '../index'
const expect = require('chai').expect;
const Utils = require('../lib/index').default;
console.log(Utils)
console.log(Utils.toFixed(1.2345, 2))

describe('xxx',function(){
    it('mmm',(done)=>{
        expect(Utils.toFixed(1.2345, 2)).to.equal(1.23)
        done()
    })
})