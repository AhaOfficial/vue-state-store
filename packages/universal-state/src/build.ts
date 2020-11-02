import * as MobX from 'mobx'

/**
 * Collects instances of the store instances of the store.
 */
export let storeInstances: any = null

/**
 * Build State Store Classes.
 */
export const build = <
  T extends { [storeName in string]: { new (): InstanceType<T[storeName]> } }
>(
  Stores: T
) => {
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

  const getStores = (): StoreInstancesType => storeInstances

  return {
    getStores,
    defineStores,
    convertToObservableBox,
  }
}
