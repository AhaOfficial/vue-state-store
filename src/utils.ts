export const noop = () => {}

export const isPromise = <T = any>(value: any): value is PromiseLike<T> => {
  return value && typeof value === 'object' && typeof value.then === 'function'
}

export const run = (callback: any) => {
  return callback()
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
