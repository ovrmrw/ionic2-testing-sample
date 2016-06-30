# ionic2-testing-sample
Testing ionic2

---

###Setup
Edit l17 in "app/services/facebook.ts".

```
FB.init(
    {
        appId: '【input your facebook appID】',
        xfbml: false,
        version: 'v2.5'
    }
);
```

```
$ npm install
```

###Run
```
$ ionic serve
```

###Angular2 Test (jasmine)
```
$ npm run karma
or
$ npm run karma:w
```

###RxJS Test (mocha)
```
$ npm run mocha:rxjs
or
$ npm run mocha:rxjs:w
```
