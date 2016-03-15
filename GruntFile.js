'use strict';

var path = require('path');

module.exports = function(grunt, undefined) {
  if (grunt.option('coverage') === undefined) {
    grunt.option('coverage', true);
  }
  if (grunt.option('single-run') === undefined) {
    grunt.option('single-run', true);
  }
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'tasks/options'),
    init: true,
    data: {
      pkg: grunt.file.readJSON('package.json'),
      env: process.env,
      options: {
        host: grunt.option('host'),
        coverage: grunt.option('coverage')
      }
    },
    loadGruntTasks: {
      pattern: 'grunt-*'
    }
  });

  grunt.registerTask(
    'build:templates',
    'Compile view and partials templates',
    [
      'jade:app',
      'jade:component',
      'ngtemplates'
    ]);

  grunt.registerTask(
    'build',
    'Compile all source code for development',
    [
      'clean',
      'copy:assets',
      'copy:underscore',
      'copy:bootstrap',
      'sass:main',
      'build:templates',
      'browserify'
    ]);

  grunt.registerTask(
    'default',
    'Build, Watch and Karma',
    [
      'jshint',
      'build',
      'concurrent:development'
    ]);

  grunt.registerTask(
    'test',
    'single run tests for ci',
    [
      'jshint',
      'build',
      'karma:unit'
    ]);
};
