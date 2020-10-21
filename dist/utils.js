"use strict";
exports.__esModule = true;
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
exports.deepEqual = function (x, y) {
    if (x === y) {
        return true;
    }
    else if (typeof x == 'object' &&
        x != null &&
        typeof y == 'object' &&
        y != null) {
        if (Object.keys(x).length != Object.keys(y).length)
            return false;
        for (var prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (!exports.deepEqual(x[prop], y[prop]))
                    return false;
            }
            else
                return false;
        }
        return true;
    }
    else
        return false;
};
exports.clone = function (object) { return JSON.parse(JSON.stringify(object)); };
