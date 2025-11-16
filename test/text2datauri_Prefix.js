"use strict";
const { describe, test } = require("node:test");
const assert = require("node:assert/strict");
const text2datauriHelpers = require("../tasks/text2datauriHelpers.js");

describe("text2datauri Prefix", () => {
  const optsToString = function (opts) {
    return `protocol: ${opts.protocol}, mimeType: ${opts.mimeType}, targetCharset: ${opts.targetCharset}, encoding: ${opts.encoding}`;
  };

  test("opts undefined", () => {
    const optsUndefined = {};
    const expectedVal = "charset=utf-8;base64,";
    assert.deepEqual(text2datauriHelpers.text2dataPrefix(optsUndefined),
      expectedVal,
      `text2data all options undefined should return '${expectedVal}'`);
  });

  test("opts all null", () => {
    const opts = {
      "encoding": "",
      "mimeType": "",
      "protocol": "",
      "targetCharset": ""
    };
    const expectedVal = "";
    assert.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
      `text2data all options null should return '${expectedVal}'`);
  });

  test("opts all null, EXCEPT encoding: uri", () => {
    const opts = {
      "encoding": "uri",
      "mimeType": "",
      "protocol": "",
      "targetCharset": ""
    };
    const expectedVal = "";
    assert.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
      `text2data all options null EXCEPT uri encoding returned '${text2datauriHelpers.text2dataPrefix(opts)}' and should return '${expectedVal}'`);
  });

  test("opts all null, EXCEPT encoding: base64", () => {
    const opts = {
      "encoding": "base64",
      "mimeType": "",
      "protocol": "",
      "targetCharset": ""
    };
    const expectedVal = "base64,";
    assert.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
      `text2data all options null EXCEPT base64 encoding should return '${expectedVal}'`);
  });

  test("opts all expanded, base64 encoding", () => {
    const opts = {
      "encoding": "base64",
      "mimeType": "text/html",
      "protocol": "data:",
      "targetCharset": "utf-8"
    };
    const expectedVal = "data:text/html;charset=utf-8;base64,";
    assert.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
      `text2data '${optsToString(opts)}' should return '${expectedVal}'`);
  });

  test("opts all expanded, uri encoding", () => {
    const opts = {
      "encoding": "uri",
      "mimeType": "text/csv",
      "protocol": "data:",
      "targetCharset": "utf-8"
    };
    const expectedVal = "data:text/csv;charset=utf-8,";
    assert.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
      `text2data '${optsToString(opts)}' should return '${expectedVal}'`);
  });

  test("opts all expanded, no mimeType, base64 encoding", () => {
    const opts = {
      "encoding": "base64",
      "mimeType": "",
      "protocol": "data:",
      "targetCharset": "utf-8"
    };
    const expectedVal = "data:charset=utf-8;base64,";
    assert.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
      `text2data '${optsToString(opts)}' should return '${expectedVal}'`);
  });

  test("opts all expanded, no mimeType, uri encoding", () => {
    const opts = {
      "encoding": "uri",
      "mimeType": "",
      "protocol": "data:",
      "targetCharset": "utf-8"
    };
    const expectedVal = "data:charset=utf-8,";
    assert.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
      `text2data '${optsToString(opts)}' should return '${expectedVal}'`);
  });

  test("opts ONLY base64 encoding + charset", () => {
    const opts = {
      "encoding": "base64",
      "mimeType": "",
      "protocol": "",
      "targetCharset": "utf-8"
    };
    const expectedVal = "charset=utf-8;base64,";
    assert.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
      `text2data '${optsToString(opts)}' should return '${expectedVal}'`);
  });

  test("opts ONLY uri encoding + charset", () => {
    const opts = {
      "encoding": "uri",
      "mimeType": "",
      "protocol": "",
      "targetCharset": "utf-8"
    };
    const expectedVal = "charset=utf-8,";
    assert.deepEqual(text2datauriHelpers.text2dataPrefix(opts), expectedVal,
      `text2data '${optsToString(opts)}' should return '${expectedVal}'`);
  });
});
