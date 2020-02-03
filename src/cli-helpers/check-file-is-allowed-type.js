const getFileTypeByExtension = require('./get-file-type-by-extension');

const checkFileIsAllowedType = (file, types) => {
  const extension = getFileTypeByExtension(file);
  const keys = Object.keys(types);
  return keys.includes(extension);
};

module.exports = checkFileIsAllowedType;
