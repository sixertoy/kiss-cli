const fs = require('fs');
const path = require('path');

const writeFile = templates => file => {
  const extension = path.extname(file);
  const type = extension.slice(1);
  const templateExt = templates[type].ext;
  const templateFile = templates[type].file;
  const templateContent = fs.readFileSync(templateFile, 'utf8');
  const outputFile = file.replace(extension, templateExt);
  const outputPath = path.join(process.cwd(), outputFile);
  fs.writeFileSync(outputPath, templateContent, {
    encoding: 'utf8',
  });
};

module.exports = writeFile;
