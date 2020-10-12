"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSFlag = void 0;
var TSFlag = /** @class */ (function () {
    function TSFlag(customArgs) {
        this._argObjList = [];
        this._args = customArgs || process.argv.slice(2) || [];
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
    * @Return: {option Value converted to int || initValue (number)}
    */
    TSFlag.prototype.int = function (name, initValue, desc) {
        this.setArgObj({ name: name, type: 'number', optionVal: initValue, description: desc });
        var optionIndex = this.getOptionIndex(name);
        var optionVal = this._args[optionIndex].split("=")[1];
        if (!optionVal)
            return initValue;
        if (isNaN(parseInt(optionVal)))
            throw new Error("value of " + name + " option is not number");
        this.changeArgObj(name, optionVal);
        return parseInt(optionVal);
    };
    TSFlag.prototype.intArr = function (name, initValue, desc) {
        this.setArgObj({ name: name, type: 'number', optionVal: initValue, description: desc });
        var optionIndex = this.getOptionIndex(name);
        var optionVal = this._args[optionIndex].split("=")[1];
        if (!optionVal)
            return initValue;
        var valueList = [];
        optionVal.split(",").forEach(function (val) {
            if (isNaN(parseInt(optionVal)))
                throw new Error("value of " + val + " option is not number");
            valueList.push(parseInt(val));
        });
        return valueList;
    };
    /**
    * @Method: Convert option value to float
    * @Param: {optionName: string, initValue: number, description: string}
    * @Return: {option Value converted to float || Error}
    */
    TSFlag.prototype.float = function (name, initValue, desc) {
        this.setArgObj({ name: name, type: 'number', optionVal: initValue, description: desc });
        var optionIndex = this.getOptionIndex(name);
        var optionVal = this._args[optionIndex].split("=")[1];
        if (!optionVal)
            return initValue;
        // NOTE - if not converted number, throw error
        if (isNaN(parseFloat(optionVal)))
            throw new Error("value of " + name + " option is not number");
        this.changeArgObj(name, optionVal);
        return parseFloat(optionVal);
    };
    TSFlag.prototype.floatArr = function (name, initValue, desc) {
        this.setArgObj({ name: name, type: 'number', optionVal: initValue, description: desc });
        var optionIndex = this.getOptionIndex(name);
        var optionVal = this._args[optionIndex].split("=")[1];
        if (!optionVal)
            return initValue;
        var valueList = [];
        optionVal.split(",").forEach(function (val) {
            if (isNaN(parseFloat(optionVal)))
                throw new Error("value of " + val + " option is not number");
            valueList.push(parseFloat(val));
        });
        return valueList;
    };
    /**
    * @Method: get string option value
    * @Param: {optionName: string, initValue: number, description: string}
    * @Return: {string || Error}
    */
    TSFlag.prototype.str = function (name, initValue, desc) {
        this.setArgObj({ name: name, type: 'number', optionVal: initValue, description: desc });
        var optionIndex = this.getOptionIndex(name);
        var optionVal = this._args[optionIndex].split("=")[1];
        if (!optionVal)
            return initValue;
        this.changeArgObj(name, optionVal.toString());
        return optionVal.toString();
        ;
    };
    TSFlag.prototype.strArr = function (name, initValue, desc) {
        this.setArgObj({ name: name, type: 'number', optionVal: initValue, description: desc });
        var optionIndex = this.getOptionIndex(name);
        var optionVal = this._args[optionIndex].split("=")[1];
        if (!optionVal)
            return initValue;
        var valueList = optionVal.split(",");
        this.changeArgObj(name, valueList);
        return valueList;
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
    /**
    * @Method: if user input command option name and value, change the value
    * @Param: optionName, changeValue
    * @Return: void
    */
    TSFlag.prototype.changeArgObj = function (name, value) {
        this._argObjList.forEach(function (arg) {
            if (name === arg.name) {
                arg.optionVal = value;
            }
        });
    };
    /**
    * @Method: if user input command option name and value, change the value
    * @Param: optionName, changeValue
    * @Return: void
    */
    TSFlag.prototype.getOptionIndex = function (name) {
        var optionIndex = this._args.findIndex(function (arg) { return arg.includes(name) || arg.includes("-" + name) || arg.includes("--" + name); });
        // NOTE - if not contained, throw error
        if (optionIndex < 0)
            throw new Error(name + " option is not contained");
        return optionIndex;
    };
    return TSFlag;
}());
exports.TSFlag = TSFlag;
