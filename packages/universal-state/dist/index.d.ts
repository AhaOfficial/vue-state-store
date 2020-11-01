import * as MobX from 'mobx';
/**
 * Build State Store Classes.
 */
export declare const build: <T extends {
    [x: string]: new () => InstanceType<T[string]>;
}>(Stores: T) => { [storeName in keyof T]: InstanceType<T[storeName]>; };
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
export declare const subscribe: <T, B>(source: T, callback: () => B, options?: {
    immediate: boolean;
}) => () => void;
/**
 * Create simple local state.
 */
export declare const state: <T>(data: T) => T;
/**
 * Create simple local computed value.
 */
export declare const computed: <T>(data: () => T) => T;
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
export declare const condition: typeof MobX.when;
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
export declare const clone: <T>(state: T) => T;
