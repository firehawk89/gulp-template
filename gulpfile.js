import { checkIsProd } from "./gulp/utils/checkIsProd.js";
export const isProd = checkIsProd();
export const isDev = !checkIsProd();

import gulp from "gulp";
import path from "./gulp/config/path.js";
import plugins from "./gulp/config/plugins.js";

global.app = {
  gulp,
  path,
  plugins,
};

import sync from "./gulp/tasks/sync.js";
import htmlTask from "./gulp/tasks/html.js";
import scssTask from "./gulp/tasks/scss.js";
import jsTask from "./gulp/tasks/javascript.js";
import imgTask from "./gulp/tasks/img.js";
import fontsTask from "./gulp/tasks/fonts.js";
import cleanDest from "./gulp/tasks/clean.js";

function watcher() {
  gulp.watch([path.watch.html], htmlTask);
  gulp.watch([path.watch.scss], scssTask);
  gulp.watch([path.watch.js], jsTask);
  gulp.watch([path.watch.img], imgTask);
  gulp.watch([path.watch.fonts], fontsTask);
}

const tasks = gulp.parallel(htmlTask, scssTask, jsTask, imgTask, fontsTask);
export const dev = gulp.series(cleanDest, tasks, gulp.parallel(watcher, sync));
export const build = gulp.series(cleanDest, tasks);

gulp.task("default", dev);
