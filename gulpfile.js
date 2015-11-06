var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');

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

gulp.task('copy_html_files', function() {
  gulp.src(srcDirectory + '/*.html')
      .pipe(gulp.dest(outputDirectory));
});

gulp.task('copy_polymer_components', function() {
  gulp.src(srcDirectory + '/polymer_components/**/*.html')
      .pipe(gulp.dest(outputDirectory + '/polymer_components'));
});

gulp.task('watch_css', function() {
  return gulp.watch(srcStylesheetsDirectory, ['styles'])
            .on('change', function(event) {
              console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            });
});

gulp.task('watch_html', function() {
  return gulp.watch(srcDirectory + '/*.html', ['copy_html_files'])
            .on('change', function(event) {
              console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            });
})

gulp.task('watch_polymer', function() {
  return gulp.watch(srcDirectory + '/polymer_components/**/*.html', ['copy_polymer_components'])
            .on('change', function(event) {
              console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            });
})

gulp.task('default', ['styles', 'copy_html_files', 'copy_polymer_components', 'watch_css', 'watch_polymer', 'watch_html' /*, possible other tasks... */]);
