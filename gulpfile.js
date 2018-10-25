var gulp = require('gulp')
  ,imagemin = require('gulp-imagemin')
  ,clean = require('gulp-clean')
  ,concat = require('gulp-concat')
  ,htmlReplace = require('gulp-html-replace')
  ,uglify = require('gulp-uglify')
  ,usemin = require('gulp-usemin')
  ,cssmin = require('gulp-cssmin')
  ,browserSync = require('browser-sync').create()
  ,jshint = require('gulp-jshint')
  ,jshintStylish = require('jshint-stylish')
  ,csslint = require('gulp-csslint')
  ,autoprefixer = require('gulp-autoprefixer')
  ,less = require('gulp-less')
  ,sass = require('gulp-sass');

gulp.task('default', ['copy'], function() {
  gulp.start('build-img', 'usemin');
});

gulp.task('copy', ['clean'], function() {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('build-img', function() {

  return gulp.src('dist/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function() {
  return gulp.src('dist/**/*.html')
    .pipe(usemin({
      js: [uglify]
      //css: [autoprefixer]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

  gulp.watch('src/**/*').on('change', browserSync.reload);

});

// Task para usar o SASS
var scssFiles = 'src/style/style.scss'
  ,cssDest = 'src/style'
  ,sassDevOptions = {
    outputStyle: 'expanded'
  }
  ,sassProdOptions = {
    outputStyle: 'compressed'
  }

// Task 'sassdev' - Rodar em desenvolvimento.
gulp.task('sassdev', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassDevOptions)/*.on('error', sass.logError)*/)
    .pipe(gulp.dest(cssDest));
});

// Task 'sassprod' - Rodar em producao para minificar.
gulp.task('sassprod', function() {
  return gulp.src(scssFiles)
    .pipe(sass(sassProdOptions).on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(cssDest));
});

gulp.task('watch-sass', function() {
  gulp.watch(scssFiles, ['sassdev']);
});