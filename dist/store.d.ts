import * as Interface from './interface';
import { UnwrapRef } from '@vue/composition-api';
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
    set(newValue: T): Promise<void>;
    update(callback: Interface.Updater<T> | Interface.AsyncUpdater<T>): Promise<void>;
    subscribe(run: Interface.Subscriber<T>, invalidate?: Interface.Invalidator<T>): Interface.Unsubscriber;
    bind(): import("@vue/composition-api").Ref<UnwrapRef<T>>;
    watch(callback: Interface.Subscriber<T>): void;
    patch<K extends keyof T>(key: K, value: T[K]): Promise<void>;
}
