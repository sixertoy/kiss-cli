/* global require, module */
const fs = require('fs');
const path = require('path');
// requires
const lookup = require('./core/lookup');
const fileexists = require('./core/fileexists');

const KISS_DIR = '.kiss';
const KISS_PATH = path.join(__dirname, '..');
const EXCLUDED = [
  // Windows
  'Thumbs.db',
  'ehthumbs.db',
  'Desktop.ini',
  // OSX
  '.DS_Store',
  '.AppleDouble',
  '.LSOverride',
  // Externals
  '.Spotlight-V100',
  '.Trashes',
];

function homeuser() {
  const { HOME, USERPROFILE } = process.env;
  return HOME || USERPROFILE;
}

const toobj = arr =>
  ({ [arr[1].split('.')[0]]: path.join.apply(null, arr) });


// Return an object
// Keys are file basename
// Will populate path for files
module.exports = () => [
  // iterates trough Kiss module templates
  path.join(KISS_PATH, KISS_DIR),
  // iterates through user home directory
  path.join(homeuser(), KISS_DIR),
  // iterates trough Current Working Directory templates
  lookup(KISS_DIR),
]
  // filter non existing paths
  .filter(fpath =>
    fileexists(fpath) && fpath)
  // get template files in directories
  .reduce((acc, fpath) => acc
    .concat(fs.readdirSync(fpath) // returns an array of filenames, exclude '.', '..'
      .map(file => [fpath, file])), [])
  // exlude system files
  .filter(arr =>
    (EXCLUDED.indexOf(arr[1]) > 0 ? false : arr))
  // transform filename to key
  // object value is file's fullpath
  .reduce((acc, arr) =>
    Object.assign({}, acc, toobj(arr)), {});
