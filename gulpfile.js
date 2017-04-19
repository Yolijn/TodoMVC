const gulp = require('gulp');
const babel = require('gulp-babel');
const reload = require('gulp-livereload');
const swig = require('gulp-swig');
const print = require('gulp-print');
const data = require('gulp-data');
const sass = require('gulp-sass');

let getJSON = (file) => require('./data/mock.json');

gulp.task('buildJS', () =>
	gulp.src('src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist')).on('error', print)
		.pipe(reload())
);

gulp.task('buildHTML', () => {
	gulp.src('src/templates/*.html')
		.pipe(data(getJSON))
		.pipe(swig())
		.pipe(gulp.dest('dist')).on('error', print)
		.pipe(reload())
});

gulp.task('buildCSS', () => {
    gulp.src('src/**/*scss')
        .pipe(sass())
        .pipe(gulp.dest('dist')).on('error', print)
        .pipe(reload())
})

gulp.task('default', ['buildJS', 'buildHTML', 'buildCSS']);

reload.listen();
	gulp.watch('src/script/*.js', ['buildJS']);
	gulp.watch('src/templates/*.html', ['buildHTML']);
    gulp.watch('src/styles/*.scss', ['buildCSS']);
