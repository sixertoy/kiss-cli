const { WELCOME_MSG } = require('./../constants');
const { projectName, version: semver } = require('./../../package.json');
const { debug, info, log } = require('./../core');

function outputVersion(msg) {
  if (msg) log(msg);
  // eslint-disable-next-line no-console
  info(`${projectName} v${semver}`);
  debug(WELCOME_MSG);
}

module.exports = outputVersion;
