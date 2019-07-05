const Colors = require('./../core/colors');
const Constants = require('./../constants');
const { help } = require('./../helpers');

const getTypesPair = types => key => {
  const k = key.indexOf('_') < 0 ? key : key.split('_')[1];
  return `${Constants.INDENT}${Colors.green(k)}: ${Colors.grey(
    types[key].file
  )}\n`;
};

const getMessage = (title, content) => `
${title}
${content}
`;

// output all available template types and paths in console
const outputAvailableTypes = types => {
  const title = Colors.bold('Available Templates:');
  const content = Object.keys(types)
    .map(getTypesPair(types))
    .join('');
  const message = getMessage(title, content);
  help(message, 'Invalid type');
};

module.exports = outputAvailableTypes;
