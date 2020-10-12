# jsflag
the commandline parser for node.js, inspired by Go's Flag package

## Installation
npm install tsflag

## USAGE
```javasript
let flag = require('ts_flag').TSFlag;
let tsFlag = new flag();

try {
    let ea = tsFlag.int('ea', 0, 'count of tickes');
    let love = tsFlag.bool('love', false, 'if you love me write this option');
    let she = tsFlag.str('girlfriend', 'everyone', 'my girl friend');
    console.log(ea, love, she);
} catch (e) {
    console.log(e);
    tsFlag.Usage()
}

```
### Example
```console
node .\example.js -ea=1 -love -girlfriend=Jane
=> 1 true Jane

node .\example.js -ea=1 -girlfriend=Jane
=> 1 false Jane

node .\example.js -ea -girlfriend=Jane
=> 0 false Jane

node .\example.js -ea -girlfriend
=> 0 false everyone
```

###### if not set optionName (except Boolean Type)
```console
node .\example.js -ea=1
Error: girlfriend option is not contained
  at stack history...
Usage of this
  - ea<number>, initValue=1 [count of tickes]
  - love<boolean>, initValue=false [if you love me write this option]
  - girlfriend<number>, initValue=everyone [my girl friend]
```

### if you want the custom Arguments, inject a stringArray into the constructor
```javasript
let flag = require('ts_flag').TSFlag;
let args = ["-ea=5", "girlfriend=Jane"];
let tsFlag = new flag(args);

try {
    let ea = tsFlag.int('ea', 0, 'count of tickes');
    let love = tsFlag.bool('love', false, 'if you love me write this option');
    let she = tsFlag.str('girlfriend', 'everyone', 'my girl friend');
    console.log(ea, love, she);
} catch (e) {
    console.log(e);
    tsFlag.Usage()
}

```

