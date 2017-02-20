'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');

//----- APP TASKS AND TOOLS -------

//converts style.scss into style.css
gulp.task('sass', () => {
    return gulp.src('app/scss/style.scss')
        //initiates the source maps plugin
        .pipe(sourcemaps.init())
        //the Sass processing itself
        .pipe(sass({
            outputStyle: "expanded"
        }).on('error', sass.logError))
        //auto-prefixing our css
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false //removes visual cascade
        }))
        //generates the sourcemap on the same folder of .css
        .pipe(sourcemaps.write('.'))
        //generates style.css

    .pipe(gulp.dest('app/css/'))
        //this causes a browser reload
        .pipe(browserSync.reload({
            stream: true
        }))
});

//ESLint
gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['app/**/*.js', '!node_modules/**']) //We will only lint app js. we just ignore node_modules anyway
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

//watch
gulp.task('watch', ['browserSync', 'sass'], () => { //making sure 'saas' will run before any sync
    // gulp.watch('app/scss/style.scss', ['sass']);// just one .scss
    gulp.watch('app/scss/**/*.scss', ['sass']); //every .scss
    gulp.watch('app/*.html', browserSync.reload); //html
    gulp.watch('app/js/**/*.js', browserSync.reload); //reloads js
    gulp.watch('app/js/**/*.js', ['lint']); //outputs eslint messages
});

//browser sync
gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: ["./", "app"] //added multiple directories: self(for bower dependencias) and app (site assets)
        },
    })
})

//----- DIST TASKS -------

const htmlMinOptions = {
    collapseWhitespace: true, //collapses whitespace
    removeComments: true //removes comments
};

//Html, Css and Js compression
gulp.task('useref', () => {
    //creates a new html processing both js and css
    return gulp.src('app/*.html') //folder target and minified file names are defined in the app html
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
        // Minifies only if it's a HTML
        .pipe(gulpIf('*.html', htmlmin(htmlMinOptions)))
        .pipe(gulp.dest('dist'))
});

//images
gulp.task('images', () => {
    return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true //for gif
        })))
        .pipe(gulp.dest('dist/img'))
});

//fonts (just a copy)
gulp.task('fonts', () => {
    return gulp.src('app/font/**/*')
        .pipe(gulp.dest('dist/font'))
})

//dist cleaning
gulp.task('clear:dist', () => {
    return del.sync('dist');
})

//cache cleaning cleaning
gulp.task('clear:cache', (callback) => {
    return cache.clearAll(callback)
})


//------- BUILD ------

//once build is called we run sass (in case changes werent watched), then we clear dist folder.
//then any of the thre tasks can be runned: js and css + images + fonts
gulp.task('build', (callback) => {
    runSequence('sass', 'clear:dist', ['useref', 'images', 'fonts'],
        callback
    )
})

//To make things consistent, we can also build a sequence for the app tasks
gulp.task('default', (callback) => { //by calling it 'default' we dont have to provide a task name.
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
})
