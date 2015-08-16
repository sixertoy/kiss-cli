/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var result, helper,
        cwd = process.cwd(),
        path = require('path'),
        expect = require('chai').expect,
        yofile = require(path.join(cwd, 'src', 'cli'));

    describe('yofile', function () {});

}());
