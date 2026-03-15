"use strict";
const { describe, test } = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"));
const CLI = path.join(__dirname, "..", "bin", "text2datauri.js");

describe("text2datauri CLI", () => {
  test("--help exits 0 and shows Usage:", () => {
    const result = spawnSync(process.execPath, [CLI, "--help"], { encoding: "utf8" });
    assert.equal(result.status, 0);
    assert.ok(result.stdout.includes("Usage:"));
  });

  test("--version exits 0 and prints version", () => {
    const result = spawnSync(process.execPath, [CLI, "--version"], { encoding: "utf8" });
    assert.equal(result.status, 0);
    assert.equal(result.stdout.trim(), pkg.version);
  });

  test("converts HTML file with defaults to base64 data URI", () => {
    const tmpFile = path.join(os.tmpdir(), "t2d_test.html");
    const content = "<html></html>";
    fs.writeFileSync(tmpFile, content, "utf8");
    try {
      const result = spawnSync(process.execPath, [CLI, tmpFile], { encoding: "utf8" });
      assert.equal(result.status, 0);
      const expected = "data:text/html;charset=utf-8;base64," +
        Buffer.from(content).toString("base64");
      assert.equal(result.stdout.trim(), expected);
    } finally {
      fs.unlinkSync(tmpFile);
    }
  });

  test("converts CSV file with --encoding uri --mime-type text/csv", () => {
    const tmpFile = path.join(os.tmpdir(), "t2d_test.csv");
    const content = "a,b";
    fs.writeFileSync(tmpFile, content, "utf8");
    try {
      const result = spawnSync(
        process.execPath,
        [CLI, "--encoding", "uri", "--mime-type", "text/csv", tmpFile],
        { encoding: "utf8" }
      );
      assert.equal(result.status, 0);
      const expected = "data:text/csv;charset=utf-8," + encodeURIComponent(content);
      assert.equal(result.stdout.trim(), expected);
    } finally {
      fs.unlinkSync(tmpFile);
    }
  });

  test("missing input file exits 1 with Error on stderr", () => {
    const result = spawnSync(
      process.execPath,
      [CLI, "/nonexistent/t2d_missing.html"],
      { encoding: "utf8" }
    );
    assert.equal(result.status, 1);
    assert.ok(result.stderr.includes("Error"));
  });

  test("writes to output file and logs src -> dest to stderr", () => {
    const tmpIn = path.join(os.tmpdir(), "t2d_in.html");
    const tmpOut = path.join(os.tmpdir(), "t2d_out.uri");
    const content = "<html></html>";
    fs.writeFileSync(tmpIn, content, "utf8");
    try {
      const result = spawnSync(process.execPath, [CLI, tmpIn, tmpOut], { encoding: "utf8" });
      assert.equal(result.status, 0);
      const expected = "data:text/html;charset=utf-8;base64," +
        Buffer.from(content).toString("base64");
      assert.equal(fs.readFileSync(tmpOut, "utf8"), expected);
      assert.ok(result.stderr.includes("->"));
      assert.ok(result.stderr.includes("bytes"));
    } finally {
      fs.unlinkSync(tmpIn);
      try { fs.unlinkSync(tmpOut); } catch (_e) { /* ignore */ }
    }
  });
});
