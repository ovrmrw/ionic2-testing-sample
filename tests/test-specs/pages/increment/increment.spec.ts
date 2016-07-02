/**
 *  ===== testing world =====
 */
/* >>> boilerplate */
import assert from 'power-assert';
import lodash from 'lodash';
import { inject, async, fakeAsync, tick, addProviders, TestComponentBuilder, ComponentFixture } from '@angular/core/testing';
// import { asyncPower, fakeAsyncPower, tick, withPower, setTimeoutPromise, elements, elementText } from '../../../test';
import { asyncPower, fakeAsyncPower, setTimeoutPromise, elements, elementText } from '../../../test';
/* <<< boilerplate */

import { NavController } from 'ionic-angular';
import { Store, UserInfo } from '../../../../app/store';
import { IncrementPage } from '../../../../app/pages/increment/increment';
import { Observable } from 'rxjs/Rx';


class MockStore {
  private userInfo: UserInfo = {
    userId: '',
    name: 'Test User',
    accessToken: ''
  };
  userInfo$ = Observable.of(this.userInfo);
}


describe('TEST: IncrementPage Component 1', () => {
  /* >>> boilerplate */
  let builder: TestComponentBuilder;
  let store: Store;

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


  it('can create, should have title', fakeAsyncPower(() => {
    let fixture: ComponentFixture<IncrementPage>;
    builder.createAsync(IncrementPage).then(f => fixture = f);
    tick();
    const el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    assert(elementText(el, '#username').trim() === 'Test User');
  }));

});



describe('TEST: IncrementPage Component 2', () => {
  /* >>> boilerplate */
  let builder: TestComponentBuilder;
  let store: Store;

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


  it('should increment counter correctly', fakeAsyncPower(() => {
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
    fixture.detectChanges();
    assert(elementText(el, '#counter').trim() === '2');

    (<HTMLButtonElement>el.querySelector('button[name="decrement"]')).click();
    fixture.detectChanges();
    assert(elementText(el, '#counter').trim() === '1');
  }));

});
