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
    name: 'Test User',
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


  it('should have Facebook\'s usename', fakeAsyncPower(() => {
    let fixture: ComponentFixture<IncrementPage>;
    builder.createAsync(IncrementPage).then(f => fixture = f);
    tick();
    const el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    assert(elementText(el, 'ame').trim() === 'Test User');
  }));

});


});
