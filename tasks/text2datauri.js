/*
 * grunt-text2datauri
 * https://github.com/mobilemind/grunt-text2datauri
 *
 * Copyright (c) 2012 Tom King
 * Licensed under the MIT license.
 */
"use strict";
module.exports = function(grunt) {
  // HELPERS & PRIVATE VARS
  const text2datauriHelpers = require('./text2datauriHelpers.js');
  let configOptions = {};

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  // default version to  metadata version OR pkg.version if available
  let text2datauri_pkgVersion = '';
  if (undefined !== grunt.config('meta.version')) text2datauri_pkgVersion = grunt.config('meta.version');
  else if (undefined !== grunt.config('pkg.version')) text2datauri_pkgVersion = grunt.config('pkg.version');

  // main function
  grunt.registerMultiTask('text2datauri', 'Convert file to data: URI.', function() {
    // process js file to create URI
    try {
      // set config options
      configOptions = this.options({
        // Default options
        sourceCharset: 'utf-8', // or 'ascii'; actual format is not validated by text2datauri
        protocol: 'data:', // any string; this is not validated by text2datauri
        mimeType: 'text/html', // any string;  this is not validated by text2datauri
        targetCharset: 'utf-8', // currently only utf-8 is valid
        encoding: 'base64' // or 'uri'; use 'uri' for encodeURIComponent() encoding
      });

      // build prefix
      const uriPrefix = text2datauriHelpers.text2dataPrefix(configOptions);

      // loop through files
      let files = this.files;
      files.forEach(function(filepair) {
        let rawStr =  grunt.file.read(filepair.src);
        // here's where ascii/utf-8 might be validated or pre-processed
        // encode rawStr to data value
        let dataStr = text2datauriHelpers.text2data(rawStr, configOptions.encoding);

        // write full URI to file & log
        let fullURI = uriPrefix + dataStr;
        grunt.file.write(filepair.dest, fullURI);
        console.log(filepair.src + ' -> ' + filepair.dest + ' (' + dataStr.length + ' bytes of data, ' + fullURI.length + ' total bytes)');
      });
    }
    catch(e) {
      // warn on error
      grunt.warn(this.name + ' found errors: ' + e.message, 10);
      return false;
    }
    return true;
  });
};
