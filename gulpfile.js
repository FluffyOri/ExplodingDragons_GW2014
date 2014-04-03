var gulp       = require('gulp');
var browserify = require('gulp-browserify');
var header     = require('gulp-header');
var rename     = require('gulp-rename');
var tap        = require('gulp-tap');
var path       = require('path');
var fs         = require('fs');

var paths = {
    manifest : "./src/config/images.js",
    scripts  : 'src/**/*.js',
    images   : 'assets/images/**/*'
};

gulp.task('build', function() {
    // Single entry point to browserify
    gulp.src('src/main.js')
        .pipe(browserify())
        .pipe(header("'use strict';"))
        .pipe(rename("game.js"))
        .pipe(gulp.dest('./build'))
});

gulp.task('images', function() {
    fs.writeFileSync(paths.manifest, "module.exports = [");
    var count = 0;
    var nbImg = 0;
    gulp.src(paths.images)
        .pipe(tap(function (file) {
            nbImg++;
            fs.appendFile(paths.manifest,
                '\n\t"' + "assets/images/" + path.basename(file.path) + '",',
                function() {
                    count++;
                    if (count === nbImg) {
                        fs.appendFileSync(paths.manifest, "\n];");
                    }
                }
            );
        }))

});

gulp.task('default', ["images", "build", "watch"]);

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['build']);
});