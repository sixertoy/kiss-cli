const path = require('path');

const getFileTypeByExtension = filepath => path.extname(filepath).slice(1);

module.exports = getFileTypeByExtension;
