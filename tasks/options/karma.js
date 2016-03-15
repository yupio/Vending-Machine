module.exports = function (grunt) {
  'use strict';
  return {
    options: {
      configFile: 'test/karma.conf.js',

      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: grunt.option('karma-log-level') || 'WARN',
            // preprocess
      preprocessors: {
        '**/src/scripts/**/*.js': 'browserify',
        '**/test/**/*.js': 'browserify'
      }
    },
    unit: {
      autoWatch: false,
      singleRun: true
    }
  };
};
