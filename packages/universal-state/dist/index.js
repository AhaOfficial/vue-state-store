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
var build_1 = require("./build");
/**
 * Build State Store Classes.
 */
exports.build = function (Stores) {
    var getStores = build_1.build(Stores).getStores;
    return getStores();
};
/**
 * @description
 * Detects changes of state value.
 *
 * @example
 * subscribe(
    Counter.count,
    changedValue => {
      console.log(`👀 changedValue:`, changedValue)
    }
  )
 * @param source Observable object to detect
 * @param callback `changedValue => {}` Changed Value
 * @param options Watch Options
 */
exports.subscribe = function (source, callback, options) {
    if (options === void 0) { options = {
        immediate: false
    }; }
    var unsubscribe;
    if (options && options.immediate)
        unsubscribe = callback();
    var cleanupReaction = MobX.reaction(function () { return source; }, function () {
        if (typeof unsubscribe === 'function')
            unsubscribe();
        unsubscribe = callback();
    }, {
        fireImmediately: true
    });
    return function () { return cleanupReaction(); };
};
/**
 * Create simple local state.
 */
exports.state = function (data) { return MobX.observable(data); };
/**
 * Create simple local computed value.
 */
exports.computed = function (data) { return MobX.computed(data).get(); };
/**
 * @description
 * 'condition' function allows logic to be
 * used when certain conditions are reached.
 *
 * @example
 * async function() {
    await condition(() => that.isVisible)
    // etc ..
  }
 */
exports.condition = MobX.when;
/**
 * Clone the state or state store to JSON Object.
 *
 * The state or state store is bound by getter and setter,
 * making it difficult to immediately determine
 * the actual value as the JSON object value.
 *
 * If the actual value is required, it may be
 * necessary to refer to the value that is clone.
 * @param state state or store
 */
exports.clone = function (state) { return JSON.parse(JSON.stringify(state)); };
