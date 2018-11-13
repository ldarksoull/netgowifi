var gulp        = require('gulp');
var minifyCss   = require('gulp-minify-css');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var plumber     = require('gulp-plumber');
var postcss     = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var reload      = browserSync.reload;

var paths = {
  html:['*.html'],
  css:['css/*.css'],
  script:['js/script.js'],
  sass:['sass/*.sass']
};

gulp.task('mincss', function(){
  return gulp.src(paths.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(gulp.dest('main'))
    .pipe(reload({stream:true}));
});
gulp.task('css', function () {
    return gulp.src('css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'));
});
// ////////////////////////////////////////////////
// HTML 
// ///////////////////////////////////////////////
gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(reload({stream:true}));
});
// ////////////////////////////////////////////////
// js
// ///////////////////////////////////////////////
gulp.task('script', function(){
    gulp.src(paths.script)
    .pipe(reload({stream:true}));
});



// ////////////////////////////
// Sass
// ////////////////////////////
gulp.task('sass', function(){ // Создаем таск Sass

    gulp.src(paths.sass) // Берем источник
        .pipe(plumber())
        .pipe(sass({outputStyle: 'expanded'})) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})); // Обновляем CSS на странице при изменении
});


//////////////////////////////
// Browser-sync
//////////////////////////////
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: './',
             // Директория для сервера - app
        },
        port: 8000,
        notify: false // Отключаем уведомления
    });
});


gulp.task('watch', ['browser-sync', 'sass', 'html', 'script', 'css'], function() {
    gulp.watch('sass/*.sass', ['sass']); // Наблюдение за sass файлами
    gulp.watch('*.html', ['html']);// Наблюдение за другими типами файлов
    gulp.watch('js/*.js', ['script']);
    gulp.watch('css/*.css', ['css']);
});

gulp.task('default', ['watch', 'browser-sync']);