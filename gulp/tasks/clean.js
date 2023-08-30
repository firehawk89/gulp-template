export default function cleanDest() {
  return app.plugins.del([
    app.path.clean,
    app.path.ignore.img,
    app.path.ignore.fonts,
  ]);
}
