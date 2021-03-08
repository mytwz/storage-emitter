declare class StorageEmitter {
    constructor();
    /**
     * 在当前页面绑定一个监听器
     * @param event
     * @param fn
     */
    on(event: string, fn: Function): this;
    /**
     * 关闭当前页面的指定监听器
     * @param event
     * @param fn
     */
    off(event: string, fn?: Function): this;
    /**
     * 关闭当前页面的所有监听器
     */
    offall(): this;
    /**
     * 在当前页面注册一次性的监听器
     * @param event
     * @param fn
     */
    once(event: string, fn: Function): this;
    /**
     * 触发自己以外的同源网页的监听事件
     * @param event
     * @param args
     */
    emit(event: string, ...args: any[]): this;
    /**
     * 触发所有的同源网页的监听事件
     * @param event
     * @param args
     */
    emits(event: string, ...args: any[]): this;
}
declare const _default: StorageEmitter;
export default _default;
