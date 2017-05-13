"use strict";
const text2datauriHelpers = require("../tasks/text2datauriHelpers.js");
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

exports.text2datauri = {
	"setUp": function(done) {
		// setup here
		done();
	},
	"text2dataPrefix tests": function(test) {
		test.expect(10);

		const optsToString = function (opts) {
			return `protocol: ${opts.protocol}, mimeType: ${opts.mimeType}, targetCharset: ${opts.targetCharset}, encoding: ${opts.encoding}`;
		};

		// test opts undefined
		const optsUndefined = {};
		let expectedVal = "charset=utf-8;base64,";
		test.deepEqual(text2datauriHelpers.text2dataPrefix(optsUndefined), expectedVal,
			`text2data all options undefined should return '${expectedVal}'`);

		// test opts all null
		let opts = {"encoding": "", "mimeType": "", "protocol": "", "targetCharset": ""};
		expectedVal = "";
		test.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
			`text2data all options null should return '${expectedVal}'`);

		// test opts all null, EXCEPT encoding: uri
		opts = {"encoding": "uri", "mimeType": "", "protocol": "", "targetCharset": ""};
		expectedVal = "";
		test.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
			`text2data all options null EXCEPT uri encoding returned '${text2datauriHelpers.text2dataPrefix(opts)}' and should return '${expectedVal}'`);

		// test opts all null, EXCEPT encoding: base64
		opts = {"encoding": "base64", "mimeType": "", "protocol": "", "targetCharset": ""};
		expectedVal = "base64,";
		test.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
			`text2data all options null EXCEPT base64 encoding should return '${expectedVal}'`);

		// test opts all expanded, base64 encoding
		opts = {"encoding": "base64", "mimeType": "text/html", "protocol": "data:", "targetCharset": "utf-8"};
		expectedVal = "data:text/html;charset=utf-8;base64,";
		test.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
			`text2data '${optsToString(opts)}' should return '${expectedVal}'`);

		// test opts all expanded, uri encoding
		opts = {"encoding": "uri", "mimeType": "text/csv", "protocol": "data:", "targetCharset": "utf-8"};
		expectedVal = "data:text/csv;charset=utf-8,";
		test.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
			`text2data '${optsToString(opts)}' should return '${expectedVal}'`);

		// test opts all expanded, no mimeType, base64 encoding
		opts = {"encoding": "base64", "mimeType": "", "protocol": "data:", "targetCharset": "utf-8"};
		expectedVal = "data:charset=utf-8;base64,";
		test.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
			`text2data '${optsToString(opts)}' should return '${expectedVal}'`);

		// test opts all expanded, no mimeType, uri encoding
		opts = {"encoding": "uri", "mimeType": "", "protocol": "data:", "targetCharset": "utf-8"};
		expectedVal = "data:charset=utf-8,";
		test.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
			`text2data '/{optsToString(opts)}' should return '${expectedVal}'`);

		// test opts ONLY base64 encoding + charset
		opts = {"encoding": "base64", "mimeType": "", "protocol": "", "targetCharset": "utf-8"};
		expectedVal = "charset=utf-8;base64,";
		test.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
			`text2data '${optsToString(opts)}' should return '${expectedVal}'`);

		// test opts ONLY uri encoding + charset
		opts = {"encoding": "uri", "mimeType": "", "protocol": "", "targetCharset": "utf-8"};
		expectedVal = "charset=utf-8,";
		test.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
			`text2data '${optsToString(opts)}' should return '${expectedVal}'`);
		test.done();
	}
};
