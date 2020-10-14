export type Subscriber<T> = (value: T) => void
export type Unsubscriber = () => void
export type Updater<T> = (value: T) => T
export type AsyncUpdater<T> = (value: T) => Promise<T>
export type Invalidator<T> = (value?: T) => void

export type SubscribeInvalidateTuple<T> = [Subscriber<T>, Invalidator<T>]
export type StartStopNotifier<T> = (set: Subscriber<T>) => Unsubscriber | void

export interface IStore<T> {
  /**
   * Get value and inform subscribers.
   */
  get(): T

  /**
   * Set value and inform subscribers.
   * @param value to set
   */
  set(value?: T): void

  /**
   * Subscribe on value changes.
   * @param run subscription callback
   * @param invalidate cleanup callback
   */
  subscribe(run: Subscriber<T>, invalidate?: Invalidator<T>): Unsubscriber

  /**
   * Update value using callback and inform subscribers.
   * @param updater callback
   */
  update(updater: Updater<T>): void
}
