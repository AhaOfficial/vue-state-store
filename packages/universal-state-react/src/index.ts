import { configure, computed as _computed } from 'mobx'
import { useContext, useEffect, createElement, Component, Fragment } from 'react'
import { enableStaticRendering, useLocalObservable, MobXProviderContext } from 'mobx-react'
import * as us from 'universal-state'
import { build as _build, storeInstances } from 'universal-state/src/build'

import type {
  AppContextType,
  AppInitialProps,
} from 'next/dist/next-server/lib/utils'

import type { Router } from 'next/router'

/**
 * Build State Store Classes.
 */
export const build = <
  T extends { [storeName in string]: { new (): InstanceType<T[storeName]> } }
>(
  Stores: T
) => {
  /**
   * Enable SSR if it is running on the server.
   */
  enableStaticRendering(typeof window === 'undefined')

  /**
   * Allow use of loose action.
   */
  configure({ enforceActions: 'never' })

  const { getStores } = _build(Stores)

  /**
   * Type information about the converted state stores.
   */
  type IStore = ReturnType<typeof getStores>

  /**
   * Provides a state store within the context of a react.
   */
  const StoreProvider = (context: any) => {
    const { children, ssr } = context
    const store = getStores()

    if (ssr !== undefined) {
      for (const storeName in store) {
        if (typeof ssr[storeName] !== 'undefined') {
          for (const propertyName in store[storeName]) {
            store[storeName][propertyName] = ssr[storeName][propertyName]
          }
        }
      }
    }

    let isClientSideLoaded = state(false)
    if (typeof window === 'undefined') {
      isClientSideLoaded = true
    } else {
      useEffect(() => {
        new Promise(async (resolve) => {
          // * Run Client Prefetcher
          for (const globalClientPrefetcher of _globalClientPrefetchers)
            await globalClientPrefetcher()
          isClientSideLoaded = true
          resolve()
        })
      }, [])
    }

    // return isClientSideLoaded ? (
    //   <MobXProviderContext.Provider value={store}>
    //     {children}
    //   </MobXProviderContext.Provider>
    // ) : (
    //   <></>
    // )
    
    class UniversalStateProvider extends Component {
      render () {
        return createElement(Fragment, null)
      }
    }
    class NonUniversalStateProvider extends Component {
      render () {
        return createElement(Fragment, null)
      }
    }
    // return isClientSideLoaded 
  }

  /**
   * Returns a state store available within a component.
   */
  const useStore = () => {
    // try {
    //   const store = useContext(MobXProviderContext)
    //   if (!store) {
    //     throw new Error('Not found StoreProvider')
    //   }
    //   return store as IStore
    // } catch (e) {
    //   return storeInstances
    // }
  }

  return {
    /**
     * Returns a state store available within a component.
     */
    useStore,

    /**
     * Provides a state store within the context of a react.
     */
    StoreProvider,
  }
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
export const subscribe = us.subscribe

/**
 * Create simple local state.
 */
export const state = <T>(data: T) => {
  try {
    return useLocalObservable(() => us.state(data))
  } catch (error) {
    return us.state(data)
  }
}

/**
 * Create simple local computed value.
 */
export const computed = <T>(data: () => T) => {
  try {
    return useLocalObservable(() => _computed(data)).get()
  } catch (error) {
    return us.computed(data)
  }
}

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
export const condition = us.condition

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
export const clone = us.clone

/**
 * Global Prefetchers
 */
const _globalPrefetchers: ((
  appContext: AppContextType<Router>
) => void | Promise<void>)[] = []

export const onPrefetch = (
  callback: (appContext: AppContextType<Router>) => void | Promise<void>,
  component?: any
) => {
  if (component) component.onPrefetch = callback
  else _globalPrefetchers.push(callback)
}

/**
 * Global Server Prefetchers
 */
const _globalServerPrefetchers: ((
  appContext: AppContextType<Router>
) => void | Promise<void>)[] = []

export const onServerPrefetch = (
  callback: (appContext: AppContextType<Router>) => void | Promise<void>,
  component?: any
) => {
  if (component) component.onServerPrefetch = callback
  else _globalServerPrefetchers.push(callback)
}

/**
 * Global Client Prefetchers
 */
const _globalClientPrefetchers: (() => void | Promise<void>)[] = []

/**
 * This function runs only once before rendering occurs on the client.
 */
export const onClientPrefetch = (callback: () => void | Promise<void>) => {
  _globalClientPrefetchers.push(callback)
}

/**
 * Function for performing SSR from next to store.
 */
export const useSSR = async (appContext: AppContextType<Router>) => {
  // * Run Global Prefetcher
  for (const globalPrefetcher of _globalPrefetchers)
    await globalPrefetcher(appContext)

  // * Run Page Global Prefetcher
  const pagePrefetcher = (appContext.Component as any).onPrefetch
  if (typeof pagePrefetcher !== 'undefined') await pagePrefetcher(appContext)

  if (typeof window === 'undefined') {
    // * Run Server Prefetcher
    for (const globalServerPrefetcher of _globalServerPrefetchers)
      await globalServerPrefetcher(appContext)

    // * Run Page Server Prefetcher
    const pageServerPrefetcher = (appContext.Component as any).onServerPrefetch
    if (typeof pageServerPrefetcher !== 'undefined')
      await pageServerPrefetcher(appContext)
  }
  const App = require('next/app')

  // * Run getInitialProps
  if (App.getInitialProps) {
    const appProps = await App.getInitialProps(appContext)

    // * Create Server Side Rendered stores data.
    let ssrData = {}
    if (typeof window === 'undefined') ssrData = storeInstances

    return { ...appProps, ssrData } as AppInitialProps
  }
  return {} as AppInitialProps
}

export const cloneStore = <T>(store: T) =>
  JSON.parse(JSON.stringify(store)) as T
