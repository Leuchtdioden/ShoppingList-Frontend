var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var srcDirectory = './src';
var srcJavascriptDirectory = srcDirectory + '/javascripts';
var srcStylesheetsDirectory = srcDirectory + '/stylesheets/**/*.scss';

var outputDirectory = './public';
var outputStylesheetsDirectory = outputDirectory + '/stylesheets';
var outputJavascriptDirectory = outputDirectory + '/javascripts';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('styles', function() {
    return gulp.src(srcStylesheetsDirectory)
              .pipe(sourcemaps.init())
              .pipe(sass(sassOptions).on('error', sass.logError))
              .pipe(sourcemaps.write())
              .pipe(autoprefixer(autoprefixerOptions))
              .pipe(gulp.dest(outputStylesheetsDirectory));
});

gulp.task('watch', function() {
  return gulp.watch(srcStylesheetsDirectory, ['styles'])
            .on('change', function(event) {
              console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            });
});

gulp.task('default', ['styles', 'watch' /*, possible other tasks... */]);
