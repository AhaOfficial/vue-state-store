"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.noop = function () { };
exports.identity = function (x) { return x; };
exports.assign = function (tar, src) {
    // @ts-ignore
    for (var k in src)
        tar[k] = src[k];
    return tar;
};
exports.isPromise = function (value) {
    return (value && typeof value === 'object' && typeof value.then === 'function');
};
exports.run = function (callback) {
    return callback();
};
exports.blankObject = function () {
    return Object.create(null);
};
exports.runAll = function (fns) {
    fns.forEach(exports.run);
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
exports.isEmpty = function (obj) {
    return Object.keys(obj).length === 0;
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
exports.once = function (fn) {
    var ran = false;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (ran)
            return;
        ran = true;
        fn.call.apply(fn, __spreadArrays([this], args));
    };
};
exports.nullToEmpty = function (value) {
    return value == null ? '' : value;
};
exports.hasProp = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
};
exports.actionDestroyer = function (action_result) {
    return action_result && exports.isFunction(action_result.destroy)
        ? action_result.destroy
        : exports.noop;
};
