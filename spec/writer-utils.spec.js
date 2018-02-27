const { expect } = require('chai');
const Helper = require('./../src/writer-utils');

let file = null;
let result = null;

describe('output-writer', () => {
  describe('isdotfile', () => {
    it('return true', () => {
      file = '.gitignore';
      result = Helper.isdotfile(file);
      expect(result).to.equal(true);
      file = 'relative/path.to/.gitignore';
      result = Helper.isdotfile(file);
      expect(result).to.equal(true);
    });

    it('return false', () => {
      file = 'readme';
      result = Helper.isdotfile(file);
      expect(result).to.equal(false);
      file = 'readme.';
      result = Helper.isdotfile(file);
      expect(result).to.equal(false);
      file = 'readme.md';
      result = Helper.isdotfile(file);
      expect(result).to.equal(false);
      file = 'relative/path.to/readme.md';
      result = Helper.isdotfile(file);
      expect(result).to.equal(false);
    });
  });

  describe('hasextension', () => {
    it('return true', () => {
      file = 'index.js';
      result = Helper.hasextension(file);
      expect(result).to.equal(true);
      file = 'index.spec.js';
      result = Helper.hasextension(file);
      expect(result).to.equal(true);
    });

    it('return false', () => {
      file = 'index';
      result = Helper.hasextension(file);
      expect(result).to.equal(false);
      file = 'index.';
      result = Helper.hasextension(file);
      expect(result).to.equal(false);
      file = '.index';
      result = Helper.hasextension(file);
      expect(result).to.equal(false);
    });
  });

  describe('removetrailingdot', () => {
    it('return readme', () => {
      file = 'readme';
      result = Helper.removetrailingdot(file);
      expect(result).to.equal(file);
    });

    it('return readme.md', () => {
      file = 'readme.md';
      result = Helper.removetrailingdot(file);
      expect(result).to.equal(file);
    });

    it('return .readme', () => {
      file = '.readme';
      result = Helper.removetrailingdot(file);
      expect(result).to.equal(file);
    });

    it('return empty string', () => {
      file = '';
      result = Helper.removetrailingdot(file);
      expect(result).to.equal(file);
    });

    it('return readme', () => {
      file = 'readme.';
      result = Helper.removetrailingdot(file);
      expect(result).to.equal('readme');
    });
  });

  describe('istrailingdot', () => {
    it('return true', () => {
      file = 'readme.';
      result = Helper.istrailingdot(file);
      expect(result).to.equal(true);
      file = 'relative/path/to/readme.';
      result = Helper.istrailingdot(file);
      expect(result).to.equal(true);
    });

    it('return false', () => {
      file = '.readme';
      result = Helper.istrailingdot(file);
      expect(result).to.equal(false);
      file = 'readme.md';
      result = Helper.istrailingdot(file);
      expect(result).to.equal(false);
      file = 'readme.md';
      result = Helper.istrailingdot(file);
      expect(result).to.equal(false);
      file = 'relative/path/to/readme.md';
      result = Helper.istrailingdot(file);
      expect(result).to.equal(false);
    });
  });

  describe('getextension', () => {
    it('return .js', () => {
      file = 'index.js';
      result = Helper.getextension(file);
      expect(result).to.equal('.js');
    });
    it('return .spec.js', () => {
      file = 'index.spec.js';
      result = Helper.getextension(file);
      expect(result).to.equal('.spec.js');
    });
    it('return empty string', () => {
      file = '.gitignore';
      result = Helper.getextension(file);
      expect(result).to.equal('');
      file = 'index';
      result = Helper.getextension(file);
      expect(result).to.equal('');
    });
  });
});
