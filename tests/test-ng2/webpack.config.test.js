'use strict';

const webpack = require('webpack');

const atlQueryForTest = { // stands for 'awesome-typescript-loader query'
  library: 'es6',
  useBabel: true,
  babelOptions: {
    presets: ['es2015'],
    plugins: ['babel-plugin-espower'] // []
  },
  useCache: true,
  doTypeCheck: false
};


module.exports = {
  entry: ['./tests/test-ng2/testing.boot.ts'],
  output: {
    path: './tests/.bundles',
    filename: 'webpack.bundle.spec.espowered.js',
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/, /typings/],
        // loader: 'babel-loader?presets[]=es2015&plugins[]=babel-plugin-espower!ts-loader', // babel-loaderがbabel-plugin-espowerを読み込む必要がある。
        loader: 'awesome-typescript-loader', // babel-loader!ts-loader と同じようなもの
        query: atlQueryForTest
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  devtool: 'inline-source-map',
};