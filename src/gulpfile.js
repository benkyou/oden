'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');

var browserSync = require('browser-sync').create();

gulp.task('serve', ['sass', 'pug'], function() {

    browserSync.init({
        server: "./",
        serveStaticOptions: {
            extensions: ['html']
        }
    });


    gulp.watch("./assets/scss/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("./assets/views/**/*.pug", ['pug']);
});

gulp.task('pug', function() {
    return gulp.src("./assets/views/*.pug")
        .pipe(pug())
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src("./assets/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);