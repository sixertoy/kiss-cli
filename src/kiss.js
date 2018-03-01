const fs = require('fs');
const path = require('path');
const { help } = require('./program');
const isfile = require('./core/isfile');
const Colors = require('./core/colors');
const Constants = require('./core/constants');
const isknowtype = require('./core/isknowtype');

const KISS_DIR = '.kiss';
const KISS_PATH = path.join(__dirname, '..');
const EXCLUDED_FILES = [
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

const fileexists = (filepath) => {
  try {
    return fs.statSync(filepath);
  } catch (err) {
    return false;
  }
};

// Iterates parents directory to find a file/directory
// By default look for 'package.json' file
// That will give a root project directory
const lookup = (filename) => {
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

// returns an object
// keys are template basename
// and template paths
const gettemplates = () => () => [
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
    // returns an array of filenames, excluding '.', '..'
    .concat(fs.readdirSync(fpath).map(file => [fpath, file])), [])
  // exlude system files
  .filter(arr =>
    (EXCLUDED_FILES.indexOf(arr[1]) > 0 ? false : arr))
  // transform filename to key
  // object value is file's fullpath
  .reduce((acc, arr) =>
    Object.assign({}, acc, toobj(arr)), {});

const write = (template, file) => {
  const readable = fs.createReadStream(template);
  const writable = fs.createWriteStream(path.resolve(file));
  readable.pipe(writable);
};

// output all available template types and paths in console
const printTypes = types => `
${Colors.bold('Available Templates:')}
${Object.keys(types).map(key => `\
${Constants.INDENT}${Colors.green(key)}: ${Colors.grey(types[key])}
`).join('')}
`;

// output a template content in console
const printTemplate = (filetype, types) => `
${Colors.bold('Template content:')}
${Colors.green(types[filetype])}
${Colors.grey(fs.readFileSync(types[filetype], 'utf8'))}\
`;

module.exports = (args) => {
  // retrieve KISS templates files
  // -> ./.kiss -> ~/.kiss -> ~/.npm/.kiss
  const templates = gettemplates();

  // Check if first argument is a known type
  const validtype = isknowtype(args, templates);

  // Check if second argument is a file
  const validfile = isfile(args);

  // Output available templates
  if (!validtype) help(printTypes(templates), 'Invalid type');
  // Output template content and exit
  if (validtype && !validfile) help(printTemplate(args[0], templates));
  // Write templates
  if (validtype && validfile) write(templates[validtype], validfile);
  return args;
};
