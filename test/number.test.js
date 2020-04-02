
const expect = require('chai').expect;
const Utils = require('../lib/index').default;

describe('number',function(){
    it('金额千分化 moneyThousandFormat',(done)=>{
        expect(Utils.moneyThousandFormat('9',0)).to.equal('9');
        expect(Utils.moneyThousandFormat(9)).to.equal('9');
        expect(Utils.moneyThousandFormat(99)).to.equal('99');
        expect(Utils.moneyThousandFormat(999)).to.equal('999');
        expect(Utils.moneyThousandFormat(9999)).to.equal('9,999');
        expect(Utils.moneyThousandFormat(9.355, 2)).to.equal('9.36');
        expect(Utils.moneyThousandFormat(99.355, 2)).to.equal('99.36');
        expect(Utils.moneyThousandFormat(9999.355, 2)).to.equal('9,999.36');
        done()
    })
})