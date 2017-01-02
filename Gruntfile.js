'use strict';
module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'tasks/text2datauri*.js', 'test/text2datauri*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    nodeunit: {
      files: ['test/text2datauri*.js']
    },
    yamllint: {
			files: { src: [ '*.yaml' ] }
    }
  });

  // Load "jshint" plugin
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load "nodeunit" plugin
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // test
  grunt.registerTask('test', ['jshint:files', 'nodeunit:files', 'yamllint']);

  // Load "yamllint" plugin
  grunt.loadNpmTasks('grunt-yamllint');

  // Default task
  grunt.registerTask('default', ['test']);

  // Load local tasks
  grunt.loadTasks('tasks');

};
