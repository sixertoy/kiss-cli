const { expect } = require('chai');

const isknowtype = require('./isknowtype');

const ALLOWED = {
  js: '',
  scss: '',
  // any from user defined .kiss folder
};

describe('isknowtype', () => {
  it('not a valid argument', () => {
    expect(isknowtype()).to.equal(false);
    expect(isknowtype('')).to.equal(false);
    expect(isknowtype([])).to.equal(false);
    expect(isknowtype({})).to.equal(false);
    expect(isknowtype(null)).to.equal(false);
    expect(isknowtype(false)).to.equal(false);
    expect(isknowtype(undefined)).to.equal(false);
    expect(isknowtype('      ')).to.equal(false);
    expect(isknowtype('')).to.equal(false);
    expect(isknowtype('toto')).to.equal(false);
    expect(isknowtype('html')).to.equal(false);
  });
  it('valid type', () => {
    expect(isknowtype('js', ALLOWED)).to.equal('js');
  });
});
