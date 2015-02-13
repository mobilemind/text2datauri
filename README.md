# text2datauri [![NPM version](https://badge.fury.io/js/text2datauri.svg)](http://badge.fury.io/js/text2datauri)

[![Build Status](https://secure.travis-ci.org/mobilemind/text2datauri.png?branch=master)](http://travis-ci.org/mobilemind/text2datauri)

A grunt plugin to convert a _text_ _file_ to a file with a data URI in base64 or
simple URI encoding. Suitable to convert an HTML file to a `data:text/html;charset=utf-8;base64,...`
bookmark URI encoded in _base64_. Or use it to convert a CSV file to a
`data:text/csv;charset=utf-8,...` URI using basic `encodeURIComponent()` encoding. It may
also be useful for creating URLs to communicate between web apps and iOS apps using URI
protocol schemes.

For converting a `.js` file to a `javascript:` URI, please see the [js2uri] grunt plugin.

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
Install this grunt plugin next to your project's [Gruntfile.js gruntfile][getting_started]
with: `npm install text2datauri`

### Edit Gruntfile.js

Add the following to the `grunt.initConfig` section of your project's `Gruntfile.js` file:
```javascript
text2datauri:  {
  'dist/outputFilename.uri': 'dist/lintedAndMinifiedFile.js'
}
```
Edit the  values for the `dist/output...` (destination file) and the `dist/lintedAndMinifiedFile.js`
source) as appropriate. See [Documenation](#documentation) below for details on
additional `text2datauri` options.

Below the `grunt.initConfig` section, load `text2datauri` as an external task before using it.

```javascript
// load external task
grunt.loadNpmTasks('text2datauri');

// default task
grunt.registerTask('default', [ "text2datauri" ] );
```

## Documentation
The elaborated `Gruntfile.js` below shows options and defaults relating to `text2datauri`.

```javascript
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // note critical jshint options for strict, scripturl, & browser
    jshint: {
      files: ['Gruntfile.js', 'src/*.js'],
      options: {
      strict: false,
      ...
      scripturl: true,
      browser: true
      },
      globals: {}
    },
    // note compact file spec-- 'destinationfile': ['sourcefile'],
    uglify: {
      'dist/lintedAndMinifiedFile.js': ['src/*.js'],
      options: {
        mangle: {toplevel: true},
        squeeze: {sequences: false, conditionals: false, hoist_vars: true},
        codegen: {quote_keys: false}
      }
    },
    // text2datauri default options are shown, file specification uses compact form
    text2datauri:  {
      'dist/outputFilename.uri': 'dist/lintedAndMinifiedFile.js',
      options: {
        sourceCharset: 'utf-8', // 'utf-8' or 'ascii'; actual format not validated (yet?)
        protocol: 'data:', // any string; this is not validated by text2datauri
        mimeType: 'text/html', // any string;  this is not validated by text2datauri
        targetCharset: 'utf-8', // 'utf-8' or ''; metadata only- output is always utf-8
        encoding: 'base64' // 'base64' or 'uri'; use 'uri' for encodeURIComponent() encoding
      }
    }
  });

  // load external task
  grunt.loadNpmTasks('text2datauri');

  // default task
  grunt.registerTask('default', [ "text2datauri" ] );
};
```

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code using [grunt].

## Release History
0.0.17: work with `node` engine 0.10.x - 0.12.x

0.0.16: January 22, 2015 -update to `grunt-contrib-jshint` 0.11.x; add some stricter checks

0.0.15: June 10, 2014 - update to `grunt-contrib-nodeunit` 0.4.x

0.0.14: April 21, 2014 - update to `grunt-contrib-jshint` 0.10.x

0.0.13: March 26, 2014 - update to `grunt-contrib-jshint` 0.9.x; `grunt-contrib-nodeunit` to 0.3.x

0.0.12: December 27, 2013 - update to `grunt-contrib-jshint` 0.8.x and streamline dependencies

0.0.11: December 9, 2013 - update to `grunt-contrib-jshint` 0.7.x and integrate Travis CI

0.0.10: November 15, 2013 - bump version and remember to update doc

0.0.9: November 15, 2013 - update dependancies in `package.json`, bump version (forget to update doc)

0.0.8: July 28, 2013 - update dependancies in `package.json`, bump version

0.0.7: July 12, 2013 - update dependancies in `package.json`, bump version

0.0.6: May 20, 2013 - update license URL in `package.json`, bump version

0.0.5 May 18, 2013 - Update `package.json` for `node>=0.10.7` and `jshint >= 0.5.2`,
Gruntfile.js edited to remove `es5: true,` (now default for jshint 0.5.2)

0.0.4 March 12, 2013 - Update package.json for node 0.10.0 (ie `node>=0.10.0`),
`'use strict';` added to Gruntfile.js

0.0.3 February 28, 2013 - Stricter jshint Gruntfile options; package.json updates

0.0.2 February 20, 2013 - fully functional / 'beta', w/grunt 0.4.0, Gruntfile.js

0.0.1 February 4, 2013 - initial commit / ALPHA SOFTWARE - NOT FULLY FUNCTIONAL

## License
Copyright (c) 2012, 2013, 2014 Tom King.
Licensed under the MIT license.

<!-- reference URLs -->
[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/wiki/Getting-started
[js2uri]: http://npmjs.org/package/js2uri
