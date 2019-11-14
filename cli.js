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
 * kiss <type> <path/to/outputfile>
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
  outputHelpAndExit,
  outputTemplateContent,
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

function shouldShowUsage(optsArray) {
  if (!optsArray || !optsArray.length) return true;
  return false;
}

function shouldShowHelp(optsArray) {
  if (!optsArray || !optsArray.length) return false;
  return (
    optsArray.indexOf('-H') !== -1 ||
    optsArray.indexOf('-h') !== -1 ||
    optsArray.indexOf('--help') !== -1
  );
}

// function shouldShowTemplates(args) {
//   return args.indexOf('--templates') || args.indexOf('-T');
// }

// function shouldUseAtom(args) {
//   return args.indexOf('--atom') || args.indexOf('-A') || args.indexOf('-a');
// }

try {
  outputWelcomeMessage();

  const argsv = getCliArguments();
  const templates = getTemplatesList();
  // const useAtom = shouldUseAtom(argsv);
  const showHelp = shouldShowHelp(argsv) || shouldShowUsage(argsv);
  if (showHelp) outputHelpAndExit();

  const [firstArgument] = argsv;
  const firstIsFile = checkIsFile(firstArgument);

  const firstArgumentType =
    (firstIsFile && getFileTypeByExtension(firstArgument)) || firstArgument;

  // const secondIsFile = secondArgument && checkIsFile(secondArgument);
  const isAllowedType = checkIsAllowedType(firstArgumentType, templates);

  if (!firstIsFile) {
    if (!isAllowedType) outputAvailablesTypes(templates);
    if (isAllowedType) outputTemplateContent(firstArgumentType, templates);
    // if (secondIsFile) // writeTemplate
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
