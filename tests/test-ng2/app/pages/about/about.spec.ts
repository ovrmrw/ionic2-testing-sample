/* >>> boilerplate */
import assert from 'power-assert';
import lodash from 'lodash';
import { inject, async, fakeAsync, tick, addProviders, TestComponentBuilder, ComponentFixture } from '@angular/core/testing';
import { asyncPower, fakeAsyncPower, setTimeoutPromise, elements, elementText } from '../../../../helpers';
/* <<< boilerplate */

import { NavController } from 'ionic-angular';
import { AboutPage } from '../../../targets.ref';


describe('TEST: AboutPage Component', () => {
  /* >>> boilerplate */
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      { provide: NavController, useValue: {} }
    ]);
  });

  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));
  /* <<< boilerplate */


  it('can create, should have title', asyncPower(async () => {
    const fixture = await builder.createAsync(AboutPage);
    const el = fixture.nativeElement as HTMLElement;
    assert(!!fixture);
    assert(elementText(el, 'ion-title').trim() === 'About');
  }));


  it('should have texts with delay (fakeAsyncPower ver.)', fakeAsyncPower(() => {
    let fixture: ComponentFixture<AboutPage>;
    builder.createAsync(AboutPage).then(f => fixture = f);
    tick();
    const el = fixture.nativeElement as HTMLElement;
    const TEXTS = 'ion-content ion-list ion-item';

    fixture.detectChanges();
    assert(elements(el, TEXTS).length === 1);
    assert(elementText(el, TEXTS, 0).trim() === 'start async');

    tick(1000);
    fixture.detectChanges();
    assert(elements(el, TEXTS).length === 3);
    assert(elementText(el, TEXTS, 2).trim() === 'end async');
  }));


  it('should have texts with delay (asyncPower ver.)', asyncPower(async () => {
    const fixture = await builder.createAsync(AboutPage) as ComponentFixture<AboutPage>;
    const el = fixture.nativeElement as HTMLElement;
    const TEXTS = 'ion-content ion-list ion-item';

    fixture.detectChanges();
    assert(elements(el, TEXTS).length === 1);
    assert(elementText(el, TEXTS, 0).trim() === 'start async');

    await setTimeoutPromise(1000);
    fixture.detectChanges();
    assert(elements(el, TEXTS).length === 3);
    assert(elementText(el, TEXTS, 2).trim() === 'end async');
  }));


});
