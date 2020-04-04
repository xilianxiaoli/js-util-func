
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