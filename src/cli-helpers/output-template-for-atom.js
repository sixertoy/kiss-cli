const fs = require('fs');

const { output } = require('./../core');

function outputTemplateForAtom(args, templates) {
  const filetype = args[1];
  const fileContent = fs.readFileSync(templates[filetype].file, 'utf8');
  output(fileContent);
}

module.exports = outputTemplateForAtom;
