/*
 * grunt-text2datauri
 * https://github.com/mobilemind/grunt-text2datauri
 *
 * Copyright (c) 2012 Tom King
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  // global var
  var text2datauri_pkgVersion = '';
  // default version to  metadata version OR pkg.version if available
  if (undefined !== grunt.config('meta.version')) text2datauri_pkgVersion = grunt.config('meta.version');
  else if (undefined !== grunt.config('pkg.version')) text2datauri_pkgVersion = grunt.config('pkg.version');

  // main function
  grunt.registerMultiTask('text2datauri', 'Convert file to data: URI.', function() {
    // no processing required for options sub-task
    if ('text2datauri:options' === this.nameArgs) return;

    // process js file to create URI
    try {
      // check required config items
      this.requiresConfig(this.name+'.dist.src');
      this.requiresConfig(this.name+'.dist.dest');

      // get config options
      var configOptions = grunt.config(this.name+'.options');
      if (undefined !== configOptions) {
        if ('ascii' !== configOptions.sourceCharset) configOptions.sourceCharset = 'utf-8';
        if (undefined === configOptions.protocol) configOptions.protocol = 'data:';
        if (undefined === configOptions.mimeType) configOptions.mimeType = 'text/html';
        if ('' !== configOptions.targetCharset && 'utf-8' !== configOptions.targetCharset)  {
          configOptions.targetCharset = 'utf-8';
        }
        if ('uri' !== configOptions.encoding) configOptions.encoding = 'base64';
      }
      else configOptions = {
        sourceCharset: 'utf-8', // or 'ascii'; actual format is not validated by text2datauri
        protocol: 'data:', // any string; this is not validated by text2datauri
        mimeType: 'text/html', // any string;  this is not validated by text2datauri
        targetCharset: 'utf-8', // currently only utf-8 is valid
        encoding: 'base64' // or 'uri'; use 'uri' for encodeURIComponent() encoding
      };

      // build prefix
      var uriPrefix = grunt.helper('text2dataPrefix', configOptions);

      // read file
      var rawStr =  grunt.file.read(this.file.src);
      // here's where ascii/utf-8 might be validated or pre-processed

      // encode rawStr to data value
      var dataStr = grunt.helper('text2data', rawStr, configOptions.encoding);

      // write full URI to file & log
      var fullURI = uriPrefix + dataStr;
      grunt.file.write(this.file.dest, fullURI);
      console.log(this.file.src + ' -> ' + this.file.dest + ' (' + dataStr.length + ' bytes of data, ' + fullURI.length + ' total bytes)');
    }
    catch(e) {
      // log error & warn
      grunt.verbose.or.write('Error with ' + this.nameArgs + ', code:' + e.message);
      grunt.warn(this.nameArgs + ' found errors: ' + e.message, 10);
      return false;
    }
    return true;
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  // encoding in base64 or encodeURIComponent()
  grunt.registerHelper('text2data', function(rawString, encodingType) {
    if (undefined === rawString) return '';
    if ('uri' === encodingType) return encodeURIComponent(rawString);
    else return new Buffer(rawString).toString('base64');   
  });

  // string replacements driven by config options
  grunt.registerHelper('text2dataPrefix', function(uriOpts) {
    var protocol = (undefined !== uriOpts.protocol ? uriOpts.protocol : '');
    var mimeType = (undefined !== uriOpts.mimeType ? uriOpts.mimeType : '');
    var prefix = protocol + mimeType;
    var targetCharset = (undefined !== uriOpts.targetCharset ? uriOpts.targetCharset : 'utf-8');
    if ('' !== targetCharset)  {
      prefix += ('' === mimeType ? '' : ';');
      prefix += 'charset=utf-8';
    }
    var encoding = (undefined !== uriOpts.encoding ? uriOpts.encoding : 'base64');
    if ('base64' === encoding) {
      prefix += ('' === mimeType + targetCharset ? '' : ';');
      prefix += encoding + ',';
    }
    if ('' !== mimeType + targetCharset && 'uri' === encoding) prefix += ',';
    return prefix;
  });

};



















