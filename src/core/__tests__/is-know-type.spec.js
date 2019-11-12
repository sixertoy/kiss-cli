const isKnowType = require('./../is-know-type');

const ALLOWED = {
  js: '',
  scss: '',
  // any from user defined .kiss folder
};

describe('isKnowType', () => {
  it('not a valid argument', () => {
    expect(isKnowType()).to.equal(false);
    expect(isKnowType('', ALLOWED)).to.equal(false);
    expect(isKnowType([], ALLOWED)).to.equal(false);
    expect(isKnowType({}, ALLOWED)).to.equal(false);
    expect(isKnowType(null, ALLOWED)).to.equal(false);
    expect(isKnowType(false, ALLOWED)).to.equal(false);
    expect(isKnowType(undefined, ALLOWED)).to.equal(false);
    expect(isKnowType('      ', ALLOWED)).to.equal(false);
    expect(isKnowType(''), ALLOWED).to.equal(false);
    expect(isKnowType('toto', ALLOWED)).to.equal(false);
    expect(isKnowType('html', ALLOWED)).to.equal(false);
  });
  it('valid type', () => {
    expect(isKnowType('js', ALLOWED)).to.equal('js');
  });
});
