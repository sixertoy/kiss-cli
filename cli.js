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

const {
  excludeNonExistingPath,
  excludeSystemsFiles,
  getTemplatesFilesInDirectory,
  mapTemplatesFilesToTypes,
} = require('./src/domain');
const { home } = require('./src/core');
const {
  checkIsAllowedType,
  checkIsFile,
  exit,
  getCliArguments,
  getFileTypeByExtension,
  outputAvailablesTypes,
  outputHelp,
  outputTemplateContent,
  outputTemplateForAtom,
  outputWelcomeMessage,
} = require('./src/cli-helpers');
const { KISS_DIRNAME, KISS_ROOTPATH } = require('./src/constants');
const { error } = require('./src/core');

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

  const useAtom = shouldUseAtom(args);
  if (useAtom) {
    outputTemplateForAtom(args, templates);
    process.exit(0);
  }

  outputWelcomeMessage();
  const showHelp = shouldShowHelp(args);
  if (showHelp) {
    outputHelp();
    exit();
  }

  const showTemplates = shouldShowTemplates(args);
  if (showTemplates) {
    outputAvailablesTypes(templates);
    exit();
  }

  const [firstArgument, secondArgument] = args;
  const firstIsFile = checkIsFile(firstArgument);
  const secondIsFile = secondArgument && checkIsFile(secondArgument);
  const firstArgumentType =
    (firstIsFile && getFileTypeByExtension(firstArgument)) || firstArgument;

  const isAllowedType = checkIsAllowedType(firstArgumentType, templates);
  if (!firstIsFile && isAllowedType && !secondIsFile) {
    outputTemplateContent(firstArgumentType, templates);
    exit();
  }

  if (firstIsFile) {
    // check if is allowed type -> write templates
    // else -> show availables templates
  }
  // const template = (isAllowedType && templates[firstArgument]) || 'helloworld';
  // if (isAllowedType && !secondIsFile) outputTemplate(template);
  exit();
} catch (e) {
  if (USE_DEBUG) error(`error >>> ${e}\n`);
  if (USE_TTY) error('\u001b[31m! Unexpected error has occurred\u001b[39m\n');
  process.exit(1);
}
