# ionic2-testing-sample

---

Angular2 rc.4 compatible.

---

### Setup
```
$ npm install -g cordova ionic@beta
$ npm install
$ npm run typings
```

### Run (bundler: browserify)
```
$ ionic serve
```

---

### Angular2 unite test (mocha or jasmine) (bundler: webpack)
```
$ npm run karma
or
$ npm run karma:w
```

### rxjs5 marble test (mocha) (bundler: webpack)
```
$ npm run mocha:rxjs
or
$ npm run mocha:rxjs:w
```

### e2e test (nightwatch)
Make sure that 'ionic serve' is running in advance.
```
$ npm run nightwatch
or
$ npm run nightwatch:w
```

### Kick all above tests with one shot (rxjs test -> ng2 test -> e2e test)
In this case, you don't have to run 'ionic serve' in advance.
```
$ npm test
```

---

### Debug app on android device
Connect your android device to your PC via USB cable, then...
```
$ ionic state restore
$ ionic run android
``` 

---

---

## Description (Japanese)

### Angular2 unit test (./tests/test-ng2)

ソースコードを読む順序は下記の通り。

1. karma.conf.js (./tests) (karmaの設定ファイル)
1. webpack.config.test.js (./tests/test-ng2) (webpackの設定ファイル) (bundleが生成される)
1. boot.ts (./tests/test-ng2) (Angular2 unit testのエントリーポイント)
1. specs.ref.ts (./tests/test-ng2) (各テストファイルの読み込み)

上記のうち、specs.ref.ts以外は変更する必要はありません。

テストファイルは ./tests/test-ng2/app 以下に作成し、specs.ref.tsに追記します。(追記しておかないとテストが走りません)

(解説)

ng2のユニットテストはTestComponentBuilderを使うことでView-Component-Serviceの貫通テストを実施することができます。  
ただし通常はComponentはComponentだけ、ServiceはServiceだけでテストするのが基本のようですので、
Componentをテストする際は適宜Serviceのモックを挟む等の作法に慣れておいた方が良いと思います。

サンプルの中ではView-Component-Service-Storeの貫通テストも書いていますが、僕自身はテストを書き始めて1か月くらいの初心者なので作法としては鵜呑みにしないでください。

ユニットテストについて調べたければ[juliemr/ng2-test-seed](https://github.com/juliemr/ng2-test-seed)を読むのが一番早いかと思います。

---

### rxjs5 marble test (./tests/test-rxjs)

ソースコードを読む順序は下記の通り。

1. webpack.config.test.js (./tests/test-rxjs) (webpackの設定ファイル) (bundleが生成される)
1. boot.ts (./tests/test-rxjs) (rxj5 marble testのエントリーポイント)
1. specs.ref.ts (./tests/test-rxjs) (各テストファイルの読み込み)

上記のうち、specs.ref.ts以外は変更する必要はありません。

テストファイルは ./tests/test-rxjs/specs 以下に作成し、specs.ref.tsに追記します。(追記しておかないとテストが走りません)

(解説)

ng2はrxjsをフル活用していますので、我々ユーザーもrxjsの波に乗ってしまった方が賢明です。  
大体はユニットテストでもカバーできますが、複雑なObservableチェーンを組み上げるとき等、rxjsはそれだけでテストした方が良いケースもあります。  
特にtimer系のoperatorを組み込むとng2のユニットテストではことごとくテストしにくくなるので、早い段階でmarble testに慣れましょう。

marble testに関しては[Writing Marble Tests](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md)と
[RxJS(5.x)で行うテストファーストな機能開発](http://blog.mmmcorp.co.jp/blog/2016/06/25/testing-rxjs-5/)が詳しいです。

---

### e2e test (./tests/test-e2e)

ソースコードを読む順序は下記の通り。

1. nightwatch.conf.js (./tests) 
1. nightwatch.json (./tests/config) (上記のjsの中で読み込まれる)
1. ./tests/test-e2e 以下のjsファイル (このフォルダにあるjsファイルは全てテストファイルとして読み込まれる)

テストファイルは ./tests/test-e2e 以下に作成します。

(解説)

AngularならそこはProtractorだろうと言われてしまうと思いますが、残念ながら僕がng2のe2eを手掛け始めた頃はまだProtractorはng2対応していなかったと思います。  
「Angular2 Protractor」でググっても全然情報が出てこなくて困った僕は代替案としてNightwatchを使い始めたのですが、まあこれも悪くはないんじゃないかと最近では思っています。

もしng2を使わなくなったとしてもNightwatchの知見は他にもそのまま生かせそうですしね。

何か調べるときは公式[Nightwatch.js](http://nightwatchjs.org/)が一番早いでしょう。
