interface ArgType {
    name: string,
    type: string,
    optionVal: any,
    description: string
}

export class TSFlag {
    private _args: Array<string>
    private _argObjList: Array<ArgType> = [];

    constructor(customArgs?: Array<string>) {
        this._args = customArgs || process.argv.slice(2) || [];
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
    * @Return: {option Value converted to int || Error}
    */
    int(name: string, initValue: number, desc: string): number | Error {
        this.setArgObj({ name, type: 'number', optionVal: initValue, description: desc });
        let optionIndex = this.getOptionIndex(name);
        let optionVal = this._args[optionIndex + 1];

        // NOTE - Error Case: not contain, not number
        if (optionIndex < 0) return new Error(` ${name} option is not contained`);
        if (isNaN(parseInt(optionVal))) return new Error(`value of ${name} option is not number`);
        this.changeArgObj(name, optionVal);
        return parseInt(optionVal);
    }

    /**
    * @Method: Convert option value to float
    * @Param: {optionName: string, initValue: number, description: string}
    * @Return: {option Value converted to float || Error}
    */
    float(name: string, initValue: number, desc: string): number | Error {
        this.setArgObj({ name, type: 'number', optionVal: initValue, description: desc });
        let optionIndex = this.getOptionIndex(name);
        let optionVal = this._args[optionIndex + 1];

        // NOTE - Error Case: not contain, not number
        if (optionIndex < 0) return new Error(` ${name} option is not contained`);
        if (isNaN(parseFloat(optionVal))) return new Error(`value of ${name} option is not number`);
        this.changeArgObj(name, optionVal);
        return parseFloat(optionVal);
    }

    /**
    * @Method: get string option value
    * @Param: {optionName: string, initValue: number, description: string}
    * @Return: {string || Error}
    */
    str(name: string, initValue: string, desc: string): string | Error {
        this.setArgObj({ name, type: 'number', optionVal: initValue, description: desc });
        let optionIndex = this.getOptionIndex(name);

        // NOTE - Error Case: not contain, not number
        if (optionIndex < 0) return new Error(` ${name} option is not contained`);

        let optionVal = this._args[optionIndex + 1].toString();
        this.changeArgObj(name, optionVal);
        return optionVal;
    }

    /**
    * @Method: get option length
    * @Param: null
    * @Return: number
    */
    NFlag(): number {
        return this._args.length;
    }

    /**
    * @Method: show option help
    * @Param: null
    * @Return: void (this is just printed option list)
    */
    Usage(): void {
        console.group("Usage of this");
        this._argObjList.forEach(option => {
            console.log(`- ${option.name}<${option.type}>, initValue=${option.optionVal} [${option.description}]`);
        })
        console.groupEnd();
    }

    setArgObj(obj: ArgType) {
        this._argObjList.push(obj);
    }

    getArgObj(): Array<ArgType> {
        return this._argObjList;
    }

    /**
    * @Method: if user input command option name and value, change the value 
    * @Param: optionName, changeValue
    * @Return: void
    */
    changeArgObj(name: string, value: any) {
        this._argObjList.forEach(arg => {
            if (name === arg.name) {
                arg.optionVal = value;
            }
        })
    }

    /**
    * @Method: if user input command option name and value, change the value 
    * @Param: optionName, changeValue
    * @Return: void
    */
    getOptionIndex(name: string) {
        return this._args.findIndex(arg => arg === name || arg === `-${name}` || arg === `--${name}`);
    }
}

