import browserSync from "browser-sync";
import concat from "gulp-concat";
import newer from "gulp-newer";
import del from "del";
import replace from "gulp-replace";
import gulpIf from "gulp-if";
import plumber from "gulp-plumber";
import notifier from "gulp-notifier";

const plugins = {
  browserSync,
  concat,
  newer,
  del,
  replace,
  gulpIf,
  plumber,
  notifier,
};

export default plugins;
