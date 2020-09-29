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
var store_1 = require("./store");
exports.Store = store_1.Store;
/**
 * Create a store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
exports.store = function (value, start) {
    if (start === void 0) { start = Utils.noop; }
    return new store_1.Store(value, start);
};
/**
 * Generate SSR Store Data
 */
exports.useSSR = function () {
    var renderedStates = {};
    for (var _i = 0, _a = Object.keys(store_1.storeMap); _i < _a.length; _i++) {
        var storeName = _a[_i];
        try {
            var storeValue = store_1.storeMap[storeName].get();
            if (storeValue)
                renderedStates[storeName] = storeValue;
        }
        catch (e) { }
    }
    return { _vss: renderedStates };
};
