
const EventName:string = "emitter&";
let callbacks:{ [event: string]: Function[] } = {};
function emit(this: any, event:string, ...args: any[]){
    var cbs = callbacks[event];
    if (cbs) {
        cbs = cbs.slice(0);
        for (var i = 0, len = cbs.length; i < len; ++i) {
            cbs[i].apply(this, args);
        }
    }
}

class StorageEmitter {
    constructor(){
        window.addEventListener("storage", (ev: StorageEvent) => {
            let key = ev.key + "", value = ev.newValue + "";
            if(/^emitter&/.test(key) && /^\[.*]$/.test(value)){
                try {
                    var event = key.replace(/^emitter&/, "");
                    var args = JSON.parse(value)
                    emit.call(this, event, ...args);
                } catch (error) {
                    
                }
                localStorage.setItem(key, Date.now()+"");
            }
        }, true);
    }

    /**
     * 在当前页面绑定一个监听器
     * @param event 
     * @param fn 
     */
    on(event: string, fn: Function) {
        (callbacks[event] = callbacks[event] || [] ).push(fn);
        return this;
    }

    /**
     * 关闭当前页面的指定监听器
     * @param event 
     * @param fn 
     */
    off(event: string, fn?: Function){
        var cbs = callbacks[event];
        if(!cbs) return this;
        if(!fn) {
            delete callbacks[event];
            return this;
        }

        var cb: any = {};
        for (var i = 0; i < cbs.length; i++) {
            cb = cbs[i];
            if (cb === fn || cb.fn === fn) {
                cbs.splice(i, 1);
                break;
            }
        }
        return this;
    }

    /**
     * 关闭当前页面的所有监听器
     */
    offall(){
        callbacks = {};
        return this;
    }
    
    /**
     * 在当前页面注册一次性的监听器
     * @param event 
     * @param fn 
     */
    once(event:string, fn:Function){
        let self = this;
        function on(this: any){
            self.off(event);
            fn.apply(this, arguments);
        }
        on.fn = fn;
        this.on(event, on);
        return this;
    }

    /**
     * 触发自己以外的同源网页的监听事件
     * @param event 
     * @param args 
     */
    emit(event:string, ...args: any[]){
        localStorage.setItem(EventName + event, JSON.stringify(args));
        return this;
    }

    /**
     * 触发所有的同源网页的监听事件
     * @param event 
     * @param args 
     */
    emits(event:string, ...args: any[]){
        emit.call(this, event, ...args);
        localStorage.setItem(EventName + event, JSON.stringify(args));
        return this;
    }
}

export default new StorageEmitter();