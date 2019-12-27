//defining base path
var basePaths = {
	node: './node_modules/',
	scss_admin: './admin/css/sass/',
	scss_public: './public/css/sass/',
	scripts_admin: './admin/js/src/',
	scripts_public: './public/js/src/',
	distAssets_admin: './admin/',
	distAssets_public: './public/',
};

// Defining requirements
var gulp        = require('gulp');
var concat      = require('gulp-concat');
var sass        = require('gulp-sass');
var cleanCSS	= require('gulp-clean-css');
var sourcemaps	= require('gulp-sourcemaps');
var minify		= require('gulp-minify');
var browsersync = require('browser-sync');

// browser-sync watched files
var browserSyncWatchFiles = [
    basePaths.distAssets_admin +'css/*.css',
	basePaths.distAssets_admin +'js/*.js',
	basePaths.distAssets_public +'css/*.css',
    basePaths.distAssets_public +'js/*.js',
];

// browser-sync options

// Convert sass to css for admin side
gulp.task('styles-admin', function (){
	return gulp.src([
		basePaths.scss_admin + '*.scss'
		])
	.pipe( sass( {style: 'compressed'} ).on('error', sass.logError) )
	.pipe(cleanCSS({debug: true}, function(details) {
		console.log(details.name + ': ' + (details.stats.originalSize / 1000) + 'KB' );
		console.log(details.name + ': ' + (details.stats.minifiedSize / 1000) + 'KB' );
	}))
	.pipe( gulp.dest( basePaths.distAssets_admin + 'css/' ) );
});

// Convert sass to css for admin side
gulp.task('styles-public', function (){
	return gulp.src([
		basePaths.scss_public + '*.scss'
		])
	.pipe( sass( {style: 'compressed'} ).on('error', sass.logError) )
	.pipe(cleanCSS({debug: true}, function(details) {
		console.log(details.name + ': ' + (details.stats.originalSize / 1000) + 'KB' );
		console.log(details.name + ': ' + (details.stats.minifiedSize / 1000) + 'KB' );
	}))
	.pipe( gulp.dest( basePaths.distAssets_public + 'css/' ) );
});


// minify javascript for admin side
gulp.task('scripts-admin', function( ){
	return gulp.src([
		basePaths.scripts_admin + '*.js'
	])
	.pipe( minify() )
	.pipe( gulp.dest( basePaths.distAssets_admin + 'js/'  ) );
});

// minify javascript for public side
gulp.task('scripts-public', function( ){
	return gulp.src([
		basePaths.scripts_public + '*.js'
	])
	.pipe( minify() )
	.pipe( gulp.dest( basePaths.distAssets_public + 'js/'  ) );
});


gulp.task('styles', ['styles-admin', 'styles-public'], function () { });
gulp.task('scripts', ['scripts-admin', 'scripts-public'], function () { });


gulp.task('watch', function () {
	gulp.watch( basePaths.scss_admin + '*.scss', ['styles-admin'] );
	gulp.watch( basePaths.scss_public + '*.scss', ['styles-public'] );

	gulp.watch( basePaths.scripts_admin + '*.js', ['scripts-admin']);
	gulp.watch( basePaths.scripts_public + '*.js', ['scripts-public']);
});