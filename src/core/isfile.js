const path = require('path');

module.exports = file =>
  (file &&
    typeof file === 'string' &&
    file.trim().length > 2 &&
    file.indexOf('.') === 0 &&
    file.indexOf(path.sep) === 1 &&
    file) ||
  false; // only if is a filepath
