/* global process, require, describe, it, beforeEach, afterEach */
(function () {

    'use strict';

    var result, ext, file,
        cwd = process.cwd(),
        path = require('path'),
        expect = require('chai').expect,
        Helper = require(path.join(cwd, 'src', 'writer')).writer;

    describe('writer', function () {

        beforeEach(function () {});
        afterEach(function () {});

        describe('_getoutputfile', function () {
            it('return src/toto.spec.js - add extension', function () {
                ext = '.spec.js';
                file = 'src/toto';
                result = Helper._getoutputfile(file, ext);
                expect(result).to.equal('src/toto.spec.js');
            });
            it('return src/.gitignore - dotfile no extension', function () {
                ext = '.spec.js';
                file = 'src/.gitignore';
                result = Helper._getoutputfile(file, ext);
                expect(result).to.equal('src/.gitignore');
            });
            it('return src/noextension - trailing dot, no extension', function () {
                ext = '.spec.js';
                file = 'src/noextension.';
                result = Helper._getoutputfile(file, ext);
                expect(result).to.equal('src/noextension');
            });
            it('return src/file.js - extesion already exists', function () {
                ext = '.spec.js';
                file = 'src/file.js';
                result = Helper._getoutputfile(file, ext);
                expect(result).to.equal('src/file.js');
            });
        });

    });

}());
