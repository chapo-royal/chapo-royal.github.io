'use strict';

import path from 'path';
import gulp from 'gulp';
import babel from 'gulp-babel';
import autoprefixer from 'gulp-autoprefixer';
import header from 'gulp-header';
import gutil from 'gulp-util';
import connect from 'gulp-connect';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import pkg from './package.json';
import uglify from 'gulp-uglify';

const outputPaths = {
  css: './',
  js: './',
  pug: './',
};

const banner = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');

// Build Directories
const cssDir = path.join(__dirname, 'css', '**', '*.scss');
const jsDir = path.join(__dirname, 'js', '**', '*.js');
const pugWatchDir = path.join(__dirname, 'pug', '**', '*.pug');
const pugSourceDir = path.join(__dirname, 'pug', '**', 'index.pug');

function onError(err) {
  console.log(err);
  this.emit('end');
}

// CSS
gulp.task('build-css', () => {
  gutil.log('\n\nBuild CSS Paths: \n', cssDir, '\n\n');

  return gulp.src(cssDir)
    .pipe(autoprefixer('last 2 versions', 'ie 10', 'ie 11'))
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest(outputPaths.css))
    .pipe(connect.reload());
});

// JS
gulp.task('build-js', () => {
  gutil.log('\n\nBuild JS Paths: \n', jsDir, '\n\n');

  return gulp.src(jsDir)
    .on('error', onError)
    .pipe(babel())
    .pipe(uglify())
    .pipe(header(banner, { pkg }))
    .pipe(gulp.dest(outputPaths.js))
    .pipe(connect.reload());
});

// PUG
gulp.task('build-pug', () => {
  gutil.log('\n\nBuild pug Paths: \n', pugSourceDir, '\n\n');
  const locals = {
    title: 'CHAPOROYAL',
    description: pkg.description,
    payments: [
      {
        name: 'PME & ARTISANS',
        price: 600,
        hosted_button_id: 'FQ4MM3T3XHT68'
      },
      {
        name: 'MEMBRE INDIVIDUEL',
        price: 980,
        hosted_button_id: 'U7ZAZCB6K6R5N'
      },
      {
        name: 'ENTREPRISE',
        price: 2400,
        hosted_button_id: 'VTL5LDTLCXMAW'
      }
    ]
  };
  return gulp.src(pugSourceDir)
    .on('error', onError)
    .pipe(pug({ locals }))
    .pipe(gulp.dest(outputPaths.pug))
    .pipe(connect.reload());
});

// Build
gulp.task('build', ['build-css', 'build-js', 'build-pug']);

// Server
gulp.task('connect', function () {
  connect.server({
    port: process.env.PORT || 8080,
    livereload: true
  });
});

// Watch
gulp.task('watch', function () {
  gulp.watch(cssDir, ['build-css']);
  gulp.watch(jsDir, ['build-js']);
  gulp.watch(pugWatchDir, ['build-pug']);
});

// Default
gulp.task('default', ['connect', 'watch']);