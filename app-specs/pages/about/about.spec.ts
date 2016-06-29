import { AboutPage } from '../../../app/pages/about/about';
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


describe('AboutPage TEST ' + '-'.repeat(40), () => {
  /* >>> boilerplate */
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [
    { provide: NavController, useValue: {} }
  ]);

  beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    builder = tcb;
  }));
  /* <<< boilerplate */


  it('can create', asyncPower(async () => {
    const fixture = await builder.createAsync(AboutPage);
    assert(!!fixture);
  }));


  it('exprimental', fakeAsyncPower(() => {
    let fixture;
    builder.createAsync(AboutPage).then(f => fixture = f);
    tick();
    const el = fixture.nativeElement as HTMLElement;
    const TEXTS = 'ul li';

    fixture.detectChanges();
    assert(elements(el, TEXTS).length === 1);
    assert(elementText(el, TEXTS, 0) === 'start async');

    tick(1000);
    fixture.detectChanges();
    assert(elements(el, TEXTS).length === 3);
    assert(elementText(el, TEXTS, 2) === 'end async');
  }));

});
