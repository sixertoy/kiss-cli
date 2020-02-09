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
    const msg = `Unable to load template ${file}\n`;
    process.stdout.write(msg);
    error(msg);
    process.exit(1);
  }
}

module.exports = outputTemplateForAtom;
