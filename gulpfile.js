/**
 * Monator Liferay Instant Deploy Theme Tool
 * ====================================================
 *
 * Author: Monator Technologies
 * Licence: ISC
 * 
 * This small Gulp script will monitor your source code theme folder and 
 * when a file is changed:
 *
 *  1) Instantly inject those changes into the server.
 *  2) Makes sure that the scss is recompiled into a css file if needed.
 * 
 */

var gulp = require('gulp');
var newer = require('gulp-newer');
var header = require('gulp-header');

var paths = {
	themeSource: '/Users/emiloberg/code/moh/ehealth-portal-theme/src/main/webapp/**',
	themeServer: '/Users/emiloberg/liferay/moh/tomcat-7.0.42/webapps/ehealth-portal-theme',
	partialsSource: '/Users/emiloberg/code/moh/ehealth-portal-theme/src/main/webapp/css/partials/**/_*.scss',
	entryPointSource: '/Users/emiloberg/code/moh/ehealth-portal-theme/src/main/webapp/css/custom.css',
	entryPointFolderServer: '/Users/emiloberg/liferay/moh/tomcat-7.0.42/webapps/ehealth-portal-theme/css',
};


gulp.task('watch', function() {
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
		.pipe(header('/* Updated: ' + Date.now() + ' */\n'))
		.pipe(gulp.dest(paths.entryPointFolderServer));
});


gulp.task('default', ['watch']);
