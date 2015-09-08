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

function createBundler() {
  watchify.args.debug = true;
  var bundler = watchify(browserify(watchify.args));

  // Babel transform
  bundler.transform(babelify.configure({
    sourceMapRelative: 'app/js'
  }));

  // On updates recompile
  bundler.on('update', bundle);
  return bundler;
}

function bundle() {
  gutil.log('Compiling JS...');
  var b = createBundler();
  b.add('./example/app.js');
  return b.bundle()
    .on('error', function(err) {
      gutil.log(err.message);
      browserSync.notify("Browserify Error!");
      this.emit("end");
    })
    .pipe(exorcist('example/bundle.js.map'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./example'))
    .pipe(browserSync.stream({
      once: true
    }));
}


gulp.task('bundle', function() {
  return bundle();
});

gulp.task('dev', ['bundle'], function() {
  browserSync.init({
    server: {
      baseDir: "./example"
    }
  });
});
