// declare var Error: any;
// Error.stackTraceLimit = Infinity;

import 'es6-shim';
import 'babel-polyfill';

import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
try {
  require('zone.js/dist/jasmine-patch');
} catch (e) { 
  console.log('"zone.js/dist/jasmine-patch" is not loaded because Framework is not Jasmine but (maybe) Mocha.');
}
import 'zone.js/dist/async-test'; // asyncテストに必要
import 'zone.js/dist/fake-async-test'; // fakeAsyncテストに必要

import { resetBaseTestProviders, setBaseTestProviders } from '@angular/core/testing';

import {
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS
} from '@angular/platform-browser-dynamic/testing';

resetBaseTestProviders();
setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);


import '../app-specs/specs.ref'; // テストしたいTSファイル
