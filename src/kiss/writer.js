const fs = require('fs');
const path = require('path');

/*
const getextension = (filepath) => {
  const base = path.basename(filepath);
  const multidot = (base.match(new RegExp(/[.]/g)).length > 1);
  return !multidot ? path.extname(filepath) : base.substr(base.indexOf('.'));
};
*/

/**
*
* Main entry point function
*
*/
module.exports = {
  write: (template, file) => {
    const readable = fs.createReadStream(template);
    const writable = fs.createWriteStream(path.resolve(file));
    readable.pipe(writable);
  },
};
