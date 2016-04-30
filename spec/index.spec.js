/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var file, result, helper,
        cwd = process.cwd(),
        path = require('path'),
        expect = require('chai').expect,
        Writer = require(path.join(cwd, 'src', 'output-writer'));

    describe('output-writer', function () {
        describe('_isDotFile', function () {
            it('return true', function () {
                file = '.gitignore';
                result = Writer._isDotFile(file);
                expect(result).to.equal(true);
            });
            it('return false', function () {
                file = 'readme';
                result = Writer._isDotFile(file);
                expect(result).to.equal(false);
                file = 'readme.';
                result = Writer._isDotFile(file);
                expect(result).to.equal(false);
                file = 'readme.md';
                result = Writer._isDotFile(file);
                expect(result).to.equal(false);
            });
        });

        describe('_hasExtension', function () {
            it('return true', function () {
                file = 'index.js';
                result = Writer._hasExtension(file);
                expect(result).to.equal(true);
                file = 'index.spec.js';
                result = Writer._hasExtension(file);
                expect(result).to.equal(true);
            });
            it('return false', function () {
                file = 'index';
                result = Writer._hasExtension(file);
                expect(result).to.equal(false);
                file = 'index.';
                result = Writer._hasExtension(file);
                expect(result).to.equal(false);
                file = '.index';
                result = Writer._hasExtension(file);
                expect(result).to.equal(false);
            });
        });
        describe('_removeTrailingDot', function () {
            it('return readme', function () {
                file = 'readme';
                result = Writer._removeTrailingDot(file);
                expect(result).to.equal(file);
            });
            it('return readme.md', function () {
                file = 'readme.md';
                result = Writer._removeTrailingDot(file);
                expect(result).to.equal(file);
            });
            it('return .readme', function () {
                file = '.readme';
                result = Writer._removeTrailingDot(file);
                expect(result).to.equal(file);
            });
            it('return empty string', function () {
                file = '';
                result = Writer._removeTrailingDot(file);
                expect(result).to.equal(file);
            });
            it('return readme', function () {
                file = 'readme.';
                result = Writer._removeTrailingDot(file);
                expect(result).to.equal('readme');
            });
        });
        describe('_isTrailingDot', function () {
            it('return true', function () {
                file = 'readme.';
                result = Writer._isTrailingDot(file);
                expect(result).to.equal(true);
            });
            it('return false', function () {
                file = '.readme';
                result = Writer._isTrailingDot(file);
                expect(result).to.equal(false);
                file = 'readme.md';
                result = Writer._isTrailingDot(file);
                expect(result).to.equal(false);
                file = 'readme.md';
                result = Writer._isTrailingDot(file);
                expect(result).to.equal(false);
            });

        });
        describe('_getExtension', function () {
            it('return .js', function () {
                file = 'index.js';
                result = Writer._getExtension(file);
                expect(result).to.equal('.js');
            });
            it('return .spec.js', function () {
                file = 'index.spec.js';
                result = Writer._getExtension(file);
                expect(result).to.equal('.spec.js');
            });
            it('return empty string', function () {
                file = '.gitignore';
                result = Writer._getExtension(file);
                expect(result).to.equal('');
                file = 'index';
                result = Writer._getExtension(file);
                expect(result).to.equal('');
            });
        });

    });

}());
