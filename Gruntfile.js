'use strict';
module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'tasks/text2datauri*.js', 'test/text2datauri*.js'],
      options: {
        strict: true,
        bitwise: true,
        freeze: true,
        latedef: true,
        noarg: true,
        notypeof: true,
        sub: true,
        undef: true,
        unused: true,
        trailing: true,
        boss: true,
        eqnull: true,
        scripturl: true,
        validthis: true,
        lastsemic: true,
        node: true
      }
    },
    nodeunit: {
      files: ['test/text2datauri*.js']
    }
  });

  // Load "jshint" plugin
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load "nodeunit" plugin
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // test
  grunt.registerTask('test',  ['jshint:files', 'nodeunit:files']);

  // Default task
  grunt.registerTask('default', ['test']);

  // Load local tasks
  grunt.loadTasks('tasks');

};
