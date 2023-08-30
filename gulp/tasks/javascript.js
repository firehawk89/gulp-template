// const uglify = require("gulp-uglify-es").default;
import webpack from "webpack-stream";
import { checkIsProd } from "../utils/checkIsProd.js";

import webpackConfigDev from "../config/webpack.config.dev.js";
import webpackConfigProd from "../config/webpack.config.prod.js";

const webpackConfig = checkIsProd() ? webpackConfigProd : webpackConfigDev;

export default function jsTask() {
  return app.gulp
    .src(app.path.src.js)
    .pipe(app.plugins.plumber({ errorHandler: app.plugins.notifier.error }))
    .pipe(webpack(webpackConfig))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.reload({ stream: true }));
}
