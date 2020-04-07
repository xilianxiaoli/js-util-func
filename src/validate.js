
/**
 * @description
 * 验证手机号是否合法，为适应更多网络电话号段，不对号段做校验，校验规则为：
 * 1.长度11位的数字 2.首位需为1 ，第二位为1到9之间的数值，其余位数为0到9间的数值
 * @export
 * @param {string|number} phone 需要校验的手机号
 * @returns {boolean} 返回检验结果
 * @example
 * Utils.isPhoneNumber('18512344321')
 * // => true
 * Utils.isPhoneNumber(20012344321)
 * // => false
 */
export function isPhoneNumber(phone) {
    let result = false;
    const phoneReg = /^(1[1-9][0-9])[0-9]{8}$/;

    if (phone) {
        result = phoneReg.test(phone);
    }
    return result;
}

/**
 * @description
 * 是否是邮箱格式
 * @export
 * @param {string} email 需要校验的邮箱字符串
 * @returns {boolean} 返回判断结果
 * @example
 * Utils.isEmail('lama.loca.loca123@inca.com')
 * // => true
 * Utils.isEmail('testmail@mail.com.')
 * // => false
 */
export function isEmail(email) {
    let result = false;
    const emailReg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

    if (email) {
        result = emailReg.test(email);
    }
    return result;
}

/**
 * @description
 * 判断平台是否是 iOS
 * @export
 * @param {string} [ua=window.navigator.userAgent] ua字符串
 * @returns {boolean} 返回判断结果
 * @example
 * Utils.isiOS('Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1')
 * // => true
 */
export function isiOS(ua) {
    /* istanbul ignore if */
    if (!ua) {
        ua = window.navigator.userAgent;
    }
    return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

/**
 * @description
 * 判断平台是否是安卓
 * @export
 * @param {string} [ua=window.navigator.userAgent] ua字符串
 * @returns {boolean} 返回判断结果
 * @example
 * Utils.isAndroid('Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Mobile Safari/537.36')
 * // => true
 */
export function isAndroid(ua) {
    /* istanbul ignore if */
    if (!ua) {
        ua = window.navigator.userAgent;
    }
    return -1 < ua.indexOf('Android') || -1 < ua.indexOf('Adr');
}

/**
 * @description
 * 判断平台是否是微信 
 * @export
 * @param {string} [ua=window.navigator.userAgent] ua字符串
 * @returns {boolean} 返回判断结果
 * @example
 * Utils.isWechat('Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.3 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1  MicroMessenger/7.0.4')
 * // => true
 */
export function isWechat(ua){
    /* istanbul ignore if */
    if (!ua) {
        ua = window.navigator.userAgent;
    }
    return /MicroMessenger/i.test(ua);
}

/**
 * @description
 * 是否是对象类型
 * @export
 * @param {*} obj 需要判断的值
 * @returns {boolean} 返回判断结果
 * @example
 * Utils.isObject({})
 * // => true
 * Utils.isObject(123)
 * // => false
 */
export function isObject(obj) {
    return Object.prototype.toString.apply(obj) === '[object Object]';
}


/**
 * @description
 * 判断值是否是 Null
 * @export
 * @param {*} val 需要判断的值
 * @returns {boolean} 返回判断结果
 * @example
 * Utils.isNull(null)
 * // => true
 * Utils.isNull(123)
 * // => false
 */
export function isNull(val) {
    if (!val && typeof (val) === 'object') {
        return true
    }
    return false
}