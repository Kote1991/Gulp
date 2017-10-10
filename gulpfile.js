var gulp = require('gulp'),
	gutil = require('gulp-util'),
	lessCss = require('gulp-less'),
	browserSync = require('browser-sync').create(),
	useref = require('gulp-useref'),
	gIf = require('gulp-if'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	del = require('del');
	

gulp.task('default',['lessToCss','moveHtmlFile','watch'],function(){
	return gutil.log('Hey Defult fn running....');	
});

gulp.task('lessToCss',function(){
	gulp.src('src/less/*.less')
		.pipe(lessCss())
		.pipe(cssmin())
		.pipe(gulp.dest('dest/css/'))
		.pipe(browserSync.reload({stream:true}));	
});
/*gulp.task('scriptsFileMove',function(){	
	gulp.src('src/script/*.js')
		.pipe(useref())
		.pipe( gulp.dest('dest/script/'));	
});*/

gulp.task('moveHtmlFile',function(){	
	gulp.src('src/*.html')
		.pipe(useref())
		.pipe(gIf('*.js',uglify()))
		.pipe(gulp.dest('dest/'))
		.pipe(browserSync.reload({stream:true}));	
});

gulp.task('watch',['browserSync'],function(){
	gulp.watch('src/less/*.less',['lessToCss']);
	gulp.watch('src/*.html',['moveHtmlFile'])
});

gulp.task('browserSync',function(){
	browserSync.init({
		server:{
			baseDir:'dest'			
		}		
	});	
})