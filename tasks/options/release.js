module.exports = {
  options: {
    bump: true,
    file: 'package.json',
    add: true,
    commit: true,
    tag: true,
    push: true,
    pushTags: true,
    npm: false,
    npmtag: false,
    commitMessage: 'Release <%= version %>',
    tagMessage: 'Version <%= version %>'
  }
};
