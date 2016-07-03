# ionic2-testing-sample
Testing ionic2

---

Angular2 rc.4 compatible.

###Setup
```
$ npm install
$ npm run typings
```

###Run (bundler: browserify)
```
$ ionic serve
```

###Angular2 test (mocha or jasmine) (bundler: webpack)
```
$ npm run karma
or
$ npm run karma:w
```

###rxjs5 marble test (mocha) (bundler: webpack)
```
$ npm run mocha:rxjs
or
$ npm run mocha:rxjs:w
```

###e2e test (nightwatch)
```
$ npm run nightwatch
or
$ npm run nightwatch:w
```

###Kick all above tests with one shot (rxjs test -> ng2 test -> e2e test)
```
$ npm test
```