// yarn add gulp --dev
const gulp = require('gulp');
const path = require('path');

const src = './src';
const dest = './build';

gulp.task('default', function() {
  gulp.src(path.join(src))
    .pipe(gulp.dest(dest));
});
