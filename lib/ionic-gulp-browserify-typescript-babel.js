/*
  編集元のファイルとバージョン
  "name": "ionic-gulp-browserify-typescript"
  "version": "2.0.0"
*/


var gulp = require('gulp'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  tsify = require('tsify'),
  pretty = require('prettysize'),
  merge = require('lodash').merge,
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  stream = require('stream');

var defaultOptions = {
  watch: false,
  src: ['./app/app.ts', './typings/index.d.ts'],
  outputPath: 'www/build/js/',
  outputFile: 'app.bundle.js',
  minify: false,
  browserifyOptions: {
    cache: {},
    packageCache: {},
    debug: true
  },
  watchifyOptions: {},
  tsifyOptions: {},
  uglifyOptions: {},
  onError: function (err) {
    console.error(err.toString());
    this.emit('end');
  },
  onLog: function (log) {
    console.log((log = log.split(' '), log[0] = pretty(log[0]), log.join(' ')));
  }
}

module.exports = function (options) {
  options = merge(defaultOptions, options);


  /* >>> Edited */
  // var b = browserify(options.src, options.browserifyOptions)
  //   .plugin(tsify, options.tsifyOptions);  
  console.log('Loading Custom Module: ionic-gulp-browserify-typescript-babel');
  var stringify = require('stringify');
  var babelify = require('babelify');
  var b = browserify(options.src, options.browserifyOptions)
    .transform(stringify(['.html'])) // htmlファイルをrequire出来るようにする。
    .plugin(tsify, options.tsifyOptions) // tsファイルをtarget:es2015でトランスパイル。
    .transform(babelify, { // tsifyしたデータをbabelでさらにトランスパイル。
      presets: ['es2015'],
      extensions: ['.tsx', '.ts'] // これを書かないとtransformされない。
    });
  /* <<< Edited */


  if (options.watch) {
    b = watchify(b, options.watchifyOptions);
    b.on('update', bundle);
    b.on('log', options.onLog);
  }

  return bundle();

  function bundle() {
    var debug = options.browserifyOptions.debug;
    return b.bundle()
      .on('error', options.onError)
      .pipe(source(options.outputFile))
      .pipe(buffer())
      .pipe(debug ? sourcemaps.init({ loadMaps: true }) : noop())
      .pipe(options.minify ? uglify(options.uglifyOptions) : noop())
      .pipe(debug ? sourcemaps.write('./', { includeContent: true, sourceRoot: '../../../' }) : noop())
      .pipe(gulp.dest(options.outputPath));
  }

  function noop() {
    return new stream.PassThrough({ objectMode: true });
  }
}
