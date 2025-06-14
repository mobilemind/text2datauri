# text2datauri

![repo version](https://img.shields.io/github/package-json/v/mobilemind/text2datauri.svg)
 [![Latest version on npmjs.com][npm-image]][npm-url]
 [![Downloads from npmjs.com][npm-downloads]][npm-url]
 [![CodeQL](https://github.com/mobilemind/text2datauri/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/mobilemind/text2datauri/actions/workflows/codeql-analysis.yml)
[![NodeJS with Grunt](https://github.com/mobilemind/text2datauri/actions/workflows/npm-grunt.yml/badge.svg)](https://github.com/mobilemind/text2datauri/actions/workflows/npm-grunt.yml)
 [![Codacy Code Quality Rating][Codacy-image]][Codacy-dash]

A grunt plugin to convert a _text_ _file_ to a file with a data URI in base64
or simple URI encoding. Suitable to convert an HTML file to a `data:text/html;charset=utf-8;base64,...`
bookmark URI encoded in _base64_. Or use it to convert a CSV file to a
`data:text/csv;charset=utf-8,...` URI using basic `encodeURIComponent()`
encoding. It may also be useful for creating URLs to communicate between web
apps and iOS apps using URI protocol schemes. For converting a `.js` file to a
`javascript:` URI, please see the [js2uri] grunt plugin.

## Examples

An HTML file containing:

```html
<!DOCTYPE HTML>
<html lang=en><head><title>sample</title><body>content</body><html>
```

might become

```url
data:text/html;charset=utf-8;base64,PCFET0NUWVBFIEhUTUw+CjxodG1sIGxhbmc9ZW4+PGhlYWQ+PHRpdGxlPnNhbXBsZTwvdGl0bGU+PGJvZHk+Y29udGVudDwvYm9keT48aHRtbD4=
```

A CSV file containing:

```csv
"Crosby, Stills, Nash & Young", "Déjà Vu"
```

might become

```url
data:text/csv;charset=utf-8,%22Crosby%2C%20Stills%2C%20Nash%20%26%20Young%22%2C%20%22D%C3%A9j%C3%A0%20Vu%22
```

## Getting Started

### Install

Install this grunt plugin into a project with:
`npm install text2datauri --save-dev`. The `--save-dev` option adds
`text2datauri` to the _devDependencies_ section of the project `package.json`
file.

### Edit Gruntfile.js

Add the following to the `grunt.initConfig` section of the project
`Gruntfile.js` file:

```javascript
"text2datauri": {
  "dist/outputFilename.uri": "dist/lintedAndMinifiedFile.js"
}
```

Edit the  values for the `dist/output...` (destination file) and the
`dist/lintedAndMinifiedFile.js` source) as appropriate. See
[Documentation](#documentation) below for details on additional `text2datauri`
options.

Below the `grunt.initConfig` section, load `text2datauri` as an external task
before using it.

```javascript
// load external task
grunt.loadNpmTasks("text2datauri");

// default task
grunt.registerTask("default", ["text2datauri"]);
```

## Documentation

The elaborated `Gruntfile.js` below shows options and defaults relating to
`text2datauri`.

```javascript
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // eslint - Critical eslint rules to disable: no-void, no-script-url
    // Example .eslintrc.yml config file--
    // env:
    //   browser: true
    //   es6: true
    //   node: true
    // extends: eslint:recommended
    // rules:
    //   no-void: 0
    //   no-script-url: 0
    //
    // jshint - Critical jshint option: browser & scripturl (allow)
    // "jshint": {
    //   "options": {
    //     "browser": true,
    //     "scripturl": true
    //   }
    // },
    //
    // uglify-js - Note: you may need to 'tune' options for your source
    // "uglify": {
    //   "options": {
    //     "codegen": {"quote_keys": false}
    //     "mangle": {"toplevel": true},
    //     "squeeze": {"conditionals": false, "hoist_vars": true, "sequences": false},
    //   }
    // },
    //
    // ** text2datauri defaults are shown. Note the file spec uses compact form
    "text2datauri": {
      "options": {
        "encoding": "base64", // "base64" or "uri"; use "uri" for encodeURIComponent()
        "mimeType": "text/html", // any string;  this is not validated by text2datauri
        "protocol": "data:", // any string; this is not validated by text2datauri
        "sourceCharset": "utf-8", // "utf-8" or "ascii"; actual format not validated
        "targetCharset": "utf-8", // "utf-8" or ""; metadata output is always utf-8
      }
    }
  });

  // load external task ("text2datauri" plugin)
  grunt.loadNpmTasks("text2datauri");

  // default task
  grunt.registerTask("default", ["text2datauri"]);
};
```

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test the
code using `eslint` (preferred) or `jshint`.

## Release History

1.10.3: no functional changes; update cspell dictionary, strictly enforce node
& npm requirements with .npmrc, bump version, update lockfile, republish

1.10.1: no functional change; integrate cspell for use with git pre-push hook,
fix typos, update lockfile

1.10.0: require node ≥ 20.18.0 (node 20 in maintenance mode), drop support for
node 18, bump version, update lockfile

1.9.9: require node >= 18.20.0 (node 18 in maintenance mode), bump version,
update lockfile

1.9.5: require node > 18.15.0

1.9.0: drop support for node < 18.13

1.8.0: drop support for node < 16.14

1.7.0: drop support for node < 16.8; update grunt & README

1.6.0: drop support for node 12, as 14 becomes node LTS

1.4.0: drop snyk as it doubled dependencies & increased build time; rely on renovatebot

1.3.0: require node 10+

1.2.0: drop node 6 support; bump version

1.1.0: drop node 5; enhance eslint rule checks; bump version

1.0.2: updated package.json and .travis.tml to use `node` ">5.0.0" and `grunt`
">1.0.0"

1.0.1: update internals to use es6 let/const; update Travis CI `.travis.yml`
to improve build checks/process

1.0.0: update to current LTS versions of `node` (4.x, 5.x); update to use
`grunt-contrib-...` ">=1.0.0"

0.0.27: update package.json to work with `grunt-contrib-jshint` ">=0.11.0" to
allow use of 1.00 and beyond

## License

Copyright (c) 2012-2024 Tom King.
Licensed under the MIT license.

<!-- reference URLs -->

[npm-image]: https://img.shields.io/npm/v/text2datauri.svg

[npm-downloads]: https://img.shields.io/npm/dm/text2datauri.svg

[npm-url]: https://www.npmjs.com/package/text2datauri

[Codacy-image]: https://api.codacy.com/project/badge/Grade/7cb819760c274a2f898b9c19b2d2986a

[Codacy-dash]: https://www.codacy.com/app/mobilemind/text2datauri

[js2uri]: http://npmjs.org/package/js2uri
