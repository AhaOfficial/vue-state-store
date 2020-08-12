import * as Interface from './interface';
import { Ref, UnwrapRef } from '@vue/composition-api';
export declare class Store<T> implements Interface.IStore<T> {
    protected stop: Interface.Unsubscriber | null;
    protected subscribers: Array<Interface.SubscribeInvalidateTuple<T>>;
    protected start: Interface.StartStopNotifier<T>;
    private _value;
    private _unsubscribeStore;
    private _unsubscribeWatch;
    compute: Ref<UnwrapRef<T>>;
    constructor(value: T, start?: Interface.StartStopNotifier<T>);
    get(): T;
    set(newValue: T): Promise<void>;
    update(callback: Interface.Updater<T> | Interface.AsyncUpdater<T>): Promise<void>;
    subscribe(run: Interface.Subscriber<T>, invalidate?: Interface.Invalidator<T>): Interface.Unsubscriber;
    bind(): UnwrapRef<T>;
    destroy(): void;
}
