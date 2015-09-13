/**
 * Monator Liferay Instant Deploy Theme Tool
 * ====================================================
 *
 * Author: Monator Technologies
 * Licence: MIT
 * 
 * This small Gulp script will monitor your source code theme folder and 
 * when a file is changed:
 *
 *  1) Instantly inject those changes into the server.
 *  2) Makes sure that the scss is recompiled into a css file if needed.
 *  3) If (s)css is changed, live reload it (force web browser to reload the 
 *     css it's changed, without reloading the entire web page).
 * 
 */

var gulp = require('gulp');
var newer = require('gulp-newer');
var header = require('gulp-header');
var livereload = require('gulp-livereload');
var wait = require('gulp-wait');

// On machines with slower hard disk read/write (typically on a non-SSD disk)
// you might need to add a small delay between moving the scss files and touching
// the entry point CSS (and by doing that telling Liferay to rebuild the SCSS).
// 
// Change this value to increase the delay. (Try a value around 100ms).
var timingDelay = 0;  // milliseconds

var paths = {
	themeSource: '/code/my-project/my-theme/src/main/webapp/**',
	themeServer: '/liferay/my-project/tomcat/webapps/my-theme',
	partialsSource: '/code/my-project/my-theme/src/main/webapp/css/partials/**/_*.scss',
	entryPointSource: '/code/my-project/my-theme/src/main/webapp/css/custom.css',
	entryPointFolderServer: '/liferay/my-project/tomcat/webapps/my-theme/css'
};


gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.themeSource, ['copyThemeFiles']);
  gulp.watch(paths.partialsSource, ['updateEntryPointCSS']);
});

gulp.task('copyThemeFiles', function() {
	gulp.src(paths.themeSource)
		.pipe(newer(paths.themeServer))
		.pipe(gulp.dest(paths.themeServer));
});

gulp.task('updateEntryPointCSS', function() {
	gulp.src(paths.entryPointSource)
		.pipe(wait(timingDelay))
		.pipe(header('/* Updated: ' + Date.now() + ' */\n'))
		.pipe(gulp.dest(paths.entryPointFolderServer))
		.pipe(livereload());
});


gulp.task('default', ['watch']);
