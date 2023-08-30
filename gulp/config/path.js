const buildPath = "./build";
const srcPath = "./src";

const path = {
  src: {
    html: `${srcPath}/*.html`,
    scss: `${srcPath}/scss/style.scss`,
    js: `${srcPath}/js/app.js`,
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
  srcPath,
  buildPath,
  clean: `${buildPath}/*`,
  ignore: {
    img: `!${buildPath}/img`,
    fonts: `!${buildPath}/fonts`,
  },
};

export default path;
