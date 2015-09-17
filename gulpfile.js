/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var // variables
        name = 'kiss',
        src = './src',
        dist = './bin',
        // requires
        gulp = require('gulp'),
        path = require('path'),
        bump = require('gulp-bump'),
        jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish');

    gulp.task('bump', function () {
        return gulp.src('./package.json')
            .pipe(bump())
            .pipe(gulp.dest('./'));
    });

    gulp.task('lint', function(){
        return gulp.src(path.join(src, '*.js'))
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'));
    });

    gulp.task('default', ['lint']);

}());
