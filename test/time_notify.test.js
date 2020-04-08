const expect = require('chai').expect;
const Utils = require('../lib/index').default;

describe('time_notify', function () {
    it('多个定时间校准', done => {
        let re = 0;
        class Plan {
            constructor(i, time) {
                this.time = time;
            }
            run({ leftCountdownTime }) {
                if (leftCountdownTime > 0) {re++}
            }
            getTime() {return this.time}
        }
        const suspendTimeNotify = new Utils.SuspendTimeNotify({ intervalPoint: 1000 });
        for (let i = 1; i < 3; i++) {
            const plan = new Plan(i, 5 * 1000)
            const ob = new Utils.SuspendTimeObserve(plan, plan.getTime())
            suspendTimeNotify.attach(ob)
        }
        suspendTimeNotify.start()
        setTimeout(()=>{
            suspendTimeNotify.stop()
            expect(re).to.be.equal(8)
            done()
        },6000)
    })
    it('多个定时间校准-默认时间间隔', done => {
        let re = 0;
        class Plan {
            constructor(i, time) {
                this.time = time;
            }
            run({ leftCountdownTime }) {
                if (leftCountdownTime <= 0) {re++}
            }
            getTime() {return this.time}
        }
        const suspendTimeNotify = new Utils.SuspendTimeNotify();
        for (let i = 1; i < 3; i++) {
            const plan = new Plan(i, 3 * 1000)
            const ob = new Utils.SuspendTimeObserve(plan, plan.getTime())
            suspendTimeNotify.attach(ob)
        }
        suspendTimeNotify.start()
        setTimeout(()=>{
            suspendTimeNotify.stop()
            expect(re).to.be.equal(2)
            done()
        },3800)
    })
})