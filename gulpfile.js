var gulp = require('gulp');

// GENERAL UTILTY PACKAGES
var util = require('gulp-util');
var plumber = require('gulp-plumber');
var notifier = require('node-notifier');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');

// IMAGE PACKAGES
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');

// JS PACKAGES
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

// STYL PACKAGES
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var swiss = require('kouto-swiss');
var stylint = require('gulp-stylint');

// PATHS
var source = {
  javascript: 'src/js/main.js',
  stylus: 'src/styl/site.styl',
}

var watch = {
  javascript: 'src/js/main.js',
  stylus: ['src/styl/site.styl'],
  images: 'src/img/**.*'
}

var destination = {
  javascript: 'dist/js',
  css: 'dist/css',
  stylusLibrary: 'src/styl/library',
  images: 'dist/img'
}

// FUNCTIONS
function handleErrors(error) {
  util.log(util.colors.red(error.name + ' (' + error.plugin + '): ' + error.message));

  notifier.notify({
    title: error.name,
    subtitle: error.plugin,
    message: error.message,
    wait: true,
    sound: true
  });

  this.emit('end');
}

// JAVASCRIPT TASKS
gulp.task('javascript', function() {
  return gulp.src(source.javascript)
  .pipe(plumber(handleErrors))
  .pipe(sourcemaps.init())
  .pipe(uglify({mangle: false}))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('/'))
  .pipe(gulp.dest(destination.javascript));
});

gulp.task('javascript-lint', function() {
  return gulp.src(source.javascript)
  .pipe(plumber(handleErrors))
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jscs('.jscsrc'));
});

// STYLE TASKS
gulp.task('style', function() {
  return gulp.src(source.stylus)
  .pipe(plumber(handleErrors))
  .pipe(stylus({
    use: [
      swiss()
    ],
  }))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(cssnano())
  .pipe(gulp.dest(destination.css));
});

gulp.task('style-lint', function () {
  return gulp.src(watch.stylus)
  .pipe(plumber(handleErrors))
  .pipe(stylint({config: '.stylintrc'}))
  .pipe(stylint.reporter());
});

// IMAGE TASKS
gulp.task('images', function () {
  return gulp.src('src/img/**.*')
  .pipe(changed(destination.images))
  .pipe(plumber(handleErrors))
  .pipe(imagemin({
    progressive: false
  }))
  .pipe(gulp.dest(destination.images));
});

// DEFAULT WATCH
gulp.task('default', function() {
  var javascriptWatch = gulp.watch(watch.javascript, ['javascript', 'javascript-lint']);
  var stylusWatch = gulp.watch(watch.stylus, ['style', 'style-lint']);
  var imageWatch = gulp.watch(watch.images, ['images']);
});

// BUILD STACKS
gulp.task('build', ['style', 'javascript', 'javascript-library', 'images']);