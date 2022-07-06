const fs = require('fs');

const { error } = require('../core');

function outputRawTemplate(type, templates) {
  try {
    const { file } = templates[type];
    const fsoptions = { encoding: 'utf8' };
    const fileContent = fs.readFileSync(file, fsoptions);
    process.stdout.write(fileContent);
  } catch (e) {
    const { file } = templates[type];
    const msg = `Unable to find/load template ${file}\n`;
    error(msg);
    process.stdout.write(msg);
    process.exit(1);
  }
}

module.exports = outputRawTemplate;
