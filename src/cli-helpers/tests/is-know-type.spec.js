const isKnowType = require('./../is-know-type');

const ALLOWED = {
  js: '',
  scss: '',
  // any from user defined .kiss folder
};

describe('isKnowType', () => {
  it('not a valid argument', () => {
    expect(isKnowType()).toEqual(false);
    expect(isKnowType('', ALLOWED)).toEqual(false);
    expect(isKnowType([], ALLOWED)).toEqual(false);
    expect(isKnowType({}, ALLOWED)).toEqual(false);
    expect(isKnowType(null, ALLOWED)).toEqual(false);
    expect(isKnowType(false, ALLOWED)).toEqual(false);
    expect(isKnowType(undefined, ALLOWED)).toEqual(false);
    expect(isKnowType('      ', ALLOWED)).toEqual(false);
    expect(isKnowType('', ALLOWED)).toEqual(false);
    expect(isKnowType('toto', ALLOWED)).toEqual(false);
    expect(isKnowType('html', ALLOWED)).toEqual(false);
  });
  it('valid type', () => {
    expect(isKnowType('js', ALLOWED)).toEqual('js');
  });
});
