"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSFlag = void 0;
var TSFlag = /** @class */ (function () {
    function TSFlag() {
        this._argObj = [];
        this._args = process.argv || [];
    }
    /**
    * This is never returns Error because if not contained option it returns false
    * @Method: Returns value(Boolean) of option
    * @Param: {optionName: string, initValue: boolean, description: string}
    * @Return: {Boolean}
    */
    TSFlag.prototype.bool = function (name, initValue, desc) {
        this.setArgObj({ name: name, type: 'boolean', optionVal: initValue, description: desc });
        var optionVal = this._args.some(function (arg) { return arg === name || arg === "-" + name || arg === "--" + name; });
        this.changeArgObj(name, optionVal);
        return optionVal;
    };
    /**
    * @Method: Convert option value to integer
    * @Param: {optionName: string, initValue: number, description: string}
    * @Return: {converted Value || Error}
    */
    TSFlag.prototype.int = function (name, initValue, desc) {
        this.setArgObj({ name: name, type: 'number', optionVal: initValue, description: desc });
        var optionIndex = this._args.findIndex(function (arg) { return arg === name || arg === "-" + name || arg === "--" + name; });
        var optionVal = this._args[optionIndex + 1];
        // NOTE - Error Case: not contain, not number
        if (!optionVal)
            return new Error(" " + name + " option is not contained");
        if (isNaN(parseInt(optionVal)))
            return new Error("value of " + name + " option is not number");
        this.changeArgObj(name, optionVal);
        return parseInt(optionVal);
    };
    TSFlag.prototype.setArgObj = function (obj) {
        this._argObj.push(obj);
    };
    TSFlag.prototype.getArgObj = function () {
        return this._argObj;
    };
    // init: set ArgType(value = initValue),
    // if user input command option name and value, change the value 
    TSFlag.prototype.changeArgObj = function (name, value) {
        this._argObj.forEach(function (arg) {
            if (name === arg.name) {
                arg.optionVal = value;
            }
        });
    };
    return TSFlag;
}());
exports.TSFlag = TSFlag;
var tmp = new TSFlag();
var result = tmp.int('nim', 0, 'test');
