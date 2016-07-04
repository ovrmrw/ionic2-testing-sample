/* >>> boilerplate */
import assert from 'power-assert';
import lodash from 'lodash';
import { inject, async, fakeAsync, tick, addProviders, TestComponentBuilder, ComponentFixture } from '@angular/core/testing';
import { asyncPower, fakeAsyncPower, setTimeoutPromise, elements, elementText } from '../../../../helpers';
/* <<< boilerplate */

import { NavController } from 'ionic-angular';
import { IncrementPage, Store, UserInfo } from '../../../targets.ref';
import { Observable } from 'rxjs/Rx';


class MockStore {
  private userInfo: UserInfo = {
    userId: '',
    name: 'Satoru Tanaka',
    accessToken: ''
  };
  userInfo$ = Observable.of(this.userInfo);
}


describe('TEST: IncrementPage Component (with MockStore)', () => {
  /* >>> boilerplate */
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      { provide: Store, useClass: MockStore },
      { provide: NavController, useValue: {} }
    ]);
  });

  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));
  /* <<< boilerplate */


  it('can create, should have title', asyncPower(async () => {
    const fixture = await builder.createAsync(IncrementPage);
    const el = fixture.nativeElement as HTMLElement;
    assert(!!fixture);
    assert(elementText(el, 'ion-title').trim() === 'Increment');
  }));


  it('should have Facebook\'s username', fakeAsyncPower(() => {
    let fixture: ComponentFixture<IncrementPage>;
    builder.createAsync(IncrementPage).then(f => fixture = f);
    tick();
    const el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    assert(elementText(el, '#username').trim() === 'Satoru Tanaka');
  }));

});



describe('TEST: IncrementPage Component (with real Store)', () => {
  /* >>> boilerplate */
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      Store,
      { provide: NavController, useValue: {} }
    ]);
  });

  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));
  /* <<< boilerplate */


  it('should increment counter correctly (fakeAsyncPower ver.)', fakeAsyncPower(() => {
    let fixture: ComponentFixture<IncrementPage>;
    builder.createAsync(IncrementPage).then(f => fixture = f);
    tick();
    const el = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();
    assert(elementText(el, '#counter').trim() === '0');

    (<HTMLButtonElement>el.querySelector('button[name="increment"]')).click();
    fixture.detectChanges();
    assert(elementText(el, '#counter').trim() === '1');

    (<HTMLButtonElement>el.querySelector('button[name="increment"]')).click();
    (<HTMLButtonElement>el.querySelector('button[name="increment"]')).click();
    fixture.detectChanges();
    assert(elementText(el, '#counter').trim() === '3');

    (<HTMLButtonElement>el.querySelector('button[name="decrement"]')).click();
    fixture.detectChanges();
    assert(elementText(el, '#counter').trim() === '2');
  }));


  it('should increment counter correctly without View testing (asyncPower ver.)', asyncPower(async () => {
    const fixture = await builder.createAsync(IncrementPage);
    const el = fixture.nativeElement as HTMLElement;
    const component = fixture.componentRef.instance;

    let counter: number;
    component.counter.subscribe(value => counter = value);

    component.increment(); // 1
    component.increment(); // 2
    component.increment(); // 3   
    component.decrement(); // 2
    
    fixture.detectChanges();
    assert(counter === 2);
  }));


});
