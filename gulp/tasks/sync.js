const sync = () => {
  app.plugins.browserSync.init({
    server: {
      baseDir: app.path.buildPath,
    },
    notify: false,
    port: 3000,
  });
};

export default sync;
