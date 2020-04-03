import NP from 'number-precision';

/**
 * @description
 * 金额千分化，可选择在格式化前可做四舍五入处理
 * @export
 * @param {string|number} money 金额
 * @param {number} [decimalLength=0] 需保留小数点位数
 * @returns {string}
 * @example
 * Utils.moneyThousandFormat(9999)
 * // => '9,999'
 * 
 * Utils.moneyThousandFormat(9999.355, 2)
 * // => '9,999.36'
 */
export function moneyThousandFormat(money, decimalLength = 0) {
    if (Number(money).toString().indexOf('.') > 0) {
        const formatText = decimalLength > 0 ? toFixed(money, decimalLength) : Number(money);
        const _list = formatText.toString().split('.');
        return _list[0].replace(/\B(?=(?:\S{3})+$)/g, ',') + '.' + _list[1];
    }
    return String(money).replace(/\B(?=(?:\S{3})+$)/g, ',');
}

/**
 * @description
 * 四舍五入
 * @export
 * @param {*} num
 * @param {number} [precision=0]
 * @returns {number}
 * @example
 * Utils.toFixed(1.2345, 2)
 * // => 1.23
 * 
 * Utils.toFixed(1.2355, 2)
 * // => 1.24
 */
export function toFixed(num, precision = 0) {
    return (Math.round((+num + 'e' + precision)) / Math.pow(10, precision));
}

/**
 * @description
 * 整数前补 0
 * eg: (123,4)=>0123
 * @export
 * @param {*} num 正整数
 * @param {number} [length=1] 补零后的长度
 * @returns
 */
export function numAddZero(num, length = 1) {
    const numLength = num.toString().length;
    if (num.toString().length < length) {
        return new Array(length - numLength).fill(0).join('') + num;
    }
    return num
}

/**
 * @description
 * 浮点数末尾补零
 * eg: (1.3,2)=>1.30
 * @export
 * @param {number|string} num
 * @param {number} length
 * @returns {string}
 */
export function floatAddZero(num, length = 0) {
    num = String(num)
    if (!length) {
        return num
    }
    const pointNum = num.split('.')[1];
    let s = ''
    if (pointNum) {
        let add = length - pointNum.length;
        if (add > 0) {
            s = new Array(add).fill(0).join('')
        }
    } else {
        s = '.' + new Array(length).fill(0).join('')
    }
    return num + s;
}

/**
 * @description
 * 保留小数点后n位，不进行四舍五入操作
 * @export
 * @param {string|number} val 数值
 * @param {string|number} length 保留的位数
 * @returns {string}
 */
export function splitPoint(val, length) {
    const reg = new RegExp(`^(\\d*\\.\\d{${length}}).*$`)
    return String(val).replace(reg, "$1");
}

/**
 * @description
 * 小数格式化成百分数
 * 可选参数 pointLength ，小数点后位数不足 pointLength 补 0
 * @export
 * @param {string|number} decimal
 * @param {number} [pointLength=0]
 * @returns {string}
 */
export function decimalToPercent(decimal, pointLength = 0) {
    if (Number(decimal) >= 1) {
        console.warn('数值需小于 1');
        return '' + decimal;
    }
    let rateStr = NP.times(decimal, 100);
    return floatAddZero(rateStr, pointLength)
}

/**
 * @description
 * 将秒数转换成  x天x小时x分
 * 常用于倒计时
 * @export
 * @param {number|string} seconds 秒数
 * @returns { day,hour,minute,second } 倒计时对象
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
