const exit = require('./exit');
const writeFile = require('./write-file');
const getCliArguments = require('./get-cli-arguments');
const outputAvailablesTypes = require('./output-availables-types');
const outputHelp = require('./output-help');
const outputWelcomeMessage = require('./output-welcome-message');
const checkIsAllowedType = require('./check-is-allowed-type');
const checkIsFile = require('./check-is-file');
const isKnowType = require('./is-know-type');
const outputTemplateContent = require('./output-template-content');
const getFileTypeByExtension = require('./get-file-type-by-extension');
const outputRawTemplate = require('./output-raw-template');
const checkFileIsAllowedType = require('./check-file-is-allowed-type');

module.exports = {
  checkFileIsAllowedType,
  checkIsAllowedType,
  checkIsFile,
  exit,
  getCliArguments,
  getFileTypeByExtension,
  help: () => {},
  isKnowType,
  outputAvailablesTypes,
  outputHelp,
  outputRawTemplate,
  outputTemplateContent,
  outputWelcomeMessage,
  writeFile,
};
