"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSFlag = void 0;
var TSFlag = /** @class */ (function () {
    function TSFlag() {
        this._args = process.argv || [];
    }
    /**
    * @Method: Returns the plural form of any noun.
    * @Param: {string}
    * @Return: {string}
    */
    TSFlag.prototype.bool = function (name, value, desc) {
    };
    TSFlag.prototype.show = function () {
        console.log(this._args);
    };
    return TSFlag;
}());
exports.TSFlag = TSFlag;
var tmp = new TSFlag();
tmp.show();
