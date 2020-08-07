import * as Interface from './interface';
export declare class Store<T> implements Interface.IStore<T> {
    protected stop: Interface.Unsubscriber | null;
    protected subscribers: Array<Interface.SubscribeInvalidateTuple<T>>;
    protected value: T;
    protected start: Interface.StartStopNotifier<T>;
    constructor(value: T, start?: Interface.StartStopNotifier<T>);
    get(): T;
    set(newValue: T): void;
    update(callback: Interface.Updater<T>): void;
    subscribe(run: Interface.Subscriber<T>, invalidate?: Interface.Invalidator<T>): Interface.Unsubscriber;
}
