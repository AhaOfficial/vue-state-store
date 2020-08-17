"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils = __importStar(require("./utils"));
const composition_api_1 = require("@vue/composition-api");
const subscriberQueue = [];
class Store {
    constructor(value, start = Utils.noop) {
        this.stop = null;
        this.subscribers = [];
        this._value = value;
        this.start = start;
    }
    get() {
        return Utils.getStoreValue(this);
    }
    set(newValue) {
        return new Promise((resolve) => {
            if (Utils.safeNotEqual(this._value, newValue)) {
                this._value = newValue;
                if (this.stop) {
                    const runQueue = !subscriberQueue.length;
                    for (let i = 0; i < this.subscribers.length; i += 1) {
                        const s = this.subscribers[i];
                        s[1]();
                        subscriberQueue.push(s, this._value);
                    }
                    if (runQueue) {
                        for (let i = 0; i < subscriberQueue.length; i += 2)
                            subscriberQueue[i][0](subscriberQueue[i + 1]);
                        subscriberQueue.length = 0;
                    }
                }
                resolve();
            }
        });
    }
    update(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.set(yield callback(this._value));
        });
    }
    subscribe(run, invalidate = Utils.noop) {
        const subscriber = [
            run,
            invalidate,
        ];
        this.subscribers.push(subscriber);
        if (this.subscribers.length === 1)
            this.stop = this.start(this.set) || Utils.noop;
        if (this._value)
            run(this._value);
        return () => {
            const index = this.subscribers.indexOf(subscriber);
            if (index !== -1)
                this.subscribers.splice(index, 1);
            if (this.subscribers.length === 0) {
                if (this.stop)
                    this.stop();
                this.stop = null;
            }
        };
    }
    bind() {
        if (this._bindedValue)
            return this._bindedValue.value;
        const bindedValue = composition_api_1.ref(this._value);
        this._unsubscribeStore = this.subscribe((data) => {
            bindedValue.value = data;
        });
        this._unsubscribeWatch = composition_api_1.watch(bindedValue.value, () => {
            const dataOfObserverRemoved = bindedValue.value;
            this.set(dataOfObserverRemoved);
        }, {
            deep: true
        });
        this._bindedValue = bindedValue;
        return this._bindedValue.value;
    }
    destroy() {
        this._bindedValue = undefined;
        if (typeof this._unsubscribeStore == 'function')
            this._unsubscribeStore();
        if (typeof this._unsubscribeWatch == 'function')
            this._unsubscribeWatch();
    }
}
exports.Store = Store;
