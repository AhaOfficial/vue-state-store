"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var MobX = __importStar(require("mobx"));
/**
 * Collects instances of the store instances of the store.
 */
var storeInstances = null;
/**
 * Build State Store Classes.
 */
exports.build = function (Stores) {
    /**
     * Wrap the Observer box storage class instance.
     */
    var convertToObservableBox = function (StoreClass) {
        var Store = /** @class */ (function () {
            function Store() {
                var instance = new StoreClass();
                MobX.makeAutoObservable(instance);
                return instance;
            }
            return Store;
        }());
        var instance = MobX.observable.box();
        instance.set(new Store());
        return instance.get();
    };
    /**
     * Receive class instances of the stores
     * and wrap them in the Mobx Observer box.
     */
    var defineStores = function (stores) {
        var bindedStores = {};
        for (var storeName in stores) {
            var bindedStore = convertToObservableBox(stores[storeName]);
            bindedStores[storeName] = bindedStore;
        }
        return bindedStores;
    };
    if (storeInstances === null || typeof window === 'undefined')
        storeInstances = defineStores(Stores);
    var getStores = function () { return storeInstances; };
    return {
        getStores: getStores,
        defineStores: defineStores,
        convertToObservableBox: convertToObservableBox
    };
};
