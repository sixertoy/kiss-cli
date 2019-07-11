const fs = require('fs');

const excluseNonExistingPath = fpath => fs.existsSync(fpath) && fpath;

module.exports = excluseNonExistingPath;
