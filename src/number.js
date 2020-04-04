import NP from 'number-precision';

/**
 * @description
 * 金额千分化，可选择在格式化前可做四舍五入处理
 * @export
 * @param {string|number} money 需要格式化的金额
 * @param {number} [decimalLength=0] 需保留小数点位数
 * @returns {string} 返回格式化后的字符串
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
 * 四舍五入保留n位小数
 * @export
 * @param {string|number} num 需要四舍五入的数值
 * @param {number} [precision=0] 保留的小数位数，默认是 0
 * @returns {number} 返回四舍五入后的数值
 * @example
 * Utils.toFixed(1.2345, 2)
 * // => 1.23
 * 
 * Utils.toFixed(1.2355, 2)
 * // => 1.24
 */
export function toFixed(num, precision = 0) {
    if (precision < 0) {
        console.warn('precision greater than 0');
        return num;
    }
    return (Math.round((+num + 'e' + precision)) / Math.pow(10, precision));
}

/**
 * @description
 * 整数部分前置补零
 * eg: (123,4)=>0123
 * @export
 * @param {number|string} num 需要补0 的数值
 * @param {number} [length=1] 整数部分，补零后的长度，默认 1
 * @returns {string} 返回处理后的字符串
 * @example
 * Utils.numAddZero(9,2)
 * // => '09'
 * Utils.numAddZero(9.9,2)
 * // => '09.9'
 */
export function numAddZero(num, length = 1) {
    const numLength = String(Math.abs(num)).split('.')[0].toString().length;
    if (numLength < length) {
        let s = new Array(length - numLength).fill(0).join('') + Math.abs(num);
        if (Number(num) < 0) {
            s = '-' + s
        }
        return s;
    }
    return String(num)
}

/**
 * @description
 * 浮点数末尾补零
 * @export
 * @param {number|string} num 需要补0 的数值
 * @param {number} [length=0] 小数部分，补零后的长度，默认 1
 * @returns {string} 返回处理后的字符串
 * @example
 * Utils.floatAddZero(1.2,2)
 * // => '1.20'
 * Utils.floatAddZero(1.234,2)
 * // => '1.234'
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
 * @param {string|number} val 需要处理的数值
 * @param {string|number} length 保留的位数
 * @returns {string|number} 返回处理后的字符串
 * @example
 * Utils.splitPoint(1.235,2)
 * // => '1.23'
 * Utils.splitPoint(1.234,0)
 * // => '1'
 */
export function splitPoint(val, length) {
    if (length === 0) {
        return String(val).split('.')[0];
    }
    const reg = new RegExp(`^(\\d*\\.\\d{${length}}).*$`)
    return String(val).replace(reg, "$1");
}

/**
 * @description
 * 小数格式化成百分数
 * 可选参数 pointLength ，小数点后位数不足 pointLength 补 0
 * @export
 * @param {string|number} decimal 需要处理的小数
 * @param {number} [pointLength=0] 小数部分后补零后的长度
 * @returns {string} 百分值，不带 % 
 * @example
 * Utils.decimalToPercent(0.23)
 * // => '23'
 * Utils.decimalToPercent(0.234,2)
 * // => '23.40'
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
 * 金额转大写，最大单位亿，最小单位分
 * @export
 * @param {string|number} n 金额
 * @returns {string} 返回大写的金额字符串
 * @example
 * Utils.moneyUppercase(1.2)
 * // => '壹元贰角'
 */
export function moneyUppercase(n) {
    const fraction = ['角', '分'];
    const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    let num = Math.abs(n);
    let s = '';

    fraction.forEach((item, index) => {
        s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '');
    });
    s = s || '整';
    num = Math.floor(num);
    for (let i = 0; i < unit[0].length && num > 0; i += 1) {
        let p = '';

        for (let j = 0; j < unit[1].length && num > 0; j += 1) {
            p = digit[num % 10] + unit[1][j] + p;
            num = Math.floor(num / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }

    return s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
}
