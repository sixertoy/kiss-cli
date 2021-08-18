const { colors, output } = require("../core");
const { INDENT, NL } = require("../constants");

const getColoredTypesPair = types => key => {
  const k = key.indexOf('_') < 0 ? key : key.split('_')[1];
  return `${INDENT}${colors.green(k)}: ${colors.grey(types[key].file)}${NL}`;
};

const getIndentedMessage = (title, content) =>
  `${NL}${title}${NL}${content}${NL}`;

const outputAvailableTypes = types => {
  // output all available template types and paths in console
  const title = colors.bold('Available Templates:');
  const content = Object.keys(types)
    .map(getColoredTypesPair(types))
    .join('');
  const message = getIndentedMessage(title, content);
  output(message);
};

module.exports = outputAvailableTypes;
