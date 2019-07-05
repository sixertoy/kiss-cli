const path = require('path');
const fs = require('fs');

const noop = require('./core/noop');
const isfile = require('./core/isfile');
const home = require('./core/home');
const Colors = require('./core/colors');
const { warning } = require('./core/logger');
const Constants = require('./constants');
const isknowtype = require('./core/isknowtype');
const { exit, raw, success } = require('./helpers');
const {
  excludeNonExistingPath,
  excludeSystemsFiles,
  outputAvailableTypes,
  outputTemplateContent,
  removeEmptyLinesFromContent,
} = require('./domain');

const KISS_DIRNAME = '.kiss';
const KISS_ROOTPATH = path.join(__dirname, '..');

const templatesToObject = arr => {
  // transform an array of file paths to object
  // INPUT -> ['/User/home/.kiss/mytype.js', ...]
  // OUTPUT -> [{ mytype: { file: '/User/home/.kiss/mytype.js', ext: 'js'} }, ...]
  let key = arr[1].split('.')[0];
  key = key.indexOf('_') < 0 ? key : key.split('_')[1];
  const file = path.join.apply(null, arr);
  const fname = path.basename(file);
  // substr -> gitignore
  const ext = `${fname.substr(fname.indexOf('.'))}`;
  return { [key]: { ext, file } };
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
const lookupForProjectKissFolder = (currentWorkingDir = false) => {
  const resolvedPath = currentWorkingDir || process.cwd();
  const parts = resolvedPath.split(path.sep).filter(noop);
  let found = false;
  let len = parts.length;
  while (len) {
    const file = `${path.sep}${parts.join(path.sep)}${path.sep}.kiss`;
    found = fs.existsSync(file);
    if (found) return file;
    parts.pop();
    len -= 1;
  }
  return found;
};

// returns an array of filenames, excluding '.', '..'
const getTemplatesFilesInDirectory = (acc, fpath) =>
  acc.concat(fs.readdirSync(fpath).map(file => [fpath, file]));

const mapTemplatesFilesToTypes = (acc, arr) => {
  const obj = templatesToObject(arr);
  return Object.assign({}, acc, obj);
};

const kissRootDefinedTemplates = path.join(KISS_ROOTPATH, KISS_DIRNAME);
const userDefinedTemplates = path.join(home(), KISS_DIRNAME);

// returns an object
// { [template basename]: template path }
const getTemplates = currentWorkingDir =>
  [
    kissRootDefinedTemplates,
    userDefinedTemplates,
    // iterates trough Current Working Directory templates
    lookupForProjectKissFolder(currentWorkingDir),
  ]
    .filter(excludeNonExistingPath)
    .reduce(getTemplatesFilesInDirectory, [])
    .filter(excludeSystemsFiles)
    .reduce(mapTemplatesFilesToTypes, {});

module.exports = args => {
  const usedFromAtomExtension = args && args[1] === '--atom';

  // retrieve KISS templates files
  // -> ./.kiss -> ~/.kiss -> ~/.npm/.kiss
  const templates = getTemplates(usedFromAtomExtension && args[2]);

  // Check if first argument is a known type
  const isValidFile = isfile(args[0]);
  const isValidType = isknowtype(args[0], templates);

  /* ------- ATOM KISS CLI ------- */
  if (isValidType && usedFromAtomExtension) {
    const rawcontent = fs.readFileSync(templates[isValidType].file, 'utf8');
    raw(removeEmptyLinesFromContent(`${rawcontent}`));
  } else if (!isValidType && usedFromAtomExtension) {
    raw(
      removeEmptyLinesFromContent(
        `atom-kiss-cli: Unable to find template for type '${args[0]}'`
      )
    );
  }
  /* ------- ATOM KISS CLI ------- */

  const isNotValidFileOrType = !isValidType && !isValidFile;
  if (isNotValidFileOrType) outputAvailableTypes(templates);

  const noSecondArgument = isValidType && !args[1];
  if (noSecondArgument) outputTemplateContent(args, templates);

  // Get all files
  let files = args.slice(isValidType ? 1 : 0).map(filepath => {
    if (!isfile(filepath)) {
      return warning(`Invalid file ${Colors.bold(filepath)}\n`);
    }

    const type = isValidType || path.extname(filepath).substr(1);
    if (!templates[type]) {
      return warning(`Invalid type for file ${Colors.bold(filepath)}\n`);
    }

    let file = filepath;
    if (!isValidType) {
      file = filepath.replace(`.${type}`, templates[type].ext);
    }

    const dirname = `${path.sep}${path.relative('/', path.dirname(filepath))}`;
    if (!fs.existsSync(dirname)) mkdirp(dirname);
    else if (!fs.statSync(dirname).isDirectory()) {
      // if path exists and is not a directory
      // FIXME -> use prompt to ask for override yes/no
      return warning(`File already exists ${Colors.bold(dirname)}\n`);
    }
    return { file, type };
  });

  if (!files.length) {
    // If there's no valid files starting at second argument
    outputAvailableTypes(templates);
  }

  // filtering files with warning
  files = files.filter(noop);
  if (!files.length) return args;
  // Write templates
  const group = files.reduce(
    (acc, obj) =>
      Object.assign({}, acc, {
        [obj.type]: [obj.file].concat(acc[obj.type] || []),
      }),
    {}
  );
  Promise.all(
    Object.keys(group).map(
      key =>
        new Promise(resolve => {
          // FIXME promises should be returned when all writeStream ends
          // Not when readableStream's end
          const writables = group[key].map(file =>
            fs.createWriteStream(path.resolve(file))
          );
          const readable = fs.createReadStream(templates[key].file);
          readable.on('end', () => resolve(group[key]));
          readable.on('data', data => writables.map(w => w.write(data)));
        })
    )
  )
    .then((...written) =>
      success(
        `Success ${written
          .toString()
          .split(',')
          .map(file => `\n${Constants.INDENT}${path.relative('/', file)}`)}`
      )
    )
    .catch(e => exit(e));
  return args;
};
