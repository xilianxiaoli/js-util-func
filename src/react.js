
/**
 * @description
 * 为了避免组件已经销毁，但异步函数还未结束导致的异常 [高阶组件]
 * @export
 * @param {object} targetComponent 执行组件
 * @returns {object} 执行组件
 * @example
 * InjectUnmount(targetComponent)
 */
export function InjectUnmount (targetComponent){
    let willUnmount = targetComponent.prototype.componentWillUnmount
    targetComponent.prototype.componentWillUnmount = function () {
        if (willUnmount) willUnmount.call(this, ...arguments);
        this.unmount = true;
     }
    let setState = targetComponent.prototype.setState
    targetComponent.prototype.setState = function () {
        if ( this.unmount ) return ;
        setState.call(this, ...arguments);
    }
    return targetComponent
}

/**
 * @description
 * 给组件预设props [高阶组件]
 * @param {object} defaultProps 预设参数
 * @returns {function(*): function(*=): *}
 * @example
 * withDefaultProps({...props})(Component)
 */
export function withDefaultProps (defaultProps) {
    return TargetComponent => props => <TargetComponent {...defaultProps} {...props}/>;
} 

/**
 * @description
 * 对props做预处理 [高阶组件]
 * @param {function} mapProps
 * @returns {function(*): function(*=): *}
 * @example
 * connectComponent(props => props.params)(Component);
 */
export function mapPropsComponent ( mapProps) {
    return TargetComponent => props => <TargetComponent {...mapProps(props)} />;
} 

/**
 * @description
 * 异步方法封装成 effect 方法，简化redux中的编码
 * @param {*} func 异步函数
 * @returns {Generator} 生成器函数
 * @example
 * const fetch = ()=>{...}
 * getEffectFunc(fetch)
 */
 export function getEffectFunc(func) {
    return function* effect({payload, callback, errorCallback}, {call}) {
        try {
            const resp = yield call(func, payload);
            if (callback) callback(resp);
        } catch (e) {
            if (errorCallback) errorCallback();
        }
    };
}