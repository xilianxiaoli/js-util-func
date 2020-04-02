
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
 * @param {*} num
 * @param {*} length
 * @returns
 */
export function floatAddZero(num, length) {
    const pointNum = String(num).split('.')[1];
    let s = ''
    if(pointNum){
        let add = length - pointNum.length;
        if (add > 0) {
            s = new Array(add).fill(0).join('')
        }
    }else{
        s= '.'+new Array(length).fill(0).join('')
    }
    return num + s;
}