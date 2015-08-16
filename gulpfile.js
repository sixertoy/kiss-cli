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
        wrap = require('gulp-wrap'),
        rename = require('gulp-rename'),
        jshint = require('gulp-jshint');

    gulp.task('bump', function () {
        gulp.src('./package.json')
            .pipe(bump())
            .pipe(gulp.dest('./'));
    });

    gulp.task('build', function () {
        gulp.src(path.join(src, 'index.js'))
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(wrap('#!/usr/bin/env node\n\n<%= contents %>'))
            .pipe(rename(name))
            .pipe(gulp.dest(dist));
    });

    gulp.task('watch', function () {
        gulp.watch(path.join(src, 'index.js'), ['build']);
    });

    gulp.task('default', ['watch']);



}());
