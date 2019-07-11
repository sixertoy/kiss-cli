const { TIME_COLOR, WELCOME_MSG } = require('./../constants');
const { projectName, version: semver } = require('./../../package.json');
const { debug, info, log } = require('./../core');

function version(msg) {
  if (msg) log(msg);
  // eslint-disable-next-line no-console
  console.time(TIME_COLOR);
  info(`${projectName} v${semver}`);
  debug(WELCOME_MSG);
}

module.exports = version;
