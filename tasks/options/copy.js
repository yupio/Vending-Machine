module.exports = {
  assets: {
    cwd: "src/assets",
    expand: true,
    src: ["**"],
    dest: "<%= pkg.config.buildDir %>/assets"
  },
  underscore: {
    src: "bower_components/underscore/underscore-min.js",
    dest: "<%= pkg.config.buildDir %>/js/underscore-min.js"
  },
  bootstrap: {
    src: "node_modules/bootstrap/dist/css/bootstrap.min.css",
    dest: "<%= pkg.config.buildDir %>/css/assets.css",
  }
};
