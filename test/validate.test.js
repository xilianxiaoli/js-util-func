const expect = require('chai').expect;
const Utils = require('../lib/index').default;

describe('func', function () {
    it('验证手机号是否合法 isPhoneNumber',done=>{
        expect(Utils.isPhoneNumber('18512344321')).to.be.true;
        expect(Utils.isPhoneNumber(18512344321)).to.be.true;
        expect(Utils.isPhoneNumber(11012344321)).to.be.true;
        expect(Utils.isPhoneNumber(1851234432)).to.be.false;
        expect(Utils.isPhoneNumber(185123443211)).to.be.false;
        expect(Utils.isPhoneNumber(20012344321)).to.be.false;
        expect(Utils.isPhoneNumber("1001234432x")).to.be.false;
        done()
    })
    it('判断平台是否是iOS isiOS',done=>{
        expect(Utils.isiOS('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1')).to.be.true;
        expect(Utils.isiOS('Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1')).to.be.true;
        expect(Utils.isiOS('Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Mobile Safari/537.36')).to.be.false;
        expect(Utils.isiOS('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36')).to.be.false;
        done()
    })
    it('判断平台是否是安卓 isAndroid',done=>{
        expect(Utils.isAndroid('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1')).to.be.false;
        expect(Utils.isAndroid('Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1')).to.be.false;
        expect(Utils.isAndroid('Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Mobile Safari/537.36')).to.be.true;
        expect(Utils.isAndroid('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36')).to.be.false;
        done()
    })
    it('判断平台是否是微信 isWechat',done=>{
        expect(Utils.isWechat('Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1')).to.be.false;
        expect(Utils.isWechat('Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.3 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1 MicroMessenger/7.0.4 Language/zh_CN webview/15862284440296316')).to.be.true;
        done()
    })
    it('是否是对象类型 isObject',done=>{
        expect(Utils.isObject({})).to.be.true;
        expect(Utils.isObject()).to.be.false;
        expect(Utils.isObject(null)).to.be.false;
        expect(Utils.isObject(123)).to.be.false;
        expect(Utils.isObject('123')).to.be.false;
        done()
    })
    it('是否是邮箱格式 isEmail',done=>{
        expect(Utils.isEmail('lama.loca.loca123@inca.com')).to.be.true
        expect(Utils.isEmail('pio_pio@factory.com')).to.be.true
        expect(Utils.isEmail('testmail@mail.com.de')).to.be.true
        expect(Utils.isEmail('carnival666@hellmail.com')).to.be.true
        expect(Utils.isEmail(' testmail@mail.com')).to.be.false
        expect(Utils.isEmail('testmail@mail.com.')).to.be.false
        expect(Utils.isEmail('testm ail@mail.com')).to.be.false
        done()
    })
    it('判断目标值是否是 Null isNull',done=>{
        expect(Utils.isNull({})).to.be.false;
        expect(Utils.isNull()).to.be.false;
        expect(Utils.isNull(null)).to.be.true;
        expect(Utils.isNull(123)).to.be.false;
        expect(Utils.isNull('123')).to.be.false;
        done()
    })
})