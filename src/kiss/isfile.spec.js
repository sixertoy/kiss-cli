const isfile = require('./isfile');
const { expect } = require('chai');

describe('isfile', () => {
  it('no arguments', () => {
    expect(isfile()).to.equal(false);
    expect(isfile('')).to.equal(false);
    expect(isfile([])).to.equal(false);
    expect(isfile({})).to.equal(false);
    expect(isfile(null)).to.equal(false);
    expect(isfile(false)).to.equal(false);
    expect(isfile(undefined)).to.equal(false);
  });
  it('not a valid argument', () => {
    expect(isfile(['<not_tested>'])).to.equal(false);
    expect(isfile(['<not_tested>', ''])).to.equal(false);
    expect(isfile(['<not_tested>', null])).to.equal(false);
    expect(isfile(['<not_tested>', false])).to.equal(false);
    expect(isfile(['<not_tested>', '      '])).to.equal(false);
    expect(isfile(['<not_tested>', undefined])).to.equal(false);
  });
  it('not a valid filepath', () => {
    expect(isfile(['<not_tested>', ''])).to.equal(false);
    expect(isfile(['<not_tested>', '.'])).to.equal(false);
    expect(isfile(['<not_tested>', './'])).to.equal(false);
    expect(isfile(['<not_tested>', 'toto'])).to.equal(false);
    expect(isfile(['<not_tested>', '.toto'])).to.equal(false);
    expect(isfile(['<not_tested>', '/toto'])).to.equal(false);
    expect(isfile(['<not_tested>', '/.toto'])).to.equal(false);
  });
  it('valid filepath', () => {
    expect(isfile(['<not_tested>', './.env'])).to.equal('./.env');
    expect(isfile(['<not_tested>', './Procfile'])).to.equal('./Procfile');
    expect(isfile(['<not_tested>', './myfile.js'])).to.equal('./myfile.js');
  });
});
