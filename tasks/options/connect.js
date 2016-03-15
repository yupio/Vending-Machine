module.exports = {
  app: {
    options: {
      hostname: 'localhost',
      port: 8080,
      keepalive: true,
      base: '<%= pkg.config.buildDir %>'
    }
  }
};
