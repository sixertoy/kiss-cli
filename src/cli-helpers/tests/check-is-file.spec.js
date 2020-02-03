const path = require('path');

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
    expect(checkIsFile('../')).toEqual(false);
    expect(checkIsFile('../../')).toEqual(false);
  });

  describe('valid filepath', () => {
    it('with .env file', () => {
      const file = './fixtures/.env';
      const filepath = path.join(__dirname, file);
      expect(checkIsFile(filepath)).toEqual(filepath);
    });

    it('with Procfile file', () => {
      const file = './fixtures/Procfile';
      const filepath = path.join(__dirname, file);
      expect(checkIsFile(filepath)).toEqual(filepath);
    });

    it('with myfile.js file', () => {
      const file = './fixtures/myfile.js';
      const filepath = path.join(__dirname, file);
      expect(checkIsFile(filepath)).toEqual(filepath);
    });
  });
});
