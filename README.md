# text2datauri

[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url]
[![Dependency Status][dep-image]][dep-url] [![devDependency Status][devDep-image]][devDep-url]

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
`npm install text2datauri --save-dev `. The `--save-dev` option adds
`text2datauri` to the _devDependencies_ section of the project [package.json]
file.

### Edit Gruntfile.js

Add the following to the `grunt.initConfig` section of the project
`Gruntfile.js` file:

```javascript
"text2datauri":  {
  "dist/outputFilename.uri": "dist/lintedAndMinifiedFile.js"
}
```

Edit the  values for the `dist/output...` (destination file) and the
`dist/lintedAndMinifiedFile.js` source) as appropriate. See
[Documenation](#documentation) below for details on additional `text2datauri`
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
    text2datauri:  {
      options: {
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

1.0.4: switch to eslint and apply best practices feedback from it

1.0.3: updates based on lint and for Code Climate testing/feedback

1.0.2: updated package.json and .travis.tml to use `node` ">5.0.0" and `grunt`
">1.0.0"

1.0.1: update internals to use es6 let/const; update Travis CI `.travis.yml`
to improve build checks/process

1.0.0: update to current LTS versions of `node` (4.x, 5.x); update to use
`grunt-contrib-...` ">=1.0.0"

0.0.27: update package.json to work with `grunt-contrib-jshint` ">=0.11.0" to
allow use of 1.00 and beyond

0.0.26: update package.json to work with `grunt-contrib-jshint` 0.11.x -
0.12.x; update Copyright in README

0.0.25: update .travis.yml to test with `node` 0.10 0.11, 0.12, 4.2 and 5.0

0.0.24: update package.json to support use of `node` ">=0.10.0" (e.g., now
works w/ node 4.0.x)

0.0.23 - 0.0.20: NO FUNCTIONAL CHANGE. bump version so npmjs.com will accept
new docs (Markdown parser issues with npmjs.com v. github.com)

0.0.19: update license info in `package.json` to use new property and SPDX
format

0.0.18: update devDependencies and copyright info

0.0.17: work with `node` engine 0.10.x - 0.12.x

0.0.16: January 22, 2015 -update to `grunt-contrib-jshint` 0.11.x; add some
stricter checks

0.0.15: June 10, 2014 - update to `grunt-contrib-nodeunit` 0.4.x

0.0.14: April 21, 2014 - update to `grunt-contrib-jshint` 0.10.x

0.0.13: March 26, 2014 - update to `grunt-contrib-jshint` 0.9.x;
`grunt-contrib-nodeunit` to 0.3.x

0.0.12: December 27, 2013 - update to `grunt-contrib-jshint` 0.8.x and
streamline dependencies

0.0.11: December 9, 2013 - update to `grunt-contrib-jshint` 0.7.x and
integrate Travis CI

0.0.10: November 15, 2013 - bump version and remember to update doc

0.0.9: November 15, 2013 - update dependancies in `package.json`, bump version
(forget to update doc)

0.0.8: July 28, 2013 - update dependancies in `package.json`, bump version

0.0.7: July 12, 2013 - update dependancies in `package.json`, bump version

0.0.6: May 20, 2013 - update license URL in `package.json`, bump version

0.0.5 May 18, 2013 - Update `package.json` for `node>=0.10.7` and
`jshint >= 0.5.2`, Gruntfile.js edited to remove `"es5": true,` (now default
for jshint 0.5.2)

0.0.4 March 12, 2013 - Update package.json for node 0.10.0 (ie
`node>=0.10.0`), `'use strict';` added to Gruntfile.js

0.0.3 February 28, 2013 - Stricter jshint Gruntfile options; package.json
updates

0.0.2 February 20, 2013 - fully functional / 'beta', w/grunt 0.4.0,
Gruntfile.js

0.0.1 February 4, 2013 - initial commit / ALPHA SOFTWARE - NOT FULLY
FUNCTIONAL

## License

Copyright (c) 2012-2017 Tom King.
Licensed under the MIT license.

<!-- reference URLs -->

[build-image]: https://secure.travis-ci.org/mobilemind/text2datauri.svg?branch=master

[build-url]: https://travis-ci.org/mobilemind/text2datauri

[npm-image]: https://img.shields.io/npm/v/text2datauri.svg

[npm-url]: https://www.npmjs.com/package/text2datauri

[dep-image]: https://david-dm.org/mobilemind/text2datauri.svg

[dep-url]: https://david-dm.org/mobilemind/text2datauri

[devDep-image]: https://img.shields.io/david/dev/mobilemind/text2datauri.svg

[devDep-url]: https://david-dm.org/mobilemind/text2datauri#info=devDependencies

[grunt]: http://gruntjs.com/

[getting-started]: http://gruntjs.com/getting-started

[js2uri]: http://npmjs.org/package/js2uri
