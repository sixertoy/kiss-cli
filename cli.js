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
// const path = require('path');

// const kiss = require('./src/kiss');
const { outputVersion } = require('./src/helpers');
const {
  // KISS_DIRNAME,
  // KISS_ROOTPATH,
  OPTIONS,
  TIME_COLOR,
  USAGE,
  VISIT,
} = require('./src/constants');
const { debug, error, log } = require('./src/core');

const USE_DEBUG = true;
const USE_TTY = process.stderr.isTTY;

// returns an object
// { [template basename]: template path }
const getTemplatesList = () => {
  // const kissDirectories = [
  //   path.join(home(), KISS_DIRNAME),
  //   path.join(KISS_ROOTPATH, KISS_DIRNAME),
  //   lookupForProjectKissFolder(currentWorkingDir),
  // ];
  // retrieve KISS templates files
  // -> ./.kiss -> ~/.kiss -> ~/.npm/.kiss
  // return kissDirectories
  //   .filter(excludeNonExistingPath)
  //   .reduce(getTemplatesFilesInDirectory, [])
  //   .filter(excludeSystemsFiles)
  //   .reduce(mapTemplatesFilesToTypes, {});
};

function outputUsage() {
  log(USAGE);
  debug(VISIT);
  process.exit(1);
}

function checkIfArgumentAreValids(optsArray) {
  console.log('optsArray', optsArray);
}

function outputHelp() {
  log(USAGE);
  log(OPTIONS);
  debug(VISIT);
  process.exit(0);
}

function shouldShowHelp(optsArray) {
  return (
    !optsArray ||
    !optsArray.length ||
    optsArray.indexOf('-H') ||
    optsArray.indexOf('--help')
  );
}

function getArguments() {
  const argsv = process.argv.slice(2);
  return argsv;
}

// function shouldShowTemplates(args) {
//   return args.indexOf('--templates') || args.indexOf('-T');
// }
//
// function shouldUseAtom(args) {
//   return args.indexOf('--atom') || args.indexOf('-A');
// }

try {
  // eslint-disable-next-line no-console
  console.time(TIME_COLOR);
  const argsv = getArguments();
  outputVersion();

  const showHelp = shouldShowHelp(argsv);
  console.log('showHelp', showHelp);
  if (showHelp) outputHelp();

  const templates = getTemplatesList();
  const firstArgumentIsValid = checkIfArgumentAreValids(argsv, templates);
  if (!firstArgumentIsValid) outputUsage();

  // if (showHelp) exit();
  // const showTemplates = shouldShowTemplates(options);
  // const useAtom = shouldUseAtom(options);
  // kiss(useAtom);
  // console.timeEnd(TIME_COLOR);
} catch (e) {
  if (USE_DEBUG) error(`error >>> ${e}\n`);
  if (USE_TTY) error('\u001b[31m! Unexpected error has occurred\u001b[39m\n');
  process.exit(1);
}
