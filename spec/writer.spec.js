const { expect } = require('chai');
const { writer } = require('./../src/writer');

let ext = null;
let file = null;
let result = null;

describe('Writer', () => {
  describe('getoutputfile', () => {
    it('return src/toto.spec.js - add extension', () => {
      ext = '.spec.js';
      file = 'src/toto';
      result = writer.getoutputfile(file, ext);
      expect(result).to.equal('src/toto.spec.js');
    });

    it('return src/.gitignore - dotfile no extension', () => {
      ext = '.spec.js';
      file = 'src/.gitignore';
      result = writer.getoutputfile(file, ext);
      expect(result).to.equal('src/.gitignore');
    });

    it('return src/noextension - trailing dot, no extension', () => {
      ext = '.spec.js';
      file = 'src/noextension.';
      result = writer.getoutputfile(file, ext);
      expect(result).to.equal('src/noextension');
    });

    it('return src/file.js - extesion already exists', () => {
      ext = '.spec.js';
      file = 'src/file.js';
      result = writer.getoutputfile(file, ext);
      expect(result).to.equal('src/file.js');
    });
  });
});
