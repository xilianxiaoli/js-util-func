
/**
 * @description
 * 过滤字符串中的表情和前后空格
 * @export
 * @param {string} str 需要过滤的字符串
 * @returns {string} 返回过滤后的字符串
 * @example
 * Utils.filterEmojiAndSpace('  aa  ')
 * // => 'aa'
 */
export function filterEmojiAndSpace(str) {
    const emojiReg = /\w*(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]\w*/g;
    return str.replace(emojiReg, '');
}

/**
 * @description
 * 过滤字符串前后空格
 * @export
 * @param {string} str 需要过滤的字符串
 * @returns {string} 返回过滤后的字符串
 * @example
 * Utils.trim('  sdfsd  ');
 * // => 'sdfsd'
 */
export function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * @description
 * 翻转字符串
 * @export
 * @param {string} str 需要翻转的字符串 
 * @returns {string} 返回翻转后的字符串
 * @example
 * Utils.reversString('abc')
 * // => 'cba'
 */
export function reversString(str) {
    if (typeof (str) !== 'string') {
        console.warn('reversString should be string')
        return str
    }
    let re = '';
    for (const iterator of str) {
        re = iterator + re;
    }
    return re;
}

/**
 * @description
 * 生成随机字符串，字符包括大小写字母和数字
 * @export
 * @param {number|string} len 生成的字符串长度
 * @returns {string} 返回随机字符串
 * @example
 * Utils.genRandomStr(5)
 * // => 'abcdf' 随机字符串
 */
export function genRandomStr(len) {
    len = Number(len)
    if (!len) {
        return '';
    }
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}