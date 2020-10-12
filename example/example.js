let flag = require('../lib/ts_flag').TSFlag;

// let tsFlag = new flag();
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
// tsFlag.Usage();


