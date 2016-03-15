module.exports = {
  options: '<%= pkg.jshintConfig %>',
  all: {
    src: [
      './src/scripts/**/*.js',
      '!./src/scripts/templates.js',
      './test/**/*.js'
    ]
  }
};
