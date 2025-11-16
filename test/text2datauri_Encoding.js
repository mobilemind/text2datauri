"use strict";
const { describe, test } = require("node:test");
const assert = require("node:assert/strict");
const text2datauriHelpers = require("../tasks/text2datauriHelpers.js");

describe("text2datauri Encoding", () => {
  test("encoding null with empty string", () => {
    assert.deepEqual(text2datauriHelpers.text2data("", ""), "",
      "text2data '' (null encoding value) should return ''");
  });

  test("encoding null with space", () => {
    const testVal = " ";
    const expectedVal = "IA==";
    assert.deepEqual(text2datauriHelpers.text2data(testVal, ""), expectedVal,
      `text2data '${testVal}' (null encoding value) should return '${expectedVal}'`);
  });

  test("encoding null with special characters", () => {
    const testVal = ";/?:@&=+,\" \"[]'\\%<>|";
    const expectedVal = "Oy8/OkAmPSssIiAiW10nXCU8Pnw=";
    assert.deepEqual(text2datauriHelpers.text2data(testVal, ""), expectedVal,
      `text2data '${testVal}' (null encoding value) should return '${expectedVal}'`);
  });

  test("base64 encoding with empty string", () => {
    assert.deepEqual(text2datauriHelpers.text2data("", "base64"), "",
      "text2data '' (base64 encoding) should return ''");
  });

  test("base64 encoding with space", () => {
    const testVal = " ";
    const expectedVal = "IA==";
    assert.deepEqual(text2datauriHelpers.text2data(testVal, "base64"), expectedVal,
      `text2data '${testVal}' (base64 encoding) should return '${expectedVal}'`);
  });

  test("base64 encoding with special characters", () => {
    const testVal = ";/?:@&=+,\" \"[]'\\%<>|";
    const expectedVal = "Oy8/OkAmPSssIiAiW10nXCU8Pnw=";
    assert.deepEqual(text2datauriHelpers.text2data(testVal, "base64"), expectedVal,
      `text2data '${testVal}' (base64 encoding) should return '${expectedVal}'`);
  });

  test("uri encoding with empty string", () => {
    assert.deepEqual(text2datauriHelpers.text2data("", "uri"), "",
      "text2data '' (uri encoding) should return ''");
  });

  test("uri encoding with space", () => {
    const testVal = " ";
    const expectedVal = "%20";
    assert.deepEqual(text2datauriHelpers.text2data(testVal, "uri"), expectedVal,
      `text2data '${testVal}' (uri encoding) should return '${expectedVal}'`);
  });

  test("uri encoding with special characters", () => {
    const testVal = ";/?:@&=+,\" \"[]'\\%<>|";
    const expectedVal = "%3B%2F%3F%3A%40%26%3D%2B%2C%22%20%22%5B%5D'%5C%25%3C%3E%7C";
    assert.deepEqual(text2datauriHelpers.text2data(testVal, "uri"), expectedVal,
      `text2data '${testVal}' (uri encoding) should return '${expectedVal}'`);
  });
});
