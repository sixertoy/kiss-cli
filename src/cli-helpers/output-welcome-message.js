const {
  description,
  homepage,
  projectName,
  version: semver,
} = require('./../../package.json');
const { debug, info } = require('./../core');
const { NL, TIME_COLOR, WS } = require('./../constants');

function outputWelcomeMessage() {
  // eslint-disable-next-line no-console
  console.time(TIME_COLOR);
  info(`${projectName}${WS}v${semver}${NL}`);
  debug(`${description}${NL}`);
  debug(`${homepage}${NL}`);
}

module.exports = outputWelcomeMessage;
