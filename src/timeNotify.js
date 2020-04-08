/**
 * @description
 * 为解决页面中同时存在多个倒计时的情况下，生成多个计时器导致计时出现偏差的问题。
 * 采用观察者模式，由一个定时器控制多个倒计时事件
 * @class SuspendTimeNotify
 */
class SuspendTimeNotify {
    /**
     * Creates an instance of SuspendTimeNotify.
     * @param {*} [ intervalPoint=200 ] intervalPoint:计时器执行的间隔时间
     * @memberof SuspendTimeNotify
     */
    constructor(params) {
        const {intervalPoint=200} = params || {}
        this._currentTime = Date.now();
        this._passTime = 0;
        this.observers = [];
        this._interval = null;
        this._intervalPoint = intervalPoint
    }
    /**
     * @description
     * 添加订阅者
     * @param {object} observer
     * @memberof SuspendTimeNotify
     */
    attach(observer) {
        let item = {
            key: `${this.observers.length}_key`,
            target: observer
        }
        this.observers.push(item);
    }
    /**
     * @description
     * 停止观察者的倒计时对象和情况订阅者
     * @memberof SuspendTimeNotify
     */
    stop() {
        this.observers = [];
        this._interval && clearInterval(this._interval)
    }
    /**
     * @description
     * 通知订阅者，订阅者通过 update 返回是否还继续订阅，若为 false ，则从订阅者队列中删除
     * @memberof SuspendTimeNotify
     */
    notifyObserver() {
        let deleteKeys = '';
        for (const { key, target } of this.observers) {
            let result = target.update(this._passTime);
            if (result) {
                deleteKeys += `${key},`
            }
        }
        if (deleteKeys) {
            this.observers = this.observers.filter(({ key }) => deleteKeys.indexOf(key) < 0)
        }
    }
    /**
     * @description
     * 启动倒计时
     * @memberof SuspendTimeNotify
     */
    start() {
        if (this._interval) {
            clearInterval(this._interval)
        }
        this._interval = setInterval(() => {
            let _nowTime = Date.now();
            this._passTime += _nowTime - this._currentTime;
            this._currentTime = _nowTime;
            this.notifyObserver();
        }, this._intervalPoint);
    }
}

/**
 * @description
 * 定时器订阅者
 * @class SuspendTimeObserve
 */
class SuspendTimeObserve {
    /**
     *Creates an instance of SuspendTimeObserve.
     * @param {object} item 业务对象，业务对象可通过 run 方法获取定时器执行回调
     * @param {number} countdownTime 需要倒计时的总时长，单位毫秒
     * @memberof SuspendTimeObserve
     */
    constructor(item, countdownTime) {
        this.item = item
        this.countdownTime = countdownTime
    }
    /**
     * @desc
     * 接收观察者的通知事件
     * @param {number} passTime 已经执行的时长，单位毫秒
     * @returns {boolean} 是否继续订阅
     * @memberof SuspendTimeObserve
     */
    update(passTime) {
        var leftCountdownTime = this.countdownTime - passTime;
        this.item.run && this.item.run({ leftCountdownTime, passTime });
        return leftCountdownTime <= 0;
    }
}

export {
    SuspendTimeNotify,
    SuspendTimeObserve
}