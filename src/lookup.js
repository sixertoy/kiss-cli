/* global require, module, process */
(function () {
  let fs = require('fs'),
    path = require('path');

    /**
     *
     * Check if file/path exists
     *
     */
  function _exists(filepath) {
    try {
      return fs.statSync(filepath);
    } catch (err) {
      return false;
    }
  }

  /**
     *
     * Iterates parents directory to find a file/directory
     * By default look for 'package.json' file
     * Thath will give a root project directory
     *
     * @param {string} cwd - Directory to start lookup
     * @param {string} file/directory name - File to lookup
     *
     */
  module.exports = function (name, cwd) {
    cwd = cwd || process.cwd();
    name = name || 'package.json';
    let file,
      parts = path.resolve(cwd).split(path.sep);
    while (parts.length) {
      file = parts.join(path.sep) + path.sep;
      file = path.resolve(path.join(file, name));
      if (_exists(file)) {
        return file;
      }
      parts.pop();
    }
    return false;
  };
}());
