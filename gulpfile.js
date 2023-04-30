const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");

const buildPath = "./build";
const srcPath = "./src";

const path = {
  src: {
    html: `${srcPath}/*.html`,
    scss: `${srcPath}/scss/style.scss`,
    js: `${srcPath}/js/**/*.js`,
    img: `${srcPath}/assets/img/**/*.{jpg,jpeg,png,svg,gif}`,
    fonts: `${srcPath}/assets/fonts/**/*.{eot,ttf,woff,woff2,svg}`,
  },
  build: {
    html: `${buildPath}/`,
    css: `${buildPath}/css/`,
    js: `${buildPath}/js/`,
    img: `${buildPath}/img/`,
    fonts: `${buildPath}/fonts/`,
  },
  watch: {
    html: `${srcPath}/*.html`,
    scss: `${srcPath}/scss/**/*.scss`,
    js: `${srcPath}/js/**/*.js`,
    img: `${srcPath}/assets/img/**/*.{jpg,jpeg,png,svg,gif}`,
    fonts: `${srcPath}/assets/fonts/**/*.{eot,ttf,woff,woff2,svg}`,
  },
  clean: buildPath,
};

function sync() {
  browserSync.init({
    server: {
      baseDir: buildPath,
    },
    notify: false,
    port: 3000,
  });
}

function htmlTask() {
  return src(path.src.html)
    .pipe(dest(path.build.html))
    .pipe(browserSync.reload({ stream: true }));
}

function cssTask() {
  return src(path.src.scss)
    .pipe(autoprefixer({ overrideBrowserslist: ["last 5 version"] }))
    .pipe(scss())
    .pipe(dest(path.build.css))
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({ stream: true }));
}

function jsTask() {
  return (
    src(path.src.js)
      /*src(["node_modules/swiper/swiper-bundle.js", path.src.js])*/
      .pipe(concat("index.min.js"))
      .pipe(uglify())
      .pipe(dest(path.build.js))
      .pipe(browserSync.reload({ stream: true }))
  );
}

function cleanDest() {
  return del(path.clean);
}

function watcher() {
  watch([path.watch.html], htmlTask);
  watch([path.watch.scss], cssTask);
  watch([path.watch.js], jsTask);
}

const tasks = parallel(htmlTask, cssTask, jsTask);
const dev = series(cleanDest, tasks, parallel(watcher, sync));

exports.default = dev;
