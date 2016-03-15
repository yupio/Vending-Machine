module.exports = {
  options: {
    debug: true,
  },
  app: {
    dest: '<%= pkg.config.buildDir %>js/main.js',
    src: 'src/scripts/main.js',
    options: {
      debug: true,
      sourceMapRoot: 'main'
    },
  },
  vendor: {
    dest: '<%= pkg.config.buildDir %>js/vendor.js',
    src: 'src/scripts/vendor.js'
  },
  components: {
    dest: "<%= pkg.config.buildDir %>js/components.js",
    src: 'src/scripts/components.js'
  }
};
