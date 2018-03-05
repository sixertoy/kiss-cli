const fs = require('fs');
const path = require('path');
const isfile = require('./core/isfile');
const Colors = require('./core/colors');
const { warning } = require('./core/logger');
const Constants = require('./core/constants');
const isknowtype = require('./core/isknowtype');
const {
  help, raw, success, exit,
} = require('./program');

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

// transform an array of file paths to object
// INPUT -> ['/User/home/.kiss/mytype.js', ...]
// OUTPUT -> [{ mytype: { file: '/User/home/.kiss/mytype.js', ext: 'js'} }, ...]
const templatestoobj = (arr) => {
  let key = arr[1].split('.')[0];
  key = key.indexOf('_') < 0 ? key : key.split('_')[1];
  const file = path.join.apply(null, arr);
  const fname = path.basename(file);
  // substr -> gitignore
  const ext = `${fname.substr(fname.indexOf('.'))}`;
  return { [key]: { file, ext } };
};

// create nested directory if not exists
const mkdirp = (fullpath, rootpath = process.cwd()) => {
  const relative = path.relative(rootpath, fullpath);
  if (rootpath === fullpath) return false;
  const splitted = relative.split(path.sep);
  const directory = path.join(rootpath, splitted.shift());
  try {
    if (!fs.existsSync(directory)) fs.mkdirSync(directory);
    return mkdirp(fullpath, directory);
  } catch (e) {
    // FIXME real error catcher
    throw new Error(e);
  }
};

// Iterates parents directory to find a file/directory
// That will gives a root project directory
const lookup = (search) => {
  const resolved = path.resolve(process.cwd());
  const parts = resolved.split(path.sep).filter(v => v);
  let found = false;
  let len = parts.length;
  while (len && !found) {
    const file = path.resolve(`${resolved}${path.sep}${search}`);
    found = fs.existsSync(file);
    parts.pop();
    len -= 1;
  }
  return false;
};

// returns an object
// keys are template basename
// and template paths
const gettemplates = () =>
  [
    // iterates trough Kiss module templates
    path.join(KISS_PATH, KISS_DIR),
    // iterates through user home directory
    path.join(homeuser(), KISS_DIR),
    // iterates trough Current Working Directory templates
    lookup(KISS_DIR),
  ]
    // filter non existing paths
    .filter(fpath => fs.existsSync(fpath) && fpath)
    // get template files in directories
    .reduce(
      (acc, fpath) =>
        acc
          // returns an array of filenames, excluding '.', '..'
          .concat(fs.readdirSync(fpath).map(file => [fpath, file])),
      [],
    )
    // exlude system files
    .filter(arr => (EXCLUDED_FILES.indexOf(arr[1]) > 0 ? false : arr))
    // transform filename to key
    // object value is file's fullpath
    .reduce((acc, arr) => Object.assign({}, acc, templatestoobj(arr)), {});

// output all available template types and paths in console
const printTypes = types => `
${Colors.bold('Available Templates:')}
${Object.keys(types)
    .map((key) => {
      const k = key.indexOf('_') < 0 ? key : key.split('_')[1];
      return `${Constants.INDENT}${Colors.green(k)}: ${Colors.grey(types[key].file)}\n`;
    })
    .join('')}`;

const nolinebreaks = str =>
  str
    .split('\n')
    .filter(l => l)
    .join('\n');

// output a template content in console
const printTemplate = (filetype, types) => `
${Colors.bold('Template content:')}
${Colors.green(types[filetype])}
${Colors.grey(nolinebreaks(fs.readFileSync(types[filetype].file, 'utf8')))}\
`;

module.exports = (args) => {
  // retrieve KISS templates files
  // -> ./.kiss -> ~/.kiss -> ~/.npm/.kiss
  const templates = gettemplates();

  // Check if first argument is a known type
  const validfile = isfile(args[0]);
  const validtype = isknowtype(args[0], templates);

  if (validtype && (args[1] && args[1] === '--atom')) {
    const rawcontent = fs.readFileSync(templates[validtype].file, 'utf8');
    raw(nolinebreaks(rawcontent));
  }

  // Output available templates
  if (!validtype && !validfile) help(printTypes(templates), 'Invalid type');
  // Output template content and exit
  // If there's no second argument defined
  if (validtype && !args[1]) help(printTemplate(args, templates));

  // Get all files
  let files = args.slice(validtype ? 1 : 0).map((filepath) => {
    if (!isfile(filepath)) {
      return warning(`Invalid file ${Colors.bold(filepath)}\n`);
    }
    const type = validtype || path.extname(filepath).substr(1);
    if (!templates[type]) {
      return warning(`Invalid type for file ${Colors.bold(filepath)}\n`);
    }
    const file = validtype ? filepath : filepath.replace(`.${type}`, templates[type].ext);
    const dirname = `${path.sep}${path.relative('/', path.dirname(filepath))}`;
    if (!fs.existsSync(dirname)) mkdirp(dirname);
    else if (!fs.statSync(dirname).isDirectory()) {
      // if path exists and is not a directory
      // FIXME -> use prompt to ask for override yes/no
      return warning(`File already exists ${Colors.bold(dirname)}\n`);
    }
    return { type, file };
  });

  // Output help with available template if invalid file
  // If there's no valid files starting at second argument
  if (!files.length) help(printTypes(templates), 'Invalid file');

  // filtering files with warning
  files = files.filter(f => f);
  if (!files.length) return args;
  // Write templates
  const group = files.reduce(
    (acc, obj) =>
      Object.assign({}, acc, {
        [obj.type]: [obj.file].concat(acc[obj.type] || []),
      }),
    {},
  );
  Promise.all(Object.keys(group).map(key =>
    new Promise((resolve) => {
      // FIXME promises should be returned when all writeStream ends
      // Not when readableStream's end
      const writables = group[key].map(file => fs.createWriteStream(path.resolve(file)));
      const readable = fs.createReadStream(templates[key].file);
      readable.on('end', () => resolve(group[key]));
      readable.on('data', data => writables.map(w => w.write(data)));
    })))
    .then((...written) =>
      success(`Success ${written
        .toString()
        .split(',')
        .map(file => `\n${Constants.INDENT}${path.relative('/', file)}`)}`))
    .catch(e => exit(e));
  return args;
};
