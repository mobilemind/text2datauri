// ==========================================================================
// HELPERS
// ==========================================================================
"use strict";
(function(exports) {
  // encoding in base64 or encodeURIComponent()
  exports.text2data = function(rawString, encodingType) {
    if (undefined === rawString) return '';
    if ('uri' === encodingType) return encodeURIComponent(rawString);
    else return new Buffer(rawString).toString('base64');
  };


  // string prefix driven by config options
  exports.text2dataPrefix = function(uriOpts) {
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
  };
}(typeof exports === 'object' && exports || this));
