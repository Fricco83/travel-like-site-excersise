var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var simplevars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var postcssImport = require('postcss-import');
var browserSync = require('browser-sync').create();
var mixins = require('postcss-mixins');

gulp.task('default', function(){
		console.log("it works");
	});

gulp.task('styles', function(){
	return gulp.src('./app/assets/styles/style.css')
	.pipe(postcss([postcssImport, mixins, simplevars, nested, autoprefixer]))
	.pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('cssInject',['styles'], function(){
		return gulp.src('./app/temp/styles/style.css')
		.pipe(browserSync.stream());
	});

gulp.task('watch', function(){
	browserSync.init({
		server: {
			baseDir: "app"
		},
		browser: "chrome",
		notify: false
	});

	watch('./app/index.html', function(){
		browserSync.reload();
	});

	watch('./app/assets/styles/**/*.css', function(){
		gulp.start('cssInject');
	});
});

