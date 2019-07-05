const fs = require('fs');

const Colors = require('./../core/colors');
const removeEmptyLinesFromContent = require('./remove-empty-lines-from-content');
const { help } = require('./../helpers');

const getMessage = (title, subtitle, content) => `
${title}
${subtitle}
${content}\
`;

// output a template content in console
const outputTemplateContent = (filetype, types) => {
  const title = Colors.bold('Template content:');
  const subtitle = Colors.green(types[filetype]);
  let content = removeEmptyLinesFromContent(
    fs.readFileSync(types[filetype].file, 'utf8')
  );
  content = Colors.grey(content);
  const message = getMessage(title, subtitle, content);
  help(message);
};

module.exports = outputTemplateContent;
