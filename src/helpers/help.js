const { TIME_COLOR, USAGE, VISIT } = require('./../constants');
const { debug, error, log } = require('./../core/logger');

function help(desc, reason) {
  log(USAGE);
  log(desc);
  if (reason) error(reason);
  debug(VISIT);
  // eslint-disable-next-line no-console
  console.timeEnd(TIME_COLOR);
  process.exit(1);
}

module.exports = help;
