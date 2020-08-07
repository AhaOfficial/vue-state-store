import { StartStopNotifier, IStore } from './interface'
import * as Utils from './utils'
import { Store } from './store'

/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
export const store = <T>(
    value: T,
    start: StartStopNotifier<T> = Utils.noop
) => {
    return new Store<T>(value, start)
}

export type { IStore }
export { Store }
