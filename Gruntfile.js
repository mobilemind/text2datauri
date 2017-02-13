'use strict';
module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    "pkg": grunt.file.readJSON('package.json'),
    "eslint": {
      "options": {
        "configFile": '.eslint.yml'
      },
      "target": ['Gruntfile.js', 'tasks/text2datauri*.js', 'test/text2datauri*.js']
    },
    "nodeunit": {
      "files": ['test/text2datauri*.js']
    },
    "yamllint": {
      "files": {
        "src": ['.*.yml', '*.yml', '*.yaml']
      }
    }
  });

  // Load plugins: "eslint", "nodeunit", "yamllint"
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-yamllint');

  // Load local tasks
  grunt.loadTasks('tasks');

  // test
  grunt.registerTask('test', ['eslint', 'nodeunit:files', 'yamllint']);

  // Default task
  grunt.registerTask('default', ['test']);

};
