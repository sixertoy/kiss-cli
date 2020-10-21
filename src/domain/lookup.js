const fs = require('fs');
const path = require('path');

const { KISS_DIRNAME } = require('../constants');

function lookup(search = false) {
  const parts = (search && search.split(path.sep).filter(v => v)) || [];
  let found = false;
  let len = parts.length;
  while (len) {
    const base = `${path.sep}${parts.join(path.sep)}${path.sep}`;
    const file = `${base}${KISS_DIRNAME}`;
    found = fs.existsSync(file);
    if (found) return file;
    parts.pop();
    len -= 1;
  }
  return found;
}

module.exports = lookup;
