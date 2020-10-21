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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var Utils = __importStar(require("./utils"));
var composition_api_1 = require("@vue/composition-api");
var subscriberQueue = [];
exports.storeMap = {};
var Store = /** @class */ (function () {
    function Store(value, start) {
        if (start === void 0) { start = Utils.noop; }
        this.stop = null;
        this.subscribers = [];
        this._value = value;
        this.start = start;
        var storeName = this.constructor.name;
        if (typeof window !== 'undefined' &&
            window.__NUXT__ &&
            window.__NUXT__._vss &&
            window.__NUXT__._vss[storeName]) {
            this._value = window.__NUXT__._vss[storeName];
        }
        exports.storeMap[storeName] = this;
        devtoolsBind(this, storeName);
    }
    Store.prototype.get = function () {
        return Utils.getStoreValue(this);
    };
    Store.prototype.getItem = function (key) {
        var data = Utils.getStoreValue(this);
        return data[key];
    };
    Store.prototype.set = function (newValue, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        return new Promise(function (resolve) {
            if (Utils.notEqual(_this._value, newValue) || force) {
                _this._value = newValue;
                if (_this.stop) {
                    var runQueue = !subscriberQueue.length;
                    for (var i = 0; i < _this.subscribers.length; i += 1) {
                        var s = _this.subscribers[i];
                        s[1]();
                        subscriberQueue.push(s, _this._value);
                    }
                    if (runQueue) {
                        for (var i = 0; i < subscriberQueue.length; i += 2)
                            subscriberQueue[i][0](subscriberQueue[i + 1]);
                        subscriberQueue.length = 0;
                    }
                }
                resolve();
            }
        });
    };
    Store.prototype.update = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.set;
                        return [4 /*yield*/, callback(this._value)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent()])];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Store.prototype.subscribe = function (run, invalidate) {
        var _this = this;
        if (invalidate === void 0) { invalidate = Utils.noop; }
        var subscriber = [run, invalidate];
        this.subscribers.push(subscriber);
        if (this.subscribers.length === 1)
            this.stop = this.start(this.set) || Utils.noop;
        if (this._value)
            run(this._value);
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
    Store.prototype.bind = function () {
        var _this = this;
        var bindedValue = composition_api_1.ref(Utils.clone(this._value));
        var unsubscribeStore = this.subscribe(function (data) {
            bindedValue.value = Utils.clone(data);
        });
        var unsubscribeWatch = composition_api_1.watch(bindedValue, function () {
            var data = bindedValue.value;
            var dataOfObserverRemoved = Utils.clone(data);
            var originOfOfObserverRemoved = Utils.clone(_this._value);
            if (!Utils.deepEqual(dataOfObserverRemoved, originOfOfObserverRemoved))
                _this.set(dataOfObserverRemoved);
        }, {
            deep: true
        });
        composition_api_1.onUnmounted(function () {
            if (unsubscribeWatch)
                unsubscribeWatch();
            if (unsubscribeStore)
                unsubscribeStore();
        });
        return bindedValue;
    };
    Store.prototype.watch = function (callback, option) {
        var _this = this;
        if (option === void 0) { option = {
            immediate: false
        }; }
        var unsubscribe;
        var isFirst = true;
        composition_api_1.onMounted(function () {
            unsubscribe = _this.subscribe(function (data) {
                if (isFirst && !option.immediate) {
                    isFirst = false;
                    return;
                }
                callback(data);
            });
        });
        composition_api_1.onUnmounted(function () {
            if (unsubscribe)
                unsubscribe();
        });
    };
    Store.prototype.patch = function (key, value) {
        return this.update(function (data) {
            data[key] = value;
            return data;
        });
    };
    return Store;
}());
exports.Store = Store;
/**
 * Processing points for nuxt
 */
var target = typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
        ? global
        : {};
var devtoolsBind = function (store, storeName) { return __awaiter(void 0, void 0, void 0, function () {
    var devtoolsHook;
    return __generator(this, function (_a) {
        devtoolsHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;
        if (!devtoolsHook)
            return [2 /*return*/];
        try {
            // vue-state-store-devtools
            if (typeof target.VueStateStoreDevtools != 'undefined')
                target.VueStateStoreDevtools.devtoolsBind(store, storeName);
        }
        catch (e) { }
        return [2 /*return*/];
    });
}); };
