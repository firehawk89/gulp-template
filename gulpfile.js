const { src, dest, watch, parallel, series } = require("gulp");

const browserSync = require("browser-sync").create();
const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const babel = require("gulp-babel");
const newer = require("gulp-newer");
const imagemin = require("gulp-imagemin");
const del = require("del");
const plumber = require("gulp-plumber");
const notifier = require("gulp-notifier");

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
  clean: `${buildPath}/*`,
  ignore: {
    img: `!${buildPath}/img`,
  },
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
    .pipe(plumber({ errorHandler: notifier.error }))
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
      .pipe(plumber({ errorHandler: notifier.error }))
      /*src(["node_modules/swiper/swiper-bundle.js", path.src.js])*/
      .pipe(babel({ presets: ["@babel/env"] }))
      .pipe(concat("index.min.js"))
      .pipe(uglify())
      .pipe(dest(path.build.js))
      .pipe(browserSync.reload({ stream: true }))
  );
}

function imgTask() {
  return src(path.src.img)
    .pipe(newer(path.build.img))
    .pipe(
      imagemin({
        optimizationLevel: 4,
        svgoPlugins: [{ removeViewBox: false }],
        progressive: true,
      })
    )
    .pipe(dest(path.build.img));
}

function cleanDest() {
  return del([path.clean, path.ignore.img]);
}

function watcher() {
  watch([path.watch.html], htmlTask);
  watch([path.watch.scss], cssTask);
  watch([path.watch.js], jsTask);
}

const tasks = parallel(htmlTask, cssTask, jsTask, imgTask);
const dev = series(cleanDest, tasks, parallel(watcher, sync));

exports.default = dev;
