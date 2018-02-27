const path = require('path');
const fileexists = require('./fileexists');

// Iterates parents directory to find a file/directory
// By default look for 'package.json' file
// That will give a root project directory
module.exports = (filename) => {
  let file = null;
  const resolved = path.resolve(process.cwd());
  const parts = resolved.split(path.sep);
  let len = parts.length;
  while (len) {
    file = `${parts.join(path.sep)}${path.sep}`;
    file = path.resolve(`${file}${(filename || 'package.json')}`);
    if (fileexists(file)) return file;
    parts.pop();
    len -= 1;
  }
  return false;
};
