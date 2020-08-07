export const noop = () => {}

export const identity = (x) => x

export const assign = <T, S>(tar: T, src: S): T & S => {
    // @ts-ignore
    for (const k in src) tar[k] = src[k]
    return tar as T & S
}

export const isPromise = <T = any>(value: any): value is PromiseLike<T> => {
    return (
        value && typeof value === 'object' && typeof value.then === 'function'
    )
}

export const run = (callback: any) => {
    return callback()
}

export const blankObject = () => {
    return Object.create(null)
}

export const runAll = (fns) => {
    fns.forEach(run)
}

export const isFunction = (thing: any): thing is Function => {
    return typeof thing === 'function'
}

export const safeNotEqual = (a, b) => {
    return a != a
        ? b == b
        : a !== b || (a && typeof a === 'object') || typeof a === 'function'
}

export const notEqual = (a, b) => {
    return a != a ? b == b : a !== b
}

export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0
}

export const validateStore = (store, name) => {
    if (store != null && typeof store.subscribe !== 'function')
        throw new Error(`'${name}' is not a store with a 'subscribe' method`)
}

export const subscribe = (store, ...callbacks) => {
    if (store == null) return noop
    const unsub = store.subscribe(...callbacks)
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub
}

export const getStoreValue = (store) => {
    let value
    subscribe(store, (_) => (value = _))()
    return value
}

export const once = (fn) => {
    let ran = false
    return function (this: any, ...args) {
        if (ran) return
        ran = true
        fn.call(this, ...args)
    }
}

export const nullToEmpty = (value) => {
    return value == null ? '' : value
}

export const hasProp = (obj, prop) =>
    Object.prototype.hasOwnProperty.call(obj, prop)

export const actionDestroyer = (action_result) => {
    return action_result && isFunction(action_result.destroy)
        ? action_result.destroy
        : noop
}
