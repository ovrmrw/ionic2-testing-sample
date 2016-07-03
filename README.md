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

---

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
Make sure that 'ionic serve' is running in advance.
```
$ npm run nightwatch
or
$ npm run nightwatch:w
```

###Kick all above tests with one shot (rxjs test -> ng2 test -> e2e test)
In this case, you don't have to run 'ionic serve' in advance.
```
$ npm test
```

---

###Debug app on android device
Connect your android device to your PC via USB cable, then...
```
$ ionic state restore
$ ionic run android
``` 