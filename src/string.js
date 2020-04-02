
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