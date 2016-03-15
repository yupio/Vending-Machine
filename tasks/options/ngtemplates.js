'use strict';

module.exports = {
  browserify_component: {
    src: [
      'tmp/views/**/*.html',
      'tmp/partials/**/*.html'
    ],
    dest: 'src/scripts/templates.js',
    options: {
      module: '<%= pkg.name %>',
      url: function (url) {
        return url.replace('tmp/', '');
      }
    }
  }
};
