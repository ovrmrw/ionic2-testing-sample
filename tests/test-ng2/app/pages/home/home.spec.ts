/* >>> boilerplate */
import assert from 'power-assert';
import lodash from 'lodash';
import { inject, async, fakeAsync, tick, addProviders, TestComponentBuilder, ComponentFixture } from '@angular/core/testing';
import { asyncPower, fakeAsyncPower, setTimeoutPromise, elements, elementText } from '../../../../helpers';
/* <<< boilerplate */

import { NavController } from 'ionic-angular';
import { HomePage, Store, UserInfo } from '../../../targets.ref';
import { Observable } from 'rxjs/Rx';


describe('TEST: HomePage Component', () => {
  /* >>> boilerplate */
  let builder: TestComponentBuilder;
  let store: Store;

  beforeEach(() => {
    addProviders([
      Store,
      { provide: NavController, useValue: {} }
    ]);
  });

  beforeEach(inject([TestComponentBuilder, Store], (tcb, _store) => {
    builder = tcb;
    store = _store;
  }));
  /* <<< boilerplate */


  it('can create, should have title', asyncPower(async () => {
    const fixture = await builder.createAsync(HomePage);
    const el = fixture.nativeElement as HTMLElement;
    assert(!!fixture);
    assert(elementText(el, 'ion-title').trim() === 'Home');
  }));


  it('should have welcome message with Facebook\'s username', fakeAsyncPower(() => {
    const userInfo: UserInfo = {
      userId: '',
      name: 'Ichiro Takahashi',
      accessToken: ''
    };
    store.putUserInfo(userInfo); // StoreにUserInfoをセットする。これがHomePageのViewに反映されることをテストする。
    
    let fixture: ComponentFixture<HomePage>;
    builder.createAsync(HomePage).then(f => fixture = f);
    tick();
    const el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    assert(elementText(el, 'h2[name="welcome"]').trim() === 'Welcome to Ionic, Ichiro Takahashi!');
  }));

});
