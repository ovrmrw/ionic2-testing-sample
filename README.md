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

### Angular2 unit test (mocha or jasmine) (bundler: webpack)
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

### Kick all above tests with one shot! (rxjs test -> ng2 test -> e2e test)
In this case, you don't have to run 'ionic serve' in advance.
```
$ npm test
```

---

### Debug app on android devices
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
1. ./tests/test-ng2/app 以下のtsファイル (テストファイル)

上記のうち、1～3は変更する必要はありません。

テストファイルは ./tests/test-ng2/app 以下に作成し、specs.ref.tsに追記します。(追記しておかないとテストが走りません)

(解説)

ng2のユニットテストはTestComponentBuilderを使うことでView-Component-Serviceの貫通テストを実施することができます。  
ただし通常はComponentはComponentだけ、ServiceはServiceだけでテストするのが基本のようですので、
Componentをテストする際は適宜Serviceのモックを挟む等の作法に慣れておいた方が良いと思います。

サンプルの中ではView-Component-Service-Storeの貫通テストも書いていますが、僕自身はテストを書き始めて1か月くらいの初心者なので作法としては鵜呑みにしないでください。

ng2はZone.jsライブラリによって生成されるZoneという空間の中で実行されます。  
このZoneはsetTimeoutやsetInterval等の関数をフックしているので、通常のfake timer系のライブラリは動きません。(jasmine.clock, sinon, lolex等)  
そういうケースのためにfakeAsyncという関数が@angular/core/testingに用意されています。

ユニットテストについて調べたければ[juliemr/ng2-test-seed](https://github.com/juliemr/ng2-test-seed)を読むのが一番早いかと思います。  
後々のために[angular/zone.js](https://github.com/angular/zone.js/)も把握しておくと良いでしょう。なにせng2はZoneの上で動いていますから。

---

### rxjs5 marble test (./tests/test-rxjs)

ソースコードを読む順序は下記の通り。

1. webpack.config.test.js (./tests/test-rxjs) (webpackの設定ファイル) (bundleが生成される)
1. boot.js (./tests/test-rxjs) (rxjs5 marble testのエントリーポイント)
1. specs.ref.ts (./tests/test-rxjs) (各テストファイルの読み込み)
1. ./tests/test-rxjs/specs 以下のtsファイル (テストファイル)

上記のうち、1～2は変更する必要はありません。

テストファイルは ./tests/test-rxjs/specs 以下に作成し、specs.ref.tsに追記します。(追記しておかないとテストが走りません)

(解説)

ng2はrxjsをフル活用していますので、我々ユーザーもrxjsの波に乗ってしまった方が賢明です。  
大体はユニットテストでもカバーできますが、複雑なObservableチェーンを組み上げるとき等、rxjsはそれだけでテストした方が良いケースもあります。 

特にtimer系のoperatorを組み込むとng2のユニットテストではことごとくテストしにくくなるので、早い段階でmarble testに慣れましょう。慣れておいた方がいいです。悪いことは言わない。

marble testに関しては[Writing Marble Tests](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md)と
[RxJS(5.x)で行うテストファーストな機能開発](http://blog.mmmcorp.co.jp/blog/2016/06/25/testing-rxjs-5/)が詳しいです。

---

### e2e test (./tests/test-e2e)

ソースコードを読む順序は下記の通り。

1. nightwatch.conf.js (./tests) 
1. nightwatch.json (./tests/config) (上記jsの中で読み込まれる)
1. ./tests/test-e2e 以下のjsファイル (このフォルダにあるjsファイルは全てテストファイルとして読み込まれる)

上記のうち、1～2は変更する必要はありません。

テストファイルは ./tests/test-e2e 以下にjsファイルとして作成します。(tsで書いても動きません)

実行時はlocalhost:8100を見に行くので、8100番ポートで別のアプリが既に動いていたりすると当然エラーになります。

(解説)

AngularならそこはProtractorだろうと言われてしまうと思いますが、残念ながら僕がng2のe2eを手掛け始めた頃はまだProtractorはng2対応していなかったと思います。  
「Angular2 Protractor」でググっても全然情報が出てこなくて困った僕は代替案としてNightwatchを使い始めたのですが、まあこれも悪くはないんじゃないかと最近では思っています。

もしng2を使わなくなったとしてもNightwatchの知見は他にもそのまま生かせそうですしね。

今回のサンプルでいうとFacebookログインの部分なんかはe2eの守備範囲かと思います。  
サンプルではログイン後、カウンターをincrementしたりdecrementしたりしていますが、ユーザーの操作をプログラム的に再現できるので色々応用できそうです。

何か調べるときは公式[Nightwatch.js](http://nightwatchjs.org/)が一番早いでしょう。

---

### Android端末へアプリを配信するには

[CircleCIとDeployGateで、IonicのAndroidアプリを自動デプロイ](http://matagotch.hatenablog.com/entry/2015/10/18/193105)を参考にしました。ありがとうございます。

このサンプルもGitHubのdevelopmentブランチにプッシュするとCircleCIでビルドしてDeplyGateからAndroid端末に配信されるように構成してあります。  
circle.ymlの書き方で多少嵌まりましたのでいくつかポイントを挙げておきます。

- nodeはv5にする。(v6はnode-sassで引っかかる)
- `ionic state restore`の前に`ionic hooks add`が必要。
- android sdkは23にする。
- ビルド時に引っかかるのでtypingsのinstallもやっておく必要がある。

CircleCIへのDeployGateのトークン等の登録は上記サイトを参照してください。

Android端末には[DeployGateアプリ](https://play.google.com/store/apps/details?id=com.deploygate&hl=ja)をインストールしておきましょう。

---

### 何か問題が起きたら...

ソースコード読みましょう。(冗談ではなく)  
ドキュメントやサンプルコードは話半分で読み、トラブル時はちょっとググってダメならソースコードをあたるのがイマドキのエンジニアです。

(Angular2系)

1. Angular2 [angular/angular](https://github.com/angular/angular)
1. Zone.js [angular/zone.js](https://github.com/angular/zone.js/)
1. rxjs5 [ReactiveX/rxjs](https://github.com/ReactiveX/rxjs)

(ionic2系)

1. ionic2 [driftyco/ionic](https://github.com/driftyco/ionic)
1. ionic-native [driftyco/ionic-native](https://github.com/driftyco/ionic-native)

他にもバンドル系、webpackやbrowserifyなんかもソースコードを読むようにしておくと色々便利です。  
今回のサンプルではbrowserifyのバンドル工程を一部改造してasync/awaitを使えるようにしてあります。
browserifyは初めて触ったので少々手間取りましたが、そういうのもソースコードを読むということをしないと中々難しいかと思います。

ng2 unit test用のwebpackでは ts -> js(es2015) -> js(es5) -> espower という多段変換をすることで、
power-assertによるエラー補足時にtsファイルの正確な行数まで確認できるようになっています。  
特にテスト初心者はpower-assertから受ける恩恵は大きいと思いますので、こういう技も覚えておくといいですね。
