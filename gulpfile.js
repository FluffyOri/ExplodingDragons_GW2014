var gulp       = require('gulp');
var browserify = require('gulp-browserify');
var header     = require('gulp-header');
var rename     = require('gulp-rename');
var tap        = require('gulp-tap');
var path       = require('path');
var fs         = require('fs');

var paths = {
    imagesPath : "./src/config/images.js",
    soundsPath : "./src/config/sounds.js",
    scripts  : 'src/**/*.js',
    images   : 'assets/images/**/*',
    sounds   : 'assets/music/**/*'
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
    fs.writeFileSync(paths.imagesPath, "module.exports = [");
    var count = 0;
    var nbImg = 0;
    gulp.src(paths.images)
        .pipe(tap(function (file) {
            nbImg++;
            fs.appendFile(paths.imagesPath,
                '\n\t"' + "assets/images/" + path.basename(file.path.toLowerCase()) + '",',
                function() {
                    count++;
                    if (count === nbImg) {
                        fs.appendFileSync(paths.imagesPath, "\n];");
                    }
                }
            );
        }))

});

gulp.task('sounds', function() {
    fs.writeFileSync(paths.soundsPath, "module.exports = {");
    var count = 0;
    var nbSounds = 0;
    gulp.src(paths.sounds)
        .pipe(tap(function (file) {
            nbSounds++;
            fs.appendFile(paths.soundsPath,
                '\n\t"' + path.basename(file.path.toLowerCase())+'" : "'+"assets/music/" + path.basename(file.path.toLowerCase()) + '",',
                function() {
                    count++;
                    if (count === nbSounds) {
                        fs.appendFileSync(paths.soundsPath, "\n};");
                    }
                }
            );
        }))

});

gulp.task('default', ["images", "sounds", "build", "watch"]);

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['build']);
});