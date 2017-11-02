var     gulp = require("gulp"),
		browersync = require('browser-sync').create(),
		reload = browersync.reload,
		sass = require("gulp-sass"),
		autoprefixer = require("gulp-autoprefixer"),
		postcss = require('gulp-postcss'),

		cssbase64 = require('gulp-base64'),

		cssgrace = require('cssgrace'),
		mincss = require("gulp-minify-css"),
		minjs = require("gulp-jsmin"),
		minimg = require("gulp-imagemin"),
		debug = require('gulp-strip-debug'),
		concat = require('gulp-concat'),
		rename = require("gulp-rename");

var uglify = require("gulp-uglify")



gulp.task("jsmin",function () {
	gulp.src("build/*.js")
		.pipe(uglify( {
			mangle: true,
			compress: true
		}))
		.pipe(gulp.dest("dist"))
});


gulp.task('sass',function () {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass())
		.pipe(autoprefixer('last 0 versions'))
		.pipe(postcss([cssgrace]))
		.pipe(cssbase64({
			maxImageSize: 4*1024
		}))
		.pipe(gulp.dest('./css'))
		.pipe(reload({
			stream:true
		}))
});
gulp.task('serve',function () {
	browersync.init({
		server:'./'
	});

	gulp.watch('./sass/**/*.scss',['sass']);
	gulp.watch('./*.html').on('change',reload)
});

