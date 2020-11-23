import * as MobX from 'mobx'
import { build as _build } from './build'

/**
 * Build State Store Classes.
 */
export const build = <
  T extends { [storeName in string]: { new (): InstanceType<T[storeName]> } }
>(
  Stores: T
) => {
  const { getStores } = _build(Stores)
  return getStores()
}

/**
 * @description
 * Detects changes of state value.
 * 
 * @example
 * subscribe(
    Counter.count,
    changedValue => {
      console.log(`👀 changedValue:`, changedValue)
    }
  )
 * @param source Observable object to detect
 * @param callback `changedValue => {}` Changed Value
 * @param options Watch Options
 */
export const subscribe = <T, B>(
  source: T,
  callback: () => B,
  options: { immediate: boolean } = {
    immediate: false,
  }
) => {
  let unsubscribe: B
  const cleanupReaction = MobX.reaction<T>(
    () => source,
    () => {
      if (typeof unsubscribe === 'function') unsubscribe()
      if (options && options.immediate) unsubscribe = callback()
    },
    {
      fireImmediately: true,
    }
  )

  return () => cleanupReaction()
}

/**
 * Create simple local state.
 */
export const state = <T>(data: T) => MobX.observable(data)

/**
 * Create simple local computed value.
 */
export const computed = <T>(data: () => T) => MobX.computed(data).get()

/**
 * @description
 * 'condition' function allows logic to be
 * used when certain conditions are reached.
 * 
 * @example
 * async function() {
    await condition(() => that.isVisible)
    // etc ..
  }
 */
export const condition = MobX.when

/**
 * Clone the state or state store to JSON Object.
 *
 * The state or state store is bound by getter and setter,
 * making it difficult to immediately determine
 * the actual value as the JSON object value.
 *
 * If the actual value is required, it may be
 * necessary to refer to the value that is clone.
 * @param state state or store
 */
export const clone = <T>(state: T) => JSON.parse(JSON.stringify(state)) as T
