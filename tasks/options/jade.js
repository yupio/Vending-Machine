module.exports = {
  component: {
    expand: true,
    cwd: 'src',
    src: ['**/*.jade'],
    ext: '.html',
    dest: 'tmp',
    options: {
      doctype: "html"
    }
  },
  app: {
    files: {
      '<%= pkg.config.buildDir %>index.html': 'src/app.jade'
    },
    options: {
      data: {
        development: true
      }
    }
  }
};
