const Colors = require('./core/colors');
const Package = require('./../package.json');
const Constants = require('./core/constants');
const {
  log,
  error,
  info,
  debug,
} = require('./core/logger');

const VISIT = `
please visit: https://github.com/sixertoy/kiss-cli
`;

const USAGE = `
${Colors.bold('Usage:')}
${Constants.INDENT}kiss <url>
${Constants.INDENT}kiss '<rgb_color>'
${Constants.INDENT}kiss <template_type> <./relative/destination/file>
`;

const WELCOME_MSG = `
Keep It Stupid Simple templated files generator
`;

const TIME_COLOR = 'takes';

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

function version() {
  // eslint-disable-next-line no-console
  console.time(TIME_COLOR);
  info(`Kiss v${Package.version}`);
  debug(WELCOME_MSG);
}

const Program = {
  help,
  exit,
  version,
  args: () => {
    const argsv = process.argv.slice(2);
    if (!argsv.length) exit('Missing arguments', false);
    return argsv;
  },

};

module.exports = Program;
