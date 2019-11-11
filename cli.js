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

// const kiss = require('./src/kiss');
const { home } = require('./src/core');
const {
  args,
  outputHelp,
  outputUsage,
  outputVersion,
  start,
  success,
} = require('./src/cli-helpers');
const { KISS_DIRNAME, KISS_ROOTPATH } = require('./src/constants');
const { error } = require('./src/core');

const USE_DEBUG = true;
const USE_TTY = process.stderr.isTTY;

// returns an object
// { [template basename]: template path }
const getTemplatesList = () => {
  const kissDirectories = [
    path.join(KISS_ROOTPATH, KISS_DIRNAME),
    path.join(home(), KISS_DIRNAME),
    // kiss.lookupForProjectKissFolder(currentWorkingDir),
  ];

  // retrieve KISS templates files
  // -> ./.kiss -> ~/.kiss -> ~/.npm/.kiss
  // return kissDirectories.filter(excludeNonExistingPath);
  //   .reduce(getTemplatesFilesInDirectory, [])
  //   .filter(excludeSystemsFiles)
  //   .reduce(mapTemplatesFilesToTypes, {});
};

// function checkIfArgumentAreValids(optsArray) {
// function checkIfArgumentAreValids() {
// console.log('optsArray', optsArray);
// }

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
//
// function shouldUseAtom(args) {
//   return args.indexOf('--atom') || args.indexOf('-A');
// }

try {
  start();
  outputVersion();

  const argsv = args();
  const showHelp = shouldShowHelp(argsv);
  const showUsage = shouldShowUsage(argsv);

  if (showUsage || showHelp) outputUsage();
  if (showHelp) outputHelp();

  const templates = getTemplatesList();
  console.log('templates', templates);

  // const firstArgumentIsValid = checkIfArgumentAreValids(argsv, templates);
  // if (!firstArgumentIsValid) outputUsage();

  // if (showHelp) exit();
  // const showTemplates = shouldShowTemplates(options);
  // const useAtom = shouldUseAtom(options);
  // kiss(useAtom);

  // eslint-disable-next-line no-console
  // console.timeEnd(TIME_COLOR);
  // process.exit(0);
  success();
} catch (e) {
  if (USE_DEBUG) error(`error >>> ${e}\n`);
  if (USE_TTY) error('\u001b[31m! Unexpected error has occurred\u001b[39m\n');
  process.exit(1);
}
