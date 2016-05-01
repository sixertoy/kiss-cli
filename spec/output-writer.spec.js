/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var file, result, helper, template,
        cwd = process.cwd(),
        path = require('path'),
        expect = require('chai').expect,
        Helper = require(path.join(cwd, 'src', 'output-writer'));

    describe('output-writer', function () {
        describe('_isDotFile', function () {
            it('return true', function () {
                file = '.gitignore';
                result = Helper._isDotFile(file);
                expect(result).to.equal(true);
            });
            it('return false', function () {
                file = 'readme';
                result = Helper._isDotFile(file);
                expect(result).to.equal(false);
                file = 'readme.';
                result = Helper._isDotFile(file);
                expect(result).to.equal(false);
                file = 'readme.md';
                result = Helper._isDotFile(file);
                expect(result).to.equal(false);
            });
        });

        describe('_hasExtension', function () {
            it('return true', function () {
                file = 'index.js';
                result = Helper._hasExtension(file);
                expect(result).to.equal(true);
                file = 'index.spec.js';
                result = Helper._hasExtension(file);
                expect(result).to.equal(true);
            });
            it('return false', function () {
                file = 'index';
                result = Helper._hasExtension(file);
                expect(result).to.equal(false);
                file = 'index.';
                result = Helper._hasExtension(file);
                expect(result).to.equal(false);
                file = '.index';
                result = Helper._hasExtension(file);
                expect(result).to.equal(false);
            });
        });
        describe('_removeTrailingDot', function () {
            it('return readme', function () {
                file = 'readme';
                result = Helper._removeTrailingDot(file);
                expect(result).to.equal(file);
            });
            it('return readme.md', function () {
                file = 'readme.md';
                result = Helper._removeTrailingDot(file);
                expect(result).to.equal(file);
            });
            it('return .readme', function () {
                file = '.readme';
                result = Helper._removeTrailingDot(file);
                expect(result).to.equal(file);
            });
            it('return empty string', function () {
                file = '';
                result = Helper._removeTrailingDot(file);
                expect(result).to.equal(file);
            });
            it('return readme', function () {
                file = 'readme.';
                result = Helper._removeTrailingDot(file);
                expect(result).to.equal('readme');
            });
        });
        describe('_isTrailingDot', function () {
            it('return true', function () {
                file = 'readme.';
                result = Helper._isTrailingDot(file);
                expect(result).to.equal(true);
            });
            it('return false', function () {
                file = '.readme';
                result = Helper._isTrailingDot(file);
                expect(result).to.equal(false);
                file = 'readme.md';
                result = Helper._isTrailingDot(file);
                expect(result).to.equal(false);
                file = 'readme.md';
                result = Helper._isTrailingDot(file);
                expect(result).to.equal(false);
            });

        });
        describe('_getExtension', function () {
            it('return .js', function () {
                file = 'index.js';
                result = Helper._getExtension(file);
                expect(result).to.equal('.js');
            });
            it('return .spec.js', function () {
                file = 'index.spec.js';
                result = Helper._getExtension(file);
                expect(result).to.equal('.spec.js');
            });
            it('return empty string', function () {
                file = '.gitignore';
                result = Helper._getExtension(file);
                expect(result).to.equal('');
                file = 'index';
                result = Helper._getExtension(file);
                expect(result).to.equal('');
            });
        });
        describe('_getOutputFile', function () {
            it('return src/toto.spec.js - add extension', function () {
                file = 'src/toto';
                template = 'mocha.spec.js';
                result = Helper._getOutputFile(file, template);
                expect(result).to.equal('src/toto.spec.js');
            });
            it('return src/.gitignore - dotfile no extension', function () {
                file = 'src/.gitignore';
                template = 'mocha.spec.js';
                result = Helper._getOutputFile(file, template);
                expect(result).to.equal('src/.gitignore');
            });
            it('return src/noextension - trailing dot, no extension', function () {
                file = 'src/noextension.';
                template = 'mocha.spec.js';
                result = Helper._getOutputFile(file, template);
                expect(result).to.equal('src/noextension');
            });
            it('return src/file.js - extesion already exists', function () {
                file = 'src/file.js';
                template = 'mocha.spec.js';
                result = Helper._getOutputFile(file, template);
                expect(result).to.equal('src/file.js');
            });
        });

    });

}());
