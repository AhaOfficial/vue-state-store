/**
 * Collects instances of the store instances of the store.
 */
export declare let storeInstances: any;
/**
 * Build State Store Classes.
 */
export declare const build: <T extends {
    [x: string]: new () => InstanceType<T[string]>;
}>(Stores: T) => {
    getStores: () => { [storeName in keyof T]: InstanceType<T[storeName]>; };
    defineStores: <T_1 extends {
        [x: string]: new () => InstanceType<T_1[string]>;
    }>(stores: T_1) => { [storeName_1 in keyof T_1]: InstanceType<T_1[storeName_1]>; };
    convertToObservableBox: <T_2 extends new () => InstanceType<T_2>>(StoreClass: T_2) => InstanceType<T_2>;
};
