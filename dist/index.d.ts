import { StartStopNotifier, IStore } from './interface';
import { Store } from './store';
/**
 * Create a store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
export declare const store: <T>(value: T, start?: StartStopNotifier<T>) => Store<T>;
/**
 * Generate SSR Store Data
 */
export declare const useSSR: () => {
    _vss: {
        [x: string]: any;
    };
};
export type { IStore };
export { Store };
