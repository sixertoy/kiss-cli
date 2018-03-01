const isfile = require('./isfile');
const { expect } = require('chai');

describe('isfile', () => {
  it('not a valid argument', () => {
    expect(isfile()).to.equal(false);
    expect(isfile('')).to.equal(false);
    expect(isfile([])).to.equal(false);
    expect(isfile({})).to.equal(false);
    expect(isfile(null)).to.equal(false);
    expect(isfile(false)).to.equal(false);
    expect(isfile(undefined)).to.equal(false);
  });
  it('not a valid filepath', () => {
    expect(isfile('')).to.equal(false);
    expect(isfile('.')).to.equal(false);
    expect(isfile('./')).to.equal(false);
    expect(isfile('toto')).to.equal(false);
    expect(isfile('.toto')).to.equal(false);
    expect(isfile('/toto')).to.equal(false);
    expect(isfile('/.toto')).to.equal(false);
  });
  it('valid filepath', () => {
    expect(isfile('./.env')).to.equal('./.env');
    expect(isfile('./Procfile')).to.equal('./Procfile');
    expect(isfile('./myfile.js')).to.equal('./myfile.js');
  });
});
