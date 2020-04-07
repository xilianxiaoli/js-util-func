
/**
 * @description
 * 获取 cookie 
 * @export
 * @param {string} name cookie的name
 * @returns {string | null} 返回查询到的字符串，若查询不到，则返回 null
 * @example
 * Utils.getCookie('name')
 * // => name_string
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
 * @param {string} name cookie的name
 * @param {string | number | boolean} value 需要设置的值
 * @param {number} [expiresDay=0] 有效天数，默认为0
 * @param {string} [path='/'] cookie path
 * @param {string} [domain=''] cookie domain
 * @returns {void}
 * @example
 * Utils.setCookie('name','name_string',1,'/page1','xx.xxx.com')
 * Utils.setCookie('name','name_string')
 */
export function setCookie(name, value, expiresDay = 0, path = '/', domain = '') {
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
    let domainStr = ''
    if (domain) {
        domainStr = '; domain=' + domain
    }
    document.cookie = name + '=' + encodeURIComponent(value) + pathStr + expStr + domainStr;
}

/**
 * @description
 * 删除 cookie
 * @export
 * @param {string} name cookie name
 * @param {string} [path='/'] cookie path
 * @param {string} [domain=''] cookie domain
 * @returns {void}
 * @example
 * Utils.delCookie('name','/','')
 */
export function delCookie(name, path = '/', domain = '') {
    setCookie(name, '', -1, path, domain);
}