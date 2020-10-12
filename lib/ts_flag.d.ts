interface ArgType {
    name: string;
    type: string;
    optionVal: any;
    description: string;
}
export declare class TSFlag {
    private _args;
    private _argObj;
    constructor();
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
    * @Return: {converted Value || Error}
    */
    int(name: string, initValue: number, desc: string): number | Error;
    float(name: string, initValue: number, desc: string): number | Error;
    str(name: string, initValue: string, desc: string): string | Error;
    setArgObj(obj: ArgType): void;
    getArgObj(): Array<ArgType>;
    changeArgObj(name: string, value: any): void;
}
export {};
