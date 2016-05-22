/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var file, result, helper, template, ext,
        cwd = process.cwd(),
        path = require('path'),
        expect = require('chai').expect,
        Helper = require(path.join(cwd, 'src', 'writer-utils'));

    describe('output-writer', function () {
        describe('isdotfile', function () {
            it('return true', function () {
                file = '.gitignore';
                result = Helper.isdotfile(file);
                expect(result).to.equal(true);
                file = 'relative/path.to/.gitignore';
                result = Helper.isdotfile(file);
                expect(result).to.equal(true);
            });
            it('return false', function () {
                file = 'readme';
                result = Helper.isdotfile(file);
                expect(result).to.equal(false);
                file = 'readme.';
                result = Helper.isdotfile(file);
                expect(result).to.equal(false);
                file = 'readme.md';
                result = Helper.isdotfile(file);
                expect(result).to.equal(false);
                file = 'relative/path.to/readme.md';
                result = Helper.isdotfile(file);
                expect(result).to.equal(false);
            });
        });

        describe('hasextension', function () {
            it('return true', function () {
                file = 'index.js';
                result = Helper.hasextension(file);
                expect(result).to.equal(true);
                file = 'index.spec.js';
                result = Helper.hasextension(file);
                expect(result).to.equal(true);
            });
            it('return false', function () {
                file = 'index';
                result = Helper.hasextension(file);
                expect(result).to.equal(false);
                file = 'index.';
                result = Helper.hasextension(file);
                expect(result).to.equal(false);
                file = '.index';
                result = Helper.hasextension(file);
                expect(result).to.equal(false);
            });
        });
        describe('removetrailingdot', function () {
            it('return readme', function () {
                file = 'readme';
                result = Helper.removetrailingdot(file);
                expect(result).to.equal(file);
            });
            it('return readme.md', function () {
                file = 'readme.md';
                result = Helper.removetrailingdot(file);
                expect(result).to.equal(file);
            });
            it('return .readme', function () {
                file = '.readme';
                result = Helper.removetrailingdot(file);
                expect(result).to.equal(file);
            });
            it('return empty string', function () {
                file = '';
                result = Helper.removetrailingdot(file);
                expect(result).to.equal(file);
            });
            it('return readme', function () {
                file = 'readme.';
                result = Helper.removetrailingdot(file);
                expect(result).to.equal('readme');
            });
        });
        describe('istrailingdot', function () {
            it('return true', function () {
                file = 'readme.';
                result = Helper.istrailingdot(file);
                expect(result).to.equal(true);
                file = 'relative/path/to/readme.';
                result = Helper.istrailingdot(file);
                expect(result).to.equal(true);
            });
            it('return false', function () {
                file = '.readme';
                result = Helper.istrailingdot(file);
                expect(result).to.equal(false);
                file = 'readme.md';
                result = Helper.istrailingdot(file);
                expect(result).to.equal(false);
                file = 'readme.md';
                result = Helper.istrailingdot(file);
                expect(result).to.equal(false);
                file = 'relative/path/to/readme.md';
                result = Helper.istrailingdot(file);
                expect(result).to.equal(false);
            });

        });
        describe('getextension', function () {
            it('return .js', function () {
                file = 'index.js';
                result = Helper.getextension(file);
                expect(result).to.equal('.js');
            });
            it('return .spec.js', function () {
                file = 'index.spec.js';
                result = Helper.getextension(file);
                expect(result).to.equal('.spec.js');
            });
            it('return empty string', function () {
                file = '.gitignore';
                result = Helper.getextension(file);
                expect(result).to.equal('');
                file = 'index';
                result = Helper.getextension(file);
                expect(result).to.equal('');
            });
        });

    });

}());
