import { IncrementPage } from '../../../app/pages/increment/increment';
import { NavController } from 'ionic-angular';


/**
 *  ===== testing world =====
 */
/* >>> boilerplate */
import * as assert from 'power-assert';
import * as lodash from 'lodash';
import { describe, it, iit, xit, beforeEach, beforeEachProviders, afterEach, inject } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { asyncPower, fakeAsyncPower, tick, withPower, setTimeoutPromise, elements, elementText } from '../../../test';
/* <<< boilerplate */


describe('TEST: IncrementPage Component', () => {
  /* >>> boilerplate */
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [
    // { provide: NavController, useValue: { present: NavController.prototype.present } }
    { provide: NavController, useValue: {} }
  ]);

  beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    builder = tcb;
  }));
  /* <<< boilerplate */


  it('can create, should have title', asyncPower(async () => {
    const fixture = await builder.createAsync(IncrementPage);
    const el = fixture.nativeElement as HTMLElement;
    assert(!!fixture);
    assert(elementText(el, 'ion-title').trim() === 'Increment');
  }));


  // it('should have title', asyncPower(async () => {
  //   const fixture = await builder.createAsync(IncrementPage);
  //   const el = fixture.nativeElement as HTMLElement;
  // }));

});
