const { colors } = require('./../core');
const Constants = require('./../constants');
const { help } = require('./../helpers');

const getTypesPair = types => key => {
  const k = key.indexOf('_') < 0 ? key : key.split('_')[1];
  return `${Constants.INDENT}${colors.green(k)}: ${colors.grey(
    types[key].file
  )}\n`;
};

const getMessage = (title, content) => `
${title}
${content}
`;

// output all available template types and paths in console
const outputAvailableTemplates = types => {
  const title = colors.bold('Available Templates:');
  const content = Object.keys(types)
    .map(getTypesPair(types))
    .join('');
  const message = getMessage(title, content);
  help(message, 'Invalid type');
};

module.exports = outputAvailableTemplates;
