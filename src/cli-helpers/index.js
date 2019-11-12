const getArguments = require('./get-arguments');
const exit = require('./exit');
const raw = require('./raw');
const outputAvailablesTypes = require('./output-availables-types');
const outputHelpAndExit = require('./output-help-and-exit');
const outputWelcomeMessage = require('./output-welcome-message');
const checkIsAllowedType = require('./check-is-allowed-type');

module.exports = {
  checkIsAllowedType,
  exit,
  getArguments,
  help: () => {},
  outputAvailablesTypes,
  outputHelpAndExit,
  outputWelcomeMessage,
  raw,
};
