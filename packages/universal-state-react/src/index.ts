import { configure } from 'mobx'
import { useContext, useEffect } from 'react'
import { enableStaticRendering } from 'mobx-react'
import * as us from 'universal-state'
import { build as _build } from 'universal-state/src/build'

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

    // let isClientSideLoaded = state(false)
    // if (typeof window === 'undefined') {
    //   isClientSideLoaded = true
    // } else {
    //   useEffect(() => {
    //     new Promise(async (resolve) => {
    //       // * Run Client Prefetcher
    //       // for (const globalClientPrefetcher of _globalClientPrefetchers)
    //       //   await globalClientPrefetcher()
    //       isClientSideLoaded = true
    //       resolve()
    //     })
    //   }, [])
    // }

    // return isClientSideLoaded ? (
    //   <MobXProviderContext.Provider value={store}>
    //     {children}
    //   </MobXProviderContext.Provider>
    // ) : (
    //   <></>
    // )
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
