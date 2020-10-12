interface ArgType {
    name: string;
    type: string;
    optionVal: any;
    description: string;
}
export declare class TSFlag {
    private _args;
    private _argObjList;
    constructor(customArgs?: Array<string>);
    /**
    * This is never returns Error because if not contained option it returns false
    * @Method: Returns value(Boolean) of option
    * @Param: {optionName: string, initValue: boolean, description: string}
    * @Return: {Boolean}
    */
    bool(name: string, initValue: boolean, desc: string): boolean;
    /**
    * @Method: Convert option value to integer
    * @Param: {optionName: string, initValue: number, description: string}
    * @Return: {option Value converted to int || Error}
    */
    int(name: string, initValue: number, desc: string): number | Error;
    /**
    * @Method: Convert option value to float
    * @Param: {optionName: string, initValue: number, description: string}
    * @Return: {option Value converted to float || Error}
    */
    float(name: string, initValue: number, desc: string): number | Error;
    /**
    * @Method: get string option value
    * @Param: {optionName: string, initValue: number, description: string}
    * @Return: {string || Error}
    */
    str(name: string, initValue: string, desc: string): string | Error;
    /**
    * @Method: get option length
    * @Param: null
    * @Return: number
    */
    NFlag(): number;
    /**
    * @Method: show option help
    * @Param: null
    * @Return: void (this is just printed option list)
    */
    Usage(): void;
    setArgObj(obj: ArgType): void;
    getArgObj(): Array<ArgType>;
    /**
    * @Method: if user input command option name and value, change the value
    * @Param: optionName, changeValue
    * @Return: void
    */
    changeArgObj(name: string, value: any): void;
    /**
    * @Method: if user input command option name and value, change the value
    * @Param: optionName, changeValue
    * @Return: void
    */
    getOptionIndex(name: string): number;
}
export {};
