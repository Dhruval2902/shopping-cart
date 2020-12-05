const { src, dest, series, parallel } = require("gulp");
const del = require("del");
const postcss = require("gulp-postcss");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");


function htmlTask() {
  return src("src/*.html").pipe(dest("dist"));
}

function scriptsTask() {
  return src("src/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(concat("all.js"))
    .pipe(dest("dist/js/"));
}

function stylesTask() {
  return src("src/css/*.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(concat("all.css"))
    .pipe(dest("dist/css/"));
}

function imagesTask() {
  return src("src/images/*")
    .pipe(imagemin())
    .pipe(dest("dist/images/"));
}


function cleanTask() {
  return del("dist/*");
}

exports.clean = cleanTask;
exports.styles = stylesTask;
exports.scripts = scriptsTask;
exports.html = htmlTask;
exports.images = imagesTask;
exports.default = series(clean, htmlTask, parallel(imagesTask, scriptsTask, stylesTask));
