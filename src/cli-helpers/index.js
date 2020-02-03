const raw = require('./raw');
const exit = require('./exit');
const getCliArguments = require('./get-cli-arguments');
const outputAvailablesTypes = require('./output-availables-types');
const outputHelp = require('./output-help');
const outputWelcomeMessage = require('./output-welcome-message');
const checkIsAllowedType = require('./check-is-allowed-type');
const checkIsFile = require('./check-is-file');
const isKnowType = require('./is-know-type');
const outputTemplateContent = require('./output-template-content');
const getFileTypeByExtension = require('./get-file-type-by-extension');
const outputTemplateForAtom = require('./output-template-for-atom');

module.exports = {
  checkIsAllowedType,
  checkIsFile,
  exit,
  getCliArguments,
  getFileTypeByExtension,
  help: () => {},
  isKnowType,
  outputAvailablesTypes,
  outputHelp,
  outputTemplateContent,
  outputTemplateForAtom,
  outputWelcomeMessage,
  raw,
};
