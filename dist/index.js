"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventName = "emitter&";
var callbacks = {};
function emit(event) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var cbs = callbacks[event];
    if (cbs) {
        cbs = cbs.slice(0);
        for (var i = 0, len = cbs.length; i < len; ++i) {
            cbs[i].apply(this, args);
        }
    }
}
var StorageEmitter = /** @class */ (function () {
    function StorageEmitter() {
        var _this = this;
        window.addEventListener("storage", function (ev) {
            var key = ev.key + "", value = ev.newValue + "";
            if (/^emitter&/.test(key) && /^\[.*]$/.test(value)) {
                try {
                    var event = key.replace(/^emitter&/, "");
                    var args = JSON.parse(value);
                    emit.call.apply(emit, __spreadArray([_this, event], args));
                }
                catch (error) {
                }
                localStorage.setItem(key, Date.now() + "");
            }
        }, true);
    }
    /**
     * 在当前页面绑定一个监听器
     * @param event
     * @param fn
     */
    StorageEmitter.prototype.on = function (event, fn) {
        (callbacks[event] = callbacks[event] || []).push(fn);
        return this;
    };
    /**
     * 关闭当前页面的指定监听器
     * @param event
     * @param fn
     */
    StorageEmitter.prototype.off = function (event, fn) {
        var cbs = callbacks[event];
        if (!cbs)
            return this;
        if (!fn) {
            delete callbacks[event];
            return this;
        }
        var cb = {};
        for (var i = 0; i < cbs.length; i++) {
            cb = cbs[i];
            if (cb === fn || cb.fn === fn) {
                cbs.splice(i, 1);
                break;
            }
        }
        return this;
    };
    /**
     * 关闭当前页面的所有监听器
     */
    StorageEmitter.prototype.offall = function () {
        callbacks = {};
        return this;
    };
    /**
     * 在当前页面注册一次性的监听器
     * @param event
     * @param fn
     */
    StorageEmitter.prototype.once = function (event, fn) {
        var self = this;
        function on() {
            self.off(event);
            fn.apply(this, arguments);
        }
        on.fn = fn;
        this.on(event, on);
        return this;
    };
    /**
     * 触发自己以外的同源网页的监听事件
     * @param event
     * @param args
     */
    StorageEmitter.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        localStorage.setItem(EventName + event, JSON.stringify(args));
        return this;
    };
    /**
     * 触发所有的同源网页的监听事件
     * @param event
     * @param args
     */
    StorageEmitter.prototype.emits = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        emit.call.apply(emit, __spreadArray([this, event], args));
        localStorage.setItem(EventName + event, JSON.stringify(args));
        return this;
    };
    return StorageEmitter;
}());
exports.default = new StorageEmitter();
