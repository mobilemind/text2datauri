var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['text2datauri'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'text2dataPrefix tests': function(test) {
	test.expect(9);

	function optsToString(opts){
      return 'protocol:' + opts.protocol + ', mimeType: ' + opts.mimeType + ', targetCharset: ' + opts.targetCharset + ', encoding: ' + opts.encoding;
    }
	
	// test opts undefined
	var optsUndefined =  { };
	var expectedVal = 'charset=utf-8;base64,';
    test.deepEqual(grunt.helper('text2dataPrefix', optsUndefined),
      expectedVal,
      'text2data all options undefined should return "' + expectedVal + '"');

	// test opts all null
	var opts =  { protocol: '', mimeType: '', targetCharset: '', encoding: '' };
	expectedVal = 'charset=utf-8;base64,';
    test.deepEqual(grunt.helper('text2dataPrefix', opts),
      expectedVal,
      'text2data all options null should return "' + expectedVal + '"');

	// test opts all null, EXCEPT encoding
	opts =  { protocol: '', mimeType: '', targetCharset: '', encoding: 'uri' };
	expectedVal = 'charset=utf-8,';
    test.deepEqual(grunt.helper('text2dataPrefix', opts),
      expectedVal,
      'text2data all options null EXCEPT uri encoding should return "' + expectedVal + '"');

	// test opts all expanded, base64 encoding
	opts =  { protocol: 'data:', mimeType: 'text/html', targetCharset: 'utf-8', encoding: 'base64' };
	expectedVal = 'data:text/html;charset=utf-8;base64,';
    test.deepEqual(grunt.helper('text2dataPrefix', opts),
      expectedVal,
      'text2data "' + optsToString(opts) + '" should return "' + expectedVal + '"');

	// test opts all expanded, uri encoding
	opts =  { protocol: 'data:', mimeType: 'text/csv', targetCharset: 'utf-8', encoding: 'uri' };
	expectedVal = 'data:text/csv;charset=utf-8,';
    test.deepEqual(grunt.helper('text2dataPrefix', opts),
      expectedVal,
      'text2data "' + optsToString(opts) + '" should return "' + expectedVal + '"');

	// test opts all expanded, no mimeType, base64 encoding
	opts =  { protocol: 'data:', mimeType: '', targetCharset: 'utf-8', encoding: 'base64' };
	expectedVal = 'data:charset=utf-8;base64,';
    test.deepEqual(grunt.helper('text2dataPrefix', opts),
      expectedVal,
      'text2data "' + optsToString(opts) + '" should return "' + expectedVal + '"');

	// test opts all expanded, no mimeType, uri encoding
	opts =  { protocol: 'data:', mimeType: '', targetCharset: 'utf-8', encoding: 'uri' };
	expectedVal = 'data:charset=utf-8,';
    test.deepEqual(grunt.helper('text2dataPrefix', opts),
      expectedVal,
      'text2data "' + optsToString(opts) + '" should return "' + expectedVal + '"');

	// test opts ONLY base64 encoding + charset
	opts =  { protocol: '', mimeType: '', targetCharset: 'utf-8', encoding: 'base64' };
	expectedVal = 'charset=utf-8;base64,';
    test.deepEqual(grunt.helper('text2dataPrefix', opts),
      expectedVal,
      'text2data "' + optsToString(opts) + '" should return "' + expectedVal + '"');

	// test opts ONLY uri encoding + charset
	opts =  { protocol: '', mimeType: '', targetCharset: 'utf-8', encoding: 'uri' };
	expectedVal = 'charset=utf-8,';
    test.deepEqual(grunt.helper('text2dataPrefix', opts),
      expectedVal,
      'text2data "' + optsToString(opts) + '" should return "' + expectedVal + '"');

   test.done();
  }
};
