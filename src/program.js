const Colors = require('./core/colors');
const Package = require('./../package.json');
const Constants = require('./core/constants');
const {
  ok,
  log,
  info,
  error,
  debug,
} = require('./core/logger');

const VISIT = `
please visit: https://github.com/sixertoy/kiss-cli
`;

// ${Constants.INDENT}kiss <url>
// ${Constants.INDENT}kiss '<rgb_color>'
const USAGE = `
${Colors.bold('Usage:')}
${Constants.INDENT}kiss <type> <./relative/path/to/my.file> [...<r/p/t/my2.file>]
${Constants.INDENT}kiss <r/p/t/myfile.type> [...<r/p/t/myfile2.type>]
`;

const WELCOME_MSG = `
Keep It Stupid Simple agnostic file snippets
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
  info(`Kiss v${Package.version}`);
  debug(WELCOME_MSG);
}

const Program = {
  help,
  exit,
  success,
  version,
  args: () => {
    const argsv = process.argv.slice(2);
    if (!argsv.length) exit('Missing arguments', false);
    return argsv;
  },

};

module.exports = Program;
