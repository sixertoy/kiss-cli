# Kiss!

[![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url]


##### **Kiss** is a command line tool for creating templated files, written in JavaScript/NodeJS

Generator of files which was motivated by the one and only, Bonaldi's Effect:<br>
*It's totally unnecessary and therefore strictly indispensable!*<br>
This great concept was first designed by the play [La Cantatrice chauve](https://fr.wikipedia.org/wiki/La_Cantatrice_chauve) by Eugène Ionesco.


## Install

```bash
npm install -g kiss-cli
```

> **must be installed globally**

## Usage

```bash
kiss <path/to/filename/wo_extension> <filetype>
```

## Available Templates

- [Angular module](#angular)
- [HTML page](#html)
- [Mocha spec file](#test)
- [Gruntfile](#gruntfile)
- [Grunt's task](#task)
- [Gulpfile](#gulp)
- [JS Module](#js)

<a name="angular"><a>
#### Angular Module

```bash
kiss <path/to/filename/wo_extension> angular
```

###### Output

```javascript
/*jslint indent:4 */
/*globals angular */
(function(){
    'use strict';
    angular.module('moduleApp', [])
        .controller('AppController', ['$scope', function ($scope) {
        }]);
}());
```

<a name="html"><a>
#### Simple HTML page

```bash
kiss <path/to/filename/wo_extension> html
```

###### Output

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <title></title>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
    <!-- styles -->
</head>
<body>
    <div class="before-body">
        <!--[if lt IE 7]>
    <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
    </div>
    <div class="">
        <!-- content -->
    </div>
    <div class="after-body">
        <!-- scripts -->
    </div>
</body>
</html>
```

<a name="test"><a>
#### Mocha spec file

```bash
kiss <path/to/filename/wo_extension> mocha
```

###### Output

```javascript
/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {
    'use strict';
    var result, helper,
        cwd = process.cwd(),
        path = require('path'),
        expect = require('chai').expect,
        helper = require(path.join(cwd));
    describe('helper', function () {
        beforeEach(function(){});
        afterEach(function(){});
        describe('Method', function () {
            it('Expect something', function(){
                expect(function(){
                    result = helper.render();
                }).toThrow();
            });
        });
    });
}());
```

<a name="gruntfile"><a>
#### Gruntfile ([load-grunt-config](https://www.npmjs.com/package/load-grunt-config))

```bash
kiss <path/to/filename/wo_extension> grunt
```

###### Output

```javascript
/**
 * <project_name>
 * <project_repo>
 *
 * Copyright (c) <year> <username>
 * Licensed under the MIT license.
 *
 */
/*jslint indent: 4 */
/*global module, require */
module.exports = function (grunt) {
    'use strict';
    require('load-grunt-config')(grunt);
};
```

<a name="gulpfile"><a>
#### Gulpfile

```bash
kiss <path/to/filename/wo_extension> gulp
```

###### Output

```javascript
/**
 *
 * Install Locals Dev
 * npm install gulp gulp-jshint jshint-stylish --save-dev
 *
 */
/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {
    'use strict';
    var // variables
        src = './src',
        dest = './build',
        // requires
        gulp = require('gulp'),
        path = require('path'),
        jshint = require('gulp-jshint');
    gulp.task('default', function(){
        gulp.src(path.join(src))
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(gulp.dest(dest))
    });
}());
```

<a name="task"><a>
#### Grunt's task (load-grunt-config)

```bash
kiss <path/to/filename/wo_extension> task
```

###### Output

```javascript
/*jslint indent: 4 */
/*global module */
module.exports = function (grunt, opts) {
    'use strict';
    return {
        options: {},
        all:{}
    };
};
```

<a name="js"><a>
#### JS Module

```bash
kiss <path/to/filename/wo_extension> js
```

###### Output

```javascript
/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function(){
    'use strict';
    module.exports = {};
}());
```

#### very very simple PHP...

```bash
kiss <path/to/filename/wo_extension> php
```

###### Output

```php
<?php
```

> see temlates directory

## Issues

- Overwrite existing file by default
- Not tested under UNIX
- No Mocha tests

## Contributing

- Add file template inside ./templates
- Your template must be name <name>.<extension>.tpl
- Update README.md
- Make an individual pull request for each suggestion

## History

- v0.1.24 Fix install 'npm install -g kiss-cli'
- v0.1.22 Add gulpfile template
- v0.1.16 Fix NPM install...

[license-img]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE-MIT

[npm-url]: https://npmjs.org/package/kiss-cli
[npm-version-img]: http://img.shields.io/npm/v/kiss-cli.svg?style=flat-square
[npm-downloads-img]: http://img.shields.io/npm/dm/kiss-cli.svg?style=flat-square
