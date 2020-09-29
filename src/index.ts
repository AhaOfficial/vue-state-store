import { StartStopNotifier, IStore } from './interface'
import * as Utils from './utils'
import { Store, storeMap } from './store'
/**
 * Create a store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
export const store = <T>(
    value: T,
    start: StartStopNotifier<T> = Utils.noop
) => {
    return new Store<T>(value, start)
}

/**
 * Generate SSR Store Data
 */
export const useSSR = () => {
    const renderedStates: {
        [storeName in string]: any
    } = {}

    for(let storeName of Object.keys(storeMap)) {
        try{
            const storeValue = storeMap[storeName].get()
            if(storeValue) renderedStates[storeName] = storeValue
        } catch (e) { }
    }
    
    return { _vss: renderedStates }
}

export type { IStore }
export { Store }
