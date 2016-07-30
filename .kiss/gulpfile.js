/* global require */
/**
 *
 * Install Locals Dev
 * npm install gulp gulp-jshint jshint-stylish --save-dev
 *
 */
(function() {

    'use strict';

    var src = './src',
        dest = './build',
        // requires
        gulp = require('gulp'),
        path = require('path'),
        jshint = require('gulp-jshint');

    gulp.task('default', function() {
        gulp.src(path.join(src))
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(gulp.dest(dest));
    });

}());
