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
    expect(isknowtype('', ALLOWED)).to.equal(false);
    expect(isknowtype([], ALLOWED)).to.equal(false);
    expect(isknowtype({}, ALLOWED)).to.equal(false);
    expect(isknowtype(null, ALLOWED)).to.equal(false);
    expect(isknowtype(false, ALLOWED)).to.equal(false);
    expect(isknowtype(undefined, ALLOWED)).to.equal(false);
    expect(isknowtype('      ', ALLOWED)).to.equal(false);
    expect(isknowtype(''), ALLOWED).to.equal(false);
    expect(isknowtype('toto', ALLOWED)).to.equal(false);
    expect(isknowtype('html', ALLOWED)).to.equal(false);
  });
  it('valid type', () => {
    expect(isknowtype('js', ALLOWED)).to.equal('js');
  });
});
