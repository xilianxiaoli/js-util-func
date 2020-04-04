
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
    it('四舍五入 toFixed',(done)=>{
        expect(Utils.toFixed('1.2345',2)).to.equal(1.23)
        expect(Utils.toFixed(1.2345,2)).to.equal(1.23)
        expect(Utils.toFixed(1.2355,2)).to.equal(1.24)
        expect(Utils.toFixed(1.23)).to.equal(1)
        expect(Utils.toFixed(1.23,-1)).to.equal(1.23)
        done()
    })
    it('数值前补零 numAddZero',(done)=>{
        expect(Utils.numAddZero('9',2)).to.equal('09')
        expect(Utils.numAddZero(9,2)).to.equal('09')
        expect(Utils.numAddZero(9,3)).to.equal('009')
        expect(Utils.numAddZero(9,1)).to.equal('9')
        expect(Utils.numAddZero(9,0)).to.equal('9')
        expect(Utils.numAddZero(9,-1)).to.equal('9')
        expect(Utils.numAddZero(9.9)).to.equal('9.9')
        expect(Utils.numAddZero(9.9,2)).to.equal('09.9')
        expect(Utils.numAddZero(-9.9,2)).to.equal('-09.9')
        done()
    })
    it('浮点数末尾补零 0 floatAddZero',(done)=>{
        expect(Utils.floatAddZero('1.2',2)).to.equal('1.20')
        expect(Utils.floatAddZero(1.2,2)).to.equal('1.20')
        expect(Utils.floatAddZero(1.2,1)).to.equal('1.2')
        expect(Utils.floatAddZero(1.2,0)).to.equal('1.2')
        expect(Utils.floatAddZero(1.2)).to.equal('1.2')
        expect(Utils.floatAddZero(-1.2,2)).to.equal('-1.20')
        expect(Utils.floatAddZero(1.234,2)).to.equal('1.234')
        expect(Utils.floatAddZero(1.234,2)).to.equal('1.234')
        done()
    })
    it('保留小数点后n位，不进行四舍五入操作 splitPoint',done=>{
        expect(Utils.splitPoint('1.235',2)).to.equal('1.23')
        expect(Utils.splitPoint(1.235,2)).to.equal('1.23')
        expect(Utils.splitPoint(1.234,1)).to.equal('1.2')
        expect(Utils.splitPoint(1.234,0)).to.equal('1')
        expect(Utils.splitPoint(1.234,-1)).to.equal('1.234')
        done()
    })
    it('小数格式化成百分数 decimalToPercent',done=>{
        expect(Utils.decimalToPercent('0.23')).to.equal('23')
        expect(Utils.decimalToPercent(0.23)).to.equal('23')
        expect(Utils.decimalToPercent(1.23)).to.equal('1.23')
        expect(Utils.decimalToPercent(0.234)).to.equal('23.4')
        expect(Utils.decimalToPercent(0.234,2)).to.equal('23.40')
        expect(Utils.decimalToPercent(0.234,1)).to.equal('23.4')
        done()
    })
    it('金额转大写 moneyUppercase',done=>{
        expect(Utils.moneyUppercase('1.2')).to.equal('壹元贰角')
        expect(Utils.moneyUppercase(1.2)).to.equal('壹元贰角')
        expect(Utils.moneyUppercase(1.20)).to.equal('壹元贰角')
        expect(Utils.moneyUppercase(999.99)).to.equal('玖佰玖拾玖元玖角玖分')
        expect(Utils.moneyUppercase(9999999999.99)).to.equal('玖拾玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖元玖角玖分')
        done()
    })
})