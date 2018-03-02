/* eslint no-console: 0, max-nested-callbacks: 0 */
// define `mocha` env/globals (describe, it, beforeEach...) into eslint config file
// @see https://eslint.org/docs/user-guide/configuring#specifying-parser-options
const cwd = process.cwd();
const path = require('path');
const { expect } = require('chai');
const myhelper = require(path.join(cwd));

describe('myhelper', function() {

  beforeEach(function() {});

  afterEach(function() {});

  describe('myhelper.method()', function() {
    it('it expect something', function() {
      expect(function() {
        myhelper.render();
      }).to.throw();
    });
  });
});
