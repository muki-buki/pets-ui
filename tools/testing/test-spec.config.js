Error.stackTraceLimit = Infinity;

require('core-js/es6');
require('reflect-metadata');
require('ts-helpers');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');
require('zone.js/dist/proxy');
require('zone.js/dist/jasmine-patch');
require('rxjs/Rx');
require('./jasmine-matchers');

const testing = require('@angular/core/testing');
const browser = require('@angular/platform-browser-dynamic/testing');

testing.getTestBed().initTestEnvironment(
  browser.BrowserDynamicTestingModule,
  browser.platformBrowserDynamicTesting()
);

const testContext = require.context('../../src/app', true, /\.spec\.ts/);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

const modules = requireAll(testContext);
