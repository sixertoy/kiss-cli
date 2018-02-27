const fs = require('fs');

module.exports = (filepath) => {
  try {
    return fs.statSync(filepath);
  } catch (err) {
    return false;
  }
};
