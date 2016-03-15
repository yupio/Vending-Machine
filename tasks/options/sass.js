module.exports = {
  main: {
    files: {
      '<%= pkg.config.buildDir %>css/app.css': './src/styles/main.scss'
    },
    options: {
      compass: true
    }
  }
};
