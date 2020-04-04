
/**
 * @description
 * 验证手机号是否合法，为适应更多网络电话号段，不对号段做校验
 * @export
 * @param {string} phone
 * @returns {boolean}
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
 * 判断平台是否是 iOS
 * @export
 * @param {string} [ua=window.navigator.userAgent]
 * @returns {boolean}
 */
export function isiOS(ua) {
    if (!ua) {
        ua = window.navigator.userAgent;
    }
    return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

/**
 * @description
 * 判断平台是否是安卓
 * @export
 * @param {string} [ua=window.navigator.userAgent]
 * @returns {boolean}
 */
export function isAndroid(ua) {
    if (!ua) {
        ua = window.navigator.userAgent;
    }
    return -1 < ua.indexOf('Android') || -1 < ua.indexOf('Adr');
}

/**
 * @description
 * 是否是对象类型
 * @export
 * @param {*} obj
 * @returns {boolean}
 */
export function isObject(obj) {
    return Object.prototype.toString.apply(obj) === '[object Object]';
}

/**
 * @description
 * 是否是邮箱格式
 * @export
 * @param {string} email
 * @returns {boolean}
 */
export function isEmail(email) {
    let result = false;
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email) {
        result = emailReg.test(email);
    }
    return result;
}

/**
 * @description
 * 判断目标值是否是 Null
 * @export
 * @param {*} val 目标值
 * @returns {boolean}
 */
export function isNull(val) {
    if (!val && typeof (val) === 'object') {
        return true
    }
    return false
}