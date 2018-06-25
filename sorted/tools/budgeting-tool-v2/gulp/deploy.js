'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('copy', function() {  
  gulp.src([
    path.join(conf.paths.dist, '/**/*'),
    path.join('!' + conf.paths.dist, '/index.html'),
    path.join('!' + conf.paths.dist, '/favicon.ico')
  ])
    .pipe(gulp.dest(path.join(conf.paths.theme, '/')))
});

gulp.task('deploy', ['copy']);