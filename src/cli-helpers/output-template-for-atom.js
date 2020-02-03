const fs = require('fs');

const { error } = require('./../core');

function outputTemplateForAtom(type, templates) {
  try {
    const { file } = templates[type];
    const fsoptions = { encoding: 'utf8' };
    const fileContent = fs.readFileSync(file, fsoptions);
    process.stdout.write(fileContent);
  } catch (e) {
    const { file } = templates[type];
    error(`Unable to load template ${file}\n`);
    process.exit(1);
  }
}

module.exports = outputTemplateForAtom;
