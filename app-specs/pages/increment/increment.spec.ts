/**
 *  ===== testing world =====
 */
/* >>> boilerplate */
import assert from 'power-assert';
import lodash from 'lodash';
import { beforeEach, afterEach, inject, async, fakeAsync, tick, addProviders, TestComponentBuilder, ComponentFixture } from '@angular/core/testing';
// import { asyncPower, fakeAsyncPower, tick, withPower, setTimeoutPromise, elements, elementText } from '../../../test';
import { asyncPower, fakeAsyncPower, setTimeoutPromise, elements, elementText } from '../../../test';
/* <<< boilerplate */

import { NavController } from 'ionic-angular';
import { Store } from '../../../app/store';
import { IncrementPage } from '../../../app/pages/increment/increment';
import { Observable } from 'rxjs/Rx';


class MockStore {
  userName$ = Observable.of('Test User');
}


describe('TEST: IncrementPage Component', () => {
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


  // it('should have title', asyncPower(async () => {
  //   const fixture = await builder.createAsync(IncrementPage);
  //   const el = fixture.nativeElement as HTMLElement;
  // }));

});
