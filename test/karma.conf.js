"use strict";

// Karma configuration
// Generated on Mon Oct 28 2013 23:33:46 GMT-0700 (PDT)

process.env.ISTANBULIFY_IGNORE = "vendor|node_modules|config|templates";

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: "../",


    // frameworks to use
    frameworks: ["jasmine", "browserify"],


    // list of files / patterns to load in the browser
    files: [
      // Vendor
      // Vendor
      "src/scripts/vendor.js",
      "bower_components/underscore/underscore-min.js",

      "bower_components/angular-mocks/angular-mocks.js",

      // Components
      "src/scripts/components.js",
      // Source
      "src/scripts/main.js",

      // Tests
      "test/unit/**/*.spec.js"
    ],


    // preprocess
    preprocessors: {
      "src/scripts/main.js": "browserify",
      "test/unit/**/*.spec.js": "browserify"
    },


    // browserify
    browserify: {
      watch: true,
      debug: true
    },


    // configure code coverage
    coverageReporter: {
      reporters: [
        {type: "html", dir: "coverage/"},
        {type: "lcov", dir: "coverage/"}
      ]
    },


    // list of files to exclude
    exclude: [],


    // test results reporter to use
    // possible values: "dots", "progress", "junit", "growl", "coverage"
    reporters: ["progress", "coverage"],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ["Chrome"],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
