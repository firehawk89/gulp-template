import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import { isProd } from "../../gulpfile.js";

export default function imgTask() {
  return app.gulp
    .src(app.path.src.img)
    .pipe(app.plugins.plumber({ errorHandler: app.plugins.notifier.error }))
    .pipe(app.plugins.newer(app.path.build.img))
    .pipe(webp())
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.plugins.gulpIf(isProd, app.gulp.src(app.path.src.img)))
    .pipe(app.plugins.gulpIf(isProd, app.plugins.newer(app.path.build.img)))
    .pipe(
      app.plugins.gulpIf(
        isProd,
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 80, progressive: true }),
          imagemin.optipng({ optimizationLevel: 4 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: false }],
          }),
        ])
      )
    )
    .pipe(app.plugins.gulpIf(isProd, app.gulp.dest(app.path.build.img)));
}
