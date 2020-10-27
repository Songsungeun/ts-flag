import { TSFlag } from '../lib/ts_flag';

let flag = new TSFlag();

try {
  let ea: number = flag.str('ea', 0, 'count of tickes'); // error ea type is number but return type is string, and then parameter type error
  let ea2: number = flag.int('ea', 0, 'correct type');
} catch (e) {
  console.log(e);
  flag.Usage();
}