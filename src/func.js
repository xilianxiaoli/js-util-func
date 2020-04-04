
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
            if (typeof (element) === 'object' && element !== null) {
                filter[key] = filterEmptyVal(element)
            } else if (element === 0 || typeof (element) === 'boolean' || element) {
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
export function deepMakeObjToStr(data, joinStr = '&') {
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

/**
 * @description
 * 将秒数转换成  x天x小时x分
 * 常用于倒计时显示
 * @export
 * @param {number|string} seconds 秒数
 * @returns { {day:day,hour,minute,second }} 倒计时对象
 */
export function secondToTime(seconds) {
    seconds = Number(seconds)
    if (seconds < 0) {
        console.warn('seconds need more than 0');
        return
    }
    const day = Math.floor(seconds / (60 * 60 * 24));
    const daySecond = day * 60 * 60 * 24;
    const hour = Math.floor((seconds - daySecond) / (60 * 60));
    const minute = Math.floor((seconds - daySecond - hour * 60 * 60) / 60);
    const second = seconds - daySecond - minute * 60;
    return {
        day,
        hour,
        minute,
        second
    };
}

/**
 * @description
 * 比较两个对象是否相等
 * @export
 * @param {*} obj1
 * @param {*} obj2
 * @returns {boolean}
 */
export function isEqual(obj1, obj2) {
    const o1 = obj1 instanceof Object;
    const o2 = obj2 instanceof Object;
    if (!o1 || !o2) {
        return obj1 === obj2;
    }

    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }

    for (const attr of Object.keys(obj1)) {
        const t1 = obj1[attr] instanceof Object;
        const t2 = obj2[attr] instanceof Object;
        if (t1 && t2) {
            return isEqual(obj1[attr], obj2[attr]);
        } else if (obj1[attr] !== obj2[attr]) {
            return false;
        }
    }

    return true;
}

/**
 * @description
 * 数组去重，值包括基本类型和对象类型
 * @export
 * @param {[*]} array
 * @returns {[*]}
 */
export function uniqueArray(array) {
    const obj = {};
    return array.filter((item, index) => {
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true);
    });
}

/**
 * @description
 * 线程睡眠
 * @export
 * @param {number} time 失眠时间，单位毫秒
 * @returns {Promise}
 */
export function sleep (time) {
   return new Promise(res => setTimeout(res, time))
} 
    