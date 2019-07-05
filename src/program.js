const { TIME_COLOR, USAGE, VISIT, WELCOME_MSG } = require('./constants');
const Package = require('./../package.json');
const { debug, error, info, log, ok } = require('./core/logger');

function exit(reason) {
  log(USAGE);
  error(reason);
  debug(VISIT);
  // eslint-disable-next-line no-console
  console.timeEnd(TIME_COLOR);
  process.exit(1);
}

function help(desc, reason) {
  log(USAGE);
  log(desc);
  if (reason) error(reason);
  debug(VISIT);
  // eslint-disable-next-line no-console
  console.timeEnd(TIME_COLOR);
  process.exit(1);
}

function success(msg) {
  if (msg) ok(`${msg}\n`);
  // eslint-disable-next-line no-console
  console.timeEnd(TIME_COLOR);
  process.exit(0);
}

function version(msg) {
  if (msg) log(msg);
  // eslint-disable-next-line no-console
  console.time(TIME_COLOR);
  info(`${Package.projectName} v${Package.version}`);
  debug(WELCOME_MSG);
}

function raw(msg) {
  process.stdout.write(msg);
  process.exit(0);
}

const Program = {
  args: () => {
    const argsv = process.argv.slice(2);
    if (!argsv.length) exit('Missing arguments', false);
    return argsv;
  },
  exit,
  help,
  raw,
  success,
  version,
};

module.exports = Program;
