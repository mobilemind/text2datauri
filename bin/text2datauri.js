#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const { text2data, text2dataPrefix } = require("../tasks/text2datauriHelpers.js");

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"));

const USAGE = `Usage: text2datauri [options] <input> [output]

Convert a text file to a data URI.

Arguments:
  input                   Source file to encode
  output                  (optional) Output file; defaults to stdout

Options:
  --encoding <type>       Encoding type: base64 (default) or uri
  --mime-type <type>      MIME type (default: text/html)
  --protocol <proto>      URI protocol prefix (default: data:)
  --source-charset <cs>   Source file charset (default: utf-8)
  --target-charset <cs>   Target charset in URI (default: utf-8)
  --version               Print version and exit
  --help                  Show this help message and exit
`;

const args = process.argv.slice(2);

if (args.includes("--help")) {
  process.stdout.write(USAGE);
  process.exit(0);
}

if (args.includes("--version")) {
  process.stdout.write(`${pkg.version}\n`);
  process.exit(0);
}

const opts = {
  encoding: "base64",
  mimeType: "text/html",
  protocol: "data:",
  sourceCharset: "utf-8",
  targetCharset: "utf-8"
};

let inputFile = null;
let outputFile = null;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === "--encoding") {
    opts.encoding = args[++i];
  } else if (arg === "--mime-type") {
    opts.mimeType = args[++i];
  } else if (arg === "--protocol") {
    opts.protocol = args[++i];
  } else if (arg === "--source-charset") {
    opts.sourceCharset = args[++i];
  } else if (arg === "--target-charset") {
    opts.targetCharset = args[++i];
  } else if (!arg.startsWith("--")) {
    if (inputFile === null) {
      inputFile = arg;
    } else if (outputFile === null) {
      outputFile = arg;
    }
  }
}

if (!inputFile) {
  process.stderr.write("Error: input file required\n\n");
  process.stderr.write(USAGE);
  process.exit(1);
}

let rawStr;
try {
  rawStr = fs.readFileSync(inputFile, opts.sourceCharset);
} catch (e) {
  process.stderr.write(`Error reading ${inputFile}: ${e.message}\n`);
  process.exit(1);
}

const result = text2dataPrefix(opts) + text2data(rawStr, opts.encoding);

if (outputFile) {
  try {
    fs.writeFileSync(outputFile, result);
    process.stderr.write(`${inputFile} -> ${outputFile} (${result.length} bytes)\n`);
  } catch (e) {
    process.stderr.write(`Error writing ${outputFile}: ${e.message}\n`);
    process.exit(1);
  }
} else {
  process.stdout.write(`${result}\n`);
}
