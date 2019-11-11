const { USAGE, VISIT } = require('./../constants');
const { debug, log } = require('./../core');

function outputUsage() {
  log(USAGE);
  debug(VISIT);
}

module.exports = outputUsage;
