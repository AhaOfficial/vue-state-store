import * as Interface from './interface';
export declare const storeMap: {
    [storeName in string]: Interface.IStore<any>;
};
export declare class Store<T> implements Interface.IStore<T> {
    protected stop: Interface.Unsubscriber | null;
    protected subscribers: Array<Interface.SubscribeInvalidateTuple<T>>;
    protected start: Interface.StartStopNotifier<T>;
    private _value;
    constructor(value: T, start?: Interface.StartStopNotifier<T>);
    get(): T;
    getItem<K extends keyof T>(key: K): T[K];
    set(newValue: T, force?: boolean): Promise<void>;
    update(callback: Interface.Updater<T> | Interface.AsyncUpdater<T>): Promise<void>;
    subscribe(run: Interface.Subscriber<T>, invalidate?: Interface.Invalidator<T>): Interface.Unsubscriber;
    bind(): any;
    watch(callback: Interface.Subscriber<T>, option?: {
        immediate: boolean;
    }): void;
    patch<K extends keyof T>(key: K, value: T[K]): Promise<void>;
}
