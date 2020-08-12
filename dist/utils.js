"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = function () { };
exports.isPromise = function (value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
};
exports.run = function (callback) {
    return callback();
};
exports.isFunction = function (thing) {
    return typeof thing === 'function';
};
exports.safeNotEqual = function (a, b) {
    return a != a
        ? b == b
        : a !== b || (a && typeof a === 'object') || typeof a === 'function';
};
exports.notEqual = function (a, b) {
    return a != a ? b == b : a !== b;
};
exports.validateStore = function (store, name) {
    if (store != null && typeof store.subscribe !== 'function')
        throw new Error("'" + name + "' is not a store with a 'subscribe' method");
};
exports.subscribe = function (store) {
    var callbacks = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        callbacks[_i - 1] = arguments[_i];
    }
    if (store == null)
        return exports.noop;
    var unsub = store.subscribe.apply(store, callbacks);
    return unsub.unsubscribe ? function () { return unsub.unsubscribe(); } : unsub;
};
exports.getStoreValue = function (store) {
    var value;
    exports.subscribe(store, function (_) { return (value = _); })();
    return value;
};
