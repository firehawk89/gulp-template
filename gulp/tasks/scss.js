import * as sass from "sass";
import gulpSass from "gulp-sass";
const scss = gulpSass(sass);
import autoprefixer from "gulp-autoprefixer";
import sourceMaps from "gulp-sourcemaps";
import { isDev, isProd } from "../../gulpfile.js";

export default function scssTask() {
  return app.gulp
    .src(app.path.src.scss)
    .pipe(app.plugins.plumber({ errorHandler: app.plugins.notifier.error }))
    .pipe(app.plugins.gulpIf(isDev, sourceMaps.init()))
    .pipe(scss())
    .pipe(
      app.plugins.gulpIf(
        isProd,
        autoprefixer({ overrideBrowserslist: ["last 5 version"] })
      )
    )
    .pipe(app.plugins.gulpIf(isProd, app.gulp.dest(app.path.build.css)))
    .pipe(app.plugins.concat("style.min.css"))
    .pipe(app.plugins.gulpIf(isProd, scss({ outputStyle: "compressed" })))
    .pipe(app.plugins.gulpIf(isDev, sourceMaps.write()))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream());
}
