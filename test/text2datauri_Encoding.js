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
  setUp (done) {
    // setup here
    done();
  },
  text2datauri_Encoding (test) {
    test.expect(9);

    // test encoding null, null data string & results
    test.deepEqual(text2datauriHelpers.text2data("", ""), "",
      "text2data '' (null encoding value) should return ''");

    // test encoding null, empty space data string
    let testVal = " ";
    let expectedVal = "IA==";
    test.deepEqual(text2datauriHelpers.text2data(testVal, ""), expectedVal,
      `text2data '${testVal}' (null encoding value) should return '${expectedVal}'`);

    // test encoding null, sample data String
    testVal = ";/?:@&=+,\" \"[]'\\%<>|";
    expectedVal = "Oy8/OkAmPSssIiAiW10nXCU8Pnw=";
    test.deepEqual(text2datauriHelpers.text2data(testVal, ""), expectedVal,
      `text2data '${testVal}' (null encoding value) should return '${expectedVal}'`);

    // test encoding base64, null data string & results
    test.deepEqual(text2datauriHelpers.text2data("", "base64"), "",
      "text2data '' (base64 encoding) should return ''");

    // test encoding base64, empty space data string
    testVal = " ";
    expectedVal = "IA==";
    test.deepEqual(text2datauriHelpers.text2data(testVal, "base64"), expectedVal,
      `text2data '${testVal}' (base64 encoding) should return '${expectedVal}'`);

    // test encoding base64, sample data String
    testVal = ";/?:@&=+,\" \"[]'\\%<>|";
    expectedVal = "Oy8/OkAmPSssIiAiW10nXCU8Pnw=";
    test.deepEqual(text2datauriHelpers.text2data(testVal, "base64"), expectedVal,
      `text2data '${testVal}' (base64 encoding) should return '${expectedVal}'`);

    // test encoding uri, null data string & results
    test.deepEqual(text2datauriHelpers.text2data("", "uri"), "",
      "text2data '' (uri encoding) should return ''");

    // test encoding uri, empty space data string
    testVal = " ";
    expectedVal = "%20";
    test.deepEqual(text2datauriHelpers.text2data(testVal, "uri"), expectedVal,
      `text2data '${testVal}' (uri encoding) should return '${expectedVal}'`);

    // test encoding uri, sample data string
    testVal = ";/?:@&=+,\" \"[]'\\%<>|";
    expectedVal = "%3B%2F%3F%3A%40%26%3D%2B%2C%22%20%22%5B%5D'%5C%25%3C%3E%7C";
    test.deepEqual(text2datauriHelpers.text2data(testVal, "uri"), expectedVal,
      `text2data '${testVal}' (uri encoding) should return '${expectedVal}'`);
    test.done();
  }
};
