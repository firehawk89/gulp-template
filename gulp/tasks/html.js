export default function htmlTask() {
  return app.gulp
    .src(app.path.src.html)
    .pipe(app.plugins.replace(/@img\//g, "img/"))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.reload({ stream: true }));
}
