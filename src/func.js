
/**
 * @description
 * 计时器-浏览器进程切后台后，去除进程暂停时间
 * @param {*} time 倒计时时长
 * @param {*} point 倒计时间隔
 * @param {*} func 倒计时执行函数
 * @param {*} timeOverFunc 倒计时结束执行函数
 * @memberof Purchase
 */
export function watchTimeInterval(time, point, func, timeOverFunc) {
    let _time = time;
    let startTime = new Date().valueOf();
    let interval = setInterval(() => {
        let gap = Math.floor((new Date().valueOf() - startTime - point) / 1000);
        if (gap < 0) {
            gap = 0;
        }
        _time = _time - gap;
        startTime = new Date().valueOf();
        if (_time > 0) {
            func();
            _time--
        } else {
            interval && clearInterval(interval)
            timeOverFunc();
        }
    }, point)
    return interval
}

/**
 * @description
 * 获取 cookie 
 * @export
 * @param {string} name
 * @returns {string | null}
 */
export function getCookie(name) {
    const arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
    if (arr !== null) {
        return decodeURIComponent(arr[2]);
    }
    return null;
}

/**
 * @description
 * 设置 cookie
 * @export
 * @param {string} name 
 * @param {string | number | boolean} value
 * @param {number} [expiresDay=0] 有效天数，默认为0，会话cookie
 * @param {string} path
 * @returns {void}
 */
export function setCookie(name, value, expiresDay = 0, path) {
    let expStr = '';
    if (expiresDay !== 0) {
        const exp = new Date();
        exp.setTime(exp.getTime() + expiresDay * 24 * 60 * 60 * 1000);
        expStr = ';expires=' + exp.toUTCString();
    }
    let pathStr = '';
    if (path) {
        pathStr = ';path=' + path;
    }
    document.cookie = name + '=' + encodeURIComponent(value) + pathStr + expStr;
}

/**
 * @description
 * 删除 cookie
 * @export
 * @param {string} name
 * @returns {void}
 */
export function delCookie(name) {
    setCookie(name, '', -1);
}

/**
 * @description
 * 获取链接的参数，返回对象格式
 * @export
 * @returns {object}
 */
export function searchParams() {
    const param = {};
    location.search.replace(/([^=?&]*)=([^&]*)/g, function (e, t, o) {
        param[decodeURIComponent(t)] = decodeURIComponent(o);
    });
    return param
}

/**
 * @description
 * 判断是否是空对象
 * @export
 * @param {*} obj
 * @returns {boolean}
 */
export function isEmptyObject(obj) {
    if (typeof (obj) !== 'object') {
        return false;
    }
    let t;

    for (t in obj) {
        if (obj = obj.hasOwnProperty(t)) {
            return false;
        }
    }
    return true;
}

/**
 * @description
 * 将对象中的值为空字符串、null、undefined 的值过滤掉
 * @export
 * @param {object} obj
 * @returns {object}
 */
export function filterEmptyVal(obj) {
    let filter = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            if (typeof (element) === 'object' && element !== null ) {
                filter[key] = filterEmptyVal(element)
            }else if(element === 0 || typeof (element) === 'boolean' || element){
                filter[key] = element;
            }
        }
    }
    return filter;
}

/**
 * @description
 * 将对象的 key 和 value 通过连接符拼接成字符串，注：字符串将以连接符结尾
 * @export
 * @param {object} data
 * @param {string} [joinStr='&']
 * @returns {string}
 */
export function deepMakeObjToStr(data,joinStr='&') {
    if (typeof (data) !== 'object') {
        return data;
    }
    let combineStr = '';

    for (const item in data) {
        if (data.hasOwnProperty(item)) {
            const val = data[item];
            if (typeof (val) !== 'object') {
                if (val !== undefined && val !== null) {
                    combineStr += `${item}=${val}${joinStr}`;
                    if (Object.keys(data).length === 1) {
                        return `${item}=${val}${joinStr}`;
                    }
                }
            } else {
                if (val instanceof Array && val.length === 0) {
                    continue;
                }
                combineStr += `${item}=${deepMakeObjToStr(val)}`;
            }
        }
    }

    return combineStr;
}