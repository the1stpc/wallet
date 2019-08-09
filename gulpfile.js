const gulp = require('gulp'),
    gSass = require('gulp-sass'),
    gPug = require('gulp-pug'),
    gBrowserSync = require('browser-sync'),
    babel = require('gulp-babel');

function js() {
    return gulp.src('app/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist'))
        .pipe(gBrowserSync.stream());
}



function pug() {
    return gulp.src('./app/**/*.pug')
        .pipe(gPug())
        .pipe(gulp.dest('./dist'))
        .pipe(gBrowserSync.stream());
}

function sass() {
    return gulp.src('./app/**/*.sass')
        .pipe(gSass())
        .pipe(gulp.dest('./dist'))
        .pipe(gBrowserSync.stream());
}

function server() {
    gBrowserSync.init({
        server: './dist'
    })

    gulp.watch("app/**/*.js", js);
    gulp.watch("app/**/*.pug", pug);
    gulp.watch("app/**/*.sass", sass);
    // gulp.watch("app/*.html").on('change', gBrowserSync.reload);
}

exports.default = gulp.series(pug, js, sass, server);
