const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const styleDIST = './dist/css/';
const styleSRC = 'src/sass/style.scss';
const styleWatch = 'src/sass/**/*.scss';

const htmlWatch = '**/*.html';

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
});

gulp.task('style', () => {
    gulp.src( styleSRC )
        .pipe( sourcemaps.init())
        .pipe( sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on( 'error', console.error.bind( console ))
        .pipe( prefix({ browsers: ['last 2 versions'], cascade: false }))
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( sourcemaps.write('./'))
        .pipe( gulp.dest( styleDIST ))
        .pipe( browserSync.stream() );
});

gulp.task('default', ['style']);

gulp.task('watch', ['default', 'serve'], () => {
    gulp.watch( styleWatch, ['style', reload] );
    gulp.watch( htmlWatch, reload )
})

