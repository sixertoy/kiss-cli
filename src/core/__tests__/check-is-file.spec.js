const checkIsFile = require('./../check-is-file');

describe('checkIsFile', () => {
  it('not a valid argument', () => {
    expect(checkIsFile()).to.equal(false);
    expect(checkIsFile('')).to.equal(false);
    expect(checkIsFile([])).to.equal(false);
    expect(checkIsFile({})).to.equal(false);
    expect(checkIsFile(null)).to.equal(false);
    expect(checkIsFile(false)).to.equal(false);
    expect(checkIsFile(undefined)).to.equal(false);
  });
  it('not a valid filepath', () => {
    expect(checkIsFile('')).to.equal(false);
    expect(checkIsFile('.')).to.equal(false);
    expect(checkIsFile('./')).to.equal(false);
    expect(checkIsFile('toto')).to.equal(false);
    expect(checkIsFile('.toto')).to.equal(false);
    expect(checkIsFile('/toto')).to.equal(false);
    expect(checkIsFile('/.toto')).to.equal(false);
  });
  it('valid filepath', () => {
    expect(checkIsFile('./.env')).to.equal('./.env');
    expect(checkIsFile('./Procfile')).to.equal('./Procfile');
    expect(checkIsFile('./myfile.js')).to.equal('./myfile.js');
  });
});
