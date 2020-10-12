"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSFlag = void 0;
var TSFlag = /** @class */ (function () {
    function TSFlag() {
        this._argObjList = [];
        this._args = process.argv.slice(2) || [];
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
    * @Return: {option Value converted to int || Error}
    */
    TSFlag.prototype.int = function (name, initValue, desc) {
        this.setArgObj({ name: name, type: 'number', optionVal: initValue, description: desc });
        var optionIndex = this._args.findIndex(function (arg) { return arg === name || arg === "-" + name || arg === "--" + name; });
        var optionVal = this._args[optionIndex + 1];
        // NOTE - Error Case: not contain, not number
        if (optionIndex < 0)
            return new Error(" " + name + " option is not contained");
        if (isNaN(parseInt(optionVal)))
            return new Error("value of " + name + " option is not number");
        this.changeArgObj(name, optionVal);
        return parseInt(optionVal);
    };
    /**
    * @Method: Convert option value to float
    * @Param: {optionName: string, initValue: number, description: string}
    * @Return: {option Value converted to float || Error}
    */
    TSFlag.prototype.float = function (name, initValue, desc) {
        this.setArgObj({ name: name, type: 'number', optionVal: initValue, description: desc });
        var optionIndex = this._args.findIndex(function (arg) { return arg === name || arg === "-" + name || arg === "--" + name; });
        var optionVal = this._args[optionIndex + 1];
        // NOTE - Error Case: not contain, not number
        if (optionIndex < 0)
            return new Error(" " + name + " option is not contained");
        if (isNaN(parseFloat(optionVal)))
            return new Error("value of " + name + " option is not number");
        this.changeArgObj(name, optionVal);
        return parseFloat(optionVal);
    };
    /**
    * @Method: get string option value
    * @Param: {optionName: string, initValue: number, description: string}
    * @Return: {string || Error}
    */
    TSFlag.prototype.str = function (name, initValue, desc) {
        this.setArgObj({ name: name, type: 'number', optionVal: initValue, description: desc });
        var optionIndex = this._args.findIndex(function (arg) { return arg === name || arg === "-" + name || arg === "--" + name; });
        // NOTE - Error Case: not contain, not number
        if (optionIndex < 0)
            return new Error(" " + name + " option is not contained");
        var optionVal = this._args[optionIndex + 1].toString();
        this.changeArgObj(name, optionVal);
        return optionVal;
    };
    /**
    * @Method: get option length
    * @Param: null
    * @Return: number
    */
    TSFlag.prototype.NFlag = function () {
        return this._args.length;
    };
    /**
    * @Method: show option help
    * @Param: null
    * @Return: void (this is just printed option list)
    */
    TSFlag.prototype.Usage = function () {
        console.group("Usage of this");
        this._argObjList.forEach(function (option) {
            console.log("- " + option.name + "<" + option.type + ">, initValue=" + option.optionVal + " [" + option.description + "]");
        });
        console.groupEnd();
    };
    TSFlag.prototype.setArgObj = function (obj) {
        this._argObjList.push(obj);
    };
    TSFlag.prototype.getArgObj = function () {
        return this._argObjList;
    };
    // init: set ArgType(value = initValue),
    // if user input command option name and value, change the value 
    TSFlag.prototype.changeArgObj = function (name, value) {
        this._argObjList.forEach(function (arg) {
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
var result2 = tmp.bool('f', false, 'bool description');
var result3 = tmp.str("s", "", "this is string description");
var result4 = tmp.float('float', 0, 'this is float description');
tmp.Usage();
// console.log(result);
// let check = tmp.str("s", "", "Hello");
// console.log(check);
