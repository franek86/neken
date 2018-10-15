const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const cssDIST = './dist/css/';
const cssSRC = './src/sass/style.scss';

gulp.task('css', () => {
    gulp.src( cssSRC )
        .pipe( sourcemaps.init())
        .pipe( sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on( 'error', console.error.bind( console ))
        .pipe( prefix({ browsers: ['last 2 versions'], cascade: false }))
        .pipe( rename( { suffix: '.min' } ) )
        .pipe( sourcemaps.write('./'))
        .pipe( gulp.dest( cssDIST ))
})