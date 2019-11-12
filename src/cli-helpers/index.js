const raw = require('./raw');
const exit = require('./exit');
const getCliArguments = require('./get-cli-arguments');
const outputAvailablesTypes = require('./output-availables-types');
const outputHelpAndExit = require('./output-help-and-exit');
const outputWelcomeMessage = require('./output-welcome-message');
const checkIsAllowedType = require('./check-is-allowed-type');
const checkIsFile = require('./check-is-file');
const isKnowType = require('./is-know-type');
const outputTemplateContent = require('./output-template-content');
const getFileTypeByExtension = require('./get-file-type-by-extension');

module.exports = {
  checkIsAllowedType,
  checkIsFile,
  exit,
  getCliArguments,
  getFileTypeByExtension,
  help: () => {},
  isKnowType,
  outputAvailablesTypes,
  outputHelpAndExit,
  outputTemplateContent,
  outputWelcomeMessage,
  raw,
};
