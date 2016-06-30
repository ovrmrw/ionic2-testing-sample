/* >>> boilerplate */
import { Observable, Subject, TestScheduler } from 'rxjs/Rx';
import chai from 'chai';
const assert = chai.assert;
/* <<< boilerplate */


describe('Observable', () => {
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


  it('should return correct observable', () => {
    const source$ = cold<number>('-a-b-c', { a: 1, b: 2, c: 3 });
    const marbles = '---b-c';
    const values = { a: 10, b: 20, c: 30 };
    const test$ = mapFilterTest(source$);
    ts.expectObservable(test$).toBe(marbles, values);
    ts.flush();
  });


  it('should pass', () => {
    assert(1 + 1 === 2);
  });

});


function mapFilterTest(observable: Observable<number>): Observable<number> {
  return observable
    .map(value => value * 10)
    .filter(value => value > 10);
}