const path = require('path');
const fs = require('fs');

const Constants = require('./constants');
const { colors, home, isfile, isknowtype, noop, warning } = require('./core');
const {
  excludeNonExistingPath,
  excludeSystemsFiles,
  outputAvailableTemplates,
  outputTemplateContent,
  removeEmptyLinesFromContent,
  templatesToObject,
} = require('./domain');
const { exit, raw, success } = require('./helpers');

const KISS_DIRNAME = '.kiss';
const KISS_ROOTPATH = path.join(__dirname, '..');

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
const lookupForProjectKissFolder = currentWorkingDir => {
  const parts = currentWorkingDir.split(path.sep).filter(noop);
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

const userDefinedTemplates = path.join(home(), KISS_DIRNAME);
const kissRootDefinedTemplates = path.join(KISS_ROOTPATH, KISS_DIRNAME);

// returns an object
// { [template basename]: template path }
const getTemplates = currentWorkingDir => {
  const kissDirectories = [
    kissRootDefinedTemplates,
    userDefinedTemplates,
    lookupForProjectKissFolder(currentWorkingDir),
  ];
  // retrieve KISS templates files
  // -> ./.kiss -> ~/.kiss -> ~/.npm/.kiss
  return kissDirectories
    .filter(excludeNonExistingPath)
    .reduce(getTemplatesFilesInDirectory, [])
    .filter(excludeSystemsFiles)
    .reduce(mapTemplatesFilesToTypes, {});
};

/* --------------------------------------------------------------------


 RUNNERS


-------------------------------------------------------------------- */

const runForTerminal = (args, templates, isValidType, isValidFile) => {
  const isNotValidFileOrType = !isValidType && !isValidFile;
  if (isNotValidFileOrType) outputAvailableTemplates(templates);

  const noSecondArgument = isValidType && !args[1];
  if (noSecondArgument) outputTemplateContent(args, templates);

  // Get all files
  let files = args.slice(isValidType ? 1 : 0).map(filepath => {
    if (!isfile(filepath)) {
      return warning(`Invalid file ${colors.bold(filepath)}\n`);
    }

    const type = isValidType || path.extname(filepath).substr(1);
    if (!templates[type]) {
      return warning(`Invalid type for file ${colors.bold(filepath)}\n`);
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
      return warning(`File already exists ${colors.bold(dirname)}\n`);
    }
    return { file, type };
  });

  // If there's no valid files starting at second argument
  if (!files.length) {
    return outputAvailableTemplates(templates);
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

const outputAtomTemplate = (type, templates) => {
  const rawcontent = fs.readFileSync(templates[type].file, 'utf8');
  raw(removeEmptyLinesFromContent(`${rawcontent}`));
};

/* --------------------------------------------------------------------


 ENTRY POINT


-------------------------------------------------------------------- */

const run = args => {
  let cmdArgs = [...args];
  let currentWorkingDir = process.cwd();

  const createFileForAtom = cmdArgs && cmdArgs.indexOf('--atom') !== -1;
  if (createFileForAtom) {
    // on supprime le flag atom dans les arguments
    cmdArgs = cmdArgs.filter(v => v !== '--atom');
    // si le premier argument vient du plugin atom-kiss-cli
    // le plugin renvoi en second argument le chemin du projet
    const fileFromAtom = cmdArgs[1];
    currentWorkingDir = path.dirname(fileFromAtom);
    currentWorkingDir = path.resolve(currentWorkingDir);
  }

  const templates = getTemplates(currentWorkingDir);
  const isValidFile = isfile(cmdArgs[0]);
  const isValidType = isknowtype(cmdArgs[0], templates);

  if (createFileForAtom) {
    if (!isValidType) {
      const msg = `Unable to find template "${cmdArgs[0]}"`;
      process.stderr.write(msg);
      process.exit(0);
    }
    return outputAtomTemplate(isValidType, templates);
  }

  const isNotValidFileOrType = !isValidType && !isValidFile;
  if (isNotValidFileOrType) return outputAvailableTemplates(templates);
  return runForTerminal(cmdArgs, templates, isValidType, isValidFile);
};

module.exports = run;
