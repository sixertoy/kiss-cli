const fs = require('fs');
const path = require('path');
const isfile = require('./core/isfile');
const Colors = require('./core/colors');
const { warning } = require('./core/logger');
const Constants = require('./core/constants');
const { help, success } = require('./program');
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

const homeuser = () => {
  const { HOME, USERPROFILE } = process.env;
  return HOME || USERPROFILE;
};

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
const gettemplates = () => [
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

const write = (template, files) => new Promise((resolve) => {
  // FIXME promises should be returned at all writeStream ends
  // Not at readableStream's end
  const writables = files.map(file =>
    fs.createWriteStream(path.resolve(file)));
  const readable = fs.createReadStream(template);
  readable.on('end', resolve);
  readable.on('data', data => writables.map(w => w.write(data)));
});

// output all available template types and paths in console
const printTypes = types => `
${Colors.bold('Available Templates:')}
${Object.keys(types).map((key) => {
    const k = key.indexOf('_') < 0 ? key : key.split('_')[1];
    return `${Constants.INDENT}${Colors.green(k)}: ${Colors.grey(types[key])}\n`;
  }).join('')}`;

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
  const validfile = isfile(args[0]);
  const validtype = isknowtype(args[0], templates);
  // Output available templates
  if (!validtype && !validfile) help(printTypes(templates), 'Invalid type');
  // Output template content and exit
  // If there's no second argument defined
  if (validtype && !args[1]) help(printTemplate(args, templates));

  // Get all files
  const files = args.slice(validtype ? 1 : 0).filter((file) => {
    const valid = isfile(file);
    if (!valid) {
      warning(`Invalid file ${Colors.bold(file)}\n`);
      return false;
    }
    return valid;
  });

  // Output help with available template if invalid file
  // If there's no valid files starting at second argument
  if (!files.length) help(printTypes(templates), 'Invalid file');
  else {
    // Write templates
    write(templates[validtype], files)
      .then(() => success(`Success ${files} written`));
  }
  return args;
};
