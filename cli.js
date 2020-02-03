/*
 *  __  __   __   ______   ______
 * /\ \/ /  /\ \ /\  ___\ /\  ___\
 * \ \  _"-.\ \ \\ \___  \\ \___  \
 * \ \_\ \_\\ \_\\/\_____\\/\_____\
 *  \/_/\/_/ \/_/ \/_____/ \/_____/
 *
 * @author Matthieu Lassalvy
 * @email sixertoy.github gmail
 * @repository https://github.com/sixertoy/kiss-cli
 *
 * Install:
 * npm i -g kiss-cli
 *
 * Usage:
 * kiss --help
 * kiss --list
 * kiss <type> <./path/to/outputfile> <...>
 * kiss <./path/to/outputfile.type> <...>
 *
 */
const path = require('path');

const { KISS_DIRNAME, KISS_ROOTPATH } = require('./src/constants');
const { error, home } = require('./src/core');
const {
  excludeNonExistingPath,
  excludeSystemsFiles,
  getTemplatesFilesInDirectory,
  mapTemplatesFilesToTypes,
} = require('./src/domain');
const {
  checkFileIsAllowedType,
  checkIsAllowedType,
  checkIsFile,
  exit,
  getCliArguments,
  outputAvailablesTypes,
  outputHelp,
  outputTemplateContent,
  outputTemplateForAtom,
  outputWelcomeMessage,
  writeFile,
} = require('./src/cli-helpers');

const USE_DEBUG = true;
const USE_TTY = process.stderr.isTTY;

const getTemplatesList = () => {
  // retrieve KISS templates files
  // -> ./.kiss -> ~/.kiss -> ~/.npm/.kiss
  const kissDirectories = [
    path.join(KISS_ROOTPATH, KISS_DIRNAME),
    path.join(home(), KISS_DIRNAME),
    // kiss.lookupForProjectKissFolder(currentWorkingDir),
  ];
  const templates = kissDirectories
    .filter(excludeNonExistingPath)
    .reduce(getTemplatesFilesInDirectory, [])
    .filter(excludeSystemsFiles)
    .reduce(mapTemplatesFilesToTypes, {});
  // returns an object/map { template-type: template-filepath }
  return templates;
};

function shouldShowTemplates(args) {
  if (!args || !args.length) return false;
  return (
    args.indexOf('-L') !== -1 ||
    args.indexOf('-l') !== -1 ||
    args.indexOf('--list') !== -1 ||
    args.indexOf('-T') !== -1 ||
    args.indexOf('-t') !== -1 ||
    args.indexOf('--templates') !== -1
  );
}

function shouldShowHelp(args) {
  return (
    args.indexOf('-H') !== -1 ||
    args.indexOf('-h') !== -1 ||
    args.indexOf('--help') !== -1 ||
    !args ||
    !args.length
  );
}

function shouldUseAtom(args) {
  if (!args || !args.length) return false;
  return (
    args.indexOf('-A') !== -1 ||
    args.indexOf('-a') !== -1 ||
    args.indexOf('--raw') !== -1 ||
    args.indexOf('--atom') !== -1
  );
}

try {
  const args = getCliArguments();
  const templates = getTemplatesList();

  // NOTE output pour atom
  const useAtom = shouldUseAtom(args);
  if (useAtom) {
    outputTemplateForAtom(args, templates);
    process.exit(0);
  }

  // NOTE affichage du message d'acceuil
  outputWelcomeMessage();
  const showHelp = shouldShowHelp(args);
  if (showHelp) {
    outputHelp();
    exit();
  }

  // NOTE affichage du contenu du template
  const showTemplates = shouldShowTemplates(args);
  if (showTemplates) {
    outputAvailablesTypes(templates);
    exit();
  }

  const [firstArgument, ...rest] = args;
  const firstIsFile = checkIsFile(firstArgument);
  const firstIsTemplateType = checkIsAllowedType(firstArgument, templates);

  // NOTE affiche une erreur si il s'agit pas d'un type de template
  // ou qu'il n'y aucun fichier a traiter
  if (!firstIsTemplateType && !firstIsFile) {
    const msg = `Argument ${firstArgument} is not a valid type`;
    outputHelp();
    exit(msg);
  }

  const fileIsValidType = checkFileIsAllowedType(firstArgument, templates);
  if (!firstIsTemplateType && firstIsFile && !fileIsValidType) {
    const msg = `File ${firstArgument} is not a valid filetype`;
    outputHelp();
    exit(msg);
  }

  if (firstIsTemplateType && !rest.length) {
    outputTemplateContent(firstArgument, templates);
    exit();
  }

  args
    .filter(checkIsFile)
    .filter(file => checkFileIsAllowedType(file, templates))
    .forEach(writeFile(templates));
  exit();
} catch (e) {
  if (USE_DEBUG) error(`error >>> ${e}\n`);
  if (USE_TTY) error('\u001b[31m! Unexpected error has occurred\u001b[39m\n');
  process.exit(1);
}
