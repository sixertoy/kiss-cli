/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var // variables
        name = 'kiss',
        src = './src',
        dist = './lib',
        // requires
        gulp = require('gulp'),
        path = require('path'),
        bump = require('gulp-bump'),
        uglify = require('gulp-uglify'),
        jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish');

    gulp.task('bump', function () {
        return gulp.src('./package.json')
            .pipe(uglify())
            .pipe(gulp.dest('./'));
    });

    gulp.task('build', function() {
        return gulp.src(path.join(src, '*.js'))
            .pipe(bump())
            .pipe(gulp.dest(dist));
    });

    gulp.task('lint', function(){
        return gulp.src(path.join(src, '*.js'))
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'));
    });

    gulp.task('default', ['lint', 'build']);

}());
