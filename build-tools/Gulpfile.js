var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var minigyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');

gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('sass', function () {
    gulp.src('dawg-coffee/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload());
});

gulp.task('uglify', function () {
    gulp.src('dawg-coffee/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(connect.reload());
});

gulp.task('minify', function () {
    gulp.src('dawg-coffee/*.html')
        .pipe(minigyHTML())
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
})

gulp.task('watch', function () {
    gulp.watch('dawg-coffee/scss/*.scss', ['sass']);
    gulp.watch('dawg-coffee/js/*.js', ['uglify']);
    gulp.watch('dawg-coffee/*.html', ['minify']);
});

gulp.task('copy', function () {
    gulp.src('dawg-coffee/img/*.img')
        .pipe(gulp.dest('dist/'));
})

gulp.task('default', ['sass', 'watch', 'uglify', 'minify', 'copy', 'connect']);