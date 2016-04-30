/* globals require */
(function () {

    'use strict';

    var src = './src',
        dist = './lib',
        // requires
        gulp = require('gulp'),
        path = require('path'),
        bump = require('gulp-bump'),
        jshint = require('gulp-jshint');

    gulp.task('bump', function () {
        return gulp.src(path.join(src, '*.js'))
            .pipe(bump())
            .pipe(gulp.dest(dist));
    });

    gulp.task('lint', function () {
        return gulp.src([
                './cli.js',
                './gulpfile.js',
                path.join(src, '**', '*.js')
            ])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'));
    });

    gulp.task('default', ['lint']);

}());
