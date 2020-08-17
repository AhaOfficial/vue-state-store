"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = () => { };
exports.isPromise = (value) => {
    return value && typeof value === 'object' && typeof value.then === 'function';
};
exports.run = (callback) => {
    return callback();
};
exports.isFunction = (thing) => {
    return typeof thing === 'function';
};
exports.safeNotEqual = (a, b) => {
    return a != a
        ? b == b
        : a !== b || (a && typeof a === 'object') || typeof a === 'function';
};
exports.notEqual = (a, b) => {
    return a != a ? b == b : a !== b;
};
exports.validateStore = (store, name) => {
    if (store != null && typeof store.subscribe !== 'function')
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
};
exports.subscribe = (store, ...callbacks) => {
    if (store == null)
        return exports.noop;
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
};
exports.getStoreValue = (store) => {
    let value;
    exports.subscribe(store, (_) => (value = _))();
    return value;
};
