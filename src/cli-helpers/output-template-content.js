const fs = require('fs');

const { NL } = require('../constants');
const { colors, output } = require("../core");
const removeEmptyLinesFromContent = require("../domain/removeEmptyLinesFromContent");

const getMessage = (title, subtitle, content) =>
  `${NL}${title}${NL}${subtitle}${NL}${NL}${content}${NL}${NL}`;

// output a template content in console
const outputTemplateContent = (filetype, types) => {
  const title = colors.bold('Template content:');
  const subtitle = colors.green(types[filetype].file);
  const fileContent = fs.readFileSync(types[filetype].file, 'utf8');
  let content = removeEmptyLinesFromContent(fileContent);
  content = colors.grey(content);
  const message = getMessage(title, subtitle, content);
  output(message);
};

module.exports = outputTemplateContent;
