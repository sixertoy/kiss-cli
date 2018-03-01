const { expect } = require('chai');
const isknowtype = require('./isknowtype');

const ALLOWED = {
  js: '',
  scss: '',
  // any from user defined .kiss folder
};

describe('isknowtype', () => {
  it('no arguments', () => {
    expect(isknowtype()).to.equal(false);
    expect(isknowtype('')).to.equal(false);
    expect(isknowtype([])).to.equal(false);
    expect(isknowtype({})).to.equal(false);
    expect(isknowtype(null)).to.equal(false);
    expect(isknowtype(false)).to.equal(false);
    expect(isknowtype(undefined)).to.equal(false);
  });
  it('not a valid argument', () => {
    expect(isknowtype([null])).to.equal(false);
    expect(isknowtype([false])).to.equal(false);
    expect(isknowtype([undefined])).to.equal(false);
    expect(isknowtype(['      '])).to.equal(false);
    expect(isknowtype([''])).to.equal(false);
    expect(isknowtype(['toto'], ALLOWED)).to.equal(false);
    expect(isknowtype(['html', '<not_allowed>'], ALLOWED)).to.equal(false);
  });
  it('valid filepath', () => {
    expect(isknowtype(['js'], ALLOWED)).to.equal('js');
  });
});
