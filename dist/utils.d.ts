export declare const noop: () => void;
export declare const isPromise: <T = any>(value: any) => value is PromiseLike<T>;
export declare const run: (callback: any) => any;
export declare const isFunction: (thing: any) => thing is Function;
export declare const safeNotEqual: (a: any, b: any) => boolean;
export declare const notEqual: (a: any, b: any) => boolean;
export declare const validateStore: (store: any, name: any) => void;
export declare const subscribe: (store: any, ...callbacks: any[]) => any;
export declare const getStoreValue: (store: any) => any;
