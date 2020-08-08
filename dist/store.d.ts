import * as Interface from './interface';
export declare class Store<T> implements Interface.IStore<T> {
    protected stop: Interface.Unsubscriber | null;
    protected subscribers: Array<Interface.SubscribeInvalidateTuple<T>>;
    protected value: T;
    protected start: Interface.StartStopNotifier<T>;
    constructor(value: T, start?: Interface.StartStopNotifier<T>);
    get(): T;
    set(newValue: T): Promise<void>;
    update(callback: Interface.Updater<T> | Interface.AsyncUpdater<T>): Promise<void>;
    subscribe(run: Interface.Subscriber<T>, invalidate?: Interface.Invalidator<T>): Interface.Unsubscriber;
    bind(): import("@vue/composition-api").Ref<import("@vue/composition-api").UnwrapRef<T>>;
}
