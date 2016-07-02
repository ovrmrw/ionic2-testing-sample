/* >>> boilerplate */
import { Observable, Subject, TestScheduler } from 'rxjs/Rx';
import chai from 'chai';
const assert = chai.assert;
/* <<< boilerplate */

import { incrementObservable } from '../targets.ref';

describe('TEST: Store', () => {
  /* >>> boilerplate */
  let ts: TestScheduler;
  let hot: typeof TestScheduler.prototype.createHotObservable;
  let cold: typeof TestScheduler.prototype.createColdObservable;

  beforeEach(() => {
    ts = new TestScheduler(assert.deepEqual);
    hot = ts.createHotObservable.bind(ts);
    cold = ts.createColdObservable.bind(ts);
  });
  /* <<< boilerplate */


  it('"incrementObservable" should return correct observable', () => {
    const source$ = hot<number>('---^a-b-c-d-e', { a: 0, b: 1, c: 1, d: 2, e: -1 });
    const marbles = '-a-b-c-d-e';
    const values = { a: 0, b: 1, c: 2, d: 4, e: 3 };
    const test$ = incrementObservable(source$, true);
    ts.expectObservable(test$).toBe(marbles, values);
    ts.flush();
  });

});
