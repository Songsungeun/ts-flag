interface ArgType {
    name: string,
    type: string,
    optionVal: any,
    description: string
}

export class TSFlag {
    private _args: Array<string>
    private _argObj: Array<ArgType> = [];

    constructor() {
        this._args = process.argv || [];
    }

    /**
    * This is never returns Error because if not contained option it returns false
    * @Method: Returns value(Boolean) of option
    * @Param: {optionName: string, initValue: boolean, description: string}
    * @Return: {Boolean}
    */
    bool(name: string, initValue: boolean, desc: string): boolean {
        this.setArgObj({ name, type: 'boolean', optionVal: initValue, description: desc });
        let optionVal = this._args.some(arg => arg === name || arg === `-${name}` || arg === `--${name}`);
        this.changeArgObj(name, optionVal);
        return optionVal;
    }

    /**
    * @Method: Convert option value to integer
    * @Param: {optionName: string, initValue: number, description: string}
    * @Return: {converted Value || Error}
    */
    int(name: string, initValue: number, desc: string): number | Error {
        this.setArgObj({ name, type: 'number', optionVal: initValue, description: desc });
        let optionIndex = this._args.findIndex(arg => arg === name || arg === `-${name}` || arg === `--${name}`);
        let optionVal = this._args[optionIndex + 1];

        // NOTE - Error Case: not contain, not number
        if (!optionVal) return new Error(` ${name} option is not contained`);
        if (isNaN(parseInt(optionVal))) return new Error(`value of ${name} option is not number`);
        this.changeArgObj(name, optionVal);
        return parseInt(optionVal);
    }

    setArgObj(obj: ArgType) {
        this._argObj.push(obj);
    }

    getArgObj(): Array<ArgType> {
        return this._argObj;
    }

    // init: set ArgType(value = initValue),
    // if user input command option name and value, change the value 
    changeArgObj(name: string, value: any) {
        this._argObj.forEach(arg => {
            if (name === arg.name) {
                arg.optionVal = value;
            }
        })
    }
}

let tmp = new TSFlag();
let result = tmp.int('nim', 0, 'test');

