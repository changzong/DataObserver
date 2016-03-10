var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = rename = require('gulp-rename');

gulp.task('default', function() {
	gulp.src(['src/controller.js','src/data.js'])
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});