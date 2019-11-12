const fs = require('fs');

// returns an array of filenames, excluding '.', '..'
const getTemplatesFilesInDirectory = (acc, fpath) =>
  acc.concat(fs.readdirSync(fpath).map(file => [fpath, file]));

module.exports = getTemplatesFilesInDirectory;
