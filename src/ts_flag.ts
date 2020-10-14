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
    * @Return: {option Value converted to int || initValue (number)}
    */
    int(name: string, initValue: number, desc: string): number {
        this.setArgObj({ name, type: 'number', optionVal: initValue, description: desc });
        let optionIndex = this.getOptionIndex(name);
        let optionVal = this._args[optionIndex].split("=")[1];

        if (!optionVal) return initValue;

        if (isNaN(parseInt(optionVal))) throw new Error(`value of ${name} option is not number`);
        this.changeArgObj(name, optionVal);
        return parseInt(optionVal);
    }

    intArr(name: string, initValue: Array<number>, desc: string) {
        this.setArgObj({ name, type: 'number', optionVal: initValue, description: desc });
        let optionIndex = this.getOptionIndex(name);
        let optionVal = this._args[optionIndex].split("=")[1];
        if (!optionVal) return initValue;

        let valueList: Array<number> = [];

        optionVal.split(",").forEach(val => {
            if (isNaN(parseInt(optionVal))) throw new Error(`value of ${val} option is not number`);
            valueList.push(parseInt(val))
        })

        return valueList;
    }

    /**
    * @Method: Convert option value to float
    * @Param: {optionName: string, initValue: number, description: string}
    * @Return: {option Value converted to float || Error}
    */
    float(name: string, initValue: number, desc: string): number {
        this.setArgObj({ name, type: 'number', optionVal: initValue, description: desc });
        let optionIndex = this.getOptionIndex(name);
        let optionVal = this._args[optionIndex].split("=")[1];

        if (!optionVal) return initValue;

        // NOTE - if not converted number, throw error
        if (isNaN(parseFloat(optionVal))) throw new Error(`value of ${name} option is not number`);
        this.changeArgObj(name, optionVal);
        return parseFloat(optionVal);
    }

    floatArr(name: string, initValue: Array<number>, desc: string) {
        this.setArgObj({ name, type: 'number', optionVal: initValue, description: desc });
        let optionIndex = this.getOptionIndex(name);
        let optionVal = this._args[optionIndex].split("=")[1];
        if (!optionVal) return initValue;

        let valueList: Array<number> = [];

        optionVal.split(",").forEach(val => {
            if (isNaN(parseFloat(optionVal))) throw new Error(`value of ${val} option is not number`);
            valueList.push(parseFloat(val))
        })

        return valueList;
    }

    /**
    * @Method: get string option value
    * @Param: {optionName: string, initValue: number, description: string}
    * @Return: {string || Error}
    */
    str(name: string, initValue: string, desc: string): string {
        this.setArgObj({ name, type: 'number', optionVal: initValue, description: desc });
        let optionIndex = this.getOptionIndex(name);
        let optionVal = this._args[optionIndex].split("=")[1];
        if (!optionVal) return initValue;

        this.changeArgObj(name, optionVal.toString());
        return optionVal.toString();;
    }

    strArr(name: string, initValue: Array<string>, desc: string) {
        this.setArgObj({ name, type: 'number', optionVal: initValue, description: desc });
        let optionIndex = this.getOptionIndex(name);
        let optionVal = this._args[optionIndex].split("=")[1];
        if (!optionVal) return initValue;

        let valueList = optionVal.split(",");
        this.changeArgObj(name, valueList);
        return valueList;
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
        let optionIndex = this._args.findIndex(arg => {
            let option = arg.split("=")[0].trim();
            return option === name || option === `-${name}` || option === `--${name}`;
        });
        // NOTE - if not contained, throw error
        if (optionIndex < 0) throw new Error(`${name} option is not contained`);
        return optionIndex;
    }
}

