import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export default function fontsTask() {
  return app.gulp
    .src(app.path.src.fonts)
    .pipe(app.plugins.plumber({ errorHandler: app.plugins.notifier.error }))
    .pipe(app.plugins.newer(app.path.build.fonts))
    .pipe(fonter({ formats: ["eot", "ttf", "woff"] }))
    .pipe(app.gulp.dest(app.path.build.fonts))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.path.build.fonts));
}
