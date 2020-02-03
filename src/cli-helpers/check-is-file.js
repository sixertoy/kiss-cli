const path = require('path');

const isDot = str => {
  const base = path.basename(str);
  return base === '.' || base === '..';
};

const checkIsFile = file => {
  const isvalid =
    file && typeof file === 'string' && file.trim() !== '' && !isDot(file);
  if (!isvalid) return false;
  return file;
};

module.exports = checkIsFile;
