let flag = require('../lib/ts_flag').TSFlag;

let tsFlag = new flag();
// let args = ["-ea=5", "girlfriend=Jane"];
// let tsFlag = new flag(args);

try {
    // let ea = tsFlag.intArr('ea', [], 'count of tickes');
    // let love = tsFlag.bool('love', false, 'if you love me write this option');
    // let she = tsFlag.strArr('girlfriend', 'everyone', 'my girl friend');
    // console.log(ea, love, she);
    let Astudents = tsFlag.strArr('students', [], 'students of class');
    let Bstudents = tsFlag.strArr('Bstus', ['john', 'mark']);
    let scores = tsFlag.intArr('scores', [], 'scores of students');
    console.log(Astudents, Bstudents, scores);
} catch (e) {
    console.log(e);
    tsFlag.Usage()
}
// tsFlag.Usage();


