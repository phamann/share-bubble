var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

var jsFiles = ['lib/*.js'];
var cssFiles = ['scss/*.scss'];

gulp.task('watch', function () {
    // gulp.watch(jsFiles, ['jshint']);
    gulp.watch(cssFiles, ['sass']);
});

gulp.task('webserver', function() {
    gulp.src('./')
    .pipe(webserver({
        fallback: 'index.html',
        livereload: true,
        open: true
    }));
});

gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('default', ['sass', 'watch', 'webserver']);

