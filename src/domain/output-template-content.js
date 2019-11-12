const fs = require('fs');

const { colors } = require('./../core');
const removeEmptyLinesFromContent = require('./removeEmptyLinesFromContent');
const { help } = require('./../cli-helpers');

const getMessage = (title, subtitle, content) => `
${title}
${subtitle}
${content}\
`;

// output a template content in console
const outputTemplateContent = (filetype, types) => {
  const title = colors.bold('Template content:');
  const subtitle = colors.green(types[filetype]);
  let content = removeEmptyLinesFromContent(
    fs.readFileSync(types[filetype].file, 'utf8')
  );
  content = colors.grey(content);
  const message = getMessage(title, subtitle, content);
  help(message);
};

module.exports = outputTemplateContent;
