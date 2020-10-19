import * as Interface from './interface'
import * as Utils from './utils'
import {
  ref,
  UnwrapRef,
  watch,
  onUnmounted,
  WatchSource,
  onMounted,
} from '@vue/composition-api'
declare const window: any

const subscriberQueue: any[] = []
export const storeMap: {
  [storeName in string]: Interface.IStore<any>
} = {}

export class Store<T> implements Interface.IStore<T> {
  protected stop: Interface.Unsubscriber | null = null
  protected subscribers: Array<Interface.SubscribeInvalidateTuple<T>> = []
  protected start: Interface.StartStopNotifier<T>

  private _value: T

  constructor(value: T, start: Interface.StartStopNotifier<T> = Utils.noop) {
    this._value = value
    this.start = start

    const storeName = this.constructor.name

    if (
      typeof window !== 'undefined' &&
      window.__NUXT__ &&
      window.__NUXT__ &&
      window.__NUXT__._vss &&
      window.__NUXT__._vss[storeName]
    ) {
      this._value = window.__NUXT__._vss[storeName]
    }
    storeMap[storeName] = this

    devtoolsBind(this, storeName)
  }

  get(): T {
    return Utils.getStoreValue(this)
  }

  set(newValue: T) {
    return new Promise<void>((resolve) => {
      if (Utils.safeNotEqual(this._value, newValue)) {
        this._value = newValue
        if (this.stop) {
          const runQueue = !subscriberQueue.length
          for (let i = 0; i < this.subscribers.length; i += 1) {
            const s = this.subscribers[i]
            s[1]()
            subscriberQueue.push(s, this._value)
          }
          if (runQueue) {
            for (let i = 0; i < subscriberQueue.length; i += 2)
              subscriberQueue[i][0](subscriberQueue[i + 1])
            subscriberQueue.length = 0
          }
        }
        resolve()
      }
    })
  }

  async update(callback: Interface.Updater<T> | Interface.AsyncUpdater<T>) {
    await this.set(await callback(this._value))
  }

  subscribe(
    run: Interface.Subscriber<T>,
    invalidate: Interface.Invalidator<T> = Utils.noop
  ): Interface.Unsubscriber {
    const subscriber: Interface.SubscribeInvalidateTuple<T> = [run, invalidate]
    this.subscribers.push(subscriber)
    if (this.subscribers.length === 1)
      this.stop = this.start(this.set) || Utils.noop
    if (this._value) run(this._value)

    return () => {
      const index = this.subscribers.indexOf(subscriber)
      if (index !== -1) this.subscribers.splice(index, 1)
      if (this.subscribers.length === 0) {
        if (this.stop) this.stop()
        this.stop = null
      }
    }
  }

  bind() {
    const bindedValue = ref(this._value)
    const unsubscribeStore = this.subscribe((data) => {
      bindedValue.value = data as UnwrapRef<T>
    })
    const unsubscribeWatch = watch(
      bindedValue as WatchSource<T>,
      () => {
        const dataOfObserverRemoved = bindedValue.value
        this.set(dataOfObserverRemoved as T)
      },
      {
        deep: true,
      }
    )
    onUnmounted(() => {
      if (unsubscribeWatch) unsubscribeWatch()
      if (unsubscribeStore) unsubscribeStore()
    })
    return bindedValue
  }

  watch(callback: Interface.Subscriber<T>) {
    let unsubscribe: Interface.Unsubscriber
    onMounted(() => {
      unsubscribe = this.subscribe((data) => {
        callback(data)
      })
    })
    onUnmounted(() => {
      if (unsubscribe) unsubscribe()
    })
  }

  patch<K extends keyof T>(key: K, value: T[K]) {
    return this.update((data) => {
      data[key] = value
      return data
    })
  }
}

/**
 * Processing points for nuxt
 */
const target: any =
  typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : {}

const devtoolsBind = async <T>(
  store: Interface.IStore<T>,
  storeName: string
) => {
  const devtoolsHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__
  if (!devtoolsHook) return

  try {
    // vue-state-store-devtools
    if (typeof target.VueStateStoreDevtools != 'undefined')
      target.VueStateStoreDevtools.devtoolsBind(store, storeName)
  } catch (e) {}
}
