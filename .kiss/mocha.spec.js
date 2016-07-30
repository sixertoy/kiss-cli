/* eslint no-console: 0, max-nested-callbacks: 0 */
/* global process, require,describe, it, beforeEach, afterEach */
(function() {

    'use strict';

    var result,
        cwd = process.cwd(),
        path = require('path'),
        expect = require('chai').expect,
        helper = require(path.join(cwd));

    describe('helper', function() {

        beforeEach(function() {});
        afterEach(function() {});

        describe('Method', function() {

            it('Expect something', function() {
                expect(function() {
                    result = helper.render();
                }).to.throw();
            });

        });

    });

}());
