
export class TSFlag {
    private _args: Array<string>

    constructor() {
        this._args = process.argv || [];
    }

    /**
    * @Method: Returns the plural form of any noun.
    * @Param: {string}
    * @Return: {string}
    */
    bool(name: string, value: boolean, desc: string) {

    }

    show() {
        console.log(this._args);
    }
}

let tmp = new TSFlag();
tmp.show();