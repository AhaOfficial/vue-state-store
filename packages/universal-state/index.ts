import * as MobX from 'mobx'

/**
 * Collects instances of the store instances of the store.
 */
let storeInstances: any = null

/**
 * React State Store
 */
export const UniversalState = <
  T extends { [storeName in string]: { new (): InstanceType<T[storeName]> } }
>(
  Stores: T
) => {
  /**
   * TODO Enable SSR if it is running on the server.
   */
  // MobX.enableStaticRendering(typeof window === 'undefined')

  /**
   * TODO Allow use of loose action.
   */
  // configure({ enforceActions: 'never' })

  /**
   * Wrap the Observer box storage class instance.
   */
  const convertToObservableBox = <T extends { new (): InstanceType<T> }>(
    StoreClass: T
  ) => {
    class Store {
      constructor() {
        const instance = new StoreClass()
        MobX.makeAutoObservable(instance)
        return instance
      }
    }
    const instance = MobX.observable.box<T>()
    instance.set(new Store() as T)
    return instance.get() as InstanceType<T>
  }

  /**
   * Receive class instances of the stores
   * and wrap them in the Mobx Observer box.
   */
  const defineStores = <
    T extends { [storeName in string]: { new (): InstanceType<T[storeName]> } }
  >(
    stores: T
  ): {
    [storeName in keyof T]: InstanceType<T[storeName]>
  } => {
    type ResultType = {
      [storeName in keyof T]: InstanceType<T[storeName]>
    }

    const bindedStores: ResultType = {} as ResultType

    for (const storeName in stores) {
      const bindedStore = convertToObservableBox(stores[storeName])
      bindedStores[storeName] = bindedStore
    }
    return bindedStores
  }

  type StoreInstancesType = {
    [storeName in keyof T]: InstanceType<T[storeName]>
  }

  if (storeInstances === null || typeof window === 'undefined')
    storeInstances = defineStores(Stores)

  /**
   * Function to import converted state stores.
   */
  const getStores = (): StoreInstancesType => storeInstances

  /**
   * Type information about the converted state stores.
   */
  type IStore = ReturnType<typeof getStores>

  /**
   * TODO Provides a state store within the context of a react.
   */
  // const StoreProvider = (context: any) => {
  //   const { children, ssr } = context
  //   const store = getStores()

  //   if (ssr !== undefined) {
  //     for (const storeName in store) {
  //       if (typeof ssr[storeName] !== 'undefined') {
  //         for (const propertyName in store[storeName]) {
  //           store[storeName][propertyName] = ssr[storeName][propertyName]
  //         }
  //       }
  //     }
  //   }

  //   let isClientSideLoaded = state(false)
  //   if (typeof window === 'undefined') {
  //     isClientSideLoaded = true
  //   } else {
  //     useEffect(() => {
  //       new Promise(async (resolve) => {
  //         // * Run Client Prefetcher
  //         for (const globalClientPrefetcher of _globalClientPrefetchers)
  //           await globalClientPrefetcher()
  //         isClientSideLoaded = true
  //         resolve()
  //       })
  //     }, [])
  //   }

  //   return isClientSideLoaded ? (
  //     <MobXProviderContext.Provider value={store}>
  //       {children}
  //     </MobXProviderContext.Provider>
  //   ) : (
  //     <></>
  //   )
  // }

  /**
   * TODO Returns a state store available within a component.
   */
  // const useStore = (): IStore => {
  //   try {
  //     const store = useContext(MobXProviderContext)
  //     if (!store) {
  //       throw new Error('Not found StoreProvider')
  //     }
  //     return store as IStore
  //   } catch (e) {
  //     return storeInstances
  //   }
  // }

  // TODO
  // return {
  //   /**
  //    * Returns a state store available within a component.
  //    */
  //   useStore,

  //   /**
  //    * Provides a state store within the context of a react.
  //    */
  //   StoreProvider,
  // }
}

/**
 * Create simple local state.
 */
export const state = <T, _>(data: T) => MobX.observable(data)

/**
 * Create simple local computed value.
 */
export const computed = <T, _>(data: () => T) => MobX.computed(data).get()

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
export const when = MobX.when

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
  if (options && options.immediate) unsubscribe = callback()
  const cleanupReaction = MobX.reaction<T>(
    () => source,
    () => {
      if (typeof unsubscribe === 'function') unsubscribe()
      unsubscribe = callback()
    },
    {
      fireImmediately: true,
    }
  )

  return () => cleanupReaction()
}

// /**
//  * Global Prefetchers
//  */
// const _globalPrefetchers: ((
//   appContext: AppContextType<Router>
// ) => void | Promise<void>)[] = []

// export const onPrefetch = (
//   callback: (appContext: AppContextType<Router>) => void | Promise<void>,
//   component?: any
// ) => {
//   if (component) component.onPrefetch = callback
//   else _globalPrefetchers.push(callback)
// }

/**
 * Global Server Prefetchers
 */
// const _globalServerPrefetchers: ((
//   appContext: AppContextType<Router>
// ) => void | Promise<void>)[] = []

// export const onServerPrefetch = (
//   callback: (appContext: AppContextType<Router>) => void | Promise<void>,
//   component?: any
// ) => {
//   if (component) component.onServerPrefetch = callback
//   else _globalServerPrefetchers.push(callback)
// }

/**
 * Global Client Prefetchers
 */
// const _globalClientPrefetchers: (() => void | Promise<void>)[] = []

// /**
//  * This function runs only once before rendering occurs on the client.
//  */
// export const onClientPrefetch = (callback: () => void | Promise<void>) => {
//   _globalClientPrefetchers.push(callback)
// }

/**
 * Function for performing SSR from next to store.
 */
// export const useSSR = async (appContext: AppContextType<Router>) => {
//   // * Run Global Prefetcher
//   for (const globalPrefetcher of _globalPrefetchers)
//     await globalPrefetcher(appContext)

//   // * Run Page Global Prefetcher
//   const pagePrefetcher = (appContext.Component as any).onPrefetch
//   if (typeof pagePrefetcher !== 'undefined') await pagePrefetcher(appContext)

//   if (typeof window === 'undefined') {
//     // * Run Server Prefetcher
//     for (const globalServerPrefetcher of _globalServerPrefetchers)
//       await globalServerPrefetcher(appContext)

//     // * Run Page Server Prefetcher
//     const pageServerPrefetcher = (appContext.Component as any).onServerPrefetch
//     if (typeof pageServerPrefetcher !== 'undefined')
//       await pageServerPrefetcher(appContext)
//   }

//   // * Run getInitialProps
//   if (App.getInitialProps) {
//     const appProps = await App.getInitialProps(appContext)

//     // * Create Server Side Rendered stores data.
//     let ssrData = {}
//     if (typeof window === 'undefined') ssrData = storeInstances

//     return { ...appProps, ssrData } as AppInitialProps
//   }
//   return {} as AppInitialProps
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const cloneStore = <T, _>(store: T) =>
  JSON.parse(JSON.stringify(store)) as T
