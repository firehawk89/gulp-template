const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean");

function styles() {
  return (
    src("src/scss/style.scss")
      .pipe(autoprefixer({ overrideBrowserslist: ["last 10 version"] }))
      /*     .pipe(scss())
    .pipe(dest("src/css")) */
      .pipe(concat("style.min.css"))
      .pipe(scss({ outputStyle: "compressed" }))
      .pipe(dest("src/css"))
      .pipe(browserSync.stream())
  );
}

function scripts() {
  return (
    src("src/js/index.js")
      /*src(["node_modules/swiper/swiper-bundle.js", "src/js/index.js"])*/
      .pipe(concat("index.min.js"))
      .pipe(uglify())
      .pipe(dest("src/js"))
      .pipe(browserSync.stream())
  );
}

function sync() {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
  });
}

function cleanDest() {
  return src("build").pipe(clean());
}

function building() {
  return src(
    ["src/css/style.min.css", "src/js/index.min.js", "src/**/*.html"],
    { base: "src" }
  ).pipe(dest("build"));
}

function run() {
  watch(["src/scss/style.scss"], styles);
  watch(["src/js/index.js"], scripts);
  watch(["src/**/*.html"]).on("change", browserSync.reload);
}

/* module.exports = { styles, scripts, sync, run }; */

exports.build = series(cleanDest, building);
module.exports.default = parallel(styles, scripts, sync, run);
