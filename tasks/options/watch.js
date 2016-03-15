/*
 * 1. Prevents issue where grunt dies from karma triggering multiple times.
 */
module.exports = {
  options: {
    interrupt: false, /* [1] */
    livereload: true,
    spawn: false
  },
  sass_example: {
    files: [
      'src/styles/**/*.scss',
      'src/assets'
    ],
    tasks: [
      'sass:main_example',
      'notify:ready'
    ]
  },
  js: {
    files: [
      'src/**/*.js',
      '!src/scripts/templates.js'
    ],
    tasks: [
      'jshint',
      'browserify',
      'karma:unit',
      'notify:ready'
    ]
  },
  unit: {
    files: [
      'test/unit/**/*.js'
    ],
    tasks: [
      'jshint',
      'karma:unit'
    ]
  },
  vendor: {
    files: ['example/src/scripts/vendor.js'],
    tasks: [
      'browserify:vendor_example',
      'notify:ready'
    ]
  },
  jade_templates: {
    files: [
      'src/**/*.jade',
      'example/src/views/**/*.jade',
      'example/src/partials/**/*.jade'
    ],
    tasks: [
      'build:templates',
      'browserify',
      'karma:unit',
      'notify:ready'
    ]
  },
  jade_index: {
    files: ['example/src/index.jade'],
    tasks: [
      'jade:index_example',
      'notify:ready'
    ]
  },
};
