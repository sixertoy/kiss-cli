const checkIsFile = require('./../check-is-file');

describe('checkIsFile', () => {
  it('not a valid argument', () => {
    expect(checkIsFile()).toEqual(false);
    expect(checkIsFile('')).toEqual(false);
    expect(checkIsFile([])).toEqual(false);
    expect(checkIsFile({})).toEqual(false);
    expect(checkIsFile(null)).toEqual(false);
    expect(checkIsFile(false)).toEqual(false);
    expect(checkIsFile(undefined)).toEqual(false);
  });
  it('not a valid filepath', () => {
    expect(checkIsFile('')).toEqual(false);
    expect(checkIsFile('.')).toEqual(false);
    expect(checkIsFile('./')).toEqual(false);
    expect(checkIsFile('toto')).toEqual(false);
    expect(checkIsFile('.toto')).toEqual(false);
    expect(checkIsFile('/toto')).toEqual(false);
    expect(checkIsFile('/.toto')).toEqual(false);
  });
  it('valid filepath', () => {
    expect(checkIsFile('./.env')).toEqual('./.env');
    expect(checkIsFile('./Procfile')).toEqual('./Procfile');
    expect(checkIsFile('./myfile.js')).toEqual('./myfile.js');
  });
});
