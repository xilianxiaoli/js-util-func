
/**
 * @description
 * 过滤字符串中的表情和空格
 * @export
 * @category String
 * @param {*} str
 * @returns string
 */
export function filterEmojiAndSpace(str){
    const spaceReg = /\s+/;
    const emojiReg = /\w*(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]\w*/g;
    return str.replace(spaceReg, '').replace(emojiReg, '');
}

/**
 * @description
 * 过滤字符串前后空格
 * @export
 * @category String
 * @param {*} str
 * @returns string
 * @example
 * trim('  sdfsd  ');
 * return sdfsd
 */
export function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * @description
 * 翻转字符串
 * @export
 * @param {string} str
 * @returns {string}
 */
export function reversString(str){
    if(typeof(str) !== 'string'){
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
 * 生成随机字符串
 * @export
 * @param {*} len 生成的字符串长度
 * @returns {string}
 */
export function genRandomStr(len) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}