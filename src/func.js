
/**
 * @description
 * 计时器-浏览器进程切后台后，去除进程暂停时间
 * @param {number} time 倒计时时长，单位秒
 * @param {number} point 倒计时间隔
 * @param {function} func 倒计时执行函数
 * @param {function} timeOverFunc 倒计时结束执行函数
 * @returns {TimeOut} 倒计时唯一标识
 * @example
 * Utils.watchTimeInterval(10, 1000, () => {}, () => {})
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
            func && func();
            _time--
        } else {
            interval && clearInterval(interval)
            timeOverFunc && timeOverFunc();
        }
    }, point)
    return interval
}


/**
 * @description
 * 获取链接的参数，返回对象格式
 * @export
 * @param {string} [search=location.search] 链接中的 search 部分，若不传，则默认取当前页面链接 location.search
 * @returns {object} 返回键值对
 * @example
 * Utils.searchParams("?q=js&qs=n")
 * // => { q: 'js', qs: 'n' }
 */
export function searchParams(search) {
    /* istanbul ignore if */
    if (!search) {
        search = location.search
    }
    const param = {};
    search.replace(/([^=?&]*)=([^&]*)/g, function (e, t, o) {
        param[decodeURIComponent(t)] = decodeURIComponent(o);
    });
    return param
}

/**
 * @description
 * 判断是否是空对象
 * @export
 * @param {object} obj 需要判断的对象
 * @returns {boolean} 返回是否是空对象
 * @example
 * Utils.isEmptyObject({name:'x'})
 * // => false
 * Utils.isEmptyObject({})
 * // => true
 */
export function isEmptyObject(obj) {
    if (obj === null || typeof (obj) !== 'object') {
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
 * @param {object} obj 需要过滤的对象
 * @returns {object} 返回过滤后的对象，若是原始数据类型，则原对象返回
 * @example
 * Utils.filterEmptyVal({age: 0,sex: false,a: '',b: null})
 * // => {age: 0,sex: false}
 */
export function filterEmptyVal(obj) {
    if ( obj === null || typeof (obj) !== 'object') {
        return obj
    }
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
 * @param {object} data 需要转成字符串的对象
 * @param {string} [joinStr='&'] 连接符
 * @returns {string} 返回组成的字符串
 * @example
 * Utils.deepMakeObjToStr({name: 'xxx', age: 10})
 * // => name=xxx&age=10&
 */
export function deepMakeObjToStr(data, joinStr = '&') {
    if (data === null || typeof (data) !== 'object') {
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
 * 将秒数转换成  {day,hour,minute,second} 对象
 * 常用于倒计时显示
 * @export
 * @param {number|string} seconds 秒数
 * @returns { {day:day,hour,minute,second }} 倒计时对象
 * @example
 * Utils.secondToTime(60 * 60 * 24 + 1)
 * // => {day: 1, hour: 0, minute: 0, second: 1}
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
    const second = seconds - daySecond - hour * 60 * 60 - minute * 60;
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
 * @param {*} obj1 需要比较的对象
 * @param {*} obj2 需要比较的对象
 * @returns {boolean} 返回是否相对
 * @example
 * Utils.isEqual({name:'xx'},{name:'xx'})
 * // => true
 * Utils.isEqual({name:'xx',age:10},{name:'xx'.age:11})
 * // => false
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
            let re = isEqual(obj1[attr], obj2[attr]);
            if(!re) return false;
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
 * @param {Array<*>} array 需要去重的数组
 * @returns {Array<*>} 返回去重后的数组
 * @example
 * Utils.uniqueArray([{name:'a'},{name:'a'},{name:'b'},1,1,2])
 * // => [{name:'a'},{name:'b'},1,2]
 */
export function uniqueArray(array) {
    if(!Array.isArray(array)){
        console.warn('obj should be array')
        return
    }
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
 * @returns {Promise} Promise
 * @example
 * Utils.sleep(1000)
 */
export function sleep(time) {
    return new Promise(res => setTimeout(res, time))
}
