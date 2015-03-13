var gulp = require('gulp'),
  coffee = require('gulp-coffee'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  onError = function(err) {
      notify.onError({
  		title:    "Gulp!",
  		message:  "Error: <%= error %>",
  		sound:    "Beep"
  	})(err);
	   this.emit('end');
   };

gulp.task('coffee', function() {
	return gulp.src('src/flub.coffee')
		.pipe(plumber({errorHandler: onError}))
		.pipe(coffee())
    .pipe(gulp.dest('dist'))
	 	.pipe(uglify())
    .pipe(rename('flub.min.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['coffee'], function() {
	gulp.watch('src/flub.coffee', ['coffee']);
});
