'use strict';

var gulp = require("gulp");
var del = require('del');
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var exorcist = require('exorcist');
var browserSync = require('browser-sync').create();
var jest = require('jest-cli');
var httpProxy = require('http-proxy');

//gulp.task('default', ['clean', 'js']);

gulp.task('clean', function(cb) {
  del([
    'dist/**/*',
  ], cb);
});

// Input file.
watchify.args.debug = true;
var bundler = watchify(browserify('./src/js/app.js', watchify.args));

// Babel transform
bundler.transform(babelify.configure({
  sourceMapRelative: 'app/js'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {

  gutil.log('Compiling JS...');

  return bundler.bundle()
    .on('error', function(err) {
      gutil.log(err.message);
      browserSync.notify("Browserify Error!");
      this.emit("end");
    })
    .pipe(exorcist('src/js/dist/bundle.js.map'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./src/js/dist'))
    .pipe(browserSync.stream({
      once: true
    }));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', function() {
  return bundle();
});

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['bundle'], function() {
  browserSync.init({
    server: {
      baseDir: "./src",
      middleware: proxyMiddleware
    }
  });
});

//create proxy to backend server
var proxy = httpProxy.createProxyServer({
  target: 'http://localhost:3000/'
});

var proxyMiddleware = function(req, res, next) {
  if (req.url.indexOf('api') != -1) {
    proxy.web(req, res);
  } else {
    next();
  }
};
