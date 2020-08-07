"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var Utils = __importStar(require("./utils"));
var subscriberQueue = [];
var Store = /** @class */ (function () {
    function Store(value, start) {
        if (start === void 0) { start = Utils.noop; }
        this.stop = null;
        this.subscribers = [];
        this.value = value;
        this.start = start;
    }
    Store.prototype.get = function () {
        return Utils.getStoreValue(this);
    };
    Store.prototype.set = function (newValue) {
        if (Utils.safeNotEqual(this.value, newValue)) {
            this.value = newValue;
            if (this.stop) {
                var runQueue = !subscriberQueue.length;
                for (var i = 0; i < this.subscribers.length; i += 1) {
                    var s = this.subscribers[i];
                    s[1]();
                    subscriberQueue.push(s, this.value);
                }
                if (runQueue) {
                    for (var i = 0; i < subscriberQueue.length; i += 2)
                        subscriberQueue[i][0](subscriberQueue[i + 1]);
                    subscriberQueue.length = 0;
                }
            }
        }
    };
    Store.prototype.update = function (callback) {
        this.set(callback(this.value));
    };
    Store.prototype.subscribe = function (run, invalidate) {
        var _this = this;
        if (invalidate === void 0) { invalidate = Utils.noop; }
        var subscriber = [
            run,
            invalidate,
        ];
        this.subscribers.push(subscriber);
        if (this.subscribers.length === 1)
            this.stop = this.start(this.set) || Utils.noop;
        if (this.value)
            run(this.value);
        return function () {
            var index = _this.subscribers.indexOf(subscriber);
            if (index !== -1)
                _this.subscribers.splice(index, 1);
            if (_this.subscribers.length === 0) {
                if (_this.stop)
                    _this.stop();
                _this.stop = null;
            }
        };
    };
    return Store;
}());
exports.Store = Store;
