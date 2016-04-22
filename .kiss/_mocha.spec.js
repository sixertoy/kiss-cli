/* global __dirname, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {

    'use strict';

    var result,
        cwd = process.cwd(),
        path = require('path'),
        expect = require('chai').expect,
        helper = require(path.join(cwd));

    describe('helper', function () {

        beforeEach(function () {});
        afterEach(function () {});

        describe('Method', function () {

            it('Expect something', function () {
                expect(function () {
                    result = helper.render();
                }).to.throw();
            });

        });

    });

}());
