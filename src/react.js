
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