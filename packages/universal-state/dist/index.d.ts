import * as MobX from 'mobx';
/**
 * React State Store
 */
export declare const UniversalState: <T extends {
    [x: string]: new () => InstanceType<T[string]>;
}>(Stores: T) => void;
/**
 * Create simple local state.
 */
export declare const state: <T, _>(data: T) => T;
/**
 * Create simple local computed value.
 */
export declare const computed: <T, _>(data: () => T) => T;
/**
 * @description
 * 'when' function allows logic to be
 * used when certain conditions are reached.
 *
 * @example
 * async function() {
    await when(() => that.isVisible)
    // etc ..
  }
 */
export declare const when: typeof MobX.when;
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
 * Global Server Prefetchers
 */
/**
 * Global Client Prefetchers
 */
/**
 * Function for performing SSR from next to store.
 */
export declare const cloneStore: <T, _>(store: T) => T;
