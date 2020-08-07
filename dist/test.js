"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var _1 = require("./");
// ? Primitive State
var version = _1.store(0);
// * Get
version.get(); // 0
// * Set
version.set(1);
// * Update
version.update(function (data) {
    data += 1;
    return data;
});
// * Subscribe
version.subscribe(function (data) {
    console.log('Changed data', data);
});
// * Unsubscribable
var unsubscribe1 = version.subscribe(function (data) {
    console.log('Changed data', data);
});
unsubscribe1();
// ? Object State
var detail = _1.store({
    version: 0,
    author: 'AhaOfficial'
});
// * Get
detail.get(); // 0
// * Set
detail.set({
    version: 1,
    author: 'AhaOfficial'
});
// * Update
detail.update(function (data) {
    data.version += 1;
    return data;
});
// * Subscribe
detail.subscribe(function (data) {
    console.log('Changed data', data);
});
// * Unsubscribable
var unsubscribe2 = version.subscribe(function (data) {
    console.log('Changed data', data);
});
unsubscribe2();
var Vote = /** @class */ (function (_super) {
    __extends(Vote, _super);
    function Vote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Vote.prototype.upVote = function () {
        this.update(function (data) {
            data.upVoteCount++;
            return data;
        });
    };
    Vote.prototype.downVote = function () {
        this.update(function (data) {
            data.downVoteCount++;
            return data;
        });
    };
    Vote.prototype.syncWithNetwork = function () {
        // window.axios.update() blablabla
    };
    return Vote;
}(_1.Store));
var vote = new Vote({
    upVoteCount: 0,
    downVoteCount: 0
});
// * Actions
vote.upVote();
vote.downVote();
vote.syncWithNetwork();
